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
    let x = null;
    let m = [];
    let T = {};
    let b = null;
    let h = false;
    let v = 0;
    let S = 0;
    let A = null;
    let L = 0;
    let D = 0;
    let w = false;
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
        p = n.createWithHTML(d, "button", "copy", l.text.copyText);
        p.onclick = C;
        a = n.create(s, "input");
        a.placeholder = l.text.searchPropertiesPlaceHolderText;
        a.type = "text";
        a.onkeyup = W;
        a.onpaste = W;
        const t = n.createWithHTML(s, "button", "clear-small", l.text.clearSymbolText);
        t.title = l.text.clearText;
        t.onclick = $;
        const o = n.createWithHTML(d, "button", "close", l.text.closeText);
        o.onclick = P;
        g = n.createWithHTML(d, "button", "remove", l.text.removeText);
        g.onclick = M;
        Y(r, i);
    }
    function H(t = null) {
        let o = x.titleText;
        r.innerHTML = "";
        if (v > 1 && x.showNodeNameInTitle) {
            n.createWithHTML(r, "span", "node-name", `[${t.nodeName.toLowerCase()}] - `);
            n.createWithHTML(r, "span", "dash", " - ");
        }
        if (!e.definedString(o)) {
            if (x.mode === 1) {
                o = l.text.cssText;
            } else if (x.mode === 2) {
                o = l.text.attributesText;
            } else if (x.mode === 3) {
                o = l.text.sizeText;
            } else if (x.mode === 4) {
                o = l.text.classesText;
            }
        }
        n.createWithHTML(r, "span", "title", o);
        if (x.showIdOrNameInTitle && e.defined(t)) {
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
        for (let t in T) {
            if (T.hasOwnProperty(t)) {
                if (x.mode === 1) {
                    e.push(`${t}: ${T[t]};`);
                } else if (x.mode === 2) {
                    e.push(`${t}="${T[t]}"`);
                } else if (x.mode === 4) {
                    e.push(T[t]);
                }
            }
        }
        if (x.mode === 1) {
            navigator.clipboard.writeText(`${b.nodeName.toLowerCase()} { ${"\n"} ${e.join("\n")} ${"\n"} }`);
        } else if (x.mode === 2 || x.mode === 4) {
            navigator.clipboard.writeText(e.join(" "));
        }
    }
    function M() {
        var e;
        (e = b.parentNode) == null ? void 0 : e.removeChild(b);
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
        }), l.searchDelayDelay);
    }
    function $() {
        a.value = "";
        a.focus();
        W();
    }
    function I(e) {
        c.innerHTML = "";
        c.scrollTop = 0;
        T = {};
        S = 0;
        b = e;
        H(e);
        if (x.mode === 3) {
            p.style.display = "none";
        } else {
            p.style.removeProperty("display");
        }
        if (!x.allowEditing) {
            g.style.display = "none";
        } else {
            g.style.removeProperty("display");
        }
        u = n.createWithHTML(c, "span", "no-search-results", l.text.noPropertiesFoundForSearchText);
        if (x.mode === 1) {
            j(e);
        } else if (x.mode === 2) {
            k(e);
        } else if (x.mode === 3) {
            B(e);
        } else if (x.mode === 4) {
            _(e);
        }
        if (S <= 15) {
            s.style.display = "none";
        } else {
            s.style.removeProperty("display");
        }
    }
    function j(e) {
        const t = getComputedStyle(e);
        const n = t.length;
        for (let o = 0; o < n; o++) {
            R(e, t[o], t.getPropertyValue(t[o]));
        }
    }
    function k(e) {
        if (e.hasAttributes()) {
            for (let t of e.attributes) {
                R(e, t.name, t.value);
            }
        } else {
            c.innerHTML = "";
            n.createWithHTML(c, "span", "warning", l.text.noAttributesAvailableText);
        }
    }
    function B(e) {
        const t = n.getOffset(e);
        R(e, "left", `${t.left.toString()}px`, false);
        R(e, "top", `${t.top.toString()}px`, false);
        R(e, "width", `${e.offsetWidth.toString()}px`, false);
        R(e, "height", `${e.offsetHeight.toString()}px`, false);
    }
    function _(e) {
        if (e.classList.length > 0) {
            let t = 1;
            for (let n of e.classList) {
                R(e, t.toString(), n);
                t++;
            }
        } else {
            c.innerHTML = "";
            n.createWithHTML(c, "span", "warning", l.text.noClassesAvailableText);
        }
    }
    function R(t, o, i, r = true) {
        if (x.showOnly.length === 0 || x.showOnly.indexOf(o) > -1) {
            const s = n.create(c, "div", "property-row");
            n.createWithHTML(s, "div", "property-name", o);
            const a = n.create(s, "div", "property-value");
            const f = n.create(a, "input");
            if (e.hexColor(i) || e.isRgbColor(i)) {
                f.classList.add("property-value-color");
                f.style.borderLeftColor = i;
            }
            const u = n.createWithHTML(s, "button", "copy-small", l.text.copySymbolText);
            u.title = l.text.copyText;
            u.onclick = () => {
                navigator.clipboard.writeText(i);
            };
            if (x.allowEditing && r) {
                const e = n.createWithHTML(s, "button", "paste-small", l.text.pasteSymbolText);
                const r = n.createWithHTML(s, "button", "remove-small", l.text.removeSymbolText);
                e.title = l.text.pasteText;
                r.title = l.text.removeText;
                e.onclick = () => {
                    navigator.clipboard.readText().then((e => {
                        f.value = e;
                        z(t, o, f);
                    }));
                };
                r.onclick = () => {
                    if (x.mode === 1) {
                        t.style.removeProperty(o);
                    } else if (x.mode === 2) {
                        t.removeAttribute(o);
                    } else if (x.mode === 4) {
                        t.classList.remove(i);
                    }
                };
            }
            f.type = "text";
            f.value = i;
            T[o] = i;
            S++;
            if (!x.allowEditing || !r) {
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
        if (x.mode === 1) {
            t.style.setProperty(n, o.value);
        } else if (x.mode === 2) {
            t.setAttribute(n, o.value);
        } else if (x.mode === 4) {
            t.classList.replace(t.classList[parseInt(n) - 1], o.value);
        }
        T[n] = o.value;
        if (e.hexColor(o.value) || e.isRgbColor(o.value)) {
            o.classList.add("property-value-color");
            o.style.borderLeftColor = o.value;
        } else {
            o.classList.remove("property-value-color");
        }
    }
    function G() {
        const e = x.nodeType;
        v = e.length;
        for (let t = 0; t < v; t++) {
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
            m.push(n);
        }
    }
    function K() {
        const e = m.length;
        for (let n = 0; n < e; n++) {
            var t = m[n];
            t.removeEventListener("mousemove", (e => {
                U(e, t);
            }));
        }
        m = [];
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
        if (!w) {
            h = true;
            A = t;
            w = true;
            E = e.pageX - A.offsetLeft;
            N = e.pageY - A.offsetTop;
            L = A.offsetLeft;
            D = A.offsetTop;
        }
    }
    function q() {
        if (w) {
            w = false;
            A = null;
            L = 0;
            D = 0;
        }
    }
    function Q(e, t = false) {
        if (t) {
            n.cancelBubble(e);
        }
        if (w) {
            A.style.left = `${e.pageX - E}px`;
            A.style.top = `${e.pageY - N}px`;
        }
    }
    function Z() {
        if (w) {
            A.style.left = `${L}px`;
            A.style.top = `${D}px`;
            w = false;
            A = null;
            L = 0;
            D = 0;
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
        l.searchDelayDelay = o.getDefaultNumber(l.searchDelayDelay, 500);
        ne();
    }
    function ne() {
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
    }
    const oe = {
        start: function(t) {
            if (!e.definedObject(x)) {
                x = ee(t);
                H();
                G();
            }
            return oe;
        },
        stop: function() {
            if (e.definedObject(x)) {
                x = null;
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
                    if (e.definedObject(x)) {
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