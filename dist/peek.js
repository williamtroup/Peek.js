"use strict";

var e;

(e => {
    function t(e) {
        return e !== null && e !== void 0 && e.toString() !== "";
    }
    e.defined = t;
    function n(e) {
        return t(e) && typeof e === "object";
    }
    e.definedObject = n;
    function i(e) {
        return t(e) && typeof e === "boolean";
    }
    e.definedBoolean = i;
    function o(e) {
        return t(e) && typeof e === "string";
    }
    e.definedString = o;
    function r(e) {
        return t(e) && typeof e === "function";
    }
    e.definedFunction = r;
    function l(e) {
        return t(e) && typeof e === "number";
    }
    e.definedNumber = l;
    function u(e) {
        return n(e) && e instanceof Array;
    }
    e.definedArray = u;
    function c(e) {
        return n(e) && e instanceof Date;
    }
    e.definedDate = c;
    function a(e, t = 1) {
        return !u(e) || e.length < t;
    }
    e.invalidOptionArray = a;
})(e || (e = {}));

var t;

(t => {
    function n(t, n, i = "") {
        const o = n.toLowerCase();
        const r = o === "text";
        let l = r ? document.createTextNode("") : document.createElement(o);
        if (e.defined(i)) {
            l.className = i;
        }
        t.appendChild(l);
        return l;
    }
    t.create = n;
    function i(e, t, i, o) {
        const r = n(e, t, i);
        r.innerHTML = o;
        return r;
    }
    t.createWithHTML = i;
    function o(e, t, n = false) {
        let i = null;
        if (document.defaultView.getComputedStyle) {
            i = document.defaultView.getComputedStyle(e, null).getPropertyValue(t);
        } else if (e.currentStyle) {
            i = e.currentStyle[t];
        }
        if (n) {
            i = parseFloat(i);
        }
        return i;
    }
    t.getStyleValueByName = o;
    function r(e, t) {
        e.className += " " + t;
        e.className = e.className.trim();
    }
    t.addClass = r;
    function l(e, t) {
        e.className = e.className.replace(t, "");
        e.className = e.className.trim();
    }
    t.removeClass = l;
    function u(e) {
        e.preventDefault();
        e.cancelBubble = true;
    }
    t.cancelBubble = u;
    function c() {
        const e = document.documentElement;
        const t = {
            left: e.scrollLeft - (e.clientLeft || 0),
            top: e.scrollTop - (e.clientTop || 0)
        };
        return t;
    }
    t.getScrollPosition = c;
    function a(e, t) {
        if (t.style.display !== "block") {
            let n = e.pageX;
            let i = e.pageY;
            const o = c();
            t.style.display = "block";
            if (n + t.offsetWidth > window.innerWidth) {
                n -= t.offsetWidth;
            } else {
                n++;
            }
            if (i + t.offsetHeight > window.innerHeight) {
                i -= t.offsetHeight;
            } else {
                i++;
            }
            if (n < o.left) {
                n = e.pageX + 1;
            }
            if (i < o.top) {
                i = e.pageY + 1;
            }
            t.style.left = n + "px";
            t.style.top = i + "px";
        }
    }
    t.showElementAtMousePosition = a;
})(t || (t = {}));

var n;

(t => {
    function n(e, t) {
        return typeof e === "string" ? e : t;
    }
    t.getDefaultAnyString = n;
    function i(t, n) {
        return e.definedString(t) ? t : n;
    }
    t.getDefaultString = i;
    function o(t, n) {
        return e.definedBoolean(t) ? t : n;
    }
    t.getDefaultBoolean = o;
    function r(t, n) {
        return e.definedNumber(t) ? t : n;
    }
    t.getDefaultNumber = r;
    function l(t, n) {
        return e.definedFunction(t) ? t : n;
    }
    t.getDefaultFunction = l;
    function u(t, n) {
        return e.definedArray(t) ? t : n;
    }
    t.getDefaultArray = u;
    function c(t, n) {
        return e.definedObject(t) ? t : n;
    }
    t.getDefaultObject = c;
    function a(t, n) {
        let i = n;
        if (e.definedString(t)) {
            const e = t.toString().split(" ");
            if (e.length === 0) {
                t = n;
            } else {
                i = e;
            }
        } else {
            i = u(t, n);
        }
        return i;
    }
    t.getDefaultStringOrArray = a;
})(n || (n = {}));

(() => {
    let i = {};
    let o = null;
    let r = null;
    let l = null;
    let u = null;
    let c = 0;
    let a = null;
    let f = [];
    function s() {
        if (e.definedObject(o)) {
            p();
            document.body.removeChild(o);
            o = null;
        }
        o = t.create(document.body, "div", "peek-js");
        o.onmousemove = t.cancelBubble;
        r = t.create(o, "div", "dialog-title-bar");
        l = t.create(o, "div", "dialog-contents");
        u = t.create(o, "div", "dialog-buttons");
        const n = t.createWithHTML(u, "button", "copy", "Copy");
        const i = t.createWithHTML(u, "button", "close", "Close");
        n.onclick = () => {};
        i.onclick = () => {
            p();
        };
    }
    function d() {
        let t = a.titleText;
        if (!e.definedString(t)) {
            if (a.mode === 1) {
                t = i.cssPropertiesText;
            } else if (a.mode === 2) {
                t = i.attributesText;
            } else if (a.mode === 3) {
                t = i.sizeText;
            }
        }
        r.innerHTML = t;
    }
    function p() {
        o.style.display = "none";
    }
    function g(e) {
        l.innerHTML = "";
        l.scrollTop = 0;
        if (a.mode === 1) {
            m(e);
        } else if (a.mode === 2) {
            y(e);
        }
    }
    function m(e) {
        const n = getComputedStyle(e);
        const i = n.length;
        for (let e = 0; e < i; e++) {
            const i = t.create(l, "div", "property-row");
            const o = n[e];
            t.createWithHTML(i, "div", "property-name", o);
            const r = t.create(i, "div", "property-value");
            const u = t.create(r, "input");
            u.type = "text";
            u.value = n.getPropertyValue(o);
        }
    }
    function y(e) {
        if (e.hasAttributes()) {
            for (let n of e.attributes) {
                const e = t.create(l, "div", "property-row");
                t.createWithHTML(e, "div", "property-name", n.name);
                const i = t.create(e, "div", "property-value");
                const o = t.create(i, "input");
                o.type = "text";
                o.value = n.value;
            }
        } else {
            l.innerHTML = i.noAttributesAvailableText;
        }
    }
    function b() {
        const e = a.nodeType;
        const t = e.length;
        for (let n = 0; n < t; n++) {
            const t = document.getElementsByTagName(e[n]);
            const i = [].slice.call(t);
            const o = i.length;
            for (let e = 0; e < o; e++) {
                v(i[e]);
            }
        }
        window.addEventListener("mousemove", p);
    }
    function v(e) {
        e.addEventListener("mousemove", (t => {
            D(t, e);
        }));
        f.push(e);
    }
    function T() {
        const e = f.length;
        for (let n = 0; n < e; n++) {
            var t = f[n];
            t.removeEventListener("mousemove", (e => {
                D(e, t);
            }));
        }
        f = [];
        window.removeEventListener("mousemove", p);
        p();
    }
    function D(e, n) {
        t.cancelBubble(e);
        if (c !== 0) {
            clearTimeout(c);
            c = 0;
        }
        c = setTimeout((() => {
            g(n);
            t.showElementAtMousePosition(e, o);
        }), i.dialogDisplayDelay);
    }
    function h(e) {
        let t = n.getDefaultObject(e, {});
        t.nodeType = n.getDefaultStringOrArray(t.nodeType, []);
        t.mode = n.getDefaultNumber(t.mode, 1);
        t.titleText = n.getDefaultString(t.titleText, "");
        return t;
    }
    function S(e = null) {
        i = n.getDefaultObject(e, {});
        i.dialogDisplayDelay = n.getDefaultNumber(i.dialogDisplayDelay, 1e3);
        A();
    }
    function A() {
        i.cssPropertiesText = n.getDefaultAnyString(i.cssPropertiesText, "CSS Properties");
        i.attributesText = n.getDefaultAnyString(i.attributesText, "Attributes");
        i.sizeText = n.getDefaultAnyString(i.sizeText, "Size");
        i.noAttributesAvailableText = n.getDefaultAnyString(i.noAttributesAvailableText, "No attributes are available.");
    }
    const w = {
        start: function(t) {
            if (!e.definedObject(a)) {
                a = h(t);
                d();
                b();
            }
            return w;
        },
        stop: function() {
            if (e.definedObject(a)) {
                a = null;
                T();
            }
            return w;
        },
        setConfiguration: function(t) {
            if (e.definedObject(t)) {
                let n = false;
                const o = i;
                for (let e in t) {
                    if (t.hasOwnProperty(e) && i.hasOwnProperty(e) && o[e] !== t[e]) {
                        o[e] = t[e];
                        n = true;
                    }
                }
                if (n) {
                    S(o);
                    s();
                    if (e.definedObject(a)) {
                        d();
                    }
                }
            }
            return w;
        },
        getVersion: function() {
            return "1.0.0";
        }
    };
    (() => {
        S();
        document.addEventListener("DOMContentLoaded", (() => {
            s();
        }));
        if (!e.defined(window.$peek)) {
            window.$peek = w;
        }
    })();
})();//# sourceMappingURL=peek.js.map