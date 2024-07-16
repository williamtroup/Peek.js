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
    function a(e) {
        return n(e) && e instanceof Array;
    }
    e.definedArray = a;
    function s(e) {
        return n(e) && e instanceof Date;
    }
    e.definedDate = s;
    function f(e, t = 1) {
        return !a(e) || e.length < t;
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
    function o(n, o, l = "", i = false) {
        const r = o.toLowerCase();
        const a = r === "text";
        let s = a ? document.createTextNode("") : document.createElement(r);
        s.setAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE, "ignore");
        if (e.definedString(l)) {
            s.className = l;
        }
        if (!i) {
            n.appendChild(s);
        } else {
            n.insertBefore(s, n.children[0]);
        }
        return s;
    }
    n.create = o;
    function l(e, n, l, i, r = false) {
        const a = o(e, n, l, r);
        a.innerHTML = i;
        a.setAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE, "ignore");
        return a;
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
    function a(e, t) {
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
    n.showElementAtMousePosition = a;
    function s(e) {
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
    n.getOffset = s;
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
    function l(t, n) {
        return e.definedBoolean(t) ? t : n;
    }
    t.getDefaultBoolean = l;
    function i(t, n) {
        return e.definedNumber(t) ? t : n;
    }
    t.getDefaultNumber = i;
    function r(t, n) {
        return e.definedArray(t) ? t : n;
    }
    t.getDefaultArray = r;
    function a(t, n) {
        return e.definedObject(t) ? t : n;
    }
    t.getDefaultObject = a;
    function s(t, n) {
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
    t.getDefaultStringOrArray = s;
})(o || (o = {}));

(() => {
    let l = {};
    let i = null;
    let r = null;
    let a = null;
    let s = null;
    let f = 0;
    let u = null;
    let c = null;
    let d = null;
    let p = null;
    let x = null;
    let y = null;
    let g = null;
    let m = 0;
    let T = null;
    let v = [];
    let b = {};
    let h = null;
    let S = false;
    let D = 0;
    let A = 0;
    let w = null;
    let L = 0;
    let E = 0;
    let N = false;
    let M = 0;
    let H = 0;
    function P() {
        if (e.definedObject(i)) {
            C();
            document.body.removeChild(i);
            i = null;
        }
        i = n.create(document.body, "div", "peek-js");
        i.onmousemove = n.cancelBubble;
        r = n.create(i, "div", "dialog-title-bar");
        a = n.create(i, "div", "dialog-search");
        u = n.create(i, "div", "dialog-contents");
        d = n.create(i, "div", "dialog-buttons");
        p = n.createWithHTML(d, "button", "copy", l.text.copyText);
        p.onclick = k;
        s = n.create(a, "input");
        s.placeholder = l.text.searchPropertiesPlaceHolderText;
        s.type = "text";
        s.onkeyup = B;
        s.onpaste = B;
        const t = n.createWithHTML(a, "button", "clear-small", l.text.clearSymbolText);
        t.title = l.text.clearText;
        t.onclick = I;
        const o = n.createWithHTML(d, "button", "close", l.text.closeText);
        o.onclick = C;
        x = n.createWithHTML(d, "button", "remove", l.text.removeText);
        x.onclick = $;
        y = n.createWithHTML(d, "button", "move-up", l.text.moveUpSymbolText);
        y.onclick = j;
        y.title = l.text.moveUpText;
        g = n.createWithHTML(d, "button", "move-down", l.text.moveDownSymbolText);
        g.onclick = _;
        g.title = l.text.moveDownText;
        ee(r, i);
    }
    function O(t = null) {
        if (!S) {
            let o = T.titleText;
            r.innerHTML = "";
            if (D > 1 && T.showNodeNameInTitle) {
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
    function W() {
        n.createWithHTML(r, "span", "locked", `${l.text.dialogMovedSymbolText}${" "}`, true);
    }
    function C() {
        i.style.display = "none";
        S = false;
        s.value = "";
    }
    function k() {
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
        C();
    }
    function B() {
        if (f !== 0) {
            clearTimeout(f);
            f = 0;
        }
        f = setTimeout((() => {
            const t = u.getElementsByClassName("property-name");
            const n = [].slice.call(t);
            const o = n.length;
            const l = s.value.toLowerCase();
            let i = 0;
            for (let t = 0; t < o; t++) {
                const o = n[t].parentNode;
                if (e.defined(o)) {
                    if (s.value.trim() === "") {
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
                c.style.display = "block";
            } else {
                c.style.removeProperty("display");
            }
        }), l.searchDelayDelay);
    }
    function I() {
        s.value = "";
        s.focus();
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
        u.innerHTML = "";
        u.scrollTop = 0;
        b = {};
        A = 0;
        h = e;
        O(e);
        if (T.mode === 1 || T.mode === 4 || T.mode === 2) {
            p.style.removeProperty("display");
        } else {
            p.style.display = "none";
        }
        if (!T.allowEditing) {
            x.style.display = "none";
            y.style.display = "none";
            g.style.display = "none";
        } else {
            x.style.removeProperty("display");
            y.style.removeProperty("display");
            g.style.removeProperty("display");
        }
        c = n.createWithHTML(u, "span", "no-search-results", l.text.noPropertiesFoundForSearchText);
        if (T.mode === 1) {
            U(e);
        } else if (T.mode === 2) {
            F(e);
        } else if (T.mode === 3) {
            V(e);
        } else if (T.mode === 4) {
            z(e);
        } else {
            n.createWithHTML(u, "span", "warning", l.text.modeNotSupportedText);
        }
        if (A <= 15) {
            a.style.display = "none";
        } else {
            a.style.removeProperty("display");
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
            u.innerHTML = "";
            n.createWithHTML(u, "span", "warning", l.text.noAttributesAvailableText);
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
            u.innerHTML = "";
            n.createWithHTML(u, "span", "warning", l.text.noClassesAvailableText);
        }
    }
    function G(t, o, i, r = true) {
        if (T.showOnly.length === 0 || T.showOnly.indexOf(o) > -1) {
            const a = n.create(u, "div", "property-row");
            n.createWithHTML(a, "div", "property-name", o);
            const s = n.create(a, "div", "property-value");
            const f = n.create(s, "input");
            if (e.hexColor(i) || e.isRgbColor(i)) {
                f.classList.add("property-value-color");
                f.style.borderLeftColor = i;
            }
            f.placeholder = l.text.propertyValuePlaceHolderText;
            const c = n.createWithHTML(a, "button", "copy-small", l.text.copySymbolText);
            c.title = l.text.copyText;
            c.onclick = () => {
                navigator.clipboard.writeText(i);
            };
            if (T.allowEditing && r) {
                const e = n.createWithHTML(a, "button", "paste-small", l.text.pasteSymbolText);
                const r = n.createWithHTML(a, "button", "remove-small", l.text.removeSymbolText);
                e.title = l.text.pasteText;
                r.title = l.text.removeText;
                e.onclick = () => {
                    navigator.clipboard.readText().then((e => {
                        f.value = e;
                        K(t, o, f);
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
            f.type = "text";
            f.value = i;
            b[o] = i;
            A++;
            if (!T.allowEditing || !r) {
                f.readOnly = true;
            } else {
                f.onkeyup = e => {
                    J(e, o, f, t);
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
        D = e.length;
        for (let t = 0; t < D; t++) {
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
        C();
    }
    function Q(e, t) {
        if (!S) {
            n.cancelBubble(e);
            if (m !== 0) {
                clearTimeout(m);
                m = 0;
            }
            m = setTimeout((() => {
                R(t);
                n.showElementAtMousePosition(e, i);
            }), l.dialogDisplayDelay);
        }
    }
    function Z() {
        if (!S) {
            if (m !== 0) {
                clearTimeout(m);
                m = 0;
            }
            C();
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
        if (!N) {
            w = t;
            N = true;
            M = e.pageX - w.offsetLeft;
            H = e.pageY - w.offsetTop;
            L = w.offsetLeft;
            E = w.offsetTop;
        }
    }
    function ne() {
        if (N) {
            N = false;
            w = null;
            L = 0;
            E = 0;
        }
    }
    function oe(e, t = false) {
        if (t) {
            n.cancelBubble(e);
        }
        if (N) {
            if (!S) {
                W();
            }
            S = true;
            w.style.left = `${e.pageX - M}px`;
            w.style.top = `${e.pageY - H}px`;
        }
    }
    function le() {
        if (N) {
            w.style.left = `${L}px`;
            w.style.top = `${E}px`;
            N = false;
            w = null;
            L = 0;
            E = 0;
        }
    }
    function ie(e) {
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
    function re(e = null) {
        l = o.getDefaultObject(e, {});
        l.dialogDisplayDelay = o.getDefaultNumber(l.dialogDisplayDelay, 1e3);
        l.searchDelayDelay = o.getDefaultNumber(l.searchDelayDelay, 500);
        ae();
    }
    function ae() {
        l.text = o.getDefaultObject(l.text, {});
        l.text.cssText = o.getDefaultAnyString(l.text.cssText, "CSS");
        l.text.attributesText = o.getDefaultAnyString(l.text.attributesText, "Attributes");
        l.text.sizeText = o.getDefaultAnyString(l.text.sizeText, "Size");
        l.text.classesText = o.getDefaultAnyString(l.text.classesText, "Classes");
        l.text.noAttributesAvailableText = o.getDefaultAnyString(l.text.noAttributesAvailableText, "No attributes are available.");
        l.text.closeText = o.getDefaultAnyString(l.text.closeText, "Close");
        l.text.copyText = o.getDefaultAnyString(l.text.copyText, "Copy");
        l.text.copySymbolText = o.getDefaultAnyString(l.text.copySymbolText, "❐");
        l.text.pasteText = o.getDefaultAnyString(l.text.pasteText, "Paste");
        l.text.pasteSymbolText = o.getDefaultAnyString(l.text.pasteSymbolText, "☐");
        l.text.removeText = o.getDefaultAnyString(l.text.removeText, "Remove");
        l.text.removeSymbolText = o.getDefaultAnyString(l.text.removeSymbolText, "✕");
        l.text.noClassesAvailableText = o.getDefaultAnyString(l.text.noClassesAvailableText, "No classes are available.");
        l.text.searchPropertiesPlaceHolderText = o.getDefaultAnyString(l.text.searchPropertiesPlaceHolderText, "Search properties...");
        l.text.clearText = o.getDefaultAnyString(l.text.clearText, "Clear");
        l.text.clearSymbolText = o.getDefaultAnyString(l.text.clearSymbolText, "✕");
        l.text.noPropertiesFoundForSearchText = o.getDefaultAnyString(l.text.noPropertiesFoundForSearchText, "No properties were found for your search.");
        l.text.dialogMovedSymbolText = o.getDefaultAnyString(l.text.dialogMovedSymbolText, "✱");
        l.text.propertyValuePlaceHolderText = o.getDefaultAnyString(l.text.propertyValuePlaceHolderText, "Enter value...");
        l.text.modeNotSupportedText = o.getDefaultAnyString(l.text.modeNotSupportedText, "The mode you have specified is not supported.");
        l.text.unknownModeText = o.getDefaultAnyString(l.text.unknownModeText, "Unknown Mode");
        l.text.moveUpText = o.getDefaultAnyString(l.text.moveUpText, "Move Up");
        l.text.moveUpSymbolText = o.getDefaultAnyString(l.text.moveUpSymbolText, "↑");
        l.text.moveDownText = o.getDefaultAnyString(l.text.moveDownText, "Move Down");
        l.text.moveDownSymbolText = o.getDefaultAnyString(l.text.moveDownSymbolText, "↓");
    }
    const se = {
        start: function(t) {
            if (!e.definedObject(T)) {
                T = ie(t);
                O();
                X();
            }
            return se;
        },
        stop: function() {
            if (e.definedObject(T)) {
                T = null;
                q();
            }
            return se;
        },
        close: function() {
            C();
            return se;
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
                    P();
                    if (e.definedObject(T)) {
                        O();
                    }
                }
            }
            return se;
        },
        getVersion: function() {
            return "1.6.0";
        }
    };
    (() => {
        re();
        document.addEventListener("DOMContentLoaded", (() => {
            P();
        }));
        if (!e.defined(window.$peek)) {
            window.$peek = se;
        }
    })();
})();//# sourceMappingURL=peek.js.map