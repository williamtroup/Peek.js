/**
 * Peek.js
 * 
 * A lightweight JavaScript library that attaches a viewer to a specific node type, allowing you to view the CSS properties, attributes, and size/position.
 * 
 * @file        peek.ts
 * @version     v1.7.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import {
    type Position,
    type Configuration,
    type StartOptions } from "./ts/type";

import { type PublicApi } from "./ts/api";
import { Is } from "./ts/data/is";
import { DomElement } from "./ts/dom/dom";
import { Char, IgnoreState, KeyCode, Mode, Value } from "./ts/data/enum";
import { Constant } from "./ts/constant";
import { Config } from "./ts/options/config";
import { Start } from "./ts/options/options";


type DialogProperties = Record<string, string>;


( () => {
    // Variables: Configuration
    let _configuration: Configuration = {} as Configuration;

    // Variables: Dialog
    let _dialog: HTMLElement = null!;
    let _dialog_Title: HTMLElement = null!;
    let _dialog_Title_Button_Lock: HTMLButtonElement = null!;
    let _dialog_Search: HTMLElement = null!;
    let _dialog_Search_Input: HTMLInputElement = null!;
    let _dialog_Search_Input_TimerId: number = 0;
    let _dialog_Contents: HTMLElement = null!;
    let _dialog_Contents_NoSearchResultsText: HTMLSpanElement = null!;
    let _dialog_Buttons: HTMLElement = null!;
    let _dialog_Buttons_Copy: HTMLButtonElement = null!;
    let _dialog_Buttons_Remove: HTMLButtonElement = null!;
    let _dialog_Buttons_MoveUp: HTMLButtonElement = null!;
    let _dialog_Buttons_MoveDown: HTMLButtonElement = null!;
    let _dialog_TimerId: number = 0;

    // Variables: Current Process:
    let _current_Process_Options: StartOptions = null!;
    let _current_Process_Elements: HTMLElement[] = [];
    let _current_Process_Properties: DialogProperties = {} as DialogProperties;
    let _current_Process_Element: HTMLElement = null!;
    let _current_Process_Locked: boolean = false;
    let _current_Process_NodeCount: number = 0;
    let _current_Process_Properties_Count: number = 0;

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
        _dialog_Search = DomElement.create( _dialog, "div", "dialog-search" );
        _dialog_Contents = DomElement.create( _dialog, "div", "dialog-contents" );
        _dialog_Buttons = DomElement.create( _dialog, "div", "dialog-buttons" );

        _dialog_Buttons_Copy = DomElement.createWithHTML( _dialog_Buttons, "button", "copy", _configuration.text!.copyText! ) as HTMLButtonElement;
        _dialog_Buttons_Copy.onclick = onCopy;
        
        _dialog_Search_Input = DomElement.create( _dialog_Search, "input" ) as HTMLInputElement;
        _dialog_Search_Input.placeholder = _configuration.text!.searchPropertiesPlaceHolderText!;
        _dialog_Search_Input.type = "text";
        _dialog_Search_Input.onkeyup = onSearchProperties;
        _dialog_Search_Input.onpaste = onSearchProperties;
        _dialog_Search_Input.onfocus = () => _dialog_Search_Input.select();

        const removeButton: HTMLButtonElement = DomElement.createWithHTML( _dialog_Search, "button", "clear-small", _configuration.text!.clearSymbolText! ) as HTMLButtonElement;
        removeButton.title = _configuration.text!.clearText!;
        removeButton.onclick = onSearchPropertiesClear;

        const closeButton: HTMLElement = DomElement.createWithHTML( _dialog_Buttons, "button", "close", _configuration.text!.closeText! );
        closeButton.onclick = closeDialog;

        _dialog_Buttons_Remove = DomElement.createWithHTML( _dialog_Buttons, "button", "remove", _configuration.text!.removeElementSymbolText! ) as HTMLButtonElement;
        _dialog_Buttons_Remove.onclick = onRemove;
        _dialog_Buttons_Remove.title = _configuration.text!.removeText!;

        _dialog_Buttons_MoveUp = DomElement.createWithHTML( _dialog_Buttons, "button", "move-up", _configuration.text!.moveUpSymbolText! ) as HTMLButtonElement;
        _dialog_Buttons_MoveUp.onclick = onMoveUp;
        _dialog_Buttons_MoveUp.title = _configuration.text!.moveUpText!;

        _dialog_Buttons_MoveDown = DomElement.createWithHTML( _dialog_Buttons, "button", "move-down", _configuration.text!.moveDownSymbolText! ) as HTMLButtonElement;
        _dialog_Buttons_MoveDown.onclick = onMoveDown;
        _dialog_Buttons_MoveDown.title = _configuration.text!.moveDownText!;

        makeDialogMovable( _dialog_Title, _dialog );
    }

    function setDialogTitle( element: HTMLElement = null! ) : void {
        if ( !_current_Process_Locked ) {
            let title: string = _current_Process_Options.titleText!;

            _dialog_Title.innerHTML = Char.empty;

            if ( !Is.definedString( title ) ) {
                if ( _current_Process_Options.mode === Mode.css ) {
                    title = _configuration.text!.cssText!;
                } else if ( _current_Process_Options.mode === Mode.attributes ) {
                    title = _configuration.text!.attributesText!;
                } else if ( _current_Process_Options.mode === Mode.size ) {
                    title = _configuration.text!.sizeText!;
                } else if ( _current_Process_Options.mode === Mode.class ) {
                    title = _configuration.text!.classesText!;
                } else {
                    title = _configuration.text!.unknownModeText!;
                }
            }
    
            DomElement.createWithHTML( _dialog_Title, "span", "title", title );
    
            if ( _current_Process_NodeCount > 1 && _current_Process_Options.showNodeNameInTitle ) {
                DomElement.createWithHTML( _dialog_Title, "span", "dash", " - " );
                DomElement.createWithHTML( _dialog_Title, "span", "node-name", `[${ element.nodeName.toLowerCase() }]` );
            }
    
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
            
            if ( _current_Process_Options.showLockButtonInTitle ) {
                _dialog_Title_Button_Lock = DomElement.createWithHTML( _dialog_Title, "button", "lock", _configuration.text!.dialogMovedSymbolText! ) as HTMLButtonElement;
                _dialog_Title_Button_Lock.title = _configuration.text!.lockText!;
                _dialog_Title_Button_Lock.onclick = () => setDialogAsLocked();
            }
        }
    }

    function setDialogAsLocked() : void {
        if ( !_current_Process_Locked ) {
            DomElement.createWithHTML( _dialog_Title, "span", "locked", `${_configuration.text!.dialogMovedSymbolText}${Char.space}`, true );

            if ( Is.defined( _dialog_Title_Button_Lock ) ) {
                _dialog_Title_Button_Lock.parentNode!.removeChild( _dialog_Title_Button_Lock );
                _dialog_Title_Button_Lock = null!;
            }

            _current_Process_Locked = true;
        }
    }

    function closeDialog() : void {
        _dialog.style.display = "none";
        _current_Process_Locked = false;
        _dialog_Search_Input.value = Char.empty;
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

    function onSearchProperties() : void {
        if ( _dialog_Search_Input_TimerId !== 0 ) {
            clearTimeout( _dialog_Search_Input_TimerId );
            _dialog_Search_Input_TimerId = 0;
        }

        _dialog_Search_Input_TimerId = setTimeout( () => {
            const children: HTMLCollectionOf<Element> = _dialog_Contents.getElementsByClassName( "property-name" );
            const propertyNames: HTMLElement[] = [].slice.call( children );
            const propertyNamesLength: number = propertyNames.length;
            const searchValue = _dialog_Search_Input.value.toLowerCase();
            let propertiesFound: number = 0;
    
            for ( let propertyNameIndex: number = 0; propertyNameIndex < propertyNamesLength; propertyNameIndex++ ) {
                const parent: HTMLElement = propertyNames[ propertyNameIndex ].parentNode as HTMLElement;
                
                if ( Is.defined( parent ) ) {
                    if ( _dialog_Search_Input.value.trim() === Char.empty ) {
                        parent.style.removeProperty( "display" );
                        propertiesFound++;
                    } else {
    
                        const propertyNameText: string = propertyNames[ propertyNameIndex ].innerText;
    
                        if ( propertyNameText.toLowerCase().indexOf( searchValue ) > Value.notFound ) {
                            parent.style.removeProperty( "display" );
                            propertiesFound++;
                        } else {
                            parent.style.display = "none";
                        }
                    }   
                }
            }

            if ( propertiesFound === 0 ) {
                _dialog_Contents_NoSearchResultsText.style.display = "block";
            } else {
                _dialog_Contents_NoSearchResultsText.style.removeProperty( "display" );
            }
            
        }, _configuration.searchDelayDelay );
    }

    function onSearchPropertiesClear() : void {
        _dialog_Search_Input.value = Char.empty;
        _dialog_Search_Input.focus();

        onSearchProperties();
    }

    function onMoveUp() : void {
        if ( _current_Process_Element.parentNode !== null && _current_Process_Element.previousElementSibling !== null ) {
            _current_Process_Element.parentNode!.insertBefore( _current_Process_Element, _current_Process_Element.previousElementSibling );
        }
    }

    function onMoveDown() : void {
        if ( _current_Process_Element.parentNode !== null && _current_Process_Element.nextElementSibling !== null ) {
            _current_Process_Element.parentNode!.insertBefore( _current_Process_Element.nextElementSibling!, _current_Process_Element );
        }
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
        _current_Process_Properties_Count = 0;
        _current_Process_Element = element;

        setDialogTitle( element );

        if ( _current_Process_Options.mode === Mode.css || _current_Process_Options.mode === Mode.class || _current_Process_Options.mode === Mode.attributes ) {
            _dialog_Buttons_Copy.style.removeProperty( "display" );
        } else {
            _dialog_Buttons_Copy.style.display = "none";
        }

        if ( !_current_Process_Options.allowEditing ) {
            _dialog_Buttons_Remove.style.display = "none";
            _dialog_Buttons_MoveUp.style.display = "none";
            _dialog_Buttons_MoveDown.style.display = "none";
        } else {
            _dialog_Buttons_Remove.style.removeProperty( "display" );
            _dialog_Buttons_MoveUp.style.removeProperty( "display" );
            _dialog_Buttons_MoveDown.style.removeProperty( "display" );
        }

        _dialog_Contents_NoSearchResultsText = DomElement.createWithHTML( _dialog_Contents, "span", "no-search-results", _configuration.text!.noPropertiesFoundForSearchText! ) as HTMLSpanElement;
        
        if ( _current_Process_Options.mode === Mode.css ) {
            buildCssProperties( element );
        } else if ( _current_Process_Options.mode === Mode.attributes ) {
            buildAttributeProperties( element );
        } else if ( _current_Process_Options.mode === Mode.size ) {
            buildSizeProperties( element );
        } else if ( _current_Process_Options.mode === Mode.class ) {
            buildClassProperties( element );
        } else {
            DomElement.createWithHTML( _dialog_Contents, "span", "warning", _configuration.text!.modeNotSupportedText! );
        }

        if ( _current_Process_Properties_Count <= 15 ) {
            _dialog_Search.style.display = "none";
        } else {
            _dialog_Search.style.removeProperty( "display" );
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

            DomElement.createWithHTML( _dialog_Contents, "span", "warning", _configuration.text!.noAttributesAvailableText! );
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

            DomElement.createWithHTML( _dialog_Contents, "span", "warning", _configuration.text!.noClassesAvailableText! );
        }
    }

    function buildPropertyRow( element: HTMLElement, propertyNameText: string, propertyValueText: string, allowEditing: boolean = true ) : void {
        if ( isPropertyVisible( propertyNameText ) && isPropertyValueVisible( propertyValueText ) ) {
            const property: HTMLElement = DomElement.create( _dialog_Contents, "div", "property-row" );

            DomElement.createWithHTML( property, "div", "property-name", propertyNameText );
            
            const propertyValue: HTMLElement = DomElement.create( property, "div", "property-value" );
            const propertyValueInput: HTMLInputElement = DomElement.create( propertyValue, "input" ) as HTMLInputElement;

            if ( Is.hexColor( propertyValueText ) || Is.isRgbColor( propertyValueText ) ) {
                propertyValueInput.classList.add( "property-value-color" );
                propertyValueInput.style.borderLeftColor = propertyValueText;
            }

            propertyValueInput.placeholder = _configuration.text!.propertyValuePlaceHolderText!;
            propertyValueInput.onfocus = () => propertyValueInput.select();

            const copyButton: HTMLButtonElement = DomElement.createWithHTML( property, "button", "copy-small", _configuration.text!.copySymbolText! ) as HTMLButtonElement;
            copyButton.title = _configuration.text!.copyText!;
            copyButton.onclick = () => navigator.clipboard.writeText( propertyValueText );

            if ( _current_Process_Options.allowEditing && allowEditing ) {
                const pasteButton: HTMLButtonElement = DomElement.createWithHTML( property, "button", "paste-small", _configuration.text!.pasteSymbolText! ) as HTMLButtonElement;
                const removeButton: HTMLButtonElement = DomElement.createWithHTML( property, "button", "remove-small", _configuration.text!.removeSymbolText! ) as HTMLButtonElement;

                pasteButton.title = _configuration.text!.pasteText!;
                removeButton.title = _configuration.text!.removeText!;
    
                pasteButton.onclick = () => onPropertyPaste( element, propertyValueInput, propertyNameText );
                removeButton.onclick = () => onPropertyRemove( property, element, propertyNameText, propertyValueText );
            }

            propertyValueInput.type = "text";
            propertyValueInput.value = propertyValueText;

            _current_Process_Properties[ propertyNameText ] = propertyValueText;
            _current_Process_Properties_Count++;

            if ( !_current_Process_Options.allowEditing || !allowEditing ) {
                propertyValueInput.readOnly = true;
            } else {
                propertyValueInput.onkeyup = ( e: KeyboardEvent ) => onPropertyValueKeyUp( e, propertyNameText, propertyValueInput, element );
            }
        }
    }

    function onPropertyPaste( element: HTMLElement, propertyValueInput: HTMLInputElement, propertyNameText: string ) : void {
        navigator.clipboard.readText().then( data => {
            propertyValueInput.value = data;

            updatePropertyValue( element, propertyNameText, propertyValueInput );
        } );
    }

    function onPropertyRemove( property: HTMLElement, element: HTMLElement, propertyNameText: string, propertyValueText: string ) : void {
        if ( _current_Process_Options.mode === Mode.css ) {
            element.style.removeProperty( propertyNameText );
            property.parentNode!.removeChild( property );

        } else if ( _current_Process_Options.mode === Mode.attributes ) {
            element.removeAttribute( propertyNameText );
            property.parentNode!.removeChild( property );
            
        } else if ( _current_Process_Options.mode === Mode.class ) {
            element.classList.remove( propertyValueText );
            property.parentNode!.removeChild( property );
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

        _current_Process_Properties[ propertyName ] = input.value;

        if ( Is.hexColor( input.value ) || Is.isRgbColor( input.value ) ) {
            input.classList.add( "property-value-color" );
            input.style.borderLeftColor = input.value;
        } else {
            input.classList.remove( "property-value-color" );
        }
    }

    function isPropertyVisible( propertyNameText: string ) : boolean {
        return _current_Process_Options.showOnly!.length === 0 || _current_Process_Options.showOnly!.indexOf( propertyNameText ) > Value.notFound
    }

    function isPropertyValueVisible( propertyValueText: string ) : boolean {
        return _current_Process_Options.ignoreValues!.length === 0 || _current_Process_Options.ignoreValues!.indexOf( propertyValueText ) <= Value.notFound
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
        
            if ( _dialog_TimerId !== 0 ) {
                clearTimeout( _dialog_TimerId );
                _dialog_TimerId = 0;
            }
    
            _dialog_TimerId = setTimeout( () => {
                buildDialogContent( element );
    
                DomElement.showElementAtMousePosition( e, _dialog );
            }, _configuration.dialogDisplayDelay );
        }
    }

    function onWindowMove() : void {
        if ( !_current_Process_Locked ) {
            if ( _dialog_TimerId !== 0 ) {
                clearTimeout( _dialog_TimerId );
                _dialog_TimerId = 0;
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
            setDialogAsLocked();

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
	 * Public API Functions:
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    const _public: PublicApi = {
        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Running
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        start: function ( options: StartOptions ) : PublicApi {
            if ( !Is.definedObject( _current_Process_Options ) ) {
                _current_Process_Options = Start.Options.get( options );

                setDialogTitle();
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
                    _configuration = Config.Options.get( newInternalConfiguration );
                    buildDialog();

                    if ( Is.definedObject( _current_Process_Options ) ) {
                        setDialogTitle();
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
            return "1.7.0";
        }
    };


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Heat.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    ( () => {
        _configuration = Config.Options.get();

        document.addEventListener( "DOMContentLoaded", () => {
            buildDialog();
        } );

        if ( !Is.defined( window.$peek ) ) {
            window.$peek = _public;
        }
    } )();
} )();