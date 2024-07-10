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
    function r(e) {
        return t(e) && typeof e === "function";
    }
    e.definedFunction = r;
    function l(e) {
        return t(e) && typeof e === "number";
    }
    e.definedNumber = l;
    function f(e) {
        return n(e) && e instanceof Array;
    }
    e.definedArray = f;
    function s(e) {
        return n(e) && e instanceof Date;
    }
    e.definedDate = s;
    function a(e, t = 1) {
        return !f(e) || e.length < t;
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
        const r = o.toLowerCase();
        const l = r === "text";
        let f = l ? document.createTextNode("") : document.createElement(r);
        f.setAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE, "ignore");
        if (e.defined(i)) {
            f.className = i;
        }
        n.appendChild(f);
        return f;
    }
    n.create = o;
    function i(e, n, i, r) {
        const l = o(e, n, i);
        l.innerHTML = r;
        l.setAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE, "ignore");
        return l;
    }
    n.createWithHTML = i;
    function r(e) {
        e.preventDefault();
        e.cancelBubble = true;
    }
    n.cancelBubble = r;
    function l() {
        const e = document.documentElement;
        const t = {
            left: e.scrollLeft - (e.clientLeft || 0),
            top: e.scrollTop - (e.clientTop || 0)
        };
        return t;
    }
    n.getScrollPosition = l;
    function f(e, t) {
        if (t.style.display !== "block") {
            let n = e.pageX;
            let o = e.pageY;
            const i = l();
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
    n.showElementAtMousePosition = f;
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
    function i(t, n) {
        return e.definedBoolean(t) ? t : n;
    }
    t.getDefaultBoolean = i;
    function r(t, n) {
        return e.definedNumber(t) ? t : n;
    }
    t.getDefaultNumber = r;
    function l(t, n) {
        return e.definedArray(t) ? t : n;
    }
    t.getDefaultArray = l;
    function f(t, n) {
        return e.definedObject(t) ? t : n;
    }
    t.getDefaultObject = f;
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
            o = l(t, n);
        }
        return o;
    }
    t.getDefaultStringOrArray = s;
})(o || (o = {}));

(() => {
    let i = {};
    let r = null;
    let l = null;
    let f = null;
    let s = null;
    let a = null;
    let u = 0;
    let c = null;
    let d = [];
    let g = {};
    let p = null;
    function y() {
        if (e.definedObject(r)) {
            m();
            document.body.removeChild(r);
            r = null;
        }
        r = n.create(document.body, "div", "peek-js");
        r.onmousemove = n.cancelBubble;
        l = n.create(r, "div", "dialog-title-bar");
        f = n.create(r, "div", "dialog-contents");
        s = n.create(r, "div", "dialog-buttons");
        a = n.createWithHTML(s, "button", "copy", i.copyText);
        a.onclick = b;
        const t = n.createWithHTML(s, "button", "close", i.closeText);
        t.onclick = m;
    }
    function T() {
        let t = c.titleText;
        if (!e.definedString(t)) {
            if (c.mode === 1) {
                t = i.cssPropertiesText;
            } else if (c.mode === 2) {
                t = i.attributesText;
            } else if (c.mode === 3) {
                t = i.sizeText;
            }
        }
        l.innerHTML = t;
    }
    function m() {
        r.style.display = "none";
    }
    function b() {
        const e = [];
        for (let t in g) {
            if (g.hasOwnProperty(t)) {
                if (c.mode === 1) {
                    e.push(`${t}: ${g[t]};`);
                } else if (c.mode === 2) {
                    e.push(`${t}="${g[t]}"`);
                }
            }
        }
        if (c.mode === 1) {
            navigator.clipboard.writeText(`${p.nodeName.toLowerCase()} { ${"\n"} ${e.join("\n")} ${"\n"} }`);
        } else if (c.mode === 2) {
            navigator.clipboard.writeText(e.join(" "));
        }
    }
    function v(e) {
        f.innerHTML = "";
        f.scrollTop = 0;
        g = {};
        p = e;
        if (c.mode === 3) {
            a.style.display = "none";
        } else {
            a.style.removeProperty("display");
        }
        if (c.mode === 1) {
            x(e);
        } else if (c.mode === 2) {
            S(e);
        } else if (c.mode === 3) {
            h(e);
        }
    }
    function x(e) {
        const t = getComputedStyle(e);
        const n = t.length;
        for (let o = 0; o < n; o++) {
            A(e, t[o], t.getPropertyValue(t[o]));
        }
    }
    function S(e) {
        if (e.hasAttributes()) {
            for (let t of e.attributes) {
                A(e, t.name, t.value);
            }
        } else {
            f.innerHTML = i.noAttributesAvailableText;
        }
    }
    function h(e) {
        const t = n.getOffset(e);
        A(e, "left", t.left.toString() + "px", false);
        A(e, "top", t.top.toString() + "px", false);
        A(e, "width", e.offsetWidth.toString() + "px", false);
        A(e, "height", e.offsetHeight.toString() + "px", false);
    }
    function A(e, t, o, r = true) {
        if (c.showOnly.length === 0 || c.showOnly.indexOf(t) > -1) {
            const l = n.create(f, "div", "property-row");
            n.createWithHTML(l, "div", "property-name", t);
            const s = n.create(l, "div", "property-value");
            const a = n.create(s, "input");
            if (c.mode !== 3) {
                const r = n.createWithHTML(l, "button", "copy", i.copySymbolText);
                const s = n.createWithHTML(l, "button", "paste", i.pasteSymbolText);
                const u = n.createWithHTML(l, "button", "remove", i.removeSymbolText);
                r.title = i.copyText;
                s.title = i.pasteText;
                u.title = i.removeText;
                r.onclick = () => {
                    navigator.clipboard.writeText(o);
                };
                s.onclick = () => {
                    navigator.clipboard.readText().then((e => {
                        a.value = e;
                    }));
                };
                u.onclick = () => {
                    if (c.mode === 1) {
                        e.style.removeProperty(t);
                    } else if (c.mode === 2) {
                        e.removeAttribute(t);
                    }
                    f.removeChild(l);
                };
            }
            a.type = "text";
            a.value = o;
            g[t] = o;
            if (!c.allowEditing || !r) {
                a.readOnly = true;
            } else {
                a.onkeyup = n => {
                    D(n, t, a, e);
                };
            }
        }
    }
    function D(e, t, n, o) {
        if (e.code === "Enter") {
            if (c.mode === 1) {
                o.style.setProperty(t, n.value);
            } else if (c.mode === 2) {
                o.setAttribute(t, n.value);
            }
        }
    }
    function E() {
        const e = c.nodeType;
        const t = e.length;
        for (let n = 0; n < t; n++) {
            const t = document.getElementsByTagName(e[n]);
            const o = [].slice.call(t);
            const i = o.length;
            for (let e = 0; e < i; e++) {
                w(o[e]);
            }
        }
        window.addEventListener("mousemove", m);
    }
    function w(n) {
        const o = n.getAttribute(t.PEEK_JS_IGNORE_STATE_ATTRIBUTE);
        if (!e.definedString(o)) {
            n.addEventListener("mousemove", (e => {
                L(e, n);
            }));
            d.push(n);
        }
    }
    function O() {
        const e = d.length;
        for (let n = 0; n < e; n++) {
            var t = d[n];
            t.removeEventListener("mousemove", (e => {
                L(e, t);
            }));
        }
        d = [];
        window.removeEventListener("mousemove", m);
        m();
    }
    function L(e, t) {
        n.cancelBubble(e);
        if (u !== 0) {
            clearTimeout(u);
            u = 0;
        }
        u = setTimeout((() => {
            v(t);
            n.showElementAtMousePosition(e, r);
        }), i.dialogDisplayDelay);
    }
    function P(e) {
        let t = o.getDefaultObject(e, {});
        t.nodeType = o.getDefaultStringOrArray(t.nodeType, []);
        t.mode = o.getDefaultNumber(t.mode, 1);
        t.titleText = o.getDefaultString(t.titleText, "");
        t.showOnly = o.getDefaultStringOrArray(t.showOnly, []);
        t.allowEditing = o.getDefaultBoolean(t.allowEditing, false);
        return t;
    }
    function N(e = null) {
        i = o.getDefaultObject(e, {});
        i.dialogDisplayDelay = o.getDefaultNumber(i.dialogDisplayDelay, 1e3);
        _();
    }
    function _() {
        i.cssPropertiesText = o.getDefaultAnyString(i.cssPropertiesText, "CSS Properties");
        i.attributesText = o.getDefaultAnyString(i.attributesText, "Attributes");
        i.sizeText = o.getDefaultAnyString(i.sizeText, "Size");
        i.noAttributesAvailableText = o.getDefaultAnyString(i.noAttributesAvailableText, "No attributes are available.");
        i.closeText = o.getDefaultAnyString(i.closeText, "Close");
        i.copyText = o.getDefaultAnyString(i.copyText, "Copy");
        i.copySymbolText = o.getDefaultAnyString(i.copySymbolText, "❐");
        i.pasteText = o.getDefaultAnyString(i.pasteText, "Paste");
        i.pasteSymbolText = o.getDefaultAnyString(i.pasteSymbolText, "☐");
        i.removeText = o.getDefaultAnyString(i.removeText, "Remove");
        i.removeSymbolText = o.getDefaultAnyString(i.removeSymbolText, "✕");
    }
    const j = {
        start: function(t) {
            if (!e.definedObject(c)) {
                c = P(t);
                T();
                E();
            }
            return j;
        },
        stop: function() {
            if (e.definedObject(c)) {
                c = null;
                O();
            }
            return j;
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
                    N(o);
                    y();
                    if (e.definedObject(c)) {
                        T();
                    }
                }
            }
            return j;
        },
        getVersion: function() {
            return "1.2.1";
        }
    };
    (() => {
        N();
        document.addEventListener("DOMContentLoaded", (() => {
            y();
        }));
        if (!e.defined(window.$peek)) {
            window.$peek = j;
        }
    })();
})();//# sourceMappingURL=peek.esm.js.map