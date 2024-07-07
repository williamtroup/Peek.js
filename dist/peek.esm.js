var n;

(n => {
    function e(n) {
        return n !== null && n !== void 0 && n.toString() !== "";
    }
    n.defined = e;
    function t(n) {
        return e(n) && typeof n === "object";
    }
    n.definedObject = t;
    function o(n) {
        return e(n) && typeof n === "boolean";
    }
    n.definedBoolean = o;
    function r(n) {
        return e(n) && typeof n === "string";
    }
    n.definedString = r;
    function i(n) {
        return e(n) && typeof n === "function";
    }
    n.definedFunction = i;
    function u(n) {
        return e(n) && typeof n === "number";
    }
    n.definedNumber = u;
    function f(n) {
        return t(n) && n instanceof Array;
    }
    n.definedArray = f;
    function d(n) {
        return t(n) && n instanceof Date;
    }
    n.definedDate = d;
    function c(n, e = 1) {
        return !f(n) || n.length < e;
    }
    n.invalidOptionArray = c;
})(n || (n = {}));

(() => {
    const e = {
        destroy: function() {
            throw new Error("Function not implemented.");
        },
        start: function(n) {
            throw new Error("Function not implemented.");
        },
        stop: function() {
            throw new Error("Function not implemented.");
        },
        setConfiguration: function(n) {
            throw new Error("Function not implemented.");
        },
        getVersion: function() {
            return "1.0.0";
        }
    };
    (() => {
        if (!n.defined(window.$peek)) {
            window.$peek = e;
        }
    })();
})();//# sourceMappingURL=peek.esm.js.map