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
    function r(e) {
        return t(e) && typeof e === "string";
    }
    e.definedString = r;
    function i(e) {
        return t(e) && typeof e === "function";
    }
    e.definedFunction = i;
    function u(e) {
        return t(e) && typeof e === "number";
    }
    e.definedNumber = u;
    function l(e) {
        return n(e) && e instanceof Array;
    }
    e.definedArray = l;
    function f(e) {
        return n(e) && e instanceof Date;
    }
    e.definedDate = f;
    function c(e, t = 1) {
        return !l(e) || e.length < t;
    }
    e.invalidOptionArray = c;
})(e || (e = {}));

var t;

(t => {
    function n(t, n, o = "") {
        const r = n.toLowerCase();
        const i = r === "text";
        let u = i ? document.createTextNode("") : document.createElement(r);
        if (e.defined(o)) {
            u.className = o;
        }
        t.appendChild(u);
        return u;
    }
    t.create = n;
    function o(e, t, o, r) {
        const i = n(e, t, o);
        i.innerHTML = r;
        return i;
    }
    t.createWithHTML = o;
    function r(e, t, n = false) {
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
    t.getStyleValueByName = r;
    function i(e, t) {
        e.className += " " + t;
        e.className = e.className.trim();
    }
    t.addClass = i;
    function u(e, t) {
        e.className = e.className.replace(t, "");
        e.className = e.className.trim();
    }
    t.removeClass = u;
    function l(e) {
        e.preventDefault();
        e.cancelBubble = true;
    }
    t.cancelBubble = l;
    function f() {
        const e = document.documentElement;
        const t = {
            left: e.scrollLeft - (e.clientLeft || 0),
            top: e.scrollTop - (e.clientTop || 0)
        };
        return t;
    }
    t.getScrollPosition = f;
    function c(e, t) {
        let n = e.pageX;
        let o = e.pageY;
        const r = f();
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
        if (n < r.left) {
            n = e.pageX + 1;
        }
        if (o < r.top) {
            o = e.pageY + 1;
        }
        t.style.left = n + "px";
        t.style.top = o + "px";
    }
    t.showElementAtMousePosition = c;
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
    function r(t, n) {
        return e.definedBoolean(t) ? t : n;
    }
    t.getDefaultBoolean = r;
    function i(t, n) {
        return e.definedNumber(t) ? t : n;
    }
    t.getDefaultNumber = i;
    function u(t, n) {
        return e.definedFunction(t) ? t : n;
    }
    t.getDefaultFunction = u;
    function l(t, n) {
        return e.definedArray(t) ? t : n;
    }
    t.getDefaultArray = l;
    function f(t, n) {
        return e.definedObject(t) ? t : n;
    }
    t.getDefaultObject = f;
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
    let r = null;
    let i = null;
    let u = null;
    let l = null;
    let f = null;
    function c() {
        r = t.create(document.body, "div", "peek-js");
    }
    function a(e) {
        let t = n.getDefaultObject(e, {});
        t.nodeType = n.getDefaultStringOrArray(t.nodeType, []);
        t.mode = n.getDefaultNumber(t.mode, 1);
        return t;
    }
    const d = {
        destroy: function() {
            throw new Error("Function not implemented.");
        },
        start: function(e) {
            f = a(e);
            return d;
        },
        stop: function() {
            throw new Error("Function not implemented.");
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
            c();
        }));
        if (!e.defined(window.$peek)) {
            window.$peek = d;
        }
    })();
})();//# sourceMappingURL=peek.js.map