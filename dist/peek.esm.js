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
    let s = 0;
    let a = null;
    let c = [];
    function d() {
        if (e.definedObject(r)) {
            p();
            document.body.removeChild(r);
            r = null;
        }
        r = n.create(document.body, "div", "peek-js");
        r.onmousemove = n.cancelBubble;
        l = n.create(r, "div", "dialog-title-bar");
        f = n.create(r, "div", "dialog-contents");
        u = n.create(r, "div", "dialog-buttons");
        const t = n.createWithHTML(u, "button", "close", i.closeText);
        t.onclick = () => {
            p();
        };
    }
    function g() {
        let t = a.titleText;
        if (!e.definedString(t)) {
            if (a.mode === 1) {
                t = i.cssPropertiesText;
            } else if (a.mode === 2) {
                t = i.attributesText;
            } else if (a.mode === 3) {
                t = i.sizeText;
            }
        }
        l.innerHTML = t;
    }
    function p() {
        r.style.display = "none";
    }
    function T(e) {
        f.innerHTML = "";
        f.scrollTop = 0;
        if (a.mode === 1) {
            y(e);
        } else if (a.mode === 2) {
            b(e);
        } else if (a.mode === 3) {
            m(e);
        }
    }
    function y(e) {
        const t = getComputedStyle(e);
        const n = t.length;
        for (let o = 0; o < n; o++) {
            v(e, t[o], t.getPropertyValue(t[o]));
        }
    }
    function b(e) {
        if (e.hasAttributes()) {
            for (let t of e.attributes) {
                v(e, t.name, t.value);
            }
        } else {
            f.innerHTML = i.noAttributesAvailableText;
        }
    }
    function m(e) {
        const t = n.getOffset(e);
        v(e, "left", t.left.toString() + "px", false);
        v(e, "top", t.top.toString() + "px", false);
        v(e, "width", e.offsetWidth.toString() + "px", false);
        v(e, "height", e.offsetHeight.toString() + "px", false);
    }
    function v(e, t, o, i = true) {
        if (a.showOnly.length === 0 || a.showOnly.indexOf(t) > -1) {
            const r = n.create(f, "div", "property-row");
            n.createWithHTML(r, "div", "property-name", t);
            const l = n.create(r, "div", "property-value");
            const u = n.create(l, "input");
            u.type = "text";
            u.value = o;
            if (!a.allowEditing || !i) {
                u.readOnly = true;
            } else {
                u.onkeyup = n => {
                    A(n, t, u, e);
                };
            }
        }
    }
    function A(e, t, n, o) {
        if (e.code === "Enter") {
            o.style.setProperty(t, n.value);
        }
    }
    function S() {
        const e = a.nodeType;
        const t = e.length;
        for (let n = 0; n < t; n++) {
            const t = document.getElementsByTagName(e[n]);
            const o = [].slice.call(t);
            const i = o.length;
            for (let e = 0; e < i; e++) {
                h(o[e]);
            }
        }
        window.addEventListener("mousemove", p);
    }
    function h(n) {
        const o = n.getAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE);
        if (!e.definedString(o)) {
            n.addEventListener("mousemove", (e => {
                D(e, n);
            }));
            c.push(n);
        }
    }
    function E() {
        const e = c.length;
        for (let n = 0; n < e; n++) {
            var t = c[n];
            t.removeEventListener("mousemove", (e => {
                D(e, t);
            }));
        }
        c = [];
        window.removeEventListener("mousemove", p);
        p();
    }
    function D(e, t) {
        n.cancelBubble(e);
        if (s !== 0) {
            clearTimeout(s);
            s = 0;
        }
        s = setTimeout((() => {
            T(t);
            n.showElementAtMousePosition(e, r);
        }), i.dialogDisplayDelay);
    }
    function O(e) {
        let t = o.getDefaultObject(e, {});
        t.nodeType = o.getDefaultStringOrArray(t.nodeType, []);
        t.mode = o.getDefaultNumber(t.mode, 1);
        t.titleText = o.getDefaultString(t.titleText, "");
        t.showOnly = o.getDefaultStringOrArray(t.showOnly, []);
        t.allowEditing = o.getDefaultBoolean(t.allowEditing, false);
        return t;
    }
    function x(e = null) {
        i = o.getDefaultObject(e, {});
        i.dialogDisplayDelay = o.getDefaultNumber(i.dialogDisplayDelay, 1e3);
        w();
    }
    function w() {
        i.cssPropertiesText = o.getDefaultAnyString(i.cssPropertiesText, "CSS Properties");
        i.attributesText = o.getDefaultAnyString(i.attributesText, "Attributes");
        i.sizeText = o.getDefaultAnyString(i.sizeText, "Size");
        i.noAttributesAvailableText = o.getDefaultAnyString(i.noAttributesAvailableText, "No attributes are available.");
        i.closeText = o.getDefaultAnyString(i.closeText, "Close");
    }
    const L = {
        start: function(t) {
            if (!e.definedObject(a)) {
                a = O(t);
                g();
                S();
            }
            return L;
        },
        stop: function() {
            if (e.definedObject(a)) {
                a = null;
                E();
            }
            return L;
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
                    x(o);
                    d();
                    if (e.definedObject(a)) {
                        g();
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
        x();
        document.addEventListener("DOMContentLoaded", (() => {
            d();
        }));
        if (!e.defined(window.$peek)) {
            window.$peek = L;
        }
    })();
})();//# sourceMappingURL=peek.esm.js.map