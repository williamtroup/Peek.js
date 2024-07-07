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
    function i(e, t, n = false) {
        let o = null;
        if (document.defaultView.getComputedStyle) {
            o = document.defaultView.getComputedStyle(e, null).getPropertyValue(t);
        } else if (e.currentStyle) {
            o = e.currentStyle[t];
        }
        if (n) {
            o = parseFloat(o);
        }
        return o;
    }
    t.getStyleValueByName = i;
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
            let o = e.pageY;
            const i = c();
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
    t.showElementAtMousePosition = a;
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
        let o = n;
        if (e.definedString(t)) {
            const e = t.toString().split(" ");
            if (e.length === 0) {
                t = n;
            } else {
                o = e;
            }
        } else {
            o = u(t, n);
        }
        return o;
    }
    t.getDefaultStringOrArray = a;
})(n || (n = {}));

(() => {
    let o = {};
    let i = null;
    let r = null;
    let l = null;
    let u = null;
    let c = 0;
    let a = null;
    let f = [];
    function s() {
        if (e.definedObject(i)) {
            p();
            document.body.removeChild(i);
            i = null;
        }
        i = t.create(document.body, "div", "peek-js");
        i.onmousemove = t.cancelBubble;
        r = t.create(i, "div", "dialog-title-bar");
        l = t.create(i, "div", "dialog-contents");
        u = t.create(i, "div", "dialog-buttons");
        const n = t.createWithHTML(u, "button", "copy", "Copy");
        const o = t.createWithHTML(u, "button", "close", "Close");
        n.onclick = () => {};
        o.onclick = () => {
            p();
        };
    }
    function d() {
        let t = a.titleText;
        if (!e.definedString(t)) {
            if (a.mode === 1) {
                t = o.cssPropertiesText;
            } else if (a.mode === 2) {
                t = o.attributesText;
            } else if (a.mode === 3) {
                t = o.sizeText;
            }
        }
        r.innerHTML = t;
    }
    function p() {
        i.style.display = "none";
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
        const o = n.length;
        for (let e = 0; e < o; e++) {
            const o = t.create(l, "div", "property-row");
            const i = n[e];
            t.createWithHTML(o, "div", "property-name", i);
            const r = t.create(o, "div", "property-value");
            const u = t.create(r, "input");
            u.type = "text";
            u.value = n.getPropertyValue(i);
        }
    }
    function y(e) {
        if (e.hasAttributes()) {
            for (let n of e.attributes) {
                const e = t.create(l, "div", "property-row");
                t.createWithHTML(e, "div", "property-name", n.name);
                const o = t.create(e, "div", "property-value");
                const i = t.create(o, "input");
                i.type = "text";
                i.value = n.value;
            }
        } else {
            l.innerHTML = o.noAttributesAvailableText;
        }
    }
    function b() {
        const e = a.nodeType;
        const t = e.length;
        for (let n = 0; n < t; n++) {
            const t = document.getElementsByTagName(e[n]);
            const o = [].slice.call(t);
            const i = o.length;
            for (let e = 0; e < i; e++) {
                v(o[e]);
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
            t.showElementAtMousePosition(e, i);
        }), o.dialogDisplayDelay);
    }
    function h(e) {
        let t = n.getDefaultObject(e, {});
        t.nodeType = n.getDefaultStringOrArray(t.nodeType, []);
        t.mode = n.getDefaultNumber(t.mode, 1);
        t.titleText = n.getDefaultString(t.titleText, "");
        return t;
    }
    function S(e = null) {
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
    const A = {
        destroy: function() {
            throw new Error("Function not implemented.");
        },
        start: function(t) {
            if (!e.definedObject(a)) {
                a = h(t);
                d();
                b();
            }
            return A;
        },
        stop: function() {
            if (e.definedObject(a)) {
                a = null;
                T();
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
                    S(i);
                    s();
                    if (e.definedObject(a)) {
                        d();
                    }
                }
            }
            return A;
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
            window.$peek = A;
        }
    })();
})();//# sourceMappingURL=peek.esm.js.map