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
    function f(e, t = 1) {
        return !s(e) || e.length < t;
    }
    e.invalidOptionArray = f;
    function c(e) {
        let t = e.length >= 2 && e.length <= 7;
        if (t && e[0] === "#") {
            t = isNaN(+e.substring(1, e.length - 1));
        } else {
            t = false;
        }
        return t;
    }
    e.hexColor = c;
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
    function o(n, o, l = "") {
        const i = o.toLowerCase();
        const r = i === "text";
        let s = r ? document.createTextNode("") : document.createElement(i);
        s.setAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE, "ignore");
        if (e.definedString(l)) {
            s.className = l;
        }
        n.appendChild(s);
        return s;
    }
    n.create = o;
    function l(e, n, l, i) {
        const r = o(e, n, l);
        r.innerHTML = i;
        r.setAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE, "ignore");
        return r;
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
    let l = {};
    let i = null;
    let r = null;
    let s = null;
    let a = null;
    let f = 0;
    let c = null;
    let u = null;
    let d = null;
    let p = null;
    let g = null;
    let y = 0;
    let m = null;
    let T = [];
    let b = {};
    let v = null;
    let h = false;
    let x = 0;
    let S = 0;
    let A = null;
    let L = 0;
    let w = 0;
    let D = false;
    let E = 0;
    let N = 0;
    function O() {
        if (e.definedObject(i)) {
            P();
            document.body.removeChild(i);
            i = null;
        }
        i = n.create(document.body, "div", "peek-js");
        i.onmousemove = n.cancelBubble;
        r = n.create(i, "div", "dialog-title-bar");
        s = n.create(i, "div", "dialog-search");
        c = n.create(i, "div", "dialog-contents");
        d = n.create(i, "div", "dialog-buttons");
        p = n.createWithHTML(d, "button", "copy", l.copyText);
        p.onclick = C;
        a = n.create(s, "input");
        a.placeholder = l.searchPropertiesPlaceHolderText;
        a.type = "text";
        a.onkeyup = W;
        a.onpaste = W;
        const t = n.createWithHTML(s, "button", "remove-small", l.clearSymbolText);
        t.title = l.clearText;
        t.onclick = $;
        const o = n.createWithHTML(d, "button", "close", l.closeText);
        o.onclick = P;
        g = n.createWithHTML(d, "button", "remove", l.removeText);
        g.onclick = M;
        Y(r, i);
    }
    function H(t = null) {
        let o = m.titleText;
        r.innerHTML = "";
        if (x > 1 && m.showNodeNameInTitle) {
            n.createWithHTML(r, "span", "node-name", `[${t.nodeName.toLowerCase()}] - `);
            n.createWithHTML(r, "span", "dash", " - ");
        }
        if (!e.definedString(o)) {
            if (m.mode === 1) {
                o = l.cssText;
            } else if (m.mode === 2) {
                o = l.attributesText;
            } else if (m.mode === 3) {
                o = l.sizeText;
            } else if (m.mode === 4) {
                o = l.classesText;
            }
        }
        n.createWithHTML(r, "span", "title", o);
        if (m.showIdOrNameInTitle && e.defined(t)) {
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
    function P() {
        i.style.display = "none";
        h = false;
        a.value = "";
    }
    function C() {
        const e = [];
        for (let t in b) {
            if (b.hasOwnProperty(t)) {
                if (m.mode === 1) {
                    e.push(`${t}: ${b[t]};`);
                } else if (m.mode === 2) {
                    e.push(`${t}="${b[t]}"`);
                } else if (m.mode === 4) {
                    e.push(b[t]);
                }
            }
        }
        if (m.mode === 1) {
            navigator.clipboard.writeText(`${v.nodeName.toLowerCase()} { ${"\n"} ${e.join("\n")} ${"\n"} }`);
        } else if (m.mode === 2 || m.mode === 4) {
            navigator.clipboard.writeText(e.join(" "));
        }
    }
    function M() {
        var e;
        (e = v.parentNode) == null ? void 0 : e.removeChild(v);
        P();
    }
    function W() {
        if (f !== 0) {
            clearTimeout(f);
            f = 0;
        }
        f = setTimeout((() => {
            const t = c.getElementsByClassName("property-name");
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
        }), 500);
    }
    function $() {
        a.value = "";
        a.focus();
        W();
    }
    function I(e) {
        c.innerHTML = "";
        c.scrollTop = 0;
        b = {};
        S = 0;
        v = e;
        H(e);
        if (m.mode === 3) {
            p.style.display = "none";
        } else {
            p.style.removeProperty("display");
        }
        if (!m.allowEditing) {
            g.style.display = "none";
        } else {
            g.style.removeProperty("display");
        }
        u = n.createWithHTML(c, "span", "no-search-results", l.noPropertiesFoundForSearchText);
        if (m.mode === 1) {
            k(e);
        } else if (m.mode === 2) {
            B(e);
        } else if (m.mode === 3) {
            _(e);
        } else if (m.mode === 4) {
            j(e);
        }
        if (S <= 15) {
            s.style.display = "none";
        } else {
            s.style.removeProperty("display");
        }
    }
    function k(e) {
        const t = getComputedStyle(e);
        const n = t.length;
        for (let o = 0; o < n; o++) {
            R(e, t[o], t.getPropertyValue(t[o]));
        }
    }
    function B(e) {
        if (e.hasAttributes()) {
            for (let t of e.attributes) {
                R(e, t.name, t.value);
            }
        } else {
            c.innerHTML = "";
            n.createWithHTML(c, "span", "warning", l.noAttributesAvailableText);
        }
    }
    function _(e) {
        const t = n.getOffset(e);
        R(e, "left", `${t.left.toString()}px`, false);
        R(e, "top", `${t.top.toString()}px`, false);
        R(e, "width", `${e.offsetWidth.toString()}px`, false);
        R(e, "height", `${e.offsetHeight.toString()}px`, false);
    }
    function j(e) {
        if (e.classList.length > 0) {
            let t = 1;
            for (let n of e.classList) {
                R(e, t.toString(), n);
                t++;
            }
        } else {
            c.innerHTML = "";
            n.createWithHTML(c, "span", "warning", l.noClassesAvailableText);
        }
    }
    function R(t, o, i, r = true) {
        if (m.showOnly.length === 0 || m.showOnly.indexOf(o) > -1) {
            const s = n.create(c, "div", "property-row");
            n.createWithHTML(s, "div", "property-name", o);
            const a = n.create(s, "div", "property-value");
            const f = n.create(a, "input");
            if (e.hexColor(i) || e.isRgbColor(i)) {
                f.classList.add("property-value-color");
                f.style.borderLeftColor = i;
            }
            const u = n.createWithHTML(s, "button", "copy-small", l.copySymbolText);
            u.title = l.copyText;
            u.onclick = () => {
                navigator.clipboard.writeText(i);
            };
            if (m.allowEditing && r) {
                const e = n.createWithHTML(s, "button", "paste-small", l.pasteSymbolText);
                const r = n.createWithHTML(s, "button", "remove-small", l.removeSymbolText);
                e.title = l.pasteText;
                r.title = l.removeText;
                e.onclick = () => {
                    navigator.clipboard.readText().then((e => {
                        f.value = e;
                        z(t, o, f);
                    }));
                };
                r.onclick = () => {
                    if (m.mode === 1) {
                        t.style.removeProperty(o);
                    } else if (m.mode === 2) {
                        t.removeAttribute(o);
                    } else if (m.mode === 4) {
                        t.classList.remove(i);
                    }
                };
            }
            f.type = "text";
            f.value = i;
            b[o] = i;
            S++;
            if (!m.allowEditing || !r) {
                f.readOnly = true;
            } else {
                f.onkeyup = e => {
                    F(e, o, f, t);
                };
            }
        }
    }
    function F(e, t, n, o) {
        if (e.code === "Enter") {
            z(o, t, n);
        }
    }
    function z(t, n, o) {
        if (m.mode === 1) {
            t.style.setProperty(n, o.value);
        } else if (m.mode === 2) {
            t.setAttribute(n, o.value);
        } else if (m.mode === 4) {
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
    function G() {
        const e = m.nodeType;
        x = e.length;
        for (let t = 0; t < x; t++) {
            const n = document.getElementsByTagName(e[t]);
            const o = [].slice.call(n);
            const l = o.length;
            for (let e = 0; e < l; e++) {
                J(o[e]);
            }
        }
        window.addEventListener("mousemove", X);
    }
    function J(n) {
        const o = n.getAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE);
        if (!e.definedString(o) && o !== "ignore") {
            n.addEventListener("mousemove", (e => {
                U(e, n);
            }));
            T.push(n);
        }
    }
    function K() {
        const e = T.length;
        for (let n = 0; n < e; n++) {
            var t = T[n];
            t.removeEventListener("mousemove", (e => {
                U(e, t);
            }));
        }
        T = [];
        window.removeEventListener("mousemove", X);
        P();
    }
    function U(e, t) {
        if (!h) {
            n.cancelBubble(e);
            if (y !== 0) {
                clearTimeout(y);
                y = 0;
            }
            y = setTimeout((() => {
                I(t);
                n.showElementAtMousePosition(e, i);
            }), l.dialogDisplayDelay);
        }
    }
    function X() {
        if (!h) {
            if (y !== 0) {
                clearTimeout(y);
                y = 0;
            }
            P();
        }
    }
    function Y(e, t) {
        e.onmousedown = e => {
            V(e, t);
        };
        t.onmousemove = e => {
            Q(e, true);
        };
        e.onmouseup = () => {
            q();
        };
        e.oncontextmenu = () => {
            q();
        };
        document.addEventListener("mousemove", Q);
        document.addEventListener("mouseleave", Z);
    }
    function V(e, t) {
        if (!D) {
            h = true;
            A = t;
            D = true;
            E = e.pageX - A.offsetLeft;
            N = e.pageY - A.offsetTop;
            L = A.offsetLeft;
            w = A.offsetTop;
        }
    }
    function q() {
        if (D) {
            D = false;
            A = null;
            L = 0;
            w = 0;
        }
    }
    function Q(e, t = false) {
        if (t) {
            n.cancelBubble(e);
        }
        if (D) {
            A.style.left = `${e.pageX - E}px`;
            A.style.top = `${e.pageY - N}px`;
        }
    }
    function Z() {
        if (D) {
            A.style.left = `${L}px`;
            A.style.top = `${w}px`;
            D = false;
            A = null;
            L = 0;
            w = 0;
        }
    }
    function ee(e) {
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
    function te(e = null) {
        l = o.getDefaultObject(e, {});
        l.dialogDisplayDelay = o.getDefaultNumber(l.dialogDisplayDelay, 1e3);
        ne();
    }
    function ne() {
        l.cssText = o.getDefaultAnyString(l.cssText, "CSS");
        l.attributesText = o.getDefaultAnyString(l.attributesText, "Attributes");
        l.sizeText = o.getDefaultAnyString(l.sizeText, "Size");
        l.classesText = o.getDefaultAnyString(l.classesText, "Classes");
        l.noAttributesAvailableText = o.getDefaultAnyString(l.noAttributesAvailableText, "No attributes are available.");
        l.closeText = o.getDefaultAnyString(l.closeText, "Close");
        l.copyText = o.getDefaultAnyString(l.copyText, "Copy");
        l.copySymbolText = o.getDefaultAnyString(l.copySymbolText, "❐");
        l.pasteText = o.getDefaultAnyString(l.pasteText, "Paste");
        l.pasteSymbolText = o.getDefaultAnyString(l.pasteSymbolText, "☐");
        l.removeText = o.getDefaultAnyString(l.removeText, "Remove");
        l.removeSymbolText = o.getDefaultAnyString(l.removeSymbolText, "✕");
        l.noClassesAvailableText = o.getDefaultAnyString(l.noClassesAvailableText, "No classes are available.");
        l.searchPropertiesPlaceHolderText = o.getDefaultAnyString(l.searchPropertiesPlaceHolderText, "Search properties...");
        l.clearText = o.getDefaultAnyString(l.clearText, "Clear");
        l.clearSymbolText = o.getDefaultAnyString(l.clearSymbolText, "✕");
        l.noPropertiesFoundForSearchText = o.getDefaultAnyString(l.noPropertiesFoundForSearchText, "No properties were found for your search.");
    }
    const oe = {
        start: function(t) {
            if (!e.definedObject(m)) {
                m = ee(t);
                H();
                G();
            }
            return oe;
        },
        stop: function() {
            if (e.definedObject(m)) {
                m = null;
                K();
            }
            return oe;
        },
        close: function() {
            P();
            return oe;
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
                    te(o);
                    O();
                    if (e.definedObject(m)) {
                        H();
                    }
                }
            }
            return oe;
        },
        getVersion: function() {
            return "1.5.0";
        }
    };
    (() => {
        te();
        document.addEventListener("DOMContentLoaded", (() => {
            O();
        }));
        if (!e.defined(window.$peek)) {
            window.$peek = oe;
        }
    })();
})();//# sourceMappingURL=peek.esm.js.map