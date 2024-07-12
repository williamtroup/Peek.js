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
    function a(e) {
        return n(e) && e instanceof Date;
    }
    e.definedDate = a;
    function f(e, t = 1) {
        return !s(e) || e.length < t;
    }
    e.invalidOptionArray = f;
    function u(e) {
        let t = e.length >= 2 && e.length <= 7;
        if (t && e[0] === "#") {
            t = isNaN(+e.substring(1, e.length - 1));
        } else {
            t = false;
        }
        return t;
    }
    e.hexColor = u;
    function c(e) {
        return e.startsWith("rgb") || e.startsWith("rgba");
    }
    e.isRgbColor = c;
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
            t.style.left = `${n}px`;
            t.style.top = `${o}px`;
        }
    }
    n.showElementAtMousePosition = s;
    function a(e) {
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
    n.getOffset = a;
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
            o = r(t, n);
        }
        return o;
    }
    t.getDefaultStringOrArray = a;
})(o || (o = {}));

(() => {
    let i = {};
    let l = null;
    let r = null;
    let s = null;
    let a = null;
    let f = null;
    let u = null;
    let c = 0;
    let d = null;
    let g = [];
    let p = {};
    let m = null;
    let T = false;
    let y = 0;
    let b = null;
    let v = 0;
    let h = 0;
    let x = false;
    let S = 0;
    let A = 0;
    function L() {
        if (e.definedObject(l)) {
            D();
            document.body.removeChild(l);
            l = null;
        }
        l = n.create(document.body, "div", "peek-js");
        l.onmousemove = n.cancelBubble;
        r = n.create(l, "div", "dialog-title-bar");
        s = n.create(l, "div", "dialog-contents");
        a = n.create(l, "div", "dialog-buttons");
        f = n.createWithHTML(a, "button", "copy", i.copyText);
        f.onclick = E;
        const t = n.createWithHTML(a, "button", "close", i.closeText);
        t.onclick = D;
        u = n.createWithHTML(a, "button", "remove", i.removeText);
        u.onclick = O;
        z(r, l);
    }
    function w(t = null) {
        let o = d.titleText;
        r.innerHTML = "";
        if (y > 1 && d.showNodeNameInTitle) {
            n.createWithHTML(r, "span", "node-name", `[${t.nodeName.toLowerCase()}] - `);
            n.createWithHTML(r, "span", "dash", " - ");
        }
        if (!e.definedString(o)) {
            if (d.mode === 1) {
                o = i.cssText;
            } else if (d.mode === 2) {
                o = i.attributesText;
            } else if (d.mode === 3) {
                o = i.sizeText;
            } else if (d.mode === 4) {
                o = i.classesText;
            }
        }
        n.createWithHTML(r, "span", "title", o);
        if (d.showIdOrNameInTitle && e.defined(t)) {
            const o = t.getAttribute("id");
            const i = t.getAttribute("name");
            if (e.definedString(o)) {
                n.createWithHTML(r, "span", "dash", " - ");
                n.createWithHTML(r, "span", "id-or-name", o);
            } else if (e.definedString(i)) {
                n.createWithHTML(r, "span", "dash", " - ");
                n.createWithHTML(r, "span", "id-or-name", i);
            }
        }
    }
    function D() {
        l.style.display = "none";
        T = false;
    }
    function E() {
        const e = [];
        for (let t in p) {
            if (p.hasOwnProperty(t)) {
                if (d.mode === 1) {
                    e.push(`${t}: ${p[t]};`);
                } else if (d.mode === 2) {
                    e.push(`${t}="${p[t]}"`);
                } else if (d.mode === 4) {
                    e.push(p[t]);
                }
            }
        }
        if (d.mode === 1) {
            navigator.clipboard.writeText(`${m.nodeName.toLowerCase()} { ${"\n"} ${e.join("\n")} ${"\n"} }`);
        } else if (d.mode === 2 || d.mode === 4) {
            navigator.clipboard.writeText(e.join(" "));
        }
    }
    function O() {
        var e;
        (e = m.parentNode) == null ? void 0 : e.removeChild(m);
        D();
    }
    function N(e) {
        s.innerHTML = "";
        s.scrollTop = 0;
        p = {};
        m = e;
        w(e);
        if (d.mode === 3) {
            f.style.display = "none";
        } else {
            f.style.removeProperty("display");
        }
        if (!d.allowEditing) {
            u.style.display = "none";
        } else {
            u.style.removeProperty("display");
        }
        if (d.mode === 1) {
            H(e);
        } else if (d.mode === 2) {
            M(e);
        } else if (d.mode === 3) {
            C(e);
        } else if (d.mode === 4) {
            W(e);
        }
    }
    function H(e) {
        const t = getComputedStyle(e);
        const n = t.length;
        for (let o = 0; o < n; o++) {
            $(e, t[o], t.getPropertyValue(t[o]));
        }
    }
    function M(e) {
        if (e.hasAttributes()) {
            for (let t of e.attributes) {
                $(e, t.name, t.value);
            }
        } else {
            s.innerHTML = "";
            n.createWithHTML(s, "span", "warning", i.noAttributesAvailableText);
        }
    }
    function C(e) {
        const t = n.getOffset(e);
        $(e, "left", `${t.left.toString()}px`, false);
        $(e, "top", `${t.top.toString()}px`, false);
        $(e, "width", `${e.offsetWidth.toString()}px`, false);
        $(e, "height", `${e.offsetHeight.toString()}px`, false);
    }
    function W(e) {
        if (e.classList.length > 0) {
            let t = 1;
            for (let n of e.classList) {
                $(e, t.toString(), n);
                t++;
            }
        } else {
            s.innerHTML = "";
            n.createWithHTML(s, "span", "warning", i.noClassesAvailableText);
        }
    }
    function $(t, o, l, r = true) {
        if (d.showOnly.length === 0 || d.showOnly.indexOf(o) > -1) {
            const a = n.create(s, "div", "property-row");
            n.createWithHTML(a, "div", "property-name", o);
            const f = n.create(a, "div", "property-value");
            const u = n.create(f, "input");
            if (e.hexColor(l) || e.isRgbColor(l)) {
                u.classList.add("property-value-color");
                u.style.borderLeftColor = l;
            }
            const c = n.createWithHTML(a, "button", "copy-small", i.copySymbolText);
            c.title = i.copyText;
            c.onclick = () => {
                navigator.clipboard.writeText(l);
            };
            if (d.allowEditing && r) {
                const e = n.createWithHTML(a, "button", "paste-small", i.pasteSymbolText);
                const r = n.createWithHTML(a, "button", "remove-small", i.removeSymbolText);
                e.title = i.pasteText;
                r.title = i.removeText;
                e.onclick = () => {
                    navigator.clipboard.readText().then((e => {
                        u.value = e;
                        P(t, o, u);
                    }));
                };
                r.onclick = () => {
                    if (d.mode === 1) {
                        t.style.removeProperty(o);
                    } else if (d.mode === 2) {
                        t.removeAttribute(o);
                    } else if (d.mode === 4) {
                        t.classList.remove(l);
                    }
                };
            }
            u.type = "text";
            u.value = l;
            p[o] = l;
            if (!d.allowEditing || !r) {
                u.readOnly = true;
            } else {
                u.onkeyup = e => {
                    I(e, o, u, t);
                };
            }
        }
    }
    function I(e, t, n, o) {
        if (e.code === "Enter") {
            P(o, t, n);
        }
    }
    function P(t, n, o) {
        if (d.mode === 1) {
            t.style.setProperty(n, o.value);
        } else if (d.mode === 2) {
            t.setAttribute(n, o.value);
        } else if (d.mode === 4) {
            t.classList.replace(t.classList[parseInt(n) - 1], o.value);
        }
        p[n] = o.value;
        if (e.hexColor(o.value) || e.isRgbColor(o.value)) {
            o.classList.add("property-value-color");
            o.style.borderLeftColor = o.value;
        } else {
            o.classList.remove("property-value-color");
        }
    }
    function _() {
        const e = d.nodeType;
        y = e.length;
        for (let t = 0; t < y; t++) {
            const n = document.getElementsByTagName(e[t]);
            const o = [].slice.call(n);
            const i = o.length;
            for (let e = 0; e < i; e++) {
                j(o[e]);
            }
        }
        window.addEventListener("mousemove", R);
    }
    function j(n) {
        const o = n.getAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE);
        if (!e.definedString(o) && o !== "ignore") {
            n.addEventListener("mousemove", (e => {
                k(e, n);
            }));
            g.push(n);
        }
    }
    function B() {
        const e = g.length;
        for (let n = 0; n < e; n++) {
            var t = g[n];
            t.removeEventListener("mousemove", (e => {
                k(e, t);
            }));
        }
        g = [];
        window.removeEventListener("mousemove", R);
        D();
    }
    function k(e, t) {
        if (!T) {
            n.cancelBubble(e);
            if (c !== 0) {
                clearTimeout(c);
                c = 0;
            }
            c = setTimeout((() => {
                N(t);
                n.showElementAtMousePosition(e, l);
            }), i.dialogDisplayDelay);
        }
    }
    function R() {
        if (!T) {
            if (c !== 0) {
                clearTimeout(c);
                c = 0;
            }
            D();
        }
    }
    function z(e, t) {
        e.onmousedown = e => {
            G(e, t);
        };
        t.onmousemove = e => {
            K(e, true);
        };
        e.onmouseup = () => {
            J();
        };
        e.oncontextmenu = () => {
            J();
        };
        document.addEventListener("mousemove", K);
        document.addEventListener("mouseleave", U);
    }
    function G(e, t) {
        if (!x) {
            T = true;
            b = t;
            x = true;
            S = e.pageX - b.offsetLeft;
            A = e.pageY - b.offsetTop;
            v = b.offsetLeft;
            h = b.offsetTop;
        }
    }
    function J() {
        if (x) {
            x = false;
            b = null;
            v = 0;
            h = 0;
        }
    }
    function K(e, t = false) {
        if (t) {
            n.cancelBubble(e);
        }
        if (x) {
            b.style.left = `${e.pageX - S}px`;
            b.style.top = `${e.pageY - A}px`;
        }
    }
    function U() {
        if (x) {
            b.style.left = `${v}px`;
            b.style.top = `${h}px`;
            x = false;
            b = null;
            v = 0;
            h = 0;
        }
    }
    function X(e) {
        let t = o.getDefaultObject(e, {});
        t.nodeType = o.getDefaultStringOrArray(t.nodeType, []);
        t.mode = o.getDefaultNumber(t.mode, 1);
        t.titleText = o.getDefaultString(t.titleText, "");
        t.showOnly = o.getDefaultStringOrArray(t.showOnly, []);
        t.allowEditing = o.getDefaultBoolean(t.allowEditing, false);
        t.showIdOrNameInTitle = o.getDefaultBoolean(t.showIdOrNameInTitle, true);
        t.showNodeNameInTitle = o.getDefaultBoolean(t.showNodeNameInTitle, false);
        return t;
    }
    function Y(e = null) {
        i = o.getDefaultObject(e, {});
        i.dialogDisplayDelay = o.getDefaultNumber(i.dialogDisplayDelay, 1e3);
        V();
    }
    function V() {
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
    const F = {
        start: function(t) {
            if (!e.definedObject(d)) {
                d = X(t);
                w();
                _();
            }
            return F;
        },
        stop: function() {
            if (e.definedObject(d)) {
                d = null;
                B();
            }
            return F;
        },
        close: function() {
            D();
            return F;
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
                    Y(o);
                    L();
                    if (e.definedObject(d)) {
                        w();
                    }
                }
            }
            return F;
        },
        getVersion: function() {
            return "1.5.0";
        }
    };
    (() => {
        Y();
        document.addEventListener("DOMContentLoaded", (() => {
            L();
        }));
        if (!e.defined(window.$peek)) {
            window.$peek = F;
        }
    })();
})();//# sourceMappingURL=peek.js.map