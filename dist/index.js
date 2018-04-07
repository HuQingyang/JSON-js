(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("big-json-parser", [], factory);
	else if(typeof exports === 'object')
		exports["big-json-parser"] = factory();
	else
		root["big-json-parser"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var at = void 0; // The index of the current character
var ch = void 0; // The current character
var text = void 0;

var escapee = {
    "\"": "\"",
    "\\": "\\",
    "/": "/",
    b: "\b",
    f: "\f",
    n: "\n",
    r: "\r",
    t: "\t"
};
var typesMap = {
    STRING: 'string',
    FLOAT: 'float',
    INT: 'int',
    BOOLEAN: 'boolean',
    NULL: 'null',
    MESSAGE: 'message'
};
var labelsMap = {
    REPEATED: 'REPEATED',
    OPTIONAL: 'OPTIONAL'
};

var error = function error(m) {
    throw {
        name: "SyntaxError",
        message: m,
        at: at,
        text: text
    };
};

var next = function next(c) {
    if (c && c !== ch) {
        error("Expected '" + c + "' instead of '" + ch + "'");
    }
    ch = text.charAt(at);
    at += 1;
    return ch;
};

var number = function number() {
    var value = void 0;
    var string = "";

    if (ch === "-") {
        string = "-";
        next("-");
    }
    while (ch >= "0" && ch <= "9") {
        string += ch;
        next();
    }
    if (ch === ".") {
        string += ".";
        while (next() && ch >= "0" && ch <= "9") {
            string += ch;
        }
    }
    if (ch === "e" || ch === "E") {
        string += ch;
        next();
        if (ch === "-" || ch === "+") {
            string += ch;
            next();
        }
        while (ch >= "0" && ch <= "9") {
            string += ch;
            next();
        }
    }
    value = string;
    if (!isFinite(+value)) {
        error("Bad number");
    } else {
        return {
            type: ("" + value).indexOf('.') > 0 ? typesMap.FLOAT : typesMap.INT,
            value: "" + value,
            label: labelsMap.OPTIONAL
        };
    }
};

var string = function string() {
    var hex = void 0;
    var i = void 0;
    var value = "";
    var uffff = void 0;

    if (ch === "\"") {
        while (next()) {
            if (ch === "\"") {
                next();
                return {
                    type: typesMap.STRING,
                    label: labelsMap.OPTIONAL,
                    value: value
                };
            }
            if (ch === "\\") {
                next();
                if (ch === "u") {
                    uffff = 0;
                    for (i = 0; i < 4; i += 1) {
                        hex = parseInt(next(), 16);
                        if (!isFinite(hex)) {
                            break;
                        }
                        uffff = uffff * 16 + hex;
                    }
                    value += String.fromCharCode(uffff);
                } else if (typeof escapee[ch] === "string") {
                    value += escapee[ch];
                } else {
                    break;
                }
            } else {
                value += ch;
            }
        }
    }
    error("Bad string");
};

var keyString = function keyString() {
    var hex = void 0;
    var i = void 0;
    var value = "";
    var uffff = void 0;

    if (ch === "\"") {
        while (next()) {
            if (ch === "\"") {
                next();
                return value;
            }
            if (ch === "\\") {
                next();
                if (ch === "u") {
                    uffff = 0;
                    for (i = 0; i < 4; i += 1) {
                        hex = parseInt(next(), 16);
                        if (!isFinite(hex)) {
                            break;
                        }
                        uffff = uffff * 16 + hex;
                    }
                    value += String.fromCharCode(uffff);
                } else if (typeof escapee[ch] === "string") {
                    value += escapee[ch];
                } else {
                    break;
                }
            } else {
                value += ch;
            }
        }
    }
    error("Bad string");
};

var white = function white() {
    while (ch && ch <= " ") {
        next();
    }
};

var word = function word() {
    switch (ch) {
        case "t":
            next("t");
            next("r");
            next("u");
            next("e");
            return {
                type: typesMap.BOOLEAN,
                label: labelsMap.OPTIONAL,
                value: true
            };
        case "f":
            next("f");
            next("a");
            next("l");
            next("s");
            next("e");
            return {
                type: typesMap.BOOLEAN,
                label: labelsMap.OPTIONAL,
                value: false
            };
        case "n":
            next("n");
            next("u");
            next("l");
            next("l");
            return {
                type: typesMap.NULL,
                label: labelsMap.OPTIONAL,
                value: null
            };
    }
    error("Unexpected '" + ch + "'");
};

var value = void 0;

var array = function array() {
    var arr = [];
    if (ch === "[") {
        next("[");
        white();
        if (ch === "]") {
            next("]");
            return {
                type: null,
                label: labelsMap.REPEATED,
                value: arr
            };
        }
        while (ch) {
            arr.push(value());
            white();
            if (ch === "]") {
                next("]");
                return {
                    type: arr[0].type,
                    label: labelsMap.REPEATED,
                    value: arr
                };
            }
            next(",");
            white();
        }
    }
    error("Bad array");
};

var object = function object() {
    var key = void 0;
    var obj = [];

    if (ch === "{") {
        next("{");
        white();
        if (ch === "}") {
            next("}");
            return {
                type: typesMap.MESSAGE,
                label: labelsMap.OPTIONAL,
                value: obj
            };
        }
        while (ch) {
            key = keyString();
            white();
            next(":");
            if (Object.hasOwnProperty.call(obj, key)) {
                error("Duplicate key '" + key + "'");
            }
            obj.push(_extends({ name: key }, value()));
            white();
            if (ch === "}") {
                next("}");
                return {
                    type: typesMap.MESSAGE,
                    label: labelsMap.OPTIONAL,
                    value: obj
                };
            }
            next(",");
            white();
        }
    }
    error("Bad object");
};

value = function value() {
    white();
    switch (ch) {
        case "{":
            return object();
        case "[":
            return array();
        case "\"":
            return string();
        case "-":
            return number();
        default:
            return ch >= "0" && ch <= "9" ? number() : word();
    }
};

function parse(source, reviver) {
    var result = void 0;

    text = source;
    at = 0;
    ch = " ";
    result = value();
    white();
    if (ch) {
        error("Syntax error");
    }

    var res = typeof reviver === "function" ? function walk(holder, key) {
        var k = void 0;
        var v = void 0;
        var val = holder[key];
        if (val && (typeof val === "undefined" ? "undefined" : _typeof(val)) === "object") {
            for (k in val) {
                if (Object.prototype.hasOwnProperty.call(val, k)) {
                    v = walk(val, k);
                    if (v !== undefined) {
                        val[k] = v;
                    } else {
                        delete val[k];
                    }
                }
            }
        }
        return reviver.call(holder, key, val);
    }({ "": result }, "") : result;
    return res.value || res;
}

// export default parse;
exports.default = parse;

if (module) module.exports = parse;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);
});