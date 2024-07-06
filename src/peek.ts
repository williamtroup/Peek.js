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


import { type Options } from "./ts/type";


class Peek {
    options: Options;
   
    constructor( options: Options ) {
        this.options = options;

        this.build();
    }
   
    private build() {
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API Functions:  Additional Data
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    public getVersion() : string {
        return "1.0.0";
    }
}