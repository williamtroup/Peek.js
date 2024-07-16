/**
 * Peek.js
 * 
 * A lightweight JavaScript library that attaches a viewer to a specific node type, allowing you to view the CSS properties, attributes, and size/position.
 * 
 * @file        enum.ts
 * @version     v1.6.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


export const enum Char {
    empty = "",
    space = " ",
    newLine = "\n",
    hash = "#",
}

export const enum Mode {
    css = 1,
    attributes = 2,
    size = 3,
    class = 4,
}

export const enum Value {
    notFound = -1,
}

export const enum KeyCode {
    enter = "Enter",
}

export const enum IgnoreState {
    ignore = "ignore",
}