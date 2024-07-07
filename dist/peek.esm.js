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
    function f(e) {
        return n(e) && e instanceof Date;
    }
    e.definedDate = f;
    function c(e, t = 1) {
        return !u(e) || e.length < t;
    }
    e.invalidOptionArray = c;
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
        let i = e.pageY;
        const o = f();
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
    t.showElementAtMousePosition = c;
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
    function f(t, n) {
        return e.definedObject(t) ? t : n;
    }
    t.getDefaultObject = f;
    function c(t, n) {
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
    t.getDefaultStringOrArray = c;
})(n || (n = {}));

(() => {
    let i = {};
    let o = null;
    let r = null;
    let l = null;
    let u = null;
    let f = null;
    function c() {
        o = t.create(document.body, "div", "peek-js");
        r = t.create(o, "div", "dialog-title-bar");
        l = t.create(o, "div", "dialog-contents");
        u = t.create(o, "div", "dialog-buttons");
    }
    function d() {
        r.innerHTML = f.titleText;
    }
    function a(t) {
        let i = n.getDefaultObject(t, {});
        i.nodeType = n.getDefaultStringOrArray(i.nodeType, []);
        i.mode = n.getDefaultNumber(i.mode, 1);
        if (!e.definedString(i.titleText)) {
            if (i.mode === 1) {
                i.titleText = "CSS";
            } else if (i.mode === 2) {
                i.titleText = "Attributes";
            } else if (i.mode === 3) {
                i.titleText = "Size";
            }
        }
        return i;
    }
    const s = {
        destroy: function() {
            throw new Error("Function not implemented.");
        },
        start: function(e) {
            f = a(e);
            d();
            return s;
        },
        stop: function() {
            f = null;
            return s;
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
            window.$peek = s;
        }
    })();
})();//# sourceMappingURL=peek.esm.js.map