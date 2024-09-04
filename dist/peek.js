"use strict";

var e;

(e => {
    function t(e) {
        return e !== null && e !== void 0 && e.toString() !== "";
    }
    e.defined = t;
    function o(e) {
        return t(e) && typeof e === "object";
    }
    e.definedObject = o;
    function n(e) {
        return t(e) && typeof e === "boolean";
    }
    e.definedBoolean = n;
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
        return o(e) && e instanceof Array;
    }
    e.definedArray = s;
    function a(e) {
        return o(e) && e instanceof Date;
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

var o;

(o => {
    function n(o, n, i = "", l = false) {
        const r = n.toLowerCase();
        const s = r === "text";
        let a = s ? document.createTextNode("") : document.createElement(r);
        a.setAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE, "ignore");
        if (e.definedString(i)) {
            a.className = i;
        }
        if (!l) {
            o.appendChild(a);
        } else {
            o.insertBefore(a, o.children[0]);
        }
        return a;
    }
    o.create = n;
    function i(e, o, i, l, r = false) {
        const s = n(e, o, i, r);
        s.innerHTML = l;
        s.setAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE, "ignore");
        return s;
    }
    o.createWithHTML = i;
    function l(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    o.cancelBubble = l;
    function r() {
        const e = document.documentElement;
        const t = {
            left: e.scrollLeft - (e.clientLeft || 0),
            top: e.scrollTop - (e.clientTop || 0)
        };
        return t;
    }
    o.getScrollPosition = r;
    function s(e, t, o) {
        if (t.style.display !== "block") {
            let n = e.pageX;
            let i = e.pageY;
            const l = r();
            t.style.display = "block";
            if (n + t.offsetWidth > window.innerWidth) {
                n -= t.offsetWidth + o;
            } else {
                n++;
                n += o;
            }
            if (i + t.offsetHeight > window.innerHeight) {
                i -= t.offsetHeight + o;
            } else {
                i++;
                i += o;
            }
            if (n < l.left) {
                n = e.pageX + 1;
            }
            if (i < l.top) {
                i = e.pageY + 1;
            }
            t.style.left = `${n}px`;
            t.style.top = `${i}px`;
        }
    }
    o.showElementAtMousePosition = s;
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
    o.getOffset = a;
})(o || (o = {}));

var n;

(t => {
    function o(e, t) {
        return typeof e === "string" ? e : t;
    }
    t.getAnyString = o;
    function n(t, o) {
        return e.definedString(t) ? t : o;
    }
    t.getString = n;
    function i(t, o) {
        return e.definedBoolean(t) ? t : o;
    }
    t.getBoolean = i;
    function l(t, o) {
        return e.definedNumber(t) ? t : o;
    }
    t.getNumber = l;
    function r(t, o) {
        return e.definedArray(t) ? t : o;
    }
    t.getArray = r;
    function s(t, o) {
        return e.definedObject(t) ? t : o;
    }
    t.getObject = s;
    function a(t, o) {
        let n = o;
        if (e.definedString(t)) {
            const e = t.toString().split(" ");
            if (e.length === 0) {
                t = o;
            } else {
                n = e;
            }
        } else {
            n = r(t, o);
        }
        return n;
    }
    t.getStringOrArray = a;
})(n || (n = {}));

var i;

(e => {
    let t;
    (e => {
        function t(e = null) {
            let t = n.getObject(e, {});
            t.dialogShowDelay = n.getNumber(t.dialogShowDelay, 1e3);
            t.dialogHideDelay = n.getNumber(t.dialogHideDelay, 500);
            t.searchDelay = n.getNumber(t.searchDelay, 500);
            t = o(t);
            return t;
        }
        e.get = t;
        function o(e) {
            e.text = n.getObject(e.text, {});
            e.text.cssText = n.getAnyString(e.text.cssText, "CSS");
            e.text.attributesText = n.getAnyString(e.text.attributesText, "Attributes");
            e.text.sizeText = n.getAnyString(e.text.sizeText, "Size");
            e.text.classesText = n.getAnyString(e.text.classesText, "Classes");
            e.text.noAttributesAvailableText = n.getAnyString(e.text.noAttributesAvailableText, "No attributes are available.");
            e.text.closeText = n.getAnyString(e.text.closeText, "Close");
            e.text.copyText = n.getAnyString(e.text.copyText, "Copy");
            e.text.copySymbolText = n.getAnyString(e.text.copySymbolText, "❐");
            e.text.pasteText = n.getAnyString(e.text.pasteText, "Paste");
            e.text.pasteSymbolText = n.getAnyString(e.text.pasteSymbolText, "☐");
            e.text.removeText = n.getAnyString(e.text.removeText, "Remove");
            e.text.removeSymbolText = n.getAnyString(e.text.removeSymbolText, "✕");
            e.text.noClassesAvailableText = n.getAnyString(e.text.noClassesAvailableText, "No classes are available.");
            e.text.searchPropertiesPlaceHolderText = n.getAnyString(e.text.searchPropertiesPlaceHolderText, "Search properties...");
            e.text.clearText = n.getAnyString(e.text.clearText, "Clear");
            e.text.clearSymbolText = n.getAnyString(e.text.clearSymbolText, "✕");
            e.text.noPropertiesFoundForSearchText = n.getAnyString(e.text.noPropertiesFoundForSearchText, "No properties were found for your search.");
            e.text.dialogMovedSymbolText = n.getAnyString(e.text.dialogMovedSymbolText, "✸");
            e.text.propertyValuePlaceHolderText = n.getAnyString(e.text.propertyValuePlaceHolderText, "Enter value...");
            e.text.modeNotSupportedText = n.getAnyString(e.text.modeNotSupportedText, "The mode you have specified is not supported.");
            e.text.unknownModeText = n.getAnyString(e.text.unknownModeText, "Unknown Mode");
            e.text.moveUpText = n.getAnyString(e.text.moveUpText, "Move Up");
            e.text.moveUpSymbolText = n.getAnyString(e.text.moveUpSymbolText, "↑");
            e.text.moveDownText = n.getAnyString(e.text.moveDownText, "Move Down");
            e.text.moveDownSymbolText = n.getAnyString(e.text.moveDownSymbolText, "↓");
            e.text.removeElementSymbolText = n.getAnyString(e.text.removeElementSymbolText, "⌫");
            e.text.lockText = n.getAnyString(e.text.lockText, "Lock");
            return e;
        }
    })(t = e.Options || (e.Options = {}));
})(i || (i = {}));

var l;

(e => {
    let t;
    (e => {
        function t(e) {
            let t = n.getObject(e, {});
            t.nodeType = n.getStringOrArray(t.nodeType, []);
            t.mode = n.getNumber(t.mode, 1);
            t.titleText = n.getString(t.titleText, "");
            t.showOnly = n.getStringOrArray(t.showOnly, []);
            t.allowEditing = n.getBoolean(t.allowEditing, false);
            t.showIdOrNameInTitle = n.getBoolean(t.showIdOrNameInTitle, true);
            t.showNodeNameInTitle = n.getBoolean(t.showNodeNameInTitle, false);
            t.ignoreValues = n.getStringOrArray(t.ignoreValues, []);
            t.showLockButtonInTitle = n.getBoolean(t.showLockButtonInTitle, true);
            t.dialogOffset = n.getNumber(t.dialogOffset, 0);
            t.showSearch = n.getBoolean(t.showSearch, true);
            t.showSearchPropertyCount = n.getNumber(t.showSearchPropertyCount, 15);
            return t;
        }
        e.get = t;
    })(t = e.Options || (e.Options = {}));
})(l || (l = {}));

(() => {
    let n = {};
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
    let h = 0;
    let v = 0;
    let b = null;
    let S = [];
    let w = {};
    let A = null;
    let L = false;
    let N = 0;
    let E = 0;
    let O = null;
    let H = 0;
    let M = 0;
    let P = false;
    let C = 0;
    let k = 0;
    function W() {
        if (e.definedObject(r)) {
            I();
            document.body.removeChild(r);
            r = null;
        }
        r = o.create(document.body, "div", "peek-js");
        r.onmousemove = o.cancelBubble;
        s = o.create(r, "div", "dialog-title-bar");
        c = o.create(r, "div", "dialog-search");
        d = o.create(r, "div", "dialog-contents");
        x = o.create(r, "div", "dialog-buttons");
        g = o.createWithHTML(x, "button", "copy", n.text.copyText);
        g.onclick = D;
        f = o.create(c, "input");
        f.placeholder = n.text.searchPropertiesPlaceHolderText;
        f.type = "text";
        f.onkeyup = _;
        f.onpaste = _;
        f.onfocus = () => f.select();
        const t = o.createWithHTML(c, "button", "clear-small", n.text.clearSymbolText);
        t.title = n.text.clearText;
        t.onclick = R;
        const i = o.createWithHTML(x, "button", "close", n.text.closeText);
        i.onclick = () => I();
        m = o.createWithHTML(x, "button", "remove", n.text.removeElementSymbolText);
        m.onclick = j;
        m.title = n.text.removeText;
        y = o.createWithHTML(x, "button", "move-up", n.text.moveUpSymbolText);
        y.onclick = U;
        y.title = n.text.moveUpText;
        T = o.createWithHTML(x, "button", "move-down", n.text.moveDownSymbolText);
        T.onclick = V;
        T.title = n.text.moveDownText;
        ce(s, r);
    }
    function B(t = null) {
        if (!L && e.defined(b)) {
            let i = b.titleText;
            s.innerHTML = "";
            if (!e.definedString(i)) {
                if (b.mode === 1) {
                    i = n.text.cssText;
                } else if (b.mode === 2) {
                    i = n.text.attributesText;
                } else if (b.mode === 3) {
                    i = n.text.sizeText;
                } else if (b.mode === 4) {
                    i = n.text.classesText;
                } else {
                    i = n.text.unknownModeText;
                }
            }
            o.createWithHTML(s, "span", "title", i);
            if (N > 1 && b.showNodeNameInTitle) {
                o.createWithHTML(s, "span", "dash", " - ");
                o.createWithHTML(s, "span", "node-name", `[${t.nodeName.toLowerCase()}]`);
            }
            if (b.showIdOrNameInTitle && e.defined(t)) {
                const n = t.getAttribute("id");
                const i = t.getAttribute("name");
                if (e.definedString(n)) {
                    o.createWithHTML(s, "span", "dash", " - ");
                    o.createWithHTML(s, "span", "id-or-name", n);
                } else if (e.definedString(i)) {
                    o.createWithHTML(s, "span", "dash", " - ");
                    o.createWithHTML(s, "span", "id-or-name", i);
                }
            }
            if (b.showLockButtonInTitle) {
                a = o.createWithHTML(s, "button", "lock", n.text.dialogMovedSymbolText);
                a.title = n.text.lockText;
                a.onclick = () => $();
            }
        }
    }
    function $() {
        if (!L) {
            o.createWithHTML(s, "span", "locked", `${n.text.dialogMovedSymbolText}${" "}`, true);
            if (e.defined(a)) {
                a.parentNode.removeChild(a);
                a = null;
            }
            L = true;
        }
    }
    function I(e = false) {
        if (r.style.display !== "none") {
            const t = () => {
                r.style.display = "none";
                L = false;
                f.value = "";
                ae();
            };
            if (e) {
                if (v === 0) {
                    se();
                    v = setTimeout((() => {
                        t();
                    }), n.dialogHideDelay);
                }
            } else {
                t();
            }
        }
    }
    function D() {
        const e = [];
        for (let t in w) {
            if (w.hasOwnProperty(t)) {
                if (b.mode === 1) {
                    e.push(`${t}: ${w[t]};`);
                } else if (b.mode === 2) {
                    e.push(`${t}="${w[t]}"`);
                } else if (b.mode === 4) {
                    e.push(w[t]);
                }
            }
        }
        if (b.mode === 1) {
            navigator.clipboard.writeText(`${A.nodeName.toLowerCase()} { ${"\n"} ${e.join("\n")} ${"\n"} }`);
        } else if (b.mode === 2 || b.mode === 4) {
            navigator.clipboard.writeText(e.join(" "));
        }
    }
    function j() {
        A.parentNode.removeChild(A);
        I();
    }
    function _() {
        if (u !== 0) {
            clearTimeout(u);
            u = 0;
        }
        u = setTimeout((() => {
            const t = d.getElementsByClassName("property-name");
            const o = [].slice.call(t);
            const n = o.length;
            const i = f.value.toLowerCase();
            let l = 0;
            for (let t = 0; t < n; t++) {
                const n = o[t].parentNode;
                if (e.defined(n)) {
                    if (f.value.trim() === "") {
                        n.style.removeProperty("display");
                        l++;
                    } else {
                        const e = o[t].innerText;
                        if (e.toLowerCase().indexOf(i) > -1) {
                            n.style.removeProperty("display");
                            l++;
                        } else {
                            n.style.display = "none";
                        }
                    }
                }
            }
            if (l === 0) {
                p.style.display = "block";
            } else {
                p.style.removeProperty("display");
            }
        }), n.searchDelay);
    }
    function R() {
        f.value = "";
        f.focus();
        _();
    }
    function U() {
        if (A.parentNode !== null && A.previousElementSibling !== null) {
            A.parentNode.insertBefore(A, A.previousElementSibling);
        }
    }
    function V() {
        if (A.parentNode !== null && A.nextElementSibling !== null) {
            A.parentNode.insertBefore(A.nextElementSibling, A);
        }
    }
    function F(t) {
        if (e.defined(b)) {
            d.innerHTML = "";
            d.scrollTop = 0;
            w = {};
            E = 0;
            A = t;
            B(t);
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
            p = o.createWithHTML(d, "span", "no-search-results", n.text.noPropertiesFoundForSearchText);
            if (b.mode === 1) {
                z(t);
            } else if (b.mode === 2) {
                G(t);
            } else if (b.mode === 3) {
                J(t);
            } else if (b.mode === 4) {
                K(t);
            } else {
                o.createWithHTML(d, "span", "warning", n.text.modeNotSupportedText);
            }
            if (E <= b.showSearchPropertyCount || !b.showSearch) {
                c.style.display = "none";
            } else {
                c.style.removeProperty("display");
            }
        }
    }
    function z(e) {
        const t = getComputedStyle(e);
        const o = t.length;
        for (let n = 0; n < o; n++) {
            X(e, t[n], t.getPropertyValue(t[n]));
        }
    }
    function G(e) {
        if (e.hasAttributes()) {
            for (let t of e.attributes) {
                X(e, t.name, t.value);
            }
        } else {
            d.innerHTML = "";
            o.createWithHTML(d, "span", "warning", n.text.noAttributesAvailableText);
        }
    }
    function J(e) {
        const t = o.getOffset(e);
        X(e, "left", `${t.left.toString()}px`, false);
        X(e, "top", `${t.top.toString()}px`, false);
        X(e, "width", `${e.offsetWidth.toString()}px`, false);
        X(e, "height", `${e.offsetHeight.toString()}px`, false);
    }
    function K(e) {
        if (e.classList.length > 0) {
            let t = 1;
            for (let o of e.classList) {
                X(e, t.toString(), o);
                t++;
            }
        } else {
            d.innerHTML = "";
            o.createWithHTML(d, "span", "warning", n.text.noClassesAvailableText);
        }
    }
    function X(t, i, l, r = true) {
        if (ee(i) && te(l)) {
            const s = o.create(d, "div", "property-row");
            o.createWithHTML(s, "div", "property-name", i);
            const a = o.create(s, "div", "property-value");
            const c = o.create(a, "input");
            if (e.hexColor(l) || e.isRgbColor(l)) {
                c.classList.add("property-value-color");
                c.style.borderLeftColor = l;
            }
            c.placeholder = n.text.propertyValuePlaceHolderText;
            c.onfocus = () => c.select();
            const f = o.createWithHTML(s, "button", "copy-small", n.text.copySymbolText);
            f.title = n.text.copyText;
            f.onclick = () => navigator.clipboard.writeText(l);
            if (b.allowEditing && r) {
                const e = o.createWithHTML(s, "button", "paste-small", n.text.pasteSymbolText);
                const r = o.createWithHTML(s, "button", "remove-small", n.text.removeSymbolText);
                e.title = n.text.pasteText;
                r.title = n.text.removeText;
                e.onclick = () => Y(t, c, i);
                r.onclick = () => q(s, t, i, l);
            }
            c.type = "text";
            c.value = l;
            w[i] = l;
            E++;
            if (!b.allowEditing || !r) {
                c.readOnly = true;
            } else {
                c.onkeyup = e => Q(e, i, c, t);
            }
        }
    }
    function Y(e, t, o) {
        navigator.clipboard.readText().then((n => {
            t.value = n;
            Z(e, o, t);
        }));
    }
    function q(e, t, o, n) {
        if (b.mode === 1) {
            t.style.removeProperty(o);
            e.parentNode.removeChild(e);
        } else if (b.mode === 2) {
            t.removeAttribute(o);
            e.parentNode.removeChild(e);
        } else if (b.mode === 4) {
            t.classList.remove(n);
            e.parentNode.removeChild(e);
        }
    }
    function Q(e, t, o, n) {
        if (e.code === "Enter") {
            Z(n, t, o);
        }
    }
    function Z(t, o, n) {
        if (b.mode === 1) {
            t.style.setProperty(o, n.value);
        } else if (b.mode === 2) {
            t.setAttribute(o, n.value);
        } else if (b.mode === 4) {
            t.classList.replace(t.classList[parseInt(o) - 1], n.value);
        }
        w[o] = n.value;
        if (e.hexColor(n.value) || e.isRgbColor(n.value)) {
            n.classList.add("property-value-color");
            n.style.borderLeftColor = n.value;
        } else {
            n.classList.remove("property-value-color");
        }
    }
    function ee(e) {
        return b.showOnly.length === 0 || b.showOnly.indexOf(e) > -1;
    }
    function te(e) {
        return b.ignoreValues.length === 0 || b.ignoreValues.indexOf(e) <= -1;
    }
    function oe() {
        const e = b.nodeType;
        N = e.length;
        for (let t = 0; t < N; t++) {
            const o = document.getElementsByTagName(e[t]);
            const n = [].slice.call(o);
            const i = n.length;
            for (let e = 0; e < i; e++) {
                ne(n[e]);
            }
        }
        window.addEventListener("mousemove", re);
    }
    function ne(o) {
        const n = o.getAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE);
        if (!e.definedString(n) && n !== "ignore") {
            o.addEventListener("mousemove", (e => {
                le(e, o);
            }));
            S.push(o);
        }
    }
    function ie() {
        const e = S.length;
        for (let t = 0; t < e; t++) {
            const e = S[t];
            e.removeEventListener("mousemove", (t => {
                le(t, e);
            }));
        }
        S = [];
        window.removeEventListener("mousemove", re);
        I();
    }
    function le(t, i) {
        if (!L && e.defined(b)) {
            o.cancelBubble(t);
            se();
            h = setTimeout((() => {
                F(i);
                ae();
                o.showElementAtMousePosition(t, r, b.dialogOffset);
            }), n.dialogShowDelay);
        }
    }
    function re() {
        if (!L) {
            se();
            I(true);
        }
    }
    function se() {
        if (h !== 0) {
            clearTimeout(h);
            h = 0;
        }
    }
    function ae() {
        if (v !== 0) {
            clearTimeout(v);
            v = 0;
        }
    }
    function ce(e, t) {
        e.onmousedown = e => {
            fe(e, t);
        };
        t.onmousemove = e => {
            de(e, true);
        };
        e.onmouseup = () => {
            ue();
        };
        e.oncontextmenu = () => {
            ue();
        };
        document.addEventListener("mousemove", de);
        document.addEventListener("mouseleave", pe);
    }
    function fe(e, t) {
        if (!P) {
            O = t;
            P = true;
            C = e.pageX - O.offsetLeft;
            k = e.pageY - O.offsetTop;
            H = O.offsetLeft;
            M = O.offsetTop;
        }
    }
    function ue() {
        if (P) {
            P = false;
            O = null;
            H = 0;
            M = 0;
        }
    }
    function de(e, t = false) {
        if (t) {
            o.cancelBubble(e);
        }
        if (P) {
            $();
            O.style.left = `${e.pageX - C}px`;
            O.style.top = `${e.pageY - k}px`;
        }
    }
    function pe() {
        if (P) {
            O.style.left = `${H}px`;
            O.style.top = `${M}px`;
            P = false;
            O = null;
            H = 0;
            M = 0;
        }
    }
    const xe = {
        start: function(t) {
            if (!e.definedObject(b)) {
                b = l.Options.get(t);
                B();
                oe();
            }
            return xe;
        },
        stop: function() {
            if (e.definedObject(b)) {
                b = null;
                se();
                ie();
            }
            return xe;
        },
        close: function() {
            I();
            return xe;
        },
        setConfiguration: function(t) {
            if (e.definedObject(t)) {
                let o = false;
                const l = n;
                for (let e in t) {
                    if (t.hasOwnProperty(e) && n.hasOwnProperty(e) && l[e] !== t[e]) {
                        l[e] = t[e];
                        o = true;
                    }
                }
                if (o) {
                    n = i.Options.get(l);
                    W();
                    if (e.definedObject(b)) {
                        B();
                    }
                }
            }
            return xe;
        },
        getVersion: function() {
            return "1.8.0";
        }
    };
    (() => {
        n = i.Options.get();
        document.addEventListener("DOMContentLoaded", (() => {
            W();
        }));
        if (!e.defined(window.$peek)) {
            window.$peek = xe;
        }
    })();
})();//# sourceMappingURL=peek.js.map