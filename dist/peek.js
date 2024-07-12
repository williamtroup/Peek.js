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
        if (e.definedString(i)) {
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
        e.stopPropagation();
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
    let m = false;
    let T = 0;
    let y = null;
    let b = 0;
    let v = 0;
    let x = false;
    let S = 0;
    let h = 0;
    function A() {
        if (e.definedObject(l)) {
            D();
            document.body.removeChild(l);
            l = null;
        }
        l = n.create(document.body, "div", "peek-js");
        l.onmousemove = n.cancelBubble;
        r = n.create(l, "div", "dialog-title-bar");
        s = n.create(l, "div", "dialog-contents");
        f = n.create(l, "div", "dialog-buttons");
        a = n.createWithHTML(f, "button", "copy", i.copyText);
        a.onclick = L;
        const t = n.createWithHTML(f, "button", "close", i.closeText);
        t.onclick = D;
        k(r, l);
    }
    function w(t = null) {
        let o = c.titleText;
        r.innerHTML = "";
        if (T > 1 && c.showNodeNameInTitle) {
            n.createWithHTML(r, "span", "node-name", `[${t.nodeName.toLowerCase()}] - `);
        }
        if (!e.definedString(o)) {
            if (c.mode === 1) {
                o = i.cssText;
            } else if (c.mode === 2) {
                o = i.attributesText;
            } else if (c.mode === 3) {
                o = i.sizeText;
            } else if (c.mode === 4) {
                o = i.classesText;
            }
        }
        n.createWithHTML(r, "span", "title", o);
        if (c.showIdOrNameInTitle && e.defined(t)) {
            const o = t.getAttribute("id");
            const i = t.getAttribute("name");
            if (e.definedString(o)) {
                n.createWithHTML(r, "span", "id-or-name", ` - ${o}`);
            } else if (e.definedString(i)) {
                n.createWithHTML(r, "span", "id-or-name", ` - ${i}`);
            }
        }
    }
    function D() {
        l.style.display = "none";
        m = false;
    }
    function L() {
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
    function E(e) {
        s.innerHTML = "";
        s.scrollTop = 0;
        g = {};
        p = e;
        w(e);
        if (c.mode === 3) {
            a.style.display = "none";
        } else {
            a.style.removeProperty("display");
        }
        if (c.mode === 1) {
            O(e);
        } else if (c.mode === 2) {
            N(e);
        } else if (c.mode === 3) {
            $(e);
        } else if (c.mode === 4) {
            H(e);
        }
    }
    function O(e) {
        const t = getComputedStyle(e);
        const n = t.length;
        for (let o = 0; o < n; o++) {
            M(e, t[o], t.getPropertyValue(t[o]));
        }
    }
    function N(e) {
        if (e.hasAttributes()) {
            for (let t of e.attributes) {
                M(e, t.name, t.value);
            }
        } else {
            s.innerHTML = i.noAttributesAvailableText;
        }
    }
    function $(e) {
        const t = n.getOffset(e);
        M(e, "left", `${t.left.toString()}px`, false);
        M(e, "top", `${t.top.toString()}px`, false);
        M(e, "width", `${e.offsetWidth.toString()}px`, false);
        M(e, "height", `${e.offsetHeight.toString()}px`, false);
    }
    function H(e) {
        if (e.classList.length > 0) {
            let t = 1;
            for (let n of e.classList) {
                M(e, t.toString(), n);
                t++;
            }
        } else {
            s.innerHTML = i.noClassesAvailableText;
        }
    }
    function M(e, t, o, l = true) {
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
                        P(e, t, a);
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
                    I(n, t, a, e);
                };
            }
        }
    }
    function I(e, t, n, o) {
        if (e.code === "Enter") {
            P(o, t, n);
        }
    }
    function P(e, t, n) {
        if (c.mode === 1) {
            e.style.setProperty(t, n.value);
        } else if (c.mode === 2) {
            e.setAttribute(t, n.value);
        } else if (c.mode === 4) {
            e.classList.replace(e.classList[parseInt(t) - 1], n.value);
        }
    }
    function C() {
        const e = c.nodeType;
        T = e.length;
        for (let t = 0; t < T; t++) {
            const n = document.getElementsByTagName(e[t]);
            const o = [].slice.call(n);
            const i = o.length;
            for (let e = 0; e < i; e++) {
                _(o[e]);
            }
        }
        window.addEventListener("mousemove", B);
    }
    function _(n) {
        const o = n.getAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE);
        if (!e.definedString(o) && o !== "ignore") {
            n.addEventListener("mousemove", (e => {
                W(e, n);
            }));
            d.push(n);
        }
    }
    function j() {
        const e = d.length;
        for (let n = 0; n < e; n++) {
            var t = d[n];
            t.removeEventListener("mousemove", (e => {
                W(e, t);
            }));
        }
        d = [];
        window.removeEventListener("mousemove", B);
        D();
    }
    function W(e, t) {
        if (!m) {
            n.cancelBubble(e);
            if (u !== 0) {
                clearTimeout(u);
                u = 0;
            }
            u = setTimeout((() => {
                E(t);
                n.showElementAtMousePosition(e, l);
            }), i.dialogDisplayDelay);
        }
    }
    function B() {
        if (!m) {
            D();
        }
    }
    function k(e, t) {
        e.onmousedown = e => {
            R(e, t);
        };
        e.onmousemove = e => {
            G(e);
        };
        e.onmouseup = () => {
            z();
        };
        e.oncontextmenu = () => {
            z();
        };
        document.addEventListener("mousemove", G);
        document.addEventListener("mouseleave", J);
    }
    function R(e, t) {
        if (!x) {
            m = true;
            y = t;
            x = true;
            S = e.pageX - y.offsetLeft;
            h = e.pageY - y.offsetTop;
            b = y.offsetLeft;
            v = y.offsetTop;
        }
    }
    function z() {
        if (x) {
            x = false;
            y = null;
            b = 0;
            v = 0;
        }
    }
    function G(e) {
        if (x) {
            y.style.left = `${e.pageX - S}px`;
            y.style.top = `${e.pageY - h}px`;
        }
    }
    function J() {
        if (x) {
            y.style.left = `${b}px`;
            y.style.top = `${v}px`;
            x = false;
            y = null;
            b = 0;
            v = 0;
        }
    }
    function K(e) {
        let t = o.getDefaultObject(e, {});
        t.nodeType = o.getDefaultStringOrArray(t.nodeType, []);
        t.mode = o.getDefaultNumber(t.mode, 1);
        t.titleText = o.getDefaultString(t.titleText, "");
        t.showOnly = o.getDefaultStringOrArray(t.showOnly, []);
        t.allowEditing = o.getDefaultBoolean(t.allowEditing, false);
        t.showIdOrNameInTitle = o.getDefaultBoolean(t.showIdOrNameInTitle, false);
        t.showNodeNameInTitle = o.getDefaultBoolean(t.showNodeNameInTitle, false);
        return t;
    }
    function U(e = null) {
        i = o.getDefaultObject(e, {});
        i.dialogDisplayDelay = o.getDefaultNumber(i.dialogDisplayDelay, 1e3);
        X();
    }
    function X() {
        i.cssText = o.getDefaultAnyString(i.cssText, "CSS");
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
    const Y = {
        start: function(t) {
            if (!e.definedObject(c)) {
                c = K(t);
                w();
                C();
            }
            return Y;
        },
        stop: function() {
            if (e.definedObject(c)) {
                c = null;
                j();
            }
            return Y;
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
                    U(o);
                    A();
                    if (e.definedObject(c)) {
                        w();
                    }
                }
            }
            return Y;
        },
        getVersion: function() {
            return "1.4.0";
        }
    };
    (() => {
        U();
        document.addEventListener("DOMContentLoaded", (() => {
            A();
        }));
        if (!e.defined(window.$peek)) {
            window.$peek = Y;
        }
    })();
})();//# sourceMappingURL=peek.js.map