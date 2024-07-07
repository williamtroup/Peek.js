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
    function f(e) {
        return t(e) && typeof e === "number";
    }
    e.definedNumber = f;
    function l(e) {
        return n(e) && e instanceof Array;
    }
    e.definedArray = l;
    function u(e) {
        return n(e) && e instanceof Date;
    }
    e.definedDate = u;
    function c(e, t = 1) {
        return !l(e) || e.length < t;
    }
    e.invalidOptionArray = c;
})(e || (e = {}));

var t;

(t => {
    function n(t, n, o = "") {
        const i = n.toLowerCase();
        const r = i === "text";
        let f = r ? document.createTextNode("") : document.createElement(i);
        if (e.defined(o)) {
            f.className = o;
        }
        t.appendChild(f);
        return f;
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
    t.showElementAtMousePosition = f;
    function l(e) {
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
    t.getOffset = l;
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
    function f(t, n) {
        return e.definedFunction(t) ? t : n;
    }
    t.getDefaultFunction = f;
    function l(t, n) {
        return e.definedArray(t) ? t : n;
    }
    t.getDefaultArray = l;
    function u(t, n) {
        return e.definedObject(t) ? t : n;
    }
    t.getDefaultObject = u;
    function c(t, n) {
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
    t.getDefaultStringOrArray = c;
})(n || (n = {}));

(() => {
    let o = {};
    let i = null;
    let r = null;
    let f = null;
    let l = null;
    let u = 0;
    let c = null;
    let s = [];
    function a() {
        if (e.definedObject(i)) {
            g();
            document.body.removeChild(i);
            i = null;
        }
        i = t.create(document.body, "div", "peek-js");
        i.onmousemove = t.cancelBubble;
        r = t.create(i, "div", "dialog-title-bar");
        f = t.create(i, "div", "dialog-contents");
        l = t.create(i, "div", "dialog-buttons");
        const n = t.createWithHTML(l, "button", "copy", "Copy");
        const o = t.createWithHTML(l, "button", "close", "Close");
        n.onclick = () => {};
        o.onclick = () => {
            g();
        };
    }
    function d() {
        let t = c.titleText;
        if (!e.definedString(t)) {
            if (c.mode === 1) {
                t = o.cssPropertiesText;
            } else if (c.mode === 2) {
                t = o.attributesText;
            } else if (c.mode === 3) {
                t = o.sizeText;
            }
        }
        r.innerHTML = t;
    }
    function g() {
        i.style.display = "none";
    }
    function p(e) {
        f.innerHTML = "";
        f.scrollTop = 0;
        if (c.mode === 1) {
            b(e);
        } else if (c.mode === 2) {
            y(e);
        } else if (c.mode === 3) {
            m(e);
        }
    }
    function b(e) {
        const t = getComputedStyle(e);
        const n = t.length;
        for (let e = 0; e < n; e++) {
            T(t[e], t.getPropertyValue(t[e]));
        }
    }
    function y(e) {
        if (e.hasAttributes()) {
            for (let t of e.attributes) {
                T(t.name, t.value);
            }
        } else {
            f.innerHTML = o.noAttributesAvailableText;
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
        const o = t.create(f, "div", "property-row");
        t.createWithHTML(o, "div", "property-name", e);
        const i = t.create(o, "div", "property-value");
        const r = t.create(i, "input");
        r.type = "text";
        r.value = n;
    }
    function v() {
        const e = c.nodeType;
        const t = e.length;
        for (let n = 0; n < t; n++) {
            const t = document.getElementsByTagName(e[n]);
            const o = [].slice.call(t);
            const i = o.length;
            for (let e = 0; e < i; e++) {
                h(o[e]);
            }
        }
        window.addEventListener("mousemove", g);
    }
    function h(e) {
        e.addEventListener("mousemove", (t => {
            x(t, e);
        }));
        s.push(e);
    }
    function D() {
        const e = s.length;
        for (let n = 0; n < e; n++) {
            var t = s[n];
            t.removeEventListener("mousemove", (e => {
                x(e, t);
            }));
        }
        s = [];
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
        return t;
    }
    function A(e = null) {
        o = n.getDefaultObject(e, {});
        o.dialogDisplayDelay = n.getDefaultNumber(o.dialogDisplayDelay, 1e3);
        w();
    }
    function w() {
        o.cssPropertiesText = n.getDefaultAnyString(o.cssPropertiesText, "CSS Properties");
        o.attributesText = n.getDefaultAnyString(o.attributesText, "Attributes");
        o.sizeText = n.getDefaultAnyString(o.sizeText, "Size");
        o.noAttributesAvailableText = n.getDefaultAnyString(o.noAttributesAvailableText, "No attributes are available.");
    }
    const L = {
        start: function(t) {
            if (!e.definedObject(c)) {
                c = S(t);
                d();
                v();
            }
            return L;
        },
        stop: function() {
            if (e.definedObject(c)) {
                c = null;
                D();
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
                    A(i);
                    a();
                    if (e.definedObject(c)) {
                        d();
                    }
                }
            }
            return L;
        },
        getVersion: function() {
            return "1.0.0";
        }
    };
    (() => {
        A();
        document.addEventListener("DOMContentLoaded", (() => {
            a();
        }));
        if (!e.defined(window.$peek)) {
            window.$peek = L;
        }
    })();
})();//# sourceMappingURL=peek.esm.js.map