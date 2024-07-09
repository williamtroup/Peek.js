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
        const l = i === "text";
        let r = l ? document.createTextNode("") : document.createElement(i);
        if (e.defined(o)) {
            r.className = o;
        }
        t.appendChild(r);
        return r;
    }
    t.create = n;
    function o(e, t, o, i) {
        const l = n(e, t, o);
        l.innerHTML = i;
        return l;
    }
    t.createWithHTML = o;
    function i(e) {
        e.preventDefault();
        e.cancelBubble = true;
    }
    t.cancelBubble = i;
    function l() {
        const e = document.documentElement;
        const t = {
            left: e.scrollLeft - (e.clientLeft || 0),
            top: e.scrollTop - (e.clientTop || 0)
        };
        return t;
    }
    t.getScrollPosition = l;
    function r(e, t) {
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
    t.showElementAtMousePosition = r;
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
            o = r(t, n);
        }
        return o;
    }
    t.getDefaultStringOrArray = u;
})(n || (n = {}));

(() => {
    let o = {};
    let i = null;
    let l = null;
    let r = null;
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
        l = t.create(i, "div", "dialog-title-bar");
        r = t.create(i, "div", "dialog-contents");
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
        l.innerHTML = t;
    }
    function g() {
        i.style.display = "none";
    }
    function p(e) {
        r.innerHTML = "";
        r.scrollTop = 0;
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
        for (let o = 0; o < n; o++) {
            T(e, t[o], t.getPropertyValue(t[o]));
        }
    }
    function b(e) {
        if (e.hasAttributes()) {
            for (let t of e.attributes) {
                T(e, t.name, t.value);
            }
        } else {
            r.innerHTML = o.noAttributesAvailableText;
        }
    }
    function m(e) {
        const n = t.getOffset(e);
        T(e, "left", n.left.toString() + "px", false);
        T(e, "top", n.top.toString() + "px", false);
        T(e, "width", e.offsetWidth.toString() + "px", false);
        T(e, "height", e.offsetHeight.toString() + "px", false);
    }
    function T(e, n, o, i = true) {
        if (s.showOnly.length === 0 || s.showOnly.indexOf(n) > -1) {
            const l = t.create(r, "div", "property-row");
            t.createWithHTML(l, "div", "property-name", n);
            const f = t.create(l, "div", "property-value");
            const u = t.create(f, "input");
            u.type = "text";
            u.value = o;
            if (!s.allowEditing || !i) {
                u.readOnly = true;
            } else {
                u.onkeyup = t => {
                    v(t, n, u, e);
                };
            }
        }
    }
    function v(e, t, n, o) {
        if (e.code === "Enter") {
            o.style.setProperty(t, n.value);
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
                D(o[e]);
            }
        }
        window.addEventListener("mousemove", g);
    }
    function D(e) {
        e.addEventListener("mousemove", (t => {
            w(t, e);
        }));
        c.push(e);
    }
    function x() {
        const e = c.length;
        for (let n = 0; n < e; n++) {
            var t = c[n];
            t.removeEventListener("mousemove", (e => {
                w(e, t);
            }));
        }
        c = [];
        window.removeEventListener("mousemove", g);
        g();
    }
    function w(e, n) {
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
        t.allowEditing = n.getDefaultBoolean(t.allowEditing, false);
        return t;
    }
    function O(e = null) {
        o = n.getDefaultObject(e, {});
        o.dialogDisplayDelay = n.getDefaultNumber(o.dialogDisplayDelay, 1e3);
        A();
    }
    function A() {
        o.cssPropertiesText = n.getDefaultAnyString(o.cssPropertiesText, "CSS Properties");
        o.attributesText = n.getDefaultAnyString(o.attributesText, "Attributes");
        o.sizeText = n.getDefaultAnyString(o.sizeText, "Size");
        o.noAttributesAvailableText = n.getDefaultAnyString(o.noAttributesAvailableText, "No attributes are available.");
        o.closeText = n.getDefaultAnyString(o.closeText, "Close");
    }
    const L = {
        start: function(t) {
            if (!e.definedObject(s)) {
                s = S(t);
                d();
                h();
            }
            return L;
        },
        stop: function() {
            if (e.definedObject(s)) {
                s = null;
                x();
            }
            return L;
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
            return L;
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
            window.$peek = L;
        }
    })();
})();//# sourceMappingURL=peek.js.map