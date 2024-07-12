/**
 * Peek.js
 * 
 * A lightweight JavaScript library that attaches a viewer to a specific node type, allowing you to view the CSS properties, attributes, and size/position.
 * 
 * @file        peek.ts
 * @version     v1.5.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import { Position, type Configuration, type Options } from "./ts/type";
import { PublicApi } from "./ts/api";
import { Is } from "./ts/is";
import { DomElement } from "./ts/dom";
import { Data } from "./ts/data";
import { Char, IgnoreState, KeyCode, Mode, Value } from "./ts/enum";
import { Constant } from "./ts/constant";


type DialogProperties = Record<string, string>;


( () => {
    // Variables: Configuration
    let _configuration: Configuration = {} as Configuration;

    // Variables: Dialog
    let _dialog: HTMLElement = null!;
    let _dialog_Title: HTMLElement = null!;
    let _dialog_Contents: HTMLElement = null!;
    let _dialog_Buttons: HTMLElement = null!;
    let _dialog_Buttons_Copy: HTMLButtonElement = null!;
    let _dialog_Buttons_Remove: HTMLButtonElement = null!;
    let _dialog_Timer: number = 0;

    // Variables: Current Process:
    let _current_Process_Options: Options = null!;
    let _current_Process_Elements: HTMLElement[] = [];
    let _current_Process_Properties: DialogProperties = {} as DialogProperties;
    let _current_Process_Element: HTMLElement = null!;
    let _current_Process_Locked: boolean = false;
    let _current_Process_NodeCount: number = 0;

    // Variables: Dialog Moving
    let _element_Dialog_Move: HTMLElement = null!;
    let _element_Dialog_Move_Original_X: number = 0;
    let _element_Dialog_Move_Original_Y: number = 0;
    let _element_Dialog_Move_IsMoving: boolean = false;
    let _element_Dialog_Move_X: number = 0;
    let _element_Dialog_Move_Y: number = 0;


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Build Dialog
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function buildDialog() : void {
        if ( Is.definedObject( _dialog ) ) {
            closeDialog();

            document.body.removeChild( _dialog );
            _dialog = null!;
        }

        _dialog = DomElement.create( document.body, "div", "peek-js" );
        _dialog.onmousemove = DomElement.cancelBubble;

        _dialog_Title = DomElement.create( _dialog, "div", "dialog-title-bar" );
        _dialog_Contents = DomElement.create( _dialog, "div", "dialog-contents" );
        _dialog_Buttons = DomElement.create( _dialog, "div", "dialog-buttons" );

        _dialog_Buttons_Copy = DomElement.createWithHTML( _dialog_Buttons, "button", "copy", _configuration.copyText! ) as HTMLButtonElement;
        _dialog_Buttons_Copy.onclick = onCopy;
        
        const closeButton: HTMLElement = DomElement.createWithHTML( _dialog_Buttons, "button", "close", _configuration.closeText! );
        closeButton.onclick = closeDialog;

        _dialog_Buttons_Remove = DomElement.createWithHTML( _dialog_Buttons, "button", "remove", _configuration.removeText! ) as HTMLButtonElement;
        _dialog_Buttons_Remove.onclick = onRemove;

        makeDialogMovable( _dialog_Title, _dialog );
    }

    function setDialogText( element: HTMLElement = null! ) : void {
        let title: string = _current_Process_Options.titleText!;

        _dialog_Title.innerHTML = Char.empty;

        if ( _current_Process_NodeCount > 1 && _current_Process_Options.showNodeNameInTitle ) {
            DomElement.createWithHTML( _dialog_Title, "span", "node-name", `[${ element.nodeName.toLowerCase() }] - ` );
            DomElement.createWithHTML( _dialog_Title, "span", "dash", " - " );
        }

        if ( !Is.definedString( title ) ) {
            if ( _current_Process_Options.mode === Mode.css ) {
                title = _configuration.cssText!;
            } else if ( _current_Process_Options.mode === Mode.attributes ) {
                title = _configuration.attributesText!;
            } else if ( _current_Process_Options.mode === Mode.size ) {
                title = _configuration.sizeText!;
            } else if ( _current_Process_Options.mode === Mode.class ) {
                title = _configuration.classesText!;
            }
        }

        DomElement.createWithHTML( _dialog_Title, "span", "title", title );

        if ( _current_Process_Options.showIdOrNameInTitle && Is.defined( element ) ) {
            const id: string = element.getAttribute( "id" )!;
            const name: string = element.getAttribute( "name" )!;

            if ( Is.definedString( id ) ) {
                DomElement.createWithHTML( _dialog_Title, "span", "dash", " - " );
                DomElement.createWithHTML( _dialog_Title, "span", "id-or-name", id );
            } else if ( Is.definedString( name ) ) {
                DomElement.createWithHTML( _dialog_Title, "span", "dash", " - " );
                DomElement.createWithHTML( _dialog_Title, "span", "id-or-name", name );
            }
        }
    }

    function closeDialog() : void {
        _dialog.style.display = "none";
        _current_Process_Locked = false;
    }

    function onCopy() : void {
        const lines: string[] = [];

        for ( let propertyName in _current_Process_Properties ) {
            if ( _current_Process_Properties.hasOwnProperty( propertyName ) ) {
                if ( _current_Process_Options.mode === Mode.css ) {
                    lines.push( `${ propertyName }: ${ _current_Process_Properties[ propertyName ] };` );
                } else if ( _current_Process_Options.mode === Mode.attributes ) {
                    lines.push( `${ propertyName }="${ _current_Process_Properties[ propertyName ] }"` );
                } else if ( _current_Process_Options.mode === Mode.class ) {
                    lines.push( _current_Process_Properties[ propertyName ] );
                }
            }
        }

        if ( _current_Process_Options.mode === Mode.css ) {
            navigator.clipboard.writeText( `${ _current_Process_Element.nodeName.toLowerCase() } { ${ Char.newLine } ${ lines.join( Char.newLine )} ${ Char.newLine } }` );
        } else if ( _current_Process_Options.mode === Mode.attributes || _current_Process_Options.mode === Mode.class ) {
            navigator.clipboard.writeText( lines.join( Char.space ) );
        }
    }

    function onRemove() : void {
        _current_Process_Element.parentNode?.removeChild( _current_Process_Element );

        closeDialog();
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Build Dialog Content
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function buildDialogContent( element: HTMLElement ) : void {
        _dialog_Contents.innerHTML = Char.empty;
        _dialog_Contents.scrollTop = 0;
        _current_Process_Properties = {} as DialogProperties;
        _current_Process_Element = element;

        setDialogText( element );

        if ( _current_Process_Options.mode === Mode.size ) {
            _dialog_Buttons_Copy.style.display = "none";
        } else {
            _dialog_Buttons_Copy.style.removeProperty( "display" );
        }

        if ( !_current_Process_Options.allowEditing ) {
            _dialog_Buttons_Remove.style.display = "none";
        } else {
            _dialog_Buttons_Remove.style.removeProperty( "display" );
        }

        if ( _current_Process_Options.mode === Mode.css ) {
            buildCssProperties( element );
        } else if ( _current_Process_Options.mode === Mode.attributes ) {
            buildAttributeProperties( element );
        } else if ( _current_Process_Options.mode === Mode.size ) {
            buildSizeProperties( element );
        } else if ( _current_Process_Options.mode === Mode.class ) {
            buildClassProperties( element );
        }
    }

    function buildCssProperties( element: HTMLElement ) : void {
        const computedStyles: CSSStyleDeclaration = getComputedStyle( element );
        const computedStylesLength: number = computedStyles.length;

        for ( let styleIndex: number = 0; styleIndex < computedStylesLength; styleIndex++ ) {
            buildPropertyRow( element, computedStyles[ styleIndex ], computedStyles.getPropertyValue( computedStyles[ styleIndex ] ) );
        }
    }

    function buildAttributeProperties( element: HTMLElement ) : void {
        if ( element.hasAttributes() ) {
            for ( let attribute of element.attributes ) {
                buildPropertyRow( element, attribute.name, attribute.value );
            }

        } else {
            _dialog_Contents.innerHTML = Char.empty;

            DomElement.createWithHTML( _dialog_Contents, "span", "warning", _configuration.noAttributesAvailableText! );
        }
    }

    function buildSizeProperties( element: HTMLElement ) : void {
        const offset: Position = DomElement.getOffset( element );

        buildPropertyRow( element, "left", `${ offset.left.toString() }px`, false );
        buildPropertyRow( element, "top", `${ offset.top.toString() }px`, false );
        buildPropertyRow( element, "width", `${ element.offsetWidth.toString() }px`, false );
        buildPropertyRow( element, "height", `${ element.offsetHeight.toString() }px`, false );
    }

    function buildClassProperties( element: HTMLElement ) : void {
        if ( element.classList.length > 0 ) {
            let index: number = 1;

            for ( let className of element.classList ) {
                buildPropertyRow( element, index.toString(), className );
                index++;
            }

        } else {
            _dialog_Contents.innerHTML = Char.empty;

            DomElement.createWithHTML( _dialog_Contents, "span", "warning", _configuration.noClassesAvailableText! );
        }
    }

    function buildPropertyRow( element: HTMLElement, propertyNameText: string, propertyValueText: string, allowEditing: boolean = true ) : void {
        if ( _current_Process_Options.showOnly!.length === 0 || _current_Process_Options.showOnly!.indexOf( propertyNameText ) > Value.notFound ) {
            const property: HTMLElement = DomElement.create( _dialog_Contents, "div", "property-row" );

            DomElement.createWithHTML( property, "div", "property-name", propertyNameText );
            
            const propertyValue: HTMLElement = DomElement.create( property, "div", "property-value" );
            const propertyValueInput: HTMLInputElement = DomElement.create( propertyValue, "input" ) as HTMLInputElement;

            const copyButton: HTMLButtonElement = DomElement.createWithHTML( property, "button", "copy-small", _configuration.copySymbolText! ) as HTMLButtonElement;
            copyButton.title = _configuration.copyText!;

            copyButton.onclick = () => {
                navigator.clipboard.writeText( propertyValueText );
            };

            if ( _current_Process_Options.allowEditing && allowEditing ) {
                const pasteButton: HTMLButtonElement = DomElement.createWithHTML( property, "button", "paste-small", _configuration.pasteSymbolText! ) as HTMLButtonElement;
                const removeButton: HTMLButtonElement = DomElement.createWithHTML( property, "button", "remove-small", _configuration.removeSymbolText! ) as HTMLButtonElement;

                pasteButton.title = _configuration.pasteText!;
                removeButton.title = _configuration.removeText!;
    
                pasteButton.onclick = () => {
                    navigator.clipboard.readText().then( data => {
                        propertyValueInput.value = data;

                        updatePropertyValue( element, propertyNameText, propertyValueInput );
                    } );
                };

                removeButton.onclick = () => {
                    if ( _current_Process_Options.mode === Mode.css ) {
                        element.style.removeProperty( propertyNameText );
                    } else if ( _current_Process_Options.mode === Mode.attributes ) {
                        element.removeAttribute( propertyNameText );
                    } else if ( _current_Process_Options.mode === Mode.class ) {
                        element.classList.remove( propertyValueText );
                    }

                    _dialog_Contents.removeChild( property );
                };
            }

            propertyValueInput.type = "text";
            propertyValueInput.value = propertyValueText;

            _current_Process_Properties[ propertyNameText ] = propertyValueText;

            if ( !_current_Process_Options.allowEditing || !allowEditing ) {
                propertyValueInput.readOnly = true;
            } else {
                propertyValueInput.onkeyup = ( e: KeyboardEvent ) => {
                    onPropertyValueKeyUp( e, propertyNameText, propertyValueInput, element );
                }
            }
        }
    }

    function onPropertyValueKeyUp( e: KeyboardEvent, propertyName: string, input: HTMLInputElement, element: HTMLElement ) : void {
        if ( e.code === KeyCode.enter ) {
            updatePropertyValue( element, propertyName, input );
        }
    }

    function updatePropertyValue( element: HTMLElement, propertyName: string, input: HTMLInputElement ) : void {
        if ( _current_Process_Options.mode === Mode.css ) {
            element.style.setProperty( propertyName, input.value );
        } else if ( _current_Process_Options.mode === Mode.attributes ) {
            element.setAttribute( propertyName, input.value );
        } else if ( _current_Process_Options.mode === Mode.class ) {
            element.classList.replace( element.classList[ parseInt( propertyName ) - 1 ], input.value );
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Node Events
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function buildNodeEvents() : void {
        const tagTypes: string[] = _current_Process_Options.nodeType as string[];

        _current_Process_NodeCount = tagTypes.length;

        for ( let tagTypeIndex: number = 0; tagTypeIndex < _current_Process_NodeCount; tagTypeIndex++ ) {
            const domElements: HTMLCollectionOf<Element> = document.getElementsByTagName( tagTypes[ tagTypeIndex ] );
            const elements: HTMLElement[] = [].slice.call( domElements );
            const elementsLength: number = elements.length;

            for ( let elementIndex: number = 0; elementIndex < elementsLength; elementIndex++ ) {
                buildNodeEvent( elements[ elementIndex ] );
            }
        }

        window.addEventListener( "mousemove", onWindowMove );
    }

    function buildNodeEvent( element: HTMLElement ) : void {
        const attributeValue: string = element.getAttribute( Constant.PEEK_JS_IGNORE_STATE_ATTRIBUTE )!;

        if ( !Is.definedString( attributeValue ) && attributeValue !== IgnoreState.ignore ) {
            element.addEventListener( "mousemove", ( e: MouseEvent ) => {
                onNodeMouseOver( e, element );
            } );
    
            _current_Process_Elements.push( element );
        }
    }

    function removeNodeEvents() : void {
        const currentProcessElementsLength: number = _current_Process_Elements.length;

        for ( let elementIndex: number = 0; elementIndex < currentProcessElementsLength; elementIndex++ ) {
            var element: HTMLElement = _current_Process_Elements[ elementIndex ];

            element.removeEventListener( "mousemove", ( e: MouseEvent ) => {
                onNodeMouseOver( e, element );
            } );
        }

        _current_Process_Elements = [] as HTMLElement[];

        window.removeEventListener( "mousemove", onWindowMove );

        closeDialog();
    }

    function onNodeMouseOver( e: MouseEvent, element: HTMLElement ) : void {
        if ( !_current_Process_Locked ) {
            DomElement.cancelBubble( e );
        
            if ( _dialog_Timer !== 0 ) {
                clearTimeout( _dialog_Timer );
                _dialog_Timer = 0;
            }
    
            _dialog_Timer = setTimeout( () => {
                buildDialogContent( element );
    
                DomElement.showElementAtMousePosition( e, _dialog );
            }, _configuration.dialogDisplayDelay );
        }
    }

    function onWindowMove() : void {
        if ( !_current_Process_Locked ) {
            if ( _dialog_Timer !== 0 ) {
                clearTimeout( _dialog_Timer );
                _dialog_Timer = 0;
            }
            
            closeDialog();
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Move Dialog
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function makeDialogMovable( titleBar: HTMLElement, dialog: HTMLElement ) : void {
        titleBar.onmousedown = ( e: MouseEvent ) => {
            onMoveTitleBarMouseDown( e, dialog );
        };

        dialog.onmousemove = ( e: MouseEvent ) => {
            onMoveDocumentMouseMove( e, true );
        };

        titleBar.onmouseup = () => {
            onMoveTitleBarMouseUp();
        };

        titleBar.oncontextmenu = () => {
            onMoveTitleBarMouseUp();
        };

        document.addEventListener( "mousemove", onMoveDocumentMouseMove );
        document.addEventListener( "mouseleave", onMoveDocumentMouseLeave );
    }

    function onMoveTitleBarMouseDown( e: MouseEvent, dialog: HTMLElement ) : void {
        if ( !_element_Dialog_Move_IsMoving ) {
            _current_Process_Locked = true;

            _element_Dialog_Move = dialog;
            _element_Dialog_Move_IsMoving = true;
            _element_Dialog_Move_X = e.pageX - _element_Dialog_Move.offsetLeft;
            _element_Dialog_Move_Y = e.pageY - _element_Dialog_Move.offsetTop;
            _element_Dialog_Move_Original_X = _element_Dialog_Move.offsetLeft;
            _element_Dialog_Move_Original_Y = _element_Dialog_Move.offsetTop;
        }
    }

    function onMoveTitleBarMouseUp() : void {
        if ( _element_Dialog_Move_IsMoving ) {
            _element_Dialog_Move_IsMoving = false;
            _element_Dialog_Move = null!;
            _element_Dialog_Move_Original_X = 0;
            _element_Dialog_Move_Original_Y = 0;
        }
    }

    function onMoveDocumentMouseMove( e: MouseEvent, cancelBubble: boolean = false ) : void {
        if ( cancelBubble ) {
            DomElement.cancelBubble( e );
        }

        if ( _element_Dialog_Move_IsMoving ) {
            _element_Dialog_Move.style.left = `${ e.pageX - _element_Dialog_Move_X }px`;
            _element_Dialog_Move.style.top = `${ e.pageY - _element_Dialog_Move_Y }px`;
        }
    }

    function onMoveDocumentMouseLeave() : void {
        if ( _element_Dialog_Move_IsMoving ) {
            _element_Dialog_Move.style.left = `${ _element_Dialog_Move_Original_X }px`;
            _element_Dialog_Move.style.top = `${ _element_Dialog_Move_Original_Y }px`;

            _element_Dialog_Move_IsMoving = false;
            _element_Dialog_Move = null!;
            _element_Dialog_Move_Original_X = 0;
            _element_Dialog_Move_Original_Y = 0;
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Options
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function buildOptions( newOptions: any ) : Options {
        let options: Options = Data.getDefaultObject( newOptions, {} as Options );
        options.nodeType = Data.getDefaultStringOrArray( options.nodeType, [] );
        options.mode = Data.getDefaultNumber( options.mode, Mode.css );
        options.titleText = Data.getDefaultString( options.titleText, Char.empty );
        options.showOnly = Data.getDefaultStringOrArray( options.showOnly, [] );
        options.allowEditing = Data.getDefaultBoolean( options.allowEditing, false );
        options.showIdOrNameInTitle = Data.getDefaultBoolean( options.showIdOrNameInTitle, true );
        options.showNodeNameInTitle = Data.getDefaultBoolean( options.showNodeNameInTitle, false );

        return options;
    }


	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:  Helpers:  Configuration
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    function buildDefaultConfiguration( newConfiguration: Configuration = null! ) : void {
        _configuration = Data.getDefaultObject( newConfiguration, {} as Configuration );
        _configuration.dialogDisplayDelay = Data.getDefaultNumber( _configuration.dialogDisplayDelay, 1000 );

        buildDefaultStringConfiguration();
    }

    function buildDefaultStringConfiguration() : void {
        _configuration.cssText = Data.getDefaultAnyString( _configuration.cssText, "CSS" );
        _configuration.attributesText = Data.getDefaultAnyString( _configuration.attributesText, "Attributes" );
        _configuration.sizeText = Data.getDefaultAnyString( _configuration.sizeText, "Size" );
        _configuration.classesText = Data.getDefaultAnyString( _configuration.classesText, "Classes" );
        _configuration.noAttributesAvailableText = Data.getDefaultAnyString( _configuration.noAttributesAvailableText, "No attributes are available." );
        _configuration.closeText = Data.getDefaultAnyString( _configuration.closeText, "Close" );
        _configuration.copyText = Data.getDefaultAnyString( _configuration.copyText, "Copy" );
        _configuration.copySymbolText = Data.getDefaultAnyString( _configuration.copySymbolText, "❐" );
        _configuration.pasteText = Data.getDefaultAnyString( _configuration.pasteText, "Paste" );
        _configuration.pasteSymbolText = Data.getDefaultAnyString( _configuration.pasteSymbolText, "☐" );
        _configuration.removeText = Data.getDefaultAnyString( _configuration.removeText, "Remove" );
        _configuration.removeSymbolText = Data.getDefaultAnyString( _configuration.removeSymbolText, "✕" );
        _configuration.noClassesAvailableText = Data.getDefaultAnyString( _configuration.noClassesAvailableText, "No classes are available." );
    }


	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    const _public: PublicApi = {
        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Running
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        start: function ( options: Options ) : PublicApi {
            if ( !Is.definedObject( _current_Process_Options ) ) {
                _current_Process_Options = buildOptions( options );

                setDialogText();
                buildNodeEvents();
            }

            return _public;
        },

        stop: function () : PublicApi {
            if ( Is.definedObject( _current_Process_Options ) ) {
                _current_Process_Options = null!;

                removeNodeEvents();
            }

            return _public;
        },

        close: function() : PublicApi {
            closeDialog();
            
            return _public;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Configuration
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        setConfiguration: function ( newConfiguration: any ) : PublicApi {
            if ( Is.definedObject( newConfiguration ) ) {
                let configurationHasChanged: boolean = false;
                const newInternalConfiguration: any = _configuration;
            
                for ( let propertyName in newConfiguration ) {
                    if ( newConfiguration.hasOwnProperty( propertyName ) && _configuration.hasOwnProperty( propertyName ) && newInternalConfiguration[ propertyName ] !== newConfiguration[ propertyName ] ) {
                        newInternalConfiguration[ propertyName ] = newConfiguration[ propertyName ];
                        configurationHasChanged = true;
                    }
                }
        
                if ( configurationHasChanged ) {
                    buildDefaultConfiguration( newInternalConfiguration );
                    buildDialog();

                    if ( Is.definedObject( _current_Process_Options ) ) {
                        setDialogText();
                    }
                }
            }
    
            return _public;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Additional Data
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        getVersion: function () : string {
            return "1.5.0";
        }
    };


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Heat.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    ( () => {
        buildDefaultConfiguration();

        document.addEventListener( "DOMContentLoaded", () => {
            buildDialog();
        } );

        if ( !Is.defined( window.$peek ) ) {
            window.$peek = _public;
        }
    } )();
} )();