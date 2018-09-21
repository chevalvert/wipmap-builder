/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/wipmap-builder/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 105);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var ctx = __webpack_require__(8);
var hide = __webpack_require__(9);
var has = __webpack_require__(11);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(44)('wks');
var uid = __webpack_require__(31);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(62);
var toPrimitive = __webpack_require__(41);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(10)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(19);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var createDesc = __webpack_require__(20);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(42);
var defined = __webpack_require__(38);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(108)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(39)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(65);
var enumBugKeys = __webpack_require__(45);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(38);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

/**
 * @module {function} 101/exists
 * @type {function}
 */

/**
 * Returns false for null and undefined, true for everything else.
 * @function module:101/exists
 * @param val {*} - value to be existance checked
 * @return {boolean} whether the value exists or not
 */
module.exports = exists;

function exists (val) {
  return val !== undefined && val !== null;
}

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(5).f;
var has = __webpack_require__(11);
var TAG = __webpack_require__(3)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(112);
var global = __webpack_require__(2);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(14);
var TO_STRING_TAG = __webpack_require__(3)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(8);
var call = __webpack_require__(69);
var isArrayIter = __webpack_require__(70);
var anObject = __webpack_require__(7);
var toLength = __webpack_require__(30);
var getIterFn = __webpack_require__(47);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(130);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(7);
var dPs = __webpack_require__(64);
var enumBugKeys = __webpack_require__(45);
var IE_PROTO = __webpack_require__(43)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(40)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(66).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(37);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(21);
var TAG = __webpack_require__(3)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(31)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(11);
var setDesc = __webpack_require__(5).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(10)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// A no-operation function to use when you want to do nothing
/* harmony default export */ __webpack_exports__["a"] = (function () {});

/***/ }),
/* 36 */
/***/ (function(module, exports) {



/***/ }),
/* 37 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(18);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(63);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(14);
var $iterCreate = __webpack_require__(109);
var setToStringTag = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(67);
var ITERATOR = __webpack_require__(3)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(21);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(44)('keys');
var uid = __webpack_require__(31);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(18) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 45 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(32);
var ITERATOR = __webpack_require__(3)('iterator');
var Iterators = __webpack_require__(14);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(19);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(9);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 50 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperties = __webpack_require__(124);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _freeze = __webpack_require__(127);

var _freeze2 = _interopRequireDefault(_freeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (strings, raw) {
  return (0, _freeze2.default)((0, _defineProperties2.default)(strings, {
    raw: {
      value: (0, _freeze2.default)(raw)
    }
  }));
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var fails = __webpack_require__(10);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(162), __esModule: true };

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = __webpack_require__(164);
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(182);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(185);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(187);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(3);


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(18);
var wksExt = __webpack_require__(59);
var defineProperty = __webpack_require__(5).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = twoProduct

var SPLITTER = +(Math.pow(2, 27) + 1.0)

function twoProduct(a, b, result) {
  var x = a * b

  var c = SPLITTER * a
  var abig = c - a
  var ahi = c - abig
  var alo = a - ahi

  var d = SPLITTER * b
  var bbig = d - b
  var bhi = d - bbig
  var blo = b - bhi

  var err1 = x - (ahi * bhi)
  var err2 = err1 - (alo * bhi)
  var err3 = err2 - (ahi * blo)

  var y = alo * blo - err3

  if(result) {
    result[0] = y
    result[1] = x
    return result
  }

  return [ y, x ]
}

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(10)(function () {
  return Object.defineProperty(__webpack_require__(40)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var anObject = __webpack_require__(7);
var getKeys = __webpack_require__(15);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(11);
var toIObject = __webpack_require__(12);
var arrayIndexOf = __webpack_require__(110)(false);
var IE_PROTO = __webpack_require__(43)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(11);
var toObject = __webpack_require__(16);
var IE_PROTO = __webpack_require__(43)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(7);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(14);
var ITERATOR = __webpack_require__(3)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(7);
var aFunction = __webpack_require__(19);
var SPECIES = __webpack_require__(3)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(8);
var invoke = __webpack_require__(115);
var html = __webpack_require__(66);
var cel = __webpack_require__(40);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(21)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var isObject = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(48);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var dP = __webpack_require__(5);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(3)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(3)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var cssKeywords = __webpack_require__(78);

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var rdif;
	var gdif;
	var bdif;
	var h;
	var s;

	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var v = Math.max(r, g, b);
	var diff = v - Math.min(r, g, b);
	var diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

const fastRandom = __webpack_require__(158)

let seed = 0
let randomizer = fastRandom(seed)

module.exports = {
  get seed () { return seed },
  set seed (newSeed) {
    seed = newSeed
    randomizer = fastRandom(seed)
  },
  reset: () => { randomizer = fastRandom(seed) },
  random: () => randomizer.nextFloat(),
  randomFloat: (min, max) => randomizer.nextFloat() * (max - min) + min,
  randomInt: (min, max) => Math.floor(randomizer.nextFloat() * (max - min) + min)
}


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var assert = __webpack_require__(55)

var escRE = __webpack_require__(82)
var exists = __webpack_require__(17)
var defaults = __webpack_require__(167)
var debug = __webpack_require__(84)('keypather:reducer')
var stringReduce = __webpack_require__(171)

var slash = '\\'

module.exports = keypatherReducer

function keypatherReducer (state, operation, opts) {
  debug('keypather %O %O', state, opts)
  global.ctx = state.ctx
  opts = opts || {}
  defaults(opts, {
    force: true,
    delimeter: '.'
  })
  var dot = opts.delimeter
  var keyStartRegex = new RegExp('[' + escRE(opts.delimeter) + '\\[]')
  var initialState = {
    ctx: state.ctx,
    parentCtx: state.parentCtx || null,
    // static args
    keypath: state.keypath,
    val: state.val,
    funcArgs: state.funcArgs,
    // loop state
    i: null,
    character: null,
    lastCharacter: null,
    // position state
    keypathSplit: state.keypathSplit || [],
    keyStart: null,
    keyEnd: null,
    insideBracket: false,
    insideBracketNumber: false,
    insideBracketString: false,
    quoteCharacter: null,
    // operation state
    createOperation: state.createOperation || {
      createdKeypaths: {
        /* <normalizedKeypath>: true */
      }
    }
  }
  var state = stringReduce(state.keypath, reducer, initialState)
  state = reducer(state, 'END', state.keypath.length, initialState.keypath)
  function reducer (state, character, i, keypath) {
    var key
    state.i = i
    state.lastLastCharacter = keypath.charAt(i - 2)
    state.lastCharacter = state.character
    state.character = character
    debug('step %O %O %O', character, state, i)
    if (state.closedBracket) {
      var endFound = character === 'END' || keyStartRegex.test(character)
      if (!endFound) throw new Error(parseErrorMessage(state, 'invalid bracket key'))
      state.closedBracket = false
      state.insideBracket = character === '['
    } else if (state.insideBracketString) {
      // state: inside bracket
      state.keyStart = state.keyStart || i
      // greedily check for key end, by checking for next section start
      // unfortunately this is the best I could come up with w/out being
      // able to check for escaped chars in js
      var endFound = character === 'END' || keyStartRegex.test(character)
      debug('insideBracketString %O %O %O', character, endFound, state.lastCharacter === ']', state.lastLastCharacter === state.quoteCharacter)
      if (!endFound) return state
      if (state.lastCharacter !== ']') {
        if (character === 'END') throw new Error(parseErrorMessage(state, 'invalid bracket string key'))
        return state
      }
      if (state.lastLastCharacter !== state.quoteCharacter) {
        if (character === 'END') throw new Error(parseErrorMessage(state, 'invalid bracket string key'))
        return state
      }
      // state: closed bracket
      state.keyEnd = i - 2
      // state: inside bracket, closed string
      key = keypath.substring(state.keyStart, state.keyEnd)
      debug('handleKey bracket-string %O %O %O', key, state.ctx, character)
      handleKey(operation, key, state, opts)
      state.insideBracket = state.character === '['
      state.insideBracketString = false
      state.quoteCharacter = null
    } else if (state.insideBracketNumber) {
      // state: inside bracket, inside number
      if (!/^[0-9\]]$/.test(character)) throw new Error(parseErrorMessage(state, 'invalid bracket number key'))
      if (character === ']') {
        // state: closed bracket number
        state.keyEnd = i
        key = keypath.substring(state.keyStart, state.keyEnd)
        key = parseInt(key, 10)
        // not necesary bc regex above:
        // if (isNaN(key)) throw new Error(parseErrorMessage(state, 'invalid bracket number key'))
        debug('handleKey bracket-number %O %O %O', key, state.ctx, character)
        handleKey(operation, key, state, opts)
        state.insideBracket = false
        state.insideBracketNumber = false
        state.closedBracket = true
      }
    } else if (state.insideBracket) {
      // state: inside bracket
      if (/^["']$/.test(character)) {
        // inside bracket string start
        state.insideBracketString = true
        state.quoteCharacter = character
      } else if (/^[0-9]$/.test(character)) {
        // inside bracket number start
        state.insideBracketNumber = true
        state.keyStart = i
      } else {
        throw new Error(parseErrorMessage(state, 'invalid bracket key'))
      }
    } else {
      if (character === 'END') {
        // state: keypath end
        if (!exists(state.keyStart)) return state
        // hack: follow dot path
        character = dot
      }
      if (character === dot) {
        if (!exists(state.keyStart)) throw new Error(parseErrorMessage(state, 'invalid dot key'))
        // state: key end
        state.keyEnd = state.keyEnd || i
        key = keypath.substring(state.keyStart, state.keyEnd)
        debug('handleKey dot %O %O %O', key, state.ctx, character)
        handleKey(operation, key, state, opts)
        // state: dot key start
      } else if (character === '[') {
        if (i !== 0 && state.lastCharacter !== ']') {
          // state: dot key end
          if (!exists(state.keyStart)) throw new Error(parseErrorMessage(state, 'invalid dot key'))
          state.keyEnd = state.keyEnd || i
          key = keypath.substring(state.keyStart, state.keyEnd)
          debug('handleKey pre-bracket %O %O %O', key, state.ctx, character)
          handleKey(operation, key, state, opts)
        } // else bracket key start after bracket
        // state: bracket key start
        state.insideBracket = true
        state.closedBracket = false
      } else {
        if (exists(state.keyStart)) {
          // state: dot key continue
          if (!/^[A-Za-z0-9_$]$/.test(character)) throw new Error(parseErrorMessage(state, 'invalid dot key'))
        } else {
          // state: dot key start
          state.keyStart = i
          if (!/^[A-Za-z_$]$/.test(character)) throw new Error(parseErrorMessage(state, 'invalid dot key'))
        }
      }
    }
    return state
  }
  return state.ctx
}

function handleKey (operation, key, state, opts) {
  debug(handleKey, key)
  var nextCtx = operation(state.ctx, key, state, opts)
  state.parentCtx = state.ctx
  state.ctx = nextCtx
  state.keyStart = null
  state.keyEnd = null
  state.keypathSplit.push(key)
  debug('NEXT %O', {
    parentCtx: state.parentCtx,
    ctx: state.ctx,
    keyStart: state.keyStart,
    keyEnd: state.keyEnd,
    keypathSplit: state.keypathSplit,
  })
}

function parseErrorMessage (state, extra) {
  debug('parseErrorMessage %O %s', state, extra)
  return [
    "Error parsing keypath '", state.keypath, "' ",
    'at char ', (state.i + 1), " '", state.character, "'",
    ': ', extra
  ].join('')
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Functional version of a strict object check (Arrays and RegExps are not objects)
 * @module 101/is-object
 */

/**
 * @function module:101/is-object
 * @param {*} val - value checked to be an object
 * @return {boolean} Whether the value is an object or not
 */
var exists = __webpack_require__(17);

module.exports = isObject;

function isObject (val) {
  return typeof val === 'object' &&
    exists(val) &&
    !Array.isArray(val) &&
    !(val instanceof RegExp) &&
    !(val instanceof String) &&
    !(val instanceof Number);
}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(169);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = Object({"NODE_ENV":"production"}).DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var exists = __webpack_require__(17)
var throwUndefinedErr = __webpack_require__(178)

module.exports = function getOperation (obj, key, state, opts) {
  // if obj exists
  if (exists(obj)) return obj[key]
  // obj does not exist
  if (opts.force) return undefined
  // obj does not exist, and no "force"
  throwUndefinedErr(key, state)
}


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(180), __esModule: true };

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(58);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(21);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(65);
var hiddenKeys = __webpack_require__(45).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(25);
var createDesc = __webpack_require__(20);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(41);
var has = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(62);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(194);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(198);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(58);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var hyperx = __webpack_require__(201)
var appendChild = __webpack_require__(203)

var SVGNS = 'http://www.w3.org/2000/svg'
var XLINKNS = 'http://www.w3.org/1999/xlink'

var BOOL_PROPS = [
  'autofocus', 'checked', 'defaultchecked', 'disabled', 'formnovalidate',
  'indeterminate', 'readonly', 'required', 'selected', 'willvalidate'
]

var COMMENT_TAG = '!--'

var SVG_TAGS = [
  'svg', 'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix',
  'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood',
  'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage',
  'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight',
  'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'filter',
  'font', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src',
  'font-face-uri', 'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image',
  'line', 'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph',
  'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
  'tspan', 'use', 'view', 'vkern'
]

function belCreateElement (tag, props, children) {
  var el

  // If an svg tag, it needs a namespace
  if (SVG_TAGS.indexOf(tag) !== -1) {
    props.namespace = SVGNS
  }

  // If we are using a namespace
  var ns = false
  if (props.namespace) {
    ns = props.namespace
    delete props.namespace
  }

  // Create the element
  if (ns) {
    el = document.createElementNS(ns, tag)
  } else if (tag === COMMENT_TAG) {
    return document.createComment(props.comment)
  } else {
    el = document.createElement(tag)
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }
      // The for attribute gets transformed to htmlFor, but we just set as for
      if (p === 'htmlFor') {
        p = 'for'
      }
      // If a property is boolean, set itself to the key
      if (BOOL_PROPS.indexOf(key) !== -1) {
        if (val === 'true') val = key
        else if (val === 'false') continue
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on') {
        el[p] = val
      } else {
        if (ns) {
          if (p === 'xlink:href') {
            el.setAttributeNS(XLINKNS, p, val)
          } else if (/^xmlns($|:)/i.test(p)) {
            // skip xmlns definitions
          } else {
            el.setAttributeNS(null, p, val)
          }
        } else {
          el.setAttribute(p, val)
        }
      }
    }
  }

  appendChild(el, children)
  return el
}

module.exports = hyperx(belCreateElement, {comments: true})
module.exports.default = module.exports
module.exports.createElement = belCreateElement


/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);




var DomComponent = function () {
  function DomComponent(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, DomComponent);

    // Add your DOM references to this.refs
    this.refs = {};
    // Add your animejs animation to this.anims
    this.anims = {};
    this.timers = [];
    this.subcomponents = [];
    this.didInit(props);
  }

  // Add subComponent to this component


  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(DomComponent, [{
    key: 'registerComponent',
    value: function registerComponent(Component) {
      for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
      }

      var c = new (Function.prototype.bind.apply(Component, [null].concat(props)))();
      this.subcomponents.push(c);
      return c;
    }

    // Use it if you want to create DOM from the JS and use mount instead of hydrate

  }, {
    key: 'render',
    value: function render() {}

    // Called after the component is instantiated

  }, {
    key: 'didInit',
    value: function didInit() {}

    // Called just before the component is mounted to the DOM

  }, {
    key: 'willMount',
    value: function willMount() {}

    // Called just after the component is mounted to the DOM

  }, {
    key: 'didMount',
    value: function didMount() {}

    // Called just before the component is removed from the DOM

  }, {
    key: 'willUnmount',
    value: function willUnmount() {}
  }, {
    key: 'callWillMount',
    value: function callWillMount() {
      if (!this.refs.base) return;
      this.willMount(this.refs.base);
      this.subcomponents.forEach(function (c) {
        return c.callWillMount();
      });
    }
  }, {
    key: 'callDidMount',
    value: function callDidMount() {
      if (!this.refs.base) return;
      this.mounted = true;
      this.subcomponents.forEach(function (c) {
        return c.callDidMount();
      });
      this.didMount(this.refs.base);
    }

    // Use a already existing DOM element as base for the component

  }, {
    key: 'hydrate',
    value: function hydrate(el) {
      if (!el || this.mounted) return;
      this.callWillMount(el);
      this.refs.base = el;
      this.mounted = true;
      this.callDidMount();
    }

    // Render DOM from the render() function into an existing DOM element
    // If you specify a sibling, the element will be inserted before it

  }, {
    key: 'mount',
    value: function mount(parent) {
      var sibling = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!parent || this.mounted) return;
      var el = this.render();
      if (!el) return;
      this.callWillMount(el);
      sibling ? parent.insertBefore(el, sibling) : parent.appendChild(el);
      this.refs.base = el;
      this.mounted = true;
      this.callDidMount();
    }

    // Render DOM from the render() function and return the raw object

  }, {
    key: 'raw',
    value: function raw() {
      if (this.mounted || this.refs.base) return this.refs.base;
      var el = this.render();
      this.refs.base = el;
      return el;
    }
  }, {
    key: 'bindFuncs',
    value: function bindFuncs(funcs) {
      var _this = this;

      funcs.forEach(function (func) {
        _this[func] = _this[func].bind(_this);
      });
    }

    // Quick helper for timer in promises

  }, {
    key: 'timer',
    value: function timer(delay, cb) {
      var _this2 = this;

      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        var self = _this2;
        if (cb) cb = cb.bind(self);
        var timer = window.setTimeout(callback, delay);
        self.timers.push(timer);
        function callback() {
          var index = self.timers.indexOf(timer);
          if (~index) self.timers.splice(index, 1);
          resolve();
          if (cb) cb();
        }
      });
    }

    // Remove the DOM and destroy the component

  }, {
    key: 'destroy',
    value: function destroy() {
      if (!this.mounted) return;
      this.willUnmount(this.refs.base);
      this.subcomponents.forEach(function (c) {
        return c.destroy();
      });
      this.refs.base && this.refs.base.parentNode && this.refs.base.parentNode.removeChild(this.refs.base);
      for (var k in this.refs) {
        delete this.refs[k];
      }for (var _k in this.anims) {
        if (typeof this.anims[_k].pause === 'function') this.anims[_k].pause();
        delete this.anims[_k];
      }
      // remove all non-finished timers
      this.timers.forEach(function (timer) {
        return window.clearTimeout(timer);
      });
      this.anims = undefined;
      this.timers = undefined;
      this.refs = undefined;
      this.mounted = false;
    }
  }, {
    key: 'addClass',
    value: function addClass(className) {
      if (this.refs.base && this.refs.base.classList) {
        this.refs.base.classList.add(className);
      }
    }
  }, {
    key: 'removeClass',
    value: function removeClass(className) {
      if (this.refs.base && this.refs.base.classList) {
        this.refs.base.classList.contains(className) && this.refs.base.classList.remove(className);
      }
    }
  }, {
    key: 'repaint',
    value: function repaint() {
      if (this.refs.base) {
        void this.refs.base.offsetHeight;
      }
    }
  }, {
    key: 'show',
    value: function show() {
      this.hidden = false;
      if (this.refs.base) this.refs.base.style.display = '';
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.hidden = true;
      if (this.refs.base) this.refs.base.style.display = 'none';
    }
  }, {
    key: 'enable',
    value: function enable() {
      this.disabled = false;
      this.removeClass('is-disabled');
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.disabled = true;
      this.addClass('is-disabled');
    }
  }]);

  return DomComponent;
}();

/* harmony default export */ __webpack_exports__["a"] = (DomComponent);

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(206), __esModule: true };

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(15);
var toIObject = __webpack_require__(12);
var isEnum = __webpack_require__(25).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(208), __esModule: true };

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(210);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(213);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(216), __esModule: true };

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = linearExpansionSum

//Easy case: Add two scalars
function scalarScalar(a, b) {
  var x = a + b
  var bv = x - a
  var av = x - bv
  var br = b - bv
  var ar = a - av
  var y = ar + br
  if(y) {
    return [y, x]
  }
  return [x]
}

function linearExpansionSum(e, f) {
  var ne = e.length|0
  var nf = f.length|0
  if(ne === 1 && nf === 1) {
    return scalarScalar(e[0], f[0])
  }
  var n = ne + nf
  var g = new Array(n)
  var count = 0
  var eptr = 0
  var fptr = 0
  var abs = Math.abs
  var ei = e[eptr]
  var ea = abs(ei)
  var fi = f[fptr]
  var fa = abs(fi)
  var a, b
  if(ea < fa) {
    b = ei
    eptr += 1
    if(eptr < ne) {
      ei = e[eptr]
      ea = abs(ei)
    }
  } else {
    b = fi
    fptr += 1
    if(fptr < nf) {
      fi = f[fptr]
      fa = abs(fi)
    }
  }
  if((eptr < ne && ea < fa) || (fptr >= nf)) {
    a = ei
    eptr += 1
    if(eptr < ne) {
      ei = e[eptr]
      ea = abs(ei)
    }
  } else {
    a = fi
    fptr += 1
    if(fptr < nf) {
      fi = f[fptr]
      fa = abs(fi)
    }
  }
  var x = a + b
  var bv = x - a
  var y = b - bv
  var q0 = y
  var q1 = x
  var _x, _bv, _av, _br, _ar
  while(eptr < ne && fptr < nf) {
    if(ea < fa) {
      a = ei
      eptr += 1
      if(eptr < ne) {
        ei = e[eptr]
        ea = abs(ei)
      }
    } else {
      a = fi
      fptr += 1
      if(fptr < nf) {
        fi = f[fptr]
        fa = abs(fi)
      }
    }
    b = q0
    x = a + b
    bv = x - a
    y = b - bv
    if(y) {
      g[count++] = y
    }
    _x = q1 + x
    _bv = _x - q1
    _av = _x - _bv
    _br = x - _bv
    _ar = q1 - _av
    q0 = _ar + _br
    q1 = _x
  }
  while(eptr < ne) {
    a = ei
    b = q0
    x = a + b
    bv = x - a
    y = b - bv
    if(y) {
      g[count++] = y
    }
    _x = q1 + x
    _bv = _x - q1
    _av = _x - _bv
    _br = x - _bv
    _ar = q1 - _av
    q0 = _ar + _br
    q1 = _x
    eptr += 1
    if(eptr < ne) {
      ei = e[eptr]
    }
  }
  while(fptr < nf) {
    a = fi
    b = q0
    x = a + b
    bv = x - a
    y = b - bv
    if(y) {
      g[count++] = y
    } 
    _x = q1 + x
    _bv = _x - q1
    _av = _x - _bv
    _br = x - _bv
    _ar = q1 - _av
    q0 = _ar + _br
    q1 = _x
    fptr += 1
    if(fptr < nf) {
      fi = f[fptr]
    }
  }
  if(q0) {
    g[count++] = q0
  }
  if(q1) {
    g[count++] = q1
  }
  if(!count) {
    g[count++] = 0.0  
  }
  g.length = count
  return g
}

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var twoProduct = __webpack_require__(61)
var twoSum = __webpack_require__(232)

module.exports = scaleLinearExpansion

function scaleLinearExpansion(e, scale) {
  var n = e.length
  if(n === 1) {
    var ts = twoProduct(e[0], scale)
    if(ts[0]) {
      return ts
    }
    return [ ts[1] ]
  }
  var g = new Array(2 * n)
  var q = [0.1, 0.1]
  var t = [0.1, 0.1]
  var count = 0
  twoProduct(e[0], scale, q)
  if(q[0]) {
    g[count++] = q[0]
  }
  for(var i=1; i<n; ++i) {
    twoProduct(e[i], scale, t)
    var pq = q[1]
    twoSum(pq, t[0], q)
    if(q[0]) {
      g[count++] = q[0]
    }
    var a = t[1]
    var b = q[1]
    var x = a + b
    var bv = x - a
    var y = b - bv
    q[1] = x
    if(y) {
      g[count++] = y
    }
  }
  if(q[1]) {
    g[count++] = q[1]
  }
  if(count === 0) {
    g[count++] = 0.0
  }
  g.length = count
  return g
}

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const noise = __webpack_require__(250).noise

const clamp = (a, min, max) => Math.max(min, Math.min(a, max))
const normalize = (a, min, max) => map(a, min, max, 0, 1)
const map = (a, in_min, in_max, out_min, out_max) => (a - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
const lerp = (a, b, t) => a + t * (b - a)
const random = (a, b) => {
  if (b !== undefined) return lerp(a, b, Math.random())
  return lerp(0, a, Math.random())
}

function perlin (x, y, z) {
  if (arguments.length === 3) return noise.perlin3(x, y, z)
  if (arguments.length === 2) return noise.perlin2(x, y)
  if (arguments.length === 1) return noise.perlin2(x, null)
  return null
}

module.exports = {
  clamp,
  constrain: clamp,
  degrees: rad => rad * 180 / Math.PI,
  radians: deg => deg * Math.PI / 180,
  lerp,
  normalize,
  norm: normalize,
  map,
  random,
  rnd: random,
  perlin,
  noise: perlin
}


/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_taggedTemplateLiteral__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_taggedTemplateLiteral___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_taggedTemplateLiteral__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_bel__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_bel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_bel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_abstractions_DomComponent__ = __webpack_require__(93);







var _templateObject = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_taggedTemplateLiteral___default()(['<div class=\'log-screen-message\'>', '</div>'], ['<div class=\'log-screen-message\'>', '</div>']),
    _templateObject2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_taggedTemplateLiteral___default()(['\n      <section class=\'log-screen ', '\'>\n        <div class=\'log-screen-content\'>\n          <h1 class=\'log-screen-title\'>', '</h1>\n          ', '\n        </div>\n      </section>'], ['\n      <section class=\'log-screen ', '\'>\n        <div class=\'log-screen-content\'>\n          <h1 class=\'log-screen-title\'>', '</h1>\n          ', '\n        </div>\n      </section>']);




var MessageScreen = function (_DomComponent) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(MessageScreen, _DomComponent);

  function MessageScreen(title) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, MessageScreen);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (MessageScreen.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(MessageScreen)).call(this));

    _this.title = title;
    _this.message = message;
    _this.className = className;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(MessageScreen, [{
    key: 'render',
    value: function render() {
      this.refs.message = __WEBPACK_IMPORTED_MODULE_6_bel___default()(_templateObject, this.message);
      var el = __WEBPACK_IMPORTED_MODULE_6_bel___default()(_templateObject2, this.className, this.title, this.refs.message);
      return el;
    }
  }, {
    key: 'say',
    value: function say(text) {
      if (this.mounted) this.refs.message.innerHTML = text;
    }
  }]);

  return MessageScreen;
}(__WEBPACK_IMPORTED_MODULE_7_abstractions_DomComponent__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (MessageScreen);

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(106);
module.exports = __webpack_require__(275);


/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_taggedTemplateLiteral__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_taggedTemplateLiteral___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_taggedTemplateLiteral__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_locales__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_fps_indicator__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_fps_indicator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_fps_indicator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_file_saver__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_file_saver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_color__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_color___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_color__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_hotkeys_js__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_wipmap_renderer__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_wipmap_renderer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_wipmap_renderer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_controllers_settings__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_components_stopwatch__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_controllers_canvas__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_controllers_gui__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_controllers_images_uploader__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_controllers_sprites_manager__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_controllers_textures_manager__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_controllers_map_generator__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_utils_error__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_utils_loading_wrapper__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_utils_filename__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_utils_array_flatten__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_utils_array_unique__ = __webpack_require__(259);





var _templateObject = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_taggedTemplateLiteral___default()(['gui.panel.textures.texturesDescriber.placeholder'], ['gui.panel.textures.texturesDescriber.placeholder']),
    _templateObject2 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_taggedTemplateLiteral___default()(['gui.panel.textures.spritesList.empty'], ['gui.panel.textures.spritesList.empty']),
    _templateObject3 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_taggedTemplateLiteral___default()(['gui.panel.export.loadJSON.browse'], ['gui.panel.export.loadJSON.browse']),
    _templateObject4 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_taggedTemplateLiteral___default()(['loading'], ['loading']),
    _templateObject5 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_taggedTemplateLiteral___default()(['loading.map'], ['loading.map']);




























if (!window.isProduction) __WEBPACK_IMPORTED_MODULE_5_fps_indicator___default()();
var L = Object(__WEBPACK_IMPORTED_MODULE_4_locales__["a" /* default */])(!~window.location.hash.indexOf('#noloc') && window.lang);

var map = void 0;

var gui = Object(__WEBPACK_IMPORTED_MODULE_13_controllers_gui__["a" /* default */])({
  'gui.panel.generation': [['gui.panel.generation.seed', 'addText', [__WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].generation.seed], __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('generation.seed')], ['gui.panel.generation.x', 'addNumber', [0, 100, __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].x, 1], function (v) {
    return v && __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('x')(v);
  }], ['gui.panel.generation.y', 'addNumber', [0, 100, __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].y, 1], function (v) {
    return v && __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('y')(v);
  }], ['gui.panel.generation.voronoiWidth', 'addRange', [2, 20, __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].generation.width, 1], __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('generation.width')], ['gui.panel.generation.voronoiHeight', 'addRange', [2, 20, __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].generation.height, 1], __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('generation.height')], ['gui.panel.generation.jitter', 'addRange', [0, 1, __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].generation.jitter, 0.01], __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('generation.jitter')], ['gui.panel.generation.distortion', 'addRange', [0, 1, __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].generation.distortion, 0.01], __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('generation.distortion')], ['gui.panel.generation.gradient', 'addRange', [0, 1, __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].generation.gradient, 0.01], __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('generation.gradient')], ['gui.panel.generation.poissonDensity', 'addRange', [0, 100, __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].generation.poissonDensity, 0.01], __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('generation.poissonDensity')], ['gui.panel.generation.water', 'addRange', [0, 1, __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].generation.probablities.water, 0.01], __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('generation.probablities.water')]],
  'gui.panel.rendering': [['gui.panel.rendering.width', 'addNumber', [0, Number.POSITIVE_INFINITY, __WEBPACK_IMPORTED_MODULE_12_controllers_canvas__["a" /* default */].width, 1], function (v) {
    __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('rendering.width', false)(v);
    __WEBPACK_IMPORTED_MODULE_12_controllers_canvas__["a" /* default */].resize({ width: v });
  }], ['gui.panel.rendering.height', 'addNumber', [0, Number.POSITIVE_INFINITY, __WEBPACK_IMPORTED_MODULE_12_controllers_canvas__["a" /* default */].height, 1], function (v) {
    __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('rendering.height', false)(v);
    __WEBPACK_IMPORTED_MODULE_12_controllers_canvas__["a" /* default */].resize({ height: v });
  }], ['gui.panel.rendering.smooth', 'addBoolean', [__WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].rendering.smooth], __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('rendering.smooth', false), 0], ['gui.panel.rendering.renderBiomesTexture', 'addBoolean', [__WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].rendering.renderBiomesTexture], __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('rendering.renderBiomesTexture', false), -1], ['gui.panel.rendering.renderPoisson', 'addBoolean', [__WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].rendering.renderPoisson], __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('rendering.renderPoisson', false), -1], ['gui.panel.rendering.renderVoronoiCells', 'addBoolean', [__WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].rendering.renderVoronoiCells], __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('rendering.renderVoronoiCells', false), -1], ['gui.panel.rendering.renderVoronoiSites', 'addBoolean', [__WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].rendering.renderVoronoiSites], __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('rendering.renderVoronoiSites', false), -1], ['gui.panel.rendering.scale', 'addNumber', [0, Number.POSITIVE_INFINITY, __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].rendering.scale, 0.01], __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('rendering.scale', false)], ['gui.panel.rendering.voronoiColor', 'addColor', [__WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].rendering.colors.voronoi], __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('rendering.colors.voronoi', false), -1], ['gui.panel.rendering.backgroundColor', 'addColor', [__WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].rendering.colors.background], __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('rendering.colors.background', false), -1], ['gui.panel.rendering.backgroundAlpha', 'addRange', [0, 255, 255, 1], function (a) {
    return __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('rendering.colors.background', false)(__WEBPACK_IMPORTED_MODULE_7_color___default()(__WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].rendering.colors.background).alpha(a / 255).string());
  }, -1]],
  'gui.panel.legend': [].concat(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray___default()([].concat(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray___default()(Object(__WEBPACK_IMPORTED_MODULE_22_utils_array_unique__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_21_utils_array_flatten__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].generation.biomesMap))), ['WATER']).map(function (biome) {
    return ['gui.panel.legend.' + biome, 'addColor', [__WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].rendering.colors[biome]], __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('rendering.colors.' + biome, false), 100];
  }))),
  'gui.panel.textures': [['gui.panel.textures.texturesDescriber', 'addJSON', L(_templateObject), __WEBPACK_IMPORTED_MODULE_16_controllers_textures_manager__["a" /* default */].fromJSON, 1000], ['gui.panel.textures.spritesList', 'addHTML', '<ol><li>' + L(_templateObject2) + '</li></ol>']],
  'gui.panel.export': [['gui.panel.export.png', 'addButton', [], exportImage], ['gui.panel.export.json', 'addButton', [], function () {
    return __WEBPACK_IMPORTED_MODULE_6_file_saver___default.a.saveAs(__WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].toBlob(), Object(__WEBPACK_IMPORTED_MODULE_20_utils_filename__["a" /* default */])('wipmap'));
  }], ['gui.panel.export.loadJSON', 'addFileChooser', [L(_templateObject3), 'application/json'], function (file) {
    gui.disable();
    gui.fromFile(file, __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].GUI_CORRESPONDENCE_TABLE, function () {
      gui.enable();
      updateMap();
    });
  }]],
  'gui.panel.view': [['gui.panel.view.canvasScale', 'addRange', [0, 1, 1, 0.01], __WEBPACK_IMPORTED_MODULE_12_controllers_canvas__["a" /* default */].scale, -1]]
}, {
  container: document.body,
  localize: L
});

Object(__WEBPACK_IMPORTED_MODULE_8_hotkeys_js__["a" /* default */])('ctrl+h,h', function () {
  gui.toggle();
  if (!window.isProduction) return;
  var preview = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()({}, __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */], {
    rendering: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()({}, __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].rendering, {
      renderBiomesTexture: true,
      renderPoisson: false,
      renderVoronoiCells: false,
      renderVoronoiSites: false
    })
  });
  updateMap(false, gui.visible ? __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */] : preview);
});

Object(__WEBPACK_IMPORTED_MODULE_8_hotkeys_js__["a" /* default */])('w', function () {
  gui.disable();
  var debug = __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].rendering.renderVoronoiSites;
  gui.setValue('gui.panel.rendering', 'gui.panel.rendering.renderVoronoiSites', !debug);
  gui.setValue('gui.panel.rendering', 'gui.panel.rendering.renderVoronoiCells', !debug);
  gui.enable();
  updateMap(false);
});

Object(__WEBPACK_IMPORTED_MODULE_8_hotkeys_js__["a" /* default */])('ctrl+s,cmd+s', function (e) {
  e.preventDefault();
  exportImage();
});
Object(__WEBPACK_IMPORTED_MODULE_8_hotkeys_js__["a" /* default */])('left', function (e) {
  return gui.setValue('gui.panel.generation', 'gui.panel.generation.x', Math.max(0, __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].x - 1)) && e.preventDefault();
});
Object(__WEBPACK_IMPORTED_MODULE_8_hotkeys_js__["a" /* default */])('up', function (e) {
  return gui.setValue('gui.panel.generation', 'gui.panel.generation.y', Math.max(0, __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].y - 1)) && e.preventDefault();
});
Object(__WEBPACK_IMPORTED_MODULE_8_hotkeys_js__["a" /* default */])('right', function (e) {
  return gui.setValue('gui.panel.generation', 'gui.panel.generation.x', __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].x + 1) && e.preventDefault();
});
Object(__WEBPACK_IMPORTED_MODULE_8_hotkeys_js__["a" /* default */])('down', function (e) {
  return gui.setValue('gui.panel.generation', 'gui.panel.generation.y', __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].y + 1) && e.preventDefault();
});
Object(__WEBPACK_IMPORTED_MODULE_8_hotkeys_js__["a" /* default */])('shift+left', function (e) {
  return gui.setValue('gui.panel.generation', 'gui.panel.generation.x', Math.max(0, __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].x - Math.floor(__WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].generation.width / 2))) && e.preventDefault();
});
Object(__WEBPACK_IMPORTED_MODULE_8_hotkeys_js__["a" /* default */])('shift+up', function (e) {
  return gui.setValue('gui.panel.generation', 'gui.panel.generation.y', Math.max(0, __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].y - Math.floor(__WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].generation.height / 2))) && e.preventDefault();
});
Object(__WEBPACK_IMPORTED_MODULE_8_hotkeys_js__["a" /* default */])('shift+right', function (e) {
  return gui.setValue('gui.panel.generation', 'gui.panel.generation.x', __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].x + Math.floor(__WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].generation.width / 2)) && e.preventDefault();
});
Object(__WEBPACK_IMPORTED_MODULE_8_hotkeys_js__["a" /* default */])('shift+down', function (e) {
  return gui.setValue('gui.panel.generation', 'gui.panel.generation.y', __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].y + Math.floor(__WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */].generation.height / 2)) && e.preventDefault();
});

Object(__WEBPACK_IMPORTED_MODULE_14_controllers_images_uploader__["a" /* default */])({
  dropzone: document.documentElement,
  callback: __WEBPACK_IMPORTED_MODULE_15_controllers_sprites_manager__["a" /* default */].add
});

var stopwatch = new __WEBPACK_IMPORTED_MODULE_11_components_stopwatch__["a" /* default */]('rendered in ', 'ms');
if (!window.isProduction) stopwatch.mount(document.querySelector('main'));

Object(__WEBPACK_IMPORTED_MODULE_19_utils_loading_wrapper__["a" /* default */])(L(_templateObject4), [
// NOTE: enabling after gui.debounceDelay
function () {
  return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve) {
    return window.setTimeout(resolve, 300);
  });
}, L(_templateObject5), function () {
  gui.enable();
  gui.show();
  gui.setValue('gui.panel.textures', 'gui.panel.textures.spritesList', __WEBPACK_IMPORTED_MODULE_15_controllers_sprites_manager__["a" /* default */].toHTML(L(_templateObject2)));

  __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].watch(function () {
    var regenerate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (gui && gui.enabled) updateMap(regenerate);
  });

  __WEBPACK_IMPORTED_MODULE_16_controllers_textures_manager__["a" /* default */].watch(function () {
    var tex = __WEBPACK_IMPORTED_MODULE_16_controllers_textures_manager__["a" /* default */].toObject();
    if (map && map.renderer) map.renderer.textures = tex;
    __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["a" /* default */].update('textures', false)(tex);
  });

  __WEBPACK_IMPORTED_MODULE_12_controllers_canvas__["a" /* default */].watch(function () {
    return updateMap(false);
  });
  __WEBPACK_IMPORTED_MODULE_15_controllers_sprites_manager__["a" /* default */].watch(function () {
    gui.setValue('gui.panel.textures', 'gui.panel.textures.spritesList', __WEBPACK_IMPORTED_MODULE_15_controllers_sprites_manager__["a" /* default */].toHTML(L(_templateObject2)));
    updateMap(true);
  });

  updateMap(true);
}]).catch(__WEBPACK_IMPORTED_MODULE_18_utils_error__["a" /* default */]);

function exportImage() {
  map.renderer.toBlob(function (blob) {
    return __WEBPACK_IMPORTED_MODULE_6_file_saver___default.a.saveAs(blob, Object(__WEBPACK_IMPORTED_MODULE_20_utils_filename__["a" /* default */])('wipmap'));
  });
}

function updateMap() {
  var regenerate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : __WEBPACK_IMPORTED_MODULE_10_controllers_settings__["b" /* settings */];

  if (!regenerate) return map && map.renderer.update([], opts.rendering);

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve().then(function () {
    return document.querySelector('main').classList.add('is-rendering');
  }).then(stopwatch.start).then(function () {
    return Object(__WEBPACK_IMPORTED_MODULE_17_controllers_map_generator__["a" /* default */])(opts.x, opts.y, opts.generation);
  }).then(function (response) {
    map = response;
    document.querySelector('main').classList.remove('is-rendering');
    map.renderer = new __WEBPACK_IMPORTED_MODULE_9_wipmap_renderer___default.a(__WEBPACK_IMPORTED_MODULE_12_controllers_canvas__["a" /* default */].element, {
      map: map,
      seed: map.seed,
      textures: opts.textures,
      spritesheets: __WEBPACK_IMPORTED_MODULE_15_controllers_sprites_manager__["a" /* default */].toSpritesheets()
    });
    updateMap(false);
  }).then(stopwatch.stop).catch(__WEBPACK_IMPORTED_MODULE_18_utils_error__["a" /* default */]);
}

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(36);
__webpack_require__(13);
__webpack_require__(23);
__webpack_require__(114);
__webpack_require__(118);
__webpack_require__(119);
module.exports = __webpack_require__(0).Promise;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(37);
var defined = __webpack_require__(38);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(29);
var descriptor = __webpack_require__(20);
var setToStringTag = __webpack_require__(22);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(3)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12);
var toLength = __webpack_require__(30);
var toAbsoluteIndex = __webpack_require__(111);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(37);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(113);
var step = __webpack_require__(68);
var Iterators = __webpack_require__(14);
var toIObject = __webpack_require__(12);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(39)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(18);
var global = __webpack_require__(2);
var ctx = __webpack_require__(8);
var classof = __webpack_require__(32);
var $export = __webpack_require__(1);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(19);
var anInstance = __webpack_require__(46);
var forOf = __webpack_require__(24);
var speciesConstructor = __webpack_require__(71);
var task = __webpack_require__(72).set;
var microtask = __webpack_require__(116)();
var newPromiseCapabilityModule = __webpack_require__(48);
var perform = __webpack_require__(73);
var userAgent = __webpack_require__(117);
var promiseResolve = __webpack_require__(74);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(3)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(49)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(22)($Promise, PROMISE);
__webpack_require__(75)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(76)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 115 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(72).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(21)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(71);
var promiseResolve = __webpack_require__(74);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(1);
var newPromiseCapability = __webpack_require__(48);
var perform = __webpack_require__(73);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(122);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(1);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(123) });


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(15);
var gOPS = __webpack_require__(50);
var pIE = __webpack_require__(25);
var toObject = __webpack_require__(16);
var IObject = __webpack_require__(42);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(10)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(125), __esModule: true };

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(126);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperties(T, D) {
  return $Object.defineProperties(T, D);
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperties: __webpack_require__(64) });


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(128), __esModule: true };

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(129);
module.exports = __webpack_require__(0).Object.freeze;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(33).onFreeze;

__webpack_require__(52)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(131), __esModule: true };

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(13);
__webpack_require__(132);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(8);
var $export = __webpack_require__(1);
var toObject = __webpack_require__(16);
var call = __webpack_require__(69);
var isArrayIter = __webpack_require__(70);
var toLength = __webpack_require__(30);
var createProperty = __webpack_require__(133);
var getIterFn = __webpack_require__(47);

$export($export.S + $export.F * !__webpack_require__(76)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(5);
var createDesc = __webpack_require__(20);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_locales_fr__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_locales_en__ = __webpack_require__(136);



var locales = { fr: __WEBPACK_IMPORTED_MODULE_0_locales_fr__["a" /* default */], en: __WEBPACK_IMPORTED_MODULE_1_locales_en__["a" /* default */] };

/* harmony default export */ __webpack_exports__["a"] = (function () {
  var LANG = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'fr';
  return function (key) {
    if (!key) return;
    if (Array.isArray(key)) key = key[0];

    return locales.hasOwnProperty(LANG) ? locales[LANG][key] || key : key;
  };
});

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var fr = {};

fr['loading'] = 'chargement';
fr['loading.map'] = 'génération de la carte';

fr['error'] = 'erreur';

fr['gui.panel.generation'] = 'g\xE9n\xE9ration';
fr['gui.panel.generation.seed'] = 'seed';
fr['gui.panel.generation.x'] = 'longitude';
fr['gui.panel.generation.y'] = 'latitude';
fr['gui.panel.generation.voronoiWidth'] = 'largeur de la grille';
fr['gui.panel.generation.voronoiHeight'] = 'hauteur de la grille';
fr['gui.panel.generation.jitter'] = 'd\xE9formation de la grille';
fr['gui.panel.generation.distortion'] = 'd\xE9formation des cellules';
fr['gui.panel.generation.gradient'] = 'd\xE9grad\xE9 des fronti\xE8res';
fr['gui.panel.generation.poissonDensity'] = 'densit\xE9 de points';
fr['gui.panel.generation.water'] = 'niveau de l\'eau';

fr['gui.panel.rendering'] = 'rendu';
fr['gui.panel.rendering.width'] = 'largeur du canvas';
fr['gui.panel.rendering.height'] = 'hauteur du canvas';
fr['gui.panel.rendering.smooth'] = 'antialiasing';
fr['gui.panel.rendering.renderBiomesTexture'] = 'afficher les textures';
fr['gui.panel.rendering.renderPoisson'] = 'afficher les points';
fr['gui.panel.rendering.renderVoronoiCells'] = 'afficher la grille';
fr['gui.panel.rendering.renderVoronoiSites'] = 'affiche le centre des cellules';
fr['gui.panel.rendering.scale'] = '\xE9chelle des sprites';
fr['gui.panel.rendering.voronoiColor'] = 'couleur de la grille';
fr['gui.panel.rendering.backgroundColor'] = 'couleur de l\'arri\xE8re-plan';
fr['gui.panel.rendering.backgroundAlpha'] = 'transparence de l\'arri\xE8re-plan';

fr['gui.panel.legend'] = 'l\xE9gende';
fr['gui.panel.legend.DESERT'] = 'd\xE9sert [DESERT]';
fr['gui.panel.legend.FOREST'] = 'for\xEAt [FOREST]';
fr['gui.panel.legend.MOUNTAINS'] = 'montagnes [MOUNTAINS]';
fr['gui.panel.legend.PLAINS'] = 'plaines [PLAINS]';
fr['gui.panel.legend.SWAMP'] = 'marais [SWAMP]';
fr['gui.panel.legend.WATER'] = 'eau [WATER]';

fr['gui.panel.textures'] = 'textures';
fr['gui.panel.textures.texturesDescriber'] = 'textures';
fr['gui.panel.textures.texturesDescriber.placeholder'] = '{\n  "DESERT": [["file.png", 1]],\n  "PLAINS": [["file-1.png", 0.5], ["file-2.png", 0.5]]\n}';
fr['gui.panel.textures.spritesList'] = 'sprites disponibles';
fr['gui.panel.textures.spritesList.empty'] = 'Glissez-d\xE9posez une ou plusieurs images pour commencer';

fr['gui.panel.export'] = 'export';
fr['gui.panel.export.png'] = 'exporter l\'image';
fr['gui.panel.export.json'] = 'exporter la configuration';
fr['gui.panel.export.loadJSON'] = 'importer une configuration';
fr['gui.panel.export.loadJSON.browse'] = 'parcourir les fichiers...';

fr['gui.panel.view'] = '\xE9chelle';
fr['gui.panel.view.canvasScale'] = '\xE9chelle du canvas';

/* harmony default export */ __webpack_exports__["a"] = (fr);

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var en = {};

en['loading'] = 'loading';
en['loading.map'] = 'map generation';

en['error'] = 'error';

en['gui.panel.generation'] = 'generation';
en['gui.panel.generation.seed'] = 'seed';
en['gui.panel.generation.x'] = 'longitude';
en['gui.panel.generation.y'] = 'latitude';
en['gui.panel.generation.voronoiWidth'] = 'grid width';
en['gui.panel.generation.voronoiHeight'] = 'grid height';
en['gui.panel.generation.jitter'] = 'grid jitter';
en['gui.panel.generation.distortion'] = 'cells distortion';
en['gui.panel.generation.gradient'] = 'cells gradient';
en['gui.panel.generation.poissonDensity'] = 'points density';
en['gui.panel.generation.water'] = 'water level';

en['gui.panel.rendering'] = 'render';
en['gui.panel.rendering.width'] = 'canvas width';
en['gui.panel.rendering.height'] = 'canvas height';
en['gui.panel.rendering.smooth'] = 'antialiasing';
en['gui.panel.rendering.renderBiomesTexture'] = 'render textures';
en['gui.panel.rendering.renderPoisson'] = 'render points';
en['gui.panel.rendering.renderVoronoiCells'] = 'render grid';
en['gui.panel.rendering.renderVoronoiSites'] = 'render cells center';
en['gui.panel.rendering.scale'] = 'sprites scale';
en['gui.panel.rendering.voronoiColor'] = 'grid color';
en['gui.panel.rendering.backgroundColor'] = 'background color';
en['gui.panel.rendering.backgroundAlpha'] = 'background alpha';

en['gui.panel.legend'] = 'legend';
en['gui.panel.legend.DESERT'] = 'DESERT';
en['gui.panel.legend.FOREST'] = 'FOREST';
en['gui.panel.legend.MOUNTAINS'] = 'MOUNTAINS';
en['gui.panel.legend.PLAINS'] = 'PLAINS';
en['gui.panel.legend.SWAMP'] = 'SWAMP';
en['gui.panel.legend.WATER'] = 'WATER';

en['gui.panel.textures'] = 'textures';
en['gui.panel.textures.texturesDescriber'] = 'textures';
en['gui.panel.textures.texturesDescriber.placeholder'] = '{\n  "DESERT": [["file.png", 1]],\n  "PLAINS": [["file-1.png", 0.5], ["file-2.png", 0.5]]\n}';
en['gui.panel.textures.spritesList'] = 'available sprites';
en['gui.panel.textures.spritesList.empty'] = 'Drag and drop one or multiple images to start';

en['gui.panel.export'] = 'export';
en['gui.panel.export.png'] = 'export image';
en['gui.panel.export.json'] = 'export configuration';
en['gui.panel.export.loadJSON'] = 'import configuration';
en['gui.panel.export.loadJSON.browse'] = 'browse files...';

en['gui.panel.view'] = 'scale';
en['gui.panel.view.canvasScale'] = 'canvas scale';

/* harmony default export */ __webpack_exports__["a"] = (en);

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module fps-indicator
 */



var raf = __webpack_require__(138)
var now = __webpack_require__(140)
var css = __webpack_require__(141)

module.exports = fps



function fps (opts) {
	if (!(this instanceof fps)) return new fps(opts)

	if (typeof opts === 'string') opts = {position: opts}
	opts = opts || {}

	if (opts.container) {
		if (typeof opts.container === 'string') {
			this.container = document.querySelector(opts.container)
		}
		else {
			this.container = opts.container
		}
	}
	else {
		this.container = document.body || document.documentElement
	}

	//init fps
	this.element = document.createElement('div')
	this.element.className = 'fps'
	this.element.innerHTML = [
		'<div class="fps-bg"></div>',
		'<canvas class="fps-canvas"></canvas>',
		'<span class="fps-text">fps <span class="fps-value">60.0</span></span>'
	].join('')
	this.container.appendChild(this.element)

	this.canvas = this.element.querySelector('.fps-canvas')
	this.textEl = this.element.querySelector('.fps-text')
	this.valueEl = this.element.querySelector('.fps-value')
	this.bgEl = this.element.querySelector('.fps-bg')

	var style = opts.css || opts.style || ''
	if (typeof style === 'object') style = css(style)

	var posCss = ''
	switch (opts.position) {
		case 'top-left':
			posCss = 'left: 0; top: 0;'
			break
		case 'top-right':
			posCss = 'right: 0; top: 0;'
			break
		case 'bottom-right':
			posCss = 'right: 0; bottom: 0;'
			break
		case 'bottom-left':
			posCss = 'left: 0; bottom: 0;'
			break
		default:
			posCss = 'left: 0; bottom: 0;'
	}

	this.element.style.cssText = [
		'line-height: 1;',
		'position: fixed;',
		'font-family: Roboto, sans-serif;',
		'z-index: 1;',
		'font-weight: 300;',
		'font-size: small;',
		'padding: 1rem;',
		posCss,
		opts.color ? ('color:' + opts.color) : '',
		style
	].join('')

	this.canvas.style.cssText = [
		'position: relative;',
		'width: 2em;',
		'height: 1em;',
		'display: block;',
		'float: left;',
		'margin-right: .333em;'
	].join('')

	this.bgEl.style.cssText = [
		'position: absolute;',
		'height: 1em;',
		'width: 2em;',
		'background: currentcolor;',
		'opacity: .1;'
	].join('')

	this.canvas.width = parseInt(getComputedStyle(this.canvas).width) || 1
	this.canvas.height = parseInt(getComputedStyle(this.canvas).height) || 1

	this.context = this.canvas.getContext('2d')

	var ctx = this.context
	var w = this.canvas.width
	var h = this.canvas.height
	var count = 0
	var lastTime = 0
	var values = opts.values || Array(this.canvas.width)
	var period = opts.period || 1000
	var max = opts.max || 100

	//enable update routine
	var that = this
	raf(function measure () {
		count++
		var t = now()

		if (t - lastTime > period) {
			lastTime = t
			values.push(count / (max * period * 0.001))
			values = values.slice(-w)
			count = 0

			ctx.clearRect(0, 0, w, h)
			ctx.fillStyle = getComputedStyle(that.canvas).color
			for (var i = w; i--;) {
				var value = values[i]
				if (value == null) break
				ctx.fillRect(i, h - h * value, 1, h * value)
			}

			that.valueEl.innerHTML = (values[values.length - 1]*max).toFixed(1)
		}

		raf(measure)
	})
}


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(139)
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function(object) {
  if (!object) {
    object = root;
  }
  object.requestAnimationFrame = raf
  object.cancelAnimationFrame = caf
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.12.2
(function() {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

//# sourceMappingURL=performance-now.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports =
  global.performance &&
  global.performance.now ? function now() {
    return performance.now()
  } : Date.now || function now() {
    return +new Date
  }

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var repeatString = __webpack_require__(142);
var objectAssign = __webpack_require__(77);
var arrify = __webpack_require__(143);

module.exports = function toCss(object, opts) {
	opts = objectAssign({
		indent: '',
		property: identity,
		value: identity,
		selector: identity
	}, opts);

	if (typeof opts.indent === 'number') {
		opts.indent = repeatString(' ', opts.indent);
	}

	function props(prop, val) {
		return arrify(prop).reduce(function (props, p) {
			return props.concat(opts.property(p, val));
		}, []);
	}

	function values(val, prop) {
		return arrify(val).reduce(function (vals, v) {
			return vals.concat(opts.value(v, prop));
		}, []);
	}

	function selectors(sel, value) {
		return arrify(sel).reduce(function (sels, s) {
			return sels.concat(opts.selector(s, value));
		}, []);
	}

	function _toCss(obj, level) {
		var str = '';
		Object.keys(obj).forEach(function (sel) {
			var value = obj[sel];
			if (isLastLevel(value)) {
				str += rule(props(sel, value), values(value, sel), opts.indent, level - 1);
				return;
			} else if (Array.isArray(value)) {
				value.forEach(function (val) {
					str += _toCss(nest(sel, val), level);
				});
				return;
			}
			selectors(sel, value).forEach(function (selector) {
				str += start(selector, opts.indent, level);
				Object.keys(value).forEach(function (prop) {
					var value = obj[sel][prop];
					if (oneMoreLevelExists(value)) {
						str += _toCss(nest(prop, value), level + 1);
					} else {
						str += rule(props(prop, value), values(value, prop), opts.indent, level);
					}
				});
				str += end(opts.indent, level);
			});
		});
		return str;
	}

	return arrify(object)
		.map(function (o) {
			return _toCss(o, 0);
		})
		.join(lineEnd(opts.indent));
};

function nest(prop, val) {
	var tmp = {};
	tmp[prop] = val;
	return tmp;
}

function isLastLevel(val) {
	return typeof val === 'string' || Array.isArray(val) && val.length && typeof val[0] !== 'object';
}

function oneMoreLevelExists(val) {
	return typeof val === 'object' && !Array.isArray(val);
}

function identity(v) {
	return v;
}

function lineStart(indent, level) {
	return indent ? repeatString(indent, level) : '';
}

function space(indent) {
	return indent ? ' ' : '';
}

function lineEnd(indent) {
	return indent ? '\n' : '';
}

function start(sel, indent, level) {
	return lineStart(indent, level) + sel + space(indent) + '{' + lineEnd(indent);
}

function end(indent, level) {
	return lineStart(indent, level) + '}' + lineEnd(indent);
}

function rule(props, values, indent, level) {
	var linestart = lineStart(indent, level + 1);
	var lineend = lineEnd(indent);
	var s = space(indent);

	var str = '';

	for (var i = 0, propLength = props.length; i < propLength; i++) {
		for (var j = 0, valueLength = values.length; j < valueLength; j++) {
			str += linestart + props[i] + (isAtRule(props[i]) ? ' ' : ':') + s + values[j] + ';' + lineend;
		}
	}

	return str;
}

function isAtRule(prop) {
	return prop.indexOf('@') === 0;
}


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



/**
 * Results cache
 */

var res = '';
var cache;

/**
 * Expose `repeat`
 */

module.exports = repeat;

/**
 * Repeat the given `string` the specified `number`
 * of times.
 *
 * **Example:**
 *
 * ```js
 * var repeat = require('repeat-string');
 * repeat('A', 5);
 * //=> AAAAA
 * ```
 *
 * @param {String} `string` The string to repeat
 * @param {Number} `number` The number of times to repeat the string
 * @return {String} Repeated string
 * @api public
 */

function repeat(str, num) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  // cover common, quick use cases
  if (num === 1) return str;
  if (num === 2) return str + str;

  var max = str.length * num;
  if (cache !== str || typeof cache === 'undefined') {
    cache = str;
    res = '';
  } else if (res.length >= max) {
    return res.substr(0, max);
  }

  while (max > res.length && num > 1) {
    if (num & 1) {
      res += str;
    }

    num >>= 1;
    str += str;
  }

  res += str;
  res = res.substr(0, max);
  return res;
}


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (val) {
	if (val === null || val === undefined) {
		return [];
	}

	return Array.isArray(val) ? val : [val];
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.2
 * 2016-06-16 18:25:19
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function(node) {
			var event = new MouseEvent("click");
			node.dispatchEvent(event);
		}
		, is_safari = /constructor/i.test(view.HTMLElement) || view.safari
		, is_chrome_ios =/CriOS\/[\d]+/.test(navigator.userAgent)
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
		, arbitrary_revoke_timeout = 1000 * 40 // in ms
		, revoke = function(file) {
			var revoker = function() {
				if (typeof file === "string") { // file is an object URL
					get_URL().revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			};
			setTimeout(revoker, arbitrary_revoke_timeout);
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, auto_bom = function(blob) {
			// prepend BOM for UTF-8 XML and text/* types (including HTML)
			// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
				return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
			}
			return blob;
		}
		, FileSaver = function(blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, force = type === force_saveable_type
				, object_url
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
						// Safari doesn't allow downloading of blob urls
						var reader = new FileReader();
						reader.onloadend = function() {
							var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
							var popup = view.open(url, '_blank');
							if(!popup) view.location.href = url;
							url=undefined; // release reference before dispatching
							filesaver.readyState = filesaver.DONE;
							dispatch_all();
						};
						reader.readAsDataURL(blob);
						filesaver.readyState = filesaver.INIT;
						return;
					}
					// don't create more object URLs than needed
					if (!object_url) {
						object_url = get_URL().createObjectURL(blob);
					}
					if (force) {
						view.location.href = object_url;
					} else {
						var opened = view.open(object_url, "_blank");
						if (!opened) {
							// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
							view.location.href = object_url;
						}
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					revoke(object_url);
				}
			;
			filesaver.readyState = filesaver.INIT;

			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				setTimeout(function() {
					save_link.href = object_url;
					save_link.download = name;
					click(save_link);
					dispatch_all();
					revoke(object_url);
					filesaver.readyState = filesaver.DONE;
				});
				return;
			}

			fs_error();
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name, no_auto_bom) {
			return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
		}
	;
	// IE 10+ (native saveAs)
	if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
		return function(blob, name, no_auto_bom) {
			name = name || blob.name || "download";

			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			return navigator.msSaveOrOpenBlob(blob, name);
		};
	}

	FS_proto.abort = function(){};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
  module.exports.saveAs = saveAs;
} else if (("function" !== "undefined" && __webpack_require__(145) !== null) && (__webpack_require__(146) !== null)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
    return saveAs;
  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}


/***/ }),
/* 145 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 146 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var colorString = __webpack_require__(148);
var convert = __webpack_require__(151);

var _slice = [].slice;

var skippedModels = [
	// to be honest, I don't really feel like keyword belongs in color convert, but eh.
	'keyword',

	// gray conflicts with some method names, and has its own method defined.
	'gray',

	// shouldn't really be in color-convert either...
	'hex'
];

var hashedModelKeys = {};
Object.keys(convert).forEach(function (model) {
	hashedModelKeys[_slice.call(convert[model].labels).sort().join('')] = model;
});

var limiters = {};

function Color(obj, model) {
	if (!(this instanceof Color)) {
		return new Color(obj, model);
	}

	if (model && model in skippedModels) {
		model = null;
	}

	if (model && !(model in convert)) {
		throw new Error('Unknown model: ' + model);
	}

	var i;
	var channels;

	if (!obj) {
		this.model = 'rgb';
		this.color = [0, 0, 0];
		this.valpha = 1;
	} else if (obj instanceof Color) {
		this.model = obj.model;
		this.color = obj.color.slice();
		this.valpha = obj.valpha;
	} else if (typeof obj === 'string') {
		var result = colorString.get(obj);
		if (result === null) {
			throw new Error('Unable to parse color from string: ' + obj);
		}

		this.model = result.model;
		channels = convert[this.model].channels;
		this.color = result.value.slice(0, channels);
		this.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1;
	} else if (obj.length) {
		this.model = model || 'rgb';
		channels = convert[this.model].channels;
		var newArr = _slice.call(obj, 0, channels);
		this.color = zeroArray(newArr, channels);
		this.valpha = typeof obj[channels] === 'number' ? obj[channels] : 1;
	} else if (typeof obj === 'number') {
		// this is always RGB - can be converted later on.
		obj &= 0xFFFFFF;
		this.model = 'rgb';
		this.color = [
			(obj >> 16) & 0xFF,
			(obj >> 8) & 0xFF,
			obj & 0xFF
		];
		this.valpha = 1;
	} else {
		this.valpha = 1;

		var keys = Object.keys(obj);
		if ('alpha' in obj) {
			keys.splice(keys.indexOf('alpha'), 1);
			this.valpha = typeof obj.alpha === 'number' ? obj.alpha : 0;
		}

		var hashedKeys = keys.sort().join('');
		if (!(hashedKeys in hashedModelKeys)) {
			throw new Error('Unable to parse color from object: ' + JSON.stringify(obj));
		}

		this.model = hashedModelKeys[hashedKeys];

		var labels = convert[this.model].labels;
		var color = [];
		for (i = 0; i < labels.length; i++) {
			color.push(obj[labels[i]]);
		}

		this.color = zeroArray(color);
	}

	// perform limitations (clamping, etc.)
	if (limiters[this.model]) {
		channels = convert[this.model].channels;
		for (i = 0; i < channels; i++) {
			var limit = limiters[this.model][i];
			if (limit) {
				this.color[i] = limit(this.color[i]);
			}
		}
	}

	this.valpha = Math.max(0, Math.min(1, this.valpha));

	if (Object.freeze) {
		Object.freeze(this);
	}
}

Color.prototype = {
	toString: function () {
		return this.string();
	},

	toJSON: function () {
		return this[this.model]();
	},

	string: function (places) {
		var self = this.model in colorString.to ? this : this.rgb();
		self = self.round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to[self.model](args);
	},

	percentString: function (places) {
		var self = this.rgb().round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to.rgb.percent(args);
	},

	array: function () {
		return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
	},

	object: function () {
		var result = {};
		var channels = convert[this.model].channels;
		var labels = convert[this.model].labels;

		for (var i = 0; i < channels; i++) {
			result[labels[i]] = this.color[i];
		}

		if (this.valpha !== 1) {
			result.alpha = this.valpha;
		}

		return result;
	},

	unitArray: function () {
		var rgb = this.rgb().color;
		rgb[0] /= 255;
		rgb[1] /= 255;
		rgb[2] /= 255;

		if (this.valpha !== 1) {
			rgb.push(this.valpha);
		}

		return rgb;
	},

	unitObject: function () {
		var rgb = this.rgb().object();
		rgb.r /= 255;
		rgb.g /= 255;
		rgb.b /= 255;

		if (this.valpha !== 1) {
			rgb.alpha = this.valpha;
		}

		return rgb;
	},

	round: function (places) {
		places = Math.max(places || 0, 0);
		return new Color(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);
	},

	alpha: function (val) {
		if (arguments.length) {
			return new Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);
		}

		return this.valpha;
	},

	// rgb
	red: getset('rgb', 0, maxfn(255)),
	green: getset('rgb', 1, maxfn(255)),
	blue: getset('rgb', 2, maxfn(255)),

	hue: getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, function (val) { return ((val % 360) + 360) % 360; }), // eslint-disable-line brace-style

	saturationl: getset('hsl', 1, maxfn(100)),
	lightness: getset('hsl', 2, maxfn(100)),

	saturationv: getset('hsv', 1, maxfn(100)),
	value: getset('hsv', 2, maxfn(100)),

	chroma: getset('hcg', 1, maxfn(100)),
	gray: getset('hcg', 2, maxfn(100)),

	white: getset('hwb', 1, maxfn(100)),
	wblack: getset('hwb', 2, maxfn(100)),

	cyan: getset('cmyk', 0, maxfn(100)),
	magenta: getset('cmyk', 1, maxfn(100)),
	yellow: getset('cmyk', 2, maxfn(100)),
	black: getset('cmyk', 3, maxfn(100)),

	x: getset('xyz', 0, maxfn(100)),
	y: getset('xyz', 1, maxfn(100)),
	z: getset('xyz', 2, maxfn(100)),

	l: getset('lab', 0, maxfn(100)),
	a: getset('lab', 1),
	b: getset('lab', 2),

	keyword: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return convert[this.model].keyword(this.color);
	},

	hex: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return colorString.to.hex(this.rgb().round().color);
	},

	rgbNumber: function () {
		var rgb = this.rgb().color;
		return ((rgb[0] & 0xFF) << 16) | ((rgb[1] & 0xFF) << 8) | (rgb[2] & 0xFF);
	},

	luminosity: function () {
		// http://www.w3.org/TR/WCAG20/#relativeluminancedef
		var rgb = this.rgb().color;

		var lum = [];
		for (var i = 0; i < rgb.length; i++) {
			var chan = rgb[i] / 255;
			lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
		}

		return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
	},

	contrast: function (color2) {
		// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
		var lum1 = this.luminosity();
		var lum2 = color2.luminosity();

		if (lum1 > lum2) {
			return (lum1 + 0.05) / (lum2 + 0.05);
		}

		return (lum2 + 0.05) / (lum1 + 0.05);
	},

	level: function (color2) {
		var contrastRatio = this.contrast(color2);
		if (contrastRatio >= 7.1) {
			return 'AAA';
		}

		return (contrastRatio >= 4.5) ? 'AA' : '';
	},

	isDark: function () {
		// YIQ equation from http://24ways.org/2010/calculating-color-contrast
		var rgb = this.rgb().color;
		var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
		return yiq < 128;
	},

	isLight: function () {
		return !this.isDark();
	},

	negate: function () {
		var rgb = this.rgb();
		for (var i = 0; i < 3; i++) {
			rgb.color[i] = 255 - rgb.color[i];
		}
		return rgb;
	},

	lighten: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] += hsl.color[2] * ratio;
		return hsl;
	},

	darken: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] -= hsl.color[2] * ratio;
		return hsl;
	},

	saturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] += hsl.color[1] * ratio;
		return hsl;
	},

	desaturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] -= hsl.color[1] * ratio;
		return hsl;
	},

	whiten: function (ratio) {
		var hwb = this.hwb();
		hwb.color[1] += hwb.color[1] * ratio;
		return hwb;
	},

	blacken: function (ratio) {
		var hwb = this.hwb();
		hwb.color[2] += hwb.color[2] * ratio;
		return hwb;
	},

	grayscale: function () {
		// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
		var rgb = this.rgb().color;
		var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
		return Color.rgb(val, val, val);
	},

	fade: function (ratio) {
		return this.alpha(this.valpha - (this.valpha * ratio));
	},

	opaquer: function (ratio) {
		return this.alpha(this.valpha + (this.valpha * ratio));
	},

	rotate: function (degrees) {
		var hsl = this.hsl();
		var hue = hsl.color[0];
		hue = (hue + degrees) % 360;
		hue = hue < 0 ? 360 + hue : hue;
		hsl.color[0] = hue;
		return hsl;
	},

	mix: function (mixinColor, weight) {
		// ported from sass implementation in C
		// https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
		var color1 = mixinColor.rgb();
		var color2 = this.rgb();
		var p = weight === undefined ? 0.5 : weight;

		var w = 2 * p - 1;
		var a = color1.alpha() - color2.alpha();

		var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
		var w2 = 1 - w1;

		return Color.rgb(
				w1 * color1.red() + w2 * color2.red(),
				w1 * color1.green() + w2 * color2.green(),
				w1 * color1.blue() + w2 * color2.blue(),
				color1.alpha() * p + color2.alpha() * (1 - p));
	}
};

// model conversion methods and static constructors
Object.keys(convert).forEach(function (model) {
	if (skippedModels.indexOf(model) !== -1) {
		return;
	}

	var channels = convert[model].channels;

	// conversion methods
	Color.prototype[model] = function () {
		if (this.model === model) {
			return new Color(this);
		}

		if (arguments.length) {
			return new Color(arguments, model);
		}

		var newAlpha = typeof arguments[channels] === 'number' ? channels : this.valpha;
		return new Color(assertArray(convert[this.model][model].raw(this.color)).concat(newAlpha), model);
	};

	// 'static' construction methods
	Color[model] = function (color) {
		if (typeof color === 'number') {
			color = zeroArray(_slice.call(arguments), channels);
		}
		return new Color(color, model);
	};
});

function roundTo(num, places) {
	return Number(num.toFixed(places));
}

function roundToPlace(places) {
	return function (num) {
		return roundTo(num, places);
	};
}

function getset(model, channel, modifier) {
	model = Array.isArray(model) ? model : [model];

	model.forEach(function (m) {
		(limiters[m] || (limiters[m] = []))[channel] = modifier;
	});

	model = model[0];

	return function (val) {
		var result;

		if (arguments.length) {
			if (modifier) {
				val = modifier(val);
			}

			result = this[model]();
			result.color[channel] = val;
			return result;
		}

		result = this[model]().color[channel];
		if (modifier) {
			result = modifier(result);
		}

		return result;
	};
}

function maxfn(max) {
	return function (v) {
		return Math.max(0, Math.min(max, v));
	};
}

function assertArray(val) {
	return Array.isArray(val) ? val : [val];
}

function zeroArray(arr, length) {
	for (var i = 0; i < length; i++) {
		if (typeof arr[i] !== 'number') {
			arr[i] = 0;
		}
	}

	return arr;
}

module.exports = Color;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var colorNames = __webpack_require__(78);
var swizzle = __webpack_require__(149);

var reverseNames = {};

// create a list of reverse color names
for (var name in colorNames) {
	if (colorNames.hasOwnProperty(name)) {
		reverseNames[colorNames[name]] = name;
	}
}

var cs = module.exports = {
	to: {},
	get: {}
};

cs.get = function (string) {
	var prefix = string.substring(0, 3).toLowerCase();
	var val;
	var model;
	switch (prefix) {
		case 'hsl':
			val = cs.get.hsl(string);
			model = 'hsl';
			break;
		case 'hwb':
			val = cs.get.hwb(string);
			model = 'hwb';
			break;
		default:
			val = cs.get.rgb(string);
			model = 'rgb';
			break;
	}

	if (!val) {
		return null;
	}

	return {model: model, value: val};
};

cs.get.rgb = function (string) {
	if (!string) {
		return null;
	}

	var abbr = /^#([a-f0-9]{3,4})$/i;
	var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
	var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var keyword = /(\D+)/;

	var rgb = [0, 0, 0, 1];
	var match;
	var i;
	var hexAlpha;

	if (match = string.match(hex)) {
		hexAlpha = match[2];
		match = match[1];

		for (i = 0; i < 3; i++) {
			// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
			var i2 = i * 2;
			rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(abbr)) {
		match = match[1];
		hexAlpha = match[3];

		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i] + match[i], 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha + hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(rgba)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i + 1], 0);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(per)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(keyword)) {
		if (match[1] === 'transparent') {
			return [0, 0, 0, 0];
		}

		rgb = colorNames[match[1]];

		if (!rgb) {
			return null;
		}

		rgb[3] = 1;

		return rgb;
	} else {
		return null;
	}

	for (i = 0; i < 3; i++) {
		rgb[i] = clamp(rgb[i], 0, 255);
	}
	rgb[3] = clamp(rgb[3], 0, 1);

	return rgb;
};

cs.get.hsl = function (string) {
	if (!string) {
		return null;
	}

	var hsl = /^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hsl);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = (parseFloat(match[1]) + 360) % 360;
		var s = clamp(parseFloat(match[2]), 0, 100);
		var l = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);

		return [h, s, l, a];
	}

	return null;
};

cs.get.hwb = function (string) {
	if (!string) {
		return null;
	}

	var hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hwb);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var w = clamp(parseFloat(match[2]), 0, 100);
		var b = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
		return [h, w, b, a];
	}

	return null;
};

cs.to.hex = function () {
	var rgba = swizzle(arguments);

	return (
		'#' +
		hexDouble(rgba[0]) +
		hexDouble(rgba[1]) +
		hexDouble(rgba[2]) +
		(rgba[3] < 1
			? (hexDouble(Math.round(rgba[3] * 255)))
			: '')
	);
};

cs.to.rgb = function () {
	var rgba = swizzle(arguments);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
		: 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
};

cs.to.rgb.percent = function () {
	var rgba = swizzle(arguments);

	var r = Math.round(rgba[0] / 255 * 100);
	var g = Math.round(rgba[1] / 255 * 100);
	var b = Math.round(rgba[2] / 255 * 100);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
		: 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
};

cs.to.hsl = function () {
	var hsla = swizzle(arguments);
	return hsla.length < 4 || hsla[3] === 1
		? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
		: 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
};

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
cs.to.hwb = function () {
	var hwba = swizzle(arguments);

	var a = '';
	if (hwba.length >= 4 && hwba[3] !== 1) {
		a = ', ' + hwba[3];
	}

	return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
};

cs.to.keyword = function (rgb) {
	return reverseNames[rgb.slice(0, 3)];
};

// helpers
function clamp(num, min, max) {
	return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
	var str = num.toString(16).toUpperCase();
	return (str.length < 2) ? '0' + str : str;
}


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArrayish = __webpack_require__(150);

var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

var swizzle = module.exports = function swizzle(args) {
	var results = [];

	for (var i = 0, len = args.length; i < len; i++) {
		var arg = args[i];

		if (isArrayish(arg)) {
			// http://jsperf.com/javascript-array-concat-vs-push/98
			results = concat.call(results, slice.call(arg));
		} else {
			results.push(arg);
		}
	}

	return results;
};

swizzle.wrap = function (fn) {
	return function () {
		return fn(swizzle(arguments));
	};
};


/***/ }),
/* 150 */
/***/ (function(module, exports) {

module.exports = function isArrayish(obj) {
	if (!obj || typeof obj === 'string') {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && (obj.splice instanceof Function ||
			(Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));
};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(79);
var route = __webpack_require__(152);

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(79);

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*!
 * hotkeys-js v3.3.8
 * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.
 * 
 * Copyright (c) 2018 kenny wong <wowohoo@qq.com>
 * http://jaywcjlove.github.io/hotkeys
 * 
 * Licensed under the MIT license.
 */

var isff = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase().indexOf('firefox') > 0 : false;

// 绑定事件
function addEvent(object, event, method) {
  if (object.addEventListener) {
    object.addEventListener(event, method, false);
  } else if (object.attachEvent) {
    object.attachEvent('on' + event, function () {
      method(window.event);
    });
  }
}

// 修饰键转换成对应的键码
function getMods(modifier, key) {
  var mods = key.slice(0, key.length - 1);
  for (var i = 0; i < mods.length; i++) {
    mods[i] = modifier[mods[i].toLowerCase()];
  }return mods;
}

// 处理传的key字符串转换成数组
function getKeys(key) {
  if (!key) key = '';

  key = key.replace(/\s/g, ''); // 匹配任何空白字符,包括空格、制表符、换页符等等
  var keys = key.split(','); // 同时设置多个快捷键，以','分割
  var index = keys.lastIndexOf('');

  // 快捷键可能包含','，需特殊处理
  for (; index >= 0;) {
    keys[index - 1] += ',';
    keys.splice(index, 1);
    index = keys.lastIndexOf('');
  }

  return keys;
}

// 比较修饰键的数组
function compareArray(a1, a2) {
  var arr1 = a1.length >= a2.length ? a1 : a2;
  var arr2 = a1.length >= a2.length ? a2 : a1;
  var isIndex = true;

  for (var i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) === -1) isIndex = false;
  }
  return isIndex;
}

var _keyMap = { // 特殊键
  backspace: 8,
  tab: 9,
  clear: 12,
  enter: 13,
  return: 13,
  esc: 27,
  escape: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  del: 46,
  delete: 46,
  ins: 45,
  insert: 45,
  home: 36,
  end: 35,
  pageup: 33,
  pagedown: 34,
  capslock: 20,
  '⇪': 20,
  ',': 188,
  '.': 190,
  '/': 191,
  '`': 192,
  '-': isff ? 173 : 189,
  '=': isff ? 61 : 187,
  ';': isff ? 59 : 186,
  '\'': 222,
  '[': 219,
  ']': 221,
  '\\': 220
};

var _modifier = { // 修饰键
  '⇧': 16,
  shift: 16,
  '⌥': 18,
  alt: 18,
  option: 18,
  '⌃': 17,
  ctrl: 17,
  control: 17,
  '⌘': isff ? 224 : 91,
  cmd: isff ? 224 : 91,
  command: isff ? 224 : 91
};
var _downKeys = []; // 记录摁下的绑定键
var modifierMap = {
  16: 'shiftKey',
  18: 'altKey',
  17: 'ctrlKey'
};
var _mods = { 16: false, 18: false, 17: false };
var _handlers = {};

// F1~F12 特殊键
for (var k = 1; k < 20; k++) {
  _keyMap['f' + k] = 111 + k;
}

// 兼容Firefox处理
modifierMap[isff ? 224 : 91] = 'metaKey';
_mods[isff ? 224 : 91] = false;

var _scope = 'all'; // 默认热键范围
var isBindElement = false; // 是否绑定节点

// 返回键码
var code = function code(x) {
  return _keyMap[x.toLowerCase()] || _modifier[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);
};

// 设置获取当前范围（默认为'所有'）
function setScope(scope) {
  _scope = scope || 'all';
}
// 获取当前范围
function getScope() {
  return _scope || 'all';
}
// 获取摁下绑定键的键值
function getPressedKeyCodes() {
  return _downKeys.slice(0);
}

// 表单控件控件判断 返回 Boolean
function filter(event) {
  var target = event.target || event.srcElement;
  var tagName = target.tagName;
  // 忽略这些情况下快捷键无效

  return !(tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA' || target.isContentEditable);
}

// 判断摁下的键是否为某个键，返回true或者false
function isPressed(keyCode) {
  if (typeof keyCode === 'string') {
    keyCode = code(keyCode); // 转换成键码
  }
  return _downKeys.indexOf(keyCode) !== -1;
}

// 循环删除handlers中的所有 scope(范围)
function deleteScope(scope, newScope) {
  var handlers = void 0;
  var i = void 0;

  // 没有指定scope，获取scope
  if (!scope) scope = getScope();

  for (var key in _handlers) {
    if (Object.prototype.hasOwnProperty.call(_handlers, key)) {
      handlers = _handlers[key];
      for (i = 0; i < handlers.length;) {
        if (handlers[i].scope === scope) handlers.splice(i, 1);else i++;
      }
    }
  }

  // 如果scope被删除，将scope重置为all
  if (getScope() === scope) setScope(newScope || 'all');
}

// 清除修饰键
function clearModifier(event) {
  var key = event.keyCode || event.which || event.charCode;
  var i = _downKeys.indexOf(key);

  // 从列表中清除按压过的键
  if (i >= 0) _downKeys.splice(i, 1);

  // 修饰键 shiftKey altKey ctrlKey (command||metaKey) 清除
  if (key === 93 || key === 224) key = 91;
  if (key in _mods) {
    _mods[key] = false;

    // 将修饰键重置为false
    for (var k in _modifier) {
      if (_modifier[k] === key) hotkeys[k] = false;
    }
  }
}

// 解除绑定某个范围的快捷键
function unbind(key, scope) {
  var multipleKeys = getKeys(key);
  var keys = void 0;
  var mods = [];
  var obj = void 0;

  for (var i = 0; i < multipleKeys.length; i++) {
    // 将组合快捷键拆分为数组
    keys = multipleKeys[i].split('+');

    // 记录每个组合键中的修饰键的键码 返回数组
    if (keys.length > 1) mods = getMods(_modifier, keys);

    // 获取除修饰键外的键值key
    key = keys[keys.length - 1];
    key = key === '*' ? '*' : code(key);

    // 判断是否传入范围，没有就获取范围
    if (!scope) scope = getScope();

    // 如何key不在 _handlers 中返回不做处理
    if (!_handlers[key]) return;

    // 清空 handlers 中数据，
    // 让触发快捷键键之后没有事件执行到达解除快捷键绑定的目的
    for (var r = 0; r < _handlers[key].length; r++) {
      obj = _handlers[key][r];
      // 判断是否在范围内并且键值相同
      if (obj.scope === scope && compareArray(obj.mods, mods)) {
        _handlers[key][r] = {};
      }
    }
  }
}

// 对监听对应快捷键的回调函数进行处理
function eventHandler(event, handler, scope) {
  var modifiersMatch = void 0;

  // 看它是否在当前范围
  if (handler.scope === scope || handler.scope === 'all') {
    // 检查是否匹配修饰符（如果有返回true）
    modifiersMatch = handler.mods.length > 0;

    for (var y in _mods) {
      if (Object.prototype.hasOwnProperty.call(_mods, y)) {
        if (!_mods[y] && handler.mods.indexOf(+y) > -1 || _mods[y] && handler.mods.indexOf(+y) === -1) modifiersMatch = false;
      }
    }

    // 调用处理程序，如果是修饰键不做处理
    if (handler.mods.length === 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91] || modifiersMatch || handler.shortcut === '*') {
      if (handler.method(event, handler) === false) {
        if (event.preventDefault) event.preventDefault();else event.returnValue = false;
        if (event.stopPropagation) event.stopPropagation();
        if (event.cancelBubble) event.cancelBubble = true;
      }
    }
  }
}

// 处理keydown事件
function dispatch(event) {
  var asterisk = _handlers['*'];
  var key = event.keyCode || event.which || event.charCode;

  // 搜集绑定的键
  if (_downKeys.indexOf(key) === -1) _downKeys.push(key);

  // Gecko(Firefox)的command键值224，在Webkit(Chrome)中保持一致
  // Webkit左右command键值不一样
  if (key === 93 || key === 224) key = 91;

  if (key in _mods) {
    _mods[key] = true;

    // 将特殊字符的key注册到 hotkeys 上
    for (var k in _modifier) {
      if (_modifier[k] === key) hotkeys[k] = true;
    }

    if (!asterisk) return;
  }

  // 将modifierMap里面的修饰键绑定到event中
  for (var e in _mods) {
    if (Object.prototype.hasOwnProperty.call(_mods, e)) {
      _mods[e] = event[modifierMap[e]];
    }
  }

  // 表单控件过滤 默认表单控件不触发快捷键
  if (!hotkeys.filter.call(this, event)) return;

  // 获取范围 默认为all
  var scope = getScope();

  // 对任何快捷键都需要做的处理
  if (asterisk) {
    for (var i = 0; i < asterisk.length; i++) {
      if (asterisk[i].scope === scope) eventHandler(event, asterisk[i], scope);
    }
  }
  // key 不在_handlers中返回
  if (!(key in _handlers)) return;

  for (var _i = 0; _i < _handlers[key].length; _i++) {
    // 找到处理内容
    eventHandler(event, _handlers[key][_i], scope);
  }
}

function hotkeys(key, option, method) {
  var keys = getKeys(key); // 需要处理的快捷键列表
  var mods = [];
  var scope = 'all'; // scope默认为all，所有范围都有效
  var element = document; // 快捷键事件绑定节点
  var i = 0;

  // 对为设定范围的判断
  if (method === undefined && typeof option === 'function') {
    method = option;
  }

  if (Object.prototype.toString.call(option) === '[object Object]') {
    if (option.scope) scope = option.scope; // eslint-disable-line
    if (option.element) element = option.element; // eslint-disable-line
  }

  if (typeof option === 'string') scope = option;

  // 对于每个快捷键进行处理
  for (; i < keys.length; i++) {
    key = keys[i].split('+'); // 按键列表
    mods = [];

    // 如果是组合快捷键取得组合快捷键
    if (key.length > 1) mods = getMods(_modifier, key);

    // 将非修饰键转化为键码
    key = key[key.length - 1];
    key = key === '*' ? '*' : code(key); // *表示匹配所有快捷键

    // 判断key是否在_handlers中，不在就赋一个空数组
    if (!(key in _handlers)) _handlers[key] = [];

    _handlers[key].push({
      scope: scope,
      mods: mods,
      shortcut: keys[i],
      method: method,
      key: keys[i]
    });
  }
  // 在全局document上设置快捷键
  if (typeof element !== 'undefined' && !isBindElement) {
    isBindElement = true;
    addEvent(element, 'keydown', function (e) {
      dispatch(e);
    });
    addEvent(element, 'keyup', function (e) {
      clearModifier(e);
    });
  }
}

var _api = {
  setScope: setScope,
  getScope: getScope,
  deleteScope: deleteScope,
  getPressedKeyCodes: getPressedKeyCodes,
  isPressed: isPressed,
  filter: filter,
  unbind: unbind
};
for (var a in _api) {
  if (Object.prototype.hasOwnProperty.call(_api, a)) {
    hotkeys[a] = _api[a];
  }
}

if (typeof window !== 'undefined') {
  var _hotkeys = window.hotkeys;
  hotkeys.noConflict = function (deep) {
    if (deep && window.hotkeys === hotkeys) {
      window.hotkeys = _hotkeys;
    }
    return hotkeys;
  };
  window.hotkeys = hotkeys;
}

/* harmony default export */ __webpack_exports__["a"] = (hotkeys);


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(155)


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

const { map } = __webpack_require__(156)
const prng = __webpack_require__(80)
const spritesDrawer = __webpack_require__(159)
const parseSprite = __webpack_require__(160)

const SPRITETYPE = {
  biomeTexture: Symbol('the sprite is used as biome texture'),
  landmark: Symbol('the sprite is used as a landmark symbol')
}

const DEFAULT_RENDER_OPTIONS = {
  renderBiomesTexture: true,
  renderLandmarks: true,
  renderPoisson: false,
  renderVoronoiCells: false,
  renderVoronoiSites: false,
  fillVoronoiCells: false,
  scale: 1,
  smooth: false,
  forceUpdate: false,
  drawBoundingBox: false,
  debugPerf: false,
  colors: {
    background: 'white',
    voronoi: 'red',
    'TAIGA': '#66CCFF',
    'JUNGLE': '#FF8000',
    'SWAMP': '#3C421E',
    'TUNDRA': '#800000',
    'PLAINS': '#80FF00',
    'FOREST': '#008040',
    'DESERT': 'yellow',
    'WATER': 'blue'
  }
}

module.exports = class Renderer {
  constructor (canvas, {
    map = undefined,
    textures = {},
    spritesheets = {},
    seed = Math.random()
  } = {}) {
    if (!canvas || !canvas.getContext) throw new Error('wipmap-renderer must be linked to a canvas')

    this.canvas = canvas
    this.context = canvas.getContext('2d')

    this.map = map
    this.seed = seed

    prng.seed = this.seed
    spritesDrawer.context = this.context
    spritesDrawer.spritesheets = spritesheets

    this.textures = textures
  }

  get width () { return this.canvas.width }
  get height () { return this.canvas.height }

  update (landmarks, opts = {}) {
    opts = Object.assign({}, DEFAULT_RENDER_OPTIONS, opts)
    if (opts.debugPerf) console.time('total render duration')

    prng.reset()

    this.cachedSprites = (!this.cachedSprites || opts.forceUpdate)
      ? this.processBiomesTextureSprites([], opts)
      : this.cachedSprites

    // NOTE: landmark sprites aren't cached
    const queuedSprites = [...this.cachedSprites]
    this.processLandmarksSprites(queuedSprites, landmarks)

    // NOTE: sort sprites stack by Y coordinate to simulate Z depth
    queuedSprites.sort((a, b) => a.layerIndex - b.layerIndex || a.y - b.y)

    this.render(queuedSprites, opts)
    if (opts.debugPerf) console.timeEnd('total render duration')
  }

  processLandmarksSprites (renderQueue = [], landmarks = []) {
    landmarks.forEach(landmark => {
      const [x, y] = this.toWorld(landmark.position)
      landmark.points.forEach(([offx, offy]) => {
        renderQueue.push({
          type: SPRITETYPE.landmark,
          name: landmark.sprite.name,
          x: x + offx,
          y: y + offy + landmark.sprite.spritesheet.resolution / 2,
          spriteIndex: landmark.sprite.index
        })
      })
    })
    return renderQueue
  }

  processBiomesTextureSprites (renderQueue = [], opts) {
    Object.entries(this.map.points).forEach(([type, points]) => {
      const sprites = this.textures[type]
      if (!this.textures[type]) return

      points.forEach(point => {
        const [x, y] = this.toWorld(point)
        sprites
          .map(parseSprite)
          .forEach(sprite => {
            if (prng.random() < sprite.probability) {
              sprite.type = SPRITETYPE.biomeTexture
              sprite.x = x
              sprite.y = y
              renderQueue.push(sprite)
            }
          })
      })
    })

    return renderQueue
  }

  render (queue, opts) {
    this.context.globalAlpha = 1
    this.clear(opts.colors.background)
    this.context.imageSmoothingEnabled = opts.smooth

    if (opts.renderPoisson) this.renderPoisson(opts)

    this.renderSprites(queue, opts)

    if (opts.renderVoronoiCells) this.renderVoronoiCells(opts)
    if (opts.renderVoronoiSites) this.renderVoronoiSites(opts)
  }

  renderSprites (sprites, opts) {
    sprites.forEach(sprite => {
      if (!opts.renderBiomesTexture && sprite.type === SPRITETYPE.biomeTexture) return
      if (!opts.renderLandmarks && sprite.type === SPRITETYPE.landmark) return

      spritesDrawer.draw(sprite.name, [sprite.x, sprite.y, sprite.scale * opts.scale, sprite.opacity], {
        spriteIndex: prng.randomInt(0, 100),
        drawBoundingBox: opts.drawBoundingBox
      })
    })
  }

  renderVoronoiCells (opts) {
    this.context.save()

    this.context.strokeStyle = opts.colors.voronoi
    this.map.biomes.forEach(({ cell, type }) => {
      this.context.fillStyle = opts.colors[type] || DEFAULT_RENDER_OPTIONS.colors[type]
      this.context.beginPath()
      cell.forEach((point, index) => {
        const [x, y] = this.toWorld(point)
        if (index === 0) this.context.moveTo(x, y)
        else this.context.lineTo(x, y)
      })
      opts.fillVoronoiCells && this.context.closePath()
      opts.fillVoronoiCells && this.context.fill()
      this.context.stroke()
    })

    this.context.restore()
  }

  renderVoronoiSites (opts) {
    this.context.save()

    this.map.biomes.forEach(({ site, type }) => {
      this.context.fillStyle = opts.colors[type]

      const [x, y] = this.toWorld(site)
      this.drawCircle([x, y], 10)
    })

    this.context.restore()
  }

  renderPoisson (opts) {
    Object.entries(this.map.points).forEach(([type, points]) => {
      this.context.save()
      this.context.fillStyle = opts.colors[type]
      points.forEach(point => {
        const [x, y] = this.toWorld(point)
        this.context.fillRect(x - 2, y - 2, 4, 4)
      })
      this.context.restore()
    })
  }

  drawCircle ([x, y], radius) {
    this.context.beginPath()
    this.context.arc(x, y, radius, 0, 2 * Math.PI)
    this.context.fill()
  }

  clear (background) {
    this.context.clearRect(0, 0, this.width, this.height)

    if (!background) return
    this.context.save()
    this.context.fillStyle = background
    this.context.fillRect(0, 0, this.width, this.height)
    this.context.restore()
  }

  toWorld ([x, y]) {
    return [
      map(x, 0, this.map.width, 0, this.width),
      map(y, 0, this.map.height, 0, this.height)
    ]
  }

  toDataURL (format = 'image/png') {
    return this.canvas.toDataURL(format)
  }

  toBlob (callback) {
    return this.canvas.toBlob(callback)
  }
}


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const noise = __webpack_require__(157).noise

const clamp = (a, min, max) => Math.max(min, Math.min(a, max))
const normalize = (a, min, max) => map(a, min, max, 0, 1)
const map = (a, in_min, in_max, out_min, out_max) => (a - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
const lerp = (a, b, t) => a + t * (b - a)
const random = (a, b) => {
  if (b !== undefined) return lerp(a, b, Math.random())
  return lerp(0, a, Math.random())
}

function perlin (x, y, z) {
  if (arguments.length === 3) return noise.perlin3(x, y, z)
  if (arguments.length === 2) return noise.perlin2(x, y)
  if (arguments.length === 1) return noise.perlin2(x, null)
  return null
}

module.exports = {
  clamp,
  constrain: clamp,
  degrees: rad => rad * 180 / Math.PI,
  radians: deg => deg * Math.PI / 180,
  lerp,
  normalize,
  norm: normalize,
  map,
  random,
  rnd: random,
  perlin,
  noise: perlin
}


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * A speed-improved perlin and simplex noise algorithms for 2D.
 *
 * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 * Converted to Javascript by Joseph Gentle.
 *
 * Version 2012-03-09
 *
 * This code was placed in the public domain by its original author,
 * Stefan Gustavson. You may use it as you see fit, but
 * attribution is appreciated.
 *
 */

(function(global){
  var module = global.noise = {};

  function Grad(x, y, z) {
    this.x = x; this.y = y; this.z = z;
  }
  
  Grad.prototype.dot2 = function(x, y) {
    return this.x*x + this.y*y;
  };

  Grad.prototype.dot3 = function(x, y, z) {
    return this.x*x + this.y*y + this.z*z;
  };

  var grad3 = [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
               new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
               new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];

  var p = [151,160,137,91,90,15,
  131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
  190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
  88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
  77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
  102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
  135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
  5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
  223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
  129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
  251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
  49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
  138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
  // To remove the need for index wrapping, double the permutation table length
  var perm = new Array(512);
  var gradP = new Array(512);

  // This isn't a very good seeding function, but it works ok. It supports 2^16
  // different seed values. Write something better if you need more seeds.
  module.seed = function(seed) {
    if(seed > 0 && seed < 1) {
      // Scale the seed out
      seed *= 65536;
    }

    seed = Math.floor(seed);
    if(seed < 256) {
      seed |= seed << 8;
    }

    for(var i = 0; i < 256; i++) {
      var v;
      if (i & 1) {
        v = p[i] ^ (seed & 255);
      } else {
        v = p[i] ^ ((seed>>8) & 255);
      }

      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3[v % 12];
    }
  };

  module.seed(0);

  /*
  for(var i=0; i<256; i++) {
    perm[i] = perm[i + 256] = p[i];
    gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
  }*/

  // Skewing and unskewing factors for 2, 3, and 4 dimensions
  var F2 = 0.5*(Math.sqrt(3)-1);
  var G2 = (3-Math.sqrt(3))/6;

  var F3 = 1/3;
  var G3 = 1/6;

  // 2D simplex noise
  module.simplex2 = function(xin, yin) {
    var n0, n1, n2; // Noise contributions from the three corners
    // Skew the input space to determine which simplex cell we're in
    var s = (xin+yin)*F2; // Hairy factor for 2D
    var i = Math.floor(xin+s);
    var j = Math.floor(yin+s);
    var t = (i+j)*G2;
    var x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
    var y0 = yin-j+t;
    // For the 2D case, the simplex shape is an equilateral triangle.
    // Determine which simplex we are in.
    var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
    if(x0>y0) { // lower triangle, XY order: (0,0)->(1,0)->(1,1)
      i1=1; j1=0;
    } else {    // upper triangle, YX order: (0,0)->(0,1)->(1,1)
      i1=0; j1=1;
    }
    // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
    // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
    // c = (3-sqrt(3))/6
    var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
    var y1 = y0 - j1 + G2;
    var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
    var y2 = y0 - 1 + 2 * G2;
    // Work out the hashed gradient indices of the three simplex corners
    i &= 255;
    j &= 255;
    var gi0 = gradP[i+perm[j]];
    var gi1 = gradP[i+i1+perm[j+j1]];
    var gi2 = gradP[i+1+perm[j+1]];
    // Calculate the contribution from the three corners
    var t0 = 0.5 - x0*x0-y0*y0;
    if(t0<0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot2(x0, y0);  // (x,y) of grad3 used for 2D gradient
    }
    var t1 = 0.5 - x1*x1-y1*y1;
    if(t1<0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot2(x1, y1);
    }
    var t2 = 0.5 - x2*x2-y2*y2;
    if(t2<0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot2(x2, y2);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 70 * (n0 + n1 + n2);
  };

  // 3D simplex noise
  module.simplex3 = function(xin, yin, zin) {
    var n0, n1, n2, n3; // Noise contributions from the four corners

    // Skew the input space to determine which simplex cell we're in
    var s = (xin+yin+zin)*F3; // Hairy factor for 2D
    var i = Math.floor(xin+s);
    var j = Math.floor(yin+s);
    var k = Math.floor(zin+s);

    var t = (i+j+k)*G3;
    var x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
    var y0 = yin-j+t;
    var z0 = zin-k+t;

    // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
    // Determine which simplex we are in.
    var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
    var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
    if(x0 >= y0) {
      if(y0 >= z0)      { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
      else if(x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
      else              { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
    } else {
      if(y0 < z0)      { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
      else if(x0 < z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
      else             { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
    }
    // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
    // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
    // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
    // c = 1/6.
    var x1 = x0 - i1 + G3; // Offsets for second corner
    var y1 = y0 - j1 + G3;
    var z1 = z0 - k1 + G3;

    var x2 = x0 - i2 + 2 * G3; // Offsets for third corner
    var y2 = y0 - j2 + 2 * G3;
    var z2 = z0 - k2 + 2 * G3;

    var x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner
    var y3 = y0 - 1 + 3 * G3;
    var z3 = z0 - 1 + 3 * G3;

    // Work out the hashed gradient indices of the four simplex corners
    i &= 255;
    j &= 255;
    k &= 255;
    var gi0 = gradP[i+   perm[j+   perm[k   ]]];
    var gi1 = gradP[i+i1+perm[j+j1+perm[k+k1]]];
    var gi2 = gradP[i+i2+perm[j+j2+perm[k+k2]]];
    var gi3 = gradP[i+ 1+perm[j+ 1+perm[k+ 1]]];

    // Calculate the contribution from the four corners
    var t0 = 0.5 - x0*x0-y0*y0-z0*z0;
    if(t0<0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot3(x0, y0, z0);  // (x,y) of grad3 used for 2D gradient
    }
    var t1 = 0.5 - x1*x1-y1*y1-z1*z1;
    if(t1<0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
    }
    var t2 = 0.5 - x2*x2-y2*y2-z2*z2;
    if(t2<0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
    }
    var t3 = 0.5 - x3*x3-y3*y3-z3*z3;
    if(t3<0) {
      n3 = 0;
    } else {
      t3 *= t3;
      n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 32 * (n0 + n1 + n2 + n3);

  };

  // ##### Perlin noise stuff

  function fade(t) {
    return t*t*t*(t*(t*6-15)+10);
  }

  function lerp(a, b, t) {
    return (1-t)*a + t*b;
  }

  // 2D Perlin Noise
  module.perlin2 = function(x, y) {
    // Find unit grid cell containing point
    var X = Math.floor(x), Y = Math.floor(y);
    // Get relative xy coordinates of point within that cell
    x = x - X; y = y - Y;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255; Y = Y & 255;

    // Calculate noise contributions from each of the four corners
    var n00 = gradP[X+perm[Y]].dot2(x, y);
    var n01 = gradP[X+perm[Y+1]].dot2(x, y-1);
    var n10 = gradP[X+1+perm[Y]].dot2(x-1, y);
    var n11 = gradP[X+1+perm[Y+1]].dot2(x-1, y-1);

    // Compute the fade curve value for x
    var u = fade(x);

    // Interpolate the four results
    return lerp(
        lerp(n00, n10, u),
        lerp(n01, n11, u),
       fade(y));
  };

  // 3D Perlin Noise
  module.perlin3 = function(x, y, z) {
    // Find unit grid cell containing point
    var X = Math.floor(x), Y = Math.floor(y), Z = Math.floor(z);
    // Get relative xyz coordinates of point within that cell
    x = x - X; y = y - Y; z = z - Z;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255; Y = Y & 255; Z = Z & 255;

    // Calculate noise contributions from each of the eight corners
    var n000 = gradP[X+  perm[Y+  perm[Z  ]]].dot3(x,   y,     z);
    var n001 = gradP[X+  perm[Y+  perm[Z+1]]].dot3(x,   y,   z-1);
    var n010 = gradP[X+  perm[Y+1+perm[Z  ]]].dot3(x,   y-1,   z);
    var n011 = gradP[X+  perm[Y+1+perm[Z+1]]].dot3(x,   y-1, z-1);
    var n100 = gradP[X+1+perm[Y+  perm[Z  ]]].dot3(x-1,   y,   z);
    var n101 = gradP[X+1+perm[Y+  perm[Z+1]]].dot3(x-1,   y, z-1);
    var n110 = gradP[X+1+perm[Y+1+perm[Z  ]]].dot3(x-1, y-1,   z);
    var n111 = gradP[X+1+perm[Y+1+perm[Z+1]]].dot3(x-1, y-1, z-1);

    // Compute the fade curve value for x, y, z
    var u = fade(x);
    var v = fade(y);
    var w = fade(z);

    // Interpolate
    return lerp(
        lerp(
          lerp(n000, n100, u),
          lerp(n001, n101, u), w),
        lerp(
          lerp(n010, n110, u),
          lerp(n011, n111, u), w),
       v);
  };

})( false ? this : module.exports);

/***/ }),
/* 158 */
/***/ (function(module, exports) {

function random(seed) {
	function _seed(s) {
		if ((seed = (s|0) % 2147483647) <= 0) {
			seed += 2147483646;
		}
	}

	function _nextInt() {
		return seed = seed * 48271 % 2147483647;
	}

	function _nextFloat() {
		return (_nextInt() - 1) / 2147483646;
	}

	_seed(seed);

	return {
		seed: _seed,
		nextInt: _nextInt,
		nextFloat: _nextFloat
	};
}

module.exports = random;


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

const prng = __webpack_require__(80)

let spritesheets = {}
let context = null

module.exports = {
  get spritesheets () { return spritesheets },
  set spritesheets (_spritesheets) { spritesheets = _spritesheets },

  get context () { return context },
  set context (_context) { context = _context },

  draw: (spriteName, [x, y, scale = 1, alpha = 1], { spriteIndex, drawBoundingBox = false } = {}) => {
    if (!context) throw new Error('wipmap-render/sprites must have a drawing context registerd')

    const spritesheet = spritesheets[spriteName]
    if (!spritesheet) return

    // NOTE: if the spritesheet's sprite index is undefined, randomly select a sprite in the spritesheet
    spriteIndex = spriteIndex === undefined
      ? Math.floor(prng.randomInt(0, spritesheet.length || 0))
      : spriteIndex % spritesheet.length

    // NOTE: spritesheet with no resolution are just plain image, so using width/height instead of resolution
    const [spriteWidth, spriteHeight] = spritesheet.resolution
      ? new Array(2).fill(spritesheet.resolution)
      : [spritesheet.width, spritesheet.height]

    const i = spriteIndex * spriteWidth
    const sx = i % spritesheet.width
    const sy = ((i - sx) / spritesheet.width) * spriteHeight
    const sw = spriteWidth
    const sh = spriteHeight
    const dx = Math.floor(x - (spriteWidth * scale) / 2)
    // NOTE: drawing the spritesheet from the bottom of its hitbox
    const dy = Math.floor(y - (spriteHeight * scale))
    const dw = Math.floor(spriteWidth * scale)
    const dh = Math.floor(spriteHeight * scale)

    context.globalAlpha = alpha
    context.drawImage(spritesheet, sx, sy, sw, sh, dx, dy, dw, dh)
    if (drawBoundingBox) context.strokeRect(dx, dy, dw, dh)
  }
}


/***/ }),
/* 160 */
/***/ (function(module, exports) {

/**
 * NOTE:
 * there is two possible data-structures to describe a sprite object:
 *
 * array: ["filename", probability[,scale[,opacity[,layerIndex]]]]
 * object:
    {
      "file": (string),
      "density": (float),
      "scale": (float),
      "opacity": (float),
      "layer": (int)
    }
 *
 * This module takes care of converting the first data-structure (mainly here for
 * retro-compatiblity purpose) to the second one.
 */

module.exports = o => {
  const isArr = Array.isArray(o)
  return {
    name: isArr ? o[0] : o.file,
    probability: isArr ? o[1] : o.density,
    scale: (isArr ? o[2] : o.scale) || 1,
    opacity: (isArr ? o[3] : o.opacity) || 1,
    layerIndex: (isArr ? o[4] : o.layer) || 0
  }
}


/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return settings; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tiny_emitter__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tiny_emitter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_tiny_emitter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_keypather_set__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_keypather_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_keypather_set__);




/* global Blob */

var events = new __WEBPACK_IMPORTED_MODULE_1_tiny_emitter___default.a();
var NS = '__SETTINGS.';

var SETTINGS = {
  x: 0,
  y: 0,
  generation: {
    seed: 'wipmap',
    width: 3,
    height: 3,
    decimals: 3,

    jitter: 0.4,
    distortion: 0.9,
    gradient: 0.8,

    poissonDensity: 0.4,

    probablities: {
      water: 0,
      forest: 0
    },

    biomesMap: [['SWAMP', 'FOREST', 'SWAMP'], ['MOUNTAINS', 'PLAINS', 'FOREST'], ['MOUNTAINS', 'DESERT', 'DESERT']]
  },
  rendering: {
    width: 800,
    height: 800,
    smooth: true,
    forceUpdate: true,
    debugPerf: !window.isProduction,
    drawBoundingBox: false,

    renderBiomesTexture: true,
    renderLandmarks: true,

    renderPoisson: false,
    renderVoronoiCells: false,
    renderVoronoiSites: false,
    scale: 1,
    colors: {
      background: '#ffffff',
      voronoi: '#AAAAAA',
      'SWAMP': '#cc65bb',
      'FOREST': '#1dca63',
      'MOUNTAINS': '#a1b575',
      'PLAINS': '#abf1ac',
      'DESERT': '#fffc92',
      'WATER': '#85e3ff'
    }
  },
  textures: {}
};

var GUI_CORRESPONDENCE_TABLE = {
  'gui.panel.generation/gui.panel.generation.seed': 'generation.seed',
  'gui.panel.generation/gui.panel.generation.x': 'x',
  'gui.panel.generation/gui.panel.generation.y': 'y',
  'gui.panel.generation/gui.panel.generation.voronoiWidth': 'generation.width',
  'gui.panel.generation/gui.panel.generation.voronoiHeight': 'generation.height',
  'gui.panel.generation/gui.panel.generation.jitter': 'generation.jitter',
  'gui.panel.generation/gui.panel.generation.distortion': 'generation.distortion',
  'gui.panel.generation/gui.panel.generation.gradient': 'generation.gradient',
  'gui.panel.generation/gui.panel.generation.poissonDensity': 'generation.poissonDensity',
  'gui.panel.generation/gui.panel.generation.water': 'generation.probablities.water',
  'gui.panel.rendering/gui.panel.rendering.width': 'rendering.width',
  'gui.panel.rendering/gui.panel.rendering.height': 'rendering.height',
  'gui.panel.rendering/gui.panel.rendering.smooth': 'rendering.smooth',
  'gui.panel.rendering/gui.panel.rendering.renderBiomesTexture': 'rendering.renderBiomesTexture',
  'gui.panel.rendering/gui.panel.rendering.renderPoisson': 'rendering.renderPoisson',
  'gui.panel.rendering/gui.panel.rendering.renderVoronoiCells': 'rendering.renderVoronoiCells',
  'gui.panel.rendering/gui.panel.rendering.renderVoronoiSites': 'rendering.renderVoronoiSites',
  'gui.panel.rendering/gui.panel.rendering.scale': 'rendering.scale',
  'gui.panel.rendering/gui.panel.rendering.voronoiColor': 'rendering.colors.voronoi',

  // TODO
  // 'gui.panel.rendering/gui.panel.rendering.backgroundColor': 'rendering.colors.background',
  // 'gui.panel.rendering/gui.panel.rendering.backgroundAlpha': 'rendering.colors.background',

  'gui.panel.legend/gui.panel.legend.DESERT': 'rendering.colors.DESERT',
  'gui.panel.legend/gui.panel.legend.FOREST': 'rendering.colors.FOREST',
  'gui.panel.legend/gui.panel.legend.MOUNTAINS': 'rendering.colors.MOUNTAINS',
  'gui.panel.legend/gui.panel.legend.PLAINS': 'rendering.colors.PLAINS',
  'gui.panel.legend/gui.panel.legend.SWAMP': 'rendering.colors.SWAMP',
  'gui.panel.legend/gui.panel.legend.WATER': 'rendering.colors.WATER',
  'gui.panel.textures/gui.panel.textures.texturesDescriber': 'textures'
};

if (!window.isProduction) window.settings = SETTINGS;

var settings = SETTINGS;
/* harmony default export */ __webpack_exports__["a"] = ({
  GUI_CORRESPONDENCE_TABLE: GUI_CORRESPONDENCE_TABLE,
  watch: function watch(callback) {
    return events.on(NS + 'update', callback);
  },
  update: function update(key) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return function (value) {
      __WEBPACK_IMPORTED_MODULE_2_keypather_set___default()(SETTINGS, key, value);
      events.emit.apply(events, [NS + 'update'].concat(args));
    };
  },
  toBlob: function toBlob() {
    return new Blob([__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(SETTINGS, null, 2)], { type: 'application/json' });
  },
  toJSON: function toJSON() {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(SETTINGS, null, 2);
  }
});

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

const keypathReducer = __webpack_require__(81)
const setOperation = __webpack_require__(173)

module.exports = setKeypath

function setKeypath (ctx, keypath, val, opts) {
  return keypathReducer({
    ctx: ctx,
    keypath: keypath,
    val: val
  }, setOperation, opts)
}


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = Object({"NODE_ENV":"production"}).NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(165);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(166);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27), __webpack_require__(53)))

/***/ }),
/* 165 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 166 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @module 101/defaults
 */

var isObject = __webpack_require__(83);
var isBoolean = __webpack_require__(168);
var exists = __webpack_require__(17);

/**
 * Mixes in properties from source into target when
 * the property is not a property of `target`
 * @param  {Object} [target] Mix into
 * @param  {Object} source The defaults description
 * @return {Object}        THe resulting target
 */
module.exports = defaults;

function defaults (target, source, deep) {
  if (arguments.length === 1) {
    source = target;
    return function (target) {
      return defaults(target, source);
    };
  } else if (isBoolean(source)) {
    deep = source;
    source = target;
    return function (target) {
      return defaults(target, source, deep);
    };
  }
  target = target || {};
  deep = deep || false;
  if (!source) {
    return target;
  }
  return reduceObject(target, source, deep);
}

function reduceObject (target, source, deep) {
  return Object.keys(source).reduce(function (target, key) {
    if (isObject(target[key]) && isObject(source[key]) && deep) {
      reduceObject(target[key], source[key]);
      return target;
    }
    target[key] = exists(target[key]) ? target[key] : source[key];
    return target;
  }, target);
}


/***/ }),
/* 168 */
/***/ (function(module, exports) {

/**
 * @module 101/is-boolean
 */

/**
 * Functional version of val typeof 'boolean'
 * @function module:101/is-boolean
 * @param {*} val - value checked to be a boolean
 * @return {boolean} Whether the value is a boolean or not
 */
module.exports = isBoolean;

function isBoolean (val) {
  return typeof val === 'boolean';
}

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(170);

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 170 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var assertErr = __webpack_require__(172)

module.exports = stringReduce

/**
 * reduce a string to a value
 * @param  {string}   string          string to reduce
 * @param  {function} reducerCb    reducer function
 * @param  {*}        initialValue reduce initial value
 * @return {*} result
 */
function stringReduce (string, reducerCallback, initialValue) {
  if (string.length === 0) {
    assertErr(initialValue, TypeError, 'Reduce of empty string with no initial value')
    return initialValue
  }
  var initialValuePassed = arguments.length === 3
  var result
  var startIndex
  if (initialValuePassed) {
    // initial value, initialize reduce state
    result = initialValue
    startIndex = 0
  } else {
    // no initial value
    if (string.length === 1) {
      return string.charAt(0)
    }
    // no initial value, initialize reduce state
    result = string.charAt(0)
    startIndex = 1
  }
  for (var i = startIndex; i < string.length; i++) {
    result = reducerCallback(result, string.charAt(i), i, string)
  }
  return result
}


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__filename) {var assert = __webpack_require__(55)

var assign = __webpack_require__(77)
var esc = __webpack_require__(82)

var fileRE = new RegExp('.*' + esc(__filename))
var createErrWithProps = function (message, props) {
  var err = new Error(message)
  if (props) {
    assign(err, props)
  }
  return err
}

module.exports = assertErr

function assertErr (value, Err/*, ...args */) {
  assert(typeof Err === 'function', '"Error" must be a function')
  if (Err === Error) Err = createErrWithProps
  var args = Array.prototype.slice.call(arguments, 2)
  assert(args.length <= 5, 'assertErr does not support more than five Error args')
  if (!value) {
    var err = createInstance(Err, args)
    // remove `assertErr` and `createInstance` from stack
    if (err.stack) {
      var stackLines = err.stack
        .split('\n')
        .filter(notMatches(fileRE))
      err.stack = stackLines.join('\n')
    }
    // throw the error
    throw err
  }
}

function createInstance (Class, args) {
  return (args.length === 0)
    ? new Class()
    : (args.length === 1)
      ? new Class(args[0])
      : (args.length === 2)
        ? new Class(args[0], args[1])
        : (args.length === 3)
          ? new Class(args[0], args[1], args[2])
          : (args.length === 4)
            ? new Class(args[0], args[1], args[2], args[3])
            : new Class(args[0], args[1], args[2], args[3], args[4])
}

function notMatches (re) {
  return function (str) {
    return !re.test(str)
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, "/index.js"))

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var assert = __webpack_require__(55)
var debug = __webpack_require__(84)('keypather:operations:set')
var exists = __webpack_require__(17)
var last = __webpack_require__(174)

var isLastKey = __webpack_require__(176)
var normalizedKeypath = __webpack_require__(177)

var getOperation = __webpack_require__(85)

module.exports = function setOperation (obj, key, state, opts) {
  debug('setOperation %O %O %O', { obj: obj, key: key }, opts, state)
  // if obj does not exist and opts.force, create
  if (opts.force) obj = createOperation(obj, key, state, opts)
  // if obj exists, set val
  if (exists(obj)) {
    if (isLastKey(state)) {
      debug('SET %O %O %O', obj, state.keypath, state.val)
      obj[key] = state.val
    } else if (opts.force) {
      debug('TMP CREATE %O %O %O', obj, key, {}, state.keypath)
      var keypath = normalizedKeypath(state.keypathSplit.concat(key))
      state.createOperation.createdKeypaths[keypath] = true
      obj[key] = obj[key] || {}
    }
    return obj[key]
  }
  var offset = state.insideBracketString ? 2 : 1
  offset = Math.max(offset, 0)
  var atKeypath = state.keypath.slice(0, state.keyStart - offset)
  throw new TypeError(
    "Cannot read property '" + key + "' of undefined (at keypath '" + atKeypath + "' of '" + state.keypath + "')"
  )
}

function createOperation (obj, key, state, opts) {
  // if no parentCtx, obj should be root
  if (!state.parentCtx) return obj
  var objKey = last(state.keypathSplit)
  // this shouldn't happen: if parentCtx exists, objKey will exist
  assert(exists(objKey), 'invalid state.keypathSplit')

  // normalize keypath
  var keypath
  var isArrayKey = typeof key === 'number'

  if (!exists(obj)) {
    // obj does not exist
    // create object
    obj = isArrayKey ? [] : {}
    state.parentCtx[objKey] = state.ctx = obj
    // mark object as created
    keypath = normalizedKeypath(state.keypathSplit)
    state.createOperation.createdKeypaths[keypath] = true
  } else {
    // obj exists
    keypath = normalizedKeypath(state.keypathSplit)
    debug('CONVERT %O %O %O', obj, objKey, keypath)
    var objWasCreated = state.createOperation.createdKeypaths[keypath]
    if (objWasCreated && !Array.isArray(obj) && isArrayKey) {
      // if obj was created, is object, and found array key: convert object to array
      obj = Object.keys(obj).reduce(function (arr, key) {
        arr[key] = obj[key]
        return arr
      }, [])
      state.parentCtx[objKey] = state.ctx = obj
    }
  }

  debug('createOperation %O %O %O', { obj: obj, key: key }, opts, state)
  return obj
}



/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @module 101/last
 */

var isObject = __webpack_require__(83);
var exists = __webpack_require__(17);
var isFunction = __webpack_require__(175);

/**
 * Returns the last value of the item.
 * @function module:101/last
 * @param {array|string|object} item - item whose last value is returned
 * @return {*} Last value of an array. Last char of a string. Last value of an object. Last char of item.toString() for everything else.
 */
module.exports = last;

function last (item) {
  var val;
  if (exists(item && item.length) && !isFunction(item)) {
    val = item[item.length - 1];
  }
  else {
    val = (item && item.toString) ? last(item.toString()) : undefined;
  }
  return val;
}

/***/ }),
/* 175 */
/***/ (function(module, exports) {

/**
 * @module 101/is-function
 */

/**
 * Functional version of val typeof 'function'
 * @function module:101/is-function
 * @param {*} val - value checked to be a function
 * @return {boolean} Whether the value is a function or not
 */
module.exports = isFunction;

function isFunction (v) {
  return typeof v === 'function';
}

/***/ }),
/* 176 */
/***/ (function(module, exports) {

module.exports = function isLastKey (state) {
  return (state.i + 1) >= state.keypath.length
}

/***/ }),
/* 177 */
/***/ (function(module, exports) {

// i just needed a way to create a unique string from keypath split,
// that would not collide with other keypath split strings.
// i didnt want a simple join, as that would be more likely to cause collisions
module.exports = function normalizedKeypath (keypathSplit) {
  return keypathSplit.reduce(function (str, key, i) {
    return str += i + ':' + key + ','
  }, '')
}

/***/ }),
/* 178 */
/***/ (function(module, exports) {

module.exports = function throwUndefinedErr (key, state) {
  var atKeypath = state.keypath.slice(0, state.sectionStart)
  throw new TypeError(
    "Cannot read property '" + key + "' of undefined (for keypath '" + atKeypath + "')"
  )
}

/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_taggedTemplateLiteral__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_taggedTemplateLiteral___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_taggedTemplateLiteral__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_bel__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_bel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_bel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_abstractions_DomComponent__ = __webpack_require__(93);







var _templateObject = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_taggedTemplateLiteral___default()(['<div class=\'stopwatch\'></div>'], ['<div class=\'stopwatch\'></div>']);




var StopWatch = function (_DomComponent) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(StopWatch, _DomComponent);

  function StopWatch(prefix, suffix) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, StopWatch);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (StopWatch.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(StopWatch)).call(this));

    _this.prefix = prefix;
    _this.suffix = suffix;
    _this.bindFuncs(['start', 'stop']);
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(StopWatch, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_6_bel___default()(_templateObject);
    }
  }, {
    key: 'start',
    value: function start() {
      if (this.mounted) this.startTime = Date.now();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.duration = Date.now() - this.startTime;
      if (this.mounted) this.refs.base.innerHTML = this.prefix + this.duration + this.suffix;
    }
  }]);

  return StopWatch;
}(__WEBPACK_IMPORTED_MODULE_7_abstractions_DomComponent__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (StopWatch);

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(181);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(16);
var $getPrototypeOf = __webpack_require__(67);

__webpack_require__(52)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(183), __esModule: true };

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(184);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(5).f });


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(186), __esModule: true };

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(13);
__webpack_require__(23);
module.exports = __webpack_require__(59).f('iterator');


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(188), __esModule: true };

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(189);
__webpack_require__(36);
__webpack_require__(192);
__webpack_require__(193);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(11);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(63);
var META = __webpack_require__(33).KEY;
var $fails = __webpack_require__(10);
var shared = __webpack_require__(44);
var setToStringTag = __webpack_require__(22);
var uid = __webpack_require__(31);
var wks = __webpack_require__(3);
var wksExt = __webpack_require__(59);
var wksDefine = __webpack_require__(60);
var enumKeys = __webpack_require__(190);
var isArray = __webpack_require__(88);
var anObject = __webpack_require__(7);
var isObject = __webpack_require__(4);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(41);
var createDesc = __webpack_require__(20);
var _create = __webpack_require__(29);
var gOPNExt = __webpack_require__(191);
var $GOPD = __webpack_require__(90);
var $DP = __webpack_require__(5);
var $keys = __webpack_require__(15);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(89).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(25).f = $propertyIsEnumerable;
  __webpack_require__(50).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(18)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(15);
var gOPS = __webpack_require__(50);
var pIE = __webpack_require__(25);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(12);
var gOPN = __webpack_require__(89).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(60)('asyncIterator');


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(60)('observable');


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(195), __esModule: true };

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(196);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(1);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(197).set });


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(7);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(8)(Function.call, __webpack_require__(90).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(199), __esModule: true };

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(200);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(29) });


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

var attrToProp = __webpack_require__(202)

var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_EQ = 11, ATTR_BREAK = 12
var COMMENT = 13

module.exports = function (h, opts) {
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }
  if (opts.attrToProp !== false) {
    h = attrToProp(h)
  }

  return function (strings) {
    var state = TEXT, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        if (xstate === OPEN) {
          if (reg === '/') {
            p.push([ OPEN, '/', arg ])
            reg = ''
          } else {
            p.push([ OPEN, arg ])
          }
        } else {
          p.push([ VAR, xstate, arg ])
        }
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === ATTR_EQ) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else parts[i][1]==="" || (cur[1][key] = concat(cur[1][key], parts[i][1]));
          } else if (parts[i][0] === VAR
          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else parts[i][2]==="" || (cur[1][key] = concat(cur[1][key], parts[i][2]));
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            if (parts[i][0] === CLOSE) {
              i--
            }
            break
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === TEXT) {
        cur[2].push(p[1])
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === ATTR_VALUE_W) state = ATTR
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg])
          reg = ''
          state = OPEN
        } else if (c === '>' && !quot(state) && state !== COMMENT) {
          if (state === OPEN && reg.length) {
            res.push([OPEN,reg])
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }
          res.push([CLOSE])
          reg = ''
          state = TEXT
        } else if (state === COMMENT && /-$/.test(reg) && c === '-') {
          if (opts.comments) {
            res.push([ATTR_VALUE,reg.substr(0, reg.length - 1)],[CLOSE])
          }
          reg = ''
          state = TEXT
        } else if (state === OPEN && /^!--$/.test(reg)) {
          if (opts.comments) {
            res.push([OPEN, reg],[ATTR_KEY,'comment'],[ATTR_EQ])
          }
          reg = c
          state = COMMENT
        } else if (state === TEXT || state === COMMENT) {
          reg += c
        } else if (state === OPEN && c === '/' && reg.length) {
          // no-op, self closing tag without a space <br/>
        } else if (state === OPEN && /\s/.test(c)) {
          if (reg.length) {
            res.push([OPEN, reg])
          }
          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[^\s"'=/]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else state = ATTR
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

var hasOwn = Object.prototype.hasOwnProperty
function has (obj, key) { return hasOwn.call(obj, key) }

var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr', '!--',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }


/***/ }),
/* 202 */
/***/ (function(module, exports) {

module.exports = attributeToProperty

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function attributeToProperty (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}


/***/ }),
/* 203 */
/***/ (function(module, exports) {

var trailingNewlineRegex = /\n[\s]+$/
var leadingNewlineRegex = /^\n[\s]+/
var trailingSpaceRegex = /[\s]+$/
var leadingSpaceRegex = /^[\s]+/
var multiSpaceRegex = /[\n\s]+/g

var TEXT_TAGS = [
  'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'data', 'dfn', 'em', 'i',
  'kbd', 'mark', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'amp', 'small', 'span',
  'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr'
]

var VERBATIM_TAGS = [
  'code', 'pre', 'textarea'
]

module.exports = function appendChild (el, childs) {
  if (!Array.isArray(childs)) return

  var nodeName = el.nodeName.toLowerCase()

  var hadText = false
  var value, leader

  for (var i = 0, len = childs.length; i < len; i++) {
    var node = childs[i]
    if (Array.isArray(node)) {
      appendChild(el, node)
      continue
    }

    if (typeof node === 'number' ||
      typeof node === 'boolean' ||
      typeof node === 'function' ||
      node instanceof Date ||
      node instanceof RegExp) {
      node = node.toString()
    }

    var lastChild = el.childNodes[el.childNodes.length - 1]

    // Iterate over text nodes
    if (typeof node === 'string') {
      hadText = true

      // If we already had text, append to the existing text
      if (lastChild && lastChild.nodeName === '#text') {
        lastChild.nodeValue += node

      // We didn't have a text node yet, create one
      } else {
        node = document.createTextNode(node)
        el.appendChild(node)
        lastChild = node
      }

      // If this is the last of the child nodes, make sure we close it out
      // right
      if (i === len - 1) {
        hadText = false
        // Trim the child text nodes if the current node isn't a
        // node where whitespace matters.
        if (TEXT_TAGS.indexOf(nodeName) === -1 &&
          VERBATIM_TAGS.indexOf(nodeName) === -1) {
          value = lastChild.nodeValue
            .replace(leadingNewlineRegex, '')
            .replace(trailingSpaceRegex, '')
            .replace(trailingNewlineRegex, '')
            .replace(multiSpaceRegex, ' ')
          if (value === '') {
            el.removeChild(lastChild)
          } else {
            lastChild.nodeValue = value
          }
        } else if (VERBATIM_TAGS.indexOf(nodeName) === -1) {
          // The very first node in the list should not have leading
          // whitespace. Sibling text nodes should have whitespace if there
          // was any.
          leader = i === 0 ? '' : ' '
          value = lastChild.nodeValue
            .replace(leadingNewlineRegex, leader)
            .replace(leadingSpaceRegex, ' ')
            .replace(trailingSpaceRegex, '')
            .replace(trailingNewlineRegex, '')
            .replace(multiSpaceRegex, ' ')
          lastChild.nodeValue = value
        }
      }

    // Iterate over DOM nodes
    } else if (node && node.nodeType) {
      // If the last node was a text node, make sure it is properly closed out
      if (hadText) {
        hadText = false

        // Trim the child text nodes if the current node isn't a
        // text node or a code node
        if (TEXT_TAGS.indexOf(nodeName) === -1 &&
          VERBATIM_TAGS.indexOf(nodeName) === -1) {
          value = lastChild.nodeValue
            .replace(leadingNewlineRegex, '')
            .replace(trailingNewlineRegex, '')
            .replace(multiSpaceRegex, ' ')

          // Remove empty text nodes, append otherwise
          if (value === '') {
            el.removeChild(lastChild)
          } else {
            lastChild.nodeValue = value
          }
        // Trim the child nodes if the current node is not a node
        // where all whitespace must be preserved
        } else if (VERBATIM_TAGS.indexOf(nodeName) === -1) {
          value = lastChild.nodeValue
            .replace(leadingSpaceRegex, ' ')
            .replace(leadingNewlineRegex, '')
            .replace(trailingNewlineRegex, '')
            .replace(multiSpaceRegex, ' ')
          lastChild.nodeValue = value
        }
      }

      // Store the last nodename
      var _nodeName = node.nodeName
      if (_nodeName) nodeName = _nodeName.toLowerCase()

      // Append the node to the DOM
      el.appendChild(node)
    }
  }
}


/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tiny_emitter__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tiny_emitter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tiny_emitter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_utils_noop__ = __webpack_require__(35);



var events = new __WEBPACK_IMPORTED_MODULE_0_tiny_emitter___default.a();
var NS = '__CANVAS.';

var percentScale = 1;
var canvas = document.querySelector('.map-canvas');
updateSize({ width: 800, height: 600 });

/* harmony default export */ __webpack_exports__["a"] = ({
  get element() {
    return canvas;
  },
  get width() {
    return canvas.width;
  },
  get height() {
    return canvas.height;
  },

  watch: function watch(callback) {
    return events.on(NS + 'resize', callback);
  },

  scale: scale,
  resize: updateSize
});

function updateSize() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      width = _ref.width,
      height = _ref.height;

  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : __WEBPACK_IMPORTED_MODULE_1_utils_noop__["a" /* default */];

  canvas.width = width || canvas.width;
  canvas.height = height || canvas.height;
  canvas.style.width = canvas.width + 'px';
  canvas.style.height = canvas.height + 'px';

  scale(percentScale);
  events.emit(NS + 'resize', canvas);

  callback();
}

function canFit(percent) {
  return canvas.width * percent < window.innerWidth && canvas.height * percent < window.innerHeight;
}

function scale(percent) {
  percentScale = percent;
  if (canFit(percent)) {
    canvas.classList.add('is-centered');
    canvas.style.transform = 'translate(-50%, -50%) scale(' + percent + ')';
  } else {
    canvas.classList.remove('is-centered');
    canvas.style.transform = 'scale(' + percent + ')';
  }
}

/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_values__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_values___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_values__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_object_keys__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_slicedToArray__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_object_entries__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_object_entries___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_object_entries__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_quicksettings__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_quicksettings___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_quicksettings__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_utils_noop__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_utils_make_textarea_indentable__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_utils_make_textarea_autoheight__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_keypather_get__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_keypather_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_keypather_get__);













/* global FileReader */

var NS = 'WIPMAP.';

/* harmony default export */ __webpack_exports__["a"] = (function (tree) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$DOMContainer = _ref.DOMContainer,
      DOMContainer = _ref$DOMContainer === undefined ? document.body : _ref$DOMContainer,
      _ref$localize = _ref.localize,
      localize = _ref$localize === undefined ? function (key) {
    return key;
  } : _ref$localize,
      _ref$replacer = _ref.replacer,
      replacer = _ref$replacer === undefined ? function (inputID) {
    return inputID;
  } : _ref$replacer;

  var panels = {};
  var enabled = false;
  var visible = true;

  __WEBPACK_IMPORTED_MODULE_7_quicksettings___default.a.useExtStyleSheet();
  var qsStore = __WEBPACK_IMPORTED_MODULE_7_quicksettings___default.a.create(0, 0).hide();

  // NOTE: QS uses direct text label as internal identifier,
  // so localization won't properly work in some use case.
  var internalIDs = {};
  var _localize = localize;
  localize = function localize(value) {
    internalIDs[value] = _localize(value);
    return internalIDs[value];
  };

  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_object_entries___default()(tree).forEach(function (_ref2) {
    var _ref3 = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_slicedToArray___default()(_ref2, 2),
        title = _ref3[0],
        panelControls = _ref3[1];

    var x = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_object_keys___default()(panels).length * 205;
    var y = 0;
    var panel = __WEBPACK_IMPORTED_MODULE_7_quicksettings___default.a.create(x, y, localize(title), DOMContainer).hide();
    panel.debouncedCallbacks = {};

    // Adding the controls to the panel
    panelControls.forEach(function (_ref4) {
      var _ref5 = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_slicedToArray___default()(_ref4, 5),
          name = _ref5[0],
          method = _ref5[1],
          args = _ref5[2],
          callback = _ref5[3],
          _ref5$ = _ref5[4],
          debounceDelay = _ref5$ === undefined ? window.Worker ? -1 : 300 : _ref5$;

      var debouncedCallback = debounceDelay > 0 ? function (value) {
        window.clearTimeout(panel.debouncedCallbacks[name]);
        panel.debouncedCallbacks[name] = window.setTimeout(function () {
          return callback(value);
        }, debounceDelay);
      } : callback;

      if (method === 'addJSON') addJSONInput(panel, name, args, debouncedCallback);else panel[method].apply(panel, [localize(name)].concat(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray___default()(args), [debouncedCallback]));
    });

    // NOTE: implementing custom collapsing behavior with persistent storage capabilities
    panel.setCollapsible(false);
    qsStore.addBoolean(title + '-collapsed', false, function (value) {
      return panel[value ? 'collapse' : 'expand']();
    });
    panel._titleBar.addEventListener('dblclick', function () {
      return qsStore.setValue(title + '-collapsed', !panel._collapsed);
    }, true);

    // NOTE: adding persistent storage capabilities to panel position
    qsStore.addText(title + '-position', x + ';' + y, function (value) {
      return panel.setPosition.apply(panel, __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray___default()(value.split(';').map(function (v) {
        return +v;
      })));
    });
    panel._titleBar.addEventListener('mouseup', function () {
      return qsStore.setValue(title + '-position', panel._panel.offsetLeft + ';' + panel._panel.offsetTop);
    });

    panels[title] = panel;
  });

  save();

  var api = {
    get panels() {
      return panels;
    },
    setValue: setValue,

    get enabled() {
      return enabled;
    },
    enable: function enable() {
      enabled = true;
    },
    disable: function disable() {
      enabled = false;
    },


    save: save,

    show: show,
    hide: hide,
    get visible() {
      return visible;
    },
    toggle: function toggle() {
      return visible ? hide() : show();
    },

    fromJSON: function fromJSON(json, correspondenceTable) {
      try {
        json = JSON.parse(typeof json === 'string' ? json : __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default()(json));
        __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_object_entries___default()(correspondenceTable).forEach(function (_ref6) {
          var _ref7 = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_slicedToArray___default()(_ref6, 2),
              guiPath = _ref7[0],
              settingsPath = _ref7[1];

          var _guiPath$split = guiPath.split('/'),
              _guiPath$split2 = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_slicedToArray___default()(_guiPath$split, 2),
              panelID = _guiPath$split2[0],
              inputID = _guiPath$split2[1];

          var inputName = internalIDs[inputID];
          if (!panelID || !inputName) return;

          var value = __WEBPACK_IMPORTED_MODULE_11_keypather_get___default()(json, settingsPath);
          setValue(panelID, inputName, (typeof value === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(value)) === 'object' ? __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default()(value, null, 2) : value);
        });
      } catch (e) {
        console.warn(e);
      }
    },

    fromFile: function fromFile(file, correspondenceTable) {
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : __WEBPACK_IMPORTED_MODULE_8_utils_noop__["a" /* default */];

      if (!file) return;
      var fReader = new FileReader();
      fReader.onload = function () {
        try {
          var json = JSON.parse(fReader.result);
          api.fromJSON(json, correspondenceTable);
          callback();
        } catch (e) {
          console.warn(e);
        }
      };
      fReader.readAsText(file);
    }
  };
  return api;

  function show() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_values___default()(panels).forEach(function (panel) {
      return panel.show();
    });
    visible = true;
  }

  function hide() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_values___default()(panels).forEach(function (panel) {
      return panel.hide();
    });
    visible = false;
  }

  function setValue(panelName, controlName, value) {
    return panels[panelName].setValue(localize(controlName), value);
  }

  function addJSONInput(panel, name, placeholder) {
    var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : __WEBPACK_IMPORTED_MODULE_8_utils_noop__["a" /* default */];

    panel.addTextArea(localize(name), placeholder, function (string) {
      try {
        var json = JSON.parse(string);
        element.classList.remove('is-invalid');
        callback(json);
      } catch (e) {
        element.classList.add('is-invalid');
      }
    });

    var element = panel._controls[localize(name)].control;
    if (!element) return;
    element.classList.add('qs_json');

    qsStore.addText(name + '-size', element.offsetWidth, function (size) {
      var _size$split = size.split(';'),
          _size$split2 = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_slicedToArray___default()(_size$split, 2),
          w = _size$split2[0],
          h = _size$split2[1];

      element.style.width = w + 'px';
      element.style.height = h + 'px';
    });

    element.addEventListener('mouseup', function () {
      qsStore.setValue(name + '-size', element.offsetWidth + ';' + element.offsetHeight);
    });

    Object(__WEBPACK_IMPORTED_MODULE_9_utils_make_textarea_indentable__["a" /* default */])(element, 2);
    Object(__WEBPACK_IMPORTED_MODULE_10_utils_make_textarea_autoheight__["a" /* default */])(element, function () {
      return qsStore.setValue(name + '-size', element.offsetWidth + ';' + element.offsetHeight);
    });
  }

  function save() {
    ;[].concat(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray___default()(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_object_entries___default()(panels)), [['qsstore', qsStore]]).forEach(function (_ref8) {
      var _ref9 = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_slicedToArray___default()(_ref8, 2),
          name = _ref9[0],
          panel = _ref9[1];

      try {
        panel.saveInLocalStorage(NS + name);
      } catch (e) {
        console.warn(e);
      }
    });
  }
});

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(207);
module.exports = __webpack_require__(0).Object.values;


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(1);
var $values = __webpack_require__(95)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(209);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(16);
var $keys = __webpack_require__(15);

__webpack_require__(52)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(211), __esModule: true };

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);
__webpack_require__(13);
module.exports = __webpack_require__(212);


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(32);
var ITERATOR = __webpack_require__(3)('iterator');
var Iterators = __webpack_require__(14);
module.exports = __webpack_require__(0).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(214), __esModule: true };

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);
__webpack_require__(13);
module.exports = __webpack_require__(215);


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var get = __webpack_require__(47);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(217);
module.exports = __webpack_require__(0).Object.entries;


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(1);
var $entries = __webpack_require__(95)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

!function(){function a(a,b){var d=c("div",null,"qs_label",b);return d.innerHTML=a,d}function b(a,b,d,e){var f=c("input",b,d,e);return f.type=a,f}function c(a,b,c,d){var e=document.createElement(a);if(e)return e.id=b,c&&(e.className=c),d&&d.appendChild(e),e}function d(){return navigator.userAgent.indexOf("rv:11")!=-1||navigator.userAgent.indexOf("MSIE")!=-1}function e(){var a=navigator.userAgent.toLowerCase();return!(a.indexOf("chrome")>-1||a.indexOf("firefox")>-1||a.indexOf("epiphany")>-1)&&a.indexOf("safari/")>-1}function f(){var a=navigator.userAgent.toLowerCase();return a.indexOf("edge")>-1}function g(){var a=document.createElement("style");a.innerText=i,document.head.appendChild(a),h=!0}var h=!1,i=".qs_main{background-color:#dddddd;text-align:left;position:absolute;width:200px;font:12px sans-serif;box-shadow:5px 5px 8px rgba(0,0,0,0.35);user-select:none;-webkit-user-select:none;color:#000000;border:none}.qs_content{background-color:#cccccc;overflow-y:auto}.qs_title_bar{background-color:#eeeeee;user-select:none;-webkit-user-select:none;cursor:pointer;padding:5px;font-weight:bold;border:none;color:#000000}.qs_container{margin:5px;padding:5px;background-color:#eeeeee;border:none;position:relative}.qs_container_selected{border:none;background-color:#ffffff}.qs_range{-webkit-appearance:none;-moz-appearance:none;width:100%;height:17px;padding:0;margin:0;background-color:transparent;border:none;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.qs_range:focus{outline:none;border:none}.qs_range::-webkit-slider-runnable-track{width:100%;height:15px;cursor:pointer;background:#cccccc;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-webkit-slider-runnable-track{background:#cccccc}.qs_range::-webkit-slider-thumb{-webkit-appearance:none;height:15px;width:15px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#999999;cursor:pointer;margin-top:0}.qs_range::-moz-range-track{width:100%;height:15px;cursor:pointer;background:#cccccc;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range::-moz-range-thumb{height:15px;width:15px;border:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#999999;cursor:pointer}.qs_range::-ms-track{width:100%;height:15px;cursor:pointer;visibility:hidden;background:transparent}.qs_range::-ms-thumb{height:15px;width:15px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#999999;cursor:pointer;border:none}.qs_range::-ms-fill-lower{background:#cccccc;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-ms-fill-lower{background:#cccccc}.qs_range::-ms-fill-upper{background:#cccccc;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-ms-fill-upper{background:#cccccc}.qs_button{background-color:#f6f6f6;color:#000000;height:30px;border:1px solid #aaaaaa;font:12px sans-serif}.qs_button:active{background-color:#ffffff;border:1px solid #aaaaaa}.qs_button:focus{border:1px solid #aaaaaa;outline:none}.qs_checkbox{cursor:pointer}.qs_checkbox input{position:absolute;left:-99999px}.qs_checkbox span{height:16px;width:100%;display:block;text-indent:20px;background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAALklEQVQ4T2OcOXPmfwYKACPIgLS0NLKMmDVrFsOoAaNhMJoOGBioFwZkZUWoJgApdFaxjUM1YwAAAABJRU5ErkJggg==') no-repeat}.qs_checkbox input:checked+span{background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAvElEQVQ4T63Tyw2EIBAA0OFKBxBL40wDRovAUACcKc1IB1zZDAkG18GYZTmSmafzgTnnMgwchoDWGlJKheGcP3JtnPceCqCUAmttSZznuYtgchsXQrgC+77DNE0kUpPbmBOoJaBOIVQylnqWgAAeKhDve/AN+EaklJBzhhgjWRoJVGTbNjiOowAIret6a+4jYIwpX8aDwLIs74C2D0IIYIyVP6Gm898m9kbVm85ljHUTf16k4VUefkwDrxk+zoUEwCt0GbUAAAAASUVORK5CYII=') no-repeat}.qs_checkbox_label{position:absolute;top:7px;left:30px}.qs_label{margin-bottom:3px;user-select:none;-webkit-user-select:none;cursor:default;font:12px sans-serif}.qs_text_input{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;width:100%;padding:0 0 0 5px;height:24px;border:1px inset #ffffff;background-color:#ffffff;color:#000000;font-size:12px}.qs_text_input:focus{outline:none;background:#ffffff;border:1px inset #ffffff}.qs_select{background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAp0lEQVRIS+2SsQ3FIAwF7RVYhA5mgQFhFuhYhJKWL0eKxI8SGylKZ0p4+OBsHGNM+HChAiS7qkgyBKrovaLeOxhjbgtxZ+cFtgelFMg5QwgBvPd/EO5sDbKAlBLUWo/8CjmL075zDmKMj6rEKbpCqBL9aqc4ZUQAhVbInBMQUXz5Vg/WfxOktXZsWWtZLds9uIqlqaH1NFV3jdhSJA47E1CAaE8ViYp+wGiWMZ/T+cgAAAAASUVORK5CYII=') no-repeat right #f6f6f6;-webkit-appearance:none;-moz-appearance:none;appearance:none;color:#000000;width:100%;height:24px;border:1px solid #aaaaaa;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;padding:0 5px;-moz-outline:none;font-size:14px}.qs_select option{font-size:14px}.qs_select::-ms-expand{display:none}.qs_select:focus{outline:none}.qs_number{height:24px}.qs_image{width:100%}.qs_progress{width:100%;height:15px;background-color:#cccccc;border:none;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.qs_progress_value{height:100%;background-color:#999999}.qs_textarea{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;resize:vertical;width:100%;padding:3px 5px;border:1px inset #ffffff;background-color:#ffffff;color:#000000;font-size:12px}.qs_textarea:focus{outline:none;background:#ffffff;border:1px inset #ffffff}.qs_color{position:absolute;left:-999999px}.qs_color_label{width:100%;height:20px;display:block;border:1px solid #aaaaaa;cursor:pointer;padding:0 0 0 5px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.qs_file_chooser{position:absolute;left:-999999px}.qs_file_chooser_label{background-color:#f6f6f6;color:#000000;height:30px;border:1px solid #aaaaaa;font:12px sans-serif;width:100%;display:block;cursor:pointer;padding:7px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",j={_version:"2.1",_topZ:1,_panel:null,_titleBar:null,_content:null,_startX:0,_startY:0,_hidden:!1,_collapsed:!1,_controls:null,_keyCode:-1,_draggable:!0,_collapsible:!0,_globalChangeHandler:null,useExtStyleSheet:function(){h=!0},create:function(a,b,c,d){var e=Object.create(this);return e._init(a,b,c,d),e},destroy:function(){this._panel.parentElement&&this._panel.parentElement.removeChild(this._panel);for(var a in this)this[a]=null},_init:function(a,b,c,d){h||g(),this._bindHandlers(),this._createPanel(a,b,d),this._createTitleBar(c||"QuickSettings"),this._createContent()},_bindHandlers:function(){this._startDrag=this._startDrag.bind(this),this._drag=this._drag.bind(this),this._endDrag=this._endDrag.bind(this),this._doubleClickTitle=this._doubleClickTitle.bind(this),this._onKeyUp=this._onKeyUp.bind(this)},getValuesAsJSON:function(a){var b={};for(var c in this._controls)this._controls[c].getValue&&(b[c]=this._controls[c].getValue());return a&&(b=JSON.stringify(b)),b},setValuesFromJSON:function(a){"string"==typeof a&&(a=JSON.parse(a));for(var b in a)this._controls[b].setValue&&this._controls[b].setValue(a[b]);return this},saveInLocalStorage:function(a){return this._localStorageName=a,this._readFromLocalStorage(a),this},clearLocalStorage:function(a){return localStorage.removeItem(a),this},_saveInLocalStorage:function(a){localStorage.setItem(a,this.getValuesAsJSON(!0))},_readFromLocalStorage:function(a){var b=localStorage.getItem(a);b&&this.setValuesFromJSON(b)},_createPanel:function(a,b,d){this._panel=c("div",null,"qs_main",d||document.body),this._panel.style.zIndex=++j._topZ,this.setPosition(a||0,b||0),this._controls={}},_createTitleBar:function(a){this._titleBar=c("div",null,"qs_title_bar",this._panel),this._titleBar.textContent=a,this._titleBar.addEventListener("mousedown",this._startDrag),this._titleBar.addEventListener("dblclick",this._doubleClickTitle)},_createContent:function(){this._content=c("div",null,"qs_content",this._panel)},_createContainer:function(){var a=c("div",null,"qs_container");return a.addEventListener("focus",function(){this.className+=" qs_container_selected"},!0),a.addEventListener("blur",function(){var a=this.className.indexOf(" qs_container_selected");a>-1&&(this.className=this.className.substr(0,a))},!0),this._content.appendChild(a),a},setPosition:function(a,b){return this._panel.style.left=a+"px",this._panel.style.top=Math.max(b,0)+"px",this},setSize:function(a,b){return this._panel.style.width=a+"px",this._content.style.width=a+"px",this._content.style.height=b-this._titleBar.offsetHeight+"px",this},setWidth:function(a){return this._panel.style.width=a+"px",this._content.style.width=a+"px",this},setHeight:function(a){return this._content.style.height=a-this._titleBar.offsetHeight+"px",this},setDraggable:function(a){return this._draggable=a,this._draggable||this._collapsible?this._titleBar.style.cursor="pointer":this._titleBar.style.cursor="default",this},_startDrag:function(a){this._draggable&&(this._panel.style.zIndex=++j._topZ,document.addEventListener("mousemove",this._drag),document.addEventListener("mouseup",this._endDrag),this._startX=a.clientX,this._startY=a.clientY),a.preventDefault()},_drag:function(a){var b=parseInt(this._panel.style.left),c=parseInt(this._panel.style.top),d=a.clientX,e=a.clientY;this.setPosition(b+d-this._startX,c+e-this._startY),this._startX=d,this._startY=e,a.preventDefault()},_endDrag:function(a){document.removeEventListener("mousemove",this._drag),document.removeEventListener("mouseup",this._endDrag),a.preventDefault()},setGlobalChangeHandler:function(a){return this._globalChangeHandler=a,this},_callGCH:function(){this._localStorageName&&this._saveInLocalStorage(this._localStorageName),this._globalChangeHandler&&this._globalChangeHandler()},hide:function(){return this._panel.style.visibility="hidden",this._hidden=!0,this},show:function(){return this._panel.style.visibility="visible",this._panel.style.zIndex=++j._topZ,this._hidden=!1,this},toggleVisibility:function(){return this._hidden?this.show():this.hide(),this},setCollapsible:function(a){return this._collapsible=a,this._draggable||this._collapsible?this._titleBar.style.cursor="pointer":this._titleBar.style.cursor="default",this},collapse:function(){return this._panel.removeChild(this._content),this._collapsed=!0,this},expand:function(){return this._panel.appendChild(this._content),this._collapsed=!1,this},toggleCollapsed:function(){return this._collapsed?this.expand():this.collapse(),this},setKey:function(a){return this._keyCode=a.toUpperCase().charCodeAt(0),document.body.addEventListener("keyup",this.onKeyUp),this},_onKeyUp:function(a){a.keyCode===this._keyCode&&this.toggleVisibility()},_doubleClickTitle:function(){this._collapsible&&this.toggleCollapsed()},removeControl:function(a){if(this._controls[a])var b=this._controls[a].container;return b&&b.parentElement&&b.parentElement.removeChild(b),this._controls[a]=null,this},enableControl:function(a){return this._controls[a]&&(this._controls[a].control.disabled=!1),this},disableControl:function(a){return this._controls[a]&&(this._controls[a].control.disabled=!0),this},hideControl:function(a){return this._controls[a]&&(this._controls[a].container.style.display="none"),this},showControl:function(a){return this._controls[a]&&(this._controls[a].container.style.display="block"),this},overrideStyle:function(a,b,c){return this._controls[a]&&(this._controls[a].control.style[b]=c),this},hideTitle:function(a){var b=this._controls[a].label;return b&&(b.style.display="none"),this},showTitle:function(a){var b=this._controls[a].label;return b&&(b.style.display="block"),this},hideAllTitles:function(){for(var a in this._controls){var b=this._controls[a].label;b&&(b.style.display="none")}return this},showAllTitles:function(){for(var a in this._controls){var b=this._controls[a].label;b&&(b.style.display="block")}return this},getValue:function(a){return this._controls[a].getValue()},setValue:function(a,b){return this._controls[a].setValue(b),this._callGCH(),this},addBoolean:function(a,d,e){var f=this._createContainer(),g=c("label",null,"qs_checkbox_label",f);g.textContent=a,g.setAttribute("for",a);var h=c("label",null,"qs_checkbox",f);h.setAttribute("for",a);var i=b("checkbox",a,null,h);i.checked=d;c("span",null,null,h);this._controls[a]={container:f,control:i,getValue:function(){return this.control.checked},setValue:function(a){this.control.checked=a,e&&e(a)}};var j=this;return i.addEventListener("change",function(){e&&e(i.checked),j._callGCH()}),this},bindBoolean:function(a,b,c){return this.addBoolean(a,b,function(b){c[a]=b})},addButton:function(a,c){var d=this._createContainer(),e=b("button",a,"qs_button",d);e.value=a,this._controls[a]={container:d,control:e};var f=this;return e.addEventListener("click",function(){c&&c(e),f._callGCH()}),this},addColor:function(g,h,i){if(e()||f()||d())return this.addText(g,h,i);var j=this._createContainer(),k=a("<b>"+g+":</b> "+h,j),l=b("color",g,"qs_color",j);l.value=h||"#ff0000";var m=c("label",null,"qs_color_label",j);m.setAttribute("for",g),m.style.backgroundColor=l.value,this._controls[g]={container:j,control:l,colorLabel:m,label:k,title:g,getValue:function(){return this.control.value},setValue:function(a){this.control.value=a,this.colorLabel.style.backgroundColor=l.value,this.label.innerHTML="<b>"+this.title+":</b> "+this.control.value,i&&i(a)}};var n=this;return l.addEventListener("input",function(){k.innerHTML="<b>"+g+":</b> "+l.value,m.style.backgroundColor=l.value,i&&i(l.value),n._callGCH()}),this},bindColor:function(a,b,c){return this.addColor(a,b,function(b){c[a]=b})},addDate:function(c,e,f){var g;if(e instanceof Date){var h=e.getFullYear(),i=e.getMonth()+1;i<10&&(i="0"+i);var j=e.getDate();g=h+"-"+i+"-"+j}else g=e;if(d())return this.addText(c,g,f);var k=this._createContainer(),l=a("<b>"+c+"</b>",k),m=b("date",c,"qs_text_input",k);m.value=g||"",this._controls[c]={container:k,control:m,label:l,getValue:function(){return this.control.value},setValue:function(a){var b;if(a instanceof Date){var c=a.getFullYear(),d=a.getMonth()+1;d<10&&(d="0"+d);var e=a.getDate();e<10&&(e="0"+e),b=c+"-"+d+"-"+e}else b=a;this.control.value=b||"",f&&f(b)}};var n=this;return m.addEventListener("input",function(){f&&f(m.value),n._callGCH()}),this},bindDate:function(a,b,c){return this.addDate(a,b,function(b){c[a]=b})},addDropDown:function(b,d,e){for(var f=this._createContainer(),g=a("<b>"+b+"</b>",f),h=c("select",null,"qs_select",f),i=0;i<d.length;i++){var j=c("option");j.label=d[i],j.innerText=d[i],h.add(j)}var k=this;return h.addEventListener("change",function(){var a=h.selectedIndex,b=h.options;e&&e({index:a,value:b[a].label}),k._callGCH()}),this._controls[b]={container:f,control:h,label:g,getValue:function(){var a=this.control.selectedIndex;return{index:a,value:this.control.options[a].label}},setValue:function(a){var b;b=null!=a.index?a.index:a;var c=this.control.options;this.control.selectedIndex=b,e&&e({index:b,value:c[b].label})}},this},bindDropDown:function(a,b,c){return this.addDropDown(a,b,function(b){c[a]=b.value})},addElement:function(b,c){var d=this._createContainer(),e=a("<b>"+b+"</b>",d);return d.appendChild(c),this._controls[b]={container:d,label:e},this},addFileChooser:function(d,e,f,g){var h=this._createContainer(),i=a("<b>"+d+"</b>",h),j=b("file",d,"qs_file_chooser",h);f&&(j.accept=f);var k=c("label",null,"qs_file_chooser_label",h);k.setAttribute("for",d),k.textContent=e||"Choose a file...",this._controls[d]={container:h,control:j,label:i,getValue:function(){return this.control.files[0]}};var l=this;return j.addEventListener("change",function(){j.files&&j.files.length&&(k.textContent=j.files[0].name,g&&g(j.files[0]),l._callGCH())}),this},addHTML:function(b,d){var e=this._createContainer(),f=a("<b>"+b+":</b> ",e),g=c("div",null,null,e);return g.innerHTML=d,this._controls[b]={label:f,control:g,getValue:function(){return this.control.innerHTML},setValue:function(a){this.control.innerHTML=a}},this},addImage:function(b,d){var e=this._createContainer(),f=a("<b>"+b+"</b>",e);return img=c("img",null,"qs_image",e),img.src=d,this._controls[b]={container:e,control:img,label:f,getValue:function(){return this.control.src},setValue:function(a){this.control.src=a}},this},addRange:function(a,b,c,d,e,f){return this._addNumber("range",a,b,c,d,e,f)},addNumber:function(a,b,c,d,e,f){return this._addNumber("number",a,b,c,d,e,f)},_addNumber:function(c,e,f,g,h,i,j){var k=this._createContainer(),l=a("",k),m="range"===c?"qs_range":"qs_text_input qs_number",n=b(c,e,m,k);n.min=f||0,n.max=g||100,n.step=i||1,n.value=h||0,l.innerHTML="<b>"+e+":</b> "+n.value,this._controls[e]={container:k,control:n,label:l,title:e,callback:j,getValue:function(){return parseFloat(this.control.value)},setValue:function(a){this.control.value=a,this.label.innerHTML="<b>"+this.title+":</b> "+this.control.value,j&&j(parseFloat(a))}};var o="input";"range"===c&&d()&&(o="change");var p=this;return n.addEventListener(o,function(){l.innerHTML="<b>"+e+":</b> "+n.value,j&&j(parseFloat(n.value)),p._callGCH()}),this},bindRange:function(a,b,c,d,e,f){return this.addRange(a,b,c,d,e,function(b){f[a]=b})},bindNumber:function(a,b,c,d,e,f){return this.addNumber(a,b,c,d,e,function(b){f[a]=b})},setRangeParameters:function(a,b,c,d){return this.setNumberParameters(a,b,c,d)},setNumberParameters:function(a,b,c,d){var e=this._controls[a],f=e.control.value;return e.control.min=b,e.control.max=c,e.control.step=d,e.control.value!==f&&e.callback&&e.callback(e.control.value),this},addPassword:function(a,b,c){return this._addText("password",a,b,c)},bindPassword:function(a,b,c){return this.addPassword(a,b,function(b){c[a]=b})},addProgressBar:function(b,d,e,f){var g=this._createContainer(),h=a("",g),i=c("div",null,"qs_progress",g),j=c("div",null,"qs_progress_value",i);return j.style.width=e/d*100+"%","numbers"===f?h.innerHTML="<b>"+b+":</b> "+e+" / "+d:"percent"===f?h.innerHTML="<b>"+b+":</b> "+Math.round(e/d*100)+"%":h.innerHTML="<b>"+b+"</b>",this._controls[b]={container:g,control:i,valueDiv:j,valueDisplay:f,label:h,value:e,max:d,title:b,getValue:function(){return this.value},setValue:function(a){this.value=Math.max(0,Math.min(a,this.max)),this.valueDiv.style.width=this.value/this.max*100+"%","numbers"===this.valueDisplay?this.label.innerHTML="<b>"+this.title+":</b> "+this.value+" / "+this.max:"percent"===this.valueDisplay&&(this.label.innerHTML="<b>"+this.title+":</b> "+Math.round(this.value/this.max*100)+"%")}},this},setProgressMax:function(a,b){var c=this._controls[a];return c.max=b,c.value=Math.min(c.value,c.max),c.valueDiv.style.width=c.value/c.max*100+"%","numbers"===c.valueDisplay?c.label.innerHTML="<b>"+c.title+":</b> "+c.value+" / "+c.max:"percent"===c.valueDisplay?c.label.innerHTML="<b>"+c.title+":</b> "+Math.round(c.value/c.max*100)+"%":c.label.innerHTML="<b>"+c.title+"</b>",this},addText:function(a,b,c){return this._addText("text",a,b,c)},_addText:function(d,e,f,g){var h,i=this._createContainer(),j=a("<b>"+e+"</b>",i);"textarea"===d?(h=c("textarea",e,"qs_textarea",i),h.rows=5):h=b(d,e,"qs_text_input",i),h.value=f||"",this._controls[e]={container:i,control:h,label:j,getValue:function(){return this.control.value},setValue:function(a){this.control.value=a,g&&g(a)}};var k=this;return h.addEventListener("input",function(){g&&g(h.value),k._callGCH()}),this},bindText:function(a,b,c){return this.addText(a,b,function(b){c[a]=b})},addTextArea:function(a,b,c){return this._addText("textarea",a,b,c)},setTextAreaRows:function(a,b){return this._controls[a].control.rows=b,this},bindTextArea:function(a,b,c){return this.addTextArea(a,b,function(b){c[a]=b})},addTime:function(c,e,f){var g;if(e instanceof Date){var h=e.getHours();h<10&&(h="0"+h);var i=e.getMinutes();i<10&&(i="0"+i);var j=e.getSeconds();j<10&&(j="0"+j),g=h+":"+i+":"+j}else g=e;if(d())return this.addText(c,g,f);var k=this._createContainer(),l=a("<b>"+c+"</b>",k),m=b("time",c,"qs_text_input",k);m.value=g||"",this._controls[c]={container:k,control:m,label:l,getValue:function(){return this.control.value},setValue:function(a){var b;if(a instanceof Date){var c=a.getHours();c<10&&(c="0"+c);var d=a.getMinutes();d<10&&(d="0"+d);var e=a.getSeconds();e<10&&(e="0"+e),b=c+":"+d+":"+e}else b=a;this.control.value=b||"",f&&f(b)}};var n=this;return m.addEventListener("input",function(){f&&f(m.value),n._callGCH()}),this},bindTime:function(a,b,c){return this.addTime(a,b,function(b){c[a]=b})}}; true?module.exports=j:"function"==typeof define&&define.amd?define(j):window.QuickSettings=j}();

/***/ }),
/* 219 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (element, indentSize) {
  return element.addEventListener('keydown', function (e) {
    if (e.keyCode === 9 || e.which === 9) {
      e.preventDefault();
      var start = this.selectionStart;
      this.value = this.value.substring(0, this.selectionStart) + new Array(indentSize).fill(' ').join('') + this.value.substring(this.selectionEnd);
      this.selectionEnd = start + indentSize;
    }
  });
});

/***/ }),
/* 220 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_utils_noop__ = __webpack_require__(35);


/* harmony default export */ __webpack_exports__["a"] = (function (element) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : __WEBPACK_IMPORTED_MODULE_0_utils_noop__["a" /* default */];
  return element.addEventListener('input', function () {
    this.style.height = '';
    this.style.height = this.scrollHeight + 'px';
    callback(this);
  });
});

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

const getOperation = __webpack_require__(85)
const keypathReducer = __webpack_require__(81)

module.exports = getKeypath

function getKeypath (ctx, keypath, opts) {
  return keypathReducer({
    ctx: ctx,
    keypath: keypath
  }, getOperation, opts)
}


/***/ }),
/* 222 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_utils_noop__ = __webpack_require__(35);



/* global FileReader Image */

/* harmony default export */ __webpack_exports__["a"] = (function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$dropzone = _ref.dropzone,
      dropzone = _ref$dropzone === undefined ? document.documentElement : _ref$dropzone,
      _ref$callback = _ref.callback,
      callback = _ref$callback === undefined ? __WEBPACK_IMPORTED_MODULE_1_utils_noop__["a" /* default */] : _ref$callback;

  dropzone.addEventListener('dragover', function (e) {
    return e.preventDefault();
  }, false);
  dropzone.addEventListener('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();[].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(e.dataTransfer.items)).forEach(handleItem);
  });

  function handleItem(item) {
    if (item.kind !== 'file') return;

    // NOTE: WebKit/chromium needs 'webkit' prefix (since Chrome 21)
    var entry = item.webkitGetAsEntry();

    if (!entry.isDirectory) return makeFile(entry);

    var reader = entry.createReader();
    reader.readEntries(function (entries) {
      return entries.forEach(makeFile);
    });
  }

  function makeFile(entry) {
    entry.file(function (file) {
      var reader = new FileReader();
      reader.onload = function () {
        var image = new Image();
        image.onload = function () {
          return callback(image, entry.name);
        };
        image.src = this.result;
      };
      reader.readAsDataURL(file);
    });
  }
});

/***/ }),
/* 223 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_entries__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_entries___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_entries__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_values__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_values___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_values__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_tiny_emitter__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_tiny_emitter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_tiny_emitter__);






var sprites = {};

var events = new __WEBPACK_IMPORTED_MODULE_4_tiny_emitter___default.a();
var NS = '__SPRITES-MANAGER.';

/* harmony default export */ __webpack_exports__["a"] = ({
  get images() {
    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_values___default()(sprites);
  },
  get filenames() {
    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys___default()(sprites);
  },
  watch: function watch(callback) {
    return events.on(NS + 'update', callback);
  },

  add: function add(image, filename) {
    sprites[filename] = image;
    events.emit(NS + 'update', sprites);
  },

  updateFromFilenames: function updateFromFilenames(filenames) {
    for (var key in sprites) {
      if (!filenames.includes(key)) delete sprites[key];
    }
    events.emit(NS + 'update', sprites);
  },

  toHTML: function toHTML(fallback) {
    var filenames = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys___default()(sprites).length ? __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys___default()(sprites) : [fallback];
    return '<ol class=\'sprites-list\'>\n      ' + filenames.map(function (filename) {
      return '<li class=\'sprites-list--item\'>' + filename + '</li>';
    }).join('\n') + '\n    </ol>';
  },


  // NOTE: this is used for legacy support
  toSpritesheets: function toSpritesheets() {
    var spritesheets = {};

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_entries___default()(sprites).forEach(function (_ref) {
      var _ref2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_ref, 2),
          filename = _ref2[0],
          image = _ref2[1];

      spritesheets[filename] = image;
      spritesheets[filename].name = filename;
      spritesheets[filename].length = 1;
    });

    return spritesheets;
  }
});

/***/ }),
/* 224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tiny_emitter__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tiny_emitter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_tiny_emitter__);



var textures = {};

var events = new __WEBPACK_IMPORTED_MODULE_1_tiny_emitter___default.a();
var NS = '__TEXTURES-MANAGER.';

/* harmony default export */ __webpack_exports__["a"] = ({
  watch: function watch(callback) {
    return events.on(NS + 'update', callback);
  },

  fromJSON: function fromJSON(json) {
    try {
      textures = JSON.parse(typeof json === 'string' ? json : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(json));
      events.emit(NS + 'update', textures);
    } catch (e) {
      console.warn(e);
    }
  },

  toObject: function toObject() {
    return textures;
  }
});

/***/ }),
/* 225 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_worker_loader_worker__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_worker_loader_worker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_worker_loader_worker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_wipmap_generate__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_wipmap_generate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_wipmap_generate__);




var worker = new __WEBPACK_IMPORTED_MODULE_1_worker_loader_worker___default.a();
var generateWithWorker = function generateWithWorker(x, y, opts) {
  return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    worker.terminate();

    worker = new __WEBPACK_IMPORTED_MODULE_1_worker_loader_worker___default.a();
    worker.onmessage = function (e) {
      return resolve(e.data);
    };
    worker.onerror = function (e) {
      return reject(e.message);
    };

    worker.postMessage([x, y, opts]);
  });
};

/* harmony default export */ __webpack_exports__["a"] = (window.Worker ? generateWithWorker : function (x, y, opts) {
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(__WEBPACK_IMPORTED_MODULE_2_wipmap_generate___default()(x, y, opts));
});

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function() {
  return new Worker(__webpack_require__.p + "c231d42d9af1e193f931.worker.js");
};

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Voronoi = __webpack_require__(228)
const Poisson = __webpack_require__(242)
const inside = __webpack_require__(249)
const { map } = __webpack_require__(102)
const PRNG = __webpack_require__(251)

const defaultOpts = __webpack_require__(254)

module.exports = function generate (x, y, opts) {
  opts = Object.assign({}, defaultOpts, opts || {})

  const width = opts.width
  const height = opts.height

  // NOTE: altough the seed is given as a String, the prng converts it to an integer
  const seed = opts.seed || 'wipmap'
  const prng = PRNG({
    seed,
    offset: [x, y],
    steps: [1, 1]
  })

  const maps = {
    temperature: prng.perlinMap(width),
    humidity: prng.perlinMap(height),
    water: prng.perlinMap(height),
    distortionX: prng.perlinMap(1, [-opts.distortion, opts.distortion]),
    distortionY: prng.perlinMap(1, [-opts.distortion, opts.distortion]),
    jitterX: prng.perlinMap(2, [-opts.jitter, opts.jitter]),
    jitterY: prng.perlinMap(2, [-opts.jitter, opts.jitter])
  }

  const sites = Array(width * height).fill().map((_, index) => {
    const x = index % width
    const y = (index - x) / width

    const site = [x + 0.5, y + 0.5]
    return onBoundary(x, y)
      ? site
      : [site[0] + maps.jitterX(x, y), site[1] + maps.jitterY(x, y)]
  })

  // NOTE: add outer ring for voronoi stability
  let ring = []
  for (let i = 1; i < width; i++) {
    ring.push([i, 0])
    ring.push([i, height])
  }

  for (let j = 0; j <= height; j++) {
    ring.push([0, j])
    ring.push([width, j])
  }

  const voronoi = Voronoi(sites.concat(ring))
  const biomes = voronoi.cells.map((cell, index) => {
    if (~cell.indexOf(-1)) return

    const site = sites[index]
    if (!site) return

    const cellPoints = cell.reduce((positions, point) => [...positions, voronoi.positions[point]], [])
    if (~cellPoints.indexOf(undefined)) return

    const temperature = maps.temperature(...site)
    const humidity = maps.humidity(...site)
    const type = opts.probablities.water > humidity && opts.probablities.water > maps.water(...site)
      ? 'WATER'
      : calcBiomeType(temperature, humidity)

    return {
      site: ignoreVoronoiOuterRing(site),
      cell: cellPoints.map(ignoreVoronoiOuterRing),
      type,
      isBoundary: onBoundary(site[0] - 0.5, site[1] - 0.5)
    }
  }).filter(biome => biome)

  // NOTE: Sampling normalization is done with K*K area distribution,
  // then by mapping point to the actual map dimensions
  const K = 100
  const minDistance = 1 / (Math.sqrt(opts.poissonDensity) * 100) * K
  const poisson = new Poisson([K, K], minDistance, minDistance * 2, 10, prng.random)
  const points = poisson.fill().map(([x, y]) => {
    x = (x / K) * width
    y = (y / K) * height

    if (x < 0.5 || x > width - 0.5 || y < 0.5 || y > height - 0.5) return

    ;[x, y] = ignoreVoronoiOuterRing([x, y])

    const distortion = [
      maps.distortionX(x, y),
      maps.distortionY(x, y)
    ]

    const gradient = [
      prng.randomFloat(-opts.gradient, opts.gradient),
      prng.randomFloat(-opts.gradient, opts.gradient)
    ]

    // NOTE: if distortion and/or gradient is done on outer ring, empty points can appear (try `defaultBiome = undefined`)
    // In that case, falling back to the biome without distortion or gradient
    const defaultBiome = biomes.find(biome => inside([x, y], biome.cell))
    const parentBiome = biomes.find(biome => inside([x + distortion[0], y + distortion[1]], biome.cell)) || defaultBiome
    const gradientedBiome = biomes.find(biome => inside([x + distortion[0] + gradient[0], y + distortion[1] + gradient[1]], biome.cell)) || defaultBiome
    if (!parentBiome || !gradientedBiome) return

    let biomeType = gradientedBiome.type

    // Disable gradient on WATER biome and biome next to WATER
    if (gradientedBiome.type !== 'WATER' && parentBiome.type === 'WATER') biomeType = 'WATER'
    if (gradientedBiome.type === 'WATER' && parentBiome.type !== 'WATER') biomeType = parentBiome.type

    return [
      ...[x, y].map(a => a.toFixed(opts.decimals)),
      biomeType
    ]
  }).filter(point => point)
    .sort((a, b) => a[1] - b[1])
    .reduce((categories, [x, y, biome]) => {
      categories[biome] = categories[biome] || []
      categories[biome].push([x, y])
      return categories
    }, {})

  return {
    x,
    y,
    seed,
    width,
    height,
    biomes,
    points
  }

  function onBoundary (i, j) {
    return (i === 0 || i === width - 1) || (j === 0 || j === height - 1)
  }

  function ignoreVoronoiOuterRing (point) {
    return point && [
      map(point[0], 0.5, width - 0.5, 0, width),
      map(point[1], 0.5, height - 0.5, 0, height)
    ]
  }

  function calcBiomeType (temperature, humidity) {
    const i = Math.floor(temperature * opts.biomesMap[0].length)
    const j = Math.floor(humidity * opts.biomesMap.length)
    const type = opts.biomesMap[i][j]
    return type
  }
}


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var triangulate = __webpack_require__(229)
var circumcenter = __webpack_require__(237)
var uniq = __webpack_require__(101)

module.exports = voronoi

function compareInt(a, b) {
  return a - b
}

function voronoi1D(points) {
  if(points.length === 1) {
    return {
      cells: [ [-1] ],
      positions: []
    }
  }
  var tagged = points.map(function(p, i) {
    return [ p[0], i ]
  })
  tagged.sort(function(a,b) {
    return a-b
  })
  var cells = new Array(points.length)
  for(var i=0; i<cells.length; ++i) {
    cells[i] = [-1,-1]
  }
  var dualPoints = []
  for(var j=1; j<tagged.length; ++j) {
    var a = tagged[j-1]
    var b = tagged[j]
    var center = 0.5*(a[0]+b[0])
    var n = dualPoints.length
    dualPoints.push([center])
    cells[a[1]][1] = n
    cells[b[1]][0] = n
  }
  cells[tagged[0][1]][1] = 0
  cells[tagged[tagged.length-1][1]][0] = dualPoints.length-1
  return {
    cells: cells,
    positions: dualPoints
  }
}

function voronoi(points) {
  var n = points.length
  if(n === 0) {
    return { cells: [], positions: [] }
  }
  var d = points[0].length
  if(d < 1) {
    return { cells: [], positions: [] }
  }
  if(d === 1) {
    return voronoi1D(points)
  }

  //First delaunay triangulate all points including point at infinity
  var cells = triangulate(points, true)

  //Construct dual points
  var stars = new Array(n)
  for(var i=0; i<n; ++i) {
    stars[i] = []
  }
  var nc = cells.length
  var tuple = new Array(d+1)
  var cellIndex = new Array(nc)
  var dualPoints = []
  for(var i=0; i<nc; ++i) {
    var verts = cells[i]
    var skip = false
    for(var j=0; j<=d; ++j) {
      var v = verts[j]
      if(v < 0) {
        cellIndex[i] = -1
        skip = true
      } else {
        stars[v].push(i)
        tuple[j] = points[v]
      }
    }
    if(skip) {
      continue
    }
    cellIndex[i] = dualPoints.length
    dualPoints.push(circumcenter(tuple))
  }

  //Build dual cells
  var dualCells
  if(d === 2) {
    dualCells = new Array(n)
    for(var i=0; i<n; ++i) {
      var dual = stars[i]
      var c = [ cellIndex[dual[0]] ]
      var s = cells[dual[0]][(cells[dual[0]].indexOf(i)+1) % 3]
      for(var j=1; j<dual.length; ++j) {
        for(var k=1; k<dual.length; ++k) {
          var x = (cells[dual[k]].indexOf(i) + 2) % 3
          if(cells[dual[k]][x] === s) {
            c.push(cellIndex[dual[k]])
            s = cells[dual[k]][(x+2)%3]
            break
          }
        }
      }
      dualCells[i] = c
    }
  } else {
    for(var i=0; i<n; ++i) {
      var s = stars[i]
      for(var j=0; j<s.length; ++j) {
        s[j] = cellIndex[s[j]]
      }
      uniq(s, compareInt)
    }
    dualCells = stars
  }

  //Return the resulting cells
  return {
    cells: dualCells,
    positions: dualPoints
  }
}

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ch = __webpack_require__(230)
var uniq = __webpack_require__(101)

module.exports = triangulate

function LiftedPoint(p, i) {
  this.point = p
  this.index = i
}

function compareLifted(a, b) {
  var ap = a.point
  var bp = b.point
  var d = ap.length
  for(var i=0; i<d; ++i) {
    var s = bp[i] - ap[i]
    if(s) {
      return s
    }
  }
  return 0
}

function triangulate1D(n, points, includePointAtInfinity) {
  if(n === 1) {
    if(includePointAtInfinity) {
      return [ [-1, 0] ]
    } else {
      return []
    }
  }
  var lifted = points.map(function(p, i) {
    return [ p[0], i ]
  })
  lifted.sort(function(a,b) {
    return a[0] - b[0]
  })
  var cells = new Array(n - 1)
  for(var i=1; i<n; ++i) {
    var a = lifted[i-1]
    var b = lifted[i]
    cells[i-1] = [ a[1], b[1] ]
  }
  if(includePointAtInfinity) {
    cells.push(
      [ -1, cells[0][1], ],
      [ cells[n-1][1], -1 ])
  }
  return cells
}

function triangulate(points, includePointAtInfinity) {
  var n = points.length
  if(n === 0) {
    return []
  }
  
  var d = points[0].length
  if(d < 1) {
    return []
  }

  //Special case:  For 1D we can just sort the points
  if(d === 1) {
    return triangulate1D(n, points, includePointAtInfinity)
  }
  
  //Lift points, sort
  var lifted = new Array(n)
  var upper = 1.0
  for(var i=0; i<n; ++i) {
    var p = points[i]
    var x = new Array(d+1)
    var l = 0.0
    for(var j=0; j<d; ++j) {
      var v = p[j]
      x[j] = v
      l += v * v
    }
    x[d] = l
    lifted[i] = new LiftedPoint(x, i)
    upper = Math.max(l, upper)
  }
  uniq(lifted, compareLifted)
  
  //Double points
  n = lifted.length

  //Create new list of points
  var dpoints = new Array(n + d + 1)
  var dindex = new Array(n + d + 1)

  //Add steiner points at top
  var u = (d+1) * (d+1) * upper
  var y = new Array(d+1)
  for(var i=0; i<=d; ++i) {
    y[i] = 0.0
  }
  y[d] = u

  dpoints[0] = y.slice()
  dindex[0] = -1

  for(var i=0; i<=d; ++i) {
    var x = y.slice()
    x[i] = 1
    dpoints[i+1] = x
    dindex[i+1] = -1
  }

  //Copy rest of the points over
  for(var i=0; i<n; ++i) {
    var h = lifted[i]
    dpoints[i + d + 1] = h.point
    dindex[i + d + 1] =  h.index
  }

  //Construct convex hull
  var hull = ch(dpoints, false)
  if(includePointAtInfinity) {
    hull = hull.filter(function(cell) {
      var count = 0
      for(var j=0; j<=d; ++j) {
        var v = dindex[cell[j]]
        if(v < 0) {
          if(++count >= 2) {
            return false
          }
        }
        cell[j] = v
      }
      return true
    })
  } else {
    hull = hull.filter(function(cell) {
      for(var i=0; i<=d; ++i) {
        var v = dindex[cell[i]]
        if(v < 0) {
          return false
        }
        cell[i] = v
      }
      return true
    })
  }

  if(d & 1) {
    for(var i=0; i<hull.length; ++i) {
      var h = hull[i]
      var x = h[0]
      h[0] = h[1]
      h[1] = x
    }
  }

  return hull
}

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//High level idea:
// 1. Use Clarkson's incremental construction to find convex hull
// 2. Point location in triangulation by jump and walk

module.exports = incrementalConvexHull

var orient = __webpack_require__(231)
var compareCell = __webpack_require__(234).compareCells

function compareInt(a, b) {
  return a - b
}

function Simplex(vertices, adjacent, boundary) {
  this.vertices = vertices
  this.adjacent = adjacent
  this.boundary = boundary
  this.lastVisited = -1
}

Simplex.prototype.flip = function() {
  var t = this.vertices[0]
  this.vertices[0] = this.vertices[1]
  this.vertices[1] = t
  var u = this.adjacent[0]
  this.adjacent[0] = this.adjacent[1]
  this.adjacent[1] = u
}

function GlueFacet(vertices, cell, index) {
  this.vertices = vertices
  this.cell = cell
  this.index = index
}

function compareGlue(a, b) {
  return compareCell(a.vertices, b.vertices)
}

function bakeOrient(d) {
  var code = ["function orient(){var tuple=this.tuple;return test("]
  for(var i=0; i<=d; ++i) {
    if(i > 0) {
      code.push(",")
    }
    code.push("tuple[", i, "]")
  }
  code.push(")}return orient")
  var proc = new Function("test", code.join(""))
  var test = orient[d+1]
  if(!test) {
    test = orient
  }
  return proc(test)
}

var BAKED = []

function Triangulation(dimension, vertices, simplices) {
  this.dimension = dimension
  this.vertices = vertices
  this.simplices = simplices
  this.interior = simplices.filter(function(c) {
    return !c.boundary
  })

  this.tuple = new Array(dimension+1)
  for(var i=0; i<=dimension; ++i) {
    this.tuple[i] = this.vertices[i]
  }

  var o = BAKED[dimension]
  if(!o) {
    o = BAKED[dimension] = bakeOrient(dimension)
  }
  this.orient = o
}

var proto = Triangulation.prototype

//Degenerate situation where we are on boundary, but coplanar to face
proto.handleBoundaryDegeneracy = function(cell, point) {
  var d = this.dimension
  var n = this.vertices.length - 1
  var tuple = this.tuple
  var verts = this.vertices

  //Dumb solution: Just do dfs from boundary cell until we find any peak, or terminate
  var toVisit = [ cell ]
  cell.lastVisited = -n
  while(toVisit.length > 0) {
    cell = toVisit.pop()
    var cellVerts = cell.vertices
    var cellAdj = cell.adjacent
    for(var i=0; i<=d; ++i) {
      var neighbor = cellAdj[i]
      if(!neighbor.boundary || neighbor.lastVisited <= -n) {
        continue
      }
      var nv = neighbor.vertices
      for(var j=0; j<=d; ++j) {
        var vv = nv[j]
        if(vv < 0) {
          tuple[j] = point
        } else {
          tuple[j] = verts[vv]
        }
      }
      var o = this.orient()
      if(o > 0) {
        return neighbor
      }
      neighbor.lastVisited = -n
      if(o === 0) {
        toVisit.push(neighbor)
      }
    }
  }
  return null
}

proto.walk = function(point, random) {
  //Alias local properties
  var n = this.vertices.length - 1
  var d = this.dimension
  var verts = this.vertices
  var tuple = this.tuple

  //Compute initial jump cell
  var initIndex = random ? (this.interior.length * Math.random())|0 : (this.interior.length-1)
  var cell = this.interior[ initIndex ]

  //Start walking
outerLoop:
  while(!cell.boundary) {
    var cellVerts = cell.vertices
    var cellAdj = cell.adjacent

    for(var i=0; i<=d; ++i) {
      tuple[i] = verts[cellVerts[i]]
    }
    cell.lastVisited = n

    //Find farthest adjacent cell
    for(var i=0; i<=d; ++i) {
      var neighbor = cellAdj[i]
      if(neighbor.lastVisited >= n) {
        continue
      }
      var prev = tuple[i]
      tuple[i] = point
      var o = this.orient()
      tuple[i] = prev
      if(o < 0) {
        cell = neighbor
        continue outerLoop
      } else {
        if(!neighbor.boundary) {
          neighbor.lastVisited = n
        } else {
          neighbor.lastVisited = -n
        }
      }
    }
    return
  }

  return cell
}

proto.addPeaks = function(point, cell) {
  var n = this.vertices.length - 1
  var d = this.dimension
  var verts = this.vertices
  var tuple = this.tuple
  var interior = this.interior
  var simplices = this.simplices

  //Walking finished at boundary, time to add peaks
  var tovisit = [ cell ]

  //Stretch initial boundary cell into a peak
  cell.lastVisited = n
  cell.vertices[cell.vertices.indexOf(-1)] = n
  cell.boundary = false
  interior.push(cell)

  //Record a list of all new boundaries created by added peaks so we can glue them together when we are all done
  var glueFacets = []

  //Do a traversal of the boundary walking outward from starting peak
  while(tovisit.length > 0) {
    //Pop off peak and walk over adjacent cells
    var cell = tovisit.pop()
    var cellVerts = cell.vertices
    var cellAdj = cell.adjacent
    var indexOfN = cellVerts.indexOf(n)
    if(indexOfN < 0) {
      continue
    }

    for(var i=0; i<=d; ++i) {
      if(i === indexOfN) {
        continue
      }

      //For each boundary neighbor of the cell
      var neighbor = cellAdj[i]
      if(!neighbor.boundary || neighbor.lastVisited >= n) {
        continue
      }

      var nv = neighbor.vertices

      //Test if neighbor is a peak
      if(neighbor.lastVisited !== -n) {      
        //Compute orientation of p relative to each boundary peak
        var indexOfNeg1 = 0
        for(var j=0; j<=d; ++j) {
          if(nv[j] < 0) {
            indexOfNeg1 = j
            tuple[j] = point
          } else {
            tuple[j] = verts[nv[j]]
          }
        }
        var o = this.orient()

        //Test if neighbor cell is also a peak
        if(o > 0) {
          nv[indexOfNeg1] = n
          neighbor.boundary = false
          interior.push(neighbor)
          tovisit.push(neighbor)
          neighbor.lastVisited = n
          continue
        } else {
          neighbor.lastVisited = -n
        }
      }

      var na = neighbor.adjacent

      //Otherwise, replace neighbor with new face
      var vverts = cellVerts.slice()
      var vadj = cellAdj.slice()
      var ncell = new Simplex(vverts, vadj, true)
      simplices.push(ncell)

      //Connect to neighbor
      var opposite = na.indexOf(cell)
      if(opposite < 0) {
        continue
      }
      na[opposite] = ncell
      vadj[indexOfN] = neighbor

      //Connect to cell
      vverts[i] = -1
      vadj[i] = cell
      cellAdj[i] = ncell

      //Flip facet
      ncell.flip()

      //Add to glue list
      for(var j=0; j<=d; ++j) {
        var uu = vverts[j]
        if(uu < 0 || uu === n) {
          continue
        }
        var nface = new Array(d-1)
        var nptr = 0
        for(var k=0; k<=d; ++k) {
          var vv = vverts[k]
          if(vv < 0 || k === j) {
            continue
          }
          nface[nptr++] = vv
        }
        glueFacets.push(new GlueFacet(nface, ncell, j))
      }
    }
  }

  //Glue boundary facets together
  glueFacets.sort(compareGlue)

  for(var i=0; i+1<glueFacets.length; i+=2) {
    var a = glueFacets[i]
    var b = glueFacets[i+1]
    var ai = a.index
    var bi = b.index
    if(ai < 0 || bi < 0) {
      continue
    }
    a.cell.adjacent[a.index] = b.cell
    b.cell.adjacent[b.index] = a.cell
  }
}

proto.insert = function(point, random) {
  //Add point
  var verts = this.vertices
  verts.push(point)

  var cell = this.walk(point, random)
  if(!cell) {
    return
  }

  //Alias local properties
  var d = this.dimension
  var tuple = this.tuple

  //Degenerate case: If point is coplanar to cell, then walk until we find a non-degenerate boundary
  for(var i=0; i<=d; ++i) {
    var vv = cell.vertices[i]
    if(vv < 0) {
      tuple[i] = point
    } else {
      tuple[i] = verts[vv]
    }
  }
  var o = this.orient(tuple)
  if(o < 0) {
    return
  } else if(o === 0) {
    cell = this.handleBoundaryDegeneracy(cell, point)
    if(!cell) {
      return
    }
  }

  //Add peaks
  this.addPeaks(point, cell)
}

//Extract all boundary cells
proto.boundary = function() {
  var d = this.dimension
  var boundary = []
  var cells = this.simplices
  var nc = cells.length
  for(var i=0; i<nc; ++i) {
    var c = cells[i]
    if(c.boundary) {
      var bcell = new Array(d)
      var cv = c.vertices
      var ptr = 0
      var parity = 0
      for(var j=0; j<=d; ++j) {
        if(cv[j] >= 0) {
          bcell[ptr++] = cv[j]
        } else {
          parity = j&1
        }
      }
      if(parity === (d&1)) {
        var t = bcell[0]
        bcell[0] = bcell[1]
        bcell[1] = t
      }
      boundary.push(bcell)
    }
  }
  return boundary
}

function incrementalConvexHull(points, randomSearch) {
  var n = points.length
  if(n === 0) {
    throw new Error("Must have at least d+1 points")
  }
  var d = points[0].length
  if(n <= d) {
    throw new Error("Must input at least d+1 points")
  }

  //FIXME: This could be degenerate, but need to select d+1 non-coplanar points to bootstrap process
  var initialSimplex = points.slice(0, d+1)

  //Make sure initial simplex is positively oriented
  var o = orient.apply(void 0, initialSimplex)
  if(o === 0) {
    throw new Error("Input not in general position")
  }
  var initialCoords = new Array(d+1)
  for(var i=0; i<=d; ++i) {
    initialCoords[i] = i
  }
  if(o < 0) {
    initialCoords[0] = 1
    initialCoords[1] = 0
  }

  //Create initial topological index, glue pointers together (kind of messy)
  var initialCell = new Simplex(initialCoords, new Array(d+1), false)
  var boundary = initialCell.adjacent
  var list = new Array(d+2)
  for(var i=0; i<=d; ++i) {
    var verts = initialCoords.slice()
    for(var j=0; j<=d; ++j) {
      if(j === i) {
        verts[j] = -1
      }
    }
    var t = verts[0]
    verts[0] = verts[1]
    verts[1] = t
    var cell = new Simplex(verts, new Array(d+1), true)
    boundary[i] = cell
    list[i] = cell
  }
  list[d+1] = initialCell
  for(var i=0; i<=d; ++i) {
    var verts = boundary[i].vertices
    var adj = boundary[i].adjacent
    for(var j=0; j<=d; ++j) {
      var v = verts[j]
      if(v < 0) {
        adj[j] = initialCell
        continue
      }
      for(var k=0; k<=d; ++k) {
        if(boundary[k].vertices.indexOf(v) < 0) {
          adj[j] = boundary[k]
        }
      }
    }
  }

  //Initialize triangles
  var triangles = new Triangulation(d, initialSimplex, list)

  //Insert remaining points
  var useRandom = !!randomSearch
  for(var i=d+1; i<n; ++i) {
    triangles.insert(points[i], useRandom)
  }
  
  //Extract boundary cells
  return triangles.boundary()
}

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var twoProduct = __webpack_require__(61)
var robustSum = __webpack_require__(99)
var robustScale = __webpack_require__(100)
var robustSubtract = __webpack_require__(233)

var NUM_EXPAND = 5

var EPSILON     = 1.1102230246251565e-16
var ERRBOUND3   = (3.0 + 16.0 * EPSILON) * EPSILON
var ERRBOUND4   = (7.0 + 56.0 * EPSILON) * EPSILON

function cofactor(m, c) {
  var result = new Array(m.length-1)
  for(var i=1; i<m.length; ++i) {
    var r = result[i-1] = new Array(m.length-1)
    for(var j=0,k=0; j<m.length; ++j) {
      if(j === c) {
        continue
      }
      r[k++] = m[i][j]
    }
  }
  return result
}

function matrix(n) {
  var result = new Array(n)
  for(var i=0; i<n; ++i) {
    result[i] = new Array(n)
    for(var j=0; j<n; ++j) {
      result[i][j] = ["m", j, "[", (n-i-1), "]"].join("")
    }
  }
  return result
}

function sign(n) {
  if(n & 1) {
    return "-"
  }
  return ""
}

function generateSum(expr) {
  if(expr.length === 1) {
    return expr[0]
  } else if(expr.length === 2) {
    return ["sum(", expr[0], ",", expr[1], ")"].join("")
  } else {
    var m = expr.length>>1
    return ["sum(", generateSum(expr.slice(0, m)), ",", generateSum(expr.slice(m)), ")"].join("")
  }
}

function determinant(m) {
  if(m.length === 2) {
    return [["sum(prod(", m[0][0], ",", m[1][1], "),prod(-", m[0][1], ",", m[1][0], "))"].join("")]
  } else {
    var expr = []
    for(var i=0; i<m.length; ++i) {
      expr.push(["scale(", generateSum(determinant(cofactor(m, i))), ",", sign(i), m[0][i], ")"].join(""))
    }
    return expr
  }
}

function orientation(n) {
  var pos = []
  var neg = []
  var m = matrix(n)
  var args = []
  for(var i=0; i<n; ++i) {
    if((i&1)===0) {
      pos.push.apply(pos, determinant(cofactor(m, i)))
    } else {
      neg.push.apply(neg, determinant(cofactor(m, i)))
    }
    args.push("m" + i)
  }
  var posExpr = generateSum(pos)
  var negExpr = generateSum(neg)
  var funcName = "orientation" + n + "Exact"
  var code = ["function ", funcName, "(", args.join(), "){var p=", posExpr, ",n=", negExpr, ",d=sub(p,n);\
return d[d.length-1];};return ", funcName].join("")
  var proc = new Function("sum", "prod", "scale", "sub", code)
  return proc(robustSum, twoProduct, robustScale, robustSubtract)
}

var orientation3Exact = orientation(3)
var orientation4Exact = orientation(4)

var CACHED = [
  function orientation0() { return 0 },
  function orientation1() { return 0 },
  function orientation2(a, b) { 
    return b[0] - a[0]
  },
  function orientation3(a, b, c) {
    var l = (a[1] - c[1]) * (b[0] - c[0])
    var r = (a[0] - c[0]) * (b[1] - c[1])
    var det = l - r
    var s
    if(l > 0) {
      if(r <= 0) {
        return det
      } else {
        s = l + r
      }
    } else if(l < 0) {
      if(r >= 0) {
        return det
      } else {
        s = -(l + r)
      }
    } else {
      return det
    }
    var tol = ERRBOUND3 * s
    if(det >= tol || det <= -tol) {
      return det
    }
    return orientation3Exact(a, b, c)
  },
  function orientation4(a,b,c,d) {
    var adx = a[0] - d[0]
    var bdx = b[0] - d[0]
    var cdx = c[0] - d[0]
    var ady = a[1] - d[1]
    var bdy = b[1] - d[1]
    var cdy = c[1] - d[1]
    var adz = a[2] - d[2]
    var bdz = b[2] - d[2]
    var cdz = c[2] - d[2]
    var bdxcdy = bdx * cdy
    var cdxbdy = cdx * bdy
    var cdxady = cdx * ady
    var adxcdy = adx * cdy
    var adxbdy = adx * bdy
    var bdxady = bdx * ady
    var det = adz * (bdxcdy - cdxbdy) 
            + bdz * (cdxady - adxcdy)
            + cdz * (adxbdy - bdxady)
    var permanent = (Math.abs(bdxcdy) + Math.abs(cdxbdy)) * Math.abs(adz)
                  + (Math.abs(cdxady) + Math.abs(adxcdy)) * Math.abs(bdz)
                  + (Math.abs(adxbdy) + Math.abs(bdxady)) * Math.abs(cdz)
    var tol = ERRBOUND4 * permanent
    if ((det > tol) || (-det > tol)) {
      return det
    }
    return orientation4Exact(a,b,c,d)
  }
]

function slowOrient(args) {
  var proc = CACHED[args.length]
  if(!proc) {
    proc = CACHED[args.length] = orientation(args.length)
  }
  return proc.apply(undefined, args)
}

function generateOrientationProc() {
  while(CACHED.length <= NUM_EXPAND) {
    CACHED.push(orientation(CACHED.length))
  }
  var args = []
  var procArgs = ["slow"]
  for(var i=0; i<=NUM_EXPAND; ++i) {
    args.push("a" + i)
    procArgs.push("o" + i)
  }
  var code = [
    "function getOrientation(", args.join(), "){switch(arguments.length){case 0:case 1:return 0;"
  ]
  for(var i=2; i<=NUM_EXPAND; ++i) {
    code.push("case ", i, ":return o", i, "(", args.slice(0, i).join(), ");")
  }
  code.push("}var s=new Array(arguments.length);for(var i=0;i<arguments.length;++i){s[i]=arguments[i]};return slow(s);}return getOrientation")
  procArgs.push(code.join(""))

  var proc = Function.apply(undefined, procArgs)
  module.exports = proc.apply(undefined, [slowOrient].concat(CACHED))
  for(var i=0; i<=NUM_EXPAND; ++i) {
    module.exports[i] = CACHED[i]
  }
}

generateOrientationProc()

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = fastTwoSum

function fastTwoSum(a, b, result) {
	var x = a + b
	var bv = x - a
	var av = x - bv
	var br = b - bv
	var ar = a - av
	if(result) {
		result[0] = ar + br
		result[1] = x
		return result
	}
	return [ar+br, x]
}

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = robustSubtract

//Easy case: Add two scalars
function scalarScalar(a, b) {
  var x = a + b
  var bv = x - a
  var av = x - bv
  var br = b - bv
  var ar = a - av
  var y = ar + br
  if(y) {
    return [y, x]
  }
  return [x]
}

function robustSubtract(e, f) {
  var ne = e.length|0
  var nf = f.length|0
  if(ne === 1 && nf === 1) {
    return scalarScalar(e[0], -f[0])
  }
  var n = ne + nf
  var g = new Array(n)
  var count = 0
  var eptr = 0
  var fptr = 0
  var abs = Math.abs
  var ei = e[eptr]
  var ea = abs(ei)
  var fi = -f[fptr]
  var fa = abs(fi)
  var a, b
  if(ea < fa) {
    b = ei
    eptr += 1
    if(eptr < ne) {
      ei = e[eptr]
      ea = abs(ei)
    }
  } else {
    b = fi
    fptr += 1
    if(fptr < nf) {
      fi = -f[fptr]
      fa = abs(fi)
    }
  }
  if((eptr < ne && ea < fa) || (fptr >= nf)) {
    a = ei
    eptr += 1
    if(eptr < ne) {
      ei = e[eptr]
      ea = abs(ei)
    }
  } else {
    a = fi
    fptr += 1
    if(fptr < nf) {
      fi = -f[fptr]
      fa = abs(fi)
    }
  }
  var x = a + b
  var bv = x - a
  var y = b - bv
  var q0 = y
  var q1 = x
  var _x, _bv, _av, _br, _ar
  while(eptr < ne && fptr < nf) {
    if(ea < fa) {
      a = ei
      eptr += 1
      if(eptr < ne) {
        ei = e[eptr]
        ea = abs(ei)
      }
    } else {
      a = fi
      fptr += 1
      if(fptr < nf) {
        fi = -f[fptr]
        fa = abs(fi)
      }
    }
    b = q0
    x = a + b
    bv = x - a
    y = b - bv
    if(y) {
      g[count++] = y
    }
    _x = q1 + x
    _bv = _x - q1
    _av = _x - _bv
    _br = x - _bv
    _ar = q1 - _av
    q0 = _ar + _br
    q1 = _x
  }
  while(eptr < ne) {
    a = ei
    b = q0
    x = a + b
    bv = x - a
    y = b - bv
    if(y) {
      g[count++] = y
    }
    _x = q1 + x
    _bv = _x - q1
    _av = _x - _bv
    _br = x - _bv
    _ar = q1 - _av
    q0 = _ar + _br
    q1 = _x
    eptr += 1
    if(eptr < ne) {
      ei = e[eptr]
    }
  }
  while(fptr < nf) {
    a = fi
    b = q0
    x = a + b
    bv = x - a
    y = b - bv
    if(y) {
      g[count++] = y
    } 
    _x = q1 + x
    _bv = _x - q1
    _av = _x - _bv
    _br = x - _bv
    _ar = q1 - _av
    q0 = _ar + _br
    q1 = _x
    fptr += 1
    if(fptr < nf) {
      fi = -f[fptr]
    }
  }
  if(q0) {
    g[count++] = q0
  }
  if(q1) {
    g[count++] = q1
  }
  if(!count) {
    g[count++] = 0.0  
  }
  g.length = count
  return g
}

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 "use restrict";

var bits      = __webpack_require__(235)
  , UnionFind = __webpack_require__(236)

//Returns the dimension of a cell complex
function dimension(cells) {
  var d = 0
    , max = Math.max
  for(var i=0, il=cells.length; i<il; ++i) {
    d = max(d, cells[i].length)
  }
  return d-1
}
exports.dimension = dimension

//Counts the number of vertices in faces
function countVertices(cells) {
  var vc = -1
    , max = Math.max
  for(var i=0, il=cells.length; i<il; ++i) {
    var c = cells[i]
    for(var j=0, jl=c.length; j<jl; ++j) {
      vc = max(vc, c[j])
    }
  }
  return vc+1
}
exports.countVertices = countVertices

//Returns a deep copy of cells
function cloneCells(cells) {
  var ncells = new Array(cells.length)
  for(var i=0, il=cells.length; i<il; ++i) {
    ncells[i] = cells[i].slice(0)
  }
  return ncells
}
exports.cloneCells = cloneCells

//Ranks a pair of cells up to permutation
function compareCells(a, b) {
  var n = a.length
    , t = a.length - b.length
    , min = Math.min
  if(t) {
    return t
  }
  switch(n) {
    case 0:
      return 0;
    case 1:
      return a[0] - b[0];
    case 2:
      var d = a[0]+a[1]-b[0]-b[1]
      if(d) {
        return d
      }
      return min(a[0],a[1]) - min(b[0],b[1])
    case 3:
      var l1 = a[0]+a[1]
        , m1 = b[0]+b[1]
      d = l1+a[2] - (m1+b[2])
      if(d) {
        return d
      }
      var l0 = min(a[0], a[1])
        , m0 = min(b[0], b[1])
        , d  = min(l0, a[2]) - min(m0, b[2])
      if(d) {
        return d
      }
      return min(l0+a[2], l1) - min(m0+b[2], m1)
    
    //TODO: Maybe optimize n=4 as well?
    
    default:
      var as = a.slice(0)
      as.sort()
      var bs = b.slice(0)
      bs.sort()
      for(var i=0; i<n; ++i) {
        t = as[i] - bs[i]
        if(t) {
          return t
        }
      }
      return 0
  }
}
exports.compareCells = compareCells

function compareZipped(a, b) {
  return compareCells(a[0], b[0])
}

//Puts a cell complex into normal order for the purposes of findCell queries
function normalize(cells, attr) {
  if(attr) {
    var len = cells.length
    var zipped = new Array(len)
    for(var i=0; i<len; ++i) {
      zipped[i] = [cells[i], attr[i]]
    }
    zipped.sort(compareZipped)
    for(var i=0; i<len; ++i) {
      cells[i] = zipped[i][0]
      attr[i] = zipped[i][1]
    }
    return cells
  } else {
    cells.sort(compareCells)
    return cells
  }
}
exports.normalize = normalize

//Removes all duplicate cells in the complex
function unique(cells) {
  if(cells.length === 0) {
    return []
  }
  var ptr = 1
    , len = cells.length
  for(var i=1; i<len; ++i) {
    var a = cells[i]
    if(compareCells(a, cells[i-1])) {
      if(i === ptr) {
        ptr++
        continue
      }
      cells[ptr++] = a
    }
  }
  cells.length = ptr
  return cells
}
exports.unique = unique;

//Finds a cell in a normalized cell complex
function findCell(cells, c) {
  var lo = 0
    , hi = cells.length-1
    , r  = -1
  while (lo <= hi) {
    var mid = (lo + hi) >> 1
      , s   = compareCells(cells[mid], c)
    if(s <= 0) {
      if(s === 0) {
        r = mid
      }
      lo = mid + 1
    } else if(s > 0) {
      hi = mid - 1
    }
  }
  return r
}
exports.findCell = findCell;

//Builds an index for an n-cell.  This is more general than dual, but less efficient
function incidence(from_cells, to_cells) {
  var index = new Array(from_cells.length)
  for(var i=0, il=index.length; i<il; ++i) {
    index[i] = []
  }
  var b = []
  for(var i=0, n=to_cells.length; i<n; ++i) {
    var c = to_cells[i]
    var cl = c.length
    for(var k=1, kn=(1<<cl); k<kn; ++k) {
      b.length = bits.popCount(k)
      var l = 0
      for(var j=0; j<cl; ++j) {
        if(k & (1<<j)) {
          b[l++] = c[j]
        }
      }
      var idx=findCell(from_cells, b)
      if(idx < 0) {
        continue
      }
      while(true) {
        index[idx++].push(i)
        if(idx >= from_cells.length || compareCells(from_cells[idx], b) !== 0) {
          break
        }
      }
    }
  }
  return index
}
exports.incidence = incidence

//Computes the dual of the mesh.  This is basically an optimized version of buildIndex for the situation where from_cells is just the list of vertices
function dual(cells, vertex_count) {
  if(!vertex_count) {
    return incidence(unique(skeleton(cells, 0)), cells, 0)
  }
  var res = new Array(vertex_count)
  for(var i=0; i<vertex_count; ++i) {
    res[i] = []
  }
  for(var i=0, len=cells.length; i<len; ++i) {
    var c = cells[i]
    for(var j=0, cl=c.length; j<cl; ++j) {
      res[c[j]].push(i)
    }
  }
  return res
}
exports.dual = dual

//Enumerates all cells in the complex
function explode(cells) {
  var result = []
  for(var i=0, il=cells.length; i<il; ++i) {
    var c = cells[i]
      , cl = c.length|0
    for(var j=1, jl=(1<<cl); j<jl; ++j) {
      var b = []
      for(var k=0; k<cl; ++k) {
        if((j >>> k) & 1) {
          b.push(c[k])
        }
      }
      result.push(b)
    }
  }
  return normalize(result)
}
exports.explode = explode

//Enumerates all of the n-cells of a cell complex
function skeleton(cells, n) {
  if(n < 0) {
    return []
  }
  var result = []
    , k0     = (1<<(n+1))-1
  for(var i=0; i<cells.length; ++i) {
    var c = cells[i]
    for(var k=k0; k<(1<<c.length); k=bits.nextCombination(k)) {
      var b = new Array(n+1)
        , l = 0
      for(var j=0; j<c.length; ++j) {
        if(k & (1<<j)) {
          b[l++] = c[j]
        }
      }
      result.push(b)
    }
  }
  return normalize(result)
}
exports.skeleton = skeleton;

//Computes the boundary of all cells, does not remove duplicates
function boundary(cells) {
  var res = []
  for(var i=0,il=cells.length; i<il; ++i) {
    var c = cells[i]
    for(var j=0,cl=c.length; j<cl; ++j) {
      var b = new Array(c.length-1)
      for(var k=0, l=0; k<cl; ++k) {
        if(k !== j) {
          b[l++] = c[k]
        }
      }
      res.push(b)
    }
  }
  return normalize(res)
}
exports.boundary = boundary;

//Computes connected components for a dense cell complex
function connectedComponents_dense(cells, vertex_count) {
  var labels = new UnionFind(vertex_count)
  for(var i=0; i<cells.length; ++i) {
    var c = cells[i]
    for(var j=0; j<c.length; ++j) {
      for(var k=j+1; k<c.length; ++k) {
        labels.link(c[j], c[k])
      }
    }
  }
  var components = []
    , component_labels = labels.ranks
  for(var i=0; i<component_labels.length; ++i) {
    component_labels[i] = -1
  }
  for(var i=0; i<cells.length; ++i) {
    var l = labels.find(cells[i][0])
    if(component_labels[l] < 0) {
      component_labels[l] = components.length
      components.push([cells[i].slice(0)])
    } else {
      components[component_labels[l]].push(cells[i].slice(0))
    }
  }
  return components
}

//Computes connected components for a sparse graph
function connectedComponents_sparse(cells) {
  var vertices  = unique(normalize(skeleton(cells, 0)))
    , labels    = new UnionFind(vertices.length)
  for(var i=0; i<cells.length; ++i) {
    var c = cells[i]
    for(var j=0; j<c.length; ++j) {
      var vj = findCell(vertices, [c[j]])
      for(var k=j+1; k<c.length; ++k) {
        labels.link(vj, findCell(vertices, [c[k]]))
      }
    }
  }
  var components        = []
    , component_labels  = labels.ranks
  for(var i=0; i<component_labels.length; ++i) {
    component_labels[i] = -1
  }
  for(var i=0; i<cells.length; ++i) {
    var l = labels.find(findCell(vertices, [cells[i][0]]));
    if(component_labels[l] < 0) {
      component_labels[l] = components.length
      components.push([cells[i].slice(0)])
    } else {
      components[component_labels[l]].push(cells[i].slice(0))
    }
  }
  return components
}

//Computes connected components for a cell complex
function connectedComponents(cells, vertex_count) {
  if(vertex_count) {
    return connectedComponents_dense(cells, vertex_count)
  }
  return connectedComponents_sparse(cells)
}
exports.connectedComponents = connectedComponents


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Bit twiddling hacks for JavaScript.
 *
 * Author: Mikola Lysenko
 *
 * Ported from Stanford bit twiddling hack library:
 *    http://graphics.stanford.edu/~seander/bithacks.html
 */

 "use restrict";

//Number of bits in an integer
var INT_BITS = 32;

//Constants
exports.INT_BITS  = INT_BITS;
exports.INT_MAX   =  0x7fffffff;
exports.INT_MIN   = -1<<(INT_BITS-1);

//Returns -1, 0, +1 depending on sign of x
exports.sign = function(v) {
  return (v > 0) - (v < 0);
}

//Computes absolute value of integer
exports.abs = function(v) {
  var mask = v >> (INT_BITS-1);
  return (v ^ mask) - mask;
}

//Computes minimum of integers x and y
exports.min = function(x, y) {
  return y ^ ((x ^ y) & -(x < y));
}

//Computes maximum of integers x and y
exports.max = function(x, y) {
  return x ^ ((x ^ y) & -(x < y));
}

//Checks if a number is a power of two
exports.isPow2 = function(v) {
  return !(v & (v-1)) && (!!v);
}

//Computes log base 2 of v
exports.log2 = function(v) {
  var r, shift;
  r =     (v > 0xFFFF) << 4; v >>>= r;
  shift = (v > 0xFF  ) << 3; v >>>= shift; r |= shift;
  shift = (v > 0xF   ) << 2; v >>>= shift; r |= shift;
  shift = (v > 0x3   ) << 1; v >>>= shift; r |= shift;
  return r | (v >> 1);
}

//Computes log base 10 of v
exports.log10 = function(v) {
  return  (v >= 1000000000) ? 9 : (v >= 100000000) ? 8 : (v >= 10000000) ? 7 :
          (v >= 1000000) ? 6 : (v >= 100000) ? 5 : (v >= 10000) ? 4 :
          (v >= 1000) ? 3 : (v >= 100) ? 2 : (v >= 10) ? 1 : 0;
}

//Counts number of bits
exports.popCount = function(v) {
  v = v - ((v >>> 1) & 0x55555555);
  v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
  return ((v + (v >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24;
}

//Counts number of trailing zeros
function countTrailingZeros(v) {
  var c = 32;
  v &= -v;
  if (v) c--;
  if (v & 0x0000FFFF) c -= 16;
  if (v & 0x00FF00FF) c -= 8;
  if (v & 0x0F0F0F0F) c -= 4;
  if (v & 0x33333333) c -= 2;
  if (v & 0x55555555) c -= 1;
  return c;
}
exports.countTrailingZeros = countTrailingZeros;

//Rounds to next power of 2
exports.nextPow2 = function(v) {
  v += v === 0;
  --v;
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v + 1;
}

//Rounds down to previous power of 2
exports.prevPow2 = function(v) {
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v - (v>>>1);
}

//Computes parity of word
exports.parity = function(v) {
  v ^= v >>> 16;
  v ^= v >>> 8;
  v ^= v >>> 4;
  v &= 0xf;
  return (0x6996 >>> v) & 1;
}

var REVERSE_TABLE = new Array(256);

(function(tab) {
  for(var i=0; i<256; ++i) {
    var v = i, r = i, s = 7;
    for (v >>>= 1; v; v >>>= 1) {
      r <<= 1;
      r |= v & 1;
      --s;
    }
    tab[i] = (r << s) & 0xff;
  }
})(REVERSE_TABLE);

//Reverse bits in a 32 bit word
exports.reverse = function(v) {
  return  (REVERSE_TABLE[ v         & 0xff] << 24) |
          (REVERSE_TABLE[(v >>> 8)  & 0xff] << 16) |
          (REVERSE_TABLE[(v >>> 16) & 0xff] << 8)  |
           REVERSE_TABLE[(v >>> 24) & 0xff];
}

//Interleave bits of 2 coordinates with 16 bits.  Useful for fast quadtree codes
exports.interleave2 = function(x, y) {
  x &= 0xFFFF;
  x = (x | (x << 8)) & 0x00FF00FF;
  x = (x | (x << 4)) & 0x0F0F0F0F;
  x = (x | (x << 2)) & 0x33333333;
  x = (x | (x << 1)) & 0x55555555;

  y &= 0xFFFF;
  y = (y | (y << 8)) & 0x00FF00FF;
  y = (y | (y << 4)) & 0x0F0F0F0F;
  y = (y | (y << 2)) & 0x33333333;
  y = (y | (y << 1)) & 0x55555555;

  return x | (y << 1);
}

//Extracts the nth interleaved component
exports.deinterleave2 = function(v, n) {
  v = (v >>> n) & 0x55555555;
  v = (v | (v >>> 1))  & 0x33333333;
  v = (v | (v >>> 2))  & 0x0F0F0F0F;
  v = (v | (v >>> 4))  & 0x00FF00FF;
  v = (v | (v >>> 16)) & 0x000FFFF;
  return (v << 16) >> 16;
}


//Interleave bits of 3 coordinates, each with 10 bits.  Useful for fast octree codes
exports.interleave3 = function(x, y, z) {
  x &= 0x3FF;
  x  = (x | (x<<16)) & 4278190335;
  x  = (x | (x<<8))  & 251719695;
  x  = (x | (x<<4))  & 3272356035;
  x  = (x | (x<<2))  & 1227133513;

  y &= 0x3FF;
  y  = (y | (y<<16)) & 4278190335;
  y  = (y | (y<<8))  & 251719695;
  y  = (y | (y<<4))  & 3272356035;
  y  = (y | (y<<2))  & 1227133513;
  x |= (y << 1);
  
  z &= 0x3FF;
  z  = (z | (z<<16)) & 4278190335;
  z  = (z | (z<<8))  & 251719695;
  z  = (z | (z<<4))  & 3272356035;
  z  = (z | (z<<2))  & 1227133513;
  
  return x | (z << 2);
}

//Extracts nth interleaved component of a 3-tuple
exports.deinterleave3 = function(v, n) {
  v = (v >>> n)       & 1227133513;
  v = (v | (v>>>2))   & 3272356035;
  v = (v | (v>>>4))   & 251719695;
  v = (v | (v>>>8))   & 4278190335;
  v = (v | (v>>>16))  & 0x3FF;
  return (v<<22)>>22;
}

//Computes next combination in colexicographic order (this is mistakenly called nextPermutation on the bit twiddling hacks page)
exports.nextCombination = function(v) {
  var t = v | (v - 1);
  return (t + 1) | (((~t & -~t) - 1) >>> (countTrailingZeros(v) + 1));
}



/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 "use restrict";

module.exports = UnionFind;

function UnionFind(count) {
  this.roots = new Array(count);
  this.ranks = new Array(count);
  
  for(var i=0; i<count; ++i) {
    this.roots[i] = i;
    this.ranks[i] = 0;
  }
}

var proto = UnionFind.prototype

Object.defineProperty(proto, "length", {
  "get": function() {
    return this.roots.length
  }
})

proto.makeSet = function() {
  var n = this.roots.length;
  this.roots.push(n);
  this.ranks.push(0);
  return n;
}

proto.find = function(x) {
  var x0 = x
  var roots = this.roots;
  while(roots[x] !== x) {
    x = roots[x]
  }
  while(roots[x0] !== x) {
    var y = roots[x0]
    roots[x0] = x
    x0 = y
  }
  return x;
}

proto.link = function(x, y) {
  var xr = this.find(x)
    , yr = this.find(y);
  if(xr === yr) {
    return;
  }
  var ranks = this.ranks
    , roots = this.roots
    , xd    = ranks[xr]
    , yd    = ranks[yr];
  if(xd < yd) {
    roots[xr] = yr;
  } else if(yd < xd) {
    roots[yr] = xr;
  } else {
    roots[yr] = xr;
    ++ranks[xr];
  }
}

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dup = __webpack_require__(238)
var solve = __webpack_require__(239)

function dot(a, b) {
  var s = 0.0
  var d = a.length
  for(var i=0; i<d; ++i) {
    s += a[i] * b[i]
  }
  return s
}

function barycentricCircumcenter(points) {
  var N = points.length
  if(N === 0) {
    return []
  }
  
  var D = points[0].length
  var A = dup([points.length+1, points.length+1], 1.0)
  var b = dup([points.length+1], 1.0)
  A[N][N] = 0.0
  for(var i=0; i<N; ++i) {
    for(var j=0; j<=i; ++j) {
      A[j][i] = A[i][j] = 2.0 * dot(points[i], points[j])
    }
    b[i] = dot(points[i], points[i])
  }
  var x = solve(A, b)

  var denom = 0.0
  var h = x[N+1]
  for(var i=0; i<h.length; ++i) {
    denom += h[i]
  }

  var y = new Array(N)
  for(var i=0; i<N; ++i) {
    var h = x[i]
    var numer = 0.0
    for(var j=0; j<h.length; ++j) {
      numer += h[j]
    }
    y[i] =  numer / denom
  }

  return y
}

function circumcenter(points) {
  if(points.length === 0) {
    return []
  }
  var D = points[0].length
  var result = dup([D])
  var weights = barycentricCircumcenter(points)
  for(var i=0; i<points.length; ++i) {
    for(var j=0; j<D; ++j) {
      result[j] += points[i][j] * weights[i]
    }
  }
  return result
}

circumcenter.barycenetric = barycentricCircumcenter
module.exports = circumcenter

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function dupe_array(count, value, i) {
  var c = count[i]|0
  if(c <= 0) {
    return []
  }
  var result = new Array(c), j
  if(i === count.length-1) {
    for(j=0; j<c; ++j) {
      result[j] = value
    }
  } else {
    for(j=0; j<c; ++j) {
      result[j] = dupe_array(count, value, i+1)
    }
  }
  return result
}

function dupe_number(count, value) {
  var result, i
  result = new Array(count)
  for(i=0; i<count; ++i) {
    result[i] = value
  }
  return result
}

function dupe(count, value) {
  if(typeof value === "undefined") {
    value = 0
  }
  switch(typeof count) {
    case "number":
      if(count > 0) {
        return dupe_number(count|0, value)
      }
    break
    case "object":
      if(typeof (count.length) === "number") {
        return dupe_array(count, value, 0)
      }
    break
  }
  return []
}

module.exports = dupe

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var determinant = __webpack_require__(240)

var NUM_EXPAND = 6

function generateSolver(n) {
  var funcName = "robustLinearSolve" + n + "d"
  var code = ["function ", funcName, "(A,b){return ["]
  for(var i=0; i<n; ++i) {
    code.push("det([")
    for(var j=0; j<n; ++j) {
      if(j > 0) {
        code.push(",")
      }
      code.push("[")
      for(var k=0; k<n; ++k) {
        if(k > 0) {
          code.push(",")
        }
        if(k === i) {
          code.push("+b[", j, "]")
        } else {
          code.push("+A[", j, "][", k, "]")
        }
      }
      code.push("]")
    }
    code.push("]),")
  }
  code.push("det(A)]}return ", funcName)
  var proc = new Function("det", code.join(""))
  if(n < 6) {
    return proc(determinant[n])
  }
  return proc(determinant)
}

function robustLinearSolve0d() {
  return [ 0 ]
}

function robustLinearSolve1d(A, b) {
  return [ [ b[0] ], [ A[0][0] ] ]
}

var CACHE = [
  robustLinearSolve0d,
  robustLinearSolve1d
]

function generateDispatch() {
  while(CACHE.length < NUM_EXPAND) {
    CACHE.push(generateSolver(CACHE.length))
  }
  var procArgs = []
  var code = ["function dispatchLinearSolve(A,b){switch(A.length){"]
  for(var i=0; i<NUM_EXPAND; ++i) {
    procArgs.push("s" + i)
    code.push("case ", i, ":return s", i, "(A,b);")
  }
  code.push("}var s=CACHE[A.length];if(!s)s=CACHE[A.length]=g(A.length);return s(A,b)}return dispatchLinearSolve")
  procArgs.push("CACHE", "g", code.join(""))
  var proc = Function.apply(undefined, procArgs)
  module.exports = proc.apply(undefined, CACHE.concat([CACHE, generateSolver]))
  for(var i=0; i<NUM_EXPAND; ++i) {
    module.exports[i] = CACHE[i]
  }
}

generateDispatch()

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var twoProduct = __webpack_require__(61)
var robustSum = __webpack_require__(99)
var robustScale = __webpack_require__(100)
var compress = __webpack_require__(241)

var NUM_EXPANDED = 6

function cofactor(m, c) {
  var result = new Array(m.length-1)
  for(var i=1; i<m.length; ++i) {
    var r = result[i-1] = new Array(m.length-1)
    for(var j=0,k=0; j<m.length; ++j) {
      if(j === c) {
        continue
      }
      r[k++] = m[i][j]
    }
  }
  return result
}

function matrix(n) {
  var result = new Array(n)
  for(var i=0; i<n; ++i) {
    result[i] = new Array(n)
    for(var j=0; j<n; ++j) {
      result[i][j] = ["m[", i, "][", j, "]"].join("")
    }
  }
  return result
}

function sign(n) {
  if(n & 1) {
    return "-"
  }
  return ""
}

function generateSum(expr) {
  if(expr.length === 1) {
    return expr[0]
  } else if(expr.length === 2) {
    return ["sum(", expr[0], ",", expr[1], ")"].join("")
  } else {
    var m = expr.length>>1
    return ["sum(", generateSum(expr.slice(0, m)), ",", generateSum(expr.slice(m)), ")"].join("")
  }
}

function determinant(m) {
  if(m.length === 2) {
    return ["sum(prod(", m[0][0], ",", m[1][1], "),prod(-", m[0][1], ",", m[1][0], "))"].join("")
  } else {
    var expr = []
    for(var i=0; i<m.length; ++i) {
      expr.push(["scale(", determinant(cofactor(m, i)), ",", sign(i), m[0][i], ")"].join(""))
    }
    return generateSum(expr)
  }
}

function compileDeterminant(n) {
  var proc = new Function("sum", "scale", "prod", "compress", [
    "function robustDeterminant",n, "(m){return compress(", 
      determinant(matrix(n)),
    ")};return robustDeterminant", n].join(""))
  return proc(robustSum, robustScale, twoProduct, compress)
}

var CACHE = [
  function robustDeterminant0() { return [0] },
  function robustDeterminant1(m) { return [m[0][0]] }
]

function generateDispatch() {
  while(CACHE.length < NUM_EXPANDED) {
    CACHE.push(compileDeterminant(CACHE.length))
  }
  var procArgs = []
  var code = ["function robustDeterminant(m){switch(m.length){"]
  for(var i=0; i<NUM_EXPANDED; ++i) {
    procArgs.push("det" + i)
    code.push("case ", i, ":return det", i, "(m);")
  }
  code.push("}\
var det=CACHE[m.length];\
if(!det)\
det=CACHE[m.length]=gen(m.length);\
return det(m);\
}\
return robustDeterminant")
  procArgs.push("CACHE", "gen", code.join(""))
  var proc = Function.apply(undefined, procArgs)
  module.exports = proc.apply(undefined, CACHE.concat([CACHE, compileDeterminant]))
  for(var i=0; i<CACHE.length; ++i) {
    module.exports[i] = CACHE[i]
  }
}

generateDispatch()

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = compressExpansion

function compressExpansion(e) {
  var m = e.length
  var Q = e[e.length-1]
  var bottom = m
  for(var i=m-2; i>=0; --i) {
    var a = Q
    var b = e[i]
    Q = a + b
    var bv = Q - a
    var q = b - bv
    if(q) {
      e[--bottom] = Q
      Q = q
    }
  }
  var top = 0
  for(var i=bottom; i<m; ++i) {
    var a = e[i]
    var b = Q
    Q = a + b
    var bv = Q - a
    var q = b - bv
    if(q) {
      e[top++] = q
    }
  }
  e[top++] = Q
  e.length = top
  return e
}

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var zeros = __webpack_require__(243),
    moore = __webpack_require__(247),
    sphereRandom = __webpack_require__(248);

/**
 * Get the squared euclidean distance from two points of arbitrary, but equal, dimensions
 * @param {Array} point1
 * @param {Array} point2
 * @returns {number} Squared euclidean distance
 */
var squaredEuclideanDistance = function squaredEuclideanDistance (point1, point2) {
    var result = 0,
        i = 0;

    for (; i < point1.length; i++) {
        result += Math.pow(point1[i] - point2[i], 2);
    }

    return result;
};

/**
 * Get the neighbourhood ordered by distance, including the origin point
 * @param {int} dimensionNumber Number of dimensions
 * @returns {Array} Neighbourhood
 */
var getNeighbourhood = function getNeighbourhood (dimensionNumber) {
    var neighbourhood = moore(2, dimensionNumber),
        origin = [],
        dimension;

    for (dimension = 0; dimension < dimensionNumber; dimension++) {
        origin.push(0);
    }

    neighbourhood.push(origin);

    // sort by ascending distance to optimize proximity checks
    // see point 5.1 in Parallel Poisson Disk Sampling by Li-Yi Wei, 2008
    // http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.460.3061&rank=1
    neighbourhood.sort(function (n1, n2) {
        var squareDist1 = 0,
            squareDist2 = 0;

        for (var dimension = 0; dimension < dimensionNumber; dimension++) {
            squareDist1 += Math.pow(n1[dimension], 2);
            squareDist2 += Math.pow(n2[dimension], 2);
        }

        if (squareDist1 < squareDist2) {
            return -1;
        } else if(squareDist1 > squareDist2) {
            return 1;
        } else {
            return 0;
        }
    });

    return neighbourhood;
};


/**
 * PoissonDiskSampling constructor
 * @param {Array} shape Shape of the space
 * @param {float} minDistance Minimum distance between each points
 * @param {float} [maxDistance] Maximum distance between each points, defaults to minDistance * 2
 * @param {int} [maxTries] Number of times the algorithm has to try to place a point in the neighbourhood of another points, defaults to 30
 * @param {function|null} [rng] RNG function, defaults to Math.random
 * @constructor
 */
var PoissonDiskSampling = function PoissonDiskSampling (shape, minDistance, maxDistance, maxTries, rng) {
    maxDistance = maxDistance || minDistance * 2;

    this.shape = shape;
    this.dimension = this.shape.length;
    this.minDistance = minDistance;
    this.squaredMinDistance = minDistance * minDistance;
    this.deltaDistance = maxDistance - minDistance;
    this.cellSize = minDistance / Math.sqrt(this.dimension);
    this.maxTries = maxTries || 30;
    this.rng = rng || Math.random;

    this.neighbourhood = getNeighbourhood(this.dimension);

    this.currentPoint = null;
    this.processList = [];
    this.samplePoints = [];

    // cache grid

    this.gridShape = [];

    for (var i = 0; i < this.dimension; i++) {
        this.gridShape.push(Math.ceil(shape[i] / this.cellSize));
    }

    this.grid = zeros(this.gridShape, 'uint32'); //will store references to samplePoints
};

PoissonDiskSampling.prototype.shape = null;
PoissonDiskSampling.prototype.dimension = null;
PoissonDiskSampling.prototype.minDistance = null;
PoissonDiskSampling.prototype.squaredMinDistance = null;
PoissonDiskSampling.prototype.deltaDistance = null;
PoissonDiskSampling.prototype.cellSize = null;
PoissonDiskSampling.prototype.maxTries = null;
PoissonDiskSampling.prototype.rng = null;
PoissonDiskSampling.prototype.neighbourhood = null;

PoissonDiskSampling.prototype.currentPoint = null;
PoissonDiskSampling.prototype.processList = null;
PoissonDiskSampling.prototype.samplePoints = null;
PoissonDiskSampling.prototype.gridShape = null;
PoissonDiskSampling.prototype.grid = null;

/**
 * Add a totally random point in the grid
 * @returns {Array} The point added to the grid
 */
PoissonDiskSampling.prototype.addRandomPoint = function () {
    var point = new Array(this.dimension);

    for (var i = 0; i < this.dimension; i++) {
        point[i] = this.rng() * this.shape[i];
    }

    return this.directAddPoint(point);
};

/**
 * Add a given point to the grid
 * @param {Array} point Point
 * @returns {Array|null} The point added to the grid, null if the point is out of the bound or not of the correct dimension
 */
PoissonDiskSampling.prototype.addPoint = function (point) {
    var dimension,
        valid = true;

    if (point.length === this.dimension) {
        for (dimension = 0; dimension < this.dimension && valid; dimension++) {
            valid = (point[dimension] >= 0 && point[dimension] <= this.shape[dimension]);
        }
    } else {
        valid = false;
    }

    return valid ? this.directAddPoint(point) : null;
};

/**
 * Add a given point to the grid, without any check
 * @param {Array} point Point
 * @returns {Array} The point added to the grid
 * @protected
 */
PoissonDiskSampling.prototype.directAddPoint = function (point) {
    var internalArrayIndex = 0,
        stride = this.grid.stride,
        dimension;

    this.processList.push(point);
    this.samplePoints.push(point);

    for (dimension = 0; dimension < this.dimension; dimension++) {
        internalArrayIndex += ((point[dimension] / this.cellSize) | 0) * stride[dimension];
    }

    this.grid.data[internalArrayIndex] = this.samplePoints.length; // store the point reference

    return point;
};

/**
 * Check whether a given point is in the neighbourhood of existing points
 * @param {Array} point Point
 * @returns {boolean} Whether the point is in the neighbourhood of another point
 * @protected
 */
PoissonDiskSampling.prototype.inNeighbourhood = function (point) {
    var dimensionNumber = this.dimension,
        stride = this.grid.stride,
        neighbourIndex,
        internalArrayIndex,
        dimension,
        currentDimensionValue,
        existingPoint;

    for (neighbourIndex = 0; neighbourIndex < this.neighbourhood.length; neighbourIndex++) {
        internalArrayIndex = 0;

        for (dimension = 0; dimension < dimensionNumber; dimension++) {
            currentDimensionValue = ((point[dimension] / this.cellSize) | 0) + this.neighbourhood[neighbourIndex][dimension];

            if (currentDimensionValue >= 0 && currentDimensionValue < this.gridShape[dimension]) {
                internalArrayIndex += currentDimensionValue * stride[dimension];
            }
        }

        if (this.grid.data[internalArrayIndex] !== 0) {
            existingPoint = this.samplePoints[this.grid.data[internalArrayIndex] - 1];

            if (squaredEuclideanDistance(point, existingPoint) < this.squaredMinDistance) {
                return true;
            }
        }
    }

    return false;
};

/**
 * Try to generate a new point in the grid, returns null if it wasn't possible
 * @returns {Array|null} The added point or null
 */
PoissonDiskSampling.prototype.next = function () {
    var tries,
        angle,
        distance,
        currentPoint,
        newPoint,
        inShape,
        i;

    while (this.processList.length > 0) {
        if (this.currentPoint === null) {
            this.currentPoint = this.processList.shift();
        }

        currentPoint = this.currentPoint;

        for (tries = 0; tries < this.maxTries; tries++) {
            inShape = true;
            distance = this.minDistance + this.deltaDistance * this.rng();

            if (this.dimension === 2) {
                angle = this.rng() * Math.PI * 2;
                newPoint = [
                    Math.cos(angle),
                    Math.sin(angle)
                ];
            } else {
                newPoint = sphereRandom(this.dimension, this.rng);
            }

            for (i = 0; inShape && i < this.dimension; i++) {
                newPoint[i] = currentPoint[i] + newPoint[i] * distance;
                inShape = (newPoint[i] >= 0 && newPoint[i] <= this.shape[i] - 1)
            }

            if (inShape && !this.inNeighbourhood(newPoint)) {
                return this.directAddPoint(newPoint);
            }
        }

        if (tries === this.maxTries) {
            this.currentPoint = null;
        }
    }

    return null;
};

/**
 * Automatically fill the grid, adding a random point to start the process if needed.
 * Will block the thread, probably best to use it in a web worker or child process.
 * @returns {Array[]} Sample points
 */
PoissonDiskSampling.prototype.fill = function () {
    if (this.samplePoints.length === 0) {
        this.addRandomPoint();
    }

    while(this.next()) {}

    return this.samplePoints;
};

/**
 * Get all the points in the grid.
 * @returns {Array[]} Sample points
 */
PoissonDiskSampling.prototype.getAllPoints = function () {
    return this.samplePoints;
};

/**
 * Reinitialize the grid as well as the internal state
 */
PoissonDiskSampling.prototype.reset = function () {
    var gridData = this.grid.data,
        i = 0;

    // reset the cache grid
    for (i = 0; i < gridData.length; i++) {
        gridData[i] = 0;
    }

    // new array for the samplePoints as it is passed by reference to the outside
    this.samplePoints = [];

    // reset the internal state
    this.currentPoint = null;
    this.processList.length = 0;
};

module.exports = PoissonDiskSampling;


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ndarray = __webpack_require__(244)

function dtypeToType(dtype) {
  switch(dtype) {
    case 'uint8':
      return Uint8Array;
    case 'uint16':
      return Uint16Array;
    case 'uint32':
      return Uint32Array;
    case 'int8':
      return Int8Array;
    case 'int16':
      return Int16Array;
    case 'int32':
      return Int32Array;
    case 'float':
    case 'float32':
      return Float32Array;
    case 'double':
    case 'float64':
      return Float64Array;
    case 'uint8_clamped':
      return Uint8ClampedArray;
    case 'generic':
    case 'buffer':
    case 'data':
    case 'dataview':
      return ArrayBuffer;
    case 'array':
      return Array;
  }
}

module.exports = function zeros(shape, dtype) {
  dtype = dtype || 'float64';
  var sz = 1;
  for(var i=0; i<shape.length; ++i) {
    sz *= shape[i];
  }
  return ndarray(new (dtypeToType(dtype))(sz), shape);
}


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

var iota = __webpack_require__(245)
var isBuffer = __webpack_require__(246)

var hasTypedArrays  = ((typeof Float64Array) !== "undefined")

function compare1st(a, b) {
  return a[0] - b[0]
}

function order() {
  var stride = this.stride
  var terms = new Array(stride.length)
  var i
  for(i=0; i<terms.length; ++i) {
    terms[i] = [Math.abs(stride[i]), i]
  }
  terms.sort(compare1st)
  var result = new Array(terms.length)
  for(i=0; i<result.length; ++i) {
    result[i] = terms[i][1]
  }
  return result
}

function compileConstructor(dtype, dimension) {
  var className = ["View", dimension, "d", dtype].join("")
  if(dimension < 0) {
    className = "View_Nil" + dtype
  }
  var useGetters = (dtype === "generic")

  if(dimension === -1) {
    //Special case for trivial arrays
    var code =
      "function "+className+"(a){this.data=a;};\
var proto="+className+".prototype;\
proto.dtype='"+dtype+"';\
proto.index=function(){return -1};\
proto.size=0;\
proto.dimension=-1;\
proto.shape=proto.stride=proto.order=[];\
proto.lo=proto.hi=proto.transpose=proto.step=\
function(){return new "+className+"(this.data);};\
proto.get=proto.set=function(){};\
proto.pick=function(){return null};\
return function construct_"+className+"(a){return new "+className+"(a);}"
    var procedure = new Function(code)
    return procedure()
  } else if(dimension === 0) {
    //Special case for 0d arrays
    var code =
      "function "+className+"(a,d) {\
this.data = a;\
this.offset = d\
};\
var proto="+className+".prototype;\
proto.dtype='"+dtype+"';\
proto.index=function(){return this.offset};\
proto.dimension=0;\
proto.size=1;\
proto.shape=\
proto.stride=\
proto.order=[];\
proto.lo=\
proto.hi=\
proto.transpose=\
proto.step=function "+className+"_copy() {\
return new "+className+"(this.data,this.offset)\
};\
proto.pick=function "+className+"_pick(){\
return TrivialArray(this.data);\
};\
proto.valueOf=proto.get=function "+className+"_get(){\
return "+(useGetters ? "this.data.get(this.offset)" : "this.data[this.offset]")+
"};\
proto.set=function "+className+"_set(v){\
return "+(useGetters ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v")+"\
};\
return function construct_"+className+"(a,b,c,d){return new "+className+"(a,d)}"
    var procedure = new Function("TrivialArray", code)
    return procedure(CACHED_CONSTRUCTORS[dtype][0])
  }

  var code = ["'use strict'"]

  //Create constructor for view
  var indices = iota(dimension)
  var args = indices.map(function(i) { return "i"+i })
  var index_str = "this.offset+" + indices.map(function(i) {
        return "this.stride[" + i + "]*i" + i
      }).join("+")
  var shapeArg = indices.map(function(i) {
      return "b"+i
    }).join(",")
  var strideArg = indices.map(function(i) {
      return "c"+i
    }).join(",")
  code.push(
    "function "+className+"(a," + shapeArg + "," + strideArg + ",d){this.data=a",
      "this.shape=[" + shapeArg + "]",
      "this.stride=[" + strideArg + "]",
      "this.offset=d|0}",
    "var proto="+className+".prototype",
    "proto.dtype='"+dtype+"'",
    "proto.dimension="+dimension)

  //view.size:
  code.push("Object.defineProperty(proto,'size',{get:function "+className+"_size(){\
return "+indices.map(function(i) { return "this.shape["+i+"]" }).join("*"),
"}})")

  //view.order:
  if(dimension === 1) {
    code.push("proto.order=[0]")
  } else {
    code.push("Object.defineProperty(proto,'order',{get:")
    if(dimension < 4) {
      code.push("function "+className+"_order(){")
      if(dimension === 2) {
        code.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})")
      } else if(dimension === 3) {
        code.push(
"var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);\
if(s0>s1){\
if(s1>s2){\
return [2,1,0];\
}else if(s0>s2){\
return [1,2,0];\
}else{\
return [1,0,2];\
}\
}else if(s0>s2){\
return [2,0,1];\
}else if(s2>s1){\
return [0,1,2];\
}else{\
return [0,2,1];\
}}})")
      }
    } else {
      code.push("ORDER})")
    }
  }

  //view.set(i0, ..., v):
  code.push(
"proto.set=function "+className+"_set("+args.join(",")+",v){")
  if(useGetters) {
    code.push("return this.data.set("+index_str+",v)}")
  } else {
    code.push("return this.data["+index_str+"]=v}")
  }

  //view.get(i0, ...):
  code.push("proto.get=function "+className+"_get("+args.join(",")+"){")
  if(useGetters) {
    code.push("return this.data.get("+index_str+")}")
  } else {
    code.push("return this.data["+index_str+"]}")
  }

  //view.index:
  code.push(
    "proto.index=function "+className+"_index(", args.join(), "){return "+index_str+"}")

  //view.hi():
  code.push("proto.hi=function "+className+"_hi("+args.join(",")+"){return new "+className+"(this.data,"+
    indices.map(function(i) {
      return ["(typeof i",i,"!=='number'||i",i,"<0)?this.shape[", i, "]:i", i,"|0"].join("")
    }).join(",")+","+
    indices.map(function(i) {
      return "this.stride["+i + "]"
    }).join(",")+",this.offset)}")

  //view.lo():
  var a_vars = indices.map(function(i) { return "a"+i+"=this.shape["+i+"]" })
  var c_vars = indices.map(function(i) { return "c"+i+"=this.stride["+i+"]" })
  code.push("proto.lo=function "+className+"_lo("+args.join(",")+"){var b=this.offset,d=0,"+a_vars.join(",")+","+c_vars.join(","))
  for(var i=0; i<dimension; ++i) {
    code.push(
"if(typeof i"+i+"==='number'&&i"+i+">=0){\
d=i"+i+"|0;\
b+=c"+i+"*d;\
a"+i+"-=d}")
  }
  code.push("return new "+className+"(this.data,"+
    indices.map(function(i) {
      return "a"+i
    }).join(",")+","+
    indices.map(function(i) {
      return "c"+i
    }).join(",")+",b)}")

  //view.step():
  code.push("proto.step=function "+className+"_step("+args.join(",")+"){var "+
    indices.map(function(i) {
      return "a"+i+"=this.shape["+i+"]"
    }).join(",")+","+
    indices.map(function(i) {
      return "b"+i+"=this.stride["+i+"]"
    }).join(",")+",c=this.offset,d=0,ceil=Math.ceil")
  for(var i=0; i<dimension; ++i) {
    code.push(
"if(typeof i"+i+"==='number'){\
d=i"+i+"|0;\
if(d<0){\
c+=b"+i+"*(a"+i+"-1);\
a"+i+"=ceil(-a"+i+"/d)\
}else{\
a"+i+"=ceil(a"+i+"/d)\
}\
b"+i+"*=d\
}")
  }
  code.push("return new "+className+"(this.data,"+
    indices.map(function(i) {
      return "a" + i
    }).join(",")+","+
    indices.map(function(i) {
      return "b" + i
    }).join(",")+",c)}")

  //view.transpose():
  var tShape = new Array(dimension)
  var tStride = new Array(dimension)
  for(var i=0; i<dimension; ++i) {
    tShape[i] = "a[i"+i+"]"
    tStride[i] = "b[i"+i+"]"
  }
  code.push("proto.transpose=function "+className+"_transpose("+args+"){"+
    args.map(function(n,idx) { return n + "=(" + n + "===undefined?" + idx + ":" + n + "|0)"}).join(";"),
    "var a=this.shape,b=this.stride;return new "+className+"(this.data,"+tShape.join(",")+","+tStride.join(",")+",this.offset)}")

  //view.pick():
  code.push("proto.pick=function "+className+"_pick("+args+"){var a=[],b=[],c=this.offset")
  for(var i=0; i<dimension; ++i) {
    code.push("if(typeof i"+i+"==='number'&&i"+i+">=0){c=(c+this.stride["+i+"]*i"+i+")|0}else{a.push(this.shape["+i+"]);b.push(this.stride["+i+"])}")
  }
  code.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}")

  //Add return statement
  code.push("return function construct_"+className+"(data,shape,stride,offset){return new "+className+"(data,"+
    indices.map(function(i) {
      return "shape["+i+"]"
    }).join(",")+","+
    indices.map(function(i) {
      return "stride["+i+"]"
    }).join(",")+",offset)}")

  //Compile procedure
  var procedure = new Function("CTOR_LIST", "ORDER", code.join("\n"))
  return procedure(CACHED_CONSTRUCTORS[dtype], order)
}

function arrayDType(data) {
  if(isBuffer(data)) {
    return "buffer"
  }
  if(hasTypedArrays) {
    switch(Object.prototype.toString.call(data)) {
      case "[object Float64Array]":
        return "float64"
      case "[object Float32Array]":
        return "float32"
      case "[object Int8Array]":
        return "int8"
      case "[object Int16Array]":
        return "int16"
      case "[object Int32Array]":
        return "int32"
      case "[object Uint8Array]":
        return "uint8"
      case "[object Uint16Array]":
        return "uint16"
      case "[object Uint32Array]":
        return "uint32"
      case "[object Uint8ClampedArray]":
        return "uint8_clamped"
    }
  }
  if(Array.isArray(data)) {
    return "array"
  }
  return "generic"
}

var CACHED_CONSTRUCTORS = {
  "float32":[],
  "float64":[],
  "int8":[],
  "int16":[],
  "int32":[],
  "uint8":[],
  "uint16":[],
  "uint32":[],
  "array":[],
  "uint8_clamped":[],
  "buffer":[],
  "generic":[]
}

;(function() {
  for(var id in CACHED_CONSTRUCTORS) {
    CACHED_CONSTRUCTORS[id].push(compileConstructor(id, -1))
  }
});

function wrappedNDArrayCtor(data, shape, stride, offset) {
  if(data === undefined) {
    var ctor = CACHED_CONSTRUCTORS.array[0]
    return ctor([])
  } else if(typeof data === "number") {
    data = [data]
  }
  if(shape === undefined) {
    shape = [ data.length ]
  }
  var d = shape.length
  if(stride === undefined) {
    stride = new Array(d)
    for(var i=d-1, sz=1; i>=0; --i) {
      stride[i] = sz
      sz *= shape[i]
    }
  }
  if(offset === undefined) {
    offset = 0
    for(var i=0; i<d; ++i) {
      if(stride[i] < 0) {
        offset -= (shape[i]-1)*stride[i]
      }
    }
  }
  var dtype = arrayDType(data)
  var ctor_list = CACHED_CONSTRUCTORS[dtype]
  while(ctor_list.length <= d+1) {
    ctor_list.push(compileConstructor(dtype, ctor_list.length-1))
  }
  var ctor = ctor_list[d+1]
  return ctor(data, shape, stride, offset)
}

module.exports = wrappedNDArrayCtor


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function iota(n) {
  var result = new Array(n)
  for(var i=0; i<n; ++i) {
    result[i] = i
  }
  return result
}

module.exports = iota

/***/ }),
/* 246 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 247 */
/***/ (function(module, exports) {

module.exports = function moore(range, dimensions) {
  range = range || 1
  dimensions = dimensions || 2

  var size = range * 2 + 1
  var length = Math.pow(size, dimensions) - 1
  var neighbors = new Array(length)

  for (var i = 0; i < length; i++) {
    var neighbor = neighbors[i] = new Array(dimensions)
    var index = i < length / 2 ? i : i + 1
    for (var dimension = 1; dimension <= dimensions; dimension++) {
      var value = index % Math.pow(size, dimension)
      neighbor[dimension - 1] = value / Math.pow(size, dimension - 1) - range
      index -= value
    }
  }

  return neighbors
}


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// sphere-random module by Mikola Lysenko under the MIT License
// waiting for https://github.com/scijs/sphere-random/pull/1 to be merged

module.exports = sampleSphere;

/**
 * @param {int} d Dimensions
 * @param {Function} rng
 * @returns {Array}
 */
function sampleSphere(d, rng) {
    var v = new Array(d),
        d2 = Math.floor(d/2) << 1,
        r2 = 0.0,
        rr,
        r,
        theta,
        h,
        i;

    for (i = 0; i < d2; i += 2) {
        rr = -2.0 * Math.log(rng());
        r =  Math.sqrt(rr);
        theta = 2.0 * Math.PI * rng();

        r2+= rr;
        v[i] = r * Math.cos(theta);
        v[i+1] = r * Math.sin(theta);
    }

    if (d % 2) {
        var x = Math.sqrt(-2.0 * Math.log(rng())) * Math.cos(2.0 * Math.PI * rng());
        v[d - 1] = x;
        r2+= Math.pow(x, 2);
    }

    h = 1.0 / Math.sqrt(r2);

    for (i = 0; i < d; ++i) {
        v[i] *= h;
    }

    return v;
}


/***/ }),
/* 249 */
/***/ (function(module, exports) {

module.exports = function (point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * A speed-improved perlin and simplex noise algorithms for 2D.
 *
 * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 * Converted to Javascript by Joseph Gentle.
 *
 * Version 2012-03-09
 *
 * This code was placed in the public domain by its original author,
 * Stefan Gustavson. You may use it as you see fit, but
 * attribution is appreciated.
 *
 */

(function(global){
  var module = global.noise = {};

  function Grad(x, y, z) {
    this.x = x; this.y = y; this.z = z;
  }
  
  Grad.prototype.dot2 = function(x, y) {
    return this.x*x + this.y*y;
  };

  Grad.prototype.dot3 = function(x, y, z) {
    return this.x*x + this.y*y + this.z*z;
  };

  var grad3 = [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
               new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
               new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];

  var p = [151,160,137,91,90,15,
  131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
  190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
  88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
  77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
  102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
  135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
  5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
  223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
  129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
  251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
  49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
  138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
  // To remove the need for index wrapping, double the permutation table length
  var perm = new Array(512);
  var gradP = new Array(512);

  // This isn't a very good seeding function, but it works ok. It supports 2^16
  // different seed values. Write something better if you need more seeds.
  module.seed = function(seed) {
    if(seed > 0 && seed < 1) {
      // Scale the seed out
      seed *= 65536;
    }

    seed = Math.floor(seed);
    if(seed < 256) {
      seed |= seed << 8;
    }

    for(var i = 0; i < 256; i++) {
      var v;
      if (i & 1) {
        v = p[i] ^ (seed & 255);
      } else {
        v = p[i] ^ ((seed>>8) & 255);
      }

      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3[v % 12];
    }
  };

  module.seed(0);

  /*
  for(var i=0; i<256; i++) {
    perm[i] = perm[i + 256] = p[i];
    gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
  }*/

  // Skewing and unskewing factors for 2, 3, and 4 dimensions
  var F2 = 0.5*(Math.sqrt(3)-1);
  var G2 = (3-Math.sqrt(3))/6;

  var F3 = 1/3;
  var G3 = 1/6;

  // 2D simplex noise
  module.simplex2 = function(xin, yin) {
    var n0, n1, n2; // Noise contributions from the three corners
    // Skew the input space to determine which simplex cell we're in
    var s = (xin+yin)*F2; // Hairy factor for 2D
    var i = Math.floor(xin+s);
    var j = Math.floor(yin+s);
    var t = (i+j)*G2;
    var x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
    var y0 = yin-j+t;
    // For the 2D case, the simplex shape is an equilateral triangle.
    // Determine which simplex we are in.
    var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
    if(x0>y0) { // lower triangle, XY order: (0,0)->(1,0)->(1,1)
      i1=1; j1=0;
    } else {    // upper triangle, YX order: (0,0)->(0,1)->(1,1)
      i1=0; j1=1;
    }
    // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
    // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
    // c = (3-sqrt(3))/6
    var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
    var y1 = y0 - j1 + G2;
    var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
    var y2 = y0 - 1 + 2 * G2;
    // Work out the hashed gradient indices of the three simplex corners
    i &= 255;
    j &= 255;
    var gi0 = gradP[i+perm[j]];
    var gi1 = gradP[i+i1+perm[j+j1]];
    var gi2 = gradP[i+1+perm[j+1]];
    // Calculate the contribution from the three corners
    var t0 = 0.5 - x0*x0-y0*y0;
    if(t0<0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot2(x0, y0);  // (x,y) of grad3 used for 2D gradient
    }
    var t1 = 0.5 - x1*x1-y1*y1;
    if(t1<0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot2(x1, y1);
    }
    var t2 = 0.5 - x2*x2-y2*y2;
    if(t2<0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot2(x2, y2);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 70 * (n0 + n1 + n2);
  };

  // 3D simplex noise
  module.simplex3 = function(xin, yin, zin) {
    var n0, n1, n2, n3; // Noise contributions from the four corners

    // Skew the input space to determine which simplex cell we're in
    var s = (xin+yin+zin)*F3; // Hairy factor for 2D
    var i = Math.floor(xin+s);
    var j = Math.floor(yin+s);
    var k = Math.floor(zin+s);

    var t = (i+j+k)*G3;
    var x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
    var y0 = yin-j+t;
    var z0 = zin-k+t;

    // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
    // Determine which simplex we are in.
    var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
    var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
    if(x0 >= y0) {
      if(y0 >= z0)      { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
      else if(x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
      else              { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
    } else {
      if(y0 < z0)      { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
      else if(x0 < z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
      else             { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
    }
    // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
    // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
    // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
    // c = 1/6.
    var x1 = x0 - i1 + G3; // Offsets for second corner
    var y1 = y0 - j1 + G3;
    var z1 = z0 - k1 + G3;

    var x2 = x0 - i2 + 2 * G3; // Offsets for third corner
    var y2 = y0 - j2 + 2 * G3;
    var z2 = z0 - k2 + 2 * G3;

    var x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner
    var y3 = y0 - 1 + 3 * G3;
    var z3 = z0 - 1 + 3 * G3;

    // Work out the hashed gradient indices of the four simplex corners
    i &= 255;
    j &= 255;
    k &= 255;
    var gi0 = gradP[i+   perm[j+   perm[k   ]]];
    var gi1 = gradP[i+i1+perm[j+j1+perm[k+k1]]];
    var gi2 = gradP[i+i2+perm[j+j2+perm[k+k2]]];
    var gi3 = gradP[i+ 1+perm[j+ 1+perm[k+ 1]]];

    // Calculate the contribution from the four corners
    var t0 = 0.5 - x0*x0-y0*y0-z0*z0;
    if(t0<0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot3(x0, y0, z0);  // (x,y) of grad3 used for 2D gradient
    }
    var t1 = 0.5 - x1*x1-y1*y1-z1*z1;
    if(t1<0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
    }
    var t2 = 0.5 - x2*x2-y2*y2-z2*z2;
    if(t2<0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
    }
    var t3 = 0.5 - x3*x3-y3*y3-z3*z3;
    if(t3<0) {
      n3 = 0;
    } else {
      t3 *= t3;
      n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 32 * (n0 + n1 + n2 + n3);

  };

  // ##### Perlin noise stuff

  function fade(t) {
    return t*t*t*(t*(t*6-15)+10);
  }

  function lerp(a, b, t) {
    return (1-t)*a + t*b;
  }

  // 2D Perlin Noise
  module.perlin2 = function(x, y) {
    // Find unit grid cell containing point
    var X = Math.floor(x), Y = Math.floor(y);
    // Get relative xy coordinates of point within that cell
    x = x - X; y = y - Y;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255; Y = Y & 255;

    // Calculate noise contributions from each of the four corners
    var n00 = gradP[X+perm[Y]].dot2(x, y);
    var n01 = gradP[X+perm[Y+1]].dot2(x, y-1);
    var n10 = gradP[X+1+perm[Y]].dot2(x-1, y);
    var n11 = gradP[X+1+perm[Y+1]].dot2(x-1, y-1);

    // Compute the fade curve value for x
    var u = fade(x);

    // Interpolate the four results
    return lerp(
        lerp(n00, n10, u),
        lerp(n01, n11, u),
       fade(y));
  };

  // 3D Perlin Noise
  module.perlin3 = function(x, y, z) {
    // Find unit grid cell containing point
    var X = Math.floor(x), Y = Math.floor(y), Z = Math.floor(z);
    // Get relative xyz coordinates of point within that cell
    x = x - X; y = y - Y; z = z - Z;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255; Y = Y & 255; Z = Z & 255;

    // Calculate noise contributions from each of the eight corners
    var n000 = gradP[X+  perm[Y+  perm[Z  ]]].dot3(x,   y,     z);
    var n001 = gradP[X+  perm[Y+  perm[Z+1]]].dot3(x,   y,   z-1);
    var n010 = gradP[X+  perm[Y+1+perm[Z  ]]].dot3(x,   y-1,   z);
    var n011 = gradP[X+  perm[Y+1+perm[Z+1]]].dot3(x,   y-1, z-1);
    var n100 = gradP[X+1+perm[Y+  perm[Z  ]]].dot3(x-1,   y,   z);
    var n101 = gradP[X+1+perm[Y+  perm[Z+1]]].dot3(x-1,   y, z-1);
    var n110 = gradP[X+1+perm[Y+1+perm[Z  ]]].dot3(x-1, y-1,   z);
    var n111 = gradP[X+1+perm[Y+1+perm[Z+1]]].dot3(x-1, y-1, z-1);

    // Compute the fade curve value for x, y, z
    var u = fade(x);
    var v = fade(y);
    var w = fade(z);

    // Interpolate
    return lerp(
        lerp(
          lerp(n000, n100, u),
          lerp(n001, n101, u), w),
        lerp(
          lerp(n010, n110, u),
          lerp(n011, n111, u), w),
       v);
  };

})( false ? this : module.exports);

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fastRandom = __webpack_require__(252)
const { Perlin2 } = __webpack_require__(253)
const { map } = __webpack_require__(102)

module.exports = ({
  seed = 'wipmap',
  offset = [0, 0],
  steps = [1, 1]
} = {}) => {
  seed = parseInt(seed, 36)
  const r = fastRandom(seed)
  const api = {
    random: r.nextFloat,
    randomFloat: (min, max) => r.nextFloat() * (max - min) + min,
    randomInt: (min, max) => Math.floor(r.nextFloat() * (max - min) + min),
    perlinMap: (resolution, clamp = [0, 1]) => {
      const noise = new Perlin2(api.random())
      return (i, j) => {
        const x = (offset[0] + i * steps[0]) / resolution
        const y = (offset[1] + j * steps[1]) / resolution
        const value = noise.gen(x % 256, y % 256)
        return map(value, -1, 1, ...clamp)
      }
    }
  }
  return api
}


/***/ }),
/* 252 */
/***/ (function(module, exports) {

function random(seed) {
	function _seed(s) {
		if ((seed = (s|0) % 2147483647) <= 0) {
			seed += 2147483646;
		}
	}

	function _nextInt() {
		return seed = seed * 48271 % 2147483647;
	}

	function _nextFloat() {
		return (_nextInt() - 1) / 2147483646;
	}

	_seed(seed);

	return {
		seed: _seed,
		nextInt: _nextInt,
		nextFloat: _nextFloat
	};
}

module.exports = random;


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,n){ true?module.exports=n():"function"==typeof define&&define.amd?define("tumult",[],n):"object"==typeof exports?exports.tumult=n():t.tumult=n()}(this,function(){return function(t){function n(e){if(r[e])return r[e].exports;var o=r[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var r={};return n.m=t,n.c=r,n.d=function(t,r,e){n.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:e})},n.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(r,"a",r),r},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=11)}([function(t,n,r){"use strict";r.d(n,"a",function(){return c});var e=r(13),o=r.n(e),c=function(t){this.p=new Uint8Array(512),this.seed(t)};c.prototype.gen=function(){},c.prototype.seed=function(t){var n=this;t=t||Math.random();var r,e=o.a.create(t);for(r=0;r<256;r++)n.p[r]=r;for(r=0;r<256;r++){var c=e(256),u=n.p[r];n.p[r]=n.p[c],n.p[c]=u}for(r=0;r<256;r++)n.p[r+256]=n.p[r]},c.prototype.transform=function(t){var n=this;return function(){for(var r=[],e=arguments.length;e--;)r[e]=arguments[e];return t.apply(n,r)}.bind(this)},c.prototype.octavate=function(){for(var t=this,n=[],r=arguments.length;r--;)n[r]=arguments[r];for(var e=n[0],o=n.slice(1),c=0,u=0,i=0;i<e;i++){var a=1<<i;c+=t.gen.apply(t,o.map(function(t){return t*a}))/a}for(var i=0;i<e;i++)u+=1/(1<<i);return c/u}},function(t,n,r){"use strict";function e(){for(var t=[],n=arguments.length;n--;)t[n]=arguments[n];var r=t.slice(1),e=t[0]-r.reduce(function(t,n){return t+n*n},0);return e*e*e*e}function o(t,n,r){return t*(1-r)+n*r}function c(t){return t*t*t*(10+t*(6*t-15))}n.d=o,n.c=c,r.d(n,"b",function(){return u}),r.d(n,"a",function(){return i});var u=e.bind(null,1),i=e.bind(null,.5)},function(t,n,r){"use strict";var e=r(0),o=r(3),c=r(1),u=function(t){function n(n){t.call(this,n)}return t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n,n.prototype.gen=function(t){var n=o.a.bind(null,this.p),r=Math.floor(t)%256,e=t-r,u=n(r).dot(e),i=n(r+1).dot(e-1);return Object(c.d)(u,i,Object(c.c)(e))},n}(e.a);n.a=u},function(t,n,r){"use strict";function e(t){this.x=t}function o(t,n){var r=t[n]%c.length;return c[r]}n.a=o,e.prototype.dot=function(t){return this.x*t};var c=[new e(1),new e(-1)]},function(t,n,r){"use strict";var e=r(0),o=r(5),c=r(1),u=function(t){function n(n){t.call(this,n)}return t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n,n.prototype.gen=function(t,n){var r=o.c.bind(null,this.p),e=Math.trunc(t)%256,u=Math.trunc(n)%256,i=t-e,a=n-u,f=r(e,u).dot(i,a),d=r(e+1,u).dot(i-1,a),p=r(e,u+1).dot(i,a-1),s=r(e+1,u+1).dot(i-1,a-1);return Object(c.d)(Object(c.d)(f,d,Object(c.c)(i)),Object(c.d)(p,s,Object(c.c)(i)),Object(c.c)(a))},n}(e.a);n.a=u},function(t,n,r){"use strict";function e(t,n){this.x=t,this.y=n}function o(t,n,r){var e=t[n+t[r]]%c.length;return c[e]}n.c=o,r.d(n,"b",function(){return u}),r.d(n,"a",function(){return i}),e.prototype.dot=function(t,n){return this.x*t+this.y*n};var c=[new e(1,0),new e(1,1),new e(0,1),new e(-1,1),new e(-1,0),new e(-1,-1),new e(0,-1),new e(1,-1)],u=.5*(Math.sqrt(3)-1),i=(3-Math.sqrt(3))/6},function(t,n,r){"use strict";var e=r(0),o=r(15),c=r(1),u=function(t){function n(n){t.call(this,n)}return t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n,n.prototype.gen=function(t,n,r){var e=o.a.bind(null,this.p),u=Math.trunc(t)%256,i=Math.trunc(n)%256,a=Math.trunc(r)%256,f=t-u,d=n-i,p=r-a,s=e(u,i,a).dot(f,d,p),l=e(u+1,i,a).dot(f-1,d,p),h=e(u,i+1,a).dot(f,d-1,p),b=e(u+1,i+1,a).dot(f-1,d-1,p),v=e(u,i,a+1).dot(f,d,p-1),j=e(u+1,i,a+1).dot(f-1,d,p-1),O=e(u,i+1,a+1).dot(f,d-1,p-1),w=e(u+1,i+1,a+1).dot(f-1,d-1,p-1);return Object(c.d)(Object(c.d)(Object(c.d)(s,l,f),Object(c.d)(h,b,f),Object(c.c)(d)),Object(c.d)(Object(c.d)(v,j,f),Object(c.d)(O,w,f),Object(c.c)(d)),Object(c.c)(p))},n}(e.a);n.a=u},function(t,n,r){"use strict";var e=r(0),o=r(16),c=r(1),u=function(t){function n(n){t.call(this,n)}return t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n,n.prototype.gen=function(t,n,r,e){var u=o.a.bind(null,this.p),i=Math.trunc(t)%256,a=Math.trunc(n)%256,f=Math.trunc(r)%256,d=Math.trunc(e)%256,p=t-i,s=n-a,l=r-f,h=e-d,b=u(i,a,f,d).dot(p,s,l,h),v=u(i+1,a,f,d).dot(p-1,s,l),j=u(i,a+1,f,d).dot(p,s-1,l),O=u(i+1,a+1,f,d).dot(p-1,s-1,l),w=u(i,a,f+1,d).dot(p,s,l-1),y=u(i+1,a,f+1,d).dot(p-1,s,l-1),g=u(i,a+1,f+1,d).dot(p,s-1,l-1),_=u(i+1,a+1,f+1,d).dot(p-1,s-1,l-1),x=u(i,a,f,d+1).dot(p,s,l,h-1),M=u(i+1,a,f,d+1).dot(p-1,s,l,h-1),m=u(i,a+1,f,d+1).dot(p,s-1,l,h-1),S=u(i+1,a+1,f,d+1).dot(p-1,s-1,l,h-1),P=u(i,a,f+1,d+1).dot(p,s,l-1,h-1),A=u(i+1,a,f+1,d+1).dot(p-1,s,l-1,h-1),C=u(i,a+1,f+1,d+1).dot(p,s-1,l-1,h-1),z=u(i+1,a+1,f+1,d+1).dot(p-1,s-1,l-1,h-1);return Object(c.d)(Object(c.d)(Object(c.d)(Object(c.d)(b,v,p),Object(c.d)(j,O,p),Object(c.c)(s)),Object(c.d)(Object(c.d)(w,y,p),Object(c.d)(g,_,p),Object(c.c)(s)),Object(c.c)(l)),Object(c.d)(Object(c.d)(Object(c.d)(x,M,p),Object(c.d)(m,S,p),Object(c.c)(s)),Object(c.d)(Object(c.d)(P,A,p),Object(c.d)(C,z,p),Object(c.c)(s)),Object(c.c)(l)),Object(c.c)(h))},n}(e.a);n.a=u},function(t,n,r){"use strict";var e=r(0),o=r(17),c=function(t){function n(n){t.call(this,n)}return t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n,n.prototype.gen=function(){for(var t=[],n=arguments.length;n--;)t[n]=arguments[n];var r=o.c.bind(null,this.p),e=[],c=[];0===o.a.length&&Object(o.b)(t.length);var u;for(u=0;u<t.length;u++)e[u]=Math.trunc(t[u])%256,c[u]=t[u]-e[u];var i=r(t.length,e,c);return Object(o.d)(i,c)},n}(e.a);n.a=c},function(t,n,r){"use strict";var e=r(0),o=r(3),c=r(1),u=function(t){function n(n){t.call(this,n)}return t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n,n.prototype.gen=function(t){var n=o.a.bind(null,this.p),r=Math.floor(t)%256,e=t-r;return.5*(Object(c.b)(e)*n(r).dot(e)+Object(c.b)(e-1)*n(r+1).dot(e-1))},n}(e.a);n.a=u},function(t,n,r){"use strict";var e=r(0),o=r(5),c=r(1),u=function(t){function n(n){t.call(this,n)}return t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n,n.prototype.gen=function(t,n){void 0===this&&console.log(this);var r=o.c.bind(null,this.p),e=(t+n)*o.b,u=Math.trunc(t+e),i=Math.trunc(n+e),a=(u+i)*o.a,f=u-a,d=i-a,p=t-f,s=n-d,l=p>s?1:0,h=p>s?0:1,b=p-l+o.a,v=s-h+o.a,j=p-1+2*o.a,O=s-1+2*o.a;return 70*(Object(c.a)(p,s)*r(u,i).dot(p,s)+Object(c.a)(b,v)*r(u+l,i+h).dot(b,v)+Object(c.a)(j,O)*r(u+1,i+1).dot(j,O))},n}(e.a);n.a=u},function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=r(12),o=r(18),c=r(2);r.d(n,"Perlin1",function(){return c.a});var u=r(4);r.d(n,"Perlin2",function(){return u.a});var i=r(6);r.d(n,"Perlin3",function(){return i.a});var a=r(7);r.d(n,"Perlin4",function(){return a.a});var f=r(8);r.d(n,"PerlinN",function(){return f.a});var d=r(9);r.d(n,"Simplex1",function(){return d.a});var p=r(10);r.d(n,"Simplex2",function(){return p.a}),n.default={Simplex1:o.a,Simplex2:o.b,Perlin1:e.a,Perlin2:e.b,Perlin3:e.c,Perlin4:e.d,PerlinN:e.e}},function(t,n,r){"use strict";var e=r(2);r.d(n,"a",function(){return e.a});var o=r(4);r.d(n,"b",function(){return o.a});var c=r(6);r.d(n,"c",function(){return c.a});var u=r(7);r.d(n,"d",function(){return u.a});var i=r(8);r.d(n,"e",function(){return i.a})},function(t,n,r){"use strict";var e=r(14),o=function(){var t=4022871197;return function(n){if(n){n=n.toString();for(var r=0;r<n.length;r++){t+=n.charCodeAt(r);var e=.02519603282416938*t;t=e>>>0,e-=t,e*=t,t=e>>>0,e-=t,t+=4294967296*e}return 2.3283064365386963e-10*(t>>>0)}t=4022871197}},c=function(t){return function(){var n,r,c=48,u=1,i=c,a=new Array(c),f=0,d=new o;for(n=0;n<c;n++)a[n]=d(Math.random());var p=function(){++i>=c&&(i=0);var t=1768863*a[i]+2.3283064365386963e-10*u;return a[i]=t-(u=0|t)},s=function(t){return Math.floor(t*(p()+1.1102230246251565e-16*(2097152*p()|0)))};s.string=function(t){var n,r="";for(n=0;n<t;n++)r+=String.fromCharCode(33+s(94));return r};var l=function(){var t=Array.prototype.slice.call(arguments);for(n=0;n<t.length;n++)for(r=0;r<c;r++)a[r]-=d(t[n]),a[r]<0&&(a[r]+=1)};return s.cleanString=function(t){return t=t.replace(/(^\s*)|(\s*$)/gi,""),t=t.replace(/[\x00-\x1F]/gi,""),t=t.replace(/\n /,"\n")},s.hashString=function(t){for(t=s.cleanString(t),d(t),n=0;n<t.length;n++)for(f=t.charCodeAt(n),r=0;r<c;r++)a[r]-=d(f),a[r]<0&&(a[r]+=1)},s.seed=function(t){void 0!==t&&null!==t||(t=Math.random()),"string"!=typeof t&&(t=e(t,function(t,n){return"function"==typeof n?n.toString():n})),s.initState(),s.hashString(t)},s.addEntropy=function(){var t=[];for(n=0;n<arguments.length;n++)t.push(arguments[n]);l(f+++(new Date).getTime()+t.join("")+Math.random())},s.initState=function(){for(d(),n=0;n<c;n++)a[n]=d(" ");u=1,i=c},s.done=function(){d=null},void 0!==t&&s.seed(t),s.range=function(t){return s(t)},s.random=function(){return s(Number.MAX_VALUE-1)/Number.MAX_VALUE},s.floatBetween=function(t,n){return s.random()*(n-t)+t},s.intBetween=function(t,n){return Math.floor(s.random()*(n-t+1))+t},s}()};c.create=function(t){return new c(t)},t.exports=c},function(t,n){function r(t,n,r,o){return JSON.stringify(t,e(n,o),r)}function e(t,n){var r=[],e=[];return null==n&&(n=function(t,n){return r[0]===n?"[Circular ~]":"[Circular ~."+e.slice(0,r.indexOf(n)).join(".")+"]"}),function(o,c){if(r.length>0){var u=r.indexOf(this);~u?r.splice(u+1):r.push(this),~u?e.splice(u,1/0,o):e.push(o),~r.indexOf(c)&&(c=n.call(this,o,c))}else r.push(c);return null==t?c:t.call(this,o,c)}}n=t.exports=r,n.getSerialize=e},function(t,n,r){"use strict";function e(t,n,r){this.x=t,this.y=n,this.z=r}function o(t,n,r,e){var o=t[n+t[r+t[e]]]%c.length;return c[o]}n.a=o,e.prototype.dot=function(t,n,r){return this.x*t+this.y*n+this.z*r};var c=[new e(1,1,1),new e(-1,1,1),new e(1,-1,1),new e(-1,-1,1),new e(1,1,0),new e(-1,1,0),new e(1,-1,0),new e(-1,-1,0),new e(1,1,-1),new e(-1,1,-1),new e(1,-1,-1),new e(-1,-1,-1)]},function(t,n,r){"use strict";function e(t,n,r,e){this.x=t,this.y=n,this.z=r,this.t=e}function o(t,n,r,e,o){var u=t[n+t[r+t[e+t[o]]]]%c.length;return c[u]}n.a=o,e.prototype.dot=function(t,n,r,e){return this.x*t+this.y*n+this.z*r+this.t*e};var c=[new e(0,1,1,1),new e(0,1,1,-1),new e(0,1,-1,1),new e(0,1,-1,-1),new e(0,-1,1,1),new e(0,-1,1,-1),new e(0,-1,-1,1),new e(0,-1,-1,-1),new e(1,0,1,1),new e(1,0,1,-1),new e(1,0,-1,1),new e(1,0,-1,-1),new e(-1,0,1,1),new e(-1,0,1,-1),new e(-1,0,-1,1),new e(-1,0,-1,-1),new e(1,1,0,1),new e(1,1,0,-1),new e(1,-1,0,1),new e(1,-1,0,-1),new e(-1,1,0,1),new e(-1,1,0,-1),new e(-1,-1,0,1),new e(-1,-1,0,-1),new e(1,1,1,0),new e(1,1,-1,0),new e(1,-1,1,0),new e(1,-1,-1,0),new e(-1,1,1,0),new e(-1,1,-1,0),new e(-1,-1,1,0),new e(-1,-1,-1,0)]},function(t,n,r){"use strict";function e(t,n){return 1===n.length?t[n[0]]:t[n[0]+e(t,n.slice(1))]}function o(t){this.R=t}function c(t){for(var n=0;n<2*t;n++){var r=new Array(t).fill(0);r[n%t]=n/t>=1?1:-1,f[n]=new o(r)}}function u(t,n){if(1===n.length)return Object(a.d)(t[0],t[1],Object(a.c)(n[0]));var r=t.slice(0,Math.floor(t.length/2)),e=t.slice(Math.ceil(t.length/2));return Object(a.d)(u(r,n.slice(0,n.length-1)),u(e,n.slice(0,n.length-1)),Object(a.c)(n[n.length-1]))}function i(t,n,r,o){for(var c=[],u=0;u<2<<n-1;u++){for(var i=r.slice(),a=o.slice(),d=u,p=0;p<n;p++)1&d&&(i[p]+=1,a[p]-=1),d>>=1;c[u]=f[e(t,i)%f.length].dot(a)}return c}r.d(n,"a",function(){return f}),n.b=c,n.d=u,n.c=i;var a=r(1);o.prototype.dot=function(t){for(var n=this,r=0,e=0;e<t.length;e++)r+=n.R[e]*t[e];return r};var f=[]},function(t,n,r){"use strict";var e=r(9);r.d(n,"a",function(){return e.a});var o=r(10);r.d(n,"b",function(){return o.a})}])});

/***/ }),
/* 254 */
/***/ (function(module, exports) {

module.exports = {"seed":"wipmap","width":3,"height":2,"decimals":3,"jitter":0.4,"distortion":0.1,"gradient":0,"poissonDensity":0.3,"probablities":{"water":0},"biomesMap":[["MOUNTAINS","FOREST","SWAMP"],["MOUNTAINS","FOREST","PLAINS"],["PLAINS","PLAINS","DESERT"]]}

/***/ }),
/* 255 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_log_screen__ = __webpack_require__(103);


/* harmony default export */ __webpack_exports__["a"] = (function (err) {
  err = err instanceof Error ? err : new Error(err);

  var error = new __WEBPACK_IMPORTED_MODULE_0_components_log_screen__["a" /* default */](err.name, err.message, 'error');
  console.error(err);

  error.mount(document.body);
  error.refs.base.addEventListener('click', function () {
    return error.destroy();
  });
});

/***/ }),
/* 256 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_log_screen__ = __webpack_require__(103);



/* harmony default export */ __webpack_exports__["a"] = (function (title, steps) {
  return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    var loading = new __WEBPACK_IMPORTED_MODULE_1_components_log_screen__["a" /* default */](title, '', 'loading');
    loading.mount(document.body);

    var previousResolution = void 0;(function iterate(i) {
      if (i >= steps.length) {
        loading.destroy();
        return resolve(previousResolution);
      }

      if (typeof steps[i] === 'string') {
        loading.say(steps[i]);
        return iterate(++i);
      }

      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(steps[i](previousResolution)).then(function (resolution) {
        previousResolution = resolution;
        iterate(++i);
      }).catch(function (err) {
        loading.destroy();
        reject(err);
      });
    })(0);
  });
});

/***/ }),
/* 257 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// TODO: make human-readable
/* harmony default export */ __webpack_exports__["a"] = (function (prefix) {
  return prefix + '-' + +new Date();
});

/***/ }),
/* 258 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);

var flatten = function flatten(arr) {
  var _ref;

  return (_ref = []).concat.apply(_ref, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(arr.map(function (v) {
    return Array.isArray(v) ? flatten(v) : v;
  })));
};
/* harmony default export */ __webpack_exports__["a"] = (flatten);

/***/ }),
/* 259 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_set__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__);


/* harmony default export */ __webpack_exports__["a"] = (function (arr) {
  return [].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_set___default.a(arr)));
});

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(261), __esModule: true };

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(36);
__webpack_require__(13);
__webpack_require__(23);
__webpack_require__(262);
__webpack_require__(268);
__webpack_require__(271);
__webpack_require__(273);
module.exports = __webpack_require__(0).Set;


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(263);
var validate = __webpack_require__(104);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(264)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(5).f;
var create = __webpack_require__(29);
var redefineAll = __webpack_require__(49);
var ctx = __webpack_require__(8);
var anInstance = __webpack_require__(46);
var forOf = __webpack_require__(24);
var $iterDefine = __webpack_require__(39);
var step = __webpack_require__(68);
var setSpecies = __webpack_require__(75);
var DESCRIPTORS = __webpack_require__(6);
var fastKey = __webpack_require__(33).fastKey;
var validate = __webpack_require__(104);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(1);
var meta = __webpack_require__(33);
var fails = __webpack_require__(10);
var hide = __webpack_require__(9);
var redefineAll = __webpack_require__(49);
var forOf = __webpack_require__(24);
var anInstance = __webpack_require__(46);
var isObject = __webpack_require__(4);
var setToStringTag = __webpack_require__(22);
var dP = __webpack_require__(5).f;
var each = __webpack_require__(265)(0);
var DESCRIPTORS = __webpack_require__(6);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(8);
var IObject = __webpack_require__(42);
var toObject = __webpack_require__(16);
var toLength = __webpack_require__(30);
var asc = __webpack_require__(266);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(267);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var isArray = __webpack_require__(88);
var SPECIES = __webpack_require__(3)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(1);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(269)('Set') });


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(32);
var from = __webpack_require__(270);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(24);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(272)('Set');


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(274)('Set');


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);
var aFunction = __webpack_require__(19);
var ctx = __webpack_require__(8);
var forOf = __webpack_require__(24);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 275 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=15967249ef38833b75e1.js.map