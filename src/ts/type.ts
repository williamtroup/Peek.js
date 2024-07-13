/**
 * Peek.js
 * 
 * A lightweight JavaScript library that attaches a viewer to a specific node type, allowing you to view the CSS properties, attributes, and size/position.
 * 
 * @file        type.ts
 * @version     v1.5.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


export type Position = {
    left: number;
    top: number;
};

export type Configuration = {
	dialogDisplayDelay?: number;
    text?: ConfigurationText;
};

export type ConfigurationText = {
	cssText?: string;
    attributesText?: string;
    sizeText?: string;
    classesText?: string;
    noAttributesAvailableText?: string;
    closeText?: string;
    copyText?: string;
    copySymbolText?: string;
    pasteText?: string;
    pasteSymbolText?: string;
    removeText?: string;
    removeSymbolText?: string;
    noClassesAvailableText?: string;
    searchPropertiesPlaceHolderText?: string;
    clearText?: string;
    clearSymbolText?: string;
    noPropertiesFoundForSearchText?: string;
}

export type Options = {
    nodeType: string[] | string;
    mode: number;
    titleText?: string;
    showOnly?: string[] | string;
    allowEditing?: boolean;
    showIdOrNameInTitle?: boolean;
    showNodeNameInTitle?: boolean;
};