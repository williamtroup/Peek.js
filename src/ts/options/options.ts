/**
 * Peek.js
 * 
 * A lightweight JavaScript library that attaches a viewer to a specific node type, allowing you to view the CSS properties, attributes, and size/position.
 * 
 * @file        options.ts
 * @version     v1.6.1
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import { type Options } from "../type";
import { Default } from "../data/default";
import { Char, Mode } from "../data/enum";


export namespace Start {
    export namespace Options {
        export function get( newOptions: any ) : Options {
            let options: Options = Default.getObject( newOptions, {} as Options );
            options.nodeType = Default.getStringOrArray( options.nodeType, [] );
            options.mode = Default.getNumber( options.mode, Mode.css );
            options.titleText = Default.getString( options.titleText, Char.empty );
            options.showOnly = Default.getStringOrArray( options.showOnly, [] );
            options.allowEditing = Default.getBoolean( options.allowEditing, false );
            options.showIdOrNameInTitle = Default.getBoolean( options.showIdOrNameInTitle, true );
            options.showNodeNameInTitle = Default.getBoolean( options.showNodeNameInTitle, false );
    
            return options;
        }
    }
}