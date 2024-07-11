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
    function s(e) {
        return n(e) && e instanceof Array;
    }
    e.definedArray = s;
    function f(e) {
        return n(e) && e instanceof Date;
    }
    e.definedDate = f;
    function a(e, t = 1) {
        return !s(e) || e.length < t;
    }
    e.invalidOptionArray = a;
})(e || (e = {}));

var t;

(e => {
    e.PEEK_JS_IGNORE_STATE_ATTRIBUTE = "data-peek-js-ignore-state";
})(t || (t = {}));

var n;

(n => {
    function o(n, o, i = "") {
        const l = o.toLowerCase();
        const r = l === "text";
        let s = r ? document.createTextNode("") : document.createElement(l);
        s.setAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE, "ignore");
        if (e.defined(i)) {
            s.className = i;
        }
        n.appendChild(s);
        return s;
    }
    n.create = o;
    function i(e, n, i, l) {
        const r = o(e, n, i);
        r.innerHTML = l;
        r.setAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE, "ignore");
        return r;
    }
    n.createWithHTML = i;
    function l(e) {
        e.preventDefault();
        e.cancelBubble = true;
    }
    n.cancelBubble = l;
    function r() {
        const e = document.documentElement;
        const t = {
            left: e.scrollLeft - (e.clientLeft || 0),
            top: e.scrollTop - (e.clientTop || 0)
        };
        return t;
    }
    n.getScrollPosition = r;
    function s(e, t) {
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
    n.showElementAtMousePosition = s;
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
    n.getOffset = f;
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
    function l(t, n) {
        return e.definedNumber(t) ? t : n;
    }
    t.getDefaultNumber = l;
    function r(t, n) {
        return e.definedArray(t) ? t : n;
    }
    t.getDefaultArray = r;
    function s(t, n) {
        return e.definedObject(t) ? t : n;
    }
    t.getDefaultObject = s;
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
            o = r(t, n);
        }
        return o;
    }
    t.getDefaultStringOrArray = f;
})(o || (o = {}));

(() => {
    let i = {};
    let l = null;
    let r = null;
    let s = null;
    let f = null;
    let a = null;
    let u = 0;
    let c = null;
    let d = [];
    let g = {};
    let p = null;
    function T() {
        if (e.definedObject(l)) {
            y();
            document.body.removeChild(l);
            l = null;
        }
        l = n.create(document.body, "div", "peek-js");
        l.onmousemove = n.cancelBubble;
        r = n.create(l, "div", "dialog-title-bar");
        s = n.create(l, "div", "dialog-contents");
        f = n.create(l, "div", "dialog-buttons");
        a = n.createWithHTML(f, "button", "copy", i.copyText);
        a.onclick = b;
        const t = n.createWithHTML(f, "button", "close", i.closeText);
        t.onclick = y;
    }
    function m(t = null) {
        let n = c.titleText;
        if (!e.definedString(n)) {
            if (c.mode === 1) {
                n = i.cssPropertiesText;
            } else if (c.mode === 2) {
                n = i.attributesText;
            } else if (c.mode === 3) {
                n = i.sizeText;
            } else if (c.mode === 4) {
                n = i.classesText;
            }
        }
        if (c.showIdOrNameInTitle && e.defined(t)) {
            let o = t.getAttribute("id");
            let i = t.getAttribute("name");
            if (e.definedString(o)) {
                n = `${n} - ${o}`;
            } else if (e.definedString(i)) {
                n = `${n} - ${i}`;
            }
        }
        r.innerHTML = n;
    }
    function y() {
        l.style.display = "none";
    }
    function b() {
        const e = [];
        for (let t in g) {
            if (g.hasOwnProperty(t)) {
                if (c.mode === 1) {
                    e.push(`${t}: ${g[t]};`);
                } else if (c.mode === 2) {
                    e.push(`${t}="${g[t]}"`);
                } else if (c.mode === 4) {
                    e.push(g[t]);
                }
            }
        }
        if (c.mode === 1) {
            navigator.clipboard.writeText(`${p.nodeName.toLowerCase()} { ${"\n"} ${e.join("\n")} ${"\n"} }`);
        } else if (c.mode === 2 || c.mode === 4) {
            navigator.clipboard.writeText(e.join(" "));
        }
    }
    function v(e) {
        s.innerHTML = "";
        s.scrollTop = 0;
        g = {};
        p = e;
        m(e);
        if (c.mode === 3) {
            a.style.display = "none";
        } else {
            a.style.removeProperty("display");
        }
        if (c.mode === 1) {
            x(e);
        } else if (c.mode === 2) {
            S(e);
        } else if (c.mode === 3) {
            A(e);
        } else if (c.mode === 4) {
            h(e);
        }
    }
    function x(e) {
        const t = getComputedStyle(e);
        const n = t.length;
        for (let o = 0; o < n; o++) {
            D(e, t[o], t.getPropertyValue(t[o]));
        }
    }
    function S(e) {
        if (e.hasAttributes()) {
            for (let t of e.attributes) {
                D(e, t.name, t.value);
            }
        } else {
            s.innerHTML = i.noAttributesAvailableText;
        }
    }
    function A(e) {
        const t = n.getOffset(e);
        D(e, "left", t.left.toString() + "px", false);
        D(e, "top", t.top.toString() + "px", false);
        D(e, "width", e.offsetWidth.toString() + "px", false);
        D(e, "height", e.offsetHeight.toString() + "px", false);
    }
    function h(e) {
        if (e.classList.length > 0) {
            let t = 1;
            for (let n of e.classList) {
                D(e, t.toString(), n);
                t++;
            }
        } else {
            s.innerHTML = i.noClassesAvailableText;
        }
    }
    function D(e, t, o, l = true) {
        if (c.showOnly.length === 0 || c.showOnly.indexOf(t) > -1) {
            const r = n.create(s, "div", "property-row");
            n.createWithHTML(r, "div", "property-name", t);
            const f = n.create(r, "div", "property-value");
            const a = n.create(f, "input");
            const u = n.createWithHTML(r, "button", "copy-small", i.copySymbolText);
            u.title = i.copyText;
            u.onclick = () => {
                navigator.clipboard.writeText(o);
            };
            if (c.allowEditing && l) {
                const l = n.createWithHTML(r, "button", "paste-small", i.pasteSymbolText);
                const f = n.createWithHTML(r, "button", "remove-small", i.removeSymbolText);
                l.title = i.pasteText;
                f.title = i.removeText;
                l.onclick = () => {
                    navigator.clipboard.readText().then((n => {
                        a.value = n;
                        E(e, t, a);
                    }));
                };
                f.onclick = () => {
                    if (c.mode === 1) {
                        e.style.removeProperty(t);
                    } else if (c.mode === 2) {
                        e.removeAttribute(t);
                    } else if (c.mode === 4) {
                        e.classList.remove(o);
                    }
                    s.removeChild(r);
                };
            }
            a.type = "text";
            a.value = o;
            g[t] = o;
            if (!c.allowEditing || !l) {
                a.readOnly = true;
            } else {
                a.onkeyup = n => {
                    w(n, t, a, e);
                };
            }
        }
    }
    function w(e, t, n, o) {
        if (e.code === "Enter") {
            E(o, t, n);
        }
    }
    function E(e, t, n) {
        if (c.mode === 1) {
            e.style.setProperty(t, n.value);
        } else if (c.mode === 2) {
            e.setAttribute(t, n.value);
        } else if (c.mode === 4) {
            e.classList.replace(e.classList[parseInt(t) - 1], n.value);
        }
    }
    function O() {
        const e = c.nodeType;
        const t = e.length;
        for (let n = 0; n < t; n++) {
            const t = document.getElementsByTagName(e[n]);
            const o = [].slice.call(t);
            const i = o.length;
            for (let e = 0; e < i; e++) {
                L(o[e]);
            }
        }
        window.addEventListener("mousemove", y);
    }
    function L(n) {
        const o = n.getAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE);
        if (!e.definedString(o) && o !== "ignore") {
            n.addEventListener("mousemove", (e => {
                P(e, n);
            }));
            d.push(n);
        }
    }
    function N() {
        const e = d.length;
        for (let n = 0; n < e; n++) {
            var t = d[n];
            t.removeEventListener("mousemove", (e => {
                P(e, t);
            }));
        }
        d = [];
        window.removeEventListener("mousemove", y);
        y();
    }
    function P(e, t) {
        n.cancelBubble(e);
        if (u !== 0) {
            clearTimeout(u);
            u = 0;
        }
        u = setTimeout((() => {
            v(t);
            n.showElementAtMousePosition(e, l);
        }), i.dialogDisplayDelay);
    }
    function H(e) {
        let t = o.getDefaultObject(e, {});
        t.nodeType = o.getDefaultStringOrArray(t.nodeType, []);
        t.mode = o.getDefaultNumber(t.mode, 1);
        t.titleText = o.getDefaultString(t.titleText, "");
        t.showOnly = o.getDefaultStringOrArray(t.showOnly, []);
        t.allowEditing = o.getDefaultBoolean(t.allowEditing, false);
        t.showIdOrNameInTitle = o.getDefaultBoolean(t.showIdOrNameInTitle, false);
        return t;
    }
    function _(e = null) {
        i = o.getDefaultObject(e, {});
        i.dialogDisplayDelay = o.getDefaultNumber(i.dialogDisplayDelay, 1e3);
        j();
    }
    function j() {
        i.cssPropertiesText = o.getDefaultAnyString(i.cssPropertiesText, "CSS Properties");
        i.attributesText = o.getDefaultAnyString(i.attributesText, "Attributes");
        i.sizeText = o.getDefaultAnyString(i.sizeText, "Size");
        i.classesText = o.getDefaultAnyString(i.classesText, "Classes");
        i.noAttributesAvailableText = o.getDefaultAnyString(i.noAttributesAvailableText, "No attributes are available.");
        i.closeText = o.getDefaultAnyString(i.closeText, "Close");
        i.copyText = o.getDefaultAnyString(i.copyText, "Copy");
        i.copySymbolText = o.getDefaultAnyString(i.copySymbolText, "❐");
        i.pasteText = o.getDefaultAnyString(i.pasteText, "Paste");
        i.pasteSymbolText = o.getDefaultAnyString(i.pasteSymbolText, "☐");
        i.removeText = o.getDefaultAnyString(i.removeText, "Remove");
        i.removeSymbolText = o.getDefaultAnyString(i.removeSymbolText, "✕");
        i.noClassesAvailableText = o.getDefaultAnyString(i.noClassesAvailableText, "No classes are available.");
    }
    const C = {
        start: function(t) {
            if (!e.definedObject(c)) {
                c = H(t);
                m();
                O();
            }
            return C;
        },
        stop: function() {
            if (e.definedObject(c)) {
                c = null;
                N();
            }
            return C;
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
                    _(o);
                    T();
                    if (e.definedObject(c)) {
                        m();
                    }
                }
            }
            return C;
        },
        getVersion: function() {
            return "1.3.0";
        }
    };
    (() => {
        _();
        document.addEventListener("DOMContentLoaded", (() => {
            T();
        }));
        if (!e.defined(window.$peek)) {
            window.$peek = C;
        }
    })();
})();//# sourceMappingURL=peek.js.map