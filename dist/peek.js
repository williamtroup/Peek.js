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
    function o(e) {
        return t(e) && typeof e === "boolean";
    }
    e.definedBoolean = o;
    function i(e) {
        return t(e) && typeof e === "string";
    }
    e.definedString = i;
    function l(e) {
        return t(e) && typeof e === "function";
    }
    e.definedFunction = l;
    function r(e) {
        return t(e) && typeof e === "number";
    }
    e.definedNumber = r;
    function f(e) {
        return n(e) && e instanceof Array;
    }
    e.definedArray = f;
    function s(e) {
        return n(e) && e instanceof Date;
    }
    e.definedDate = s;
    function a(e, t = 1) {
        return !f(e) || e.length < t;
    }
    e.invalidOptionArray = a;
})(e || (e = {}));

var t;

(e => {
    e.PEEK_JS_IGNORE_STATE_ATTRIBUTE = "data-peek-js-ignore-state";
})(t || (t = {}));

var n;

(n => {
    function o(n, o, i = "") {
        const l = o.toLowerCase();
        const r = l === "text";
        let f = r ? document.createTextNode("") : document.createElement(l);
        f.setAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE, "ignore");
        if (e.defined(i)) {
            f.className = i;
        }
        n.appendChild(f);
        return f;
    }
    n.create = o;
    function i(e, n, i, l) {
        const r = o(e, n, i);
        r.innerHTML = l;
        r.setAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE, "ignore");
        return r;
    }
    n.createWithHTML = i;
    function l(e) {
        e.preventDefault();
        e.cancelBubble = true;
    }
    n.cancelBubble = l;
    function r() {
        const e = document.documentElement;
        const t = {
            left: e.scrollLeft - (e.clientLeft || 0),
            top: e.scrollTop - (e.clientTop || 0)
        };
        return t;
    }
    n.getScrollPosition = r;
    function f(e, t) {
        if (t.style.display !== "block") {
            let n = e.pageX;
            let o = e.pageY;
            const i = r();
            t.style.display = "block";
            if (n + t.offsetWidth > window.innerWidth) {
                n -= t.offsetWidth;
            } else {
                n++;
            }
            if (o + t.offsetHeight > window.innerHeight) {
                o -= t.offsetHeight;
            } else {
                o++;
            }
            if (n < i.left) {
                n = e.pageX + 1;
            }
            if (o < i.top) {
                o = e.pageY + 1;
            }
            t.style.left = n + "px";
            t.style.top = o + "px";
        }
    }
    n.showElementAtMousePosition = f;
    function s(e) {
        const t = {
            left: 0,
            top: 0
        };
        while (e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop)) {
            t.left += e.offsetLeft - e.scrollLeft;
            t.top += e.offsetTop - e.scrollTop;
            e = e.offsetParent;
        }
        return t;
    }
    n.getOffset = s;
})(n || (n = {}));

var o;

(t => {
    function n(e, t) {
        return typeof e === "string" ? e : t;
    }
    t.getDefaultAnyString = n;
    function o(t, n) {
        return e.definedString(t) ? t : n;
    }
    t.getDefaultString = o;
    function i(t, n) {
        return e.definedBoolean(t) ? t : n;
    }
    t.getDefaultBoolean = i;
    function l(t, n) {
        return e.definedNumber(t) ? t : n;
    }
    t.getDefaultNumber = l;
    function r(t, n) {
        return e.definedArray(t) ? t : n;
    }
    t.getDefaultArray = r;
    function f(t, n) {
        return e.definedObject(t) ? t : n;
    }
    t.getDefaultObject = f;
    function s(t, n) {
        let o = n;
        if (e.definedString(t)) {
            const e = t.toString().split(" ");
            if (e.length === 0) {
                t = n;
            } else {
                o = e;
            }
        } else {
            o = r(t, n);
        }
        return o;
    }
    t.getDefaultStringOrArray = s;
})(o || (o = {}));

(() => {
    let i = {};
    let l = null;
    let r = null;
    let f = null;
    let s = null;
    let a = null;
    let u = 0;
    let c = null;
    let d = [];
    let g = {};
    let p = null;
    function y() {
        if (e.definedObject(l)) {
            b();
            document.body.removeChild(l);
            l = null;
        }
        l = n.create(document.body, "div", "peek-js");
        l.onmousemove = n.cancelBubble;
        r = n.create(l, "div", "dialog-title-bar");
        f = n.create(l, "div", "dialog-contents");
        s = n.create(l, "div", "dialog-buttons");
        a = n.createWithHTML(s, "button", "copy", i.copyText);
        a.onclick = m;
        const t = n.createWithHTML(s, "button", "close", i.closeText);
        t.onclick = b;
    }
    function T() {
        let t = c.titleText;
        if (!e.definedString(t)) {
            if (c.mode === 1) {
                t = i.cssPropertiesText;
            } else if (c.mode === 2) {
                t = i.attributesText;
            } else if (c.mode === 3) {
                t = i.sizeText;
            }
        }
        r.innerHTML = t;
    }
    function b() {
        l.style.display = "none";
    }
    function m() {
        const e = [];
        for (let t in g) {
            if (g.hasOwnProperty(t)) {
                if (c.mode === 1) {
                    e.push(`${t}: ${g[t]};`);
                } else if (c.mode === 2) {
                    e.push(`${t}="${g[t]}"`);
                }
            }
        }
        if (c.mode === 1) {
            navigator.clipboard.writeText(`${p.nodeName.toLowerCase()} { ${"\n"} ${e.join("\n")} ${"\n"} }`);
        } else if (c.mode === 2) {
            navigator.clipboard.writeText(e.join(" "));
        }
    }
    function x(e) {
        f.innerHTML = "";
        f.scrollTop = 0;
        g = {};
        p = e;
        if (c.mode === 3) {
            a.style.display = "none";
        } else {
            a.style.removeProperty("display");
        }
        if (c.mode === 1) {
            S(e);
        } else if (c.mode === 2) {
            v(e);
        } else if (c.mode === 3) {
            h(e);
        }
    }
    function S(e) {
        const t = getComputedStyle(e);
        const n = t.length;
        for (let o = 0; o < n; o++) {
            A(e, t[o], t.getPropertyValue(t[o]));
        }
    }
    function v(e) {
        if (e.hasAttributes()) {
            for (let t of e.attributes) {
                A(e, t.name, t.value);
            }
        } else {
            f.innerHTML = i.noAttributesAvailableText;
        }
    }
    function h(e) {
        const t = n.getOffset(e);
        A(e, "left", t.left.toString() + "px", false);
        A(e, "top", t.top.toString() + "px", false);
        A(e, "width", e.offsetWidth.toString() + "px", false);
        A(e, "height", e.offsetHeight.toString() + "px", false);
    }
    function A(e, t, o, l = true) {
        if (c.showOnly.length === 0 || c.showOnly.indexOf(t) > -1) {
            const r = n.create(f, "div", "property-row");
            n.createWithHTML(r, "div", "property-name", t);
            const s = n.create(r, "div", "property-value");
            const a = n.create(s, "input");
            if (c.mode !== 3) {
                const e = n.createWithHTML(r, "button", "copy", i.copySymbolText);
                const t = n.createWithHTML(r, "button", "paste", i.pasteSymbolText);
                e.title = i.copyText;
                t.title = i.pasteText;
                e.onclick = () => {
                    navigator.clipboard.writeText(o);
                };
                t.onclick = () => {
                    navigator.clipboard.readText().then((e => {
                        a.value = e;
                    }));
                };
            }
            a.type = "text";
            a.value = o;
            g[t] = o;
            if (!c.allowEditing || !l) {
                a.readOnly = true;
            } else {
                a.onkeyup = n => {
                    D(n, t, a, e);
                };
            }
        }
    }
    function D(e, t, n, o) {
        if (e.code === "Enter") {
            if (c.mode === 1) {
                o.style.setProperty(t, n.value);
            } else if (c.mode === 2) {
                o.setAttribute(t, n.value);
            }
        }
    }
    function E() {
        const e = c.nodeType;
        const t = e.length;
        for (let n = 0; n < t; n++) {
            const t = document.getElementsByTagName(e[n]);
            const o = [].slice.call(t);
            const i = o.length;
            for (let e = 0; e < i; e++) {
                w(o[e]);
            }
        }
        window.addEventListener("mousemove", b);
    }
    function w(n) {
        const o = n.getAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE);
        if (!e.definedString(o)) {
            n.addEventListener("mousemove", (e => {
                L(e, n);
            }));
            d.push(n);
        }
    }
    function O() {
        const e = d.length;
        for (let n = 0; n < e; n++) {
            var t = d[n];
            t.removeEventListener("mousemove", (e => {
                L(e, t);
            }));
        }
        d = [];
        window.removeEventListener("mousemove", b);
        b();
    }
    function L(e, t) {
        n.cancelBubble(e);
        if (u !== 0) {
            clearTimeout(u);
            u = 0;
        }
        u = setTimeout((() => {
            x(t);
            n.showElementAtMousePosition(e, l);
        }), i.dialogDisplayDelay);
    }
    function P(e) {
        let t = o.getDefaultObject(e, {});
        t.nodeType = o.getDefaultStringOrArray(t.nodeType, []);
        t.mode = o.getDefaultNumber(t.mode, 1);
        t.titleText = o.getDefaultString(t.titleText, "");
        t.showOnly = o.getDefaultStringOrArray(t.showOnly, []);
        t.allowEditing = o.getDefaultBoolean(t.allowEditing, false);
        return t;
    }
    function N(e = null) {
        i = o.getDefaultObject(e, {});
        i.dialogDisplayDelay = o.getDefaultNumber(i.dialogDisplayDelay, 1e3);
        _();
    }
    function _() {
        i.cssPropertiesText = o.getDefaultAnyString(i.cssPropertiesText, "CSS Properties");
        i.attributesText = o.getDefaultAnyString(i.attributesText, "Attributes");
        i.sizeText = o.getDefaultAnyString(i.sizeText, "Size");
        i.noAttributesAvailableText = o.getDefaultAnyString(i.noAttributesAvailableText, "No attributes are available.");
        i.closeText = o.getDefaultAnyString(i.closeText, "Close");
        i.copyText = o.getDefaultAnyString(i.copyText, "Copy");
        i.copySymbolText = o.getDefaultAnyString(i.copySymbolText, "❐");
        i.pasteText = o.getDefaultAnyString(i.pasteText, "Paste");
        i.pasteSymbolText = o.getDefaultAnyString(i.pasteSymbolText, "+");
    }
    const j = {
        start: function(t) {
            if (!e.definedObject(c)) {
                c = P(t);
                T();
                E();
            }
            return j;
        },
        stop: function() {
            if (e.definedObject(c)) {
                c = null;
                O();
            }
            return j;
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
                    N(o);
                    y();
                    if (e.definedObject(c)) {
                        T();
                    }
                }
            }
            return j;
        },
        getVersion: function() {
            return "1.2.0";
        }
    };
    (() => {
        N();
        document.addEventListener("DOMContentLoaded", (() => {
            y();
        }));
        if (!e.defined(window.$peek)) {
            window.$peek = j;
        }
    })();
})();//# sourceMappingURL=peek.js.map