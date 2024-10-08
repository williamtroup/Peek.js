/**
 * Peek.js
 * 
 * A lightweight JavaScript library that attaches a viewer to a specific node type, allowing you to view the CSS properties, attributes, and size/position.
 * 
 * @file        is.ts
 * @version     v1.8.1
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import { Char } from "./enum";


export namespace Is {
    export function defined( value: any ) : boolean {
        return value !== null && value !== undefined && value.toString() !== Char.empty;
    }

    export function definedObject( object: any ) : boolean {
        return defined( object ) && typeof object === "object";
    }

    export function definedBoolean( object: any ) : boolean {
        return defined( object ) && typeof object === "boolean";
    }

    export function definedString( object: any ) : boolean {
        return defined( object ) && typeof object === "string";
    }

    export function definedFunction( object: any ) : boolean {
        return defined( object ) && typeof object === "function";
    }

    export function definedNumber( object: any ) : boolean {
        return defined( object ) && typeof object === "number";
    }

    export function definedArray( object: any ) : boolean {
        return definedObject( object ) && object instanceof Array;
    }

    export function definedDate( object: any ) : boolean {
        return definedObject( object ) && object instanceof Date;
    }

    export function invalidOptionArray( array: any, minimumLength: number = 1 ) : boolean {
        return !definedArray( array ) || array.length < minimumLength;
    }

    export function hexColor( value: string ) : boolean {
        let valid: boolean = value.length >= 2 && value.length <= 7;
    
        if ( valid && value[ 0 ] === Char.hash ) {
            valid = isNaN( +value.substring( 1, value.length - 1 ) );
        } else {
            valid = false;
        }
    
        return valid;
    }

    export function isRgbColor( value: string ) : boolean {
        return value.startsWith( "rgb" ) || value.startsWith( "rgba" );
    }
}