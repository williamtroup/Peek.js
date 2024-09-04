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
    function o(n, o, i = "", l = false) {
        const r = o.toLowerCase();
        const s = r === "text";
        let a = s ? document.createTextNode("") : document.createElement(r);
        a.setAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE, "ignore");
        if (e.definedString(i)) {
            a.className = i;
        }
        if (!l) {
            n.appendChild(a);
        } else {
            n.insertBefore(a, n.children[0]);
        }
        return a;
    }
    n.create = o;
    function i(e, n, i, l, r = false) {
        const s = o(e, n, i, r);
        s.innerHTML = l;
        s.setAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE, "ignore");
        return s;
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
    function s(e, t, n) {
        if (t.style.display !== "block") {
            let o = e.pageX;
            let i = e.pageY;
            const l = r();
            t.style.display = "block";
            if (o + t.offsetWidth > window.innerWidth) {
                o -= t.offsetWidth + n;
            } else {
                o++;
                o += n;
            }
            if (i + t.offsetHeight > window.innerHeight) {
                i -= t.offsetHeight + n;
            } else {
                i++;
                i += n;
            }
            if (o < l.left) {
                o = e.pageX + 1;
            }
            if (i < l.top) {
                i = e.pageY + 1;
            }
            t.style.left = `${o}px`;
            t.style.top = `${i}px`;
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
    function i(t, n) {
        return e.definedBoolean(t) ? t : n;
    }
    t.getBoolean = i;
    function l(t, n) {
        return e.definedNumber(t) ? t : n;
    }
    t.getNumber = l;
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

var i;

(e => {
    let t;
    (e => {
        function t(e = null) {
            let t = o.getObject(e, {});
            t.dialogShowDelay = o.getNumber(t.dialogShowDelay, 1e3);
            t.searchDelay = o.getNumber(t.searchDelay, 500);
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
            e.text.dialogMovedSymbolText = o.getAnyString(e.text.dialogMovedSymbolText, "✸");
            e.text.propertyValuePlaceHolderText = o.getAnyString(e.text.propertyValuePlaceHolderText, "Enter value...");
            e.text.modeNotSupportedText = o.getAnyString(e.text.modeNotSupportedText, "The mode you have specified is not supported.");
            e.text.unknownModeText = o.getAnyString(e.text.unknownModeText, "Unknown Mode");
            e.text.moveUpText = o.getAnyString(e.text.moveUpText, "Move Up");
            e.text.moveUpSymbolText = o.getAnyString(e.text.moveUpSymbolText, "↑");
            e.text.moveDownText = o.getAnyString(e.text.moveDownText, "Move Down");
            e.text.moveDownSymbolText = o.getAnyString(e.text.moveDownSymbolText, "↓");
            e.text.removeElementSymbolText = o.getAnyString(e.text.removeElementSymbolText, "⌫");
            e.text.lockText = o.getAnyString(e.text.lockText, "Lock");
            return e;
        }
    })(t = e.Options || (e.Options = {}));
})(i || (i = {}));

var l;

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
            t.ignoreValues = o.getStringOrArray(t.ignoreValues, []);
            t.showLockButtonInTitle = o.getBoolean(t.showLockButtonInTitle, true);
            t.dialogOffset = o.getNumber(t.dialogOffset, 0);
            return t;
        }
        e.get = t;
    })(t = e.Options || (e.Options = {}));
})(l || (l = {}));

(() => {
    let o = {};
    let r = null;
    let s = null;
    let a = null;
    let c = null;
    let f = null;
    let u = 0;
    let d = null;
    let p = null;
    let x = null;
    let g = null;
    let m = null;
    let y = null;
    let T = null;
    let v = 0;
    let b = null;
    let h = [];
    let S = {};
    let w = null;
    let A = false;
    let L = 0;
    let N = 0;
    let E = null;
    let O = 0;
    let M = 0;
    let H = false;
    let P = 0;
    let k = 0;
    function C() {
        if (e.definedObject(r)) {
            $();
            document.body.removeChild(r);
            r = null;
        }
        r = n.create(document.body, "div", "peek-js");
        r.onmousemove = n.cancelBubble;
        s = n.create(r, "div", "dialog-title-bar");
        c = n.create(r, "div", "dialog-search");
        d = n.create(r, "div", "dialog-contents");
        x = n.create(r, "div", "dialog-buttons");
        g = n.createWithHTML(x, "button", "copy", o.text.copyText);
        g.onclick = I;
        f = n.create(c, "input");
        f.placeholder = o.text.searchPropertiesPlaceHolderText;
        f.type = "text";
        f.onkeyup = j;
        f.onpaste = j;
        f.onfocus = () => f.select();
        const t = n.createWithHTML(c, "button", "clear-small", o.text.clearSymbolText);
        t.title = o.text.clearText;
        t.onclick = _;
        const i = n.createWithHTML(x, "button", "close", o.text.closeText);
        i.onclick = $;
        m = n.createWithHTML(x, "button", "remove", o.text.removeElementSymbolText);
        m.onclick = D;
        m.title = o.text.removeText;
        y = n.createWithHTML(x, "button", "move-up", o.text.moveUpSymbolText);
        y.onclick = R;
        y.title = o.text.moveUpText;
        T = n.createWithHTML(x, "button", "move-down", o.text.moveDownSymbolText);
        T.onclick = U;
        T.title = o.text.moveDownText;
        se(s, r);
    }
    function W(t = null) {
        if (!A && e.defined(b)) {
            let i = b.titleText;
            s.innerHTML = "";
            if (!e.definedString(i)) {
                if (b.mode === 1) {
                    i = o.text.cssText;
                } else if (b.mode === 2) {
                    i = o.text.attributesText;
                } else if (b.mode === 3) {
                    i = o.text.sizeText;
                } else if (b.mode === 4) {
                    i = o.text.classesText;
                } else {
                    i = o.text.unknownModeText;
                }
            }
            n.createWithHTML(s, "span", "title", i);
            if (L > 1 && b.showNodeNameInTitle) {
                n.createWithHTML(s, "span", "dash", " - ");
                n.createWithHTML(s, "span", "node-name", `[${t.nodeName.toLowerCase()}]`);
            }
            if (b.showIdOrNameInTitle && e.defined(t)) {
                const o = t.getAttribute("id");
                const i = t.getAttribute("name");
                if (e.definedString(o)) {
                    n.createWithHTML(s, "span", "dash", " - ");
                    n.createWithHTML(s, "span", "id-or-name", o);
                } else if (e.definedString(i)) {
                    n.createWithHTML(s, "span", "dash", " - ");
                    n.createWithHTML(s, "span", "id-or-name", i);
                }
            }
            if (b.showLockButtonInTitle) {
                a = n.createWithHTML(s, "button", "lock", o.text.dialogMovedSymbolText);
                a.title = o.text.lockText;
                a.onclick = () => B();
            }
        }
    }
    function B() {
        if (!A) {
            n.createWithHTML(s, "span", "locked", `${o.text.dialogMovedSymbolText}${" "}`, true);
            if (e.defined(a)) {
                a.parentNode.removeChild(a);
                a = null;
            }
            A = true;
        }
    }
    function $() {
        r.style.display = "none";
        A = false;
        f.value = "";
    }
    function I() {
        const e = [];
        for (let t in S) {
            if (S.hasOwnProperty(t)) {
                if (b.mode === 1) {
                    e.push(`${t}: ${S[t]};`);
                } else if (b.mode === 2) {
                    e.push(`${t}="${S[t]}"`);
                } else if (b.mode === 4) {
                    e.push(S[t]);
                }
            }
        }
        if (b.mode === 1) {
            navigator.clipboard.writeText(`${w.nodeName.toLowerCase()} { ${"\n"} ${e.join("\n")} ${"\n"} }`);
        } else if (b.mode === 2 || b.mode === 4) {
            navigator.clipboard.writeText(e.join(" "));
        }
    }
    function D() {
        w.parentNode.removeChild(w);
        $();
    }
    function j() {
        if (u !== 0) {
            clearTimeout(u);
            u = 0;
        }
        u = setTimeout((() => {
            const t = d.getElementsByClassName("property-name");
            const n = [].slice.call(t);
            const o = n.length;
            const i = f.value.toLowerCase();
            let l = 0;
            for (let t = 0; t < o; t++) {
                const o = n[t].parentNode;
                if (e.defined(o)) {
                    if (f.value.trim() === "") {
                        o.style.removeProperty("display");
                        l++;
                    } else {
                        const e = n[t].innerText;
                        if (e.toLowerCase().indexOf(i) > -1) {
                            o.style.removeProperty("display");
                            l++;
                        } else {
                            o.style.display = "none";
                        }
                    }
                }
            }
            if (l === 0) {
                p.style.display = "block";
            } else {
                p.style.removeProperty("display");
            }
        }), o.searchDelay);
    }
    function _() {
        f.value = "";
        f.focus();
        j();
    }
    function R() {
        if (w.parentNode !== null && w.previousElementSibling !== null) {
            w.parentNode.insertBefore(w, w.previousElementSibling);
        }
    }
    function U() {
        if (w.parentNode !== null && w.nextElementSibling !== null) {
            w.parentNode.insertBefore(w.nextElementSibling, w);
        }
    }
    function V(t) {
        if (e.defined(b)) {
            d.innerHTML = "";
            d.scrollTop = 0;
            S = {};
            N = 0;
            w = t;
            W(t);
            if (b.mode === 1 || b.mode === 4 || b.mode === 2) {
                g.style.removeProperty("display");
            } else {
                g.style.display = "none";
            }
            if (!b.allowEditing) {
                m.style.display = "none";
                y.style.display = "none";
                T.style.display = "none";
            } else {
                m.style.removeProperty("display");
                y.style.removeProperty("display");
                T.style.removeProperty("display");
            }
            p = n.createWithHTML(d, "span", "no-search-results", o.text.noPropertiesFoundForSearchText);
            if (b.mode === 1) {
                F(t);
            } else if (b.mode === 2) {
                z(t);
            } else if (b.mode === 3) {
                G(t);
            } else if (b.mode === 4) {
                J(t);
            } else {
                n.createWithHTML(d, "span", "warning", o.text.modeNotSupportedText);
            }
            if (N <= 15) {
                c.style.display = "none";
            } else {
                c.style.removeProperty("display");
            }
        }
    }
    function F(e) {
        const t = getComputedStyle(e);
        const n = t.length;
        for (let o = 0; o < n; o++) {
            K(e, t[o], t.getPropertyValue(t[o]));
        }
    }
    function z(e) {
        if (e.hasAttributes()) {
            for (let t of e.attributes) {
                K(e, t.name, t.value);
            }
        } else {
            d.innerHTML = "";
            n.createWithHTML(d, "span", "warning", o.text.noAttributesAvailableText);
        }
    }
    function G(e) {
        const t = n.getOffset(e);
        K(e, "left", `${t.left.toString()}px`, false);
        K(e, "top", `${t.top.toString()}px`, false);
        K(e, "width", `${e.offsetWidth.toString()}px`, false);
        K(e, "height", `${e.offsetHeight.toString()}px`, false);
    }
    function J(e) {
        if (e.classList.length > 0) {
            let t = 1;
            for (let n of e.classList) {
                K(e, t.toString(), n);
                t++;
            }
        } else {
            d.innerHTML = "";
            n.createWithHTML(d, "span", "warning", o.text.noClassesAvailableText);
        }
    }
    function K(t, i, l, r = true) {
        if (Z(i) && ee(l)) {
            const s = n.create(d, "div", "property-row");
            n.createWithHTML(s, "div", "property-name", i);
            const a = n.create(s, "div", "property-value");
            const c = n.create(a, "input");
            if (e.hexColor(l) || e.isRgbColor(l)) {
                c.classList.add("property-value-color");
                c.style.borderLeftColor = l;
            }
            c.placeholder = o.text.propertyValuePlaceHolderText;
            c.onfocus = () => c.select();
            const f = n.createWithHTML(s, "button", "copy-small", o.text.copySymbolText);
            f.title = o.text.copyText;
            f.onclick = () => navigator.clipboard.writeText(l);
            if (b.allowEditing && r) {
                const e = n.createWithHTML(s, "button", "paste-small", o.text.pasteSymbolText);
                const r = n.createWithHTML(s, "button", "remove-small", o.text.removeSymbolText);
                e.title = o.text.pasteText;
                r.title = o.text.removeText;
                e.onclick = () => X(t, c, i);
                r.onclick = () => Y(s, t, i, l);
            }
            c.type = "text";
            c.value = l;
            S[i] = l;
            N++;
            if (!b.allowEditing || !r) {
                c.readOnly = true;
            } else {
                c.onkeyup = e => q(e, i, c, t);
            }
        }
    }
    function X(e, t, n) {
        navigator.clipboard.readText().then((o => {
            t.value = o;
            Q(e, n, t);
        }));
    }
    function Y(e, t, n, o) {
        if (b.mode === 1) {
            t.style.removeProperty(n);
            e.parentNode.removeChild(e);
        } else if (b.mode === 2) {
            t.removeAttribute(n);
            e.parentNode.removeChild(e);
        } else if (b.mode === 4) {
            t.classList.remove(o);
            e.parentNode.removeChild(e);
        }
    }
    function q(e, t, n, o) {
        if (e.code === "Enter") {
            Q(o, t, n);
        }
    }
    function Q(t, n, o) {
        if (b.mode === 1) {
            t.style.setProperty(n, o.value);
        } else if (b.mode === 2) {
            t.setAttribute(n, o.value);
        } else if (b.mode === 4) {
            t.classList.replace(t.classList[parseInt(n) - 1], o.value);
        }
        S[n] = o.value;
        if (e.hexColor(o.value) || e.isRgbColor(o.value)) {
            o.classList.add("property-value-color");
            o.style.borderLeftColor = o.value;
        } else {
            o.classList.remove("property-value-color");
        }
    }
    function Z(e) {
        return b.showOnly.length === 0 || b.showOnly.indexOf(e) > -1;
    }
    function ee(e) {
        return b.ignoreValues.length === 0 || b.ignoreValues.indexOf(e) <= -1;
    }
    function te() {
        const e = b.nodeType;
        L = e.length;
        for (let t = 0; t < L; t++) {
            const n = document.getElementsByTagName(e[t]);
            const o = [].slice.call(n);
            const i = o.length;
            for (let e = 0; e < i; e++) {
                ne(o[e]);
            }
        }
        window.addEventListener("mousemove", le);
    }
    function ne(n) {
        const o = n.getAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE);
        if (!e.definedString(o) && o !== "ignore") {
            n.addEventListener("mousemove", (e => {
                ie(e, n);
            }));
            h.push(n);
        }
    }
    function oe() {
        const e = h.length;
        for (let t = 0; t < e; t++) {
            const e = h[t];
            e.removeEventListener("mousemove", (t => {
                ie(t, e);
            }));
        }
        h = [];
        window.removeEventListener("mousemove", le);
        $();
    }
    function ie(t, i) {
        if (!A && e.defined(b)) {
            n.cancelBubble(t);
            re();
            v = setTimeout((() => {
                V(i);
                n.showElementAtMousePosition(t, r, b.dialogOffset);
            }), o.dialogShowDelay);
        }
    }
    function le() {
        if (!A) {
            re();
            $();
        }
    }
    function re() {
        if (v !== 0) {
            clearTimeout(v);
            v = 0;
        }
    }
    function se(e, t) {
        e.onmousedown = e => {
            ae(e, t);
        };
        t.onmousemove = e => {
            fe(e, true);
        };
        e.onmouseup = () => {
            ce();
        };
        e.oncontextmenu = () => {
            ce();
        };
        document.addEventListener("mousemove", fe);
        document.addEventListener("mouseleave", ue);
    }
    function ae(e, t) {
        if (!H) {
            E = t;
            H = true;
            P = e.pageX - E.offsetLeft;
            k = e.pageY - E.offsetTop;
            O = E.offsetLeft;
            M = E.offsetTop;
        }
    }
    function ce() {
        if (H) {
            H = false;
            E = null;
            O = 0;
            M = 0;
        }
    }
    function fe(e, t = false) {
        if (t) {
            n.cancelBubble(e);
        }
        if (H) {
            B();
            E.style.left = `${e.pageX - P}px`;
            E.style.top = `${e.pageY - k}px`;
        }
    }
    function ue() {
        if (H) {
            E.style.left = `${O}px`;
            E.style.top = `${M}px`;
            H = false;
            E = null;
            O = 0;
            M = 0;
        }
    }
    const de = {
        start: function(t) {
            if (!e.definedObject(b)) {
                b = l.Options.get(t);
                W();
                te();
            }
            return de;
        },
        stop: function() {
            if (e.definedObject(b)) {
                b = null;
                re();
                oe();
            }
            return de;
        },
        close: function() {
            $();
            return de;
        },
        setConfiguration: function(t) {
            if (e.definedObject(t)) {
                let n = false;
                const l = o;
                for (let e in t) {
                    if (t.hasOwnProperty(e) && o.hasOwnProperty(e) && l[e] !== t[e]) {
                        l[e] = t[e];
                        n = true;
                    }
                }
                if (n) {
                    o = i.Options.get(l);
                    C();
                    if (e.definedObject(b)) {
                        W();
                    }
                }
            }
            return de;
        },
        getVersion: function() {
            return "1.8.0";
        }
    };
    (() => {
        o = i.Options.get();
        document.addEventListener("DOMContentLoaded", (() => {
            C();
        }));
        if (!e.defined(window.$peek)) {
            window.$peek = de;
        }
    })();
})();//# sourceMappingURL=peek.esm.js.map