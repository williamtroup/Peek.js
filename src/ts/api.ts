/**
 * Peek.js
 * 
 * A lightweight JavaScript library that attaches a viewer to a specific node type, allowing you to view the CSS properties, attributes, and size/position.
 * 
 * @file        api.ts
 * @version     v1.5.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import { type Options } from "./type";


export type PublicApi = {
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API Functions:  Running
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * start().
     * 
     * Starts the peek process using the options passed and attaches the viewed to the DOM elements.
     * 
     * @public
     * 
     * @param       {Object}    options                                     All the options to use.
     * 
     * @returns     {Object}                                                The Peek.js class instance.
     */
    start: ( options: Options ) => PublicApi;


    /**
     * stop().
     * 
     * Stops the peek process.
     * 
     * @public
     * 
     * @returns     {Object}                                                The Peek.js class instance.
     */
    stop: () => PublicApi;

    /**
     * close().
     * 
     * Closes the dialog.
     * 
     * @public
     * 
     * @returns     {Object}                                                The Peek.js class instance.
     */
    close: () => PublicApi;


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API Functions:  Configuration
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * setConfiguration().
     * 
     * Sets the specific configuration options that should be used.
     * 
     * @public
     * 
     * @param       {Object}    newConfiguration                            All the configuration options that should be set (refer to "Configuration Options" documentation for properties).
     * 
     * @returns     {Object}                                                The Peek.js class instance.
     */
    setConfiguration: ( newConfiguration: any ) => PublicApi;


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API Functions:  Additional Data
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * getVersion().
     * 
     * Returns the version of Heat.js.
     * 
     * @public
     * 
     * @returns     {string}                                                The version number.
     */
    getVersion: () => string;
};

declare global {
	interface Window {
		$peek: PublicApi;
	}
}