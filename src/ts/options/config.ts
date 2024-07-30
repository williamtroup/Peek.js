/**
 * Peek.js
 * 
 * A lightweight JavaScript library that attaches a viewer to a specific node type, allowing you to view the CSS properties, attributes, and size/position.
 * 
 * @file        config.ts
 * @version     v1.7.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import { type Configuration, type ConfigurationText } from "../type";
import { Default } from "../data/default";


export namespace Config {
    export namespace Options {
        export function get( newConfiguration: Configuration = null! ) : Configuration {
            let configuration: Configuration = Default.getObject( newConfiguration, {} as Configuration );
            configuration.dialogDisplayDelay = Default.getNumber( configuration.dialogDisplayDelay, 1000 );
            configuration.searchDelayDelay = Default.getNumber( configuration.searchDelayDelay, 500 );
    
            configuration = getText( configuration );

            return configuration;
        }
    
        function getText( configuration: Configuration ) : Configuration {
            configuration.text = Default.getObject( configuration.text, {} as ConfigurationText );
            configuration.text!.cssText = Default.getAnyString( configuration.text!.cssText, "CSS" );
            configuration.text!.attributesText = Default.getAnyString( configuration.text!.attributesText, "Attributes" );
            configuration.text!.sizeText = Default.getAnyString( configuration.text!.sizeText, "Size" );
            configuration.text!.classesText = Default.getAnyString( configuration.text!.classesText, "Classes" );
            configuration.text!.noAttributesAvailableText = Default.getAnyString( configuration.text!.noAttributesAvailableText, "No attributes are available." );
            configuration.text!.closeText = Default.getAnyString( configuration.text!.closeText, "Close" );
            configuration.text!.copyText = Default.getAnyString( configuration.text!.copyText, "Copy" );
            configuration.text!.copySymbolText = Default.getAnyString( configuration.text!.copySymbolText, "❐" );
            configuration.text!.pasteText = Default.getAnyString( configuration.text!.pasteText, "Paste" );
            configuration.text!.pasteSymbolText = Default.getAnyString( configuration.text!.pasteSymbolText, "☐" );
            configuration.text!.removeText = Default.getAnyString( configuration.text!.removeText, "Remove" );
            configuration.text!.removeSymbolText = Default.getAnyString( configuration.text!.removeSymbolText, "✕" );
            configuration.text!.noClassesAvailableText = Default.getAnyString( configuration.text!.noClassesAvailableText, "No classes are available." );
            configuration.text!.searchPropertiesPlaceHolderText = Default.getAnyString( configuration.text!.searchPropertiesPlaceHolderText, "Search properties..." );
            configuration.text!.clearText = Default.getAnyString( configuration.text!.clearText, "Clear" );
            configuration.text!.clearSymbolText = Default.getAnyString( configuration.text!.clearSymbolText, "✕" );
            configuration.text!.noPropertiesFoundForSearchText = Default.getAnyString( configuration.text!.noPropertiesFoundForSearchText, "No properties were found for your search." );
            configuration.text!.dialogMovedSymbolText = Default.getAnyString( configuration.text!.dialogMovedSymbolText, "✱" );
            configuration.text!.propertyValuePlaceHolderText = Default.getAnyString( configuration.text!.propertyValuePlaceHolderText, "Enter value..." );
            configuration.text!.modeNotSupportedText = Default.getAnyString( configuration.text!.modeNotSupportedText, "The mode you have specified is not supported." );
            configuration.text!.unknownModeText = Default.getAnyString( configuration.text!.unknownModeText, "Unknown Mode" );
            configuration.text!.moveUpText = Default.getAnyString( configuration.text!.moveUpText, "Move Up" );
            configuration.text!.moveUpSymbolText = Default.getAnyString( configuration.text!.moveUpSymbolText, "↑" );
            configuration.text!.moveDownText = Default.getAnyString( configuration.text!.moveDownText, "Move Down" );
            configuration.text!.moveDownSymbolText = Default.getAnyString( configuration.text!.moveDownSymbolText, "↓" );
            configuration.text!.removeElementSymbolText = Default.getAnyString( configuration.text!.removeElementSymbolText, "⌫" );

            return configuration;
        }
    }
}