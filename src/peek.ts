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
import { Mode } from "./ts/enum";


( () => {
    // Variables: Configuration
    let _configuration: Configuration = {} as Configuration;

    // Variables: Dialog
    let _dialog: HTMLElement = null!;
    let _dialog_Title: HTMLElement = null!;
    let _dialog_Contents: HTMLElement = null!;
    let _dialog_Buttons: HTMLElement = null!;

    // Variables: Current Process:
    let _current_Process_Options: Options = null!;


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Build Dialog
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function buildDialog() {
        _dialog = DomElement.create( document.body, "div", "peek-js" );
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
        
        return options;
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
            _current_Process_Options = buildOptions( options );

            return _public;
        },

        stop: function (): PublicApi {
            throw new Error("Function not implemented.");
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Configuration
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        setConfiguration: function ( newConfiguration: Configuration ): PublicApi {
            throw new Error("Function not implemented.");
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
        document.addEventListener( "DOMContentLoaded", () => {
            buildDialog();
        } );

        if ( !Is.defined( window.$peek ) ) {
            window.$peek = _public;
        }
    } )();
} )();