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
    function c(e) {
        return n(e) && e instanceof Array;
    }
    e.definedArray = c;
    function u(e) {
        return n(e) && e instanceof Date;
    }
    e.definedDate = u;
    function f(e, t = 1) {
        return !c(e) || e.length < t;
    }
    e.invalidOptionArray = f;
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
    function c(e) {
        e.preventDefault();
        e.cancelBubble = true;
    }
    t.cancelBubble = c;
    function u() {
        const e = document.documentElement;
        const t = {
            left: e.scrollLeft - (e.clientLeft || 0),
            top: e.scrollTop - (e.clientTop || 0)
        };
        return t;
    }
    t.getScrollPosition = u;
    function f(e, t) {
        if (t.style.display !== "block") {
            let n = e.pageX;
            let o = e.pageY;
            const i = u();
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
    function c(t, n) {
        return e.definedArray(t) ? t : n;
    }
    t.getDefaultArray = c;
    function u(t, n) {
        return e.definedObject(t) ? t : n;
    }
    t.getDefaultObject = u;
    function f(t, n) {
        let o = n;
        if (e.definedString(t)) {
            const e = t.toString().split(" ");
            if (e.length === 0) {
                t = n;
            } else {
                o = e;
            }
        } else {
            o = c(t, n);
        }
        return o;
    }
    t.getDefaultStringOrArray = f;
})(n || (n = {}));

(() => {
    let o = {};
    let i = null;
    let r = null;
    let l = null;
    let c = null;
    let u = null;
    let f = [];
    function a() {
        i = t.create(document.body, "div", "peek-js");
        i.onmousemove = t.cancelBubble;
        r = t.create(i, "div", "dialog-title-bar");
        l = t.create(i, "div", "dialog-contents");
        c = t.create(i, "div", "dialog-buttons");
        const e = t.createWithHTML(c, "button", "copy", "Copy");
        const n = t.createWithHTML(c, "button", "close", "Close");
        e.onclick = () => {};
        n.onclick = () => {
            d();
        };
    }
    function s() {
        r.innerHTML = u.titleText;
    }
    function d() {
        i.style.display = "none";
    }
    function m(e) {
        l.innerHTML = "";
        l.scrollTop = 0;
        if (u.mode === 1) {
            p(e);
        } else if (u.mode === 2) {
            g(e);
        }
    }
    function p(e) {
        const n = getComputedStyle(e);
        const o = n.length;
        for (let e = 0; e < o; e++) {
            const o = t.create(l, "div", "property-row");
            const i = n[e];
            t.createWithHTML(o, "div", "property-name", i);
            const r = t.create(o, "div", "property-value");
            const c = t.create(r, "input");
            c.type = "text";
            c.value = n.getPropertyValue(i);
        }
    }
    function g(e) {
        if (e.hasAttributes()) {
            for (let n of e.attributes) {
                const e = t.create(l, "div", "property-row");
                t.createWithHTML(e, "div", "property-name", n.name);
                const o = t.create(e, "div", "property-value");
                const i = t.create(o, "input");
                i.type = "text";
                i.value = n.value;
            }
        }
    }
    function y() {
        const e = u.nodeType;
        const t = e.length;
        for (let n = 0; n < t; n++) {
            const t = document.getElementsByTagName(e[n]);
            const o = [].slice.call(t);
            const i = o.length;
            for (let e = 0; e < i; e++) {
                v(o[e]);
            }
        }
        window.addEventListener("mousemove", d);
    }
    function v(e) {
        e.addEventListener("mousemove", (t => {
            h(t, e);
        }));
        f.push(e);
    }
    function b() {
        const e = f.length;
        for (let n = 0; n < e; n++) {
            var t = f[n];
            t.removeEventListener("mousemove", (e => {
                h(e, t);
            }));
        }
        f = [];
        window.removeEventListener("mousemove", d);
        d();
    }
    function h(e, n) {
        m(n);
        t.cancelBubble(e);
        t.showElementAtMousePosition(e, i);
    }
    function w(t) {
        let o = n.getDefaultObject(t, {});
        o.nodeType = n.getDefaultStringOrArray(o.nodeType, []);
        o.mode = n.getDefaultNumber(o.mode, 1);
        if (!e.definedString(o.titleText)) {
            if (o.mode === 1) {
                o.titleText = "CSS";
            } else if (o.mode === 2) {
                o.titleText = "Attributes";
            } else if (o.mode === 3) {
                o.titleText = "Size";
            }
        }
        return o;
    }
    const T = {
        destroy: function() {
            throw new Error("Function not implemented.");
        },
        start: function(t) {
            if (!e.definedObject(u)) {
                u = w(t);
                s();
                y();
            }
            return T;
        },
        stop: function() {
            if (e.definedObject(u)) {
                u = null;
                b();
            }
            return T;
        },
        setConfiguration: function(e) {
            throw new Error("Function not implemented.");
        },
        getVersion: function() {
            return "1.0.0";
        }
    };
    (() => {
        document.addEventListener("DOMContentLoaded", (() => {
            a();
        }));
        if (!e.defined(window.$peek)) {
            window.$peek = T;
        }
    })();
})();//# sourceMappingURL=peek.js.map