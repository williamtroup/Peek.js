/**
 * Peek.js
 * 
 * A lightweight JavaScript.
 * 
 * @file        type.ts
 * @version     v1.0.0
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
};

export type Options = {
    nodeType: string[] | string;
    mode: number;
    titleText?: string;
};