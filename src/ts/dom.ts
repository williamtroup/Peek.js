/**
 * Peek.js
 * 
 * A lightweight JavaScript library that attaches a viewer to a specific node type, allowing you to view the CSS properties, attributes, and size/position.
 * 
 * @file        dom.ts
 * @version     v1.2.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import { Constant } from "./constant";
import { Char, IgnoreState } from "./enum";
import { Is } from "./is";
import { type Position } from "./type";


export namespace DomElement {
    export function create( container: HTMLElement, type: string, className: string = Char.empty ) : HTMLElement {
        const nodeType: string = type.toLowerCase();
        const isText: boolean = nodeType === "text";

        let result: any = isText ? document.createTextNode( Char.empty ) : document.createElement( nodeType );

        result.setAttribute( Constant.PEEK_JS_IGNORE_STATE_ATTRIBUTE, IgnoreState.ignore );

        if ( Is.defined( className ) ) {
            result.className = className;
        }

        container.appendChild( result );

        return result;
    }

    export function createWithHTML( container: HTMLElement, type: string, className: string, html: string ) : HTMLElement {
        const element: HTMLElement = create( container, type, className );
        element.innerHTML = html;
        element.setAttribute( Constant.PEEK_JS_IGNORE_STATE_ATTRIBUTE, IgnoreState.ignore );

        return element;
    }

    export function cancelBubble( e: Event ) {
        e.preventDefault();
        e.cancelBubble = true;
    }

    export function getScrollPosition() : Position {
        const documentElement: HTMLElement = document.documentElement;

        const result: Position = {
            left: documentElement.scrollLeft  - ( documentElement.clientLeft || 0 ),
            top: documentElement.scrollTop - ( documentElement.clientTop || 0 )
        } as Position;

        return result;
    }

    export function showElementAtMousePosition( e: any, element: HTMLElement ) {
        if ( element.style.display !== "block" ) {
            let left: number = e.pageX;
            let top: number = e.pageY;
            const scrollPosition: Position = getScrollPosition();
    
            element.style.display = "block";
    
            if ( left + element.offsetWidth > window.innerWidth ) {
                left -= element.offsetWidth;
            } else {
                left++;
            }
    
            if ( top + element.offsetHeight > window.innerHeight ) {
                top -= element.offsetHeight;
            } else {
                top++;
            }
    
            if ( left < scrollPosition.left ) {
                left = e.pageX + 1;
            }
    
            if ( top < scrollPosition.top ) {
                top = e.pageY + 1;
            }
            
            element.style.left = left + "px";
            element.style.top = top + "px";
        }
    }

    export function getOffset( element: HTMLElement ) : Position {
        const result: Position = {
            left: 0,
            top: 0
        } as Position;

        while ( element && !isNaN( element.offsetLeft ) && !isNaN( element.offsetTop ) ) {
            result.left += element.offsetLeft - element.scrollLeft;
            result.top += element.offsetTop - element.scrollTop;

            element = element.offsetParent as HTMLElement;
        }

        return result;
    }
}