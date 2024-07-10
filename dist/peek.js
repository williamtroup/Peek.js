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
    function r(e) {
        return t(e) && typeof e === "function";
    }
    e.definedFunction = r;
    function l(e) {
        return t(e) && typeof e === "number";
    }
    e.definedNumber = l;
    function f(e) {
        return n(e) && e instanceof Array;
    }
    e.definedArray = f;
    function u(e) {
        return n(e) && e instanceof Date;
    }
    e.definedDate = u;
    function s(e, t = 1) {
        return !f(e) || e.length < t;
    }
    e.invalidOptionArray = s;
})(e || (e = {}));

var t;

(e => {
    e.PEEK_JS_IGNORE_STATE_ATTRIBUTE = "data-peek-js-ignore-state";
})(t || (t = {}));

var n;

(n => {
    function o(n, o, i = "") {
        const r = o.toLowerCase();
        const l = r === "text";
        let f = l ? document.createTextNode("") : document.createElement(r);
        f.setAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE, "ignore");
        if (e.defined(i)) {
            f.className = i;
        }
        n.appendChild(f);
        return f;
    }
    n.create = o;
    function i(e, n, i, r) {
        const l = o(e, n, i);
        l.innerHTML = r;
        l.setAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE, "ignore");
        return l;
    }
    n.createWithHTML = i;
    function r(e) {
        e.preventDefault();
        e.cancelBubble = true;
    }
    n.cancelBubble = r;
    function l() {
        const e = document.documentElement;
        const t = {
            left: e.scrollLeft - (e.clientLeft || 0),
            top: e.scrollTop - (e.clientTop || 0)
        };
        return t;
    }
    n.getScrollPosition = l;
    function f(e, t) {
        if (t.style.display !== "block") {
            let n = e.pageX;
            let o = e.pageY;
            const i = l();
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
    function u(e) {
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
    n.getOffset = u;
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
    function r(t, n) {
        return e.definedNumber(t) ? t : n;
    }
    t.getDefaultNumber = r;
    function l(t, n) {
        return e.definedArray(t) ? t : n;
    }
    t.getDefaultArray = l;
    function f(t, n) {
        return e.definedObject(t) ? t : n;
    }
    t.getDefaultObject = f;
    function u(t, n) {
        let o = n;
        if (e.definedString(t)) {
            const e = t.toString().split(" ");
            if (e.length === 0) {
                t = n;
            } else {
                o = e;
            }
        } else {
            o = l(t, n);
        }
        return o;
    }
    t.getDefaultStringOrArray = u;
})(o || (o = {}));

(() => {
    let i = {};
    let r = null;
    let l = null;
    let f = null;
    let u = null;
    let s = null;
    let a = 0;
    let c = null;
    let d = [];
    let g = {};
    let p = null;
    function y() {
        if (e.definedObject(r)) {
            m();
            document.body.removeChild(r);
            r = null;
        }
        r = n.create(document.body, "div", "peek-js");
        r.onmousemove = n.cancelBubble;
        l = n.create(r, "div", "dialog-title-bar");
        f = n.create(r, "div", "dialog-contents");
        u = n.create(r, "div", "dialog-buttons");
        s = n.createWithHTML(u, "button", "copy", i.copyText);
        s.onclick = b;
        const t = n.createWithHTML(u, "button", "close", i.closeText);
        t.onclick = m;
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
        l.innerHTML = t;
    }
    function m() {
        r.style.display = "none";
    }
    function b() {
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
    function v(e) {
        f.innerHTML = "";
        f.scrollTop = 0;
        g = {};
        p = e;
        if (c.mode === 3) {
            s.style.display = "none";
        } else {
            s.style.removeProperty("display");
        }
        if (c.mode === 1) {
            h(e);
        } else if (c.mode === 2) {
            A(e);
        } else if (c.mode === 3) {
            S(e);
        }
    }
    function h(e) {
        const t = getComputedStyle(e);
        const n = t.length;
        for (let o = 0; o < n; o++) {
            E(e, t[o], t.getPropertyValue(t[o]));
        }
    }
    function A(e) {
        if (e.hasAttributes()) {
            for (let t of e.attributes) {
                E(e, t.name, t.value);
            }
        } else {
            f.innerHTML = i.noAttributesAvailableText;
        }
    }
    function S(e) {
        const t = n.getOffset(e);
        E(e, "left", t.left.toString() + "px", false);
        E(e, "top", t.top.toString() + "px", false);
        E(e, "width", e.offsetWidth.toString() + "px", false);
        E(e, "height", e.offsetHeight.toString() + "px", false);
    }
    function E(e, t, o, i = true) {
        if (c.showOnly.length === 0 || c.showOnly.indexOf(t) > -1) {
            const r = n.create(f, "div", "property-row");
            n.createWithHTML(r, "div", "property-name", t);
            const l = n.create(r, "div", "property-value");
            const u = n.create(l, "input");
            u.type = "text";
            u.value = o;
            g[t] = o;
            if (!c.allowEditing || !i) {
                u.readOnly = true;
            } else {
                u.onkeyup = n => {
                    x(n, t, u, e);
                };
            }
        }
    }
    function x(e, t, n, o) {
        if (e.code === "Enter") {
            if (c.mode === 1) {
                o.style.setProperty(t, n.value);
            } else if (c.mode === 2) {
                o.setAttribute(t, n.value);
            }
        }
    }
    function w() {
        const e = c.nodeType;
        const t = e.length;
        for (let n = 0; n < t; n++) {
            const t = document.getElementsByTagName(e[n]);
            const o = [].slice.call(t);
            const i = o.length;
            for (let e = 0; e < i; e++) {
                D(o[e]);
            }
        }
        window.addEventListener("mousemove", m);
    }
    function D(n) {
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
        window.removeEventListener("mousemove", m);
        m();
    }
    function L(e, t) {
        n.cancelBubble(e);
        if (a !== 0) {
            clearTimeout(a);
            a = 0;
        }
        a = setTimeout((() => {
            v(t);
            n.showElementAtMousePosition(e, r);
        }), i.dialogDisplayDelay);
    }
    function N(e) {
        let t = o.getDefaultObject(e, {});
        t.nodeType = o.getDefaultStringOrArray(t.nodeType, []);
        t.mode = o.getDefaultNumber(t.mode, 1);
        t.titleText = o.getDefaultString(t.titleText, "");
        t.showOnly = o.getDefaultStringOrArray(t.showOnly, []);
        t.allowEditing = o.getDefaultBoolean(t.allowEditing, false);
        return t;
    }
    function P(e = null) {
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
    }
    const j = {
        start: function(t) {
            if (!e.definedObject(c)) {
                c = N(t);
                T();
                w();
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
                    P(o);
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
        P();
        document.addEventListener("DOMContentLoaded", (() => {
            y();
        }));
        if (!e.defined(window.$peek)) {
            window.$peek = j;
        }
    })();
})();//# sourceMappingURL=peek.js.map