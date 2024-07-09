/**
 * Peek.js
 * 
 * A lightweight JavaScript library that attaches a viewer to a specific node type, allowing you to view the CSS properties, attributes, and size/position.
 * 
 * @file        type.ts
 * @version     v1.1.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


export type Position = {
    left: number;
    top: number;
};

export type Configuration = {
	cssPropertiesText?: string;
    attributesText?: string;
    sizeText?: string;
    noAttributesAvailableText?: string;
    closeText?: string;
    dialogDisplayDelay?: number;
};

export type Options = {
    nodeType: string[] | string;
    mode: number;
    titleText?: string;
};