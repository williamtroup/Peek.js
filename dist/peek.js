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

(t => {
    function n(t, n, o = "") {
        const i = n.toLowerCase();
        const r = i === "text";
        let l = r ? document.createTextNode("") : document.createElement(i);
        if (e.defined(o)) {
            l.className = o;
        }
        t.appendChild(l);
        return l;
    }
    t.create = n;
    function o(e, t, o, i) {
        const r = n(e, t, o);
        r.innerHTML = i;
        return r;
    }
    t.createWithHTML = o;
    function i(e) {
        e.preventDefault();
        e.cancelBubble = true;
    }
    t.cancelBubble = i;
    function r() {
        const e = document.documentElement;
        const t = {
            left: e.scrollLeft - (e.clientLeft || 0),
            top: e.scrollTop - (e.clientTop || 0)
        };
        return t;
    }
    t.getScrollPosition = r;
    function l(e, t) {
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
    t.showElementAtMousePosition = l;
    function f(e) {
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
    t.getOffset = f;
})(t || (t = {}));

var n;

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
})(n || (n = {}));

(() => {
    let o = {};
    let i = null;
    let r = null;
    let l = null;
    let f = null;
    let u = 0;
    let s = null;
    let c = [];
    function a() {
        if (e.definedObject(i)) {
            g();
            document.body.removeChild(i);
            i = null;
        }
        i = t.create(document.body, "div", "peek-js");
        i.onmousemove = t.cancelBubble;
        r = t.create(i, "div", "dialog-title-bar");
        l = t.create(i, "div", "dialog-contents");
        f = t.create(i, "div", "dialog-buttons");
        const n = t.createWithHTML(f, "button", "close", o.closeText);
        n.onclick = () => {
            g();
        };
    }
    function d() {
        let t = s.titleText;
        if (!e.definedString(t)) {
            if (s.mode === 1) {
                t = o.cssPropertiesText;
            } else if (s.mode === 2) {
                t = o.attributesText;
            } else if (s.mode === 3) {
                t = o.sizeText;
            }
        }
        r.innerHTML = t;
    }
    function g() {
        i.style.display = "none";
    }
    function p(e) {
        l.innerHTML = "";
        l.scrollTop = 0;
        if (s.mode === 1) {
            y(e);
        } else if (s.mode === 2) {
            b(e);
        } else if (s.mode === 3) {
            m(e);
        }
    }
    function y(e) {
        const t = getComputedStyle(e);
        const n = t.length;
        for (let e = 0; e < n; e++) {
            T(t[e], t.getPropertyValue(t[e]));
        }
    }
    function b(e) {
        if (e.hasAttributes()) {
            for (let t of e.attributes) {
                T(t.name, t.value);
            }
        } else {
            l.innerHTML = o.noAttributesAvailableText;
        }
    }
    function m(e) {
        const n = t.getOffset(e);
        T("left", n.left.toString() + "px");
        T("top", n.top.toString() + "px");
        T("width", e.offsetWidth.toString() + "px");
        T("height", e.offsetHeight.toString() + "px");
    }
    function T(e, n) {
        if (s.showOnly.length === 0 || s.showOnly.indexOf(e) > -1) {
            const o = t.create(l, "div", "property-row");
            t.createWithHTML(o, "div", "property-name", e);
            const i = t.create(o, "div", "property-value");
            const r = t.create(i, "input");
            r.type = "text";
            r.readOnly = true;
            r.value = n;
        }
    }
    function h() {
        const e = s.nodeType;
        const t = e.length;
        for (let n = 0; n < t; n++) {
            const t = document.getElementsByTagName(e[n]);
            const o = [].slice.call(t);
            const i = o.length;
            for (let e = 0; e < i; e++) {
                v(o[e]);
            }
        }
        window.addEventListener("mousemove", g);
    }
    function v(e) {
        e.addEventListener("mousemove", (t => {
            x(t, e);
        }));
        c.push(e);
    }
    function D() {
        const e = c.length;
        for (let n = 0; n < e; n++) {
            var t = c[n];
            t.removeEventListener("mousemove", (e => {
                x(e, t);
            }));
        }
        c = [];
        window.removeEventListener("mousemove", g);
        g();
    }
    function x(e, n) {
        t.cancelBubble(e);
        if (u !== 0) {
            clearTimeout(u);
            u = 0;
        }
        u = setTimeout((() => {
            p(n);
            t.showElementAtMousePosition(e, i);
        }), o.dialogDisplayDelay);
    }
    function S(e) {
        let t = n.getDefaultObject(e, {});
        t.nodeType = n.getDefaultStringOrArray(t.nodeType, []);
        t.mode = n.getDefaultNumber(t.mode, 1);
        t.titleText = n.getDefaultString(t.titleText, "");
        t.showOnly = n.getDefaultStringOrArray(t.showOnly, []);
        return t;
    }
    function O(e = null) {
        o = n.getDefaultObject(e, {});
        o.dialogDisplayDelay = n.getDefaultNumber(o.dialogDisplayDelay, 1e3);
        w();
    }
    function w() {
        o.cssPropertiesText = n.getDefaultAnyString(o.cssPropertiesText, "CSS Properties");
        o.attributesText = n.getDefaultAnyString(o.attributesText, "Attributes");
        o.sizeText = n.getDefaultAnyString(o.sizeText, "Size");
        o.noAttributesAvailableText = n.getDefaultAnyString(o.noAttributesAvailableText, "No attributes are available.");
        o.closeText = n.getDefaultAnyString(o.closeText, "Close");
    }
    const A = {
        start: function(t) {
            if (!e.definedObject(s)) {
                s = S(t);
                d();
                h();
            }
            return A;
        },
        stop: function() {
            if (e.definedObject(s)) {
                s = null;
                D();
            }
            return A;
        },
        setConfiguration: function(t) {
            if (e.definedObject(t)) {
                let n = false;
                const i = o;
                for (let e in t) {
                    if (t.hasOwnProperty(e) && o.hasOwnProperty(e) && i[e] !== t[e]) {
                        i[e] = t[e];
                        n = true;
                    }
                }
                if (n) {
                    O(i);
                    a();
                    if (e.definedObject(s)) {
                        d();
                    }
                }
            }
            return A;
        },
        getVersion: function() {
            return "1.1.0";
        }
    };
    (() => {
        O();
        document.addEventListener("DOMContentLoaded", (() => {
            a();
        }));
        if (!e.defined(window.$peek)) {
            window.$peek = A;
        }
    })();
})();//# sourceMappingURL=peek.js.map