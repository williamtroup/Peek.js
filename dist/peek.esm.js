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
    let g = 0;
    let y = null;
    let T = [];
    let m = {};
    let h = null;
    let b = false;
    let v = 0;
    let S = 0;
    let A = null;
    let D = 0;
    let L = 0;
    let w = false;
    let E = 0;
    let N = 0;
    function H() {
        if (e.definedObject(i)) {
            P();
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
        p.onclick = C;
        s = n.create(a, "input");
        s.placeholder = l.text.searchPropertiesPlaceHolderText;
        s.type = "text";
        s.onkeyup = $;
        s.onpaste = $;
        const t = n.createWithHTML(a, "button", "clear-small", l.text.clearSymbolText);
        t.title = l.text.clearText;
        t.onclick = k;
        const o = n.createWithHTML(d, "button", "close", l.text.closeText);
        o.onclick = P;
        x = n.createWithHTML(d, "button", "remove", l.text.removeText);
        x.onclick = W;
        Y(r, i);
    }
    function M(t = null) {
        if (!b) {
            let o = y.titleText;
            r.innerHTML = "";
            if (v > 1 && y.showNodeNameInTitle) {
                n.createWithHTML(r, "span", "node-name", `[${t.nodeName.toLowerCase()}] - `);
                n.createWithHTML(r, "span", "dash", " - ");
            }
            if (!e.definedString(o)) {
                if (y.mode === 1) {
                    o = l.text.cssText;
                } else if (y.mode === 2) {
                    o = l.text.attributesText;
                } else if (y.mode === 3) {
                    o = l.text.sizeText;
                } else if (y.mode === 4) {
                    o = l.text.classesText;
                } else {
                    o = l.text.unknownModeText;
                }
            }
            n.createWithHTML(r, "span", "title", o);
            if (y.showIdOrNameInTitle && e.defined(t)) {
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
    function O() {
        n.createWithHTML(r, "span", "locked", `${l.text.dialogMovedSymbolText}${" "}`, true);
    }
    function P() {
        i.style.display = "none";
        b = false;
        s.value = "";
    }
    function C() {
        const e = [];
        for (let t in m) {
            if (m.hasOwnProperty(t)) {
                if (y.mode === 1) {
                    e.push(`${t}: ${m[t]};`);
                } else if (y.mode === 2) {
                    e.push(`${t}="${m[t]}"`);
                } else if (y.mode === 4) {
                    e.push(m[t]);
                }
            }
        }
        if (y.mode === 1) {
            navigator.clipboard.writeText(`${h.nodeName.toLowerCase()} { ${"\n"} ${e.join("\n")} ${"\n"} }`);
        } else if (y.mode === 2 || y.mode === 4) {
            navigator.clipboard.writeText(e.join(" "));
        }
    }
    function W() {
        var e;
        (e = h.parentNode) == null ? void 0 : e.removeChild(h);
        P();
    }
    function $() {
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
    function k() {
        s.value = "";
        s.focus();
        $();
    }
    function I(e) {
        u.innerHTML = "";
        u.scrollTop = 0;
        m = {};
        S = 0;
        h = e;
        M(e);
        if (y.mode === 1 || y.mode === 4 || y.mode === 2) {
            p.style.removeProperty("display");
        } else {
            p.style.display = "none";
        }
        if (!y.allowEditing) {
            x.style.display = "none";
        } else {
            x.style.removeProperty("display");
        }
        c = n.createWithHTML(u, "span", "no-search-results", l.text.noPropertiesFoundForSearchText);
        if (y.mode === 1) {
            B(e);
        } else if (y.mode === 2) {
            j(e);
        } else if (y.mode === 3) {
            _(e);
        } else if (y.mode === 4) {
            R(e);
        } else {
            n.createWithHTML(u, "span", "warning", l.text.modeNotSupportedText);
        }
        if (S <= 15) {
            a.style.display = "none";
        } else {
            a.style.removeProperty("display");
        }
    }
    function B(e) {
        const t = getComputedStyle(e);
        const n = t.length;
        for (let o = 0; o < n; o++) {
            F(e, t[o], t.getPropertyValue(t[o]));
        }
    }
    function j(e) {
        if (e.hasAttributes()) {
            for (let t of e.attributes) {
                F(e, t.name, t.value);
            }
        } else {
            u.innerHTML = "";
            n.createWithHTML(u, "span", "warning", l.text.noAttributesAvailableText);
        }
    }
    function _(e) {
        const t = n.getOffset(e);
        F(e, "left", `${t.left.toString()}px`, false);
        F(e, "top", `${t.top.toString()}px`, false);
        F(e, "width", `${e.offsetWidth.toString()}px`, false);
        F(e, "height", `${e.offsetHeight.toString()}px`, false);
    }
    function R(e) {
        if (e.classList.length > 0) {
            let t = 1;
            for (let n of e.classList) {
                F(e, t.toString(), n);
                t++;
            }
        } else {
            u.innerHTML = "";
            n.createWithHTML(u, "span", "warning", l.text.noClassesAvailableText);
        }
    }
    function F(t, o, i, r = true) {
        if (y.showOnly.length === 0 || y.showOnly.indexOf(o) > -1) {
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
            if (y.allowEditing && r) {
                const e = n.createWithHTML(a, "button", "paste-small", l.text.pasteSymbolText);
                const r = n.createWithHTML(a, "button", "remove-small", l.text.removeSymbolText);
                e.title = l.text.pasteText;
                r.title = l.text.removeText;
                e.onclick = () => {
                    navigator.clipboard.readText().then((e => {
                        f.value = e;
                        V(t, o, f);
                    }));
                };
                r.onclick = () => {
                    if (y.mode === 1) {
                        t.style.removeProperty(o);
                    } else if (y.mode === 2) {
                        t.removeAttribute(o);
                    } else if (y.mode === 4) {
                        t.classList.remove(i);
                    }
                };
            }
            f.type = "text";
            f.value = i;
            m[o] = i;
            S++;
            if (!y.allowEditing || !r) {
                f.readOnly = true;
            } else {
                f.onkeyup = e => {
                    U(e, o, f, t);
                };
            }
        }
    }
    function U(e, t, n, o) {
        if (e.code === "Enter") {
            V(o, t, n);
        }
    }
    function V(t, n, o) {
        if (y.mode === 1) {
            t.style.setProperty(n, o.value);
        } else if (y.mode === 2) {
            t.setAttribute(n, o.value);
        } else if (y.mode === 4) {
            t.classList.replace(t.classList[parseInt(n) - 1], o.value);
        }
        m[n] = o.value;
        if (e.hexColor(o.value) || e.isRgbColor(o.value)) {
            o.classList.add("property-value-color");
            o.style.borderLeftColor = o.value;
        } else {
            o.classList.remove("property-value-color");
        }
    }
    function z() {
        const e = y.nodeType;
        v = e.length;
        for (let t = 0; t < v; t++) {
            const n = document.getElementsByTagName(e[t]);
            const o = [].slice.call(n);
            const l = o.length;
            for (let e = 0; e < l; e++) {
                G(o[e]);
            }
        }
        window.addEventListener("mousemove", X);
    }
    function G(n) {
        const o = n.getAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE);
        if (!e.definedString(o) && o !== "ignore") {
            n.addEventListener("mousemove", (e => {
                K(e, n);
            }));
            T.push(n);
        }
    }
    function J() {
        const e = T.length;
        for (let n = 0; n < e; n++) {
            var t = T[n];
            t.removeEventListener("mousemove", (e => {
                K(e, t);
            }));
        }
        T = [];
        window.removeEventListener("mousemove", X);
        P();
    }
    function K(e, t) {
        if (!b) {
            n.cancelBubble(e);
            if (g !== 0) {
                clearTimeout(g);
                g = 0;
            }
            g = setTimeout((() => {
                I(t);
                n.showElementAtMousePosition(e, i);
            }), l.dialogDisplayDelay);
        }
    }
    function X() {
        if (!b) {
            if (g !== 0) {
                clearTimeout(g);
                g = 0;
            }
            P();
        }
    }
    function Y(e, t) {
        e.onmousedown = e => {
            q(e, t);
        };
        t.onmousemove = e => {
            Z(e, true);
        };
        e.onmouseup = () => {
            Q();
        };
        e.oncontextmenu = () => {
            Q();
        };
        document.addEventListener("mousemove", Z);
        document.addEventListener("mouseleave", ee);
    }
    function q(e, t) {
        if (!w) {
            A = t;
            w = true;
            E = e.pageX - A.offsetLeft;
            N = e.pageY - A.offsetTop;
            D = A.offsetLeft;
            L = A.offsetTop;
        }
    }
    function Q() {
        if (w) {
            w = false;
            A = null;
            D = 0;
            L = 0;
        }
    }
    function Z(e, t = false) {
        if (t) {
            n.cancelBubble(e);
        }
        if (w) {
            if (!b) {
                O();
            }
            b = true;
            A.style.left = `${e.pageX - E}px`;
            A.style.top = `${e.pageY - N}px`;
        }
    }
    function ee() {
        if (w) {
            A.style.left = `${D}px`;
            A.style.top = `${L}px`;
            w = false;
            A = null;
            D = 0;
            L = 0;
        }
    }
    function te(e) {
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
    function ne(e = null) {
        l = o.getDefaultObject(e, {});
        l.dialogDisplayDelay = o.getDefaultNumber(l.dialogDisplayDelay, 1e3);
        l.searchDelayDelay = o.getDefaultNumber(l.searchDelayDelay, 500);
        oe();
    }
    function oe() {
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
    }
    const le = {
        start: function(t) {
            if (!e.definedObject(y)) {
                y = te(t);
                M();
                z();
            }
            return le;
        },
        stop: function() {
            if (e.definedObject(y)) {
                y = null;
                J();
            }
            return le;
        },
        close: function() {
            P();
            return le;
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
                    ne(o);
                    H();
                    if (e.definedObject(y)) {
                        M();
                    }
                }
            }
            return le;
        },
        getVersion: function() {
            return "1.6.0";
        }
    };
    (() => {
        ne();
        document.addEventListener("DOMContentLoaded", (() => {
            H();
        }));
        if (!e.defined(window.$peek)) {
            window.$peek = le;
        }
    })();
})();//# sourceMappingURL=peek.esm.js.map