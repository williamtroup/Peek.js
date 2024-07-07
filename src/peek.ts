/**
 * Peek.js
 * 
 * A lightweight JavaScript.
 * 
 * @file        peek.ts
 * @version     v1.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import { type Configuration, type Options } from "./ts/type";
import { PublicApi } from "./ts/api";
import { Is } from "./ts/is";
import { DomElement } from "./ts/dom";
import { Data } from "./ts/data";
import { Char, Mode } from "./ts/enum";


( () => {
    // Variables: Configuration
    let _configuration: Configuration = {} as Configuration;

    // Variables: Dialog
    let _dialog: HTMLElement = null!;
    let _dialog_Title: HTMLElement = null!;
    let _dialog_Contents: HTMLElement = null!;
    let _dialog_Buttons: HTMLElement = null!;
    let _dialog_Timer: number = 0;

    // Variables: Current Process:
    let _current_Process_Options: Options = null!;
    let _current_Process_Elements: HTMLElement[] = [];


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Build Dialog
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function buildDialog() : void {
        _dialog = DomElement.create( document.body, "div", "peek-js" );
        _dialog.onmousemove = DomElement.cancelBubble;

        _dialog_Title = DomElement.create( _dialog, "div", "dialog-title-bar" );
        _dialog_Contents = DomElement.create( _dialog, "div", "dialog-contents" );
        _dialog_Buttons = DomElement.create( _dialog, "div", "dialog-buttons" );

        const copyButton: HTMLElement = DomElement.createWithHTML( _dialog_Buttons, "button", "copy", "Copy" );
        const closeButton: HTMLElement = DomElement.createWithHTML( _dialog_Buttons, "button", "close", "Close" );

        copyButton.onclick = () => {
        };

        closeButton.onclick = () => {
            closeDialog();
        };
    }

    function setDialogText() : void {
        _dialog_Title.innerHTML = _current_Process_Options.titleText!;
    }

    function closeDialog() {
        _dialog.style.display = "none";
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Build Dialog Content
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function buildDialogContent( element: HTMLElement ) : void {
        _dialog_Contents.innerHTML = Char.empty;
        _dialog_Contents.scrollTop = 0;

        if ( _current_Process_Options.mode === Mode.css ) {
            buildCssProperties( element );
        } else if ( _current_Process_Options.mode === Mode.attributes ) {
            buildAttributeProperties( element );
        }
    }

    function buildCssProperties( element: HTMLElement ) : void {
        const computedStyles: CSSStyleDeclaration = getComputedStyle( element );
        const computedStylesLength: number = computedStyles.length;

        for( let styleIndex: number = 0; styleIndex < computedStylesLength; styleIndex++ ) {
            const property: HTMLElement = DomElement.create( _dialog_Contents, "div", "property-row" );
            const propertyName: string = computedStyles[ styleIndex ];

            DomElement.createWithHTML( property, "div", "property-name", propertyName );
            
            const propertyValue: HTMLElement = DomElement.create( property, "div", "property-value" );
            const propertyValueInput: HTMLInputElement = DomElement.create( propertyValue, "input" ) as HTMLInputElement;

            propertyValueInput.type = "text";
            propertyValueInput.value = computedStyles.getPropertyValue( propertyName );
        }
    }

    function buildAttributeProperties( element: HTMLElement ) : void {
        if ( element.hasAttributes() ) {
            for ( let attribute of element.attributes ) {
                const property: HTMLElement = DomElement.create( _dialog_Contents, "div", "property-row" );
    
                DomElement.createWithHTML( property, "div", "property-name", attribute.name );
                
                const propertyValue: HTMLElement = DomElement.create( property, "div", "property-value" );
                const propertyValueInput: HTMLInputElement = DomElement.create( propertyValue, "input" ) as HTMLInputElement;
    
                propertyValueInput.type = "text";
                propertyValueInput.value = attribute.value;
            }

        } else {
            _dialog_Contents.innerHTML = _configuration.noAttributesAvailableText!;
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
        element.addEventListener( "mousemove", ( e ) => {
            onNodeMouseOver( e, element );
        } );

        _current_Process_Elements.push( element );
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
        }, 1000 );
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
        
        if ( !Is.definedString( options.titleText ) ) {
            if ( options.mode === Mode.css ) {
                options.titleText = _configuration.cssPropertiesText;
            } else if ( options.mode === Mode.attributes ) {
                options.titleText = _configuration.attributesText;
            } else if ( options.mode === Mode.size ) {
                options.titleText = _configuration.sizeText;
            }
        }

        return options;
    }


	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:  Helpers:  Configuration
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    function buildDefaultConfiguration( newConfiguration: Configuration = null! ) : void {
        _configuration = Data.getDefaultObject( newConfiguration, {} as Configuration );
        _configuration.cssPropertiesText = Data.getDefaultAnyString( _configuration.cssPropertiesText, "CSS Properties" );
        _configuration.attributesText = Data.getDefaultAnyString( _configuration.attributesText, "Attributes" );
        _configuration.sizeText = Data.getDefaultAnyString( _configuration.sizeText, "Size" );
        _configuration.noAttributesAvailableText = Data.getDefaultAnyString( _configuration.noAttributesAvailableText, "No attributes are available." );
    }


	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    const _public: PublicApi = {
        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Destroying
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        destroy: function (): PublicApi {
            throw new Error("Function not implemented.");
        },

        
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
            return "1.0.0";
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