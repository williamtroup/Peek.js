/**
 * Peek.js
 * 
 * A lightweight JavaScript library that attaches a viewer to a specific node type, allowing you to view the CSS properties, attributes, and size/position.
 * 
 * @file        options.ts
 * @version     v1.8.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import { type StartOptions } from "../type";
import { Default } from "../data/default";
import { Char, Mode } from "../data/enum";


export namespace Start {
    export namespace Options {
        export function get( newOptions: any ) : StartOptions {
            let options: StartOptions = Default.getObject( newOptions, {} as StartOptions );
            options.nodeType = Default.getStringOrArray( options.nodeType, [] );
            options.mode = Default.getNumber( options.mode, Mode.css );
            options.titleText = Default.getString( options.titleText, Char.empty );
            options.showOnly = Default.getStringOrArray( options.showOnly, [] );
            options.allowEditing = Default.getBoolean( options.allowEditing, false );
            options.showIdOrNameInTitle = Default.getBoolean( options.showIdOrNameInTitle, true );
            options.showNodeNameInTitle = Default.getBoolean( options.showNodeNameInTitle, false );
            options.ignoreValues = Default.getStringOrArray( options.ignoreValues, [] );
            options.showLockButtonInTitle = Default.getBoolean( options.showLockButtonInTitle, true );
            options.dialogOffset = Default.getNumber( options.dialogOffset, 0 );

            return options;
        }
    }
}