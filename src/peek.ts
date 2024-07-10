/**
 * Peek.js
 * 
 * A lightweight JavaScript library that attaches a viewer to a specific node type, allowing you to view the CSS properties, attributes, and size/position.
 * 
 * @file        peek.ts
 * @version     v1.2.1
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
    let _dialog_Timer: number = 0;

    // Variables: Current Process:
    let _current_Process_Options: Options = null!;
    let _current_Process_Elements: HTMLElement[] = [];
    let _current_Process_Properties: DialogProperties = {} as DialogProperties;
    let _current_Process_Element: HTMLElement = null!;

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
    }

    function setDialogText() : void {
        let title: string = _current_Process_Options.titleText!;

        if ( !Is.definedString( title ) ) {
            if ( _current_Process_Options.mode === Mode.css ) {
                title = _configuration.cssPropertiesText!;
            } else if ( _current_Process_Options.mode === Mode.attributes ) {
                title = _configuration.attributesText!;
            } else if ( _current_Process_Options.mode === Mode.size ) {
                title = _configuration.sizeText!;
            }
        }

        _dialog_Title.innerHTML = title;
    }

    function closeDialog() {
        _dialog.style.display = "none";
    }

    function onCopy() {
        const lines: string[] = [];

        for ( let propertyName in _current_Process_Properties ) {
            if ( _current_Process_Properties.hasOwnProperty( propertyName ) ) {
                if ( _current_Process_Options.mode === Mode.css ) {
                    lines.push( `${ propertyName }: ${ _current_Process_Properties[ propertyName ] };` )
                } else if ( _current_Process_Options.mode === Mode.attributes ) {
                    lines.push( `${ propertyName }="${ _current_Process_Properties[ propertyName ] }"` )
                }
            }
        }

        if ( _current_Process_Options.mode === Mode.css ) {
            navigator.clipboard.writeText( `${ _current_Process_Element.nodeName.toLowerCase() } { ${ Char.newLine } ${ lines.join( Char.newLine )} ${ Char.newLine } }` );
        } else if ( _current_Process_Options.mode === Mode.attributes ) {
            navigator.clipboard.writeText( lines.join( Char.space ) );
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
        _current_Process_Element = element;

        if ( _current_Process_Options.mode === Mode.size ) {
            _dialog_Buttons_Copy.style.display = "none";
        } else {
            _dialog_Buttons_Copy.style.removeProperty( "display" );
        }

        if ( _current_Process_Options.mode === Mode.css ) {
            buildCssProperties( element );
        } else if ( _current_Process_Options.mode === Mode.attributes ) {
            buildAttributeProperties( element );
        } else if ( _current_Process_Options.mode === Mode.size ) {
            buildSizeProperties( element );
        }
    }

    function buildCssProperties( element: HTMLElement ) : void {
        const computedStyles: CSSStyleDeclaration = getComputedStyle( element );
        const computedStylesLength: number = computedStyles.length;

        for( let styleIndex: number = 0; styleIndex < computedStylesLength; styleIndex++ ) {
            buildPropertyRow( element, computedStyles[ styleIndex ], computedStyles.getPropertyValue( computedStyles[ styleIndex ] ) );
        }
    }

    function buildAttributeProperties( element: HTMLElement ) : void {
        if ( element.hasAttributes() ) {
            for ( let attribute of element.attributes ) {
                buildPropertyRow( element, attribute.name, attribute.value );
            }

        } else {
            _dialog_Contents.innerHTML = _configuration.noAttributesAvailableText!;
        }
    }

    function buildSizeProperties( element: HTMLElement ) : void {
        const offset: Position = DomElement.getOffset( element );

        buildPropertyRow( element, "left", offset.left.toString() + "px", false );
        buildPropertyRow( element, "top", offset.top.toString() + "px", false );
        buildPropertyRow( element, "width", element.offsetWidth.toString() + "px", false );
        buildPropertyRow( element, "height", element.offsetHeight.toString() + "px", false );
    }

    function buildPropertyRow( element: HTMLElement, propertyNameText: string, propertyValueText: string, allowEditing: boolean = true ) : void {
        if ( _current_Process_Options.showOnly!.length === 0 || _current_Process_Options.showOnly!.indexOf( propertyNameText ) > Value.notFound ) {
            const property: HTMLElement = DomElement.create( _dialog_Contents, "div", "property-row" );

            DomElement.createWithHTML( property, "div", "property-name", propertyNameText );
            
            const propertyValue: HTMLElement = DomElement.create( property, "div", "property-value" );
            const propertyValueInput: HTMLInputElement = DomElement.create( propertyValue, "input" ) as HTMLInputElement;

            if ( _current_Process_Options.mode !== Mode.size ) {
                const copyButton: HTMLButtonElement = DomElement.createWithHTML( property, "button", "copy", _configuration.copySymbolText! ) as HTMLButtonElement;
                const pasteButton: HTMLButtonElement = DomElement.createWithHTML( property, "button", "paste", _configuration.pasteSymbolText! ) as HTMLButtonElement;
                const removeButton: HTMLButtonElement = DomElement.createWithHTML( property, "button", "remove", _configuration.removeSymbolText! ) as HTMLButtonElement;

                copyButton.title = _configuration.copyText!;
                pasteButton.title = _configuration.pasteText!;
                removeButton.title = _configuration.removeText!;

                copyButton.onclick = () => {
                    navigator.clipboard.writeText( propertyValueText );
                };
    
                pasteButton.onclick = () => {
                    navigator.clipboard.readText().then( data => {
                        propertyValueInput.value = data;
                    } );
                };

                removeButton.onclick = () => {
                    if ( _current_Process_Options.mode === Mode.css ) {
                        element.style.removeProperty( propertyNameText );
                    } else if ( _current_Process_Options.mode === Mode.attributes ) {
                        element.removeAttribute( propertyNameText );
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

    function onPropertyValueKeyUp( e: KeyboardEvent, propertyName: string, input: HTMLInputElement, element: HTMLElement ) {
        if ( e.code === KeyCode.enter ) {
            if ( _current_Process_Options.mode === Mode.css ) {
                element.style.setProperty( propertyName, input.value );
            } else if ( _current_Process_Options.mode === Mode.attributes ) {
                element.setAttribute( propertyName, input.value );
            }
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Node Events
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function buildNodeEvents() : void {
        const tagTypes: string[] = _current_Process_Options.nodeType as string[];
        const tagTypesLength: number = tagTypes.length;

        for ( let tagTypeIndex: number = 0; tagTypeIndex < tagTypesLength; tagTypeIndex++ ) {
            const domElements: HTMLCollectionOf<Element> = document.getElementsByTagName( tagTypes[ tagTypeIndex ] );
            const elements: HTMLElement[] = [].slice.call( domElements );
            const elementsLength: number = elements.length;

            for ( let elementIndex: number = 0; elementIndex < elementsLength; elementIndex++ ) {
                buildNodeEvent( elements[ elementIndex ] );
            }
        }

        window.addEventListener( "mousemove", closeDialog );
    }

    function buildNodeEvent( element: HTMLElement ) : void {
        const attributeValue: string = element.getAttribute( Constant.PEEK_JS_IGNORE_STATE_ATTRIBUTE )!;

        if ( !Is.definedString( attributeValue ) ?? attributeValue !== IgnoreState.ignore ) {
            element.addEventListener( "mousemove", ( e ) => {
                onNodeMouseOver( e, element );
            } );
    
            _current_Process_Elements.push( element );
        }
    }

    function removeNodeEvents() : void {
        const currentProcessElementsLength: number = _current_Process_Elements.length;

        for ( let elementIndex: number = 0; elementIndex < currentProcessElementsLength; elementIndex++ ) {
            var element: HTMLElement = _current_Process_Elements[ elementIndex ];

            element.removeEventListener( "mousemove", ( e ) => {
                onNodeMouseOver( e, element );
            } );
        }

        _current_Process_Elements = [] as HTMLElement[];

        window.removeEventListener( "mousemove", closeDialog );

        closeDialog();
    }

    function onNodeMouseOver( e: MouseEvent, element: HTMLElement ) {
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
        _configuration.cssPropertiesText = Data.getDefaultAnyString( _configuration.cssPropertiesText, "CSS Properties" );
        _configuration.attributesText = Data.getDefaultAnyString( _configuration.attributesText, "Attributes" );
        _configuration.sizeText = Data.getDefaultAnyString( _configuration.sizeText, "Size" );
        _configuration.noAttributesAvailableText = Data.getDefaultAnyString( _configuration.noAttributesAvailableText, "No attributes are available." );
        _configuration.closeText = Data.getDefaultAnyString( _configuration.closeText, "Close" );
        _configuration.copyText = Data.getDefaultAnyString( _configuration.copyText, "Copy" );
        _configuration.copySymbolText = Data.getDefaultAnyString( _configuration.copySymbolText, "❐" );
        _configuration.pasteText = Data.getDefaultAnyString( _configuration.pasteText, "Paste" );
        _configuration.pasteSymbolText = Data.getDefaultAnyString( _configuration.pasteSymbolText, "☐" );
        _configuration.removeText = Data.getDefaultAnyString( _configuration.removeText, "Remove" );
        _configuration.removeSymbolText = Data.getDefaultAnyString( _configuration.removeSymbolText, "✕" );
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

        start: function ( options: Options ): PublicApi {
            if ( !Is.definedObject( _current_Process_Options ) ) {
                _current_Process_Options = buildOptions( options );

                setDialogText();
                buildNodeEvents();
            }

            return _public;
        },

        stop: function (): PublicApi {
            if ( Is.definedObject( _current_Process_Options ) ) {
                _current_Process_Options = null!;

                removeNodeEvents();
            }

            return _public;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Configuration
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        setConfiguration: function ( newConfiguration: any ): PublicApi {
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

        getVersion: function (): string {
            return "1.2.1";
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