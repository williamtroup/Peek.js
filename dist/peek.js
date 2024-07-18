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
    function l(e) {
        return t(e) && typeof e === "string";
    }
    e.definedString = l;
    function i(e) {
        return t(e) && typeof e === "function";
    }
    e.definedFunction = i;
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
    function c(e, t = 1) {
        return !s(e) || e.length < t;
    }
    e.invalidOptionArray = c;
    function f(e) {
        let t = e.length >= 2 && e.length <= 7;
        if (t && e[0] === "#") {
            t = isNaN(+e.substring(1, e.length - 1));
        } else {
            t = false;
        }
        return t;
    }
    e.hexColor = f;
    function u(e) {
        return e.startsWith("rgb") || e.startsWith("rgba");
    }
    e.isRgbColor = u;
})(e || (e = {}));

var t;

(e => {
    e.PEEK_JS_IGNORE_STATE_ATTRIBUTE = "data-peek-js-ignore-state";
})(t || (t = {}));

var n;

(n => {
    function o(n, o, l = "", i = false) {
        const r = o.toLowerCase();
        const s = r === "text";
        let a = s ? document.createTextNode("") : document.createElement(r);
        a.setAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE, "ignore");
        if (e.definedString(l)) {
            a.className = l;
        }
        if (!i) {
            n.appendChild(a);
        } else {
            n.insertBefore(a, n.children[0]);
        }
        return a;
    }
    n.create = o;
    function l(e, n, l, i, r = false) {
        const s = o(e, n, l, r);
        s.innerHTML = i;
        s.setAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE, "ignore");
        return s;
    }
    n.createWithHTML = l;
    function i(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    n.cancelBubble = i;
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
            const l = r();
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
            if (n < l.left) {
                n = e.pageX + 1;
            }
            if (o < l.top) {
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
    t.getAnyString = n;
    function o(t, n) {
        return e.definedString(t) ? t : n;
    }
    t.getString = o;
    function l(t, n) {
        return e.definedBoolean(t) ? t : n;
    }
    t.getBoolean = l;
    function i(t, n) {
        return e.definedNumber(t) ? t : n;
    }
    t.getNumber = i;
    function r(t, n) {
        return e.definedArray(t) ? t : n;
    }
    t.getArray = r;
    function s(t, n) {
        return e.definedObject(t) ? t : n;
    }
    t.getObject = s;
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
    t.getStringOrArray = a;
})(o || (o = {}));

(() => {
    let l = {};
    let i = null;
    let r = null;
    let s = null;
    let a = null;
    let c = 0;
    let f = null;
    let u = null;
    let d = null;
    let p = null;
    let x = null;
    let y = null;
    let m = null;
    let g = 0;
    let T = null;
    let v = [];
    let b = {};
    let h = null;
    let S = false;
    let A = 0;
    let w = 0;
    let L = null;
    let E = 0;
    let N = 0;
    let M = false;
    let H = 0;
    let P = 0;
    function O() {
        if (e.definedObject(i)) {
            k();
            document.body.removeChild(i);
            i = null;
        }
        i = n.create(document.body, "div", "peek-js");
        i.onmousemove = n.cancelBubble;
        r = n.create(i, "div", "dialog-title-bar");
        s = n.create(i, "div", "dialog-search");
        f = n.create(i, "div", "dialog-contents");
        d = n.create(i, "div", "dialog-buttons");
        p = n.createWithHTML(d, "button", "copy", l.text.copyText);
        p.onclick = D;
        a = n.create(s, "input");
        a.placeholder = l.text.searchPropertiesPlaceHolderText;
        a.type = "text";
        a.onkeyup = B;
        a.onpaste = B;
        const t = n.createWithHTML(s, "button", "clear-small", l.text.clearSymbolText);
        t.title = l.text.clearText;
        t.onclick = I;
        const o = n.createWithHTML(d, "button", "close", l.text.closeText);
        o.onclick = k;
        x = n.createWithHTML(d, "button", "remove", l.text.removeElementSymbolText);
        x.onclick = $;
        x.title = l.text.removeText;
        y = n.createWithHTML(d, "button", "move-up", l.text.moveUpSymbolText);
        y.onclick = j;
        y.title = l.text.moveUpText;
        m = n.createWithHTML(d, "button", "move-down", l.text.moveDownSymbolText);
        m.onclick = _;
        m.title = l.text.moveDownText;
        ee(r, i);
    }
    function W(t = null) {
        if (!S) {
            let o = T.titleText;
            r.innerHTML = "";
            if (A > 1 && T.showNodeNameInTitle) {
                n.createWithHTML(r, "span", "node-name", `[${t.nodeName.toLowerCase()}] - `);
                n.createWithHTML(r, "span", "dash", " - ");
            }
            if (!e.definedString(o)) {
                if (T.mode === 1) {
                    o = l.text.cssText;
                } else if (T.mode === 2) {
                    o = l.text.attributesText;
                } else if (T.mode === 3) {
                    o = l.text.sizeText;
                } else if (T.mode === 4) {
                    o = l.text.classesText;
                } else {
                    o = l.text.unknownModeText;
                }
            }
            n.createWithHTML(r, "span", "title", o);
            if (T.showIdOrNameInTitle && e.defined(t)) {
                const o = t.getAttribute("id");
                const l = t.getAttribute("name");
                if (e.definedString(o)) {
                    n.createWithHTML(r, "span", "dash", " - ");
                    n.createWithHTML(r, "span", "id-or-name", o);
                } else if (e.definedString(l)) {
                    n.createWithHTML(r, "span", "dash", " - ");
                    n.createWithHTML(r, "span", "id-or-name", l);
                }
            }
        }
    }
    function C() {
        n.createWithHTML(r, "span", "locked", `${l.text.dialogMovedSymbolText}${" "}`, true);
    }
    function k() {
        i.style.display = "none";
        S = false;
        a.value = "";
    }
    function D() {
        const e = [];
        for (let t in b) {
            if (b.hasOwnProperty(t)) {
                if (T.mode === 1) {
                    e.push(`${t}: ${b[t]};`);
                } else if (T.mode === 2) {
                    e.push(`${t}="${b[t]}"`);
                } else if (T.mode === 4) {
                    e.push(b[t]);
                }
            }
        }
        if (T.mode === 1) {
            navigator.clipboard.writeText(`${h.nodeName.toLowerCase()} { ${"\n"} ${e.join("\n")} ${"\n"} }`);
        } else if (T.mode === 2 || T.mode === 4) {
            navigator.clipboard.writeText(e.join(" "));
        }
    }
    function $() {
        var e;
        (e = h.parentNode) == null ? void 0 : e.removeChild(h);
        k();
    }
    function B() {
        if (c !== 0) {
            clearTimeout(c);
            c = 0;
        }
        c = setTimeout((() => {
            const t = f.getElementsByClassName("property-name");
            const n = [].slice.call(t);
            const o = n.length;
            const l = a.value.toLowerCase();
            let i = 0;
            for (let t = 0; t < o; t++) {
                const o = n[t].parentNode;
                if (e.defined(o)) {
                    if (a.value.trim() === "") {
                        o.style.removeProperty("display");
                        i++;
                    } else {
                        const e = n[t].innerText;
                        if (e.toLowerCase().indexOf(l) > -1) {
                            o.style.removeProperty("display");
                            i++;
                        } else {
                            o.style.display = "none";
                        }
                    }
                }
            }
            if (i === 0) {
                u.style.display = "block";
            } else {
                u.style.removeProperty("display");
            }
        }), l.searchDelayDelay);
    }
    function I() {
        a.value = "";
        a.focus();
        B();
    }
    function j() {
        if (h.parentNode !== null && h.previousElementSibling !== null) {
            h.parentNode.insertBefore(h, h.previousElementSibling);
        }
    }
    function _() {
        if (h.parentNode !== null && h.nextElementSibling !== null) {
            h.parentNode.insertBefore(h.nextElementSibling, h);
        }
    }
    function R(e) {
        f.innerHTML = "";
        f.scrollTop = 0;
        b = {};
        w = 0;
        h = e;
        W(e);
        if (T.mode === 1 || T.mode === 4 || T.mode === 2) {
            p.style.removeProperty("display");
        } else {
            p.style.display = "none";
        }
        if (!T.allowEditing) {
            x.style.display = "none";
            y.style.display = "none";
            m.style.display = "none";
        } else {
            x.style.removeProperty("display");
            y.style.removeProperty("display");
            m.style.removeProperty("display");
        }
        u = n.createWithHTML(f, "span", "no-search-results", l.text.noPropertiesFoundForSearchText);
        if (T.mode === 1) {
            U(e);
        } else if (T.mode === 2) {
            F(e);
        } else if (T.mode === 3) {
            V(e);
        } else if (T.mode === 4) {
            z(e);
        } else {
            n.createWithHTML(f, "span", "warning", l.text.modeNotSupportedText);
        }
        if (w <= 15) {
            s.style.display = "none";
        } else {
            s.style.removeProperty("display");
        }
    }
    function U(e) {
        const t = getComputedStyle(e);
        const n = t.length;
        for (let o = 0; o < n; o++) {
            G(e, t[o], t.getPropertyValue(t[o]));
        }
    }
    function F(e) {
        if (e.hasAttributes()) {
            for (let t of e.attributes) {
                G(e, t.name, t.value);
            }
        } else {
            f.innerHTML = "";
            n.createWithHTML(f, "span", "warning", l.text.noAttributesAvailableText);
        }
    }
    function V(e) {
        const t = n.getOffset(e);
        G(e, "left", `${t.left.toString()}px`, false);
        G(e, "top", `${t.top.toString()}px`, false);
        G(e, "width", `${e.offsetWidth.toString()}px`, false);
        G(e, "height", `${e.offsetHeight.toString()}px`, false);
    }
    function z(e) {
        if (e.classList.length > 0) {
            let t = 1;
            for (let n of e.classList) {
                G(e, t.toString(), n);
                t++;
            }
        } else {
            f.innerHTML = "";
            n.createWithHTML(f, "span", "warning", l.text.noClassesAvailableText);
        }
    }
    function G(t, o, i, r = true) {
        if (T.showOnly.length === 0 || T.showOnly.indexOf(o) > -1) {
            const s = n.create(f, "div", "property-row");
            n.createWithHTML(s, "div", "property-name", o);
            const a = n.create(s, "div", "property-value");
            const c = n.create(a, "input");
            if (e.hexColor(i) || e.isRgbColor(i)) {
                c.classList.add("property-value-color");
                c.style.borderLeftColor = i;
            }
            c.placeholder = l.text.propertyValuePlaceHolderText;
            const u = n.createWithHTML(s, "button", "copy-small", l.text.copySymbolText);
            u.title = l.text.copyText;
            u.onclick = () => {
                navigator.clipboard.writeText(i);
            };
            if (T.allowEditing && r) {
                const e = n.createWithHTML(s, "button", "paste-small", l.text.pasteSymbolText);
                const r = n.createWithHTML(s, "button", "remove-small", l.text.removeSymbolText);
                e.title = l.text.pasteText;
                r.title = l.text.removeText;
                e.onclick = () => {
                    navigator.clipboard.readText().then((e => {
                        c.value = e;
                        K(t, o, c);
                    }));
                };
                r.onclick = () => {
                    if (T.mode === 1) {
                        t.style.removeProperty(o);
                    } else if (T.mode === 2) {
                        t.removeAttribute(o);
                    } else if (T.mode === 4) {
                        t.classList.remove(i);
                    }
                };
            }
            c.type = "text";
            c.value = i;
            b[o] = i;
            w++;
            if (!T.allowEditing || !r) {
                c.readOnly = true;
            } else {
                c.onkeyup = e => {
                    J(e, o, c, t);
                };
            }
        }
    }
    function J(e, t, n, o) {
        if (e.code === "Enter") {
            K(o, t, n);
        }
    }
    function K(t, n, o) {
        if (T.mode === 1) {
            t.style.setProperty(n, o.value);
        } else if (T.mode === 2) {
            t.setAttribute(n, o.value);
        } else if (T.mode === 4) {
            t.classList.replace(t.classList[parseInt(n) - 1], o.value);
        }
        b[n] = o.value;
        if (e.hexColor(o.value) || e.isRgbColor(o.value)) {
            o.classList.add("property-value-color");
            o.style.borderLeftColor = o.value;
        } else {
            o.classList.remove("property-value-color");
        }
    }
    function X() {
        const e = T.nodeType;
        A = e.length;
        for (let t = 0; t < A; t++) {
            const n = document.getElementsByTagName(e[t]);
            const o = [].slice.call(n);
            const l = o.length;
            for (let e = 0; e < l; e++) {
                Y(o[e]);
            }
        }
        window.addEventListener("mousemove", Z);
    }
    function Y(n) {
        const o = n.getAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE);
        if (!e.definedString(o) && o !== "ignore") {
            n.addEventListener("mousemove", (e => {
                Q(e, n);
            }));
            v.push(n);
        }
    }
    function q() {
        const e = v.length;
        for (let n = 0; n < e; n++) {
            var t = v[n];
            t.removeEventListener("mousemove", (e => {
                Q(e, t);
            }));
        }
        v = [];
        window.removeEventListener("mousemove", Z);
        k();
    }
    function Q(e, t) {
        if (!S) {
            n.cancelBubble(e);
            if (g !== 0) {
                clearTimeout(g);
                g = 0;
            }
            g = setTimeout((() => {
                R(t);
                n.showElementAtMousePosition(e, i);
            }), l.dialogDisplayDelay);
        }
    }
    function Z() {
        if (!S) {
            if (g !== 0) {
                clearTimeout(g);
                g = 0;
            }
            k();
        }
    }
    function ee(e, t) {
        e.onmousedown = e => {
            te(e, t);
        };
        t.onmousemove = e => {
            oe(e, true);
        };
        e.onmouseup = () => {
            ne();
        };
        e.oncontextmenu = () => {
            ne();
        };
        document.addEventListener("mousemove", oe);
        document.addEventListener("mouseleave", le);
    }
    function te(e, t) {
        if (!M) {
            L = t;
            M = true;
            H = e.pageX - L.offsetLeft;
            P = e.pageY - L.offsetTop;
            E = L.offsetLeft;
            N = L.offsetTop;
        }
    }
    function ne() {
        if (M) {
            M = false;
            L = null;
            E = 0;
            N = 0;
        }
    }
    function oe(e, t = false) {
        if (t) {
            n.cancelBubble(e);
        }
        if (M) {
            if (!S) {
                C();
            }
            S = true;
            L.style.left = `${e.pageX - H}px`;
            L.style.top = `${e.pageY - P}px`;
        }
    }
    function le() {
        if (M) {
            L.style.left = `${E}px`;
            L.style.top = `${N}px`;
            M = false;
            L = null;
            E = 0;
            N = 0;
        }
    }
    function ie(e) {
        let t = o.getObject(e, {});
        t.nodeType = o.getStringOrArray(t.nodeType, []);
        t.mode = o.getNumber(t.mode, 1);
        t.titleText = o.getString(t.titleText, "");
        t.showOnly = o.getStringOrArray(t.showOnly, []);
        t.allowEditing = o.getBoolean(t.allowEditing, false);
        t.showIdOrNameInTitle = o.getBoolean(t.showIdOrNameInTitle, true);
        t.showNodeNameInTitle = o.getBoolean(t.showNodeNameInTitle, false);
        return t;
    }
    function re(e = null) {
        l = o.getObject(e, {});
        l.dialogDisplayDelay = o.getNumber(l.dialogDisplayDelay, 1e3);
        l.searchDelayDelay = o.getNumber(l.searchDelayDelay, 500);
        se();
    }
    function se() {
        l.text = o.getObject(l.text, {});
        l.text.cssText = o.getAnyString(l.text.cssText, "CSS");
        l.text.attributesText = o.getAnyString(l.text.attributesText, "Attributes");
        l.text.sizeText = o.getAnyString(l.text.sizeText, "Size");
        l.text.classesText = o.getAnyString(l.text.classesText, "Classes");
        l.text.noAttributesAvailableText = o.getAnyString(l.text.noAttributesAvailableText, "No attributes are available.");
        l.text.closeText = o.getAnyString(l.text.closeText, "Close");
        l.text.copyText = o.getAnyString(l.text.copyText, "Copy");
        l.text.copySymbolText = o.getAnyString(l.text.copySymbolText, "❐");
        l.text.pasteText = o.getAnyString(l.text.pasteText, "Paste");
        l.text.pasteSymbolText = o.getAnyString(l.text.pasteSymbolText, "☐");
        l.text.removeText = o.getAnyString(l.text.removeText, "Remove");
        l.text.removeSymbolText = o.getAnyString(l.text.removeSymbolText, "✕");
        l.text.noClassesAvailableText = o.getAnyString(l.text.noClassesAvailableText, "No classes are available.");
        l.text.searchPropertiesPlaceHolderText = o.getAnyString(l.text.searchPropertiesPlaceHolderText, "Search properties...");
        l.text.clearText = o.getAnyString(l.text.clearText, "Clear");
        l.text.clearSymbolText = o.getAnyString(l.text.clearSymbolText, "✕");
        l.text.noPropertiesFoundForSearchText = o.getAnyString(l.text.noPropertiesFoundForSearchText, "No properties were found for your search.");
        l.text.dialogMovedSymbolText = o.getAnyString(l.text.dialogMovedSymbolText, "✱");
        l.text.propertyValuePlaceHolderText = o.getAnyString(l.text.propertyValuePlaceHolderText, "Enter value...");
        l.text.modeNotSupportedText = o.getAnyString(l.text.modeNotSupportedText, "The mode you have specified is not supported.");
        l.text.unknownModeText = o.getAnyString(l.text.unknownModeText, "Unknown Mode");
        l.text.moveUpText = o.getAnyString(l.text.moveUpText, "Move Up");
        l.text.moveUpSymbolText = o.getAnyString(l.text.moveUpSymbolText, "↑");
        l.text.moveDownText = o.getAnyString(l.text.moveDownText, "Move Down");
        l.text.moveDownSymbolText = o.getAnyString(l.text.moveDownSymbolText, "↓");
        l.text.removeElementSymbolText = o.getAnyString(l.text.removeElementSymbolText, "⌫");
    }
    const ae = {
        start: function(t) {
            if (!e.definedObject(T)) {
                T = ie(t);
                W();
                X();
            }
            return ae;
        },
        stop: function() {
            if (e.definedObject(T)) {
                T = null;
                q();
            }
            return ae;
        },
        close: function() {
            k();
            return ae;
        },
        setConfiguration: function(t) {
            if (e.definedObject(t)) {
                let n = false;
                const o = l;
                for (let e in t) {
                    if (t.hasOwnProperty(e) && l.hasOwnProperty(e) && o[e] !== t[e]) {
                        o[e] = t[e];
                        n = true;
                    }
                }
                if (n) {
                    re(o);
                    O();
                    if (e.definedObject(T)) {
                        W();
                    }
                }
            }
            return ae;
        },
        getVersion: function() {
            return "1.6.1";
        }
    };
    (() => {
        re();
        document.addEventListener("DOMContentLoaded", (() => {
            O();
        }));
        if (!e.defined(window.$peek)) {
            window.$peek = ae;
        }
    })();
})();//# sourceMappingURL=peek.js.map