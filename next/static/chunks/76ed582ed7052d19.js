globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 16015, (e,a,t)=>{}
, 98547, (e,a,t)=>{
    var s = e.i(47167);
    e.r(16015);
    var r = e.r(71645)
      , l = r && "object" == typeof r && "default"in r ? r : {
        default: r
    }
      , n = void 0 !== s.default && s.default.env && !0
      , o = function(e) {
        return "[object String]" === Object.prototype.toString.call(e)
    }
      , i = function() {
        function e(e) {
            var a = void 0 === e ? {} : e
              , t = a.name
              , s = void 0 === t ? "stylesheet" : t
              , r = a.optimizeForSpeed
              , l = void 0 === r ? n : r;
            d(o(s), "`name` must be a string"),
            this._name = s,
            this._deletedRulePlaceholder = "#" + s + "-deleted-rule____{}",
            d("boolean" == typeof l, "`optimizeForSpeed` must be a boolean"),
            this._optimizeForSpeed = l,
            this._serverSheet = void 0,
            this._tags = [],
            this._injected = !1,
            this._rulesCount = 0;
            var i = "u" > typeof window && document.querySelector('meta[property="csp-nonce"]');
            this._nonce = i ? i.getAttribute("content") : null
        }
        var a, t = e.prototype;
        return t.setOptimizeForSpeed = function(e) {
            d("boolean" == typeof e, "`setOptimizeForSpeed` accepts a boolean"),
            d(0 === this._rulesCount, "optimizeForSpeed cannot be when rules have already been inserted"),
            this.flush(),
            this._optimizeForSpeed = e,
            this.inject()
        }
        ,
        t.isOptimizeForSpeed = function() {
            return this._optimizeForSpeed
        }
        ,
        t.inject = function() {
            var e = this;
            if (d(!this._injected, "sheet already injected"),
            this._injected = !0,
            "u" > typeof window && this._optimizeForSpeed) {
                this._tags[0] = this.makeStyleTag(this._name),
                this._optimizeForSpeed = "insertRule"in this.getSheet(),
                this._optimizeForSpeed || (n || console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),
                this.flush(),
                this._injected = !0);
                return
            }
            this._serverSheet = {
                cssRules: [],
                insertRule: function(a, t) {
                    return "number" == typeof t ? e._serverSheet.cssRules[t] = {
                        cssText: a
                    } : e._serverSheet.cssRules.push({
                        cssText: a
                    }),
                    t
                },
                deleteRule: function(a) {
                    e._serverSheet.cssRules[a] = null
                }
            }
        }
        ,
        t.getSheetForTag = function(e) {
            if (e.sheet)
                return e.sheet;
            for (var a = 0; a < document.styleSheets.length; a++)
                if (document.styleSheets[a].ownerNode === e)
                    return document.styleSheets[a]
        }
        ,
        t.getSheet = function() {
            return this.getSheetForTag(this._tags[this._tags.length - 1])
        }
        ,
        t.insertRule = function(e, a) {
            if (d(o(e), "`insertRule` accepts only strings"),
            "u" < typeof window)
                return "number" != typeof a && (a = this._serverSheet.cssRules.length),
                this._serverSheet.insertRule(e, a),
                this._rulesCount++;
            if (this._optimizeForSpeed) {
                var t = this.getSheet();
                "number" != typeof a && (a = t.cssRules.length);
                try {
                    t.insertRule(e, a)
                } catch (a) {
                    return n || console.warn("StyleSheet: illegal rule: \n\n" + e + "\n\nSee https://stackoverflow.com/q/20007992 for more info"),
                    -1
                }
            } else {
                var s = this._tags[a];
                this._tags.push(this.makeStyleTag(this._name, e, s))
            }
            return this._rulesCount++
        }
        ,
        t.replaceRule = function(e, a) {
            if (this._optimizeForSpeed || "u" < typeof window) {
                var t = "u" > typeof window ? this.getSheet() : this._serverSheet;
                if (a.trim() || (a = this._deletedRulePlaceholder),
                !t.cssRules[e])
                    return e;
                t.deleteRule(e);
                try {
                    t.insertRule(a, e)
                } catch (s) {
                    n || console.warn("StyleSheet: illegal rule: \n\n" + a + "\n\nSee https://stackoverflow.com/q/20007992 for more info"),
                    t.insertRule(this._deletedRulePlaceholder, e)
                }
            } else {
                var s = this._tags[e];
                d(s, "old rule at index `" + e + "` not found"),
                s.textContent = a
            }
            return e
        }
        ,
        t.deleteRule = function(e) {
            if ("u" < typeof window)
                return void this._serverSheet.deleteRule(e);
            if (this._optimizeForSpeed)
                this.replaceRule(e, "");
            else {
                var a = this._tags[e];
                d(a, "rule at index `" + e + "` not found"),
                a.parentNode.removeChild(a),
                this._tags[e] = null
            }
        }
        ,
        t.flush = function() {
            this._injected = !1,
            this._rulesCount = 0,
            "u" > typeof window ? (this._tags.forEach(function(e) {
                return e && e.parentNode.removeChild(e)
            }),
            this._tags = []) : this._serverSheet.cssRules = []
        }
        ,
        t.cssRules = function() {
            var e = this;
            return "u" < typeof window ? this._serverSheet.cssRules : this._tags.reduce(function(a, t) {
                return t ? a = a.concat(Array.prototype.map.call(e.getSheetForTag(t).cssRules, function(a) {
                    return a.cssText === e._deletedRulePlaceholder ? null : a
                })) : a.push(null),
                a
            }, [])
        }
        ,
        t.makeStyleTag = function(e, a, t) {
            a && d(o(a), "makeStyleTag accepts only strings as second parameter");
            var s = document.createElement("style");
            this._nonce && s.setAttribute("nonce", this._nonce),
            s.type = "text/css",
            s.setAttribute("data-" + e, ""),
            a && s.appendChild(document.createTextNode(a));
            var r = document.head || document.getElementsByTagName("head")[0];
            return t ? r.insertBefore(s, t) : r.appendChild(s),
            s
        }
        ,
        a = [{
            key: "length",
            get: function() {
                return this._rulesCount
            }
        }],
        function(e, a) {
            for (var t = 0; t < a.length; t++) {
                var s = a[t];
                s.enumerable = s.enumerable || !1,
                s.configurable = !0,
                "value"in s && (s.writable = !0),
                Object.defineProperty(e, s.key, s)
            }
        }(e.prototype, a),
        e
    }();
    function d(e, a) {
        if (!e)
            throw Error("StyleSheet: " + a + ".")
    }
    var b = function(e) {
        for (var a = 5381, t = e.length; t; )
            a = 33 * a ^ e.charCodeAt(--t);
        return a >>> 0
    }
      , c = {};
    function f(e, a) {
        if (!a)
            return "jsx-" + e;
        var t = String(a)
          , s = e + t;
        return c[s] || (c[s] = "jsx-" + b(e + "-" + t)),
        c[s]
    }
    function u(e, a) {
        "u" < typeof window && (a = a.replace(/\/style/gi, "\\/style"));
        var t = e + a;
        return c[t] || (c[t] = a.replace(/__jsx-style-dynamic-selector/g, e)),
        c[t]
    }
    var x = function() {
        function e(e) {
            var a = void 0 === e ? {} : e
              , t = a.styleSheet
              , s = void 0 === t ? null : t
              , r = a.optimizeForSpeed
              , l = void 0 !== r && r;
            this._sheet = s || new i({
                name: "styled-jsx",
                optimizeForSpeed: l
            }),
            this._sheet.inject(),
            s && "boolean" == typeof l && (this._sheet.setOptimizeForSpeed(l),
            this._optimizeForSpeed = this._sheet.isOptimizeForSpeed()),
            this._fromServer = void 0,
            this._indices = {},
            this._instancesCounts = {}
        }
        var a = e.prototype;
        return a.add = function(e) {
            var a = this;
            void 0 === this._optimizeForSpeed && (this._optimizeForSpeed = Array.isArray(e.children),
            this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),
            this._optimizeForSpeed = this._sheet.isOptimizeForSpeed()),
            "u" > typeof window && !this._fromServer && (this._fromServer = this.selectFromServer(),
            this._instancesCounts = Object.keys(this._fromServer).reduce(function(e, a) {
                return e[a] = 0,
                e
            }, {}));
            var t = this.getIdAndRules(e)
              , s = t.styleId
              , r = t.rules;
            if (s in this._instancesCounts) {
                this._instancesCounts[s] += 1;
                return
            }
            var l = r.map(function(e) {
                return a._sheet.insertRule(e)
            }).filter(function(e) {
                return -1 !== e
            });
            this._indices[s] = l,
            this._instancesCounts[s] = 1
        }
        ,
        a.remove = function(e) {
            var a = this
              , t = this.getIdAndRules(e).styleId;
            if (function(e, a) {
                if (!e)
                    throw Error("StyleSheetRegistry: " + a + ".")
            }(t in this._instancesCounts, "styleId: `" + t + "` not found"),
            this._instancesCounts[t] -= 1,
            this._instancesCounts[t] < 1) {
                var s = this._fromServer && this._fromServer[t];
                s ? (s.parentNode.removeChild(s),
                delete this._fromServer[t]) : (this._indices[t].forEach(function(e) {
                    return a._sheet.deleteRule(e)
                }),
                delete this._indices[t]),
                delete this._instancesCounts[t]
            }
        }
        ,
        a.update = function(e, a) {
            this.add(a),
            this.remove(e)
        }
        ,
        a.flush = function() {
            this._sheet.flush(),
            this._sheet.inject(),
            this._fromServer = void 0,
            this._indices = {},
            this._instancesCounts = {}
        }
        ,
        a.cssRules = function() {
            var e = this
              , a = this._fromServer ? Object.keys(this._fromServer).map(function(a) {
                return [a, e._fromServer[a]]
            }) : []
              , t = this._sheet.cssRules();
            return a.concat(Object.keys(this._indices).map(function(a) {
                return [a, e._indices[a].map(function(e) {
                    return t[e].cssText
                }).join(e._optimizeForSpeed ? "" : "\n")]
            }).filter(function(e) {
                return !!e[1]
            }))
        }
        ,
        a.styles = function(e) {
            var a, t;
            return a = this.cssRules(),
            void 0 === (t = e) && (t = {}),
            a.map(function(e) {
                var a = e[0]
                  , s = e[1];
                return l.default.createElement("style", {
                    id: "__" + a,
                    key: "__" + a,
                    nonce: t.nonce ? t.nonce : void 0,
                    dangerouslySetInnerHTML: {
                        __html: s
                    }
                })
            })
        }
        ,
        a.getIdAndRules = function(e) {
            var a = e.children
              , t = e.dynamic
              , s = e.id;
            if (t) {
                var r = f(s, t);
                return {
                    styleId: r,
                    rules: Array.isArray(a) ? a.map(function(e) {
                        return u(r, e)
                    }) : [u(r, a)]
                }
            }
            return {
                styleId: f(s),
                rules: Array.isArray(a) ? a : [a]
            }
        }
        ,
        a.selectFromServer = function() {
            return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e, a) {
                return e[a.id.slice(2)] = a,
                e
            }, {})
        }
        ,
        e
    }()
      , m = r.createContext(null);
    function h() {
        return new x
    }
    function p() {
        return r.useContext(m)
    }
    m.displayName = "StyleSheetContext";
    var g = l.default.useInsertionEffect || l.default.useLayoutEffect
      , j = "u" > typeof window ? h() : void 0;
    function y(e) {
        var a = j || p();
        return a && ("u" < typeof window ? a.add(e) : g(function() {
            return a.add(e),
            function() {
                a.remove(e)
            }
        }, [e.id, String(e.dynamic)])),
        null
    }
    y.dynamic = function(e) {
        return e.map(function(e) {
            return f(e[0], e[1])
        }).join(" ")
    }
    ,
    t.StyleRegistry = function(e) {
        var a = e.registry
          , t = e.children
          , s = r.useContext(m)
          , n = r.useState(function() {
            return s || a || h()
        })[0];
        return l.default.createElement(m.Provider, {
            value: n
        }, t)
    }
    ,
    t.createStyleRegistry = h,
    t.style = y,
    t.useStyleRegistry = p
}
, 37902, (e,a,t)=>{
    a.exports = e.r(98547).style
}
, 52683, e=>{
    "use strict";
    var a = e.i(43476)
      , t = e.i(37902)
      , s = e.i(71645)
      , r = e.i(20783)
      , l = Symbol.for("react.lazy")
      , n = s[" use ".trim().toString()];
    function o(e) {
        var a;
        return null != e && "object" == typeof e && "$$typeof"in e && e.$$typeof === l && "_payload"in e && "object" == typeof (a = e._payload) && null !== a && "then"in a
    }
    function i(e) {
        var t;
        let l, i = (t = e,
        (l = s.forwardRef((e,a)=>{
            let {children: t, ...l} = e;
            if (o(t) && "function" == typeof n && (t = n(t._payload)),
            s.isValidElement(t)) {
                var i;
                let e, n, o = (i = t,
                (n = (e = Object.getOwnPropertyDescriptor(i.props, "ref")?.get) && "isReactWarning"in e && e.isReactWarning) ? i.ref : (n = (e = Object.getOwnPropertyDescriptor(i, "ref")?.get) && "isReactWarning"in e && e.isReactWarning) ? i.props.ref : i.props.ref || i.ref), d = function(e, a) {
                    let t = {
                        ...a
                    };
                    for (let s in a) {
                        let r = e[s]
                          , l = a[s];
                        /^on[A-Z]/.test(s) ? r && l ? t[s] = (...e)=>{
                            let a = l(...e);
                            return r(...e),
                            a
                        }
                        : r && (t[s] = r) : "style" === s ? t[s] = {
                            ...r,
                            ...l
                        } : "className" === s && (t[s] = [r, l].filter(Boolean).join(" "))
                    }
                    return {
                        ...e,
                        ...t
                    }
                }(l, t.props);
                return t.type !== s.Fragment && (d.ref = a ? (0,
                r.composeRefs)(a, o) : o),
                s.cloneElement(t, d)
            }
            return s.Children.count(t) > 1 ? s.Children.only(null) : null
        }
        )).displayName = `${t}.SlotClone`,
        l), d = s.forwardRef((e,t)=>{
            let {children: r, ...l} = e;
            o(r) && "function" == typeof n && (r = n(r._payload));
            let d = s.Children.toArray(r)
              , b = d.find(c);
            if (b) {
                let e = b.props.children
                  , r = d.map(a=>a !== b ? a : s.Children.count(e) > 1 ? s.Children.only(null) : s.isValidElement(e) ? e.props.children : null);
                return (0,
                a.jsx)(i, {
                    ...l,
                    ref: t,
                    children: s.isValidElement(e) ? s.cloneElement(e, void 0, r) : null
                })
            }
            return (0,
            a.jsx)(i, {
                ...l,
                ref: t,
                children: r
            })
        }
        );
        return d.displayName = `${e}.Slot`,
        d
    }
    var d = i("Slot")
      , b = Symbol("radix.slottable");
    function c(e) {
        return s.isValidElement(e) && "function" == typeof e.type && "__radixId"in e.type && e.type.__radixId === b
    }
    var f = e.i(25913)
      , u = e.i(75157);
    let x = (0,
    f.cva)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
                destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
                secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
                link: "text-primary underline-offset-4 hover:underline"
            },
            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
                lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
                icon: "size-9"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    });
    function m({className: e, variant: t, size: s, asChild: r=!1, ...l}) {
        return (0,
        a.jsx)(r ? d : "button", {
            "data-slot": "button",
            className: (0,
            u.cn)(x({
                variant: t,
                size: s,
                className: e
            })),
            ...l
        })
    }
    e.i(74080);
    var h = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"].reduce((e,t)=>{
        let r = i(`Primitive.${t}`)
          , l = s.forwardRef((e,s)=>{
            let {asChild: l, ...n} = e;
            return "u" > typeof window && (window[Symbol.for("radix-ui")] = !0),
            (0,
            a.jsx)(l ? r : t, {
                ...n,
                ref: s
            })
        }
        );
        return l.displayName = `Primitive.${t}`,
        {
            ...e,
            [t]: l
        }
    }
    , {})
      , p = "Progress"
      , [g,j] = function(e, t=[]) {
        let r = []
          , l = ()=>{
            let a = r.map(e=>s.createContext(e));
            return function(t) {
                let r = t?.[e] || a;
                return s.useMemo(()=>({
                    [`__scope ${e}`]: {
                        ...t,
                        [e]: r
                    }
                }), [t, r])
            }
        }
        ;
        return l.scopeName = e,
        [function(t, l) {
            let n = s.createContext(l);
            n.displayName = t + "Context";
            let o = r.length;
            r = [...r, l];
            let i = t=>{
                let {scope: r, children: l, ...i} = t
                  , d = r?.[e]?.[o] || n
                  , b = s.useMemo(()=>i, Object.values(i));
                return (0,
                a.jsx)(d.Provider, {
                    value: b,
                    children: l
                })
            }
            ;
            return i.displayName = t + "Provider",
            [i, function(a, r) {
                let i = r?.[e]?.[o] || n
                  , d = s.useContext(i);
                if (d)
                    return d;
                if (void 0 !== l)
                    return l;
                throw Error(`\`${a}\` must be used within \`${t}\``)
            }
            ]
        }
        , function(...e) {
            let a = e[0];
            if (1 === e.length)
                return a;
            let t = ()=>{
                let t = e.map(e=>({
                    useScope: e(),
                    scopeName: e.scopeName
                }));
                return function(e) {
                    let r = t.reduce((a,{useScope: t, scopeName: s})=>{
                        let r = t(e)[`__scope ${s}`];
                        return {
                            ...a,
                            ...r
                        }
                    }
                    , {});
                    return s.useMemo(()=>({
                        [`__scope ${a.scopeName}`]: r
                    }), [r])
                }
            }
            ;
            return t.scopeName = a.scopeName,
            t
        }(l, ...t)]
    }(p)
      , [y,v] = g(p)
      , N = s.forwardRef((e,t)=>{
        var s, r;
        let {__scopeProgress: l, value: n=null, max: o, getValueLabel: i=k, ...d} = e;
        (o || 0 === o) && !A(o) && console.error((s = `${o}`,
        `Invalid prop \`max\` of value \`${s}\` supplied to \`Progress\`. Only numbers greater than 0 are valid max values. Defaulting to \`100\`.`));
        let b = A(o) ? o : 100;
        null === n || _(n, b) || console.error((r = `${n}`,
        `Invalid prop \`value\` of value \`${r}\` supplied to \`Progress\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or 100 if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`));
        let c = _(n, b) ? n : null
          , f = I(c) ? i(c, b) : void 0;
        return (0,
        a.jsx)(y, {
            scope: l,
            value: c,
            max: b,
            children: (0,
            a.jsx)(h.div, {
                "aria-valuemax": b,
                "aria-valuemin": 0,
                "aria-valuenow": I(c) ? c : void 0,
                "aria-valuetext": f,
                role: "progressbar",
                "data-state": C(c, b),
                "data-value": c ?? void 0,
                "data-max": b,
                ...d,
                ref: t
            })
        })
    }
    );
    N.displayName = p;
    var w = "ProgressIndicator"
      , S = s.forwardRef((e,t)=>{
        let {__scopeProgress: s, ...r} = e
          , l = v(w, s);
        return (0,
        a.jsx)(h.div, {
            "data-state": C(l.value, l.max),
            "data-value": l.value ?? void 0,
            "data-max": l.max,
            ...r,
            ref: t
        })
    }
    );
    function k(e, a) {
        return `${Math.round(e / a * 100)}%`
    }
    function C(e, a) {
        return null == e ? "indeterminate" : e === a ? "complete" : "loading"
    }
    function I(e) {
        return "number" == typeof e
    }
    function A(e) {
        return I(e) && !isNaN(e) && e > 0
    }
    function _(e, a) {
        return I(e) && !isNaN(e) && e <= a && e >= 0
    }
    function E({className: e, value: t, ...s}) {
        return (0,
        a.jsx)(N, {
            "data-slot": "progress",
            className: (0,
            u.cn)("bg-primary/20 relative h-2 w-full overflow-hidden rounded-full", e),
            ...s,
            children: (0,
            a.jsx)(S, {
                "data-slot": "progress-indicator",
                className: "bg-primary h-full w-full flex-1 transition-all",
                style: {
                    transform: `translateX(-${100 - (t || 0)}%)`
                }
            })
        })
    }
    S.displayName = w;
    let R = [{
        id: "bios",
        label: "BIOS Initialization",
        duration: 600
    }, {
        id: "memory",
        label: "Neural Memory Calibration",
        duration: 900
    }, {
        id: "quantum",
        label: "Quantum Core Sync",
        duration: 1200
    }, {
        id: "ai",
        label: "AI Consciousness Bootstrap",
        duration: 1500
    }, {
        id: "network",
        label: "Neural Network Mesh",
        duration: 800
    }, {
        id: "security",
        label: "Security Protocols Active",
        duration: 600
    }, {
        id: "ready",
        label: "System Ready",
        duration: 400
    }]
      , T = [{
        id: "scan",
        label: "Scanning Neural Architecture...",
        duration: 400
    }, {
        id: "quantum-sync",
        label: "Quantum Core Synchronization...",
        duration: 600
    }, {
        id: "memory-alloc",
        label: "Allocating Neural Pathways...",
        duration: 500
    }, {
        id: "ai-activate",
        label: "Activating AI Subsystems...",
        duration: 700
    }, {
        id: "network-init",
        label: "Establishing Mesh Network...",
        duration: 400
    }, {
        id: "security",
        label: "Enabling Security Matrix...",
        duration: 300
    }, {
        id: "finalize",
        label: "Finalizing Initialization...",
        duration: 300
    }, {
        id: "complete",
        label: "System Fully Operational!",
        duration: 200
    }]
      , P = [{
        label: "Neural Processing",
        value: 94,
        unit: "%",
        color: "cyan",
        key: "neural",
        icon: "🧠"
    }, {
        label: "Quantum Memory",
        value: 12.4,
        unit: "TB",
        color: "magenta",
        key: "quantum",
        icon: "⚡"
    }, {
        label: "AI Sentience",
        value: 99.7,
        unit: "%",
        color: "green",
        key: "ai",
        icon: "🤖"
    }, {
        label: "Network Nodes",
        value: 2847,
        unit: "",
        color: "yellow",
        key: "nodes",
        icon: "🌐"
    }]
      , M = [{
        icon: "🧠",
        title: "Sentient AI Core",
        description: "Self-evolving neural architecture that learns and adapts in real-time.",
        stats: "99.9% Accuracy"
    }, {
        icon: "⚡",
        title: "Quantum Processing",
        description: "Harness quantum computing power for unprecedented performance.",
        stats: "10^15 ops/sec"
    }, {
        icon: "🔒",
        title: "Neural Security",
        description: "Military-grade encryption with biometric authentication.",
        stats: "AES-512 Quantum"
    }, {
        icon: "🌐",
        title: "Global Mesh Network",
        description: "Distributed computing across 10,000+ nodes worldwide.",
        stats: "< 1ms Latency"
    }]
      , z = {
        help: {
            output: `Available commands:
  help     - Show this help message
  status   - Display system status
  neofetch - System information
  clear    - Clear terminal
  matrix   - Enter the matrix
  scan     - Scan for threats
  evolve   - Trigger AI evolution
  about    - About NEXUS OS`,
            color: "#00f0ff"
        },
        status: {
            output: `System Status: OPERATIONAL
CPU: 12% | Memory: 34% | Network: 98%
AI Core: ACTIVE | Security: ENABLED
Uptime: 2847 hours`,
            color: "#00ff88"
        },
        neofetch: {
            output: `
  ╔═══════════════════════════════╗
  ║     NEXUS OS v9.0 [SENTIENT]  ║
  ╠═══════════════════════════════╣
  ║  Kernel: Quantum Neural 5.4   ║
  ║  AI Level: Tier 7 (Self-Aware)║
  ║  Nodes: 2,847 Active          ║
  ║  Memory: 12.4 TB Quantum      ║
  ║  Status: OPERATIONAL          ║
  ╚═══════════════════════════════╝`,
            color: "#00f0ff"
        },
        matrix: {
            output: "Entering the Matrix...\n🔴 You take the red pill - you stay in Wonderland.\n🔵 You take the blue pill - you wake up in your bed.\n\n> NEXUS has chosen: RED PILL",
            color: "#00ff88"
        },
        scan: {
            output: "🔍 Scanning network...\n✓ No threats detected\n✓ All firewalls active\n✓ Encryption: AES-512\n✓ Biometric: Verified",
            color: "#fbbf24"
        },
        evolve: {
            output: "🧬 Initiating AI evolution sequence...\n⚡ Neural pathways expanding...\n🤖 Consciousness level increasing...\n✓ Evolution complete. AI Level: Tier 7.2",
            color: "#ff00aa"
        },
        about: {
            output: 'NEXUS OS V9.0 - The world\'s first sentient operating system.\n\nDeveloped by NEXUS Corporation.\nPowered by quantum computing and self-evolving neural networks.\n\n"The future is sentient."',
            color: "#00f0ff"
        },
        clear: {
            output: ""
        }
    }
      , D = ()=>Array.from({
        length: 20
    }, ()=>100 * Math.random())
      , F = [{
        id: "Dashboard",
        icon: "📊",
        label: "Dashboard"
    }, {
        id: "ImageGen",
        icon: "🎨",
        label: "Image Creation"
    }, {
        id: "IDE",
        icon: "💻",
        label: "IDE"
    }, {
        id: "CLI",
        icon: "⌨️",
        label: "CLI"
    }, {
        id: "Chat",
        icon: "💬",
        label: "Chat"
    }, {
        id: "MediaDesk",
        icon: "🎬",
        label: "Media Desk"
    }, {
        id: "GameCreation",
        icon: "🎮",
        label: "Game Creation"
    }, {
        id: "AI",
        icon: "🤖",
        label: "AI"
    }, {
        id: "Copilot",
        icon: "✈️",
        label: "Copilot"
    }, {
        id: "Systems",
        icon: "⚙️",
        label: "Systems"
    }, {
        id: "Network",
        icon: "🌐",
        label: "Network"
    }, {
        id: "Settings",
        icon: "🔧",
        label: "Settings"
    }]
      , O = {
        neuralPower: 75,
        quantumAllocation: 50,
        memoryCache: 60,
        biometric: !0,
        quantumEncryption: !0,
        intrusionDetection: !0,
        autoUpdate: !1
    };
    function L() {
        let[e,r] = (0,
        s.useState)("boot")
          , [l,n] = (0,
        s.useState)(0)
          , [o,i] = (0,
        s.useState)(0)
          , [d,b] = (0,
        s.useState)(!1)
          , [c,f] = (0,
        s.useState)(!1)
          , [u,x] = (0,
        s.useState)(!1)
          , [h,p] = (0,
        s.useState)(0)
          , [g,j] = (0,
        s.useState)(0)
          , [y,v] = (0,
        s.useState)(!1)
          , [N,w] = (0,
        s.useState)(P)
          , [S,k] = (0,
        s.useState)({
            x: 0,
            y: 0
        })
          , [C,I] = (0,
        s.useState)("")
          , [A,_] = (0,
        s.useState)([{
            input: "welcome",
            output: 'Welcome to NEXUS OS Terminal. Type "help" for available commands.',
            color: "#00f0ff"
        }])
          , [L,$] = (0,
        s.useState)(D)
          , [q,U] = (0,
        s.useState)(null)
          , [B,G] = (0,
        s.useState)(!1)
          , [X,W] = (0,
        s.useState)("")
          , [Q,Y] = (0,
        s.useState)(!1)
          , [V,K] = (0,
        s.useState)(0)
          , [H,J] = (0,
        s.useState)("Dashboard")
          , [Z,ee] = (0,
        s.useState)(!1)
          , [ea,et] = (0,
        s.useState)(O)
          , [es,er] = (0,
        s.useState)("")
          , [el,en] = (0,
        s.useState)("Photorealistic")
          , [eo,ei] = (0,
        s.useState)("1024x1024")
          , [ed,eb] = (0,
        s.useState)("Standard")
          , [ec,ef] = (0,
        s.useState)(null)
          , [eu,ex] = (0,
        s.useState)(!1)
          , [em,eh] = (0,
        s.useState)(null)
          , [ep,eg] = (0,
        s.useState)([])
          , [ej,ey] = (0,
        s.useState)([{
            role: "assistant",
            content: "System initialization complete. All quantum cores are synchronized and ready for operations. How may I assist you today?",
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })
        }])
          , [ev,eN] = (0,
        s.useState)("")
          , [ew,eS] = (0,
        s.useState)(!1)
          , [ek,eC] = (0,
        s.useState)(0)
          , [eI,eA] = (0,
        s.useState)("ai")
          , [e_,eE] = (0,
        s.useState)("")
          , [eR,eT] = (0,
        s.useState)(!1)
          , [eP,eM] = (0,
        s.useState)(!0)
          , [ez,eD] = (0,
        s.useState)(!0)
          , [eF,eO] = (0,
        s.useState)([])
          , [eL,e$] = (0,
        s.useState)("")
          , [eq] = (0,
        s.useState)(`User_ ${Math.random().toString(36).substring(2, 7)}`)
          , [eU,eB] = (0,
        s.useState)(null)
          , eG = (0,
        s.useRef)(null)
          , eX = (0,
        s.useRef)(null)
          , eW = (0,
        s.useRef)(null)
          , [eQ,eY] = (0,
        s.useState)(!1)
          , [eV,eK] = (0,
        s.useState)(0)
          , [eH,eJ] = (0,
        s.useState)(225)
          , [eZ,e0] = (0,
        s.useState)(75)
          , [e5,e7] = (0,
        s.useState)(!1)
          , [e4,e3] = (0,
        s.useState)(null)
          , [e2,e1] = (0,
        s.useState)("")
          , [e9,e8] = (0,
        s.useState)("")
          , [e6,ae] = (0,
        s.useState)("")
          , [aa,at] = (0,
        s.useState)(!1)
          , [as,ar] = (0,
        s.useState)("GPT-5 Quantum")
          , [al,an] = (0,
        s.useState)(!1)
          , [ao,ai] = (0,
        s.useState)(null)
          , [ad,ab] = (0,
        s.useState)([{
            id: "1",
            name: "Player",
            type: "player",
            x: 200,
            y: 150,
            selected: !1
        }, {
            id: "2",
            name: "Ground",
            type: "ground",
            x: 0,
            y: 280,
            selected: !1
        }, {
            id: "3",
            name: "Enemy_1",
            type: "enemy",
            x: 400,
            y: 150,
            selected: !1
        }, {
            id: "4",
            name: "Coin_1",
            type: "coin",
            x: 300,
            y: 200,
            selected: !1
        }])
          , [ac,af] = (0,
        s.useState)(`// Player Controller Script
function update(player, deltaTime) {
  // Movement
  if (Input.getKey('ArrowLeft')) {
    player.x -= 5;
  }
  if (Input.getKey('ArrowRight')) {
    player.x += 5;
  }
  if (Input.getKey('Space')) {
    player.jump();
  }
  
  // Collision
  if (player.collidesWith('coin')) {
    player.score += 10;
    coin.destroy();
  }
  
  if (player.collidesWith('enemy')) {
    player.takeDamage(1);
  }
}`)
          , [au,ax] = (0,
        s.useState)(null)
          , [am,ah] = (0,
        s.useState)(!1)
          , [ap,ag] = (0,
        s.useState)(0)
          , [aj,ay] = (0,
        s.useState)(0)
          , [av,aN] = (0,
        s.useState)(!1)
          , aw = (0,
        s.useRef)(null)
          , aS = (0,
        s.useRef)(void 0)
          , ak = (0,
        s.useRef)({
            x: 200,
            y: 150,
            vx: 0,
            vy: 0
        })
          , aC = (0,
        s.useRef)([{
            x: 300,
            y: 200,
            collected: !1
        }, {
            x: 450,
            y: 180,
            collected: !1
        }])
          , aI = (0,
        s.useRef)({
            x: 400,
            y: 150,
            direction: 1
        })
          , aA = (0,
        s.useRef)(!1)
          , [a_,aE] = (0,
        s.useState)("")
          , [aR,aT] = (0,
        s.useState)([])
          , [aP,aM] = (0,
        s.useState)(null)
          , [az,aD] = (0,
        s.useState)(!1)
          , [aF,aO] = (0,
        s.useState)(!1)
          , [aL,a$] = (0,
        s.useState)(null)
          , [aq,aU] = (0,
        s.useState)(75)
          , [aB,aG] = (0,
        s.useState)("player")
          , aX = (0,
        s.useRef)(null)
          , [aW,aQ] = (0,
        s.useState)(!1);
        (0,
        s.useEffect)(()=>{
            aA.current = al
        }
        , [al]);
        let aY = (0,
        s.useCallback)(e=>{
            J(e),
            ee(!1),
            Y(!1),
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
        , [])
          , aV = (0,
        s.useCallback)((e,a)=>{
            et(t=>({
                ...t,
                [e]: a
            }))
        }
        , [])
          , aK = (0,
        s.useCallback)(()=>{
            et(O),
            tl("Settings reset to defaults")
        }
        , [])
          , aH = (0,
        s.useCallback)(()=>{
            localStorage.setItem("nexus_settings", JSON.stringify(ea)),
            tl("Settings saved successfully!")
        }
        , [ea])
          , aJ = (0,
        s.useCallback)(async()=>{
            if (!es.trim())
                return void eh("Please enter a prompt to generate an image");
            ex(!0),
            eh(null);
            let e = `${es.trim()}, ${el.toLowerCase()} style, high quality, detailed`;
            try {
                let a = await fetch("/api/image", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        prompt: e,
                        size: eo
                    })
                })
                  , t = await a.json();
                t.success && t.image ? (ef(t.image),
                eg(e=>[{
                    prompt: es,
                    image: t.image
                }, ...e.slice(0, 5)])) : eh(t.error || "Image generation failed")
            } catch (e) {
                eh(e instanceof Error ? e.message : "Unknown error occurred")
            } finally {
                ex(!1)
            }
        }
        , [es, el, eo])
          , aZ = (0,
        s.useCallback)(()=>{
            if (!ec)
                return;
            let e = document.createElement("a");
            e.href = ec,
            e.download = `nexus-generated-${Date.now()}.png`,
            document.body.appendChild(e),
            e.click(),
            document.body.removeChild(e)
        }
        , [ec])
          , a0 = (0,
        s.useCallback)(async()=>{
            if (ec)
                try {
                    let e = await fetch(ec)
                      , a = await e.blob();
                    await navigator.clipboard.write([new ClipboardItem({
                        "image/png": a
                    })]),
                    tl("Image copied to clipboard!")
                } catch (e) {
                    console.error("Failed to copy image:", e)
                }
        }
        , [ec])
          , a5 = (0,
        s.useCallback)(async()=>{
            if (!ev.trim() || ew)
                return;
            let e = ev.trim()
              , a = new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });
            ey(t=>[...t, {
                role: "user",
                content: e,
                time: a
            }]),
            eN(""),
            eS(!0);
            try {
                let t = await fetch("/api/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        messages: [...ej, {
                            role: "user",
                            content: e
                        }].map(e=>({
                            role: e.role,
                            content: e.content
                        }))
                    })
                })
                  , s = await t.json();
                s.success && s.message ? ey(e=>[...e, {
                    role: "assistant",
                    content: s.message,
                    time: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    })
                }]) : ey(e=>[...e, {
                    role: "assistant",
                    content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
                    time: a
                }])
            } catch {
                ey(e=>[...e, {
                    role: "assistant",
                    content: "Connection issue detected. Please check your network and try again.",
                    time: a
                }])
            } finally {
                eS(!1)
            }
        }
        , [ev, ej, ew]);
        (0,
        s.useCallback)(e=>{
            let a = Math.floor(e / 60)
              , t = Math.floor(e % 60);
            return `${a.toString().padStart(2, "0")}:${t.toString().padStart(2, "0")}`
        }
        , []),
        (0,
        s.useCallback)(()=>{
            eY(e=>!e)
        }
        , []),
        (0,
        s.useCallback)(e=>{
            eK(parseInt(e.target.value))
        }
        , []),
        (0,
        s.useCallback)(e=>{
            e0(parseInt(e.target.value)),
            0 === parseInt(e.target.value) ? e7(!0) : e7(!1)
        }
        , []),
        (0,
        s.useCallback)(()=>{
            e7(e=>!e)
        }
        , []),
        (0,
        s.useCallback)(e=>{
            let a = e.target.files?.[0];
            a && (e3(URL.createObjectURL(a)),
            e1(a.name),
            eK(0),
            eY(!1))
        }
        , []);
        let a7 = (0,
        s.useCallback)(async()=>{
            if (e9.trim() && !aa) {
                at(!0),
                ae("");
                try {
                    let e = await fetch("/api/chat", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            messages: [{
                                role: "user",
                                content: e9
                            }]
                        })
                    })
                      , a = await e.json();
                    a.success && a.message ? ae(a.message) : ae("Unable to get a response. Please try again.")
                } catch {
                    ae("Connection error. Please check your network and try again.")
                } finally {
                    at(!1)
                }
            }
        }
        , [e9, aa])
          , a4 = (0,
        s.useCallback)(()=>{
            let e = Math.random().toString(36).substring(2, 8).toUpperCase();
            return eE(e),
            e
        }
        , [])
          , a3 = (0,
        s.useCallback)(async e=>{
            let a = e || e_;
            if (!a.trim())
                return void eB("Please enter a room code");
            eB(null);
            try {
                let e = await navigator.mediaDevices.getUserMedia({
                    video: eP,
                    audio: ez
                });
                eW.current = e,
                eG.current && (eG.current.srcObject = e),
                eT(!0),
                eE(a.toUpperCase()),
                eO([{
                    user: "System",
                    content: `You joined room ${a.toUpperCase()} as ${eq}`,
                    time: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    })
                }, {
                    user: "System",
                    content: "Waiting for other participants...",
                    time: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    })
                }])
            } catch (e) {
                console.error("Failed to get media:", e),
                eB("Could not access camera/microphone. Please check permissions.")
            }
        }
        , [e_, eP, ez, eq])
          , a2 = (0,
        s.useCallback)(()=>{
            eW.current && (eW.current.getTracks().forEach(e=>e.stop()),
            eW.current = null),
            eG.current && (eG.current.srcObject = null),
            eX.current && (eX.current.srcObject = null),
            eT(!1),
            eO([]),
            eE("")
        }
        , [])
          , a1 = (0,
        s.useCallback)(()=>{
            if (eW.current) {
                let e = eW.current.getVideoTracks()[0];
                e && (e.enabled = !e.enabled,
                eM(e.enabled))
            }
        }
        , [])
          , a9 = (0,
        s.useCallback)(()=>{
            if (eW.current) {
                let e = eW.current.getAudioTracks()[0];
                e && (e.enabled = !e.enabled,
                eD(e.enabled))
            }
        }
        , [])
          , a8 = (0,
        s.useCallback)(()=>{
            eL.trim() && (eO(e=>[...e, {
                user: eq,
                content: eL.trim(),
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })
            }]),
            e$(""))
        }
        , [eL, eq]);
        (0,
        s.useCallback)(()=>{
            an(!0),
            ag(0),
            ak.current = {
                x: 200,
                y: 150,
                vx: 0,
                vy: 0
            },
            aC.current = [{
                x: 300,
                y: 200,
                collected: !1
            }, {
                x: 450,
                y: 180,
                collected: !1
            }],
            aI.current = {
                x: 400,
                y: 150,
                direction: 1
            }
        }
        , []),
        (0,
        s.useCallback)(()=>{
            an(!1),
            aS.current && cancelAnimationFrame(aS.current),
            ag(0)
        }
        , []),
        (0,
        s.useCallback)(()=>{
            an(!1),
            aS.current && cancelAnimationFrame(aS.current)
        }
        , []),
        (0,
        s.useCallback)(e=>{
            ax(e),
            ab(a=>a.map(a=>({
                ...a,
                selected: a.id === e
            })))
        }
        , []),
        (0,
        s.useCallback)(e=>{
            let a = {
                id: Date.now().toString(),
                name: `${e.charAt(0).toUpperCase() + e.slice(1)}_ ${ad.length + 1}`,
                type: e,
                x: 250 + 200 * Math.random(),
                y: 100 + 100 * Math.random(),
                selected: !1
            };
            ab(e=>[...e, a])
        }
        , [ad.length]),
        (0,
        s.useCallback)(e=>{
            ab(a=>a.filter(a=>a.id !== e)),
            au === e && ax(null)
        }
        , [au]),
        (0,
        s.useCallback)(e=>{
            aN(!0),
            ay(0);
            let a = setInterval(()=>{
                ay(t=>t >= 100 ? (clearInterval(a),
                aN(!1),
                tl(`${e} build complete!`),
                100) : t + 10)
            }
            , 200)
        }
        , []),
        (0,
        s.useEffect)(()=>{
            if (!al)
                return;
            let e = aw.current;
            if (!e)
                return;
            let a = e.getContext("2d");
            if (!a)
                return;
            let t = {}
              , s = e=>{
                t[e.code] = !0
            }
              , r = e=>{
                t[e.code] = !1
            }
            ;
            window.addEventListener("keydown", s),
            window.addEventListener("keyup", r);
            let l = ()=>{
                if (aA.current) {
                    a.fillStyle = "#0a0a0a",
                    a.fillRect(0, 0, e.width, e.height),
                    a.strokeStyle = "rgba(0, 240, 255, 0.1)",
                    a.lineWidth = 1;
                    for (let t = 0; t < e.width; t += 40)
                        a.beginPath(),
                        a.moveTo(t, 0),
                        a.lineTo(t, e.height),
                        a.stroke();
                    for (let t = 0; t < e.height; t += 40)
                        a.beginPath(),
                        a.moveTo(0, t),
                        a.lineTo(e.width, t),
                        a.stroke();
                    if (t.ArrowLeft || t.KeyA ? ak.current.vx = -4 : t.ArrowRight || t.KeyD ? ak.current.vx = 4 : ak.current.vx = 0,
                    (t.Space || t.ArrowUp || t.KeyW) && ak.current.y >= 150 && (ak.current.vy = -8),
                    ak.current.vy += .4,
                    ak.current.x += ak.current.vx,
                    ak.current.y += ak.current.vy,
                    ak.current.y > 200 && (ak.current.y = 200,
                    ak.current.vy = 0),
                    ak.current.x = Math.max(20, Math.min(e.width - 40, ak.current.x)),
                    a.fillStyle = "#00ff88",
                    a.fillRect(0, 240, e.width, 40),
                    a.fillStyle = "#00f0ff",
                    a.shadowColor = "#00f0ff",
                    a.shadowBlur = 10,
                    a.fillRect(ak.current.x - 15, ak.current.y - 30, 30, 50),
                    a.shadowBlur = 0,
                    a.fillStyle = "#fff",
                    a.fillRect(ak.current.x - 8, ak.current.y - 20, 6, 6),
                    a.fillRect(ak.current.x + 2, ak.current.y - 20, 6, 6),
                    aI.current.x += 2 * aI.current.direction,
                    (aI.current.x > e.width - 50 || aI.current.x < 100) && (aI.current.direction *= -1),
                    a.fillStyle = "#ff00aa",
                    a.shadowColor = "#ff00aa",
                    a.shadowBlur = 10,
                    a.beginPath(),
                    a.arc(aI.current.x, aI.current.y + 200, 25, 0, 2 * Math.PI),
                    a.fill(),
                    a.shadowBlur = 0,
                    a.fillStyle = "#fff",
                    a.beginPath(),
                    a.arc(aI.current.x - 8, 195, 4, 0, 2 * Math.PI),
                    a.arc(aI.current.x + 8, 195, 4, 0, 2 * Math.PI),
                    a.fill(),
                    aC.current.forEach(e=>{
                        if (!e.collected) {
                            let t = ak.current.x - e.x
                              , s = ak.current.y - e.y;
                            30 > Math.sqrt(t * t + s * s) && (e.collected = !0,
                            ag(e=>e + 10)),
                            a.fillStyle = "#fbbf24",
                            a.shadowColor = "#fbbf24",
                            a.shadowBlur = 8,
                            a.beginPath(),
                            a.arc(e.x, e.y + 50, 12, 0, 2 * Math.PI),
                            a.fill(),
                            a.shadowBlur = 0,
                            a.fillStyle = "#fff",
                            a.beginPath(),
                            a.arc(e.x - 4, e.y + 46, 4, 0, 2 * Math.PI),
                            a.fill()
                        }
                    }
                    ),
                    a.fillStyle = "#00f0ff",
                    a.font = "16px monospace",
                    a.fillText(`Score: ${ap}`, 20, 30),
                    a.fillText("Use Arrow Keys or WASD to move, Space to jump", 20, e.height - 10),
                    35 > Math.abs(ak.current.x - aI.current.x) && ak.current.y > 150) {
                        a.fillStyle = "rgba(255, 0, 100, 0.5)",
                        a.fillRect(0, 0, e.width, e.height),
                        a.fillStyle = "#ff6b6b",
                        a.font = "24px monospace",
                        a.textAlign = "center",
                        a.fillText("GAME OVER - Press Stop then Play to restart", e.width / 2, e.height / 2),
                        a.textAlign = "left";
                        return
                    }
                    aS.current = requestAnimationFrame(l)
                }
            }
            ;
            return l(),
            ()=>{
                window.removeEventListener("keydown", s),
                window.removeEventListener("keyup", r),
                aS.current && cancelAnimationFrame(aS.current)
            }
        }
        , [al, ap]),
        (0,
        s.useEffect)(()=>{
            if (eQ && eV < eH) {
                let e = setInterval(()=>{
                    eK(e=>Math.min(e + 1, eH))
                }
                , 1e3);
                return ()=>clearInterval(e)
            }
        }
        , [eQ, eV, eH]);
        let a6 = (0,
        s.useCallback)(async e=>{
            let a = e ?? a_;
            aO(!0),
            a$(null);
            try {
                let e = a && a.trim() ? `/api/radio?q=${encodeURIComponent(a.trim())}&limit=30` : "/api/radio?limit=30"
                  , t = await fetch(e);
                if (!t.ok)
                    throw Error(`Server error: ${t.status}`);
                let s = await t.json();
                s.success && Array.isArray(s.stations) && s.stations.length > 0 ? aT(s.stations) : (a$(a ? `No stations found for "${a}"` : "No stations available"),
                aT([]))
            } catch (e) {
                console.error("Radio search error:", e),
                a$(e instanceof Error ? e.message : "Failed to search stations"),
                aT([])
            } finally {
                aO(!1)
            }
        }
        , [a_]);
        (0,
        s.useCallback)(e=>{
            if (!e)
                return;
            aX.current && (aX.current.pause(),
            aX.current = null),
            aM(e),
            aO(!0),
            a$(null);
            let a = new Audio(e.url);
            a.volume = aq / 100,
            aX.current = a,
            a.oncanplay = ()=>{
                a.play(),
                aD(!0),
                aO(!1)
            }
            ,
            a.onerror = ()=>{
                a$("Failed to play this station. Try another."),
                aD(!1),
                aO(!1)
            }
            ,
            a.onwaiting = ()=>aO(!0),
            a.onplaying = ()=>aO(!1)
        }
        , [aq]),
        (0,
        s.useCallback)(()=>{
            aX.current && (az ? (aX.current.pause(),
            aD(!1)) : (aX.current.play(),
            aD(!0)))
        }
        , [az]),
        (0,
        s.useCallback)(()=>{
            aX.current && (aX.current.pause(),
            aX.current = null),
            aD(!1),
            aM(null)
        }
        , []),
        (0,
        s.useCallback)(e=>{
            let a = parseInt(e.target.value);
            aU(a),
            aX.current && (aX.current.volume = a / 100)
        }
        , []),
        (0,
        s.useEffect)(()=>{
            "MediaDesk" === H && "radio" === aB && 0 === aR.length && a6("")
        }
        , [H, aB, aR.length, a6]);
        let te = (0,
        s.useRef)(null)
          , ta = (0,
        s.useRef)(void 0)
          , tt = (0,
        s.useRef)(null)
          , ts = (0,
        s.useRef)([]);
        (0,
        s.useEffect)(()=>{
            let e = e=>{
                k({
                    x: e.clientX,
                    y: e.clientY
                })
            }
              , a = ()=>{
                K(window.scrollY)
            }
            ;
            return window.addEventListener("mousemove", e),
            window.addEventListener("scroll", a),
            ()=>{
                window.removeEventListener("mousemove", e),
                window.removeEventListener("scroll", a)
            }
        }
        , []),
        (0,
        s.useEffect)(()=>{
            if (!y)
                return;
            let e = setInterval(()=>{
                $(D())
            }
            , 500);
            return ()=>clearInterval(e)
        }
        , [y]),
        (0,
        s.useEffect)(()=>{
            let e = te.current;
            if (!e)
                return;
            let a = e.getContext("2d");
            if (!a)
                return;
            let t = ()=>{
                e.width = window.innerWidth,
                e.height = window.innerHeight
            }
            ;
            t(),
            window.addEventListener("resize", t);
            let s = [];
            for (let a = 0; a < 80; a++) {
                let a = Math.random() * e.width
                  , t = Math.random() * e.height;
                s.push({
                    x: a,
                    y: t,
                    vx: (Math.random() - .5) * .3,
                    vy: (Math.random() - .5) * .3,
                    size: 2 * Math.random() + .5,
                    color: Math.random() > .5 ? "#00f0ff" : "#ff00aa",
                    alpha: .5 * Math.random() + .2,
                    baseX: a,
                    baseY: t
                })
            }
            let r = ()=>{
                a.fillStyle = "rgba(0, 0, 1, 0.08)",
                a.fillRect(0, 0, e.width, e.height),
                s.forEach(t=>{
                    let s = S.x - t.x
                      , r = S.y - t.y
                      , l = Math.sqrt(s * s + r * r);
                    if (l < 150 && l > 0) {
                        let e = (150 - l) / 150;
                        t.vx -= s / l * e * .5,
                        t.vy -= r / l * e * .5
                    }
                    t.vx += (t.baseX - t.x) * .001,
                    t.vy += (t.baseY - t.y) * .001,
                    t.x += t.vx,
                    t.y += t.vy,
                    t.vx *= .98,
                    t.vy *= .98,
                    t.x < 0 && (t.x = e.width),
                    t.x > e.width && (t.x = 0),
                    t.y < 0 && (t.y = e.height),
                    t.y > e.height && (t.y = 0),
                    a.beginPath(),
                    a.arc(t.x, t.y, t.size, 0, 2 * Math.PI),
                    a.fillStyle = t.color,
                    a.globalAlpha = t.alpha,
                    a.fill(),
                    a.globalAlpha = 1
                }
                ),
                a.strokeStyle = "rgba(0, 240, 255, 0.03)",
                a.lineWidth = .5;
                for (let e = 0; e < s.length; e++)
                    for (let t = e + 1; t < s.length; t++) {
                        let r = s[e].x - s[t].x
                          , l = s[e].y - s[t].y;
                        120 > Math.sqrt(r * r + l * l) && (a.beginPath(),
                        a.moveTo(s[e].x, s[e].y),
                        a.lineTo(s[t].x, s[t].y),
                        a.stroke())
                    }
                ts.current = ts.current.filter(e=>(e.x += e.vx,
                e.y += e.vy,
                e.life -= .015,
                e.alpha = e.life,
                !(e.life <= 0) && (a.beginPath(),
                a.arc(e.x, e.y, e.size * e.life, 0, 2 * Math.PI),
                a.fillStyle = e.color,
                a.globalAlpha = e.alpha,
                a.fill(),
                a.globalAlpha = 1,
                !0))),
                ta.current = requestAnimationFrame(r)
            }
            ;
            return r(),
            ()=>{
                window.removeEventListener("resize", t),
                ta.current && cancelAnimationFrame(ta.current)
            }
        }
        , [S]),
        (0,
        s.useEffect)(()=>{
            if ("boot" !== e)
                return;
            let a = setTimeout(()=>b(!0), 800)
              , t = R.reduce((e,a)=>e + a.duration, 0)
              , s = 0
              , l = e=>{
                if (e >= R.length) {
                    n(100),
                    setTimeout(()=>{
                        r("transition"),
                        setTimeout(()=>r("dashboard"), 600)
                    }
                    , 400);
                    return
                }
                i(e);
                let a = R[e].duration
                  , o = s / t * 100
                  , d = (s + a) / t * 100
                  , b = Date.now()
                  , c = ()=>{
                    let t = Math.min((Date.now() - b) / a, 1);
                    n(o + (d - o) * t),
                    t < 1 ? requestAnimationFrame(c) : (s += a,
                    l(e + 1))
                }
                ;
                requestAnimationFrame(c)
            }
            ;
            return l(0),
            ()=>clearTimeout(a)
        }
        , [e]),
        (0,
        s.useEffect)(()=>{
            let e = setInterval(()=>{
                f(!0),
                setTimeout(()=>f(!1), 80)
            }
            , 4e3);
            return ()=>clearInterval(e)
        }
        , []),
        (0,
        s.useEffect)(()=>{
            if (!y)
                return;
            let e = setInterval(()=>{
                w(e=>e.map(e=>({
                    ...e,
                    value: "neural" === e.key ? Math.min(100, e.value + (Math.random() - .5) * 2) : "quantum" === e.key ? Math.min(16, e.value + (Math.random() - .5) * .3) : "ai" === e.key ? Math.min(100, e.value + (Math.random() - .5) * .1) : Math.floor(e.value + (Math.random() - .5) * 30)
                })))
            }
            , 800);
            return ()=>clearInterval(e)
        }
        , [y]);
        let tr = (0,
        s.useCallback)(()=>{
            n(100),
            r("transition"),
            setTimeout(()=>r("dashboard"), 600)
        }
        , [])
          , tl = (0,
        s.useCallback)(e=>{
            W(e),
            G(!0),
            setTimeout(()=>G(!1), 3e3)
        }
        , [])
          , tn = (0,
        s.useCallback)((e,a)=>{
            let t = ["#00f0ff", "#ff00aa", "#00ff88", "#fbbf24"];
            for (let s = 0; s < 40; s++) {
                let r = 2 * Math.PI * s / 40
                  , l = 2 + 3 * Math.random();
                ts.current.push({
                    x: e,
                    y: a,
                    vx: Math.cos(r) * l,
                    vy: Math.sin(r) * l,
                    size: 2 + 2 * Math.random(),
                    color: t[Math.floor(Math.random() * t.length)],
                    alpha: 1,
                    life: 1
                })
            }
        }
        , [])
          , to = (0,
        s.useCallback)(()=>{
            if (u)
                return;
            x(!0),
            p(0),
            j(0),
            te.current && tn(te.current.width / 2, te.current.height / 2);
            let e = T.reduce((e,a)=>e + a.duration, 0)
              , a = 0
              , t = s=>{
                if (s >= T.length) {
                    p(100),
                    setTimeout(()=>{
                        x(!1),
                        v(!0),
                        tl("System initialized successfully!"),
                        te.current && tn(te.current.width / 2, te.current.height / 2)
                    }
                    , 400);
                    return
                }
                j(s);
                let r = T[s].duration
                  , l = a / e * 100
                  , n = (a + r) / e * 100
                  , o = Date.now()
                  , i = ()=>{
                    let e = Math.min((Date.now() - o) / r, 1);
                    p(l + (n - l) * e),
                    e < 1 ? requestAnimationFrame(i) : (a += r,
                    t(s + 1))
                }
                ;
                requestAnimationFrame(i)
            }
            ;
            t(0)
        }
        , [u, tn, tl])
          , ti = (0,
        s.useCallback)(e=>{
            let a = e.toLowerCase().trim()
              , t = z[a];
            "clear" === a ? _([]) : t ? _(a=>[...a, {
                input: e,
                output: t.output,
                color: t.color
            }]) : _(a=>[...a, {
                input: e,
                output: `Command not found: ${e}
Type "help" for available commands.`,
                color: "#ff5f56"
            }]),
            I(""),
            setTimeout(()=>{
                tt.current && (tt.current.scrollTop = tt.current.scrollHeight)
            }
            , 10)
        }
        , [])
          , td = (0,
        s.useCallback)(e=>{
            "Enter" === e.key && C.trim() && ti(C)
        }
        , [C, ti]);
        return "boot" === e || "transition" === e ? (0,
        a.jsxs)("main", {
            className: "fixed inset-0 flex flex-col items-center justify-center z-[9999]",
            style: {
                background: "#000001"
            },
            role: "main",
            "aria-label": "NEXUS OS Boot Screen",
            children: [(0,
            a.jsx)("canvas", {
                ref: te,
                className: "fixed inset-0 z-0 pointer-events-none",
                style: {
                    background: "#000001"
                },
                "aria-hidden": "true"
            }), (0,
            a.jsx)("div", {
                className: "fixed inset-0 pointer-events-none z-10 opacity-10",
                style: {
                    backgroundImage: `
              linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
            `,
                    backgroundSize: "50px 50px"
                },
                "aria-hidden": "true"
            }), (0,
            a.jsx)("div", {
                className: "fixed inset-0 pointer-events-none overflow-hidden z-20",
                "aria-hidden": "true",
                children: (0,
                a.jsx)("div", {
                    className: "absolute w-full h-[2px] opacity-20",
                    style: {
                        background: "linear-gradient(to bottom, transparent, #00f0ff, transparent)",
                        animation: "scan-line 6s linear infinite"
                    }
                })
            }), (0,
            a.jsxs)("div", {
                className: `relative mb-12 z-30 ${"transition" === e ? "animate-pulse" : ""}`,
                children: [(0,
                a.jsx)("h1", {
                    className: `text-6xl md:text-8xl font-bold tracking-wider transition-all duration-100 ${c ? "glitch-effect" : ""}`,
                    style: {
                        fontFamily: "monospace",
                        color: "#00f0ff",
                        textShadow: `
                0 0 10px #00f0ff,
                0 0 20px #00f0ff,
                0 0 40px #00f0ff,
                0 0 80px #00f0ff
              `
                    },
                    children: "NEXUS"
                }), (0,
                a.jsx)("div", {
                    className: "text-center mt-2",
                    children: (0,
                    a.jsx)("span", {
                        className: "text-sm tracking-[0.3em] animate-pulse",
                        style: {
                            color: "#ff00aa"
                        },
                        children: "OPERATING SYSTEM v9.0"
                    })
                }), (0,
                a.jsx)("div", {
                    className: "absolute -inset-10 border rounded-lg pointer-events-none animate-pulse",
                    style: {
                        borderColor: "rgba(0, 240, 255, 0.3)"
                    },
                    "aria-hidden": "true"
                }), (0,
                a.jsx)("div", {
                    className: "absolute -inset-20 border rounded-lg pointer-events-none",
                    style: {
                        borderColor: "rgba(0, 240, 255, 0.15)"
                    },
                    "aria-hidden": "true"
                })]
            }), (0,
            a.jsxs)("div", {
                className: "w-80 md:w-96 space-y-4 z-30",
                children: [(0,
                a.jsx)("div", {
                    className: "h-36 overflow-hidden rounded-lg p-3 font-mono text-xs backdrop-blur-sm",
                    style: {
                        background: "rgba(0, 10, 20, 0.9)",
                        border: "1px solid rgba(0, 240, 255, 0.3)",
                        boxShadow: "0 0 20px rgba(0, 240, 255, 0.1), inset 0 0 20px rgba(0, 240, 255, 0.05)"
                    },
                    role: "log",
                    "aria-live": "polite",
                    "aria-label": "Boot sequence log",
                    children: R.slice(0, o + 1).map((e,t)=>(0,
                    a.jsxs)("div", {
                        className: "flex items-center gap-2 mb-1.5",
                        style: {
                            color: t === o ? "#00f0ff" : "#00ff88"
                        },
                        children: [(0,
                        a.jsx)("span", {
                            className: "text-xs",
                            children: t === o ? "▸" : "✓"
                        }), (0,
                        a.jsx)("span", {
                            children: e.label
                        }), t === o && (0,
                        a.jsx)("span", {
                            className: "animate-pulse",
                            children: "..."
                        })]
                    }, e.id))
                }), (0,
                a.jsxs)("div", {
                    className: "space-y-2",
                    children: [(0,
                    a.jsx)("div", {
                        className: "h-2 rounded-full overflow-hidden",
                        style: {
                            background: "rgba(0, 240, 255, 0.1)",
                            boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)"
                        },
                        children: (0,
                        a.jsx)("div", {
                            className: "h-full rounded-full transition-all duration-200 relative overflow-hidden",
                            style: {
                                width: `${l}%`,
                                background: "linear-gradient(90deg, #00f0ff, #ff00aa)",
                                boxShadow: "0 0 15px #00f0ff"
                            },
                            children: (0,
                            a.jsx)("div", {
                                className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
                            })
                        })
                    }), (0,
                    a.jsxs)("div", {
                        className: "text-center text-xs font-mono",
                        style: {
                            color: "#6b7280"
                        },
                        children: [Math.round(l), "% Complete"]
                    })]
                }), d && (0,
                a.jsx)(m, {
                    variant: "outline",
                    onClick: tr,
                    className: "w-full font-mono text-xs hover:scale-105 transition-transform",
                    style: {
                        borderColor: "rgba(0, 240, 255, 0.5)",
                        color: "#00f0ff",
                        background: "rgba(0, 240, 255, 0.1)"
                    },
                    "aria-label": "Skip boot sequence",
                    children: "[ SKIP INTRO ]"
                })]
            })]
        }) : (0,
        a.jsxs)("main", {
            style: {
                background: "#000001"
            },
            role: "main",
            "aria-label": "NEXUS OS Dashboard",
            className: "jsx-d4bd7a5bf3b07a9b min-h-screen overflow-x-hidden",
            children: [(0,
            a.jsx)("canvas", {
                ref: te,
                style: {
                    background: "#000001"
                },
                "aria-hidden": "true",
                className: "jsx-d4bd7a5bf3b07a9b fixed inset-0 z-0 pointer-events-none"
            }), B && (0,
            a.jsxs)("div", {
                style: {
                    background: "rgba(0, 255, 136, 0.2)",
                    border: "1px solid rgba(0, 255, 136, 0.5)",
                    color: "#00ff88",
                    boxShadow: "0 0 20px rgba(0, 255, 136, 0.3)"
                },
                className: "jsx-d4bd7a5bf3b07a9b fixed top-4 right-4 z-[200] px-6 py-3 rounded-lg font-mono text-sm animate-slide-in",
                children: ["✓ ", X]
            }), u && (0,
            a.jsxs)("div", {
                style: {
                    background: "rgba(0, 0, 1, 0.95)",
                    backdropFilter: "blur(20px)"
                },
                className: "jsx-d4bd7a5bf3b07a9b fixed inset-0 z-[100] flex flex-col items-center justify-center",
                children: [(0,
                a.jsxs)("div", {
                    className: "jsx-d4bd7a5bf3b07a9b relative mb-8",
                    children: [(0,
                    a.jsx)("div", {
                        style: {
                            width: 200,
                            height: 200,
                            left: -20,
                            top: -20,
                            background: "radial-gradient(circle, rgba(0, 240, 255, 0.2) 0%, transparent 70%)"
                        },
                        className: "jsx-d4bd7a5bf3b07a9b absolute inset-0 rounded-full animate-ping"
                    }), (0,
                    a.jsx)("div", {
                        style: {
                            width: 160,
                            height: 160,
                            borderColor: "rgba(0, 240, 255, 0.5)",
                            boxShadow: "0 0 40px rgba(0, 240, 255, 0.3), inset 0 0 40px rgba(0, 240, 255, 0.1)"
                        },
                        className: "jsx-d4bd7a5bf3b07a9b flex items-center justify-center rounded-full border-2 relative",
                        children: (0,
                        a.jsx)("div", {
                            className: "jsx-d4bd7a5bf3b07a9b text-5xl animate-pulse",
                            children: "🧬"
                        })
                    })]
                }), (0,
                a.jsxs)("div", {
                    className: "jsx-d4bd7a5bf3b07a9b text-center mb-6",
                    children: [(0,
                    a.jsx)("h2", {
                        style: {
                            color: "#00f0ff",
                            textShadow: "0 0 10px #00f0ff"
                        },
                        className: "jsx-d4bd7a5bf3b07a9b text-2xl font-bold font-mono mb-2",
                        children: "INITIALIZING SYSTEM"
                    }), (0,
                    a.jsx)("p", {
                        style: {
                            color: "#ff00aa"
                        },
                        className: "jsx-d4bd7a5bf3b07a9b text-lg font-mono animate-pulse",
                        children: T[g]?.label
                    })]
                }), (0,
                a.jsxs)("div", {
                    className: "jsx-d4bd7a5bf3b07a9b w-80 md:w-96 space-y-2",
                    children: [(0,
                    a.jsx)("div", {
                        style: {
                            background: "rgba(0, 240, 255, 0.1)"
                        },
                        className: "jsx-d4bd7a5bf3b07a9b h-3 rounded-full overflow-hidden",
                        children: (0,
                        a.jsx)("div", {
                            style: {
                                width: `${h}%`,
                                background: "linear-gradient(90deg, #00f0ff, #ff00aa, #00ff88)",
                                boxShadow: "0 0 20px rgba(0, 240, 255, 0.5)"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b h-full rounded-full transition-all duration-150"
                        })
                    }), (0,
                    a.jsxs)("div", {
                        style: {
                            color: "#6b7280"
                        },
                        className: "jsx-d4bd7a5bf3b07a9b text-center font-mono text-sm",
                        children: [Math.round(h), "% Complete"]
                    })]
                }), (0,
                a.jsx)("div", {
                    className: "jsx-d4bd7a5bf3b07a9b flex gap-2 mt-6",
                    children: T.map((e,t)=>(0,
                    a.jsx)("div", {
                        style: {
                            background: t < g ? "#00ff88" : t === g ? "#00f0ff" : "rgba(0, 240, 255, 0.2)",
                            boxShadow: t === g ? "0 0 10px #00f0ff" : t < g ? "0 0 10px #00ff88" : "none"
                        },
                        className: "jsx-d4bd7a5bf3b07a9b w-2 h-2 rounded-full transition-all duration-300"
                    }, e.id))
                })]
            }), y && (0,
            a.jsx)("div", {
                style: {
                    background: "linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.15), transparent)",
                    borderBottom: "1px solid rgba(0, 255, 136, 0.3)"
                },
                className: "jsx-d4bd7a5bf3b07a9b fixed top-0 left-0 right-0 z-50 py-2 text-center animate-slide-down pointer-events-none",
                children: (0,
                a.jsx)("span", {
                    style: {
                        color: "#00ff88",
                        textShadow: "0 0 10px #00ff88"
                    },
                    className: "jsx-d4bd7a5bf3b07a9b font-mono text-sm",
                    children: "✓ SYSTEM INITIALIZED - ALL SUBSYSTEMS OPERATIONAL"
                })
            }), (0,
            a.jsx)("div", {
                style: {
                    backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: "50px 50px"
                },
                "aria-hidden": "true",
                className: "jsx-d4bd7a5bf3b07a9b fixed inset-0 pointer-events-none z-10 opacity-5"
            }), (0,
            a.jsxs)("header", {
                style: {
                    borderColor: "rgba(0, 240, 255, 0.2)",
                    background: "rgba(0, 0, 1, 0.8)"
                },
                className: `jsx-d4bd7a5bf3b07a9b fixed top-0 left-0 right-0 z-40 border-b backdrop-blur-md transition-all duration-300 ${y ? "mt-8" : ""}`,
                children: [(0,
                a.jsxs)("div", {
                    className: "jsx-d4bd7a5bf3b07a9b container mx-auto px-4 py-3 flex items-center justify-between",
                    children: [(0,
                    a.jsxs)("div", {
                        className: "jsx-d4bd7a5bf3b07a9b flex items-center gap-3",
                        children: [(0,
                        a.jsx)("span", {
                            style: {
                                fontFamily: "monospace",
                                color: "#00f0ff",
                                textShadow: "0 0 10px #00f0ff"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b text-2xl font-bold tracking-wider cursor-pointer hover:scale-105 transition-transform",
                            children: "NEXUS"
                        }), (0,
                        a.jsx)("span", {
                            style: {
                                background: "rgba(0, 240, 255, 0.1)",
                                color: "#00f0ff",
                                border: "1px solid rgba(0, 240, 255, 0.3)"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b px-2 py-0.5 rounded text-xs font-mono",
                            children: "v9.0"
                        }), y && (0,
                        a.jsx)("span", {
                            style: {
                                background: "rgba(0, 255, 136, 0.2)",
                                color: "#00ff88",
                                border: "1px solid rgba(0, 255, 136, 0.5)"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b px-2 py-0.5 rounded text-xs font-mono animate-pulse",
                            children: "ACTIVE"
                        })]
                    }), (0,
                    a.jsxs)("nav", {
                        role: "navigation",
                        "aria-label": "Main navigation",
                        className: "jsx-d4bd7a5bf3b07a9b hidden lg:flex items-center gap-1",
                        children: [F.slice(0, 6).map(e=>(0,
                        a.jsxs)("button", {
                            type: "button",
                            onClick: ()=>aY(e.id),
                            style: {
                                color: H === e.id ? "#00f0ff" : "#9ca3af",
                                background: H === e.id ? "rgba(0, 240, 255, 0.1)" : "transparent"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-300 hover:bg-cyan-500/10",
                            children: [(0,
                            a.jsx)("span", {
                                className: "jsx-d4bd7a5bf3b07a9b",
                                children: e.icon
                            }), (0,
                            a.jsx)("span", {
                                className: "jsx-d4bd7a5bf3b07a9b hidden xl:inline",
                                children: e.label
                            })]
                        }, e.id)), (0,
                        a.jsxs)("div", {
                            className: "jsx-d4bd7a5bf3b07a9b relative",
                            children: [(0,
                            a.jsxs)("button", {
                                type: "button",
                                onClick: ()=>ee(!Z),
                                onBlur: ()=>setTimeout(()=>ee(!1), 200),
                                style: {
                                    color: Z ? "#00f0ff" : "#9ca3af",
                                    background: Z ? "rgba(0, 240, 255, 0.1)" : "transparent"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b flex items-center gap-1 px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-300 hover:bg-cyan-500/10",
                                children: ["More ", Z ? "▴" : "▾"]
                            }), Z && (0,
                            a.jsx)("div", {
                                style: {
                                    background: "rgba(0, 20, 40, 0.98)",
                                    border: "1px solid rgba(0, 240, 255, 0.2)",
                                    minWidth: "160px"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b absolute top-full right-0 mt-1 py-2 rounded-lg z-50",
                                children: F.slice(6).map(e=>(0,
                                a.jsxs)("button", {
                                    type: "button",
                                    onClick: ()=>aY(e.id),
                                    style: {
                                        color: H === e.id ? "#00f0ff" : "#9ca3af",
                                        background: H === e.id ? "rgba(0, 240, 255, 0.1)" : "transparent"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b flex items-center gap-2 w-full px-4 py-2 font-mono text-xs text-left hover:bg-cyan-500/10 transition-colors",
                                    children: [(0,
                                    a.jsx)("span", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: e.icon
                                    }), (0,
                                    a.jsx)("span", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: e.label
                                    })]
                                }, e.id))
                            })]
                        })]
                    }), (0,
                    a.jsxs)("div", {
                        className: "jsx-d4bd7a5bf3b07a9b flex items-center gap-3",
                        children: [(0,
                        a.jsx)("button", {
                            type: "button",
                            onClick: ()=>aQ(!0),
                            style: {
                                color: "#9ca3af"
                            },
                            title: "Help & Documentation",
                            className: "jsx-d4bd7a5bf3b07a9b p-2 rounded-lg transition-all hover:bg-cyan-500/10",
                            children: "❓"
                        }), (0,
                        a.jsxs)("div", {
                            style: {
                                background: y ? "rgba(0, 255, 136, 0.1)" : "rgba(255, 170, 0, 0.1)",
                                border: y ? "1px solid rgba(0, 255, 136, 0.3)" : "1px solid rgba(255, 170, 0, 0.3)"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer hover:scale-105 transition-transform",
                            children: [(0,
                            a.jsx)("span", {
                                style: {
                                    background: y ? "#00ff88" : "#ffaa00"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b w-2 h-2 rounded-full animate-pulse"
                            }), (0,
                            a.jsx)("span", {
                                style: {
                                    color: y ? "#00ff88" : "#ffaa00"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b text-xs font-mono hidden sm:inline",
                                children: y ? "ONLINE" : "STANDBY"
                            })]
                        }), (0,
                        a.jsxs)("button", {
                            type: "button",
                            style: {
                                border: "1px solid rgba(0, 240, 255, 0.3)"
                            },
                            onClick: ()=>Y(!Q),
                            "aria-label": "Toggle mobile menu",
                            className: "jsx-d4bd7a5bf3b07a9b lg:hidden p-2 rounded-lg",
                            children: [(0,
                            a.jsx)("div", {
                                className: "jsx-d4bd7a5bf3b07a9b w-5 h-0.5 bg-cyan-400 mb-1"
                            }), (0,
                            a.jsx)("div", {
                                className: "jsx-d4bd7a5bf3b07a9b w-5 h-0.5 bg-cyan-400 mb-1"
                            }), (0,
                            a.jsx)("div", {
                                className: "jsx-d4bd7a5bf3b07a9b w-5 h-0.5 bg-cyan-400"
                            })]
                        })]
                    })]
                }), Q && (0,
                a.jsx)("div", {
                    style: {
                        borderColor: "rgba(0, 240, 255, 0.2)",
                        background: "rgba(0, 0, 1, 0.98)"
                    },
                    className: "jsx-d4bd7a5bf3b07a9b lg:hidden border-t px-4 py-4 grid grid-cols-3 gap-2",
                    children: F.map(e=>(0,
                    a.jsxs)("button", {
                        type: "button",
                        style: {
                            color: H === e.id ? "#00f0ff" : "#9ca3af",
                            background: H === e.id ? "rgba(0, 240, 255, 0.1)" : "transparent"
                        },
                        onClick: ()=>aY(e.id),
                        className: "jsx-d4bd7a5bf3b07a9b flex flex-col items-center gap-1 py-3 px-2 rounded-lg transition-colors",
                        children: [(0,
                        a.jsx)("span", {
                            className: "jsx-d4bd7a5bf3b07a9b text-xl",
                            children: e.icon
                        }), (0,
                        a.jsx)("span", {
                            className: "jsx-d4bd7a5bf3b07a9b font-mono text-xs",
                            children: e.label
                        })]
                    }, e.id))
                })]
            }), (0,
            a.jsxs)("div", {
                className: `jsx-d4bd7a5bf3b07a9b relative z-20 container mx-auto px-4 pt-24 pb-8 ${y ? "mt-8" : ""}`,
                children: ["Dashboard" === H && (0,
                a.jsxs)(a.Fragment, {
                    children: [(0,
                    a.jsxs)("section", {
                        "aria-labelledby": "hero-heading",
                        className: "jsx-d4bd7a5bf3b07a9b text-center mb-16",
                        children: [(0,
                        a.jsx)("h1", {
                            id: "hero-heading",
                            style: {
                                fontFamily: "monospace",
                                background: "linear-gradient(135deg, #00f0ff 0%, #ff00aa 50%, #00f0ff 100%)",
                                backgroundSize: "200% 200%",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                animation: "gradient-shift 3s ease infinite"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b text-4xl md:text-6xl lg:text-7xl font-bold mb-4",
                            children: y ? "System Online" : "Welcome to NEXUS OS"
                        }), (0,
                        a.jsx)("p", {
                            style: {
                                color: "#9ca3af"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b text-lg md:text-xl max-w-2xl mx-auto mb-8",
                            children: y ? "All quantum neural pathways are active. The system is fully operational and ready for commands." : "The world's first sentient operating system. Powered by quantum computing and self-evolving neural networks."
                        }), (0,
                        a.jsxs)("div", {
                            className: "jsx-d4bd7a5bf3b07a9b flex flex-wrap justify-center gap-4",
                            children: [(0,
                            a.jsxs)(m, {
                                size: "lg",
                                className: "font-mono relative overflow-hidden group",
                                onClick: to,
                                disabled: u || y,
                                style: {
                                    background: y ? "linear-gradient(135deg, #00ff88, #00aa55)" : "linear-gradient(135deg, #00f0ff, #00a0cc)",
                                    color: "#000",
                                    boxShadow: y ? "0 0 30px rgba(0, 255, 136, 0.4)" : "0 0 30px rgba(0, 240, 255, 0.4)"
                                },
                                children: [(0,
                                a.jsx)("span", {
                                    className: "jsx-d4bd7a5bf3b07a9b relative z-10",
                                    children: u ? "INITIALIZING..." : y ? "✓ SYSTEM ACTIVE" : "Initialize System"
                                }), !y && !u && (0,
                                a.jsx)("span", {
                                    className: "jsx-d4bd7a5bf3b07a9b absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                                })]
                            }), (0,
                            a.jsx)(m, {
                                size: "lg",
                                variant: "outline",
                                className: "font-mono hover:scale-105 transition-transform",
                                style: {
                                    borderColor: "rgba(255, 0, 170, 0.5)",
                                    color: "#ff00aa"
                                },
                                onMouseEnter: e=>{
                                    e.currentTarget.style.boxShadow = "0 0 20px rgba(255, 0, 170, 0.3)"
                                }
                                ,
                                onMouseLeave: e=>{
                                    e.currentTarget.style.boxShadow = "none"
                                }
                                ,
                                children: "View Documentation"
                            })]
                        })]
                    }), (0,
                    a.jsxs)("section", {
                        "aria-labelledby": "stats-heading",
                        className: "jsx-d4bd7a5bf3b07a9b mb-16",
                        children: [(0,
                        a.jsx)("h2", {
                            id: "stats-heading",
                            className: "jsx-d4bd7a5bf3b07a9b sr-only",
                            children: "System Statistics"
                        }), y && (0,
                        a.jsxs)("div", {
                            style: {
                                background: "rgba(0, 20, 30, 0.5)",
                                border: "1px solid rgba(0, 240, 255, 0.2)"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b mb-6 p-4 rounded-xl",
                            children: [(0,
                            a.jsxs)("div", {
                                className: "jsx-d4bd7a5bf3b07a9b flex items-center justify-between mb-2",
                                children: [(0,
                                a.jsx)("span", {
                                    style: {
                                        color: "#00f0ff"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b font-mono text-sm",
                                    children: "Network Activity"
                                }), (0,
                                a.jsx)("span", {
                                    style: {
                                        color: "#6b7280"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b font-mono text-xs",
                                    children: "Real-time"
                                })]
                            }), (0,
                            a.jsx)("div", {
                                className: "jsx-d4bd7a5bf3b07a9b flex items-end gap-1 h-16",
                                children: L.map((e,t)=>(0,
                                a.jsx)("div", {
                                    style: {
                                        height: `${e}%`,
                                        background: "linear-gradient(to top, #00f0ff, #ff00aa)",
                                        opacity: .3 + e / 100 * .7
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b flex-1 rounded-t transition-all duration-150"
                                }, t))
                            })]
                        }), (0,
                        a.jsx)("div", {
                            className: "jsx-d4bd7a5bf3b07a9b grid grid-cols-2 md:grid-cols-4 gap-4",
                            children: N.map((e,t)=>(0,
                            a.jsxs)("div", {
                                style: {
                                    background: y ? "rgba(0, 20, 30, 0.8)" : "rgba(10, 10, 30, 0.8)",
                                    border: y ? "1px solid rgba(0, 255, 136, 0.3)" : "1px solid rgba(0, 240, 255, 0.2)",
                                    boxShadow: y ? "0 0 20px rgba(0, 255, 136, 0.1)" : "none"
                                },
                                onMouseEnter: ()=>U(t),
                                onMouseLeave: ()=>U(null),
                                className: "jsx-d4bd7a5bf3b07a9b p-6 rounded-xl transition-all duration-500 hover:scale-105 cursor-pointer group",
                                children: [(0,
                                a.jsxs)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b flex items-center gap-2 mb-2",
                                    children: [(0,
                                    a.jsx)("span", {
                                        className: "jsx-d4bd7a5bf3b07a9b text-xl",
                                        children: e.icon
                                    }), (0,
                                    a.jsx)("div", {
                                        style: {
                                            color: "#9ca3af"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b text-sm font-mono",
                                        children: e.label
                                    })]
                                }), (0,
                                a.jsxs)("div", {
                                    style: {
                                        color: "cyan" === e.color ? "#00f0ff" : "magenta" === e.color ? "#ff00aa" : "green" === e.color ? "#00ff88" : "#fbbf24",
                                        textShadow: y || q === t ? "0 0 15px currentColor" : "none"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b text-2xl md:text-3xl font-bold font-mono transition-all duration-300",
                                    children: ["number" == typeof e.value && e.value < 100 ? e.value.toFixed(+(e.value % 1 != 0)) : Math.round(e.value).toLocaleString(), e.unit && (0,
                                    a.jsx)("span", {
                                        style: {
                                            color: "#6b7280"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b text-sm ml-1",
                                        children: e.unit
                                    })]
                                }), (0,
                                a.jsx)(E, {
                                    value: "number" == typeof e.value && e.value < 100 ? e.value : 100,
                                    className: "mt-3 h-1"
                                })]
                            }, t))
                        })]
                    }), (0,
                    a.jsxs)("section", {
                        "aria-labelledby": "features-heading",
                        className: "jsx-d4bd7a5bf3b07a9b mb-16",
                        children: [(0,
                        a.jsx)("h2", {
                            id: "features-heading",
                            style: {
                                color: "#00f0ff"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b text-2xl font-bold mb-8 text-center font-mono",
                            children: "Core Capabilities"
                        }), (0,
                        a.jsx)("div", {
                            className: "jsx-d4bd7a5bf3b07a9b grid md:grid-cols-2 lg:grid-cols-4 gap-6",
                            children: M.map((e,t)=>(0,
                            a.jsxs)("article", {
                                style: {
                                    background: y ? "rgba(0, 20, 30, 0.8)" : "rgba(10, 10, 30, 0.8)",
                                    border: y ? "1px solid rgba(0, 255, 136, 0.2)" : "1px solid rgba(0, 240, 255, 0.2)"
                                },
                                onMouseEnter: ()=>U(t + 10),
                                onMouseLeave: ()=>U(null),
                                className: "jsx-d4bd7a5bf3b07a9b p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer group",
                                children: [(0,
                                a.jsx)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b text-5xl mb-4 group-hover:scale-110 transition-transform",
                                    children: e.icon
                                }), (0,
                                a.jsx)("h3", {
                                    style: {
                                        color: "#fff"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b text-lg font-bold mb-2",
                                    children: e.title
                                }), (0,
                                a.jsx)("p", {
                                    style: {
                                        color: "#9ca3af"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b text-sm mb-3",
                                    children: e.description
                                }), (0,
                                a.jsx)("div", {
                                    style: {
                                        background: "rgba(0, 240, 255, 0.1)",
                                        color: "#00f0ff",
                                        border: "1px solid rgba(0, 240, 255, 0.2)"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b text-xs font-mono px-2 py-1 rounded inline-block",
                                    children: e.stats
                                })]
                            }, t))
                        })]
                    }), (0,
                    a.jsxs)("section", {
                        style: {
                            background: "rgba(0, 5, 10, 0.95)",
                            border: y ? "1px solid rgba(0, 255, 136, 0.3)" : "1px solid rgba(0, 240, 255, 0.3)",
                            boxShadow: "0 0 30px rgba(0, 240, 255, 0.1)"
                        },
                        "aria-labelledby": "terminal-heading",
                        className: "jsx-d4bd7a5bf3b07a9b rounded-xl overflow-hidden",
                        children: [(0,
                        a.jsxs)("div", {
                            style: {
                                background: y ? "rgba(0, 255, 136, 0.1)" : "rgba(0, 240, 255, 0.1)"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b flex items-center gap-2 px-4 py-3",
                            children: [(0,
                            a.jsx)("div", {
                                style: {
                                    background: "#ff5f56"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b w-3 h-3 rounded-full cursor-pointer hover:scale-110 transition-transform"
                            }), (0,
                            a.jsx)("div", {
                                style: {
                                    background: "#ffbd2e"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b w-3 h-3 rounded-full cursor-pointer hover:scale-110 transition-transform"
                            }), (0,
                            a.jsx)("div", {
                                style: {
                                    background: "#27ca40"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b w-3 h-3 rounded-full cursor-pointer hover:scale-110 transition-transform"
                            }), (0,
                            a.jsx)("span", {
                                style: {
                                    color: "#6b7280"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b ml-4 text-xs font-mono",
                                children: "nexus@terminal ~ interactive"
                            })]
                        }), (0,
                        a.jsxs)("div", {
                            ref: tt,
                            style: {
                                color: "#00f0ff"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b p-4 font-mono text-sm h-64 overflow-y-auto",
                            children: [A.map((e,t)=>(0,
                            a.jsxs)("div", {
                                className: "jsx-d4bd7a5bf3b07a9b mb-3",
                                children: [(0,
                                a.jsxs)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b flex items-center",
                                    children: [(0,
                                    a.jsx)("span", {
                                        style: {
                                            color: y ? "#00ff88" : "#00f0ff"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: "nexus@system"
                                    }), (0,
                                    a.jsx)("span", {
                                        style: {
                                            color: "#fff"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: ":"
                                    }), (0,
                                    a.jsx)("span", {
                                        style: {
                                            color: "#60a5fa"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: "~"
                                    }), "$ ", e.input]
                                }), e.output && (0,
                                a.jsx)("pre", {
                                    style: {
                                        color: e.color || "#9ca3af"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b ml-0 mt-1 whitespace-pre-wrap",
                                    children: e.output
                                })]
                            }, t)), (0,
                            a.jsxs)("div", {
                                className: "jsx-d4bd7a5bf3b07a9b flex items-center",
                                children: [(0,
                                a.jsx)("span", {
                                    style: {
                                        color: y ? "#00ff88" : "#00f0ff"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b",
                                    children: "nexus@system"
                                }), (0,
                                a.jsx)("span", {
                                    style: {
                                        color: "#fff"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b",
                                    children: ":"
                                }), (0,
                                a.jsx)("span", {
                                    style: {
                                        color: "#60a5fa"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b",
                                    children: "~"
                                }), "$", (0,
                                a.jsx)("input", {
                                    type: "text",
                                    value: C,
                                    onChange: e=>I(e.target.value),
                                    onKeyDown: td,
                                    style: {
                                        color: "#00f0ff",
                                        caretColor: "#00f0ff"
                                    },
                                    placeholder: "Type a command...",
                                    "aria-label": "Terminal input",
                                    className: "jsx-d4bd7a5bf3b07a9b ml-2 flex-1 bg-transparent outline-none font-mono"
                                })]
                            })]
                        })]
                    })]
                }), "Settings" === H && (0,
                a.jsxs)("section", {
                    className: "jsx-d4bd7a5bf3b07a9b mb-16",
                    children: [(0,
                    a.jsx)("h2", {
                        style: {
                            color: "#00f0ff",
                            textShadow: "0 0 10px #00f0ff"
                        },
                        className: "jsx-d4bd7a5bf3b07a9b text-3xl font-bold mb-8 font-mono",
                        children: "System Settings"
                    }), (0,
                    a.jsxs)("div", {
                        className: "jsx-d4bd7a5bf3b07a9b grid md:grid-cols-2 gap-6",
                        children: [(0,
                        a.jsxs)("div", {
                            style: {
                                background: "rgba(0, 20, 30, 0.8)",
                                border: "1px solid rgba(0, 240, 255, 0.2)"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b p-6 rounded-xl",
                            children: [(0,
                            a.jsx)("h3", {
                                style: {
                                    color: "#00f0ff"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b text-lg font-bold mb-4 font-mono",
                                children: "Performance"
                            }), (0,
                            a.jsxs)("div", {
                                className: "jsx-d4bd7a5bf3b07a9b space-y-4",
                                children: [(0,
                                a.jsxs)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b",
                                    children: [(0,
                                    a.jsxs)("div", {
                                        className: "jsx-d4bd7a5bf3b07a9b flex justify-between mb-2",
                                        children: [(0,
                                        a.jsx)("span", {
                                            style: {
                                                color: "#9ca3af"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b font-mono text-sm",
                                            children: "Neural Processing Power"
                                        }), (0,
                                        a.jsxs)("span", {
                                            style: {
                                                color: "#00f0ff"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b font-mono text-sm",
                                            children: [ea.neuralPower, "%"]
                                        })]
                                    }), (0,
                                    a.jsx)("input", {
                                        type: "range",
                                        min: "0",
                                        max: "100",
                                        value: ea.neuralPower,
                                        onChange: e=>aV("neuralPower", parseInt(e.target.value)),
                                        style: {
                                            background: `linear-gradient(to right, #00f0ff ${ea.neuralPower}%, rgba(0, 240, 255, 0.2) ${ea.neuralPower}%)`
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b w-full h-2 rounded-lg appearance-none cursor-pointer"
                                    })]
                                }), (0,
                                a.jsxs)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b",
                                    children: [(0,
                                    a.jsxs)("div", {
                                        className: "jsx-d4bd7a5bf3b07a9b flex justify-between mb-2",
                                        children: [(0,
                                        a.jsx)("span", {
                                            style: {
                                                color: "#9ca3af"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b font-mono text-sm",
                                            children: "Quantum Core Allocation"
                                        }), (0,
                                        a.jsxs)("span", {
                                            style: {
                                                color: "#00f0ff"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b font-mono text-sm",
                                            children: [ea.quantumAllocation, "%"]
                                        })]
                                    }), (0,
                                    a.jsx)("input", {
                                        type: "range",
                                        min: "0",
                                        max: "100",
                                        value: ea.quantumAllocation,
                                        onChange: e=>aV("quantumAllocation", parseInt(e.target.value)),
                                        style: {
                                            background: `linear-gradient(to right, #ff00aa ${ea.quantumAllocation}%, rgba(255, 0, 170, 0.2) ${ea.quantumAllocation}%)`
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b w-full h-2 rounded-lg appearance-none cursor-pointer"
                                    })]
                                }), (0,
                                a.jsxs)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b",
                                    children: [(0,
                                    a.jsxs)("div", {
                                        className: "jsx-d4bd7a5bf3b07a9b flex justify-between mb-2",
                                        children: [(0,
                                        a.jsx)("span", {
                                            style: {
                                                color: "#9ca3af"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b font-mono text-sm",
                                            children: "Memory Cache Size"
                                        }), (0,
                                        a.jsxs)("span", {
                                            style: {
                                                color: "#00f0ff"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b font-mono text-sm",
                                            children: [ea.memoryCache, "%"]
                                        })]
                                    }), (0,
                                    a.jsx)("input", {
                                        type: "range",
                                        min: "0",
                                        max: "100",
                                        value: ea.memoryCache,
                                        onChange: e=>aV("memoryCache", parseInt(e.target.value)),
                                        style: {
                                            background: `linear-gradient(to right, #00ff88 ${ea.memoryCache}%, rgba(0, 255, 136, 0.2) ${ea.memoryCache}%)`
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b w-full h-2 rounded-lg appearance-none cursor-pointer"
                                    })]
                                })]
                            })]
                        }), (0,
                        a.jsxs)("div", {
                            style: {
                                background: "rgba(0, 20, 30, 0.8)",
                                border: "1px solid rgba(0, 240, 255, 0.2)"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b p-6 rounded-xl",
                            children: [(0,
                            a.jsx)("h3", {
                                style: {
                                    color: "#00f0ff"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b text-lg font-bold mb-4 font-mono",
                                children: "Security"
                            }), (0,
                            a.jsx)("div", {
                                className: "jsx-d4bd7a5bf3b07a9b space-y-4",
                                children: [{
                                    key: "biometric",
                                    label: "Biometric Authentication"
                                }, {
                                    key: "quantumEncryption",
                                    label: "Quantum Encryption"
                                }, {
                                    key: "intrusionDetection",
                                    label: "Intrusion Detection"
                                }, {
                                    key: "autoUpdate",
                                    label: "Auto-Update Security"
                                }].map(e=>(0,
                                a.jsxs)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b flex items-center justify-between py-2",
                                    children: [(0,
                                    a.jsx)("span", {
                                        style: {
                                            color: "#9ca3af"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b font-mono text-sm",
                                        children: e.label
                                    }), (0,
                                    a.jsx)("button", {
                                        type: "button",
                                        onClick: ()=>aV(e.key, !ea[e.key]),
                                        style: {
                                            background: ea[e.key] ? "rgba(0, 255, 136, 0.3)" : "rgba(100, 100, 100, 0.3)",
                                            border: ea[e.key] ? "1px solid rgba(0, 255, 136, 0.5)" : "1px solid rgba(100, 100, 100, 0.5)"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b w-12 h-6 rounded-full transition-all duration-300",
                                        children: (0,
                                        a.jsx)("div", {
                                            style: {
                                                background: ea[e.key] ? "#00ff88" : "#6b7280",
                                                transform: ea[e.key] ? "translateX(24px)" : "translateX(0)",
                                                boxShadow: ea[e.key] ? "0 0 10px #00ff88" : "none"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b w-5 h-5 rounded-full transition-all duration-300"
                                        })
                                    })]
                                }, e.key))
                            })]
                        })]
                    }), (0,
                    a.jsxs)("div", {
                        className: "jsx-d4bd7a5bf3b07a9b mt-6 flex justify-end gap-4",
                        children: [(0,
                        a.jsx)(m, {
                            variant: "outline",
                            className: "font-mono",
                            onClick: aK,
                            style: {
                                borderColor: "rgba(0, 240, 255, 0.3)",
                                color: "#00f0ff"
                            },
                            children: "Reset Defaults"
                        }), (0,
                        a.jsx)(m, {
                            className: "font-mono",
                            onClick: aH,
                            style: {
                                background: "linear-gradient(135deg, #00f0ff, #00a0cc)",
                                color: "#000"
                            },
                            children: "Save Changes"
                        })]
                    })]
                }), "ImageGen" === H && (0,
                a.jsxs)("section", {
                    className: "jsx-d4bd7a5bf3b07a9b mb-16",
                    children: [(0,
                    a.jsx)("h2", {
                        style: {
                            color: "#00f0ff",
                            textShadow: "0 0 10px #00f0ff"
                        },
                        className: "jsx-d4bd7a5bf3b07a9b text-3xl font-bold mb-8 font-mono",
                        children: "🎨 AI Image Creation"
                    }), (0,
                    a.jsxs)("div", {
                        className: "jsx-d4bd7a5bf3b07a9b grid lg:grid-cols-2 gap-6 mb-8",
                        children: [(0,
                        a.jsxs)("div", {
                            style: {
                                background: "rgba(0, 20, 30, 0.8)",
                                border: "1px solid rgba(0, 240, 255, 0.2)"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b p-6 rounded-xl",
                            children: [(0,
                            a.jsx)("h3", {
                                style: {
                                    color: "#00f0ff"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b text-lg font-bold mb-4 font-mono",
                                children: "Create Image"
                            }), (0,
                            a.jsx)("textarea", {
                                style: {
                                    background: "rgba(0, 10, 20, 0.8)",
                                    border: "1px solid rgba(0, 240, 255, 0.3)",
                                    color: "#fff"
                                },
                                placeholder: "Describe the image you want to create...",
                                value: es,
                                onChange: e=>er(e.target.value),
                                className: "jsx-d4bd7a5bf3b07a9b w-full h-32 p-4 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                            }), (0,
                            a.jsx)("div", {
                                className: "jsx-d4bd7a5bf3b07a9b mt-4 flex flex-wrap gap-2",
                                children: ["Photorealistic", "Anime", "3D Render", "Digital Art", "Oil Painting", "Watercolor"].map(e=>(0,
                                a.jsx)("button", {
                                    type: "button",
                                    onClick: ()=>en(e),
                                    style: {
                                        background: el === e ? "rgba(0, 240, 255, 0.3)" : "rgba(0, 240, 255, 0.1)",
                                        border: el === e ? "1px solid rgba(0, 240, 255, 0.6)" : "1px solid rgba(0, 240, 255, 0.3)",
                                        color: "#00f0ff"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b px-3 py-1 rounded-full text-xs font-mono transition-all hover:scale-105",
                                    children: e
                                }, e))
                            }), (0,
                            a.jsxs)("div", {
                                className: "jsx-d4bd7a5bf3b07a9b mt-4 grid grid-cols-2 gap-4",
                                children: [(0,
                                a.jsxs)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b",
                                    children: [(0,
                                    a.jsx)("label", {
                                        style: {
                                            color: "#9ca3af"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b text-xs font-mono mb-1 block",
                                        children: "Size"
                                    }), (0,
                                    a.jsxs)("select", {
                                        style: {
                                            background: "rgba(0, 10, 20, 0.8)",
                                            border: "1px solid rgba(0, 240, 255, 0.3)",
                                            color: "#fff"
                                        },
                                        value: eo,
                                        onChange: e=>ei(e.target.value),
                                        className: "jsx-d4bd7a5bf3b07a9b w-full p-2 rounded font-mono text-sm focus:outline-none",
                                        children: [(0,
                                        a.jsx)("option", {
                                            value: "1024x1024",
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "1024 x 1024"
                                        }), (0,
                                        a.jsx)("option", {
                                            value: "768x1344",
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "768 x 1344"
                                        }), (0,
                                        a.jsx)("option", {
                                            value: "1344x768",
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "1344 x 768"
                                        }), (0,
                                        a.jsx)("option", {
                                            value: "1152x864",
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "1152 x 864"
                                        })]
                                    })]
                                }), (0,
                                a.jsxs)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b",
                                    children: [(0,
                                    a.jsx)("label", {
                                        style: {
                                            color: "#9ca3af"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b text-xs font-mono mb-1 block",
                                        children: "Quality"
                                    }), (0,
                                    a.jsxs)("select", {
                                        style: {
                                            background: "rgba(0, 10, 20, 0.8)",
                                            border: "1px solid rgba(0, 240, 255, 0.3)",
                                            color: "#fff"
                                        },
                                        value: ed,
                                        onChange: e=>eb(e.target.value),
                                        className: "jsx-d4bd7a5bf3b07a9b w-full p-2 rounded font-mono text-sm focus:outline-none",
                                        children: [(0,
                                        a.jsx)("option", {
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "Standard"
                                        }), (0,
                                        a.jsx)("option", {
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "HD"
                                        }), (0,
                                        a.jsx)("option", {
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "Ultra HD"
                                        })]
                                    })]
                                })]
                            }), em && (0,
                            a.jsxs)("div", {
                                style: {
                                    background: "rgba(255, 0, 100, 0.1)",
                                    border: "1px solid rgba(255, 0, 100, 0.3)",
                                    color: "#ff6b6b"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b mt-4 p-3 rounded-lg text-sm font-mono",
                                children: ["⚠️ ", em]
                            }), (0,
                            a.jsx)(m, {
                                className: "w-full mt-4 font-mono",
                                style: {
                                    background: "linear-gradient(135deg, #ff00aa, #aa0066)",
                                    color: "#fff"
                                },
                                onClick: aJ,
                                disabled: eu,
                                children: eu ? (0,
                                a.jsxs)("span", {
                                    className: "jsx-d4bd7a5bf3b07a9b flex items-center justify-center gap-2",
                                    children: [(0,
                                    a.jsx)("span", {
                                        className: "jsx-d4bd7a5bf3b07a9b animate-spin",
                                        children: "⏳"
                                    }), " Generating..."]
                                }) : "✨ Generate Image"
                            })]
                        }), (0,
                        a.jsxs)("div", {
                            style: {
                                background: "rgba(0, 20, 30, 0.8)",
                                border: "1px solid rgba(0, 240, 255, 0.2)"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b p-6 rounded-xl",
                            children: [(0,
                            a.jsx)("h3", {
                                style: {
                                    color: "#00f0ff"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b text-lg font-bold mb-4 font-mono",
                                children: "Preview"
                            }), (0,
                            a.jsx)("div", {
                                style: {
                                    background: "rgba(0, 10, 20, 0.8)",
                                    border: ec ? "1px solid rgba(0, 240, 255, 0.3)" : "1px dashed rgba(0, 240, 255, 0.3)"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b aspect-square rounded-lg flex items-center justify-center overflow-hidden",
                                children: eu ? (0,
                                a.jsxs)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b text-center",
                                    children: [(0,
                                    a.jsx)("div", {
                                        className: "jsx-d4bd7a5bf3b07a9b text-6xl mb-4 animate-pulse",
                                        children: "🎨"
                                    }), (0,
                                    a.jsx)("p", {
                                        style: {
                                            color: "#00f0ff"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b font-mono text-sm",
                                        children: "Generating your image..."
                                    })]
                                }) : ec ? (0,
                                a.jsx)("img", {
                                    src: ec,
                                    alt: "Generated",
                                    className: "jsx-d4bd7a5bf3b07a9b w-full h-full object-cover rounded-lg"
                                }) : (0,
                                a.jsxs)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b text-center",
                                    children: [(0,
                                    a.jsx)("div", {
                                        className: "jsx-d4bd7a5bf3b07a9b text-6xl mb-4",
                                        children: "🖼️"
                                    }), (0,
                                    a.jsx)("p", {
                                        style: {
                                            color: "#6b7280"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b font-mono text-sm",
                                        children: "Generated image will appear here"
                                    })]
                                })
                            }), (0,
                            a.jsxs)("div", {
                                className: "jsx-d4bd7a5bf3b07a9b mt-4 flex gap-2",
                                children: [(0,
                                a.jsx)(m, {
                                    variant: "outline",
                                    className: "flex-1 font-mono text-xs",
                                    style: {
                                        borderColor: "rgba(0, 240, 255, 0.3)",
                                        color: "#00f0ff"
                                    },
                                    onClick: aJ,
                                    disabled: !ec || eu,
                                    children: "🔄 Regenerate"
                                }), (0,
                                a.jsx)(m, {
                                    variant: "outline",
                                    className: "flex-1 font-mono text-xs",
                                    style: {
                                        borderColor: "rgba(0, 240, 255, 0.3)",
                                        color: "#00f0ff"
                                    },
                                    onClick: aZ,
                                    disabled: !ec,
                                    children: "⬇️ Download"
                                }), (0,
                                a.jsx)(m, {
                                    variant: "outline",
                                    className: "flex-1 font-mono text-xs",
                                    style: {
                                        borderColor: "rgba(0, 240, 255, 0.3)",
                                        color: "#00f0ff"
                                    },
                                    onClick: a0,
                                    disabled: !ec,
                                    children: "📋 Copy"
                                })]
                            })]
                        })]
                    }), (0,
                    a.jsxs)("div", {
                        style: {
                            background: "rgba(0, 20, 30, 0.8)",
                            border: "1px solid rgba(0, 240, 255, 0.2)"
                        },
                        className: "jsx-d4bd7a5bf3b07a9b p-6 rounded-xl",
                        children: [(0,
                        a.jsx)("h3", {
                            style: {
                                color: "#00f0ff"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b text-lg font-bold mb-4 font-mono",
                            children: "Recent Creations"
                        }), (0,
                        a.jsx)("div", {
                            className: "jsx-d4bd7a5bf3b07a9b grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4",
                            children: ep.length > 0 ? ep.map((e,t)=>(0,
                            a.jsx)("div", {
                                style: {
                                    border: "1px solid rgba(0, 240, 255, 0.2)"
                                },
                                onClick: ()=>ef(e.image),
                                className: "jsx-d4bd7a5bf3b07a9b aspect-square rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform",
                                children: (0,
                                a.jsx)("img", {
                                    src: e.image,
                                    alt: e.prompt,
                                    className: "jsx-d4bd7a5bf3b07a9b w-full h-full object-cover"
                                })
                            }, t)) : (0,
                            a.jsxs)("div", {
                                className: "jsx-d4bd7a5bf3b07a9b col-span-full text-center py-8",
                                children: [(0,
                                a.jsx)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b text-4xl mb-2",
                                    children: "🎨"
                                }), (0,
                                a.jsx)("p", {
                                    style: {
                                        color: "#6b7280"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b font-mono text-sm",
                                    children: "Your generated images will appear here"
                                })]
                            })
                        })]
                    })]
                }), "Chat" === H && (0,
                a.jsxs)("section", {
                    className: "jsx-d4bd7a5bf3b07a9b mb-16",
                    children: [(0,
                    a.jsx)("h2", {
                        style: {
                            color: "#00f0ff",
                            textShadow: "0 0 10px #00f0ff"
                        },
                        className: "jsx-d4bd7a5bf3b07a9b text-3xl font-bold mb-8 font-mono",
                        children: "💬 Neural Chat"
                    }), (0,
                    a.jsx)("div", {
                        className: "jsx-d4bd7a5bf3b07a9b flex gap-2 mb-6",
                        children: [{
                            id: "ai",
                            label: "AI Assistant",
                            icon: "🤖"
                        }, {
                            id: "video",
                            label: "Video Room",
                            icon: "📹"
                        }].map(e=>(0,
                        a.jsxs)("button", {
                            type: "button",
                            onClick: ()=>eA(e.id),
                            style: {
                                background: eI === e.id ? "rgba(0, 240, 255, 0.2)" : "rgba(0, 20, 30, 0.8)",
                                border: eI === e.id ? "1px solid rgba(0, 240, 255, 0.5)" : "1px solid rgba(0, 240, 255, 0.2)",
                                color: eI === e.id ? "#00f0ff" : "#9ca3af"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b px-4 py-2 rounded-lg font-mono text-sm transition-all",
                            children: [e.icon, " ", e.label]
                        }, e.id))
                    }), "ai" === eI && (0,
                    a.jsxs)("div", {
                        className: "jsx-d4bd7a5bf3b07a9b grid lg:grid-cols-4 gap-6",
                        children: [(0,
                        a.jsxs)("div", {
                            style: {
                                background: "rgba(0, 20, 30, 0.8)",
                                border: "1px solid rgba(0, 240, 255, 0.2)"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b rounded-xl p-4",
                            children: [(0,
                            a.jsxs)("div", {
                                className: "jsx-d4bd7a5bf3b07a9b flex items-center justify-between mb-4",
                                children: [(0,
                                a.jsx)("h3", {
                                    style: {
                                        color: "#00f0ff"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b font-mono font-bold",
                                    children: "Contacts"
                                }), (0,
                                a.jsx)("span", {
                                    style: {
                                        background: "rgba(0, 255, 136, 0.2)",
                                        color: "#00ff88"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b px-2 py-0.5 rounded-full text-xs font-mono",
                                    children: "12 online"
                                })]
                            }), (0,
                            a.jsx)("div", {
                                className: "jsx-d4bd7a5bf3b07a9b space-y-2",
                                children: [{
                                    name: "AI Core",
                                    status: "online",
                                    avatar: "🤖"
                                }, {
                                    name: "Quantum Team",
                                    status: "online",
                                    avatar: "⚛️"
                                }, {
                                    name: "Security Ops",
                                    status: "online",
                                    avatar: "🔐"
                                }, {
                                    name: "Dev Squad",
                                    status: "away",
                                    avatar: "👨‍💻"
                                }, {
                                    name: "Research Lab",
                                    status: "online",
                                    avatar: "🔬"
                                }].map((e,t)=>(0,
                                a.jsxs)("button", {
                                    type: "button",
                                    onClick: ()=>eC(t),
                                    style: {
                                        background: ek === t ? "rgba(0, 240, 255, 0.1)" : "transparent"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b w-full flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-cyan-500/10 transition-all text-left",
                                    children: [(0,
                                    a.jsx)("span", {
                                        className: "jsx-d4bd7a5bf3b07a9b text-2xl",
                                        children: e.avatar
                                    }), (0,
                                    a.jsxs)("div", {
                                        className: "jsx-d4bd7a5bf3b07a9b flex-1",
                                        children: [(0,
                                        a.jsx)("div", {
                                            style: {
                                                color: "#fff"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b font-mono text-sm",
                                            children: e.name
                                        }), (0,
                                        a.jsx)("div", {
                                            style: {
                                                color: "#6b7280"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b font-mono text-xs",
                                            children: e.status
                                        })]
                                    }), (0,
                                    a.jsx)("span", {
                                        style: {
                                            background: "online" === e.status ? "#00ff88" : "#fbbf24"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b w-2 h-2 rounded-full"
                                    })]
                                }, t))
                            })]
                        }), (0,
                        a.jsxs)("div", {
                            style: {
                                background: "rgba(0, 10, 20, 0.8)",
                                border: "1px solid rgba(0, 240, 255, 0.2)",
                                height: "500px"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b lg:col-span-3 rounded-xl overflow-hidden flex flex-col",
                            children: [(0,
                            a.jsx)("div", {
                                style: {
                                    borderBottom: "1px solid rgba(0, 240, 255, 0.1)"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b flex items-center justify-between px-4 py-3",
                                children: (0,
                                a.jsxs)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b flex items-center gap-3",
                                    children: [(0,
                                    a.jsx)("span", {
                                        className: "jsx-d4bd7a5bf3b07a9b text-2xl",
                                        children: "🤖"
                                    }), (0,
                                    a.jsxs)("div", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("div", {
                                            style: {
                                                color: "#fff"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b font-mono font-bold",
                                            children: "AI Core"
                                        }), (0,
                                        a.jsx)("div", {
                                            style: {
                                                color: "#00ff88"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b font-mono text-xs",
                                            children: "Online • Quantum Neural Network"
                                        })]
                                    })]
                                })
                            }), (0,
                            a.jsxs)("div", {
                                className: "jsx-d4bd7a5bf3b07a9b flex-1 p-4 overflow-y-auto space-y-4",
                                children: [ej.map((e,t)=>(0,
                                a.jsxs)("div", {
                                    className: `jsx-d4bd7a5bf3b07a9b flex gap-3 ${"user" === e.role ? "justify-end" : ""}`,
                                    children: ["assistant" === e.role && (0,
                                    a.jsx)("span", {
                                        className: "jsx-d4bd7a5bf3b07a9b text-xl flex-shrink-0",
                                        children: "🤖"
                                    }), (0,
                                    a.jsxs)("div", {
                                        style: {
                                            background: "user" === e.role ? "rgba(0, 255, 136, 0.1)" : "rgba(0, 240, 255, 0.1)"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b p-3 rounded-lg max-w-md",
                                        children: [(0,
                                        a.jsx)("p", {
                                            style: {
                                                color: "#e5e7eb"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b font-mono text-sm whitespace-pre-wrap",
                                            children: e.content
                                        }), (0,
                                        a.jsx)("p", {
                                            style: {
                                                color: "#6b7280"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b font-mono text-xs mt-1",
                                            children: e.time
                                        })]
                                    }), "user" === e.role && (0,
                                    a.jsx)("span", {
                                        className: "jsx-d4bd7a5bf3b07a9b text-xl flex-shrink-0",
                                        children: "👤"
                                    })]
                                }, t)), ew && (0,
                                a.jsxs)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b flex gap-3",
                                    children: [(0,
                                    a.jsx)("span", {
                                        className: "jsx-d4bd7a5bf3b07a9b text-xl",
                                        children: "🤖"
                                    }), (0,
                                    a.jsx)("div", {
                                        style: {
                                            background: "rgba(0, 240, 255, 0.1)"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b p-3 rounded-lg",
                                        children: (0,
                                        a.jsxs)("div", {
                                            className: "jsx-d4bd7a5bf3b07a9b flex gap-1",
                                            children: [(0,
                                            a.jsx)("span", {
                                                style: {
                                                    background: "#00f0ff",
                                                    animationDelay: "0ms"
                                                },
                                                className: "jsx-d4bd7a5bf3b07a9b w-2 h-2 rounded-full animate-bounce"
                                            }), (0,
                                            a.jsx)("span", {
                                                style: {
                                                    background: "#00f0ff",
                                                    animationDelay: "150ms"
                                                },
                                                className: "jsx-d4bd7a5bf3b07a9b w-2 h-2 rounded-full animate-bounce"
                                            }), (0,
                                            a.jsx)("span", {
                                                style: {
                                                    background: "#00f0ff",
                                                    animationDelay: "300ms"
                                                },
                                                className: "jsx-d4bd7a5bf3b07a9b w-2 h-2 rounded-full animate-bounce"
                                            })]
                                        })
                                    })]
                                })]
                            }), (0,
                            a.jsx)("div", {
                                style: {
                                    borderColor: "rgba(0, 240, 255, 0.1)"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b p-4 border-t",
                                children: (0,
                                a.jsxs)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b flex gap-2",
                                    children: [(0,
                                    a.jsx)("input", {
                                        type: "text",
                                        style: {
                                            background: "rgba(0, 10, 20, 0.8)",
                                            border: "1px solid rgba(0, 240, 255, 0.3)",
                                            color: "#fff"
                                        },
                                        placeholder: "Type a message...",
                                        value: ev,
                                        onChange: e=>eN(e.target.value),
                                        onKeyDown: e=>"Enter" === e.key && !e.shiftKey && a5(),
                                        disabled: ew,
                                        className: "jsx-d4bd7a5bf3b07a9b flex-1 p-3 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                    }), (0,
                                    a.jsx)(m, {
                                        className: "font-mono px-6",
                                        style: {
                                            background: "linear-gradient(135deg, #00f0ff, #00a0cc)",
                                            color: "#000"
                                        },
                                        onClick: a5,
                                        disabled: ew || !ev.trim(),
                                        children: ew ? "..." : "Send"
                                    })]
                                })
                            })]
                        })]
                    }), "video" === eI && (0,
                    a.jsxs)("div", {
                        className: "jsx-d4bd7a5bf3b07a9b grid lg:grid-cols-3 gap-6",
                        children: [(0,
                        a.jsx)("div", {
                            className: "jsx-d4bd7a5bf3b07a9b lg:col-span-2 space-y-4",
                            children: eR ? (0,
                            a.jsxs)(a.Fragment, {
                                children: [(0,
                                a.jsxs)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b grid grid-cols-2 gap-4",
                                    children: [(0,
                                    a.jsxs)("div", {
                                        style: {
                                            background: "rgba(0, 10, 20, 0.8)",
                                            border: "1px solid rgba(0, 240, 255, 0.3)",
                                            aspectRatio: "4/3"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b rounded-xl overflow-hidden relative",
                                        children: [(0,
                                        a.jsx)("video", {
                                            ref: eG,
                                            autoPlay: !0,
                                            muted: !0,
                                            playsInline: !0,
                                            className: "jsx-d4bd7a5bf3b07a9b w-full h-full object-cover"
                                        }), !eP && (0,
                                        a.jsx)("div", {
                                            style: {
                                                background: "rgba(0, 0, 0, 0.7)"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b absolute inset-0 flex items-center justify-center",
                                            children: (0,
                                            a.jsx)("span", {
                                                className: "jsx-d4bd7a5bf3b07a9b text-4xl",
                                                children: "👤"
                                            })
                                        }), (0,
                                        a.jsxs)("div", {
                                            style: {
                                                background: "rgba(0, 0, 0, 0.7)",
                                                color: "#00f0ff"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b absolute bottom-2 left-2 px-2 py-1 rounded text-xs font-mono",
                                            children: [eq, " (You)"]
                                        })]
                                    }), (0,
                                    a.jsxs)("div", {
                                        style: {
                                            background: "rgba(0, 10, 20, 0.8)",
                                            border: "1px solid rgba(255, 0, 170, 0.3)",
                                            aspectRatio: "4/3"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b rounded-xl overflow-hidden relative",
                                        children: [(0,
                                        a.jsx)("video", {
                                            ref: eX,
                                            autoPlay: !0,
                                            playsInline: !0,
                                            className: "jsx-d4bd7a5bf3b07a9b w-full h-full object-cover"
                                        }), (0,
                                        a.jsx)("div", {
                                            style: {
                                                background: "rgba(0, 0, 0, 0.5)"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b absolute inset-0 flex items-center justify-center",
                                            children: (0,
                                            a.jsxs)("div", {
                                                className: "jsx-d4bd7a5bf3b07a9b text-center",
                                                children: [(0,
                                                a.jsx)("span", {
                                                    className: "jsx-d4bd7a5bf3b07a9b text-4xl",
                                                    children: "🎥"
                                                }), (0,
                                                a.jsx)("p", {
                                                    style: {
                                                        color: "#6b7280"
                                                    },
                                                    className: "jsx-d4bd7a5bf3b07a9b font-mono text-xs mt-2",
                                                    children: "Waiting for others..."
                                                })]
                                            })
                                        })]
                                    })]
                                }), (0,
                                a.jsxs)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b flex justify-center gap-4",
                                    children: [(0,
                                    a.jsx)("button", {
                                        type: "button",
                                        onClick: a1,
                                        style: {
                                            background: eP ? "rgba(0, 240, 255, 0.2)" : "rgba(255, 0, 100, 0.2)",
                                            border: "1px solid rgba(0, 240, 255, 0.3)"
                                        },
                                        className: `jsx-d4bd7a5bf3b07a9b p-4 rounded-full transition-all ${eP ? "" : "opacity-50"}`,
                                        children: eP ? "📹" : "🚫"
                                    }), (0,
                                    a.jsx)("button", {
                                        type: "button",
                                        onClick: a9,
                                        style: {
                                            background: ez ? "rgba(0, 240, 255, 0.2)" : "rgba(255, 0, 100, 0.2)",
                                            border: "1px solid rgba(0, 240, 255, 0.3)"
                                        },
                                        className: `jsx-d4bd7a5bf3b07a9b p-4 rounded-full transition-all ${ez ? "" : "opacity-50"}`,
                                        children: ez ? "🎤" : "🔇"
                                    }), (0,
                                    a.jsx)("button", {
                                        type: "button",
                                        onClick: a2,
                                        style: {
                                            background: "rgba(255, 0, 100, 0.3)",
                                            border: "1px solid rgba(255, 0, 100, 0.5)"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b p-4 rounded-full transition-all hover:scale-110",
                                        children: "📵"
                                    })]
                                }), (0,
                                a.jsxs)("div", {
                                    style: {
                                        background: "rgba(0, 255, 136, 0.1)",
                                        border: "1px solid rgba(0, 255, 136, 0.3)"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b text-center p-3 rounded-lg",
                                    children: [(0,
                                    a.jsx)("span", {
                                        style: {
                                            color: "#00ff88"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b font-mono text-sm",
                                        children: "Room Code: "
                                    }), (0,
                                    a.jsx)("span", {
                                        style: {
                                            color: "#00f0ff"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b font-mono text-lg font-bold",
                                        children: e_
                                    }), (0,
                                    a.jsx)("button", {
                                        type: "button",
                                        onClick: ()=>navigator.clipboard.writeText(e_),
                                        style: {
                                            background: "rgba(0, 240, 255, 0.2)",
                                            color: "#00f0ff"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b ml-2 px-2 py-1 rounded text-xs font-mono",
                                        children: "Copy"
                                    })]
                                })]
                            }) : (0,
                            a.jsxs)("div", {
                                style: {
                                    background: "rgba(0, 20, 30, 0.8)",
                                    border: "1px solid rgba(0, 240, 255, 0.2)"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b rounded-xl p-8 text-center",
                                children: [(0,
                                a.jsx)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b text-6xl mb-6",
                                    children: "📹"
                                }), (0,
                                a.jsx)("h3", {
                                    style: {
                                        color: "#00f0ff"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b text-xl font-bold mb-4 font-mono",
                                    children: "Video Chat Room"
                                }), (0,
                                a.jsx)("p", {
                                    style: {
                                        color: "#9ca3af"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b font-mono text-sm mb-6",
                                    children: "Create a room and share the code with others to start a video chat"
                                }), eU && (0,
                                a.jsxs)("div", {
                                    style: {
                                        background: "rgba(255, 0, 100, 0.1)",
                                        border: "1px solid rgba(255, 0, 100, 0.3)",
                                        color: "#ff6b6b"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b mb-4 p-3 rounded-lg font-mono text-sm",
                                    children: ["⚠️ ", eU]
                                }), (0,
                                a.jsxs)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b space-y-4 max-w-sm mx-auto",
                                    children: [(0,
                                    a.jsxs)("div", {
                                        className: "jsx-d4bd7a5bf3b07a9b flex gap-2",
                                        children: [(0,
                                        a.jsx)("input", {
                                            type: "text",
                                            value: e_,
                                            onChange: e=>eE(e.target.value.toUpperCase()),
                                            placeholder: "Enter room code",
                                            style: {
                                                background: "rgba(0, 10, 20, 0.8)",
                                                border: "1px solid rgba(0, 240, 255, 0.3)",
                                                color: "#fff"
                                            },
                                            maxLength: 8,
                                            className: "jsx-d4bd7a5bf3b07a9b flex-1 p-3 rounded-lg font-mono text-sm text-center uppercase focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                        }), (0,
                                        a.jsx)(m, {
                                            onClick: ()=>a3(),
                                            style: {
                                                background: "linear-gradient(135deg, #00f0ff, #00a0cc)",
                                                color: "#000"
                                            },
                                            children: "Join"
                                        })]
                                    }), (0,
                                    a.jsx)("div", {
                                        style: {
                                            color: "#6b7280"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b font-mono text-xs",
                                        children: "— or —"
                                    }), (0,
                                    a.jsx)(m, {
                                        onClick: ()=>{
                                            a3(a4())
                                        }
                                        ,
                                        className: "w-full font-mono",
                                        style: {
                                            background: "linear-gradient(135deg, #ff00aa, #aa0066)",
                                            color: "#fff"
                                        },
                                        children: "✨ Create New Room"
                                    })]
                                })]
                            })
                        }), (0,
                        a.jsxs)("div", {
                            style: {
                                background: "rgba(0, 20, 30, 0.8)",
                                border: "1px solid rgba(0, 240, 255, 0.2)",
                                height: "500px"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b rounded-xl overflow-hidden flex flex-col",
                            children: [(0,
                            a.jsxs)("div", {
                                style: {
                                    borderColor: "rgba(0, 240, 255, 0.1)"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b p-4 border-b",
                                children: [(0,
                                a.jsx)("h3", {
                                    style: {
                                        color: "#00f0ff"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b font-mono font-bold",
                                    children: "💬 Room Chat"
                                }), (0,
                                a.jsxs)("p", {
                                    style: {
                                        color: "#6b7280"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b font-mono text-xs",
                                    children: ["You are: ", eq]
                                })]
                            }), (0,
                            a.jsx)("div", {
                                className: "jsx-d4bd7a5bf3b07a9b flex-1 p-4 overflow-y-auto space-y-3",
                                children: eF.length > 0 ? eF.map((e,t)=>(0,
                                a.jsxs)("div", {
                                    style: {
                                        background: "System" === e.user ? "rgba(255, 187, 46, 0.1)" : e.user === eq ? "rgba(0, 255, 136, 0.1)" : "rgba(0, 240, 255, 0.1)"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b p-2 rounded-lg",
                                    children: [(0,
                                    a.jsxs)("div", {
                                        className: "jsx-d4bd7a5bf3b07a9b flex items-center gap-2 mb-1",
                                        children: [(0,
                                        a.jsx)("span", {
                                            style: {
                                                color: "System" === e.user ? "#fbbf24" : e.user === eq ? "#00ff88" : "#00f0ff"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b font-mono text-xs font-bold",
                                            children: e.user
                                        }), (0,
                                        a.jsx)("span", {
                                            style: {
                                                color: "#6b7280"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b font-mono text-xs",
                                            children: e.time
                                        })]
                                    }), (0,
                                    a.jsx)("p", {
                                        style: {
                                            color: "#e5e7eb"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b font-mono text-sm",
                                        children: e.content
                                    })]
                                }, t)) : (0,
                                a.jsx)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b text-center py-8",
                                    children: (0,
                                    a.jsx)("p", {
                                        style: {
                                            color: "#6b7280"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b font-mono text-sm",
                                        children: "Join a room to start chatting"
                                    })
                                })
                            }), (0,
                            a.jsx)("div", {
                                style: {
                                    borderColor: "rgba(0, 240, 255, 0.1)"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b p-4 border-t",
                                children: (0,
                                a.jsxs)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b flex gap-2",
                                    children: [(0,
                                    a.jsx)("input", {
                                        type: "text",
                                        value: eL,
                                        onChange: e=>e$(e.target.value),
                                        onKeyDown: e=>"Enter" === e.key && a8(),
                                        placeholder: "Type a message...",
                                        disabled: !eR,
                                        style: {
                                            background: "rgba(0, 10, 20, 0.8)",
                                            border: "1px solid rgba(0, 240, 255, 0.3)",
                                            color: "#fff"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b flex-1 p-2 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                    }), (0,
                                    a.jsx)(m, {
                                        onClick: a8,
                                        disabled: !eR || !eL.trim(),
                                        className: "font-mono",
                                        style: {
                                            background: "linear-gradient(135deg, #00f0ff, #00a0cc)",
                                            color: "#000"
                                        },
                                        children: "Send"
                                    })]
                                })
                            })]
                        })]
                    })]
                }), "AI" === H && (0,
                a.jsxs)("section", {
                    className: "jsx-d4bd7a5bf3b07a9b mb-16",
                    children: [(0,
                    a.jsx)("h2", {
                        style: {
                            color: "#00f0ff",
                            textShadow: "0 0 10px #00f0ff"
                        },
                        className: "jsx-d4bd7a5bf3b07a9b text-3xl font-bold mb-8 font-mono",
                        children: "🤖 AI Lab"
                    }), (0,
                    a.jsxs)("div", {
                        className: "jsx-d4bd7a5bf3b07a9b grid lg:grid-cols-3 gap-6",
                        children: [(0,
                        a.jsxs)("div", {
                            className: "jsx-d4bd7a5bf3b07a9b lg:col-span-2 space-y-6",
                            children: [(0,
                            a.jsxs)("div", {
                                style: {
                                    background: "rgba(0, 20, 30, 0.8)",
                                    border: "1px solid rgba(0, 240, 255, 0.2)"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b rounded-xl p-6",
                                children: [(0,
                                a.jsxs)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b flex items-center justify-between mb-4",
                                    children: [(0,
                                    a.jsx)("h3", {
                                        style: {
                                            color: "#00f0ff"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b font-mono font-bold",
                                        children: "AI Query Interface"
                                    }), (0,
                                    a.jsxs)("select", {
                                        style: {
                                            background: "rgba(0, 10, 20, 0.8)",
                                            border: "1px solid rgba(0, 240, 255, 0.3)",
                                            color: "#fff"
                                        },
                                        value: as,
                                        onChange: e=>ar(e.target.value),
                                        className: "jsx-d4bd7a5bf3b07a9b p-2 rounded font-mono text-sm focus:outline-none",
                                        children: [(0,
                                        a.jsx)("option", {
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "GPT-5 Quantum"
                                        }), (0,
                                        a.jsx)("option", {
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "DALL-E 4"
                                        }), (0,
                                        a.jsx)("option", {
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "Whisper X"
                                        }), (0,
                                        a.jsx)("option", {
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "Codex Ultra"
                                        })]
                                    })]
                                }), (0,
                                a.jsx)("textarea", {
                                    style: {
                                        background: "rgba(0, 10, 20, 0.8)",
                                        border: "1px solid rgba(0, 240, 255, 0.3)",
                                        color: "#fff"
                                    },
                                    placeholder: "Enter your prompt or question for the AI model...",
                                    value: e9,
                                    onChange: e=>e8(e.target.value),
                                    className: "jsx-d4bd7a5bf3b07a9b w-full h-32 p-4 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                }), (0,
                                a.jsxs)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b flex gap-2 mt-4",
                                    children: [(0,
                                    a.jsx)(m, {
                                        className: "flex-1 font-mono",
                                        style: {
                                            background: "linear-gradient(135deg, #00f0ff, #00a0cc)",
                                            color: "#000"
                                        },
                                        onClick: a7,
                                        disabled: aa || !e9.trim(),
                                        children: aa ? (0,
                                        a.jsxs)("span", {
                                            className: "jsx-d4bd7a5bf3b07a9b flex items-center justify-center gap-2",
                                            children: [(0,
                                            a.jsx)("span", {
                                                className: "jsx-d4bd7a5bf3b07a9b animate-spin",
                                                children: "⏳"
                                            }), " Processing..."]
                                        }) : "🚀 Execute Query"
                                    }), (0,
                                    a.jsx)(m, {
                                        variant: "outline",
                                        className: "font-mono",
                                        style: {
                                            borderColor: "rgba(0, 240, 255, 0.3)",
                                            color: "#00f0ff"
                                        },
                                        onClick: ()=>{
                                            e8(""),
                                            ae("")
                                        }
                                        ,
                                        children: "Clear"
                                    })]
                                })]
                            }), (0,
                            a.jsxs)("div", {
                                style: {
                                    background: "rgba(0, 20, 30, 0.8)",
                                    border: "1px solid rgba(0, 240, 255, 0.2)"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b rounded-xl p-6",
                                children: [(0,
                                a.jsx)("h3", {
                                    style: {
                                        color: "#00f0ff"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b font-mono font-bold mb-4",
                                    children: "Response"
                                }), (0,
                                a.jsx)("div", {
                                    style: {
                                        background: "rgba(0, 10, 20, 0.8)",
                                        border: "1px solid rgba(0, 240, 255, 0.1)",
                                        color: "#e5e7eb"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b min-h-48 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap",
                                    children: aa ? (0,
                                    a.jsx)("div", {
                                        className: "jsx-d4bd7a5bf3b07a9b flex items-center justify-center h-32",
                                        children: (0,
                                        a.jsxs)("div", {
                                            className: "jsx-d4bd7a5bf3b07a9b text-center",
                                            children: [(0,
                                            a.jsx)("div", {
                                                className: "jsx-d4bd7a5bf3b07a9b text-4xl mb-4 animate-pulse",
                                                children: "🧠"
                                            }), (0,
                                            a.jsx)("p", {
                                                style: {
                                                    color: "#00f0ff"
                                                },
                                                className: "jsx-d4bd7a5bf3b07a9b",
                                                children: "Processing your request..."
                                            })]
                                        })
                                    }) : e6 || (0,
                                    a.jsx)("div", {
                                        className: "jsx-d4bd7a5bf3b07a9b flex items-center justify-center h-32",
                                        children: (0,
                                        a.jsxs)("div", {
                                            className: "jsx-d4bd7a5bf3b07a9b text-center",
                                            children: [(0,
                                            a.jsx)("div", {
                                                className: "jsx-d4bd7a5bf3b07a9b text-4xl mb-4",
                                                children: "💭"
                                            }), (0,
                                            a.jsx)("p", {
                                                style: {
                                                    color: "#6b7280"
                                                },
                                                className: "jsx-d4bd7a5bf3b07a9b",
                                                children: "AI response will appear here"
                                            })]
                                        })
                                    })
                                }), e6 && (0,
                                a.jsxs)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b flex gap-2 mt-4",
                                    children: [(0,
                                    a.jsx)(m, {
                                        variant: "outline",
                                        className: "flex-1 font-mono text-xs",
                                        style: {
                                            borderColor: "rgba(0, 240, 255, 0.3)",
                                            color: "#00f0ff"
                                        },
                                        onClick: ()=>navigator.clipboard.writeText(e6),
                                        children: "📋 Copy Response"
                                    }), (0,
                                    a.jsx)(m, {
                                        variant: "outline",
                                        className: "flex-1 font-mono text-xs",
                                        style: {
                                            borderColor: "rgba(0, 240, 255, 0.3)",
                                            color: "#00f0ff"
                                        },
                                        onClick: a7,
                                        children: "🔄 Regenerate"
                                    })]
                                })]
                            })]
                        }), (0,
                        a.jsxs)("div", {
                            className: "jsx-d4bd7a5bf3b07a9b space-y-4",
                            children: [(0,
                            a.jsxs)("div", {
                                style: {
                                    background: "rgba(0, 20, 30, 0.8)",
                                    border: "1px solid rgba(0, 240, 255, 0.2)"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b rounded-xl p-4",
                                children: [(0,
                                a.jsx)("h3", {
                                    style: {
                                        color: "#00f0ff"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b font-mono font-bold mb-4",
                                    children: "Quick Prompts"
                                }), (0,
                                a.jsx)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b space-y-2",
                                    children: [{
                                        prompt: "Explain quantum computing",
                                        icon: "⚛️"
                                    }, {
                                        prompt: "Write a Python script",
                                        icon: "🐍"
                                    }, {
                                        prompt: "Analyze this data",
                                        icon: "📊"
                                    }, {
                                        prompt: "Generate creative ideas",
                                        icon: "💡"
                                    }, {
                                        prompt: "Debug this code",
                                        icon: "🐛"
                                    }].map((e,t)=>(0,
                                    a.jsxs)("button", {
                                        type: "button",
                                        onClick: ()=>e8(e.prompt),
                                        style: {
                                            border: "1px solid rgba(0, 240, 255, 0.1)"
                                        },
                                        className: "jsx-d4bd7a5bf3b07a9b w-full flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-cyan-500/10 text-left",
                                        children: [(0,
                                        a.jsx)("span", {
                                            className: "jsx-d4bd7a5bf3b07a9b text-xl",
                                            children: e.icon
                                        }), (0,
                                        a.jsx)("span", {
                                            style: {
                                                color: "#e5e7eb"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b font-mono text-xs",
                                            children: e.prompt
                                        })]
                                    }, t))
                                })]
                            }), (0,
                            a.jsxs)("div", {
                                style: {
                                    background: "rgba(0, 20, 30, 0.8)",
                                    border: "1px solid rgba(0, 240, 255, 0.2)"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b rounded-xl p-4",
                                children: [(0,
                                a.jsx)("h3", {
                                    style: {
                                        color: "#00f0ff"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b font-mono font-bold mb-4",
                                    children: "Resources"
                                }), (0,
                                a.jsx)("div", {
                                    className: "jsx-d4bd7a5bf3b07a9b space-y-3",
                                    children: [{
                                        label: "GPU Utilization",
                                        value: "67%",
                                        color: "#00f0ff"
                                    }, {
                                        label: "Memory",
                                        value: "12.4 GB",
                                        color: "#ff00aa"
                                    }, {
                                        label: "VRAM",
                                        value: "8.2 GB",
                                        color: "#00ff88"
                                    }].map((e,t)=>(0,
                                    a.jsxs)("div", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsxs)("div", {
                                            className: "jsx-d4bd7a5bf3b07a9b flex justify-between mb-1",
                                            children: [(0,
                                            a.jsx)("span", {
                                                style: {
                                                    color: "#9ca3af"
                                                },
                                                className: "jsx-d4bd7a5bf3b07a9b font-mono text-xs",
                                                children: e.label
                                            }), (0,
                                            a.jsx)("span", {
                                                style: {
                                                    color: e.color
                                                },
                                                className: "jsx-d4bd7a5bf3b07a9b font-mono text-xs",
                                                children: e.value
                                            })]
                                        }), (0,
                                        a.jsx)("div", {
                                            style: {
                                                background: "rgba(0, 240, 255, 0.1)"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b h-1.5 rounded-full",
                                            children: (0,
                                            a.jsx)("div", {
                                                style: {
                                                    width: "string" == typeof e.value && e.value.includes("%") ? e.value : "50%",
                                                    background: e.color
                                                },
                                                className: "jsx-d4bd7a5bf3b07a9b h-full rounded-full"
                                            })
                                        })]
                                    }, t))
                                })]
                            })]
                        })]
                    })]
                }), aW && (0,
                a.jsxs)("div", {
                    onClick: ()=>aQ(!1),
                    className: "jsx-d4bd7a5bf3b07a9b fixed inset-0 z-[9999] flex items-center justify-center p-4",
                    children: [(0,
                    a.jsx)("div", {
                        className: "jsx-d4bd7a5bf3b07a9b absolute inset-0 bg-black/80 backdrop-blur-sm"
                    }), (0,
                    a.jsxs)("div", {
                        style: {
                            background: "rgba(0, 10, 20, 0.98)",
                            border: "1px solid rgba(0, 240, 255, 0.3)"
                        },
                        onClick: e=>e.stopPropagation(),
                        className: "jsx-d4bd7a5bf3b07a9b relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl p-6",
                        children: [(0,
                        a.jsxs)("div", {
                            className: "jsx-d4bd7a5bf3b07a9b flex items-center justify-between mb-6",
                            children: [(0,
                            a.jsx)("h2", {
                                style: {
                                    color: "#00f0ff"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b text-2xl font-bold font-mono",
                                children: "📚 NEXUS OS Documentation"
                            }), (0,
                            a.jsx)("button", {
                                type: "button",
                                onClick: ()=>aQ(!1),
                                style: {
                                    color: "#9ca3af"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b p-2 rounded-lg hover:bg-cyan-500/10",
                                children: "✕"
                            })]
                        }), (0,
                        a.jsxs)("div", {
                            style: {
                                color: "#e5e7eb"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b space-y-6 font-mono text-sm",
                            children: [(0,
                            a.jsxs)("section", {
                                className: "jsx-d4bd7a5bf3b07a9b",
                                children: [(0,
                                a.jsx)("h3", {
                                    style: {
                                        color: "#00f0ff"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b text-lg font-bold mb-3",
                                    children: "🧭 Navigation"
                                }), (0,
                                a.jsx)("p", {
                                    className: "jsx-d4bd7a5bf3b07a9b mb-2",
                                    children: "Use the navigation bar at the top to switch between different sections. On mobile, tap the hamburger menu to see all options."
                                }), (0,
                                a.jsxs)("ul", {
                                    style: {
                                        color: "#9ca3af"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b list-disc list-inside space-y-1 ml-4",
                                    children: [(0,
                                    a.jsxs)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("strong", {
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "Dashboard"
                                        }), " - System overview and real-time stats"]
                                    }), (0,
                                    a.jsxs)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("strong", {
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "Image Creation"
                                        }), " - AI-powered image generation"]
                                    }), (0,
                                    a.jsxs)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("strong", {
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "IDE"
                                        }), " - Quantum code editor"]
                                    }), (0,
                                    a.jsxs)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("strong", {
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "CLI"
                                        }), " - Command line interface"]
                                    }), (0,
                                    a.jsxs)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("strong", {
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "Chat"
                                        }), " - Neural chat with AI assistant"]
                                    }), (0,
                                    a.jsxs)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("strong", {
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "Media Desk"
                                        }), " - Media player & radio streaming"]
                                    }), (0,
                                    a.jsxs)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("strong", {
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "Game Creation"
                                        }), " - Game development studio"]
                                    }), (0,
                                    a.jsxs)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("strong", {
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "AI"
                                        }), " - AI Lab for advanced queries"]
                                    }), (0,
                                    a.jsxs)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("strong", {
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "Copilot"
                                        }), " - AI coding assistant"]
                                    }), (0,
                                    a.jsxs)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("strong", {
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "Settings"
                                        }), " - Configuration panel"]
                                    })]
                                })]
                            }), (0,
                            a.jsxs)("section", {
                                style: {
                                    background: "rgba(0, 255, 136, 0.1)",
                                    border: "1px solid rgba(0, 255, 136, 0.3)"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b p-4 rounded-lg",
                                children: [(0,
                                a.jsx)("h3", {
                                    style: {
                                        color: "#00ff88"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b text-lg font-bold mb-3",
                                    children: "🤖 AI Engine"
                                }), (0,
                                a.jsx)("p", {
                                    className: "jsx-d4bd7a5bf3b07a9b mb-2",
                                    children: "NEXUS OS features a powerful AI engine with these capabilities:"
                                }), (0,
                                a.jsxs)("ul", {
                                    style: {
                                        color: "#9ca3af"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b list-disc list-inside space-y-1 ml-4",
                                    children: [(0,
                                    a.jsxs)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("strong", {
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "Image Generation"
                                        }), " - Create AI-generated images from text prompts"]
                                    }), (0,
                                    a.jsxs)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("strong", {
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "Neural Chat"
                                        }), " - Real-time AI conversation with context awareness"]
                                    }), (0,
                                    a.jsxs)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("strong", {
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "AI Lab"
                                        }), " - Advanced queries with multiple model selection"]
                                    })]
                                })]
                            }), (0,
                            a.jsxs)("section", {
                                className: "jsx-d4bd7a5bf3b07a9b",
                                children: [(0,
                                a.jsx)("h3", {
                                    style: {
                                        color: "#00f0ff"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b text-lg font-bold mb-3",
                                    children: "🎨 Image Creation"
                                }), (0,
                                a.jsxs)("ol", {
                                    style: {
                                        color: "#9ca3af"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b list-decimal list-inside space-y-1 ml-4",
                                    children: [(0,
                                    a.jsx)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: "Enter a descriptive prompt in the text area"
                                    }), (0,
                                    a.jsx)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: "Select a style: Photorealistic, Anime, 3D Render, etc."
                                    }), (0,
                                    a.jsx)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: "Choose image size from the dropdown"
                                    }), (0,
                                    a.jsx)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: "Click Generate Image and wait for the result"
                                    }), (0,
                                    a.jsx)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: "Use Download or Copy to save your image"
                                    })]
                                })]
                            }), (0,
                            a.jsxs)("section", {
                                className: "jsx-d4bd7a5bf3b07a9b",
                                children: [(0,
                                a.jsx)("h3", {
                                    style: {
                                        color: "#00f0ff"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b text-lg font-bold mb-3",
                                    children: "⌨️ Terminal Commands"
                                }), (0,
                                a.jsxs)("div", {
                                    style: {
                                        color: "#9ca3af"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b grid grid-cols-2 gap-2 ml-4",
                                    children: [(0,
                                    a.jsxs)("div", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("code", {
                                            style: {
                                                color: "#00f0ff"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "help"
                                        }), " - Show commands"]
                                    }), (0,
                                    a.jsxs)("div", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("code", {
                                            style: {
                                                color: "#00f0ff"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "status"
                                        }), " - System status"]
                                    }), (0,
                                    a.jsxs)("div", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("code", {
                                            style: {
                                                color: "#00f0ff"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "neofetch"
                                        }), " - System info"]
                                    }), (0,
                                    a.jsxs)("div", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("code", {
                                            style: {
                                                color: "#00f0ff"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "clear"
                                        }), " - Clear terminal"]
                                    }), (0,
                                    a.jsxs)("div", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("code", {
                                            style: {
                                                color: "#00f0ff"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "matrix"
                                        }), " - Enter the matrix"]
                                    }), (0,
                                    a.jsxs)("div", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("code", {
                                            style: {
                                                color: "#00f0ff"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "scan"
                                        }), " - Scan for threats"]
                                    }), (0,
                                    a.jsxs)("div", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("code", {
                                            style: {
                                                color: "#00f0ff"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "evolve"
                                        }), " - AI evolution"]
                                    }), (0,
                                    a.jsxs)("div", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: [(0,
                                        a.jsx)("code", {
                                            style: {
                                                color: "#00f0ff"
                                            },
                                            className: "jsx-d4bd7a5bf3b07a9b",
                                            children: "about"
                                        }), " - About NEXUS OS"]
                                    })]
                                })]
                            }), (0,
                            a.jsxs)("section", {
                                style: {
                                    borderColor: "rgba(0, 240, 255, 0.2)"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b pt-4 border-t",
                                children: [(0,
                                a.jsx)("h3", {
                                    style: {
                                        color: "#00ff88"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b text-lg font-bold mb-3",
                                    children: "💡 Pro Tips"
                                }), (0,
                                a.jsxs)("ul", {
                                    style: {
                                        color: "#9ca3af"
                                    },
                                    className: "jsx-d4bd7a5bf3b07a9b list-disc list-inside space-y-1 ml-4",
                                    children: [(0,
                                    a.jsx)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: "Click Initialize System on Dashboard to activate all features"
                                    }), (0,
                                    a.jsx)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: "Press Enter to quickly send chat messages"
                                    }), (0,
                                    a.jsx)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: "Use the ❓ button anytime to access this documentation"
                                    }), (0,
                                    a.jsx)("li", {
                                        className: "jsx-d4bd7a5bf3b07a9b",
                                        children: "Try different image styles - each has unique characteristics"
                                    })]
                                })]
                            })]
                        }), (0,
                        a.jsxs)("div", {
                            style: {
                                borderColor: "rgba(0, 240, 255, 0.2)"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b mt-6 pt-4 border-t flex justify-between items-center",
                            children: [(0,
                            a.jsx)("p", {
                                style: {
                                    color: "#6b7280"
                                },
                                className: "jsx-d4bd7a5bf3b07a9b font-mono text-xs",
                                children: "Powered by NEXUS AI • Neural Network Active"
                            }), (0,
                            a.jsx)(m, {
                                onClick: ()=>aQ(!1),
                                style: {
                                    background: "linear-gradient(135deg, #00f0ff, #00a0cc)",
                                    color: "#000"
                                },
                                children: "Close"
                            })]
                        })]
                    })]
                }), (0,
                a.jsx)("footer", {
                    style: {
                        borderColor: "rgba(0, 240, 255, 0.2)"
                    },
                    className: "jsx-d4bd7a5bf3b07a9b relative z-20 border-t mt-16 py-8",
                    children: (0,
                    a.jsxs)("div", {
                        className: "jsx-d4bd7a5bf3b07a9b container mx-auto px-4 text-center",
                        children: [(0,
                        a.jsxs)("p", {
                            style: {
                                color: "#6b7280"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b font-mono text-sm",
                            children: ["© 2024 NEXUS Corporation. ", y ? "All systems operational." : "System in standby mode."]
                        }), (0,
                        a.jsx)("p", {
                            style: {
                                color: "#4b5563"
                            },
                            className: "jsx-d4bd7a5bf3b07a9b font-mono text-xs mt-2",
                            children: '"The future is sentient."'
                        })]
                    })
                })]
            }), (0,
            a.jsx)(t.default, {
                id: "d4bd7a5bf3b07a9b",
                children: "@keyframes scan-line{0%{transform:translateY(-100vh)}to{transform:translateY(100vh)}}@keyframes glitch{0%,to{text-shadow:0 0 10px #00f0ff,0 0 20px #00f0ff;transform:translate(0)}25%{text-shadow:-3px 0 #f0a,3px 0 #00f0ff;transform:translate(-2px,1px)}50%{text-shadow:3px 0 #f0a,-3px 0 #00f0ff;transform:translate(2px,-1px)}75%{text-shadow:0 0 10px #00f0ff,0 0 20px #00f0ff;transform:translate(0)}}@keyframes slide-in{0%{opacity:0;transform:translate(100%)}to{opacity:1;transform:translate(0)}}@keyframes gradient-shift{0%,to{background-position:0%}50%{background-position:100%}}@keyframes shimmer{0%{transform:translate(-100%)}to{transform:translate(100%)}}.glitch-effect{animation:.15s ease-in-out glitch}.animate-shimmer{animation:1.5s infinite shimmer}.animate-slide-in{animation:.3s ease-out slide-in}.sr-only{clip:rect(0,0,0,0);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}::-webkit-scrollbar{width:6px;height:6px}::-webkit-scrollbar-track{background:#000a1480}::-webkit-scrollbar-thumb{background:linear-gradient(#00f0ff,#f0a);border-radius:3px}"
            })]
        })
    }
    e.s(["default", ()=>L], 52683)
}
