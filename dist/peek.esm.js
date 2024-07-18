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

var l;

(e => {
    let t;
    (e => {
        function t(e = null) {
            let t = o.getObject(e, {});
            t.dialogDisplayDelay = o.getNumber(t.dialogDisplayDelay, 1e3);
            t.searchDelayDelay = o.getNumber(t.searchDelayDelay, 500);
            t = n(t);
            return t;
        }
        e.get = t;
        function n(e) {
            e.text = o.getObject(e.text, {});
            e.text.cssText = o.getAnyString(e.text.cssText, "CSS");
            e.text.attributesText = o.getAnyString(e.text.attributesText, "Attributes");
            e.text.sizeText = o.getAnyString(e.text.sizeText, "Size");
            e.text.classesText = o.getAnyString(e.text.classesText, "Classes");
            e.text.noAttributesAvailableText = o.getAnyString(e.text.noAttributesAvailableText, "No attributes are available.");
            e.text.closeText = o.getAnyString(e.text.closeText, "Close");
            e.text.copyText = o.getAnyString(e.text.copyText, "Copy");
            e.text.copySymbolText = o.getAnyString(e.text.copySymbolText, "❐");
            e.text.pasteText = o.getAnyString(e.text.pasteText, "Paste");
            e.text.pasteSymbolText = o.getAnyString(e.text.pasteSymbolText, "☐");
            e.text.removeText = o.getAnyString(e.text.removeText, "Remove");
            e.text.removeSymbolText = o.getAnyString(e.text.removeSymbolText, "✕");
            e.text.noClassesAvailableText = o.getAnyString(e.text.noClassesAvailableText, "No classes are available.");
            e.text.searchPropertiesPlaceHolderText = o.getAnyString(e.text.searchPropertiesPlaceHolderText, "Search properties...");
            e.text.clearText = o.getAnyString(e.text.clearText, "Clear");
            e.text.clearSymbolText = o.getAnyString(e.text.clearSymbolText, "✕");
            e.text.noPropertiesFoundForSearchText = o.getAnyString(e.text.noPropertiesFoundForSearchText, "No properties were found for your search.");
            e.text.dialogMovedSymbolText = o.getAnyString(e.text.dialogMovedSymbolText, "✱");
            e.text.propertyValuePlaceHolderText = o.getAnyString(e.text.propertyValuePlaceHolderText, "Enter value...");
            e.text.modeNotSupportedText = o.getAnyString(e.text.modeNotSupportedText, "The mode you have specified is not supported.");
            e.text.unknownModeText = o.getAnyString(e.text.unknownModeText, "Unknown Mode");
            e.text.moveUpText = o.getAnyString(e.text.moveUpText, "Move Up");
            e.text.moveUpSymbolText = o.getAnyString(e.text.moveUpSymbolText, "↑");
            e.text.moveDownText = o.getAnyString(e.text.moveDownText, "Move Down");
            e.text.moveDownSymbolText = o.getAnyString(e.text.moveDownSymbolText, "↓");
            e.text.removeElementSymbolText = o.getAnyString(e.text.removeElementSymbolText, "⌫");
            return e;
        }
    })(t = e.Options || (e.Options = {}));
})(l || (l = {}));

var i;

(e => {
    let t;
    (e => {
        function t(e) {
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
        e.get = t;
    })(t = e.Options || (e.Options = {}));
})(i || (i = {}));

(() => {
    let o = {};
    let r = null;
    let s = null;
    let a = null;
    let c = null;
    let f = 0;
    let u = null;
    let d = null;
    let p = null;
    let x = null;
    let y = null;
    let g = null;
    let m = null;
    let T = 0;
    let v = null;
    let b = [];
    let h = {};
    let S = null;
    let A = false;
    let w = 0;
    let L = 0;
    let E = null;
    let N = 0;
    let O = 0;
    let M = false;
    let H = 0;
    let P = 0;
    function W() {
        if (e.definedObject(r)) {
            D();
            document.body.removeChild(r);
            r = null;
        }
        r = n.create(document.body, "div", "peek-js");
        r.onmousemove = n.cancelBubble;
        s = n.create(r, "div", "dialog-title-bar");
        a = n.create(r, "div", "dialog-search");
        u = n.create(r, "div", "dialog-contents");
        p = n.create(r, "div", "dialog-buttons");
        x = n.createWithHTML(p, "button", "copy", o.text.copyText);
        x.onclick = $;
        c = n.create(a, "input");
        c.placeholder = o.text.searchPropertiesPlaceHolderText;
        c.type = "text";
        c.onkeyup = I;
        c.onpaste = I;
        const t = n.createWithHTML(a, "button", "clear-small", o.text.clearSymbolText);
        t.title = o.text.clearText;
        t.onclick = j;
        const l = n.createWithHTML(p, "button", "close", o.text.closeText);
        l.onclick = D;
        y = n.createWithHTML(p, "button", "remove", o.text.removeElementSymbolText);
        y.onclick = B;
        y.title = o.text.removeText;
        g = n.createWithHTML(p, "button", "move-up", o.text.moveUpSymbolText);
        g.onclick = _;
        g.title = o.text.moveUpText;
        m = n.createWithHTML(p, "button", "move-down", o.text.moveDownSymbolText);
        m.onclick = R;
        m.title = o.text.moveDownText;
        te(s, r);
    }
    function C(t = null) {
        if (!A) {
            let l = v.titleText;
            s.innerHTML = "";
            if (w > 1 && v.showNodeNameInTitle) {
                n.createWithHTML(s, "span", "node-name", `[${t.nodeName.toLowerCase()}] - `);
                n.createWithHTML(s, "span", "dash", " - ");
            }
            if (!e.definedString(l)) {
                if (v.mode === 1) {
                    l = o.text.cssText;
                } else if (v.mode === 2) {
                    l = o.text.attributesText;
                } else if (v.mode === 3) {
                    l = o.text.sizeText;
                } else if (v.mode === 4) {
                    l = o.text.classesText;
                } else {
                    l = o.text.unknownModeText;
                }
            }
            n.createWithHTML(s, "span", "title", l);
            if (v.showIdOrNameInTitle && e.defined(t)) {
                const o = t.getAttribute("id");
                const l = t.getAttribute("name");
                if (e.definedString(o)) {
                    n.createWithHTML(s, "span", "dash", " - ");
                    n.createWithHTML(s, "span", "id-or-name", o);
                } else if (e.definedString(l)) {
                    n.createWithHTML(s, "span", "dash", " - ");
                    n.createWithHTML(s, "span", "id-or-name", l);
                }
            }
        }
    }
    function k() {
        n.createWithHTML(s, "span", "locked", `${o.text.dialogMovedSymbolText}${" "}`, true);
    }
    function D() {
        r.style.display = "none";
        A = false;
        c.value = "";
    }
    function $() {
        const e = [];
        for (let t in h) {
            if (h.hasOwnProperty(t)) {
                if (v.mode === 1) {
                    e.push(`${t}: ${h[t]};`);
                } else if (v.mode === 2) {
                    e.push(`${t}="${h[t]}"`);
                } else if (v.mode === 4) {
                    e.push(h[t]);
                }
            }
        }
        if (v.mode === 1) {
            navigator.clipboard.writeText(`${S.nodeName.toLowerCase()} { ${"\n"} ${e.join("\n")} ${"\n"} }`);
        } else if (v.mode === 2 || v.mode === 4) {
            navigator.clipboard.writeText(e.join(" "));
        }
    }
    function B() {
        var e;
        (e = S.parentNode) == null ? void 0 : e.removeChild(S);
        D();
    }
    function I() {
        if (f !== 0) {
            clearTimeout(f);
            f = 0;
        }
        f = setTimeout((() => {
            const t = u.getElementsByClassName("property-name");
            const n = [].slice.call(t);
            const o = n.length;
            const l = c.value.toLowerCase();
            let i = 0;
            for (let t = 0; t < o; t++) {
                const o = n[t].parentNode;
                if (e.defined(o)) {
                    if (c.value.trim() === "") {
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
                d.style.display = "block";
            } else {
                d.style.removeProperty("display");
            }
        }), o.searchDelayDelay);
    }
    function j() {
        c.value = "";
        c.focus();
        I();
    }
    function _() {
        if (S.parentNode !== null && S.previousElementSibling !== null) {
            S.parentNode.insertBefore(S, S.previousElementSibling);
        }
    }
    function R() {
        if (S.parentNode !== null && S.nextElementSibling !== null) {
            S.parentNode.insertBefore(S.nextElementSibling, S);
        }
    }
    function U(e) {
        u.innerHTML = "";
        u.scrollTop = 0;
        h = {};
        L = 0;
        S = e;
        C(e);
        if (v.mode === 1 || v.mode === 4 || v.mode === 2) {
            x.style.removeProperty("display");
        } else {
            x.style.display = "none";
        }
        if (!v.allowEditing) {
            y.style.display = "none";
            g.style.display = "none";
            m.style.display = "none";
        } else {
            y.style.removeProperty("display");
            g.style.removeProperty("display");
            m.style.removeProperty("display");
        }
        d = n.createWithHTML(u, "span", "no-search-results", o.text.noPropertiesFoundForSearchText);
        if (v.mode === 1) {
            F(e);
        } else if (v.mode === 2) {
            V(e);
        } else if (v.mode === 3) {
            z(e);
        } else if (v.mode === 4) {
            G(e);
        } else {
            n.createWithHTML(u, "span", "warning", o.text.modeNotSupportedText);
        }
        if (L <= 15) {
            a.style.display = "none";
        } else {
            a.style.removeProperty("display");
        }
    }
    function F(e) {
        const t = getComputedStyle(e);
        const n = t.length;
        for (let o = 0; o < n; o++) {
            J(e, t[o], t.getPropertyValue(t[o]));
        }
    }
    function V(e) {
        if (e.hasAttributes()) {
            for (let t of e.attributes) {
                J(e, t.name, t.value);
            }
        } else {
            u.innerHTML = "";
            n.createWithHTML(u, "span", "warning", o.text.noAttributesAvailableText);
        }
    }
    function z(e) {
        const t = n.getOffset(e);
        J(e, "left", `${t.left.toString()}px`, false);
        J(e, "top", `${t.top.toString()}px`, false);
        J(e, "width", `${e.offsetWidth.toString()}px`, false);
        J(e, "height", `${e.offsetHeight.toString()}px`, false);
    }
    function G(e) {
        if (e.classList.length > 0) {
            let t = 1;
            for (let n of e.classList) {
                J(e, t.toString(), n);
                t++;
            }
        } else {
            u.innerHTML = "";
            n.createWithHTML(u, "span", "warning", o.text.noClassesAvailableText);
        }
    }
    function J(t, l, i, r = true) {
        if (v.showOnly.length === 0 || v.showOnly.indexOf(l) > -1) {
            const s = n.create(u, "div", "property-row");
            n.createWithHTML(s, "div", "property-name", l);
            const a = n.create(s, "div", "property-value");
            const c = n.create(a, "input");
            if (e.hexColor(i) || e.isRgbColor(i)) {
                c.classList.add("property-value-color");
                c.style.borderLeftColor = i;
            }
            c.placeholder = o.text.propertyValuePlaceHolderText;
            const f = n.createWithHTML(s, "button", "copy-small", o.text.copySymbolText);
            f.title = o.text.copyText;
            f.onclick = () => {
                navigator.clipboard.writeText(i);
            };
            if (v.allowEditing && r) {
                const e = n.createWithHTML(s, "button", "paste-small", o.text.pasteSymbolText);
                const r = n.createWithHTML(s, "button", "remove-small", o.text.removeSymbolText);
                e.title = o.text.pasteText;
                r.title = o.text.removeText;
                e.onclick = () => {
                    navigator.clipboard.readText().then((e => {
                        c.value = e;
                        X(t, l, c);
                    }));
                };
                r.onclick = () => {
                    if (v.mode === 1) {
                        t.style.removeProperty(l);
                    } else if (v.mode === 2) {
                        t.removeAttribute(l);
                    } else if (v.mode === 4) {
                        t.classList.remove(i);
                    }
                };
            }
            c.type = "text";
            c.value = i;
            h[l] = i;
            L++;
            if (!v.allowEditing || !r) {
                c.readOnly = true;
            } else {
                c.onkeyup = e => {
                    K(e, l, c, t);
                };
            }
        }
    }
    function K(e, t, n, o) {
        if (e.code === "Enter") {
            X(o, t, n);
        }
    }
    function X(t, n, o) {
        if (v.mode === 1) {
            t.style.setProperty(n, o.value);
        } else if (v.mode === 2) {
            t.setAttribute(n, o.value);
        } else if (v.mode === 4) {
            t.classList.replace(t.classList[parseInt(n) - 1], o.value);
        }
        h[n] = o.value;
        if (e.hexColor(o.value) || e.isRgbColor(o.value)) {
            o.classList.add("property-value-color");
            o.style.borderLeftColor = o.value;
        } else {
            o.classList.remove("property-value-color");
        }
    }
    function Y() {
        const e = v.nodeType;
        w = e.length;
        for (let t = 0; t < w; t++) {
            const n = document.getElementsByTagName(e[t]);
            const o = [].slice.call(n);
            const l = o.length;
            for (let e = 0; e < l; e++) {
                q(o[e]);
            }
        }
        window.addEventListener("mousemove", ee);
    }
    function q(n) {
        const o = n.getAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE);
        if (!e.definedString(o) && o !== "ignore") {
            n.addEventListener("mousemove", (e => {
                Z(e, n);
            }));
            b.push(n);
        }
    }
    function Q() {
        const e = b.length;
        for (let n = 0; n < e; n++) {
            var t = b[n];
            t.removeEventListener("mousemove", (e => {
                Z(e, t);
            }));
        }
        b = [];
        window.removeEventListener("mousemove", ee);
        D();
    }
    function Z(e, t) {
        if (!A) {
            n.cancelBubble(e);
            if (T !== 0) {
                clearTimeout(T);
                T = 0;
            }
            T = setTimeout((() => {
                U(t);
                n.showElementAtMousePosition(e, r);
            }), o.dialogDisplayDelay);
        }
    }
    function ee() {
        if (!A) {
            if (T !== 0) {
                clearTimeout(T);
                T = 0;
            }
            D();
        }
    }
    function te(e, t) {
        e.onmousedown = e => {
            ne(e, t);
        };
        t.onmousemove = e => {
            le(e, true);
        };
        e.onmouseup = () => {
            oe();
        };
        e.oncontextmenu = () => {
            oe();
        };
        document.addEventListener("mousemove", le);
        document.addEventListener("mouseleave", ie);
    }
    function ne(e, t) {
        if (!M) {
            E = t;
            M = true;
            H = e.pageX - E.offsetLeft;
            P = e.pageY - E.offsetTop;
            N = E.offsetLeft;
            O = E.offsetTop;
        }
    }
    function oe() {
        if (M) {
            M = false;
            E = null;
            N = 0;
            O = 0;
        }
    }
    function le(e, t = false) {
        if (t) {
            n.cancelBubble(e);
        }
        if (M) {
            if (!A) {
                k();
            }
            A = true;
            E.style.left = `${e.pageX - H}px`;
            E.style.top = `${e.pageY - P}px`;
        }
    }
    function ie() {
        if (M) {
            E.style.left = `${N}px`;
            E.style.top = `${O}px`;
            M = false;
            E = null;
            N = 0;
            O = 0;
        }
    }
    const re = {
        start: function(t) {
            if (!e.definedObject(v)) {
                v = i.Options.get(t);
                C();
                Y();
            }
            return re;
        },
        stop: function() {
            if (e.definedObject(v)) {
                v = null;
                Q();
            }
            return re;
        },
        close: function() {
            D();
            return re;
        },
        setConfiguration: function(t) {
            if (e.definedObject(t)) {
                let n = false;
                const i = o;
                for (let e in t) {
                    if (t.hasOwnProperty(e) && o.hasOwnProperty(e) && i[e] !== t[e]) {
                        i[e] = t[e];
                        n = true;
                    }
                }
                if (n) {
                    o = l.Options.get(i);
                    W();
                    if (e.definedObject(v)) {
                        C();
                    }
                }
            }
            return re;
        },
        getVersion: function() {
            return "1.6.1";
        }
    };
    (() => {
        o = l.Options.get();
        document.addEventListener("DOMContentLoaded", (() => {
            W();
        }));
        if (!e.defined(window.$peek)) {
            window.$peek = re;
        }
    })();
})();//# sourceMappingURL=peek.esm.js.map