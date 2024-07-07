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
    t.showElementAtMousePosition = f;
})(t || (t = {}));

(() => {
    let n = {};
    let o = null;
    let i = null;
    let r = null;
    let l = null;
    function c() {
        o = t.create(document.body, "div", "peek-js");
    }
    const u = {
        destroy: function() {
            throw new Error("Function not implemented.");
        },
        start: function(e) {
            throw new Error("Function not implemented.");
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
            window.$peek = u;
        }
    })();
})();//# sourceMappingURL=peek.esm.js.map