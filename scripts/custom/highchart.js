/*
 Highcharts JS v6.0.3 (2017-11-14)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (S, L) {
    "object" === typeof module && module.exports ? module.exports = S.document ? L(S) : L : S.Highcharts = L(S)
})("undefined" !== typeof window ? window : this, function (S) {
    var L = function () {
        var a = "undefined" === typeof S ? window : S,
            z = a.document,
            A = a.navigator && a.navigator.userAgent || "",
            D = z && z.createElementNS && !!z.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            q = /(edge|msie|trident)/i.test(A) && !a.opera,
            g = /Firefox/.test(A),
            e = g && 4 > parseInt(A.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highcharts",
            version: "6.0.3",
            deg2rad: 2 * Math.PI / 360,
            doc: z,
            hasBidiBug: e,
            hasTouch: z && void 0 !== z.documentElement.ontouchstart,
            isMS: q,
            isWebKit: /AppleWebKit/.test(A),
            isFirefox: g,
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(A),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: D,
            win: a,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function () {},
            charts: []
        }
    }();
    (function (a) {
        a.timers = [];
        var z = a.charts,
            A = a.doc,
            D = a.win;
        a.error = function (q,
            g) {
            q = a.isNumber(q) ? "Highcharts error #" + q + ": www.highcharts.com/errors/" + q : q;
            if (g) throw Error(q);
            D.console && console.log(q)
        };
        a.Fx = function (a, g, e) {
            this.options = g;
            this.elem = a;
            this.prop = e
        };
        a.Fx.prototype = {
            dSetter: function () {
                var a = this.paths[0],
                    g = this.paths[1],
                    e = [],
                    k = this.now,
                    t = a.length,
                    p;
                if (1 === k) e = this.toD;
                else if (t === g.length && 1 > k)
                    for (; t--;) p = parseFloat(a[t]), e[t] = isNaN(p) ? g[t] : k * parseFloat(g[t] - p) + p;
                else e = g;
                this.elem.attr("d", e, null, !0)
            },
            update: function () {
                var a = this.elem,
                    g = this.prop,
                    e = this.now,
                    k =
                    this.options.step;
                if (this[g + "Setter"]) this[g + "Setter"]();
                else a.attr ? a.element && a.attr(g, e, null, !0) : a.style[g] = e + this.unit;
                k && k.call(a, e, this)
            },
            run: function (q, g, e) {
                var k = this,
                    t = k.options,
                    p = function (a) {
                        return p.stopped ? !1 : k.step(a)
                    },
                    l = D.requestAnimationFrame || function (a) {
                        setTimeout(a, 13)
                    },
                    c = function () {
                        a.timers = a.grep(a.timers, function (a) {
                            return a()
                        });
                        a.timers.length && l(c)
                    };
                q === g ? (delete t.curAnim[this.prop], t.complete && 0 === a.keys(t.curAnim).length && t.complete()) : (this.startTime = +new Date, this.start =
                    q, this.end = g, this.unit = e, this.now = this.start, this.pos = 0, p.elem = this.elem, p.prop = this.prop, p() && 1 === a.timers.push(p) && l(c))
            },
            step: function (q) {
                var g = +new Date,
                    e, k = this.options,
                    t = this.elem,
                    p = k.complete,
                    l = k.duration,
                    c = k.curAnim;
                t.attr && !t.element ? q = !1 : q || g >= l + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), e = c[this.prop] = !0, a.objectEach(c, function (a) {
                    !0 !== a && (e = !1)
                }), e && p && p.call(t), q = !1) : (this.pos = k.easing((g - this.startTime) / l), this.now = this.start + (this.end - this.start) * this.pos, this.update(),
                    q = !0);
                return q
            },
            initPath: function (q, g, e) {
                function k(a) {
                    var b, h;
                    for (w = a.length; w--;) b = "M" === a[w] || "L" === a[w], h = /[a-zA-Z]/.test(a[w + 3]), b && h && a.splice(w + 1, 0, a[w + 1], a[w + 2], a[w + 1], a[w + 2])
                }

                function t(a, h) {
                    for (; a.length < b;) {
                        a[0] = h[b - a.length];
                        var c = a.slice(0, d);
                        [].splice.apply(a, [0, 0].concat(c));
                        m && (c = a.slice(a.length - d), [].splice.apply(a, [a.length, 0].concat(c)), w--)
                    }
                    a[0] = "M"
                }

                function p(a, c) {
                    for (var n = (b - a.length) / d; 0 < n && n--;) h = a.slice().splice(a.length / F - d, d * F), h[0] = c[b - d - n * d], y && (h[d - 6] = h[d - 2], h[d - 5] =
                        h[d - 1]), [].splice.apply(a, [a.length / F, 0].concat(h)), m && n--
                }
                g = g || "";
                var l, c = q.startX,
                    n = q.endX,
                    y = -1 < g.indexOf("C"),
                    d = y ? 7 : 3,
                    b, h, w;
                g = g.split(" ");
                e = e.slice();
                var m = q.isArea,
                    F = m ? 2 : 1,
                    J;
                y && (k(g), k(e));
                if (c && n) {
                    for (w = 0; w < c.length; w++)
                        if (c[w] === n[0]) {
                            l = w;
                            break
                        } else if (c[0] === n[n.length - c.length + w]) {
                        l = w;
                        J = !0;
                        break
                    }
                    void 0 === l && (g = [])
                }
                g.length && a.isNumber(l) && (b = e.length + l * F * d, J ? (t(g, e), p(e, g)) : (t(e, g), p(g, e)));
                return [g, e]
            }
        };
        a.Fx.prototype.fillSetter = a.Fx.prototype.strokeSetter = function () {
            this.elem.attr(this.prop,
                a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
        };
        a.extend = function (a, g) {
            var e;
            a || (a = {});
            for (e in g) a[e] = g[e];
            return a
        };
        a.merge = function () {
            var q, g = arguments,
                e, k = {},
                t = function (e, l) {
                    "object" !== typeof e && (e = {});
                    a.objectEach(l, function (c, n) {
                        !a.isObject(c, !0) || a.isClass(c) || a.isDOMElement(c) ? e[n] = l[n] : e[n] = t(e[n] || {}, c)
                    });
                    return e
                };
            !0 === g[0] && (k = g[1], g = Array.prototype.slice.call(g, 2));
            e = g.length;
            for (q = 0; q < e; q++) k = t(k, g[q]);
            return k
        };
        a.pInt = function (a, g) {
            return parseInt(a, g || 10)
        };
        a.isString =
            function (a) {
                return "string" === typeof a
            };
        a.isArray = function (a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function (q, g) {
            return !!q && "object" === typeof q && (!g || !a.isArray(q))
        };
        a.isDOMElement = function (q) {
            return a.isObject(q) && "number" === typeof q.nodeType
        };
        a.isClass = function (q) {
            var g = q && q.constructor;
            return !(!a.isObject(q, !0) || a.isDOMElement(q) || !g || !g.name || "Object" === g.name)
        };
        a.isNumber = function (a) {
            return "number" === typeof a && !isNaN(a)
        };
        a.erase =
            function (a, g) {
                for (var e = a.length; e--;)
                    if (a[e] === g) {
                        a.splice(e, 1);
                        break
                    }
            };
        a.defined = function (a) {
            return void 0 !== a && null !== a
        };
        a.attr = function (q, g, e) {
            var k;
            a.isString(g) ? a.defined(e) ? q.setAttribute(g, e) : q && q.getAttribute && (k = q.getAttribute(g)) : a.defined(g) && a.isObject(g) && a.objectEach(g, function (a, e) {
                q.setAttribute(e, a)
            });
            return k
        };
        a.splat = function (q) {
            return a.isArray(q) ? q : [q]
        };
        a.syncTimeout = function (a, g, e) {
            if (g) return setTimeout(a, g, e);
            a.call(0, e)
        };
        a.pick = function () {
            var a = arguments,
                g, e, k = a.length;
            for (g =
                0; g < k; g++)
                if (e = a[g], void 0 !== e && null !== e) return e
        };
        a.css = function (q, g) {
            a.isMS && !a.svg && g && void 0 !== g.opacity && (g.filter = "alpha(opacity\x3d" + 100 * g.opacity + ")");
            a.extend(q.style, g)
        };
        a.createElement = function (q, g, e, k, t) {
            q = A.createElement(q);
            var p = a.css;
            g && a.extend(q, g);
            t && p(q, {
                padding: 0,
                border: "none",
                margin: 0
            });
            e && p(q, e);
            k && k.appendChild(q);
            return q
        };
        a.extendClass = function (q, g) {
            var e = function () {};
            e.prototype = new q;
            a.extend(e.prototype, g);
            return e
        };
        a.pad = function (a, g, e) {
            return Array((g || 2) + 1 - String(a).length).join(e ||
                0) + a
        };
        a.relativeLength = function (a, g, e) {
            return /%$/.test(a) ? g * parseFloat(a) / 100 + (e || 0) : parseFloat(a)
        };
        a.wrap = function (a, g, e) {
            var k = a[g];
            a[g] = function () {
                var a = Array.prototype.slice.call(arguments),
                    g = arguments,
                    l = this;
                l.proceed = function () {
                    k.apply(l, arguments.length ? arguments : g)
                };
                a.unshift(k);
                a = e.apply(this, a);
                l.proceed = null;
                return a
            }
        };
        a.getTZOffset = function (q) {
            var g = a.Date;
            return 6E4 * (g.hcGetTimezoneOffset && g.hcGetTimezoneOffset(q) || g.hcTimezoneOffset || 0)
        };
        a.dateFormat = function (q, g, e) {
            if (!a.defined(g) ||
                isNaN(g)) return a.defaultOptions.lang.invalidDate || "";
            q = a.pick(q, "%Y-%m-%d %H:%M:%S");
            var k = a.Date,
                t = new k(g - a.getTZOffset(g)),
                p = t[k.hcGetHours](),
                l = t[k.hcGetDay](),
                c = t[k.hcGetDate](),
                n = t[k.hcGetMonth](),
                y = t[k.hcGetFullYear](),
                d = a.defaultOptions.lang,
                b = d.weekdays,
                h = d.shortWeekdays,
                w = a.pad,
                k = a.extend({
                    a: h ? h[l] : b[l].substr(0, 3),
                    A: b[l],
                    d: w(c),
                    e: w(c, 2, " "),
                    w: l,
                    b: d.shortMonths[n],
                    B: d.months[n],
                    m: w(n + 1),
                    y: y.toString().substr(2, 2),
                    Y: y,
                    H: w(p),
                    k: p,
                    I: w(p % 12 || 12),
                    l: p % 12 || 12,
                    M: w(t[k.hcGetMinutes]()),
                    p: 12 > p ? "AM" : "PM",
                    P: 12 > p ? "am" : "pm",
                    S: w(t.getSeconds()),
                    L: w(Math.round(g % 1E3), 3)
                }, a.dateFormats);
            a.objectEach(k, function (a, b) {
                for (; - 1 !== q.indexOf("%" + b);) q = q.replace("%" + b, "function" === typeof a ? a(g) : a)
            });
            return e ? q.substr(0, 1).toUpperCase() + q.substr(1) : q
        };
        a.formatSingle = function (q, g) {
            var e = /\.([0-9])/,
                k = a.defaultOptions.lang;
            /f$/.test(q) ? (e = (e = q.match(e)) ? e[1] : -1, null !== g && (g = a.numberFormat(g, e, k.decimalPoint, -1 < q.indexOf(",") ? k.thousandsSep : ""))) : g = a.dateFormat(q, g);
            return g
        };
        a.format = function (q, g) {
            for (var e =
                    "{", k = !1, t, p, l, c, n = [], y; q;) {
                e = q.indexOf(e);
                if (-1 === e) break;
                t = q.slice(0, e);
                if (k) {
                    t = t.split(":");
                    p = t.shift().split(".");
                    c = p.length;
                    y = g;
                    for (l = 0; l < c; l++) y && (y = y[p[l]]);
                    t.length && (y = a.formatSingle(t.join(":"), y));
                    n.push(y)
                } else n.push(t);
                q = q.slice(e + 1);
                e = (k = !k) ? "}" : "{"
            }
            n.push(q);
            return n.join("")
        };
        a.getMagnitude = function (a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function (q, g, e, k, t) {
            var p, l = q;
            e = a.pick(e, 1);
            p = q / e;
            g || (g = t ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === k && (1 === e ? g = a.grep(g, function (a) {
                return 0 === a % 1
            }) : .1 >= e && (g = [1 / e])));
            for (k = 0; k < g.length && !(l = g[k], t && l * e >= q || !t && p <= (g[k] + (g[k + 1] || g[k])) / 2); k++);
            return l = a.correctFloat(l * e, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort = function (a, g) {
            var e = a.length,
                k, t;
            for (t = 0; t < e; t++) a[t].safeI = t;
            a.sort(function (a, l) {
                k = g(a, l);
                return 0 === k ? a.safeI - l.safeI : k
            });
            for (t = 0; t < e; t++) delete a[t].safeI
        };
        a.arrayMin = function (a) {
            for (var g = a.length, e = a[0]; g--;) a[g] < e && (e = a[g]);
            return e
        };
        a.arrayMax = function (a) {
            for (var g =
                    a.length, e = a[0]; g--;) a[g] > e && (e = a[g]);
            return e
        };
        a.destroyObjectProperties = function (q, g) {
            a.objectEach(q, function (a, k) {
                a && a !== g && a.destroy && a.destroy();
                delete q[k]
            })
        };
        a.discardElement = function (q) {
            var g = a.garbageBin;
            g || (g = a.createElement("div"));
            q && g.appendChild(q);
            g.innerHTML = ""
        };
        a.correctFloat = function (a, g) {
            return parseFloat(a.toPrecision(g || 14))
        };
        a.setAnimation = function (q, g) {
            g.renderer.globalAnimation = a.pick(q, g.options.chart.animation, !0)
        };
        a.animObject = function (q) {
            return a.isObject(q) ? a.merge(q) : {
                duration: q ? 500 : 0
            }
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function (q, g, e, k) {
            q = +q || 0;
            g = +g;
            var t = a.defaultOptions.lang,
                p = (q.toString().split(".")[1] || "").split("e")[0].length,
                l, c, n = q.toString().split("e"); - 1 === g ? g = Math.min(p, 20) : a.isNumber(g) || (g = 2);
            c = (Math.abs(n[1] ? n[0] : q) + Math.pow(10, -Math.max(g, p) - 1)).toFixed(g);
            p = String(a.pInt(c));
            l = 3 < p.length ? p.length % 3 : 0;
            e = a.pick(e, t.decimalPoint);
            k = a.pick(k, t.thousandsSep);
            q = (0 > q ? "-" : "") + (l ? p.substr(0, l) + k : "");
            q += p.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + k);
            g && (q += e + c.slice(-g));
            n[1] && (q += "e" + n[1]);
            return q
        };
        Math.easeInOutSine = function (a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function (q, g, e) {
            if ("width" === g) return Math.min(q.offsetWidth, q.scrollWidth) - a.getStyle(q, "padding-left") - a.getStyle(q, "padding-right");
            if ("height" === g) return Math.min(q.offsetHeight, q.scrollHeight) - a.getStyle(q, "padding-top") - a.getStyle(q, "padding-bottom");
            D.getComputedStyle || a.error(27, !0);
            if (q = D.getComputedStyle(q, void 0)) q = q.getPropertyValue(g), a.pick(e, "opacity" !== g) && (q = a.pInt(q));
            return q
        };
        a.inArray = function (q, g) {
            return (a.indexOfPolyfill || Array.prototype.indexOf).call(g, q)
        };
        a.grep = function (q, g) {
            return (a.filterPolyfill || Array.prototype.filter).call(q, g)
        };
        a.find = Array.prototype.find ? function (a, g) {
            return a.find(g)
        } : function (a, g) {
            var e, k = a.length;
            for (e = 0; e < k; e++)
                if (g(a[e], e)) return a[e]
        };
        a.map = function (a, g) {
            for (var e = [], k = 0, t = a.length; k < t; k++) e[k] = g.call(a[k], a[k], k, a);
            return e
        };
        a.keys = function (q) {
            return (a.keysPolyfill || Object.keys).call(void 0, q)
        };
        a.reduce = function (q, g, e) {
            return (a.reducePolyfill || Array.prototype.reduce).call(q, g, e)
        };
        a.offset = function (a) {
            var g = A.documentElement;
            a = a.parentElement ? a.getBoundingClientRect() : {
                top: 0,
                left: 0
            };
            return {
                top: a.top + (D.pageYOffset || g.scrollTop) - (g.clientTop || 0),
                left: a.left + (D.pageXOffset || g.scrollLeft) - (g.clientLeft || 0)
            }
        };
        a.stop = function (q, g) {
            for (var e = a.timers.length; e--;) a.timers[e].elem !== q || g && g !== a.timers[e].prop || (a.timers[e].stopped = !0)
        };
        a.each = function (q, g, e) {
            return (a.forEachPolyfill || Array.prototype.forEach).call(q, g, e)
        };
        a.objectEach = function (a, g, e) {
            for (var k in a) a.hasOwnProperty(k) && g.call(e, a[k], k, a)
        };
        a.addEvent = function (q, g, e) {
            var k, t, p = q.addEventListener || a.addEventListenerPolyfill;
            q.hcEvents && !q.hasOwnProperty("hcEvents") && (t = {}, a.objectEach(q.hcEvents, function (a, c) {
                t[c] = a.slice(0)
            }), q.hcEvents = t);
            k = q.hcEvents = q.hcEvents || {};
            p && p.call(q, g, e, !1);
            k[g] || (k[g] = []);
            k[g].push(e);
            return function () {
                a.removeEvent(q, g, e)
            }
        };
        a.removeEvent =
            function (q, g, e) {
                function k(c, l) {
                    var d = q.removeEventListener || a.removeEventListenerPolyfill;
                    d && d.call(q, c, l, !1)
                }

                function t() {
                    var c, e;
                    q.nodeName && (g ? (c = {}, c[g] = !0) : c = l, a.objectEach(c, function (a, b) {
                        if (l[b])
                            for (e = l[b].length; e--;) k(b, l[b][e])
                    }))
                }
                var p, l = q.hcEvents,
                    c;
                l && (g ? (p = l[g] || [], e ? (c = a.inArray(e, p), -1 < c && (p.splice(c, 1), l[g] = p), k(g, e)) : (t(), l[g] = [])) : (t(), q.hcEvents = {}))
            };
        a.fireEvent = function (q, g, e, k) {
            var t;
            t = q.hcEvents;
            var p, l;
            e = e || {};
            if (A.createEvent && (q.dispatchEvent || q.fireEvent)) t = A.createEvent("Events"),
                t.initEvent(g, !0, !0), a.extend(t, e), q.dispatchEvent ? q.dispatchEvent(t) : q.fireEvent(g, t);
            else if (t)
                for (t = t[g] || [], p = t.length, e.target || a.extend(e, {
                        preventDefault: function () {
                            e.defaultPrevented = !0
                        },
                        target: q,
                        type: g
                    }), g = 0; g < p; g++)(l = t[g]) && !1 === l.call(q, e) && e.preventDefault();
            k && !e.defaultPrevented && k(e)
        };
        a.animate = function (q, g, e) {
            var k, t = "",
                p, l, c;
            a.isObject(e) || (c = arguments, e = {
                duration: c[2],
                easing: c[3],
                complete: c[4]
            });
            a.isNumber(e.duration) || (e.duration = 400);
            e.easing = "function" === typeof e.easing ? e.easing :
                Math[e.easing] || Math.easeInOutSine;
            e.curAnim = a.merge(g);
            a.objectEach(g, function (c, y) {
                a.stop(q, y);
                l = new a.Fx(q, e, y);
                p = null;
                "d" === y ? (l.paths = l.initPath(q, q.d, g.d), l.toD = g.d, k = 0, p = 1) : q.attr ? k = q.attr(y) : (k = parseFloat(a.getStyle(q, y)) || 0, "opacity" !== y && (t = "px"));
                p || (p = c);
                p && p.match && p.match("px") && (p = p.replace(/px/g, ""));
                l.run(k, p, t)
            })
        };
        a.seriesType = function (q, g, e, k, t) {
            var p = a.getOptions(),
                l = a.seriesTypes;
            p.plotOptions[q] = a.merge(p.plotOptions[g], e);
            l[q] = a.extendClass(l[g] || function () {}, k);
            l[q].prototype.type =
                q;
            t && (l[q].prototype.pointClass = a.extendClass(a.Point, t));
            return l[q]
        };
        a.uniqueKey = function () {
            var a = Math.random().toString(36).substring(2, 9),
                g = 0;
            return function () {
                return "highcharts-" + a + "-" + g++
            }
        }();
        D.jQuery && (D.jQuery.fn.highcharts = function () {
            var q = [].slice.call(arguments);
            if (this[0]) return q[0] ? (new(a[a.isString(q[0]) ? q.shift() : "Chart"])(this[0], q[0], q[1]), this) : z[a.attr(this[0], "data-highcharts-chart")]
        })
    })(L);
    (function (a) {
        var z = a.each,
            A = a.isNumber,
            D = a.map,
            q = a.merge,
            g = a.pInt;
        a.Color = function (e) {
            if (!(this instanceof a.Color)) return new a.Color(e);
            this.init(e)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function (a) {
                    return [g(a[1]), g(a[2]), g(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function (a) {
                    return [g(a[1]), g(a[2]), g(a[3]), 1]
                }
            }],
            names: {
                none: "rgba(255,255,255,0)",
                white: "#ffffff",
                black: "#000000"
            },
            init: function (e) {
                var k, g, p, l;
                if ((this.input = e = this.names[e &&
                        e.toLowerCase ? e.toLowerCase() : ""] || e) && e.stops) this.stops = D(e.stops, function (c) {
                    return new a.Color(c[1])
                });
                else if (e && e.charAt && "#" === e.charAt() && (k = e.length, e = parseInt(e.substr(1), 16), 7 === k ? g = [(e & 16711680) >> 16, (e & 65280) >> 8, e & 255, 1] : 4 === k && (g = [(e & 3840) >> 4 | (e & 3840) >> 8, (e & 240) >> 4 | e & 240, (e & 15) << 4 | e & 15, 1])), !g)
                    for (p = this.parsers.length; p-- && !g;) l = this.parsers[p], (k = l.regex.exec(e)) && (g = l.parse(k));
                this.rgba = g || []
            },
            get: function (a) {
                var e = this.input,
                    g = this.rgba,
                    p;
                this.stops ? (p = q(e), p.stops = [].concat(p.stops),
                    z(this.stops, function (l, c) {
                        p.stops[c] = [p.stops[c][0], l.get(a)]
                    })) : p = g && A(g[0]) ? "rgb" === a || !a && 1 === g[3] ? "rgb(" + g[0] + "," + g[1] + "," + g[2] + ")" : "a" === a ? g[3] : "rgba(" + g.join(",") + ")" : e;
                return p
            },
            brighten: function (a) {
                var e, t = this.rgba;
                if (this.stops) z(this.stops, function (e) {
                    e.brighten(a)
                });
                else if (A(a) && 0 !== a)
                    for (e = 0; 3 > e; e++) t[e] += g(255 * a), 0 > t[e] && (t[e] = 0), 255 < t[e] && (t[e] = 255);
                return this
            },
            setOpacity: function (a) {
                this.rgba[3] = a;
                return this
            },
            tweenTo: function (a, k) {
                var e = this.rgba,
                    g = a.rgba;
                g.length && e && e.length ?
                    (a = 1 !== g[3] || 1 !== e[3], k = (a ? "rgba(" : "rgb(") + Math.round(g[0] + (e[0] - g[0]) * (1 - k)) + "," + Math.round(g[1] + (e[1] - g[1]) * (1 - k)) + "," + Math.round(g[2] + (e[2] - g[2]) * (1 - k)) + (a ? "," + (g[3] + (e[3] - g[3]) * (1 - k)) : "") + ")") : k = a.input || "none";
                return k
            }
        };
        a.color = function (e) {
            return new a.Color(e)
        }
    })(L);
    (function (a) {
        var z, A, D = a.addEvent,
            q = a.animate,
            g = a.attr,
            e = a.charts,
            k = a.color,
            t = a.css,
            p = a.createElement,
            l = a.defined,
            c = a.deg2rad,
            n = a.destroyObjectProperties,
            y = a.doc,
            d = a.each,
            b = a.extend,
            h = a.erase,
            w = a.grep,
            m = a.hasTouch,
            F = a.inArray,
            J =
            a.isArray,
            C = a.isFirefox,
            H = a.isMS,
            u = a.isObject,
            G = a.isString,
            v = a.isWebKit,
            E = a.merge,
            x = a.noop,
            I = a.objectEach,
            f = a.pick,
            r = a.pInt,
            N = a.removeEvent,
            K = a.splat,
            B = a.stop,
            P = a.svg,
            R = a.SVG_NS,
            Q = a.symbolSizes,
            O = a.win;
        z = a.SVGElement = function () {
            return this
        };
        b(z.prototype, {
            opacity: 1,
            SVG_NS: R,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
            init: function (a, f) {
                this.element = "span" === f ? p(f) : y.createElementNS(this.SVG_NS, f);
                this.renderer = a
            },
            animate: function (b, r, h) {
                r = a.animObject(f(r, this.renderer.globalAnimation, !0));
                0 !== r.duration ? (h && (r.complete = h), q(this, b, r)) : (this.attr(b, null, h), r.step && r.step.call(this));
                return this
            },
            colorGradient: function (f, b, r) {
                var M = this.renderer,
                    h, B, m, c, x, v, w, n, T, K, e = [],
                    u;
                f.radialGradient ? B = "radialGradient" : f.linearGradient && (B = "linearGradient");
                B && (m = f[B], x = M.gradients, w = f.stops, K = r.radialReference, J(m) && (f[B] = m = {
                        x1: m[0],
                        y1: m[1],
                        x2: m[2],
                        y2: m[3],
                        gradientUnits: "userSpaceOnUse"
                    }), "radialGradient" ===
                    B && K && !l(m.gradientUnits) && (c = m, m = E(m, M.getRadialAttr(K, c), {
                        gradientUnits: "userSpaceOnUse"
                    })), I(m, function (a, f) {
                        "id" !== f && e.push(f, a)
                    }), I(w, function (a) {
                        e.push(a)
                    }), e = e.join(","), x[e] ? K = x[e].attr("id") : (m.id = K = a.uniqueKey(), x[e] = v = M.createElement(B).attr(m).add(M.defs), v.radAttr = c, v.stops = [], d(w, function (f) {
                        0 === f[1].indexOf("rgba") ? (h = a.color(f[1]), n = h.get("rgb"), T = h.get("a")) : (n = f[1], T = 1);
                        f = M.createElement("stop").attr({
                            offset: f[0],
                            "stop-color": n,
                            "stop-opacity": T
                        }).add(v);
                        v.stops.push(f)
                    })), u = "url(" +
                    M.url + "#" + K + ")", r.setAttribute(b, u), r.gradient = e, f.toString = function () {
                        return u
                    })
            },
            applyTextOutline: function (f) {
                var b = this.element,
                    r, M, B, m, c; - 1 !== f.indexOf("contrast") && (f = f.replace(/contrast/g, this.renderer.getContrast(b.style.fill)));
                f = f.split(" ");
                M = f[f.length - 1];
                if ((B = f[0]) && "none" !== B && a.svg) {
                    this.fakeTS = !0;
                    f = [].slice.call(b.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    B = B.replace(/(^[\d\.]+)(.*?)$/g, function (a, f, b) {
                        return 2 * f + b
                    });
                    for (c = f.length; c--;) r = f[c], "highcharts-text-outline" ===
                        r.getAttribute("class") && h(f, b.removeChild(r));
                    m = b.firstChild;
                    d(f, function (a, f) {
                        0 === f && (a.setAttribute("x", b.getAttribute("x")), f = b.getAttribute("y"), a.setAttribute("y", f || 0), null === f && b.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        g(a, {
                            "class": "highcharts-text-outline",
                            fill: M,
                            stroke: M,
                            "stroke-width": B,
                            "stroke-linejoin": "round"
                        });
                        b.insertBefore(a, m)
                    })
                }
            },
            attr: function (a, f, b, r) {
                var h, M = this.element,
                    d, m = this,
                    c, x;
                "string" === typeof a && void 0 !== f && (h = a, a = {}, a[h] = f);
                "string" === typeof a ? m = (this[a + "Getter"] || this._defaultGetter).call(this,
                    a, M) : (I(a, function (f, b) {
                    c = !1;
                    r || B(this, b);
                    this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(b) && (d || (this.symbolAttr(a), d = !0), c = !0);
                    !this.rotation || "x" !== b && "y" !== b || (this.doTransform = !0);
                    c || (x = this[b + "Setter"] || this._defaultSetter, x.call(this, f, b, M))
                }, this), this.afterSetters());
                b && b();
                return m
            },
            afterSetters: function () {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            },
            addClass: function (a, f) {
                var b = this.attr("class") || ""; - 1 === b.indexOf(a) && (f || (a = (b + (b ? " " :
                    "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function (a) {
                return -1 !== F(a, (this.attr("class") || "").split(" "))
            },
            removeClass: function (a) {
                return this.attr("class", (this.attr("class") || "").replace(a, ""))
            },
            symbolAttr: function (a) {
                var b = this;
                d("x y r start end width height innerR anchorX anchorY".split(" "), function (r) {
                    b[r] = f(a[r], b[r])
                });
                b.attr({
                    d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)
                })
            },
            clip: function (a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url +
                    "#" + a.id + ")" : "none")
            },
            crisp: function (a, f) {
                var b = this,
                    r = {},
                    h;
                f = f || a.strokeWidth || 0;
                h = Math.round(f) % 2 / 2;
                a.x = Math.floor(a.x || b.x || 0) + h;
                a.y = Math.floor(a.y || b.y || 0) + h;
                a.width = Math.floor((a.width || b.width || 0) - 2 * h);
                a.height = Math.floor((a.height || b.height || 0) - 2 * h);
                l(a.strokeWidth) && (a.strokeWidth = f);
                I(a, function (a, f) {
                    b[f] !== a && (b[f] = r[f] = a)
                });
                return r
            },
            css: function (a) {
                var f = this.styles,
                    h = {},
                    M = this.element,
                    d, B = "",
                    m, c = !f,
                    x = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                f && I(a, function (a,
                    b) {
                    a !== f[b] && (h[b] = a, c = !0)
                });
                c && (f && (a = b(f, h)), d = this.textWidth = a && a.width && "auto" !== a.width && "text" === M.nodeName.toLowerCase() && r(a.width), this.styles = a, d && !P && this.renderer.forExport && delete a.width, H && !P ? t(this.element, a) : (m = function (a, f) {
                    return "-" + f.toLowerCase()
                }, I(a, function (a, f) {
                    -1 === F(f, x) && (B += f.replace(/([A-Z])/g, m) + ":" + a + ";")
                }), B && g(M, "style", B)), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
                return this
            },
            getStyle: function (a) {
                return O.getComputedStyle(this.element || this, "").getPropertyValue(a)
            },
            strokeWidth: function () {
                var a = this.getStyle("stroke-width"),
                    f;
                a.indexOf("px") === a.length - 2 ? a = r(a) : (f = y.createElementNS(R, "rect"), g(f, {
                    width: a,
                    "stroke-width": 0
                }), this.element.parentNode.appendChild(f), a = f.getBBox().width, f.parentNode.removeChild(f));
                return a
            },
            on: function (a, f) {
                var b = this,
                    r = b.element;
                m && "click" === a ? (r.ontouchstart = function (a) {
                        b.touchEventFired = Date.now();
                        a.preventDefault();
                        f.call(r, a)
                    }, r.onclick =
                    function (a) {
                        (-1 === O.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (b.touchEventFired || 0)) && f.call(r, a)
                    }) : r["on" + a] = f;
                return this
            },
            setRadialReference: function (a) {
                var f = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                f && f.radAttr && f.animate(this.renderer.getRadialAttr(a, f.radAttr));
                return this
            },
            translate: function (a, f) {
                return this.attr({
                    translateX: a,
                    translateY: f
                })
            },
            invert: function (a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function () {
                var a =
                    this.translateX || 0,
                    b = this.translateY || 0,
                    r = this.scaleX,
                    h = this.scaleY,
                    d = this.inverted,
                    B = this.rotation,
                    m = this.matrix,
                    c = this.element;
                d && (a += this.width, b += this.height);
                a = ["translate(" + a + "," + b + ")"];
                l(m) && a.push("matrix(" + m.join(",") + ")");
                d ? a.push("rotate(90) scale(-1,1)") : B && a.push("rotate(" + B + " " + f(this.rotationOriginX, c.getAttribute("x"), 0) + " " + f(this.rotationOriginY, c.getAttribute("y") || 0) + ")");
                (l(r) || l(h)) && a.push("scale(" + f(r, 1) + " " + f(h, 1) + ")");
                a.length && c.setAttribute("transform", a.join(" "))
            },
            toFront: function () {
                var a =
                    this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function (a, b, r) {
                var d, B, M, m, c = {};
                B = this.renderer;
                M = B.alignedObjects;
                var x, v;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = b, !r || G(r)) this.alignTo = d = r || "renderer", h(M, this), M.push(this), r = null
                } else a = this.alignOptions, b = this.alignByTranslate, d = this.alignTo;
                r = f(r, B[d], B);
                d = a.align;
                B = a.verticalAlign;
                M = (r.x || 0) + (a.x || 0);
                m = (r.y || 0) + (a.y || 0);
                "right" === d ? x = 1 : "center" === d && (x = 2);
                x && (M += (r.width - (a.width || 0)) / x);
                c[b ? "translateX" : "x"] = Math.round(M);
                "bottom" === B ? v = 1 : "middle" === B && (v = 2);
                v && (m += (r.height - (a.height || 0)) / v);
                c[b ? "translateY" : "y"] = Math.round(m);
                this[this.placed ? "animate" : "attr"](c);
                this.placed = !0;
                this.alignAttr = c;
                return this
            },
            getBBox: function (a, r) {
                var h, B = this.renderer,
                    M, m = this.element,
                    x = this.styles,
                    v, w = this.textStr,
                    n, K = B.cache,
                    e = B.cacheKeys,
                    u;
                r = f(r, this.rotation);
                M = r * c;
                v = m && z.prototype.getStyle.call(m, "font-size");
                l(w) && (u = w.toString(), -1 === u.indexOf("\x3c") && (u = u.replace(/[0-9]/g, "0")), u += ["", r || 0, v, x && x.width, x && x.textOverflow].join());
                u && !a && (h = K[u]);
                if (!h) {
                    if (m.namespaceURI === this.SVG_NS || B.forExport) {
                        try {
                            (n = this.fakeTS && function (a) {
                                d(m.querySelectorAll(".highcharts-text-outline"), function (f) {
                                    f.style.display = a
                                })
                            }) && n("none"), h = m.getBBox ? b({}, m.getBBox()) : {
                                width: m.offsetWidth,
                                height: m.offsetHeight
                            }, n && n("")
                        } catch (V) {}
                        if (!h || 0 > h.width) h = {
                            width: 0,
                            height: 0
                        }
                    } else h = this.htmlGetBBox();
                    B.isSVG && (a = h.width, B = h.height, x && "11px" === x.fontSize && 17 === Math.round(B) && (h.height = B = 14), r && (h.width = Math.abs(B * Math.sin(M)) + Math.abs(a * Math.cos(M)),
                        h.height = Math.abs(B * Math.cos(M)) + Math.abs(a * Math.sin(M))));
                    if (u && 0 < h.height) {
                        for (; 250 < e.length;) delete K[e.shift()];
                        K[u] || e.push(u);
                        K[u] = h
                    }
                }
                return h
            },
            show: function (a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            },
            hide: function () {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function (a) {
                var f = this;
                f.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function () {
                        f.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function (a) {
                var f = this.renderer,
                    b = this.element,
                    r;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && f.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) r = this.zIndexSetter();
                r || (a ? a.element : f.box).appendChild(b);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function (a) {
                var f = a.parentNode;
                f && f.removeChild(a)
            },
            destroy: function () {
                var a = this,
                    f = a.element || {},
                    b = a.renderer.isSVG && "SPAN" === f.nodeName && a.parentGroup,
                    r = f.ownerSVGElement;
                f.onclick = f.onmouseout = f.onmouseover = f.onmousemove = f.point = null;
                B(a);
                a.clipPath && r && (d(r.querySelectorAll("[clip-path],[CLIP-PATH]"),
                    function (f) {
                        f.getAttribute("clip-path").match(RegExp('[("]#' + a.clipPath.element.id + '[)"]')) && f.removeAttribute("clip-path")
                    }), a.clipPath = a.clipPath.destroy());
                if (a.stops) {
                    for (r = 0; r < a.stops.length; r++) a.stops[r] = a.stops[r].destroy();
                    a.stops = null
                }
                for (a.safeRemoveChild(f); b && b.div && 0 === b.div.childNodes.length;) f = b.parentGroup, a.safeRemoveChild(b.div), delete b.div, b = f;
                a.alignTo && h(a.renderer.alignedObjects, a);
                I(a, function (f, b) {
                    delete a[b]
                });
                return null
            },
            xGetter: function (a) {
                "circle" === this.element.nodeName &&
                    ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function (a) {
                a = f(this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function (a, f, b) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[f] !== a && (b.setAttribute(f, a), this[f] = a)
            },
            alignSetter: function (a) {
                this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                }[a])
            },
            opacitySetter: function (a, f, b) {
                this[f] = a;
                b.setAttribute(f,
                    a)
            },
            titleSetter: function (a) {
                var b = this.element.getElementsByTagName("title")[0];
                b || (b = y.createElementNS(this.SVG_NS, "title"), this.element.appendChild(b));
                b.firstChild && b.removeChild(b.firstChild);
                b.appendChild(y.createTextNode(String(f(a), "").replace(/<[^>]*>/g, "")))
            },
            textSetter: function (a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function (a, f, b) {
                "string" === typeof a ? b.setAttribute(f, a) : a && this.colorGradient(a, f, b)
            },
            visibilitySetter: function (a,
                f, b) {
                "inherit" === a ? b.removeAttribute(f) : this[f] !== a && b.setAttribute(f, a);
                this[f] = a
            },
            zIndexSetter: function (a, f) {
                var b = this.renderer,
                    h = this.parentGroup,
                    d = (h || b).element || b.box,
                    B, m = this.element,
                    c, x, b = d === b.box;
                B = this.added;
                var v;
                l(a) && (m.zIndex = a, a = +a, this[f] === a && (B = !1), this[f] = a);
                if (B) {
                    (a = this.zIndex) && h && (h.handleZ = !0);
                    f = d.childNodes;
                    for (v = f.length - 1; 0 <= v && !c; v--)
                        if (h = f[v], B = h.zIndex, x = !l(B), h !== m)
                            if (0 > a && x && !b && !v) d.insertBefore(m, f[v]), c = !0;
                            else if (r(B) <= a || x && (!l(a) || 0 <= a)) d.insertBefore(m, f[v +
                        1] || null), c = !0;
                    c || (d.insertBefore(m, f[b ? 3 : 0] || null), c = !0)
                }
                return c
            },
            _defaultSetter: function (a, f, b) {
                b.setAttribute(f, a)
            }
        });
        z.prototype.yGetter = z.prototype.xGetter;
        z.prototype.translateXSetter = z.prototype.translateYSetter = z.prototype.rotationSetter = z.prototype.verticalAlignSetter = z.prototype.rotationOriginXSetter = z.prototype.rotationOriginYSetter = z.prototype.scaleXSetter = z.prototype.scaleYSetter = z.prototype.matrixSetter = function (a, f) {
            this[f] = a;
            this.doTransform = !0
        };
        A = a.SVGRenderer = function () {
            this.init.apply(this,
                arguments)
        };
        b(A.prototype, {
            Element: z,
            SVG_NS: R,
            init: function (a, f, b, r, h, d) {
                var B;
                r = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                });
                B = r.element;
                a.appendChild(B);
                g(a, "dir", "ltr"); - 1 === a.innerHTML.indexOf("xmlns") && g(B, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = B;
                this.boxWrapper = r;
                this.alignedObjects = [];
                this.url = (C || v) && y.getElementsByTagName("base").length ? O.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(y.createTextNode("Created with Highcharts 6.0.3"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = d;
                this.forExport = h;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(f, b, !1);
                var m;
                C && a.getBoundingClientRect && (f = function () {
                    t(a, {
                        left: 0,
                        top: 0
                    });
                    m = a.getBoundingClientRect();
                    t(a, {
                        left: Math.ceil(m.left) - m.left + "px",
                        top: Math.ceil(m.top) - m.top + "px"
                    })
                }, f(), this.unSubPixelFix = D(O, "resize", f))
            },
            definition: function (a) {
                function f(a, r) {
                    var h;
                    d(K(a), function (a) {
                        var d = b.createElement(a.tagName),
                            B = {};
                        I(a, function (a, f) {
                            "tagName" !==
                            f && "children" !== f && "textContent" !== f && (B[f] = a)
                        });
                        d.attr(B);
                        d.add(r || b.defs);
                        a.textContent && d.element.appendChild(y.createTextNode(a.textContent));
                        f(a.children || [], d);
                        h = d
                    });
                    return h
                }
                var b = this;
                return f(a)
            },
            isHidden: function () {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function () {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                n(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function (a) {
                var f =
                    new this.Element;
                f.init(this, a);
                return f
            },
            draw: x,
            getRadialAttr: function (a, f) {
                return {
                    cx: a[0] - a[2] / 2 + f.cx * a[2],
                    cy: a[1] - a[2] / 2 + f.cy * a[2],
                    r: f.r * a[2]
                }
            },
            getSpanWidth: function (a, f) {
                var b = a.getBBox(!0).width;
                !P && this.forExport && (b = this.measureSpanWidth(f.firstChild.data, a.styles));
                return b
            },
            applyEllipsis: function (a, f, b, r) {
                var h = a.rotation,
                    d = b,
                    B, m = 0,
                    c = b.length,
                    x = function (a) {
                        f.removeChild(f.firstChild);
                        a && f.appendChild(y.createTextNode(a))
                    },
                    v;
                a.rotation = 0;
                d = this.getSpanWidth(a, f);
                if (v = d > r) {
                    for (; m <= c;) B = Math.ceil((m +
                        c) / 2), d = b.substring(0, B) + "\u2026", x(d), d = this.getSpanWidth(a, f), m === c ? m = c + 1 : d > r ? c = B - 1 : m = B;
                    0 === c && x("")
                }
                a.rotation = h;
                return v
            },
            escapes: {
                "\x26": "\x26amp;",
                "\x3c": "\x26lt;",
                "\x3e": "\x26gt;",
                "'": "\x26#39;",
                '"': "\x26quot"
            },
            buildText: function (a) {
                var b = a.element,
                    h = this,
                    B = h.forExport,
                    m = f(a.textStr, "").toString(),
                    c = -1 !== m.indexOf("\x3c"),
                    x = b.childNodes,
                    v, n, l, K, u = g(b, "x"),
                    e = a.styles,
                    E = a.textWidth,
                    k = e && e.lineHeight,
                    N = e && e.textOutline,
                    M = e && "ellipsis" === e.textOverflow,
                    C = e && "nowrap" === e.whiteSpace,
                    H, F = x.length,
                    p = E && !a.added && this.box,
                    Q = function (a) {
                        return k ? r(k) : h.fontMetrics(void 0, a.getAttribute("style") ? a : b).h
                    },
                    q = function (a) {
                        I(h.escapes, function (f, b) {
                            a = a.replace(new RegExp(f, "g"), b)
                        });
                        return a
                    },
                    e = [m, M, C, k, N, e && e.fontSize, E].join();
                if (e !== a.textCache) {
                    for (a.textCache = e; F--;) b.removeChild(x[F]);
                    c || N || M || E || -1 !== m.indexOf(" ") ? (v = /<.*class="([^"]+)".*>/, n = /<.*style="([^"]+)".*>/, l = /<.*href="([^"]+)".*>/, p && p.appendChild(b), m = c ? m.replace(/<(b|strong)>/g, '\x3cspan class\x3d"highcharts-strong"\x3e').replace(/<(i|em)>/g,
                        '\x3cspan class\x3d"highcharts-emphasized"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [m], m = w(m, function (a) {
                        return "" !== a
                    }), d(m, function (f, r) {
                        var m, c = 0;
                        f = f.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                        m = f.split("|||");
                        d(m, function (f) {
                            if ("" !== f || 1 === m.length) {
                                var d = {},
                                    x = y.createElementNS(h.SVG_NS, "tspan"),
                                    w, e;
                                v.test(f) && (w = f.match(v)[1], g(x, "class", w));
                                n.test(f) && (e = f.match(n)[1].replace(/(;| |^)color([ :])/,
                                    "$1fill$2"), g(x, "style", e));
                                l.test(f) && !B && (g(x, "onclick", 'location.href\x3d"' + f.match(l)[1] + '"'), g(x, "class", "highcharts-anchor"));
                                f = q(f.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                if (" " !== f) {
                                    x.appendChild(y.createTextNode(f));
                                    c ? d.dx = 0 : r && null !== u && (d.x = u);
                                    g(x, d);
                                    b.appendChild(x);
                                    !c && H && (!P && B && t(x, {
                                        display: "block"
                                    }), g(x, "dy", Q(x)));
                                    if (E) {
                                        d = f.replace(/([^\^])-/g, "$1- ").split(" ");
                                        w = 1 < m.length || r || 1 < d.length && !C;
                                        var k = [],
                                            N, F = Q(x),
                                            p = a.rotation;
                                        for (M && (K = h.applyEllipsis(a, x, f, E)); !M && w && (d.length ||
                                                k.length);) a.rotation = 0, N = h.getSpanWidth(a, x), f = N > E, void 0 === K && (K = f), f && 1 !== d.length ? (x.removeChild(x.firstChild), k.unshift(d.pop())) : (d = k, k = [], d.length && !C && (x = y.createElementNS(R, "tspan"), g(x, {
                                            dy: F,
                                            x: u
                                        }), e && g(x, "style", e), b.appendChild(x)), N > E && (E = N)), d.length && x.appendChild(y.createTextNode(d.join(" ").replace(/- /g, "-")));
                                        a.rotation = p
                                    }
                                    c++
                                }
                            }
                        });
                        H = H || b.childNodes.length
                    }), K && a.attr("title", a.textStr), p && p.removeChild(b), N && a.applyTextOutline && a.applyTextOutline(N)) : b.appendChild(y.createTextNode(q(m)))
                }
            },
            getContrast: function (a) {
                a = k(a).rgba;
                return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            },
            button: function (a, f, b, r, h, d, B, m, x) {
                var c = this.label(a, f, b, x, null, null, null, null, "button"),
                    v = 0;
                c.attr(E({
                    padding: 8,
                    r: 2
                }, h));
                D(c.element, H ? "mouseover" : "mouseenter", function () {
                    3 !== v && c.setState(1)
                });
                D(c.element, H ? "mouseout" : "mouseleave", function () {
                    3 !== v && c.setState(v)
                });
                c.setState = function (a) {
                    1 !== a && (c.state = v = a);
                    c.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal",
"hover", "pressed", "disabled"][a || 0])
                };
                return c.on("click", function (a) {
                    3 !== v && r.call(c, a)
                })
            },
            crispLine: function (a, f) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - f % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + f % 2 / 2);
                return a
            },
            path: function (a) {
                var f = {};
                J(a) ? f.d = a : u(a) && b(f, a);
                return this.createElement("path").attr(f)
            },
            circle: function (a, f, b) {
                a = u(a) ? a : {
                    x: a,
                    y: f,
                    r: b
                };
                f = this.createElement("circle");
                f.xSetter = f.ySetter = function (a, f, b) {
                    b.setAttribute("c" + f, a)
                };
                return f.attr(a)
            },
            arc: function (a, f, b, r, h, d) {
                u(a) ?
                    (r = a, f = r.y, b = r.r, a = r.x) : r = {
                        innerR: r,
                        start: h,
                        end: d
                    };
                a = this.symbol("arc", a, f, b, b, r);
                a.r = b;
                return a
            },
            rect: function (a, f, b, r, h, d) {
                h = u(a) ? a.r : h;
                d = this.createElement("rect");
                a = u(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: f,
                    width: Math.max(b, 0),
                    height: Math.max(r, 0)
                };
                h && (a.r = h);
                d.rSetter = function (a, f, b) {
                    g(b, {
                        rx: a,
                        ry: a
                    })
                };
                return d.attr(a)
            },
            setSize: function (a, b, r) {
                var h = this.alignedObjects,
                    d = h.length;
                this.width = a;
                this.height = b;
                for (this.boxWrapper.animate({
                        width: a,
                        height: b
                    }, {
                        step: function () {
                            this.attr({
                                viewBox: "0 0 " + this.attr("width") +
                                    " " + this.attr("height")
                            })
                        },
                        duration: f(r, !0) ? void 0 : 0
                    }); d--;) h[d].align()
            },
            g: function (a) {
                var f = this.createElement("g");
                return a ? f.attr({
                    "class": "highcharts-" + a
                }) : f
            },
            image: function (a, f, r, h, d) {
                var B = {
                    preserveAspectRatio: "none"
                };
                1 < arguments.length && b(B, {
                    x: f,
                    y: r,
                    width: h,
                    height: d
                });
                B = this.createElement("image").attr(B);
                B.element.setAttributeNS ? B.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : B.element.setAttribute("hc-svg-href", a);
                return B
            },
            symbol: function (a, r, h, B, m, c) {
                var x = this,
                    v, w = /^url\((.*?)\)$/,
                    n = w.test(a),
                    K = !n && (this.symbols[a] ? a : "circle"),
                    u = K && this.symbols[K],
                    E = l(r) && u && u.call(this.symbols, Math.round(r), Math.round(h), B, m, c),
                    k, N;
                u ? (v = this.path(E), b(v, {
                    symbolName: K,
                    x: r,
                    y: h,
                    width: B,
                    height: m
                }), c && b(v, c)) : n && (k = a.match(w)[1], v = this.image(k), v.imgwidth = f(Q[k] && Q[k].width, c && c.width), v.imgheight = f(Q[k] && Q[k].height, c && c.height), N = function () {
                    v.attr({
                        width: v.width,
                        height: v.height
                    })
                }, d(["width", "height"], function (a) {
                    v[a + "Setter"] = function (a, f) {
                        var b = {},
                            r = this["img" + f],
                            h = "width" === f ? "translateX" :
                            "translateY";
                        this[f] = a;
                        l(r) && (this.element && this.element.setAttribute(f, r), this.alignByTranslate || (b[h] = ((this[f] || 0) - r) / 2, this.attr(b)))
                    }
                }), l(r) && v.attr({
                    x: r,
                    y: h
                }), v.isImg = !0, l(v.imgwidth) && l(v.imgheight) ? N() : (v.attr({
                    width: 0,
                    height: 0
                }), p("img", {
                    onload: function () {
                        var a = e[x.chartIndex];
                        0 === this.width && (t(this, {
                            position: "absolute",
                            top: "-999em"
                        }), y.body.appendChild(this));
                        Q[k] = {
                            width: this.width,
                            height: this.height
                        };
                        v.imgwidth = this.width;
                        v.imgheight = this.height;
                        v.element && N();
                        this.parentNode && this.parentNode.removeChild(this);
                        x.imgCount--;
                        if (!x.imgCount && a && a.onload) a.onload()
                    },
                    src: k
                }), this.imgCount++));
                return v
            },
            symbols: {
                circle: function (a, f, b, r) {
                    return this.arc(a + b / 2, f + r / 2, b / 2, r / 2, {
                        start: 0,
                        end: 2 * Math.PI,
                        open: !1
                    })
                },
                square: function (a, f, b, r) {
                    return ["M", a, f, "L", a + b, f, a + b, f + r, a, f + r, "Z"]
                },
                triangle: function (a, f, b, r) {
                    return ["M", a + b / 2, f, "L", a + b, f + r, a, f + r, "Z"]
                },
                "triangle-down": function (a, f, b, r) {
                    return ["M", a, f, "L", a + b, f, a + b / 2, f + r, "Z"]
                },
                diamond: function (a, f, b, r) {
                    return ["M", a + b / 2, f, "L", a + b, f + r / 2, a + b / 2, f + r, a, f + r / 2, "Z"]
                },
                arc: function (a,
                    b, r, h, d) {
                    var B = d.start,
                        m = d.r || r,
                        c = d.r || h || r,
                        x = d.end - .001;
                    r = d.innerR;
                    h = f(d.open, .001 > Math.abs(d.end - d.start - 2 * Math.PI));
                    var v = Math.cos(B),
                        w = Math.sin(B),
                        n = Math.cos(x),
                        x = Math.sin(x);
                    d = .001 > d.end - B - Math.PI ? 0 : 1;
                    m = ["M", a + m * v, b + c * w, "A", m, c, 0, d, 1, a + m * n, b + c * x];
                    l(r) && m.push(h ? "M" : "L", a + r * n, b + r * x, "A", r, r, 0, d, 0, a + r * v, b + r * w);
                    m.push(h ? "" : "Z");
                    return m
                },
                callout: function (a, f, b, r, h) {
                    var d = Math.min(h && h.r || 0, b, r),
                        B = d + 6,
                        m = h && h.anchorX;
                    h = h && h.anchorY;
                    var c;
                    c = ["M", a + d, f, "L", a + b - d, f, "C", a + b, f, a + b, f, a + b, f + d, "L", a + b, f + r -
d, "C", a + b, f + r, a + b, f + r, a + b - d, f + r, "L", a + d, f + r, "C", a, f + r, a, f + r, a, f + r - d, "L", a, f + d, "C", a, f, a, f, a + d, f];
                    m && m > b ? h > f + B && h < f + r - B ? c.splice(13, 3, "L", a + b, h - 6, a + b + 6, h, a + b, h + 6, a + b, f + r - d) : c.splice(13, 3, "L", a + b, r / 2, m, h, a + b, r / 2, a + b, f + r - d) : m && 0 > m ? h > f + B && h < f + r - B ? c.splice(33, 3, "L", a, h + 6, a - 6, h, a, h - 6, a, f + d) : c.splice(33, 3, "L", a, r / 2, m, h, a, r / 2, a, f + d) : h && h > r && m > a + B && m < a + b - B ? c.splice(23, 3, "L", m + 6, f + r, m, f + r + 6, m - 6, f + r, a + d, f + r) : h && 0 > h && m > a + B && m < a + b - B && c.splice(3, 3, "L", m - 6, f, m, f - 6, m + 6, f, b - d, f);
                    return c
                }
            },
            clipRect: function (f, b, r,
                h) {
                var d = a.uniqueKey(),
                    B = this.createElement("clipPath").attr({
                        id: d
                    }).add(this.defs);
                f = this.rect(f, b, r, h, 0).add(B);
                f.id = d;
                f.clipPath = B;
                f.count = 0;
                return f
            },
            text: function (a, f, b, r) {
                var h = {};
                if (r && (this.allowHTML || !this.forExport)) return this.html(a, f, b);
                h.x = Math.round(f || 0);
                b && (h.y = Math.round(b));
                if (a || 0 === a) h.text = a;
                a = this.createElement("text").attr(h);
                r || (a.xSetter = function (a, f, b) {
                    var r = b.getElementsByTagName("tspan"),
                        h, d = b.getAttribute(f),
                        B;
                    for (B = 0; B < r.length; B++) h = r[B], h.getAttribute(f) === d && h.setAttribute(f,
                        a);
                    b.setAttribute(f, a)
                });
                return a
            },
            fontMetrics: function (a, f) {
                a = f && z.prototype.getStyle.call(f, "font-size");
                a = /px/.test(a) ? r(a) : /em/.test(a) ? parseFloat(a) * (f ? this.fontMetrics(null, f.parentNode).f : 16) : 12;
                f = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: f,
                    b: Math.round(.8 * f),
                    f: a
                }
            },
            rotCorr: function (a, f, b) {
                var r = a;
                f && b && (r = Math.max(r * Math.cos(f * c), 4));
                return {
                    x: -a / 3 * Math.sin(f * c),
                    y: r
                }
            },
            label: function (f, r, h, B, m, c, x, v, w) {
                var n = this,
                    e = n.g("button" !== w && "label"),
                    K = e.text = n.text("", 0, 0, x).attr({
                        zIndex: 1
                    }),
                    u, k, P = 0,
                    g = 3,
                    C =
                    0,
                    y, F, H, p, t, R = {},
                    Q, q = /^url\((.*?)\)$/.test(B),
                    I = q,
                    G, J, M, O;
                w && e.addClass("highcharts-" + w);
                I = !0;
                G = function () {
                    return u.strokeWidth() % 2 / 2
                };
                J = function () {
                    var a = K.element.style,
                        f = {};
                    k = (void 0 === y || void 0 === F || t) && l(K.textStr) && K.getBBox();
                    e.width = (y || k.width || 0) + 2 * g + C;
                    e.height = (F || k.height || 0) + 2 * g;
                    Q = g + n.fontMetrics(a && a.fontSize, K).b;
                    I && (u || (e.box = u = n.symbols[B] || q ? n.symbol(B) : n.rect(), u.addClass(("button" === w ? "" : "highcharts-label-box") + (w ? " highcharts-" + w + "-box" : "")), u.add(e), a = G(), f.x = a, f.y = (v ? -Q : 0) + a),
                        f.width = Math.round(e.width), f.height = Math.round(e.height), u.attr(b(f, R)), R = {})
                };
                M = function () {
                    var a = C + g,
                        f;
                    f = v ? 0 : Q;
                    l(y) && k && ("center" === t || "right" === t) && (a += {
                        center: .5,
                        right: 1
                    }[t] * (y - k.width));
                    if (a !== K.x || f !== K.y) K.attr("x", a), void 0 !== f && K.attr("y", f);
                    K.x = a;
                    K.y = f
                };
                O = function (a, f) {
                    u ? u.attr(a, f) : R[a] = f
                };
                e.onAdd = function () {
                    K.add(e);
                    e.attr({
                        text: f || 0 === f ? f : "",
                        x: r,
                        y: h
                    });
                    u && l(m) && e.attr({
                        anchorX: m,
                        anchorY: c
                    })
                };
                e.widthSetter = function (f) {
                    y = a.isNumber(f) ? f : null
                };
                e.heightSetter = function (a) {
                    F = a
                };
                e["text-alignSetter"] =
                    function (a) {
                        t = a
                    };
                e.paddingSetter = function (a) {
                    l(a) && a !== g && (g = e.padding = a, M())
                };
                e.paddingLeftSetter = function (a) {
                    l(a) && a !== C && (C = a, M())
                };
                e.alignSetter = function (a) {
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[a];
                    a !== P && (P = a, k && e.attr({
                        x: H
                    }))
                };
                e.textSetter = function (a) {
                    void 0 !== a && K.textSetter(a);
                    J();
                    M()
                };
                e["stroke-widthSetter"] = function (a, f) {
                    a && (I = !0);
                    this["stroke-width"] = a;
                    O(f, a)
                };
                e.rSetter = function (a, f) {
                    O(f, a)
                };
                e.anchorXSetter = function (a, f) {
                    m = e.anchorX = a;
                    O(f, Math.round(a) - G() - H)
                };
                e.anchorYSetter = function (a, f) {
                    c = e.anchorY =
                        a;
                    O(f, a - p)
                };
                e.xSetter = function (a) {
                    e.x = a;
                    P && (a -= P * ((y || k.width) + 2 * g));
                    H = Math.round(a);
                    e.attr("translateX", H)
                };
                e.ySetter = function (a) {
                    p = e.y = Math.round(a);
                    e.attr("translateY", p)
                };
                var T = e.css;
                return b(e, {
                    css: function (a) {
                        if (a) {
                            var f = {};
                            a = E(a);
                            d(e.textProps, function (b) {
                                void 0 !== a[b] && (f[b] = a[b], delete a[b])
                            });
                            K.css(f)
                        }
                        return T.call(e, a)
                    },
                    getBBox: function () {
                        return {
                            width: k.width + 2 * g,
                            height: k.height + 2 * g,
                            x: k.x - g,
                            y: k.y - g
                        }
                    },
                    destroy: function () {
                        N(e.element, "mouseenter");
                        N(e.element, "mouseleave");
                        K && (K = K.destroy());
                        u && (u = u.destroy());
                        z.prototype.destroy.call(e);
                        e = n = J = M = O = null
                    }
                })
            }
        });
        a.Renderer = A
    })(L);
    (function (a) {
        var z = a.attr,
            A = a.createElement,
            D = a.css,
            q = a.defined,
            g = a.each,
            e = a.extend,
            k = a.isFirefox,
            t = a.isMS,
            p = a.isWebKit,
            l = a.pick,
            c = a.pInt,
            n = a.SVGRenderer,
            y = a.win,
            d = a.wrap;
        e(a.SVGElement.prototype, {
            htmlCss: function (a) {
                var b = this.element;
                if (b = a && "SPAN" === b.tagName && a.width) delete a.width, this.textWidth = b, this.updateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles =
                    e(this.styles, a);
                D(this.element, a);
                return this
            },
            htmlGetBBox: function () {
                var a = this.element;
                return {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            },
            htmlUpdateTransform: function () {
                if (this.added) {
                    var a = this.renderer,
                        h = this.element,
                        d = this.x || 0,
                        m = this.y || 0,
                        e = this.textAlign || "left",
                        n = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[e],
                        l = this.styles;
                    D(h, {
                        marginLeft: this.translateX || 0,
                        marginTop: this.translateY || 0
                    });
                    this.inverted && g(h.childNodes, function (b) {
                        a.invertChild(b, h)
                    });
                    if ("SPAN" === h.tagName) {
                        var k =
                            this.rotation,
                            u = c(this.textWidth),
                            y = l && l.whiteSpace,
                            v = [k, e, h.innerHTML, this.textWidth, this.textAlign].join();
                        v !== this.cTT && (l = a.fontMetrics(h.style.fontSize).b, q(k) && this.setSpanRotation(k, n, l), D(h, {
                            width: "",
                            whiteSpace: y || "nowrap"
                        }), h.offsetWidth > u && /[ \-]/.test(h.textContent || h.innerText) && D(h, {
                            width: u + "px",
                            display: "block",
                            whiteSpace: y || "normal"
                        }), this.getSpanCorrection(h.offsetWidth, l, n, k, e));
                        D(h, {
                            left: d + (this.xCorr || 0) + "px",
                            top: m + (this.yCorr || 0) + "px"
                        });
                        p && (l = h.offsetHeight);
                        this.cTT = v
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function (a, h, d) {
                var b = {},
                    c = this.renderer.getTransformKey();
                b[c] = b.transform = "rotate(" + a + "deg)";
                b[c + (k ? "Origin" : "-origin")] = b.transformOrigin = 100 * h + "% " + d + "px";
                D(this.element, b)
            },
            getSpanCorrection: function (a, h, d) {
                this.xCorr = -a * d;
                this.yCorr = -h
            }
        });
        e(n.prototype, {
            getTransformKey: function () {
                return t && !/Edge/.test(y.navigator.userAgent) ? "-ms-transform" : p ? "-webkit-transform" : k ? "MozTransform" : y.opera ? "-o-transform" : ""
            },
            html: function (a, h, c) {
                var b = this.createElement("span"),
                    n = b.element,
                    w = b.renderer,
                    k = w.isSVG,
                    y = function (a, b) {
                        g(["opacity", "visibility"], function (h) {
                            d(a, h + "Setter", function (a, h, d, f) {
                                a.call(this, h, d, f);
                                b[d] = h
                            })
                        })
                    };
                b.textSetter = function (a) {
                    a !== n.innerHTML && delete this.bBox;
                    this.textStr = a;
                    n.innerHTML = l(a, "");
                    b.htmlUpdateTransform()
                };
                k && y(b, b.element.style);
                b.xSetter = b.ySetter = b.alignSetter = b.rotationSetter = function (a, h) {
                    "align" === h && (h = "textAlign");
                    b[h] = a;
                    b.htmlUpdateTransform()
                };
                b.attr({
                    text: a,
                    x: Math.round(h),
                    y: Math.round(c)
                }).css({
                    position: "absolute"
                });
                n.style.whiteSpace =
                    "nowrap";
                b.css = b.htmlCss;
                k && (b.add = function (a) {
                    var h, d = w.box.parentNode,
                        c = [];
                    if (this.parentGroup = a) {
                        if (h = a.div, !h) {
                            for (; a;) c.push(a), a = a.parentGroup;
                            g(c.reverse(), function (a) {
                                function m(b, r) {
                                    a[r] = b;
                                    t ? f[w.getTransformKey()] = "translate(" + (a.x || a.translateX) + "px," + (a.y || a.translateY) + "px)" : "translateX" === r ? f.left = b + "px" : f.top = b + "px";
                                    a.doTransform = !0
                                }
                                var f, r = z(a.element, "class");
                                r && (r = {
                                    className: r
                                });
                                h = a.div = a.div || A("div", r, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, h || d);
                                f = h.style;
                                e(a, {
                                    classSetter: function (a) {
                                        this.element.setAttribute("class", a);
                                        h.className = a
                                    },
                                    on: function () {
                                        c[0].div && b.on.apply({
                                            element: c[0].div
                                        }, arguments);
                                        return a
                                    },
                                    translateXSetter: m,
                                    translateYSetter: m
                                });
                                y(a, f)
                            })
                        }
                    } else h = d;
                    h.appendChild(n);
                    b.added = !0;
                    b.alignOnAdd && b.htmlUpdateTransform();
                    return b
                });
                return b
            }
        })
    })(L);
    (function (a) {
        function z() {
            var k = a.defaultOptions.global,
                g = e.moment;
            if (k.timezone) {
                if (g) return function (a) {
                    return -g.tz(a,
                        k.timezone).utcOffset()
                };
                a.error(25)
            }
            return k.useUTC && k.getTimezoneOffset
        }

        function A() {
            var k = a.defaultOptions.global,
                t, p = k.useUTC,
                l = p ? "getUTC" : "get",
                c = p ? "setUTC" : "set",
                n = "Minutes Hours Day Date Month FullYear".split(" "),
                y = n.concat(["Milliseconds", "Seconds"]);
            a.Date = t = k.Date || e.Date;
            t.hcTimezoneOffset = p && k.timezoneOffset;
            t.hcGetTimezoneOffset = z();
            t.hcMakeTime = function (a, b, h, c, m, e) {
                var d;
                p ? (d = t.UTC.apply(0, arguments), d += D(d)) : d = (new t(a, b, g(h, 1), g(c, 0), g(m, 0), g(e, 0))).getTime();
                return d
            };
            for (k = 0; k <
                n.length; k++) t["hcGet" + n[k]] = l + n[k];
            for (k = 0; k < y.length; k++) t["hcSet" + y[k]] = c + y[k]
        }
        var D = a.getTZOffset,
            q = a.merge,
            g = a.pick,
            e = a.win;
        a.defaultOptions = {
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {
                useUTC: !0
            },
            chart: {
                borderRadius: 0,
                colorCount: 10,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 20
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {},
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {}
            },
            loading: {},
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                headerFormat: '\x3cspan class\x3d"highcharts-header"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cspan class\x3d"highcharts-strong"\x3e{point.y}\x3c/span\x3e\x3cbr/\x3e'
            },
            credits: {
                enabled: !0,
                href: "http://www.highcharts.com",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                text: "Highcharts.com"
            }
        };
        a.setOptions = function (e) {
            a.defaultOptions = q(!0, a.defaultOptions, e);
            A();
            return a.defaultOptions
        };
        a.getOptions = function () {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        A()
    })(L);
    (function (a) {
        var z = a.correctFloat,
            A = a.defined,
            D = a.destroyObjectProperties,
            q = a.isNumber,
            g = a.pick,
            e = a.deg2rad;
        a.Tick = function (a, e, g, l) {
            this.axis = a;
            this.pos = e;
            this.type = g || "";
            this.isNewLabel = this.isNew = !0;
            g || l || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function () {
                var a =
                    this.axis,
                    e = a.options,
                    p = a.chart,
                    l = a.categories,
                    c = a.names,
                    n = this.pos,
                    y = e.labels,
                    d = a.tickPositions,
                    b = n === d[0],
                    h = n === d[d.length - 1],
                    c = l ? g(l[n], c[n], n) : n,
                    l = this.label,
                    d = d.info,
                    w;
                a.isDatetimeAxis && d && (w = e.dateTimeLabelFormats[d.higherRanks[n] || d.unitName]);
                this.isFirst = b;
                this.isLast = h;
                e = a.labelFormatter.call({
                    axis: a,
                    chart: p,
                    isFirst: b,
                    isLast: h,
                    dateTimeLabelFormat: w,
                    value: a.isLog ? z(a.lin2log(c)) : c,
                    pos: n
                });
                A(l) ? l && l.attr({
                    text: e
                }) : (this.labelLength = (this.label = l = A(e) && y.enabled ? p.renderer.text(e, 0, 0, y.useHTML).add(a.labelGroup) :
                    null) && l.getBBox().width, this.rotation = 0)
            },
            getLabelSize: function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            },
            handleOverflow: function (a) {
                var k = this.axis,
                    p = a.x,
                    l = k.chart.chartWidth,
                    c = k.chart.spacing,
                    n = g(k.labelLeft, Math.min(k.pos, c[3])),
                    c = g(k.labelRight, Math.max(k.pos + k.len, l - c[1])),
                    y = this.label,
                    d = this.rotation,
                    b = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[k.labelAlign],
                    h = y.getBBox().width,
                    w = k.getSlotWidth(),
                    m = w,
                    F = 1,
                    q, C = {};
                if (d) 0 > d && p - b * h < n ? q = Math.round(p / Math.cos(d * e) - n) : 0 < d && p + b *
                    h > c && (q = Math.round((l - p) / Math.cos(d * e)));
                else if (l = p + (1 - b) * h, p - b * h < n ? m = a.x + m * (1 - b) - n : l > c && (m = c - a.x + m * b, F = -1), m = Math.min(w, m), m < w && "center" === k.labelAlign && (a.x += F * (w - m - b * (w - Math.min(h, m)))), h > m || k.autoRotation && (y.styles || {}).width) q = m;
                q && (C.width = q, (k.options.labels.style || {}).textOverflow || (C.textOverflow = "ellipsis"), y.css(C))
            },
            getPosition: function (a, e, g, l) {
                var c = this.axis,
                    n = c.chart,
                    k = l && n.oldChartHeight || n.chartHeight;
                return {
                    x: a ? c.translate(e + g, null, null, l) + c.transB : c.left + c.offset + (c.opposite ?
                        (l && n.oldChartWidth || n.chartWidth) - c.right - c.left : 0),
                    y: a ? k - c.bottom + c.offset - (c.opposite ? c.height : 0) : k - c.translate(e + g, null, null, l) - c.transB
                }
            },
            getLabelPosition: function (a, g, p, l, c, n, y, d) {
                var b = this.axis,
                    h = b.transA,
                    w = b.reversed,
                    m = b.staggerLines,
                    k = b.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    q = c.y;
                A(q) || (q = 0 === b.side ? p.rotation ? -8 : -p.getBBox().height : 2 === b.side ? k.y + 8 : Math.cos(p.rotation * e) * (k.y - p.getBBox(!1, 0).height / 2));
                a = a + c.x + k.x - (n && l ? n * h * (w ? -1 : 1) : 0);
                g = g + q - (n && !l ? n * h * (w ? 1 : -1) : 0);
                m && (p = y / (d || 1) % m, b.opposite && (p = m - p -
                    1), g += b.labelOffset / m * p);
                return {
                    x: a,
                    y: Math.round(g)
                }
            },
            getMarkPath: function (a, e, g, l, c, n) {
                return n.crispLine(["M", a, e, "L", a + (c ? 0 : -g), e + (c ? g : 0)], l)
            },
            renderGridLine: function (a, e, g) {
                var l = this.axis,
                    c = this.gridLine,
                    n = {},
                    k = this.pos,
                    d = this.type,
                    b = l.tickmarkOffset,
                    h = l.chart.renderer;
                c || (d || (n.zIndex = 1), a && (n.opacity = 0), this.gridLine = c = h.path().attr(n).addClass("highcharts-" + (d ? d + "-" : "") + "grid-line").add(l.gridGroup));
                if (!a && c && (a = l.getPlotLinePath(k + b, c.strokeWidth() * g, a, !0))) c[this.isNew ? "attr" : "animate"]({
                    d: a,
                    opacity: e
                })
            },
            renderMark: function (a, e, g) {
                var l = this.axis,
                    c = l.chart.renderer,
                    n = this.type,
                    k = l.tickSize(n ? n + "Tick" : "tick"),
                    d = this.mark,
                    b = !d,
                    h = a.x;
                a = a.y;
                k && (l.opposite && (k[0] = -k[0]), b && (this.mark = d = c.path().addClass("highcharts-" + (n ? n + "-" : "") + "tick").add(l.axisGroup)), d[b ? "attr" : "animate"]({
                    d: this.getMarkPath(h, a, k[0], d.strokeWidth() * g, l.horiz, c),
                    opacity: e
                }))
            },
            renderLabel: function (a, e, p, l) {
                var c = this.axis,
                    n = c.horiz,
                    k = c.options,
                    d = this.label,
                    b = k.labels,
                    h = b.step,
                    w = c.tickmarkOffset,
                    m = !0,
                    F = a.x;
                a = a.y;
                d && q(F) &&
                    (d.xy = a = this.getLabelPosition(F, a, d, n, b, w, l, h), this.isFirst && !this.isLast && !g(k.showFirstLabel, 1) || this.isLast && !this.isFirst && !g(k.showLastLabel, 1) ? m = !1 : !n || c.isRadial || b.step || b.rotation || e || 0 === p || this.handleOverflow(a), h && l % h && (m = !1), m && q(a.y) ? (a.opacity = p, d[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (d.attr("y", -9999), this.isNewLabel = !0))
            },
            render: function (a, e, p) {
                var l = this.axis,
                    c = l.horiz,
                    n = this.getPosition(c, this.pos, l.tickmarkOffset, e),
                    k = n.x,
                    d = n.y,
                    l = c && k === l.pos + l.len || !c && d ===
                    l.pos ? -1 : 1;
                p = g(p, 1);
                this.isActive = !0;
                this.renderGridLine(e, p, l);
                this.renderMark(n, p, l);
                this.renderLabel(n, e, p, a);
                this.isNew = !1
            },
            destroy: function () {
                D(this, this.axis)
            }
        }
    })(L);
    var U = function (a) {
        var z = a.addEvent,
            A = a.animObject,
            D = a.arrayMax,
            q = a.arrayMin,
            g = a.correctFloat,
            e = a.defaultOptions,
            k = a.defined,
            t = a.deg2rad,
            p = a.destroyObjectProperties,
            l = a.each,
            c = a.extend,
            n = a.fireEvent,
            y = a.format,
            d = a.getMagnitude,
            b = a.grep,
            h = a.inArray,
            w = a.isArray,
            m = a.isNumber,
            F = a.isString,
            J = a.merge,
            C = a.normalizeTickInterval,
            H = a.objectEach,
            u = a.pick,
            G = a.removeEvent,
            v = a.splat,
            E = a.syncTimeout,
            x = a.Tick,
            I = function () {
                this.init.apply(this, arguments)
            };
        a.extend(I.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    x: 0
                },
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {
                    align: "middle"
                },
                type: "linear"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    allowOverlap: !1,
                    enabled: !1,
                    formatter: function () {
                        return a.numberFormat(this.total, -1)
                    }
                }
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            init: function (a, b) {
                var f = b.isX,
                    r = this;
                r.chart = a;
                r.horiz = a.inverted && !r.isZAxis ? !f : f;
                r.isXAxis = f;
                r.coll = r.coll || (f ? "xAxis" : "yAxis");
                r.opposite = b.opposite;
                r.side = b.side || (r.horiz ? r.opposite ? 0 : 2 : r.opposite ? 1 : 3);
                r.setOptions(b);
                var d = this.options,
                    c = d.type;
                r.labelFormatter = d.labels.formatter || r.defaultLabelFormatter;
                r.userOptions = b;
                r.minPixelPadding = 0;
                r.reversed = d.reversed;
                r.visible = !1 !== d.visible;
                r.zoomEnabled = !1 !== d.zoomEnabled;
                r.hasNames = "category" === c || !0 === d.categories;
                r.categories = d.categories || r.hasNames;
                r.names = r.names || [];
                r.plotLinesAndBandsGroups = {};
                r.isLog = "logarithmic" === c;
                r.isDatetimeAxis = "datetime" === c;
                r.positiveValuesOnly = r.isLog && !r.allowNegativeLog;
                r.isLinked = k(d.linkedTo);
                r.ticks = {};
                r.labelEdge = [];
                r.minorTicks = {};
                r.plotLinesAndBands = [];
                r.alternateBands = {};
                r.len = 0;
                r.minRange = r.userMinRange = d.minRange || d.maxZoom;
                r.range = d.range;
                r.offset = d.offset || 0;
                r.stacks = {};
                r.oldStacks = {};
                r.stacksTouched = 0;
                r.max = null;
                r.min =
                    null;
                r.crosshair = u(d.crosshair, v(a.options.tooltip.crosshairs)[f ? 0 : 1], !1);
                b = r.options.events; - 1 === h(r, a.axes) && (f ? a.axes.splice(a.xAxis.length, 0, r) : a.axes.push(r), a[r.coll].push(r));
                r.series = r.series || [];
                a.inverted && !r.isZAxis && f && void 0 === r.reversed && (r.reversed = !0);
                H(b, function (a, f) {
                    z(r, f, a)
                });
                r.lin2log = d.linearToLogConverter || r.lin2log;
                r.isLog && (r.val2lin = r.log2lin, r.lin2val = r.lin2log)
            },
            setOptions: function (a) {
                this.options = J(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions,
this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], J(e[this.coll], a))
            },
            defaultLabelFormatter: function () {
                var f = this.axis,
                    b = this.value,
                    h = f.categories,
                    d = this.dateTimeLabelFormat,
                    B = e.lang,
                    c = B.numericSymbols,
                    B = B.numericSymbolMagnitude || 1E3,
                    m = c && c.length,
                    v, x = f.options.labels.format,
                    f = f.isLog ? Math.abs(b) : f.tickInterval;
                if (x) v = y(x, this);
                else if (h) v = b;
                else if (d) v = a.dateFormat(d, b);
                else if (m && 1E3 <= f)
                    for (; m-- && void 0 === v;) h = Math.pow(B, m + 1), f >= h && 0 === 10 * b % h && null !==
                        c[m] && 0 !== b && (v = a.numberFormat(b / h, -1) + c[m]);
                void 0 === v && (v = 1E4 <= Math.abs(b) ? a.numberFormat(b, -1) : a.numberFormat(b, -1, void 0, ""));
                return v
            },
            getSeriesExtremes: function () {
                var a = this,
                    r = a.chart;
                a.hasVisibleSeries = !1;
                a.dataMin = a.dataMax = a.threshold = null;
                a.softThreshold = !a.isXAxis;
                a.buildStacks && a.buildStacks();
                l(a.series, function (f) {
                    if (f.visible || !r.options.chart.ignoreHiddenSeries) {
                        var h = f.options,
                            d = h.threshold,
                            c;
                        a.hasVisibleSeries = !0;
                        a.positiveValuesOnly && 0 >= d && (d = null);
                        if (a.isXAxis) h = f.xData, h.length &&
                            (f = q(h), c = D(h), m(f) || f instanceof Date || (h = b(h, m), f = q(h)), a.dataMin = Math.min(u(a.dataMin, h[0], f), f), a.dataMax = Math.max(u(a.dataMax, h[0], c), c));
                        else if (f.getExtremes(), c = f.dataMax, f = f.dataMin, k(f) && k(c) && (a.dataMin = Math.min(u(a.dataMin, f), f), a.dataMax = Math.max(u(a.dataMax, c), c)), k(d) && (a.threshold = d), !h.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                    }
                })
            },
            translate: function (a, b, h, d, c, e) {
                var f = this.linkedParent || this,
                    r = 1,
                    B = 0,
                    v = d ? f.oldTransA : f.transA;
                d = d ? f.oldMin : f.min;
                var x = f.minPixelPadding;
                c = (f.isOrdinal || f.isBroken || f.isLog && c) && f.lin2val;
                v || (v = f.transA);
                h && (r *= -1, B = f.len);
                f.reversed && (r *= -1, B -= r * (f.sector || f.len));
                b ? (a = (a * r + B - x) / v + d, c && (a = f.lin2val(a))) : (c && (a = f.val2lin(a)), a = m(d) ? r * (a - d) * v + B + r * x + (m(e) ? v * e : 0) : void 0);
                return a
            },
            toPixels: function (a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function (a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function (a, b, h, d, c) {
                var f = this.chart,
                    r = this.left,
                    B = this.top,
                    v, e, x = h &&
                    f.oldChartHeight || f.chartHeight,
                    n = h && f.oldChartWidth || f.chartWidth,
                    w;
                v = this.transB;
                var l = function (a, f, b) {
                    if (a < f || a > b) d ? a = Math.min(Math.max(f, a), b) : w = !0;
                    return a
                };
                c = u(c, this.translate(a, null, null, h));
                a = h = Math.round(c + v);
                v = e = Math.round(x - c - v);
                m(c) ? this.horiz ? (v = B, e = x - this.bottom, a = h = l(a, r, r + this.width)) : (a = r, h = n - this.right, v = e = l(v, B, B + this.height)) : (w = !0, d = !1);
                return w && !d ? null : f.renderer.crispLine(["M", a, v, "L", h, e], b || 1)
            },
            getLinearTickPositions: function (a, b, h) {
                var f, r = g(Math.floor(b / a) * a);
                h = g(Math.ceil(h /
                    a) * a);
                var d = [],
                    c;
                g(r + a) === r && (c = 20);
                if (this.single) return [b];
                for (b = r; b <= h;) {
                    d.push(b);
                    b = g(b + a, c);
                    if (b === f) break;
                    f = b
                }
                return d
            },
            getMinorTickInterval: function () {
                var a = this.options;
                return !0 === a.minorTicks ? u(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
            },
            getMinorTickPositions: function () {
                var a = this,
                    b = a.options,
                    h = a.tickPositions,
                    d = a.minorTickInterval,
                    c = [],
                    m = a.pointRangePadding || 0,
                    v = a.min - m,
                    m = a.max + m,
                    e = m - v;
                if (e && e / d < a.len / 3)
                    if (a.isLog) l(this.paddedTicks, function (f, b, r) {
                        b && c.push.apply(c,
                            a.getLogTickPositions(d, r[b - 1], r[b], !0))
                    });
                    else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) c = c.concat(a.getTimeTicks(a.normalizeTimeTickInterval(d), v, m, b.startOfWeek));
                else
                    for (b = v + (h[0] - v) % d; b <= m && b !== c[0]; b += d) c.push(b);
                0 !== c.length && a.trimTicks(c);
                return c
            },
            adjustForMinRange: function () {
                var a = this.options,
                    b = this.min,
                    h = this.max,
                    d, c, m, v, e, x, n, w;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (k(a.min) || k(a.max) ? this.minRange = null : (l(this.series, function (a) {
                    x = a.xData;
                    for (v = n = a.xIncrement ?
                        1 : x.length - 1; 0 < v; v--)
                        if (e = x[v] - x[v - 1], void 0 === m || e < m) m = e
                }), this.minRange = Math.min(5 * m, this.dataMax - this.dataMin)));
                h - b < this.minRange && (c = this.dataMax - this.dataMin >= this.minRange, w = this.minRange, d = (w - h + b) / 2, d = [b - d, u(a.min, b - d)], c && (d[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = D(d), h = [b + w, u(a.max, b + w)], c && (h[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), h = q(h), h - b < w && (d[0] = h - w, d[1] = u(a.min, h - w), b = D(d)));
                this.min = b;
                this.max = h
            },
            getClosest: function () {
                var a;
                this.categories ? a = 1 : l(this.series,
                    function (f) {
                        var b = f.closestPointRange,
                            r = f.visible || !f.chart.options.chart.ignoreHiddenSeries;
                        !f.noSharedTooltip && k(b) && r && (a = k(a) ? Math.min(a, b) : b)
                    });
                return a
            },
            nameToX: function (a) {
                var f = w(this.categories),
                    b = f ? this.categories : this.names,
                    d = a.options.x,
                    c;
                a.series.requireSorting = !1;
                k(d) || (d = !1 === this.options.uniqueNames ? a.series.autoIncrement() : h(a.name, b)); - 1 === d ? f || (c = b.length) : c = d;
                void 0 !== c && (this.names[c] = a.name);
                return c
            },
            updateNames: function () {
                var a = this;
                0 < this.names.length && (this.names.length =
                    0, this.minRange = this.userMinRange, l(this.series || [], function (f) {
                        f.xIncrement = null;
                        if (!f.points || f.isDirtyData) f.processData(), f.generatePoints();
                        l(f.points, function (b, r) {
                            var h;
                            b.options && (h = a.nameToX(b), void 0 !== h && h !== b.x && (b.x = h, f.xData[r] = h))
                        })
                    }))
            },
            setAxisTranslation: function (a) {
                var f = this,
                    b = f.max - f.min,
                    h = f.axisPointRange || 0,
                    d, c = 0,
                    m = 0,
                    v = f.linkedParent,
                    e = !!f.categories,
                    x = f.transA,
                    n = f.isXAxis;
                if (n || e || h) d = f.getClosest(), v ? (c = v.minPointOffset, m = v.pointRangePadding) : l(f.series, function (a) {
                    var b = e ?
                        1 : n ? u(a.options.pointRange, d, 0) : f.axisPointRange || 0;
                    a = a.options.pointPlacement;
                    h = Math.max(h, b);
                    f.single || (c = Math.max(c, F(a) ? 0 : b / 2), m = Math.max(m, "on" === a ? 0 : b))
                }), v = f.ordinalSlope && d ? f.ordinalSlope / d : 1, f.minPointOffset = c *= v, f.pointRangePadding = m *= v, f.pointRange = Math.min(h, b), n && (f.closestPointRange = d);
                a && (f.oldTransA = x);
                f.translationSlope = f.transA = x = f.options.staticScale || f.len / (b + m || 1);
                f.transB = f.horiz ? f.left : f.bottom;
                f.minPixelPadding = x * c
            },
            minFromRange: function () {
                return this.max - this.range
            },
            setTickInterval: function (f) {
                var b =
                    this,
                    h = b.chart,
                    c = b.options,
                    v = b.isLog,
                    e = b.log2lin,
                    x = b.isDatetimeAxis,
                    w = b.isXAxis,
                    E = b.isLinked,
                    y = c.maxPadding,
                    H = c.minPadding,
                    F = c.tickInterval,
                    p = c.tickPixelInterval,
                    q = b.categories,
                    t = b.threshold,
                    I = b.softThreshold,
                    G, J, A, z;
                x || q || E || this.getTickAmount();
                A = u(b.userMin, c.min);
                z = u(b.userMax, c.max);
                E ? (b.linkedParent = h[b.coll][c.linkedTo], h = b.linkedParent.getExtremes(), b.min = u(h.min, h.dataMin), b.max = u(h.max, h.dataMax), c.type !== b.linkedParent.options.type && a.error(11, 1)) : (!I && k(t) && (b.dataMin >= t ? (G = t, H = 0) : b.dataMax <=
                    t && (J = t, y = 0)), b.min = u(A, G, b.dataMin), b.max = u(z, J, b.dataMax));
                v && (b.positiveValuesOnly && !f && 0 >= Math.min(b.min, u(b.dataMin, b.min)) && a.error(10, 1), b.min = g(e(b.min), 15), b.max = g(e(b.max), 15));
                b.range && k(b.max) && (b.userMin = b.min = A = Math.max(b.dataMin, b.minFromRange()), b.userMax = z = b.max, b.range = null);
                n(b, "foundExtremes");
                b.beforePadding && b.beforePadding();
                b.adjustForMinRange();
                !(q || b.axisPointRange || b.usePercentage || E) && k(b.min) && k(b.max) && (e = b.max - b.min) && (!k(A) && H && (b.min -= e * H), !k(z) && y && (b.max += e * y));
                m(c.softMin) && (b.min = Math.min(b.min, c.softMin));
                m(c.softMax) && (b.max = Math.max(b.max, c.softMax));
                m(c.floor) && (b.min = Math.max(b.min, c.floor));
                m(c.ceiling) && (b.max = Math.min(b.max, c.ceiling));
                I && k(b.dataMin) && (t = t || 0, !k(A) && b.min < t && b.dataMin >= t ? b.min = t : !k(z) && b.max > t && b.dataMax <= t && (b.max = t));
                b.tickInterval = b.min === b.max || void 0 === b.min || void 0 === b.max ? 1 : E && !F && p === b.linkedParent.options.tickPixelInterval ? F = b.linkedParent.tickInterval : u(F, this.tickAmount ? (b.max - b.min) / Math.max(this.tickAmount - 1, 1) : void 0,
                    q ? 1 : (b.max - b.min) * p / Math.max(b.len, p));
                w && !f && l(b.series, function (a) {
                    a.processData(b.min !== b.oldMin || b.max !== b.oldMax)
                });
                b.setAxisTranslation(!0);
                b.beforeSetTickPositions && b.beforeSetTickPositions();
                b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval));
                b.pointRange && !F && (b.tickInterval = Math.max(b.pointRange, b.tickInterval));
                f = u(c.minTickInterval, b.isDatetimeAxis && b.closestPointRange);
                !F && b.tickInterval < f && (b.tickInterval = f);
                x || v || F || (b.tickInterval = C(b.tickInterval,
                    null, d(b.tickInterval), u(c.allowDecimals, !(.5 < b.tickInterval && 5 > b.tickInterval && 1E3 < b.max && 9999 > b.max)), !!this.tickAmount));
                this.tickAmount || (b.tickInterval = b.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function () {
                var a = this.options,
                    b, h = a.tickPositions;
                b = this.getMinorTickInterval();
                var d = a.tickPositioner,
                    c = a.startOnTick,
                    m = a.endOnTick;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === b && this.tickInterval ? this.tickInterval /
                    5 : b;
                this.single = this.min === this.max && k(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
                this.tickPositions = b = h && h.slice();
                !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()], b[0] === b[1] && (b.length = 1)), this.tickPositions = b, d && (d = d.apply(this, [this.min, this.max]))) && (this.tickPositions = b = d);
                this.paddedTicks = b.slice(0);
                this.trimTicks(b, c, m);
                this.isLinked || (this.single && 2 > b.length && (this.min -= .5, this.max += .5), h || d || this.adjustTickAmount())
            },
            trimTicks: function (a, b, h) {
                var f = a[0],
                    d = a[a.length - 1],
                    c = this.minPointOffset || 0;
                if (!this.isLinked) {
                    if (b && -Infinity !== f) this.min = f;
                    else
                        for (; this.min - c > a[0];) a.shift();
                    if (h) this.max = d;
                    else
                        for (; this.max + c < a[a.length - 1];) a.pop();
                    0 === a.length && k(f) && a.push((d + f) / 2)
                }
            },
            alignToOthers: function () {
                var a = {},
                    b, h = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === h.alignTicks || this.isLog || l(this.chart[this.coll], function (f) {
                    var h = f.options,
                        h = [f.horiz ? h.left : h.top, h.width, h.height, h.pane].join();
                    f.series.length && (a[h] ? b = !0 : a[h] = 1)
                });
                return b
            },
            getTickAmount: function () {
                var a = this.options,
                    b = a.tickAmount,
                    h = a.tickPixelInterval;
                !k(a.tickInterval) && this.len < h && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() &&
                    (b = Math.ceil(this.len / h) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function () {
                var a = this.tickInterval,
                    b = this.tickPositions,
                    h = this.tickAmount,
                    d = this.finalTickAmt,
                    c = b && b.length;
                if (c < h) {
                    for (; b.length < h;) b.push(g(b[b.length - 1] + a));
                    this.transA *= (c - 1) / (h - 1);
                    this.max = b[b.length - 1]
                } else c > h && (this.tickInterval *= 2, this.setTickPositions());
                if (k(d)) {
                    for (a = h = b.length; a--;)(3 === d && 1 === a % 2 || 2 >= d && 0 < a && a < h - 1) && b.splice(a, 1);
                    this.finalTickAmt = void 0
                }
            },
            setScale: function () {
                var a, b;
                this.oldMin =
                    this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                l(this.series, function (b) {
                    if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0
                });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty =
                    b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
            },
            setExtremes: function (a, b, h, d, m) {
                var f = this,
                    r = f.chart;
                h = u(h, !0);
                l(f.series, function (a) {
                    delete a.kdTree
                });
                m = c(m, {
                    min: a,
                    max: b
                });
                n(f, "setExtremes", m, function () {
                    f.userMin = a;
                    f.userMax = b;
                    f.eventArgs = m;
                    h && r.redraw(d)
                })
            },
            zoom: function (a, b) {
                var f = this.dataMin,
                    h = this.dataMax,
                    d = this.options,
                    c = Math.min(f, u(d.min, f)),
                    d = Math.max(h, u(d.max, h));
                if (a !== this.min || b !== this.max) this.allowZoomOutside || (k(f) && (a < c && (a = c), a > d && (a = d)),
                    k(h) && (b < c && (b = c), b > d && (b = d))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, {
                    trigger: "zoom"
                });
                return !0
            },
            setAxisSize: function () {
                var b = this.chart,
                    h = this.options,
                    d = h.offsets || [0, 0, 0, 0],
                    c = this.horiz,
                    m = this.width = Math.round(a.relativeLength(u(h.width, b.plotWidth - d[3] + d[1]), b.plotWidth)),
                    v = this.height = Math.round(a.relativeLength(u(h.height, b.plotHeight - d[0] + d[2]), b.plotHeight)),
                    e = this.top = Math.round(a.relativeLength(u(h.top, b.plotTop + d[0]), b.plotHeight, b.plotTop)),
                    h = this.left = Math.round(a.relativeLength(u(h.left,
                        b.plotLeft + d[3]), b.plotWidth, b.plotLeft));
                this.bottom = b.chartHeight - v - e;
                this.right = b.chartWidth - m - h;
                this.len = Math.max(c ? m : v, 0);
                this.pos = c ? h : e
            },
            getExtremes: function () {
                var a = this.isLog,
                    b = this.lin2log;
                return {
                    min: a ? g(b(this.min)) : this.min,
                    max: a ? g(b(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function (a) {
                var b = this.isLog,
                    f = this.lin2log,
                    h = b ? f(this.min) : this.min,
                    b = b ? f(this.max) : this.max;
                null === a ? a = h : h > a ? a = h : b < a && (a = b);
                return this.translate(a,
                    0, 1, 0, 1)
            },
            autoLabelAlign: function (a) {
                a = (u(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function (a) {
                var b = this.options,
                    f = b[a + "Length"],
                    h = u(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (h && f) return "inside" === b[a + "Position"] && (f = -f), [f, h]
            },
            labelMetrics: function () {
                var a = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
            },
            unsquish: function () {
                var a =
                    this.options.labels,
                    b = this.horiz,
                    h = this.tickInterval,
                    d = h,
                    c = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / h),
                    m, v = a.rotation,
                    e = this.labelMetrics(),
                    x, n = Number.MAX_VALUE,
                    w, g = function (a) {
                        a /= c || 1;
                        a = 1 < a ? Math.ceil(a) : 1;
                        return a * h
                    };
                b ? (w = !a.staggerLines && !a.step && (k(v) ? [v] : c < u(a.autoRotationLimit, 80) && a.autoRotation)) && l(w, function (a) {
                    var b;
                    if (a === v || a && -90 <= a && 90 >= a) x = g(Math.abs(e.h / Math.sin(t * a))), b = x + Math.abs(a / 360), b < n && (n = b, m = a, d = x)
                }) : a.step || (d = g(e.h));
                this.autoRotation = w;
                this.labelRotation = u(m,
                    v);
                return d
            },
            getSlotWidth: function () {
                var a = this.chart,
                    b = this.horiz,
                    h = this.options.labels,
                    d = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    c = a.margin[3];
                return b && 2 > (h.step || 0) && !h.rotation && (this.staggerLines || 1) * this.len / d || !b && (h.style && parseInt(h.style.width, 10) || c && c - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function () {
                var a = this.chart,
                    b = a.renderer,
                    h = this.tickPositions,
                    d = this.ticks,
                    c = this.options.labels,
                    m = this.horiz,
                    v = this.getSlotWidth(),
                    e = Math.max(1, Math.round(v - 2 * (c.padding ||
                        5))),
                    x = {},
                    n = this.labelMetrics(),
                    w = c.style && c.style.textOverflow,
                    u, g = 0,
                    k, E;
                F(c.rotation) || (x.rotation = c.rotation || 0);
                l(h, function (a) {
                    (a = d[a]) && a.labelLength > g && (g = a.labelLength)
                });
                this.maxLabelLength = g;
                if (this.autoRotation) g > e && g > n.h ? x.rotation = this.labelRotation : this.labelRotation = 0;
                else if (v && (u = {
                        width: e + "px"
                    }, !w))
                    for (u.textOverflow = "clip", k = h.length; !m && k--;)
                        if (E = h[k], e = d[E].label) e.styles && "ellipsis" === e.styles.textOverflow ? e.css({
                                textOverflow: "clip"
                            }) : d[E].labelLength > v && e.css({
                                width: v + "px"
                            }),
                            e.getBBox().height > this.len / h.length - (n.h - n.f) && (e.specCss = {
                                textOverflow: "ellipsis"
                            });
                x.rotation && (u = {
                    width: (g > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px"
                }, w || (u.textOverflow = "ellipsis"));
                if (this.labelAlign = c.align || this.autoLabelAlign(this.labelRotation)) x.align = this.labelAlign;
                l(h, function (a) {
                    var b = (a = d[a]) && a.label;
                    b && (b.attr(x), u && b.css(J(u, b.specCss)), delete b.specCss, a.rotation = x.rotation)
                });
                this.tickRotCorr = b.rotCorr(n.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function () {
                return this.hasVisibleSeries ||
                    k(this.min) && k(this.max) && this.tickPositions && 0 < this.tickPositions.length
            },
            addTitle: function (a) {
                var b = this.chart.renderer,
                    f = this.horiz,
                    h = this.opposite,
                    d = this.options.title,
                    c;
                this.axisTitle || ((c = d.textAlign) || (c = (f ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: h ? "right" : "left",
                    middle: "center",
                    high: h ? "left" : "right"
                })[d.align]), this.axisTitle = b.text(d.text, 0, 0, d.useHTML).attr({
                    zIndex: 7,
                    rotation: d.rotation || 0,
                    align: c
                }).addClass("highcharts-axis-title").add(this.axisGroup), this.axisTitle.isNew = !0);
                this.axisTitle.css({
                    width: this.len
                });
                this.axisTitle[a ? "show" : "hide"](!0)
            },
            generateTick: function (a) {
                var b = this.ticks;
                b[a] ? b[a].addLabel() : b[a] = new x(this, a)
            },
            getOffset: function () {
                var a = this,
                    b = a.chart,
                    h = b.renderer,
                    d = a.options,
                    c = a.tickPositions,
                    m = a.ticks,
                    v = a.horiz,
                    e = a.side,
                    x = b.inverted && !a.isZAxis ? [1, 0, 3, 2][e] : e,
                    n, w, g = 0,
                    E, C = 0,
                    y = d.title,
                    F = d.labels,
                    p = 0,
                    q = b.axisOffset,
                    b = b.clipOffset,
                    t = [-1, 1, 1, -1][e],
                    I = d.className,
                    G = a.axisParent,
                    J = this.tickSize("tick");
                n = a.hasData();
                a.showAxis = w = n || u(d.showEmpty, !0);
                a.staggerLines = a.horiz && F.staggerLines;
                a.axisGroup ||
                    (a.gridGroup = h.g("grid").attr({
                        zIndex: d.gridZIndex || 1
                    }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (I || "")).add(G), a.axisGroup = h.g("axis").attr({
                        zIndex: d.zIndex || 2
                    }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (I || "")).add(G), a.labelGroup = h.g("axis-labels").attr({
                        zIndex: F.zIndex || 7
                    }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (I || "")).add(G));
                n || a.isLinked ? (l(c, function (b, f) {
                        a.generateTick(b, f)
                    }), a.renderUnsquish(), !1 === F.reserveSpace || 0 !== e && 2 !== e && {
                        1: "left",
                        3: "right"
                    }[e] !==
                    a.labelAlign && "center" !== a.labelAlign || l(c, function (a) {
                        p = Math.max(m[a].getLabelSize(), p)
                    }), a.staggerLines && (p *= a.staggerLines, a.labelOffset = p * (a.opposite ? -1 : 1))) : H(m, function (a, b) {
                    a.destroy();
                    delete m[b]
                });
                y && y.text && !1 !== y.enabled && (a.addTitle(w), w && !1 !== y.reserveSpace && (a.titleOffset = g = a.axisTitle.getBBox()[v ? "height" : "width"], E = y.offset, C = k(E) ? 0 : u(y.margin, v ? 5 : 10)));
                a.renderLine();
                a.offset = t * u(d.offset, q[e]);
                a.tickRotCorr = a.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                h = 0 === e ? -a.labelMetrics().h : 2 === e ? a.tickRotCorr.y :
                    0;
                C = Math.abs(p) + C;
                p && (C = C - h + t * (v ? u(F.y, a.tickRotCorr.y + 8 * t) : F.x));
                a.axisTitleMargin = u(E, C);
                q[e] = Math.max(q[e], a.axisTitleMargin + g + t * a.offset, C, n && c.length && J ? J[0] + t * a.offset : 0);
                d = d.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[x] = Math.max(b[x], d)
            },
            getLinePath: function (a) {
                var b = this.chart,
                    f = this.opposite,
                    h = this.offset,
                    d = this.horiz,
                    c = this.left + (f ? this.width : 0) + h,
                    h = b.chartHeight - this.bottom - (f ? this.height : 0) + h;
                f && (a *= -1);
                return b.renderer.crispLine(["M", d ? this.left : c, d ? h : this.top, "L", d ? b.chartWidth -
this.right : c, d ? h : b.chartHeight - this.bottom], a)
            },
            renderLine: function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup))
            },
            getTitlePosition: function () {
                var a = this.horiz,
                    b = this.left,
                    h = this.top,
                    d = this.len,
                    c = this.options.title,
                    m = a ? b : h,
                    e = this.opposite,
                    v = this.offset,
                    x = c.x || 0,
                    n = c.y || 0,
                    w = this.axisTitle,
                    l = this.chart.renderer.fontMetrics(c.style && c.style.fontSize, w),
                    w = Math.max(w.getBBox(null, 0).height - l.h - 1, 0),
                    d = {
                        low: m + (a ? 0 : d),
                        middle: m + d / 2,
                        high: m + (a ?
                            d : 0)
                    }[c.align],
                    b = (a ? h + this.height : b) + (a ? 1 : -1) * (e ? -1 : 1) * this.axisTitleMargin + [-w, w, l.f, -w][this.side];
                return {
                    x: a ? d + x : b + (e ? this.width : 0) + v + x,
                    y: a ? b + n - (e ? this.height : 0) + v : d + n
                }
            },
            renderMinorTick: function (a) {
                var b = this.chart.hasRendered && m(this.oldMin),
                    f = this.minorTicks;
                f[a] || (f[a] = new x(this, a, "minor"));
                b && f[a].isNew && f[a].render(null, !0);
                f[a].render(null, !1, 1)
            },
            renderTick: function (a, b) {
                var f = this.isLinked,
                    h = this.ticks,
                    d = this.chart.hasRendered && m(this.oldMin);
                if (!f || a >= this.min && a <= this.max) h[a] || (h[a] =
                    new x(this, a)), d && h[a].isNew && h[a].render(b, !0, .1), h[a].render(b)
            },
            render: function () {
                var b = this,
                    h = b.chart,
                    d = b.options,
                    c = b.isLog,
                    e = b.lin2log,
                    v = b.isLinked,
                    n = b.tickPositions,
                    w = b.axisTitle,
                    u = b.ticks,
                    g = b.minorTicks,
                    k = b.alternateBands,
                    C = d.stackLabels,
                    y = d.alternateGridColor,
                    F = b.tickmarkOffset,
                    p = b.axisLine,
                    q = b.showAxis,
                    t = A(h.renderer.globalAnimation),
                    I, G;
                b.labelEdge.length = 0;
                b.overlap = !1;
                l([u, g, k], function (a) {
                    H(a, function (a) {
                        a.isActive = !1
                    })
                });
                if (b.hasData() || v) b.minorTickInterval && !b.categories && l(b.getMinorTickPositions(),
                    function (a) {
                        b.renderMinorTick(a)
                    }), n.length && (l(n, function (a, h) {
                    b.renderTick(a, h)
                }), F && (0 === b.min || b.single) && (u[-1] || (u[-1] = new x(b, -1, null, !0)), u[-1].render(-1))), y && l(n, function (f, d) {
                    G = void 0 !== n[d + 1] ? n[d + 1] + F : b.max - F;
                    0 === d % 2 && f < b.max && G <= b.max + (h.polar ? -F : F) && (k[f] || (k[f] = new a.PlotLineOrBand(b)), I = f + F, k[f].options = {
                        from: c ? e(I) : I,
                        to: c ? e(G) : G,
                        color: y
                    }, k[f].render(), k[f].isActive = !0)
                }), b._addedPlotLB || (l((d.plotLines || []).concat(d.plotBands || []), function (a) {
                    b.addPlotBandOrLine(a)
                }), b._addedPlotLB = !0);
                l([u, g, k], function (a) {
                    var b, f = [],
                        d = t.duration;
                    H(a, function (a, b) {
                        a.isActive || (a.render(b, !1, 0), a.isActive = !1, f.push(b))
                    });
                    E(function () {
                        for (b = f.length; b--;) a[f[b]] && !a[f[b]].isActive && (a[f[b]].destroy(), delete a[f[b]])
                    }, a !== k && h.hasRendered && d ? d : 0)
                });
                p && (p[p.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(p.strokeWidth())
                }), p.isPlaced = !0, p[q ? "show" : "hide"](!0));
                w && q && (d = b.getTitlePosition(), m(d.y) ? (w[w.isNew ? "attr" : "animate"](d), w.isNew = !1) : (w.attr("y", -9999), w.isNew = !0));
                C && C.enabled && b.renderStackTotals();
                b.isDirty = !1
            },
            redraw: function () {
                this.visible && (this.render(), l(this.plotLinesAndBands, function (a) {
                    a.render()
                }));
                l(this.series, function (a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function (a) {
                var b = this,
                    f = b.stacks,
                    d = b.plotLinesAndBands,
                    c;
                a || G(b);
                H(f, function (a, b) {
                    p(a);
                    f[b] = null
                });
                l([b.ticks, b.minorTicks, b.alternateBands], function (a) {
                    p(a)
                });
                if (d)
                    for (a = d.length; a--;) d[a].destroy();
                l("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),
                    function (a) {
                        b[a] && (b[a] = b[a].destroy())
                    });
                for (c in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[c] = b.plotLinesAndBandsGroups[c].destroy();
                H(b, function (a, f) {
                    -1 === h(f, b.keepProps) && delete b[f]
                })
            },
            drawCrosshair: function (a, b) {
                var h, f = this.crosshair,
                    d = u(f.snap, !0),
                    c, m = this.cross;
                a || (a = this.cross && this.cross.e);
                this.crosshair && !1 !== (k(b) || !d) ? (d ? k(b) && (c = this.isXAxis ? b.plotX : this.len - b.plotY) : c = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), k(c) && (h = this.getPlotLinePath(b && (this.isXAxis ?
                    b.x : u(b.stackY, b.y)), null, null, null, c) || null), k(h) ? (b = this.categories && !this.isRadial, m || (this.cross = m = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (b ? "category " : "thin ") + f.className).attr({
                    zIndex: u(f.zIndex, 2)
                }).add()), m.show().attr({
                    d: h
                }), b && !f.width && m.attr({
                    "stroke-width": this.transA
                }), this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair()
            },
            hideCrosshair: function () {
                this.cross && this.cross.hide()
            }
        });
        return a.Axis = I
    }(L);
    (function (a) {
        var z = a.Axis,
            A = a.Date,
            D = a.dateFormat,
            q = a.defaultOptions,
            g = a.defined,
            e = a.each,
            k = a.extend,
            t = a.getMagnitude,
            p = a.getTZOffset,
            l = a.normalizeTickInterval,
            c = a.pick,
            n = a.timeUnits;
        z.prototype.getTimeTicks = function (a, d, b, h) {
            var w = [],
                m = {},
                l = q.global.useUTC,
                y, C = new A(d - Math.max(p(d), p(b))),
                H = A.hcMakeTime,
                u = a.unitRange,
                t = a.count,
                v, E;
            if (g(d)) {
                C[A.hcSetMilliseconds](u >= n.second ? 0 : t * Math.floor(C.getMilliseconds() / t));
                if (u >= n.second) C[A.hcSetSeconds](u >= n.minute ? 0 : t * Math.floor(C.getSeconds() / t));
                if (u >= n.minute) C[A.hcSetMinutes](u >= n.hour ?
                    0 : t * Math.floor(C[A.hcGetMinutes]() / t));
                if (u >= n.hour) C[A.hcSetHours](u >= n.day ? 0 : t * Math.floor(C[A.hcGetHours]() / t));
                if (u >= n.day) C[A.hcSetDate](u >= n.month ? 1 : t * Math.floor(C[A.hcGetDate]() / t));
                u >= n.month && (C[A.hcSetMonth](u >= n.year ? 0 : t * Math.floor(C[A.hcGetMonth]() / t)), y = C[A.hcGetFullYear]());
                if (u >= n.year) C[A.hcSetFullYear](y - y % t);
                if (u === n.week) C[A.hcSetDate](C[A.hcGetDate]() - C[A.hcGetDay]() + c(h, 1));
                y = C[A.hcGetFullYear]();
                h = C[A.hcGetMonth]();
                var x = C[A.hcGetDate](),
                    I = C[A.hcGetHours]();
                if (A.hcTimezoneOffset ||
                    A.hcGetTimezoneOffset) E = (!l || !!A.hcGetTimezoneOffset) && (b - d > 4 * n.month || p(d) !== p(b)), C = C.getTime(), v = p(C), C = new A(C + v);
                l = C.getTime();
                for (d = 1; l < b;) w.push(l), l = u === n.year ? H(y + d * t, 0) : u === n.month ? H(y, h + d * t) : !E || u !== n.day && u !== n.week ? E && u === n.hour ? H(y, h, x, I + d * t, 0, 0, v) - v : l + u * t : H(y, h, x + d * t * (u === n.day ? 1 : 7)), d++;
                w.push(l);
                u <= n.hour && 1E4 > w.length && e(w, function (a) {
                    0 === a % 18E5 && "000000000" === D("%H%M%S%L", a) && (m[a] = "day")
                })
            }
            w.info = k(a, {
                higherRanks: m,
                totalRange: u * t
            });
            return w
        };
        z.prototype.normalizeTimeTickInterval =
            function (a, d) {
                var b = d || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]];
                d = b[b.length - 1];
                var h = n[d[0]],
                    c = d[1],
                    m;
                for (m = 0; m < b.length && !(d = b[m], h = n[d[0]], c = d[1], b[m + 1] && a <= (h * c[c.length - 1] + n[b[m + 1][0]]) / 2); m++);
                h === n.year && a < 5 * h && (c = [1, 2, 5]);
                a = l(a / h, c, "year" === d[0] ? Math.max(t(a / h), 1) : 1);
                return {
                    unitRange: h,
                    count: a,
                    unitName: d[0]
                }
            }
    })(L);
    (function (a) {
        var z = a.Axis,
            A = a.getMagnitude,
            D = a.map,
            q = a.normalizeTickInterval,
            g = a.pick;
        z.prototype.getLogTickPositions = function (a, k, t, p) {
            var e = this.options,
                c = this.len,
                n = this.lin2log,
                y = this.log2lin,
                d = [];
            p || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), d = this.getLinearTickPositions(a, k, t);
            else if (.08 <= a)
                for (var c = Math.floor(k), b, h, w, m, F, e = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; c < t + 1 && !F; c++)
                    for (h = e.length, b = 0; b < h && !F; b++) w = y(n(c) * e[b]), w > k && (!p || m <= t) && void 0 !== m && d.push(m), m > t && (F = !0), m = w;
            else k = n(k), t =
                n(t), a = p ? this.getMinorTickInterval() : e.tickInterval, a = g("auto" === a ? null : a, this._minorAutoInterval, e.tickPixelInterval / (p ? 5 : 1) * (t - k) / ((p ? c / this.tickPositions.length : c) || 1)), a = q(a, null, A(a)), d = D(this.getLinearTickPositions(a, k, t), y), p || (this._minorAutoInterval = a / 5);
            p || (this.tickInterval = a);
            return d
        };
        z.prototype.log2lin = function (a) {
            return Math.log(a) / Math.LN10
        };
        z.prototype.lin2log = function (a) {
            return Math.pow(10, a)
        }
    })(L);
    (function (a, z) {
        var A = a.arrayMax,
            D = a.arrayMin,
            q = a.defined,
            g = a.destroyObjectProperties,
            e = a.each,
            k = a.erase,
            t = a.merge,
            p = a.pick;
        a.PlotLineOrBand = function (a, c) {
            this.axis = a;
            c && (this.options = c, this.id = c.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function () {
                var e = this,
                    c = e.axis,
                    n = c.horiz,
                    g = e.options,
                    d = g.label,
                    b = e.label,
                    h = g.to,
                    w = g.from,
                    m = g.value,
                    k = q(w) && q(h),
                    J = q(m),
                    C = e.svgElem,
                    H = !C,
                    u = [],
                    G = p(g.zIndex, 0),
                    v = g.events,
                    u = {
                        "class": "highcharts-plot-" + (k ? "band " : "line ") + (g.className || "")
                    },
                    E = {},
                    x = c.chart.renderer,
                    I = k ? "bands" : "lines",
                    f;
                f = c.log2lin;
                c.isLog && (w = f(w), h = f(h), m = f(m));
                E.zIndex = G;
                I += "-" + G;
                (f = c.plotLinesAndBandsGroups[I]) ||
                (c.plotLinesAndBandsGroups[I] = f = x.g("plot-" + I).attr(E).add());
                H && (e.svgElem = C = x.path().attr(u).add(f));
                if (J) u = c.getPlotLinePath(m, C.strokeWidth());
                else if (k) u = c.getPlotBandPath(w, h, g);
                else return;
                H && u && u.length ? (C.attr({
                    d: u
                }), v && a.objectEach(v, function (a, b) {
                    C.on(b, function (a) {
                        v[b].apply(e, [a])
                    })
                })) : C && (u ? (C.show(), C.animate({
                    d: u
                })) : (C.hide(), b && (e.label = b = b.destroy())));
                d && q(d.text) && u && u.length && 0 < c.width && 0 < c.height && !u.flat ? (d = t({
                    align: n && k && "center",
                    x: n ? !k && 4 : 10,
                    verticalAlign: !n && k && "middle",
                    y: n ? k ? 16 : 10 : k ? 6 : -4,
                    rotation: n && !k && 90
                }, d), this.renderLabel(d, u, k, G)) : b && b.hide();
                return e
            },
            renderLabel: function (a, c, e, g) {
                var d = this.label,
                    b = this.axis.chart.renderer;
                d || (d = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (e ? "band" : "line") + "-label " + (a.className || "")
                }, d.zIndex = g, this.label = d = b.text(a.text, 0, 0, a.useHTML).attr(d).add());
                g = c.xBounds || [c[1], c[4], e ? c[6] : c[1]];
                c = c.yBounds || [c[2], c[5], e ? c[7] : c[2]];
                e = D(g);
                b = D(c);
                d.align(a, !1, {
                    x: e,
                    y: b,
                    width: A(g) - e,
                    height: A(c) - b
                });
                d.show()
            },
            destroy: function () {
                k(this.axis.plotLinesAndBands, this);
                delete this.axis;
                g(this)
            }
        };
        a.extend(z.prototype, {
            getPlotBandPath: function (a, c) {
                var e = this.getPlotLinePath(c, null, null, !0),
                    g = this.getPlotLinePath(a, null, null, !0),
                    d = [],
                    b = this.horiz,
                    h = 1,
                    w;
                a = a < this.min && c < this.min || a > this.max && c > this.max;
                if (g && e)
                    for (a && (w = g.toString() === e.toString(), h = 0), a = 0; a < g.length; a += 6) b && e[a + 1] === g[a + 1] ? (e[a + 1] += h, e[a + 4] += h) : b || e[a + 2] !== g[a + 2] || (e[a + 2] += h, e[a + 5] += h), d.push("M", g[a + 1], g[a + 2], "L", g[a + 4], g[a + 5], e[a + 4], e[a + 5], e[a +
                        1], e[a + 2], "z"), d.flat = w;
                return d
            },
            addPlotBand: function (a) {
                return this.addPlotBandOrLine(a, "plotBands")
            },
            addPlotLine: function (a) {
                return this.addPlotBandOrLine(a, "plotLines")
            },
            addPlotBandOrLine: function (e, c) {
                var n = (new a.PlotLineOrBand(this, e)).render(),
                    g = this.userOptions;
                n && (c && (g[c] = g[c] || [], g[c].push(e)), this.plotLinesAndBands.push(n));
                return n
            },
            removePlotBandOrLine: function (a) {
                for (var c = this.plotLinesAndBands, n = this.options, g = this.userOptions, d = c.length; d--;) c[d].id === a && c[d].destroy();
                e([n.plotLines ||
[], g.plotLines || [], n.plotBands || [], g.plotBands || []], function (b) {
                    for (d = b.length; d--;) b[d].id === a && k(b, b[d])
                })
            },
            removePlotBand: function (a) {
                this.removePlotBandOrLine(a)
            },
            removePlotLine: function (a) {
                this.removePlotBandOrLine(a)
            }
        })
    })(L, U);
    (function (a) {
        var z = a.dateFormat,
            A = a.each,
            D = a.extend,
            q = a.format,
            g = a.isNumber,
            e = a.map,
            k = a.merge,
            t = a.pick,
            p = a.splat,
            l = a.syncTimeout,
            c = a.timeUnits;
        a.Tooltip = function () {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function (a, c) {
                this.chart = a;
                this.options = c;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = c.split && !a.inverted;
                this.shared = c.shared || this.split
            },
            cleanSplit: function (a) {
                A(this.chart.series, function (c) {
                    var d = c && c.tt;
                    d && (!d.isActive || a ? c.tt = d.destroy() : d.isActive = !1)
                })
            },
            applyFilter: function () {
                var a = this.chart;
                a.renderer.definition({
                    tagName: "filter",
                    id: "drop-shadow-" + a.index,
                    opacity: .5,
                    children: [{
                        tagName: "feGaussianBlur",
                        in : "SourceAlpha",
                        stdDeviation: 1
                    }, {
                        tagName: "feOffset",
                        dx: 1,
                        dy: 1
                    }, {
                        tagName: "feComponentTransfer",
                        children: [{
                            tagName: "feFuncA",
                            type: "linear",
                            slope: .3
                        }]
                    }, {
                        tagName: "feMerge",
                        children: [{
                            tagName: "feMergeNode"
                        }, {
                            tagName: "feMergeNode",
                            in : "SourceGraphic"
                        }]
                    }]
                });
                a.renderer.definition({
                    tagName: "style",
                    textContent: ".highcharts-tooltip-" + a.index + "{filter:url(#drop-shadow-" + a.index + ")}"
                })
            },
            getLabel: function () {
                var a = this.chart.renderer,
                    c = this.options;
                this.label || (this.label = this.split ? a.g("tooltip") : a.label("", 0, 0, c.shape || "callout", null, null, c.useHTML, null, "tooltip").attr({
                    padding: c.padding,
                    r: c.borderRadius
                }), this.applyFilter(), this.label.addClass("highcharts-tooltip-" +
                    this.chart.index), this.label.attr({
                    zIndex: 8
                }).add());
                return this.label
            },
            update: function (a) {
                this.destroy();
                k(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, k(!0, this.options, a))
            },
            destroy: function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                clearTimeout(this.hideTimer);
                clearTimeout(this.tooltipTimeout)
            },
            move: function (a, c, d, b) {
                var h = this,
                    e = h.now,
                    m = !1 !== h.options.animation && !h.isHidden && (1 < Math.abs(a -
                        e.x) || 1 < Math.abs(c - e.y)),
                    n = h.followPointer || 1 < h.len;
                D(e, {
                    x: m ? (2 * e.x + a) / 3 : a,
                    y: m ? (e.y + c) / 2 : c,
                    anchorX: n ? void 0 : m ? (2 * e.anchorX + d) / 3 : d,
                    anchorY: n ? void 0 : m ? (e.anchorY + b) / 2 : b
                });
                h.getLabel().attr(e);
                m && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                    h && h.move(a, c, d, b)
                }, 32))
            },
            hide: function (a) {
                var c = this;
                clearTimeout(this.hideTimer);
                a = t(a, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = l(function () {
                    c.getLabel()[a ? "fadeOut" : "hide"]();
                    c.isHidden = !0
                }, a))
            },
            getAnchor: function (a,
                c) {
                var d, b = this.chart,
                    h = b.inverted,
                    w = b.plotTop,
                    m = b.plotLeft,
                    g = 0,
                    n = 0,
                    k, l;
                a = p(a);
                d = a[0].tooltipPos;
                this.followPointer && c && (void 0 === c.chartX && (c = b.pointer.normalize(c)), d = [c.chartX - b.plotLeft, c.chartY - w]);
                d || (A(a, function (a) {
                    k = a.series.yAxis;
                    l = a.series.xAxis;
                    g += a.plotX + (!h && l ? l.left - m : 0);
                    n += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!h && k ? k.top - w : 0)
                }), g /= a.length, n /= a.length, d = [h ? b.plotWidth - n : g, this.shared && !h && 1 < a.length && c ? c.chartY - w : h ? b.plotHeight - g : n]);
                return e(d, Math.round)
            },
            getPosition: function (a,
                c, d) {
                var b = this.chart,
                    h = this.distance,
                    e = {},
                    m = b.inverted && d.h || 0,
                    g, n = ["y", b.chartHeight, c, d.plotY + b.plotTop, b.plotTop, b.plotTop + b.plotHeight],
                    k = ["x", b.chartWidth, a, d.plotX + b.plotLeft, b.plotLeft, b.plotLeft + b.plotWidth],
                    l = !this.followPointer && t(d.ttBelow, !b.inverted === !!d.negative),
                    u = function (a, b, f, d, c, v) {
                        var x = f < d - h,
                            w = d + h + f < b,
                            r = d - h - f;
                        d += h;
                        if (l && w) e[a] = d;
                        else if (!l && x) e[a] = r;
                        else if (x) e[a] = Math.min(v - f, 0 > r - m ? r : r - m);
                        else if (w) e[a] = Math.max(c, d + m + f > b ? d : d + m);
                        else return !1
                    },
                    p = function (a, b, f, d) {
                        var c;
                        d < h ||
                            d > b - h ? c = !1 : e[a] = d < f / 2 ? 1 : d > b - f / 2 ? b - f - 2 : d - f / 2;
                        return c
                    },
                    v = function (a) {
                        var b = n;
                        n = k;
                        k = b;
                        g = a
                    },
                    E = function () {
                        !1 !== u.apply(0, n) ? !1 !== p.apply(0, k) || g || (v(!0), E()) : g ? e.x = e.y = 0 : (v(!0), E())
                    };
                (b.inverted || 1 < this.len) && v();
                E();
                return e
            },
            defaultFormatter: function (a) {
                var c = this.points || p(this),
                    d;
                d = [a.tooltipFooterHeaderFormatter(c[0])];
                d = d.concat(a.bodyFormatter(c));
                d.push(a.tooltipFooterHeaderFormatter(c[0], !0));
                return d
            },
            refresh: function (a, c) {
                var d, b = this.options,
                    h = a,
                    e, m = {},
                    g = [];
                d = b.formatter || this.defaultFormatter;
                var m = this.shared,
                    n;
                b.enabled && (clearTimeout(this.hideTimer), this.followPointer = p(h)[0].series.tooltipOptions.followPointer, e = this.getAnchor(h, c), c = e[0], b = e[1], !m || h.series && h.series.noSharedTooltip ? m = h.getLabelConfig() : (A(h, function (a) {
                    a.setState("hover");
                    g.push(a.getLabelConfig())
                }), m = {
                    x: h[0].category,
                    y: h[0].y
                }, m.points = g, h = h[0]), this.len = g.length, m = d.call(m, this), n = h.series, this.distance = t(n.tooltipOptions.distance, 16), !1 === m ? this.hide() : (d = this.getLabel(), this.isHidden && d.attr({
                        opacity: 1
                    }).show(),
                    this.split ? this.renderSplit(m, p(a)) : (d.css({
                        width: this.chart.spacingBox.width
                    }), d.attr({
                        text: m && m.join ? m.join("") : m
                    }), d.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + t(h.colorIndex, n.colorIndex)), this.updatePosition({
                        plotX: c,
                        plotY: b,
                        negative: h.negative,
                        ttBelow: h.ttBelow,
                        h: e[2] || 0
                    })), this.isHidden = !1))
            },
            renderSplit: function (c, e) {
                var d = this,
                    b = [],
                    h = this.chart,
                    w = h.renderer,
                    m = !0,
                    g = this.options,
                    n = 0,
                    k = this.getLabel();
                a.isString(c) && (c = [!1, c]);
                A(c.slice(0, e.length + 1), function (a, c) {
                    if (!1 !==
                        a) {
                        c = e[c - 1] || {
                            isHeader: !0,
                            plotX: e[0].plotX
                        };
                        var u = c.series || d,
                            v = u.tt,
                            E = "highcharts-color-" + t(c.colorIndex, (c.series || {}).colorIndex, "none");
                        v || (u.tt = v = w.label(null, null, null, "callout", null, null, g.useHTML).addClass("highcharts-tooltip-box " + E).attr({
                            padding: g.padding,
                            r: g.borderRadius
                        }).add(k));
                        v.isActive = !0;
                        v.attr({
                            text: a
                        });
                        a = v.getBBox();
                        E = a.width + v.strokeWidth();
                        c.isHeader ? (n = a.height, E = Math.max(0, Math.min(c.plotX + h.plotLeft - E / 2, h.chartWidth - E))) : E = c.plotX + h.plotLeft - t(g.distance, 16) - E;
                        0 > E && (m = !1);
                        a = (c.series && c.series.yAxis && c.series.yAxis.pos) + (c.plotY || 0);
                        a -= h.plotTop;
                        b.push({
                            target: c.isHeader ? h.plotHeight + n : a,
                            rank: c.isHeader ? 1 : 0,
                            size: u.tt.getBBox().height + 1,
                            point: c,
                            x: E,
                            tt: v
                        })
                    }
                });
                this.cleanSplit();
                a.distribute(b, h.plotHeight + n);
                A(b, function (a) {
                    var b = a.point,
                        d = b.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: m || b.isHeader ? a.x : b.plotX + h.plotLeft + t(g.distance, 16),
                        y: a.pos + h.plotTop,
                        anchorX: b.isHeader ? b.plotX + h.plotLeft : b.plotX + d.xAxis.pos,
                        anchorY: b.isHeader ? a.pos + h.plotTop -
                            15 : b.plotY + d.yAxis.pos
                    })
                })
            },
            updatePosition: function (a) {
                var c = this.chart,
                    d = this.getLabel(),
                    d = (this.options.positioner || this.getPosition).call(this, d.width, d.height, a);
                this.move(Math.round(d.x), Math.round(d.y || 0), a.plotX + c.plotLeft, a.plotY + c.plotTop)
            },
            getDateFormat: function (a, e, d, b) {
                var h = z("%m-%d %H:%M:%S.%L", e),
                    g, m, n = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    k = "millisecond";
                for (m in c) {
                    if (a === c.week && +z("%w", e) === d && "00:00:00.000" === h.substr(6)) {
                        m = "week";
                        break
                    }
                    if (c[m] > a) {
                        m = k;
                        break
                    }
                    if (n[m] &&
                        h.substr(n[m]) !== "01-01 00:00:00.000".substr(n[m])) break;
                    "week" !== m && (k = m)
                }
                m && (g = b[m]);
                return g
            },
            getXDateFormat: function (a, c, d) {
                c = c.dateTimeLabelFormats;
                var b = d && d.closestPointRange;
                return (b ? this.getDateFormat(b, a.x, d.options.startOfWeek, c) : c.day) || c.year
            },
            tooltipFooterHeaderFormatter: function (a, c) {
                c = c ? "footer" : "header";
                var d = a.series,
                    b = d.tooltipOptions,
                    h = b.xDateFormat,
                    e = d.xAxis,
                    m = e && "datetime" === e.options.type && g(a.key),
                    n = b[c + "Format"];
                m && !h && (h = this.getXDateFormat(a, b, e));
                m && h && A(a.point && a.point.tooltipDateKeys || ["key"], function (a) {
                    n = n.replace("{point." + a + "}", "{point." + a + ":" + h + "}")
                });
                return q(n, {
                    point: a,
                    series: d
                })
            },
            bodyFormatter: function (a) {
                return e(a, function (a) {
                    var d = a.series.tooltipOptions;
                    return (d[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, d[(a.point.formatPrefix || "point") + "Format"])
                })
            }
        }
    })(L);
    (function (a) {
        var z = a.addEvent,
            A = a.attr,
            D = a.charts,
            q = a.css,
            g = a.defined,
            e = a.each,
            k = a.extend,
            t = a.find,
            p = a.fireEvent,
            l = a.isObject,
            c = a.offset,
            n = a.pick,
            y = a.splat,
            d = a.Tooltip;
        a.Pointer =
            function (a, h) {
                this.init(a, h)
            };
        a.Pointer.prototype = {
            init: function (a, h) {
                this.options = h;
                this.chart = a;
                this.runChartClick = h.chart.events && !!h.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                d && (a.tooltip = new d(a, h.tooltip), this.followTouchMove = n(h.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            },
            zoomOption: function (a) {
                var b = this.chart,
                    d = b.options.chart,
                    c = d.zoomType || "",
                    b = b.inverted;
                /touch/.test(a.type) && (c = n(d.pinchType, c));
                this.zoomX = a = /x/.test(c);
                this.zoomY = c = /y/.test(c);
                this.zoomHor = a &&
                    !b || c && b;
                this.zoomVert = c && !b || a && b;
                this.hasZoom = a || c
            },
            normalize: function (a, h) {
                var b;
                b = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                h || (this.chartPosition = h = c(this.chart.container));
                return k(a, {
                    chartX: Math.round(b.pageX - h.left),
                    chartY: Math.round(b.pageY - h.top)
                })
            },
            getCoordinates: function (a) {
                var b = {
                    xAxis: [],
                    yAxis: []
                };
                e(this.chart.axes, function (h) {
                    b[h.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: h,
                        value: h.toValue(a[h.horiz ? "chartX" : "chartY"])
                    })
                });
                return b
            },
            findNearestKDPoint: function (a, h,
                d) {
                var b;
                e(a, function (a) {
                    var c = !(a.noSharedTooltip && h) && 0 > a.options.findNearestPointBy.indexOf("y");
                    a = a.searchPoint(d, c);
                    if ((c = l(a, !0)) && !(c = !l(b, !0))) var c = b.distX - a.distX,
                        e = b.dist - a.dist,
                        m = (a.series.group && a.series.group.zIndex) - (b.series.group && b.series.group.zIndex),
                        c = 0 < (0 !== c && h ? c : 0 !== e ? e : 0 !== m ? m : b.series.index > a.series.index ? -1 : 1);
                    c && (b = a)
                });
                return b
            },
            getPointFromEvent: function (a) {
                a = a.target;
                for (var b; a && !b;) b = a.point, a = a.parentNode;
                return b
            },
            getChartCoordinatesFromPoint: function (a, h) {
                var b =
                    a.series,
                    d = b.xAxis,
                    b = b.yAxis,
                    c = n(a.clientX, a.plotX);
                if (d && b) return h ? {
                    chartX: d.len + d.pos - c,
                    chartY: b.len + b.pos - a.plotY
                } : {
                    chartX: c + d.pos,
                    chartY: a.plotY + b.pos
                }
            },
            getHoverData: function (b, h, d, c, g, k, C) {
                var m, w = [],
                    p = C && C.isBoosting;
                c = !(!c || !b);
                C = h && !h.stickyTracking ? [h] : a.grep(d, function (a) {
                    return a.visible && !(!g && a.directTouch) && n(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                h = (m = c ? b : this.findNearestKDPoint(C, g, k)) && m.series;
                m && (g && !h.noSharedTooltip ? (C = a.grep(d, function (a) {
                    return a.visible && !(!g &&
                        a.directTouch) && n(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                }), e(C, function (a) {
                    var b = t(a.points, function (a) {
                        return a.x === m.x && !a.isNull
                    });
                    l(b) && (p && (b = a.getPoint(b)), w.push(b))
                })) : w.push(m));
                return {
                    hoverPoint: m,
                    hoverSeries: h,
                    hoverPoints: w
                }
            },
            runPointActions: function (b, h) {
                var d = this.chart,
                    c = d.tooltip && d.tooltip.options.enabled ? d.tooltip : void 0,
                    g = c ? c.shared : !1,
                    k = h || d.hoverPoint,
                    l = k && k.series || d.hoverSeries,
                    l = this.getHoverData(k, l, d.series, !!h || l && l.directTouch && this.isDirectTouch, g, b, {
                        isBoosting: d.isBoosting
                    }),
                    p, k = l.hoverPoint;
                p = l.hoverPoints;
                h = (l = l.hoverSeries) && l.tooltipOptions.followPointer;
                g = g && l && !l.noSharedTooltip;
                if (k && (k !== d.hoverPoint || c && c.isHidden)) {
                    e(d.hoverPoints || [], function (b) {
                        -1 === a.inArray(b, p) && b.setState()
                    });
                    e(p || [], function (a) {
                        a.setState("hover")
                    });
                    if (d.hoverSeries !== l) l.onMouseOver();
                    d.hoverPoint && d.hoverPoint.firePointEvent("mouseOut");
                    if (!k.series) return;
                    k.firePointEvent("mouseOver");
                    d.hoverPoints = p;
                    d.hoverPoint = k;
                    c && c.refresh(g ? p : k, b)
                } else h && c && !c.isHidden && (k = c.getAnchor([{}],
                    b), c.updatePosition({
                    plotX: k[0],
                    plotY: k[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = z(d.container.ownerDocument, "mousemove", function (b) {
                    var h = D[a.hoverChartIndex];
                    if (h) h.pointer.onDocumentMouseMove(b)
                }));
                e(d.axes, function (h) {
                    var d = n(h.crosshair.snap, !0),
                        c = d ? a.find(p, function (a) {
                            return a.series[h.coll] === h
                        }) : void 0;
                    c || !d ? h.drawCrosshair(b, c) : h.hideCrosshair()
                })
            },
            reset: function (a, h) {
                var b = this.chart,
                    d = b.hoverSeries,
                    c = b.hoverPoint,
                    g = b.hoverPoints,
                    k = b.tooltip,
                    n = k && k.shared ? g : c;
                a && n && e(y(n), function (b) {
                    b.series.isCartesian &&
                        void 0 === b.plotX && (a = !1)
                });
                if (a) k && n && (k.refresh(n), c && (c.setState(c.state, !0), e(b.axes, function (a) {
                    a.crosshair && a.drawCrosshair(null, c)
                })));
                else {
                    if (c) c.onMouseOut();
                    g && e(g, function (a) {
                        a.setState()
                    });
                    if (d) d.onMouseOut();
                    k && k.hide(h);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    e(b.axes, function (a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = b.hoverPoints = b.hoverPoint = null
                }
            },
            scaleGroups: function (a, h) {
                var b = this.chart,
                    d;
                e(b.series, function (c) {
                    d = a || c.getPlotBox();
                    c.xAxis && c.xAxis.zoomEnabled &&
                        c.group && (c.group.attr(d), c.markerGroup && (c.markerGroup.attr(d), c.markerGroup.clip(h ? b.clipRect : null)), c.dataLabelsGroup && c.dataLabelsGroup.attr(d))
                });
                b.clipRect.attr(h || b.clipBox)
            },
            dragStart: function (a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            },
            drag: function (a) {
                var b = this.chart,
                    d = b.options.chart,
                    c = a.chartX,
                    e = a.chartY,
                    g = this.zoomHor,
                    k = this.zoomVert,
                    n = b.plotLeft,
                    l = b.plotTop,
                    p = b.plotWidth,
                    v = b.plotHeight,
                    E, x = this.selectionMarker,
                    t = this.mouseDownX,
                    f = this.mouseDownY,
                    r = d.panKey && a[d.panKey + "Key"];
                x && x.touch || (c < n ? c = n : c > n + p && (c = n + p), e < l ? e = l : e > l + v && (e = l + v), this.hasDragged = Math.sqrt(Math.pow(t - c, 2) + Math.pow(f - e, 2)), 10 < this.hasDragged && (E = b.isInsidePlot(t - n, f - l), b.hasCartesianSeries && (this.zoomX || this.zoomY) && E && !r && !x && (this.selectionMarker = x = b.renderer.rect(n, l, g ? 1 : p, k ? 1 : v, 0).attr({
                    "class": "highcharts-selection-marker",
                    zIndex: 7
                }).add()), x && g && (c -= t, x.attr({
                    width: Math.abs(c),
                    x: (0 < c ? 0 : c) + t
                })), x && k && (c = e - f, x.attr({
                    height: Math.abs(c),
                    y: (0 < c ? 0 : c) + f
                })), E && !x && d.panning && b.pan(a, d.panning)))
            },
            drop: function (a) {
                var b = this,
                    d = this.chart,
                    c = this.hasPinched;
                if (this.selectionMarker) {
                    var n = {
                            originalEvent: a,
                            xAxis: [],
                            yAxis: []
                        },
                        l = this.selectionMarker,
                        t = l.attr ? l.attr("x") : l.x,
                        H = l.attr ? l.attr("y") : l.y,
                        u = l.attr ? l.attr("width") : l.width,
                        y = l.attr ? l.attr("height") : l.height,
                        v;
                    if (this.hasDragged || c) e(d.axes, function (d) {
                        if (d.zoomEnabled && g(d.min) && (c || b[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            }[d.coll]])) {
                            var h = d.horiz,
                                e = "touchend" === a.type ? d.minPixelPadding : 0,
                                f =
                                d.toValue((h ? t : H) + e),
                                h = d.toValue((h ? t + u : H + y) - e);
                            n[d.coll].push({
                                axis: d,
                                min: Math.min(f, h),
                                max: Math.max(f, h)
                            });
                            v = !0
                        }
                    }), v && p(d, "selection", n, function (a) {
                        d.zoom(k(a, c ? {
                            animation: !1
                        } : null))
                    });
                    this.selectionMarker = this.selectionMarker.destroy();
                    c && this.scaleGroups()
                }
                d && (q(d.container, {
                    cursor: d._cursor
                }), d.cancelClick = 10 < this.hasDragged, d.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function (a) {
                a = this.normalize(a);
                this.zoomOption(a);
                a.preventDefault && a.preventDefault();
                this.dragStart(a)
            },
            onDocumentMouseUp: function (b) {
                D[a.hoverChartIndex] && D[a.hoverChartIndex].pointer.drop(b)
            },
            onDocumentMouseMove: function (a) {
                var b = this.chart,
                    d = this.chartPosition;
                a = this.normalize(a, d);
                !d || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            },
            onContainerMouseLeave: function (b) {
                var d = D[a.hoverChartIndex];
                d && (b.relatedTarget || b.toElement) && (d.pointer.reset(), d.pointer.chartPosition = null)
            },
            onContainerMouseMove: function (b) {
                var d =
                    this.chart;
                g(a.hoverChartIndex) && D[a.hoverChartIndex] && D[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = d.index);
                b = this.normalize(b);
                b.returnValue = !1;
                "mousedown" === d.mouseIsDown && this.drag(b);
                !this.inClass(b.target, "highcharts-tracker") && !d.isInsidePlot(b.chartX - d.plotLeft, b.chartY - d.plotTop) || d.openMenu || this.runPointActions(b)
            },
            inClass: function (a, d) {
                for (var b; a;) {
                    if (b = A(a, "class")) {
                        if (-1 !== b.indexOf(d)) return !0;
                        if (-1 !== b.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            },
            onTrackerMouseOut: function (a) {
                var b =
                    this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            },
            onContainerClick: function (a) {
                var b = this.chart,
                    d = b.hoverPoint,
                    c = b.plotLeft,
                    e = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (d && this.inClass(a.target, "highcharts-tracker") ? (p(d.series, "click", k(a, {
                    point: d
                })), b.hoverPoint && d.firePointEvent("click", a)) : (k(a, this.getCoordinates(a)),
                    b.isInsidePlot(a.chartX - c, a.chartY - e) && p(b, "click", a)))
            },
            setDOMEvents: function () {
                var b = this,
                    d = b.chart.container,
                    c = d.ownerDocument;
                d.onmousedown = function (a) {
                    b.onContainerMouseDown(a)
                };
                d.onmousemove = function (a) {
                    b.onContainerMouseMove(a)
                };
                d.onclick = function (a) {
                    b.onContainerClick(a)
                };
                this.unbindContainerMouseLeave = z(d, "mouseleave", b.onContainerMouseLeave);
                a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = z(c, "mouseup", b.onDocumentMouseUp));
                a.hasTouch && (d.ontouchstart = function (a) {
                        b.onContainerTouchStart(a)
                    },
                    d.ontouchmove = function (a) {
                        b.onContainerTouchMove(a)
                    }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = z(c, "touchend", b.onDocumentTouchEnd)))
            },
            destroy: function () {
                var b = this;
                b.unDocMouseMove && b.unDocMouseMove();
                this.unbindContainerMouseLeave();
                a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
                clearInterval(b.tooltipTimeout);
                a.objectEach(b, function (a, d) {
                    b[d] = null
                })
            }
        }
    })(L);
    (function (a) {
        var z =
            a.charts,
            A = a.each,
            D = a.extend,
            q = a.map,
            g = a.noop,
            e = a.pick;
        D(a.Pointer.prototype, {
            pinchTranslate: function (a, e, g, l, c, n) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, e, g, l, c, n);
                this.zoomVert && this.pinchTranslateDirection(!1, a, e, g, l, c, n)
            },
            pinchTranslateDirection: function (a, e, g, l, c, n, q, d) {
                var b = this.chart,
                    h = a ? "x" : "y",
                    k = a ? "X" : "Y",
                    m = "chart" + k,
                    p = a ? "width" : "height",
                    t = b["plot" + (a ? "Left" : "Top")],
                    C, H, u = d || 1,
                    y = b.inverted,
                    v = b.bounds[a ? "h" : "v"],
                    E = 1 === e.length,
                    x = e[0][m],
                    I = g[0][m],
                    f = !E && e[1][m],
                    r = !E && g[1][m],
                    N;
                g =
                    function () {
                        !E && 20 < Math.abs(x - f) && (u = d || Math.abs(I - r) / Math.abs(x - f));
                        H = (t - I) / u + x;
                        C = b["plot" + (a ? "Width" : "Height")] / u
                    };
                g();
                e = H;
                e < v.min ? (e = v.min, N = !0) : e + C > v.max && (e = v.max - C, N = !0);
                N ? (I -= .8 * (I - q[h][0]), E || (r -= .8 * (r - q[h][1])), g()) : q[h] = [I, r];
                y || (n[h] = H - t, n[p] = C);
                n = y ? 1 / u : u;
                c[p] = C;
                c[h] = e;
                l[y ? a ? "scaleY" : "scaleX" : "scale" + k] = u;
                l["translate" + k] = n * t + (I - n * x)
            },
            pinch: function (a) {
                var k = this,
                    p = k.chart,
                    l = k.pinchDown,
                    c = a.touches,
                    n = c.length,
                    y = k.lastValidTouch,
                    d = k.hasZoom,
                    b = k.selectionMarker,
                    h = {},
                    w = 1 === n && (k.inClass(a.target,
                        "highcharts-tracker") && p.runTrackerClick || k.runChartClick),
                    m = {};
                1 < n && (k.initiated = !0);
                d && k.initiated && !w && a.preventDefault();
                q(c, function (a) {
                    return k.normalize(a)
                });
                "touchstart" === a.type ? (A(c, function (a, b) {
                    l[b] = {
                        chartX: a.chartX,
                        chartY: a.chartY
                    }
                }), y.x = [l[0].chartX, l[1] && l[1].chartX], y.y = [l[0].chartY, l[1] && l[1].chartY], A(p.axes, function (a) {
                    if (a.zoomEnabled) {
                        var b = p.bounds[a.horiz ? "h" : "v"],
                            d = a.minPixelPadding,
                            c = a.toPixels(e(a.options.min, a.dataMin)),
                            h = a.toPixels(e(a.options.max, a.dataMax)),
                            m = Math.max(c,
                                h);
                        b.min = Math.min(a.pos, Math.min(c, h) - d);
                        b.max = Math.max(a.pos + a.len, m + d)
                    }
                }), k.res = !0) : k.followTouchMove && 1 === n ? this.runPointActions(k.normalize(a)) : l.length && (b || (k.selectionMarker = b = D({
                    destroy: g,
                    touch: !0
                }, p.plotBox)), k.pinchTranslate(l, c, h, b, m, y), k.hasPinched = d, k.scaleGroups(h, m), k.res && (k.res = !1, this.reset(!1, 0)))
            },
            touch: function (g, q) {
                var k = this.chart,
                    l, c;
                if (k.index !== a.hoverChartIndex) this.onContainerMouseLeave({
                    relatedTarget: !0
                });
                a.hoverChartIndex = k.index;
                1 === g.touches.length ? (g = this.normalize(g), (c = k.isInsidePlot(g.chartX - k.plotLeft, g.chartY - k.plotTop)) && !k.openMenu ? (q && this.runPointActions(g), "touchmove" === g.type && (q = this.pinchDown, l = q[0] ? 4 <= Math.sqrt(Math.pow(q[0].chartX - g.chartX, 2) + Math.pow(q[0].chartY - g.chartY, 2)) : !1), e(l, !0) && this.pinch(g)) : q && this.reset()) : 2 === g.touches.length && this.pinch(g)
            },
            onContainerTouchStart: function (a) {
                this.zoomOption(a);
                this.touch(a, !0)
            },
            onContainerTouchMove: function (a) {
                this.touch(a)
            },
            onDocumentTouchEnd: function (e) {
                z[a.hoverChartIndex] && z[a.hoverChartIndex].pointer.drop(e)
            }
        })
    })(L);
    (function (a) {
        var z = a.addEvent,
            A = a.charts,
            D = a.css,
            q = a.doc,
            g = a.extend,
            e = a.noop,
            k = a.Pointer,
            t = a.removeEvent,
            p = a.win,
            l = a.wrap;
        if (!a.hasTouch && (p.PointerEvent || p.MSPointerEvent)) {
            var c = {},
                n = !!p.PointerEvent,
                y = function () {
                    var b = [];
                    b.item = function (a) {
                        return this[a]
                    };
                    a.objectEach(c, function (a) {
                        b.push({
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.target
                        })
                    });
                    return b
                },
                d = function (b, d, c, m) {
                    "touch" !== b.pointerType && b.pointerType !== b.MSPOINTER_TYPE_TOUCH || !A[a.hoverChartIndex] || (m(b), m = A[a.hoverChartIndex].pointer, m[d]({
                        type: c,
                        target: b.currentTarget,
                        preventDefault: e,
                        touches: y()
                    }))
                };
            g(k.prototype, {
                onContainerPointerDown: function (a) {
                    d(a, "onContainerTouchStart", "touchstart", function (a) {
                        c[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget
                        }
                    })
                },
                onContainerPointerMove: function (a) {
                    d(a, "onContainerTouchMove", "touchmove", function (a) {
                        c[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        c[a.pointerId].target || (c[a.pointerId].target = a.currentTarget)
                    })
                },
                onDocumentPointerUp: function (a) {
                    d(a, "onDocumentTouchEnd", "touchend", function (a) {
                        delete c[a.pointerId]
                    })
                },
                batchMSEvents: function (a) {
                    a(this.chart.container, n ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, n ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(q, n ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            l(k.prototype, "init", function (a, d, c) {
                a.call(this, d, c);
                this.hasZoom && D(d.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            });
            l(k.prototype, "setDOMEvents", function (a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(z)
            });
            l(k.prototype, "destroy", function (a) {
                this.batchMSEvents(t);
                a.call(this)
            })
        }
    })(L);
    (function (a) {
        var z = a.addEvent,
            A = a.css,
            D = a.discardElement,
            q = a.defined,
            g = a.each,
            e = a.isFirefox,
            k = a.marginNames,
            t = a.merge,
            p = a.pick,
            l = a.setAnimation,
            c = a.stableSort,
            n = a.win,
            y = a.wrap;
        a.Legend = function (a, b) {
            this.init(a, b)
        };
        a.Legend.prototype = {
            init: function (a, b) {
                this.chart = a;
                this.setOptions(b);
                b.enabled && (this.render(), z(this.chart, "endResize", function () {
                    this.legend.positionCheckboxes()
                }))
            },
            setOptions: function (a) {
                var b = p(a.padding,
                    8);
                this.options = a;
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding = b;
                this.initialItemY = b - 5;
                this.itemHeight = this.maxItemWidth = 0;
                this.symbolWidth = p(a.symbolWidth, 16);
                this.pages = []
            },
            update: function (a, b) {
                var d = this.chart;
                this.setOptions(t(!0, this.options, a));
                this.destroy();
                d.isDirtyLegend = d.isDirtyBox = !0;
                p(b, !0) && d.redraw()
            },
            colorizeItem: function (a, b) {
                a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden")
            },
            positionItem: function (a) {
                var b = this.options,
                    d = b.symbolPadding,
                    b = !b.rtl,
                    c =
                    a._legendItemPos,
                    e = c[0],
                    c = c[1],
                    g = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(b ? e : this.legendWidth - e - 2 * d - 4, c);
                g && (g.x = e, g.y = c)
            },
            destroyItem: function (a) {
                var b = a.checkbox;
                g(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                b && D(a.checkbox)
            },
            destroy: function () {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy())
                }
                g(this.getAllItems(), function (b) {
                    g(["legendItem", "legendGroup"], a, b)
                });
                g("clipRect up down pager nav box title group".split(" "), a, this);
                this.display = null
            },
            positionCheckboxes: function () {
                var a = this.group && this.group.alignAttr,
                    b, c = this.clipHeight || this.legendHeight,
                    e = this.titleHeight;
                a && (b = a.translateY, g(this.allItems, function (d) {
                    var h = d.checkbox,
                        m;
                    h && (m = b + e + h.y + (this.scrollOffset || 0) + 3, A(h, {
                        left: a.translateX + d.checkboxOffset + h.x - 20 + "px",
                        top: m + "px",
                        display: m > b - 6 && m < b + c - 6 ? "" : "none"
                    }))
                }, this))
            },
            renderTitle: function () {
                var a = this.options,
                    b = this.padding,
                    c = a.title,
                    e = 0;
                c.text && (this.title || (this.title = this.chart.renderer.label(c.text, b - 3, b -
                    4, null, null, null, a.useHTML, null, "legend-title").attr({
                    zIndex: 1
                }).add(this.group)), a = this.title.getBBox(), e = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                    translateY: e
                }));
                this.titleHeight = e
            },
            setText: function (d) {
                var b = this.options;
                d.legendItem.attr({
                    text: b.labelFormat ? a.format(b.labelFormat, d) : b.labelFormatter.call(d)
                })
            },
            renderItem: function (a) {
                var b = this.chart,
                    c = b.renderer,
                    d = this.options,
                    e = "horizontal" === d.layout,
                    g = this.symbolWidth,
                    n = d.symbolPadding,
                    k = this.padding,
                    l = e ? p(d.itemDistance, 20) :
                    0,
                    u = !d.rtl,
                    q = d.width,
                    v = d.itemMarginBottom || 0,
                    E = this.itemMarginTop,
                    x = a.legendItem,
                    t = !a.series,
                    f = !t && a.series.drawLegendSymbol ? a.series : a,
                    r = f.options,
                    y = this.createCheckboxForItem && r && r.showCheckbox,
                    r = g + n + l + (y ? 20 : 0),
                    K = d.useHTML,
                    B = a.options.className;
                x || (a.legendGroup = c.g("legend-item").addClass("highcharts-" + f.type + "-series highcharts-color-" + a.colorIndex + (B ? " " + B : "") + (t ? " highcharts-series-" + a.index : "")).attr({
                    zIndex: 1
                }).add(this.scrollGroup), a.legendItem = x = c.text("", u ? g + n : -n, this.baseline || 0, K).attr({
                    align: u ?
                        "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (this.fontMetrics = c.fontMetrics(12, x), this.baseline = this.fontMetrics.f + 3 + E, x.attr("y", this.baseline)), this.symbolHeight = d.symbolHeight || this.fontMetrics.f, f.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, x, K), y && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                x.css({
                    width: (d.itemWidth || d.width || b.spacingBox.width) - r
                });
                this.setText(a);
                c = x.getBBox();
                g = a.checkboxOffset = d.itemWidth || a.legendItemWidth || c.width +
                    r;
                this.itemHeight = c = Math.round(a.legendItemHeight || c.height || this.symbolHeight);
                e && this.itemX - k + g > (q || b.spacingBox.width - 2 * k - d.x) && (this.itemX = k, this.itemY += E + this.lastLineHeight + v, this.lastLineHeight = 0);
                this.maxItemWidth = Math.max(this.maxItemWidth, g);
                this.lastItemY = E + this.itemY + v;
                this.lastLineHeight = Math.max(c, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                e ? this.itemX += g : (this.itemY += E + c + v, this.lastLineHeight = c);
                this.offsetWidth = q || Math.max((e ? this.itemX - k - (a.checkbox ? 0 : l) : g) + k, this.offsetWidth)
            },
            getAllItems: function () {
                var a = [];
                g(this.chart.series, function (b) {
                    var c = b && b.options;
                    b && p(c.showInLegend, q(c.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b)))
                });
                return a
            },
            adjustMargins: function (a, b) {
                var c = this.chart,
                    d = this.options,
                    e = d.align.charAt(0) + d.verticalAlign.charAt(0) + d.layout.charAt(0);
                d.floating || g([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (h, g) {
                    h.test(e) && !q(a[g]) && (c[k[g]] = Math.max(c[k[g]], c.legend[(g + 1) % 2 ? "legendHeight" :
                        "legendWidth"] + [1, -1, -1, 1][g] * d[g % 2 ? "x" : "y"] + p(d.margin, 12) + b[g]))
                })
            },
            render: function () {
                var a = this,
                    b = a.chart,
                    h = b.renderer,
                    e = a.group,
                    m, n, k, l, p = a.box,
                    u = a.options,
                    q = a.padding;
                a.itemX = q;
                a.itemY = a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                e || (a.group = e = h.g("legend").attr({
                    zIndex: 7
                }).add(), a.contentGroup = h.g().attr({
                    zIndex: 1
                }).add(e), a.scrollGroup = h.g().add(a.contentGroup));
                a.renderTitle();
                m = a.getAllItems();
                c(m, function (a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex ||
                        0)
                });
                u.reversed && m.reverse();
                a.allItems = m;
                a.display = n = !!m.length;
                a.lastLineHeight = 0;
                g(m, function (b) {
                    a.renderItem(b)
                });
                k = (u.width || a.offsetWidth) + q;
                l = a.lastItemY + a.lastLineHeight + a.titleHeight;
                l = a.handleOverflow(l);
                l += q;
                p || (a.box = p = h.rect().addClass("highcharts-legend-box").attr({
                    r: u.borderRadius
                }).add(e), p.isNew = !0);
                0 < k && 0 < l && (p[p.isNew ? "attr" : "animate"](p.crisp.call({}, {
                    x: 0,
                    y: 0,
                    width: k,
                    height: l
                }, p.strokeWidth())), p.isNew = !1);
                p[n ? "show" : "hide"]();
                "none" === e.getStyle("display") && (k = l = 0);
                a.legendWidth =
                    k;
                a.legendHeight = l;
                g(m, function (b) {
                    a.positionItem(b)
                });
                n && e.align(t(u, {
                    width: k,
                    height: l
                }), !0, "spacingBox");
                b.isResizing || this.positionCheckboxes()
            },
            handleOverflow: function (a) {
                var b = this,
                    c = this.chart,
                    d = c.renderer,
                    e = this.options,
                    k = e.y,
                    n = this.padding,
                    c = c.spacingBox.height + ("top" === e.verticalAlign ? -k : k) - n,
                    k = e.maxHeight,
                    l, q = this.clipRect,
                    u = e.navigation,
                    t = p(u.animation, !0),
                    v = u.arrowSize || 12,
                    E = this.nav,
                    x = this.pages,
                    I, f = this.allItems,
                    r = function (a) {
                        "number" === typeof a ? q.attr({
                            height: a
                        }) : q && (b.clipRect = q.destroy(),
                            b.contentGroup.clip());
                        b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + n + "px,9999px," + (n + a) + "px,0)" : "auto")
                    };
                "horizontal" !== e.layout || "middle" === e.verticalAlign || e.floating || (c /= 2);
                k && (c = Math.min(c, k));
                x.length = 0;
                a > c && !1 !== u.enabled ? (this.clipHeight = l = Math.max(c - 20 - this.titleHeight - n, 0), this.currentPage = p(this.currentPage, 1), this.fullHeight = a, g(f, function (a, b) {
                    var c = a._legendItemPos[1];
                    a = Math.round(a.legendItem.getBBox().height);
                    var d = x.length;
                    if (!d || c - x[d - 1] > l && (I || c) !== x[d - 1]) x.push(I ||
                        c), d++;
                    b === f.length - 1 && c + a - x[d - 1] > l && x.push(c);
                    c !== I && (I = c)
                }), q || (q = b.clipRect = d.clipRect(0, n, 9999, 0), b.contentGroup.clip(q)), r(l), E || (this.nav = E = d.g().attr({
                    zIndex: 1
                }).add(this.group), this.up = d.symbol("triangle", 0, 0, v, v).on("click", function () {
                    b.scroll(-1, t)
                }).add(E), this.pager = d.text("", 15, 10).addClass("highcharts-legend-navigation").add(E), this.down = d.symbol("triangle-down", 0, 0, v, v).on("click", function () {
                    b.scroll(1, t)
                }).add(E)), b.scroll(0), a = c) : E && (r(), this.nav = E.destroy(), this.scrollGroup.attr({
                        translateY: 1
                    }),
                    this.clipHeight = 0);
                return a
            },
            scroll: function (a, b) {
                var c = this.pages,
                    d = c.length;
                a = this.currentPage + a;
                var e = this.clipHeight,
                    g = this.pager,
                    k = this.padding;
                a > d && (a = d);
                0 < a && (void 0 !== b && l(b, this.chart), this.nav.attr({
                    translateX: k,
                    translateY: e + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), this.up.attr({
                    "class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), g.attr({
                    text: a + "/" + d
                }), this.down.attr({
                    x: 18 + this.pager.getBBox().width,
                    "class": a === d ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), this.scrollOffset = -c[a - 1] + this.initialItemY, this.scrollGroup.animate({
                    translateY: this.scrollOffset
                }), this.currentPage = a, this.positionCheckboxes())
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function (a, b) {
                var c = a.symbolHeight,
                    d = a.options.squareSymbol;
                b.legendSymbol = this.chart.renderer.rect(d ? (a.symbolWidth - c) / 2 : 0, a.baseline - c + 1, d ? c : a.symbolWidth, c, p(a.options.symbolRadius, c / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(b.legendGroup)
            },
            drawLineMarker: function (a) {
                var b =
                    this.options.marker,
                    c, d = a.symbolWidth,
                    e = a.symbolHeight;
                c = e / 2;
                var g = this.chart.renderer,
                    k = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                this.legendLine = g.path(["M", 0, a, "L", d, a]).addClass("highcharts-graph").attr({}).add(k);
                b && !1 !== b.enabled && (c = Math.min(p(b.radius, c), c), 0 === this.symbol.indexOf("url") && (b = t(b, {
                    width: e,
                    height: e
                }), c = 0), this.legendSymbol = b = g.symbol(this.symbol, d / 2 - c, a - c, 2 * c, 2 * c, b).addClass("highcharts-point").add(k), b.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(n.navigator.userAgent) ||
            e) && y(a.Legend.prototype, "positionItem", function (a, b) {
            var c = this,
                d = function () {
                    b._legendItemPos && a.call(c, b)
                };
            d();
            setTimeout(d)
        })
    })(L);
    (function (a) {
        var z = a.addEvent,
            A = a.animObject,
            D = a.attr,
            q = a.doc,
            g = a.Axis,
            e = a.createElement,
            k = a.defaultOptions,
            t = a.discardElement,
            p = a.charts,
            l = a.defined,
            c = a.each,
            n = a.extend,
            y = a.find,
            d = a.fireEvent,
            b = a.grep,
            h = a.isNumber,
            w = a.isObject,
            m = a.isString,
            F = a.Legend,
            J = a.marginNames,
            C = a.merge,
            H = a.objectEach,
            u = a.Pointer,
            G = a.pick,
            v = a.pInt,
            E = a.removeEvent,
            x = a.seriesTypes,
            I = a.splat,
            f =
            a.svg,
            r = a.syncTimeout,
            N = a.win,
            K = a.Chart = function () {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function (a, b, c) {
            return new K(a, b, c)
        };
        n(K.prototype, {
            callbacks: [],
            getArgs: function () {
                var a = [].slice.call(arguments);
                if (m(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            },
            init: function (b, c) {
                var f, d, h = b.series,
                    e = b.plotOptions || {};
                b.series = null;
                f = C(k, b);
                for (d in f.plotOptions) f.plotOptions[d].tooltip = e[d] && C(e[d].tooltip) || void 0;
                f.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions ||
                    b.tooltip;
                f.series = b.series = h;
                this.userOptions = b;
                b = f.chart;
                d = b.events;
                this.margin = [];
                this.spacing = [];
                this.bounds = {
                    h: {},
                    v: {}
                };
                this.labelCollectors = [];
                this.callback = c;
                this.isResizing = 0;
                this.options = f;
                this.axes = [];
                this.series = [];
                this.hasCartesianSeries = b.showAxes;
                var v = this;
                v.index = p.length;
                p.push(v);
                a.chartCount++;
                d && H(d, function (a, b) {
                    z(v, b, a)
                });
                v.xAxis = [];
                v.yAxis = [];
                v.pointCount = v.colorCounter = v.symbolCounter = 0;
                v.firstRender()
            },
            initSeries: function (b) {
                var c = this.options.chart;
                (c = x[b.type || c.type || c.defaultSeriesType]) ||
                a.error(17, !0);
                c = new c;
                c.init(this, b);
                return c
            },
            orderSeries: function (a) {
                var b = this.series;
                for (a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].name || "Series " + (b[a].index + 1))
            },
            isInsidePlot: function (a, b, c) {
                var f = c ? b : a;
                a = c ? a : b;
                return 0 <= f && f <= this.plotWidth && 0 <= a && a <= this.plotHeight
            },
            redraw: function (b) {
                var f = this.axes,
                    h = this.series,
                    e = this.pointer,
                    v = this.legend,
                    g = this.isDirtyLegend,
                    x, m, k = this.hasCartesianSeries,
                    r = this.isDirtyBox,
                    l, B = this.renderer,
                    E = B.isHidden(),
                    u = [];
                this.setResponsive && this.setResponsive(!1);
                a.setAnimation(b, this);
                E && this.temporaryDisplay();
                this.layOutTitles();
                for (b = h.length; b--;)
                    if (l = h[b], l.options.stacking && (x = !0, l.isDirty)) {
                        m = !0;
                        break
                    }
                if (m)
                    for (b = h.length; b--;) l = h[b], l.options.stacking && (l.isDirty = !0);
                c(h, function (a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), g = !0);
                    a.isDirtyData && d(a, "updatedData")
                });
                g && v.options.enabled && (v.render(), this.isDirtyLegend = !1);
                x && this.getStacks();
                k && c(f, function (a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                k && (c(f,
                    function (a) {
                        a.isDirty && (r = !0)
                    }), c(f, function (a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, u.push(function () {
                        d(a, "afterSetExtremes", n(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (r || x) && a.redraw()
                }));
                r && this.drawChartBox();
                d(this, "predraw");
                c(h, function (a) {
                    (r || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                e && e.reset(!0);
                B.draw();
                d(this, "redraw");
                d(this, "render");
                E && this.temporaryDisplay(!0);
                c(u, function (a) {
                    a.call()
                })
            },
            get: function (a) {
                function b(b) {
                    return b.id === a || b.options && b.options.id ===
                        a
                }
                var c, f = this.series,
                    d;
                c = y(this.axes, b) || y(this.series, b);
                for (d = 0; !c && d < f.length; d++) c = y(f[d].points || [], b);
                return c
            },
            getAxes: function () {
                var a = this,
                    b = this.options,
                    f = b.xAxis = I(b.xAxis || {}),
                    b = b.yAxis = I(b.yAxis || {});
                c(f, function (a, b) {
                    a.index = b;
                    a.isX = !0
                });
                c(b, function (a, b) {
                    a.index = b
                });
                f = f.concat(b);
                c(f, function (b) {
                    new g(a, b)
                })
            },
            getSelectedPoints: function () {
                var a = [];
                c(this.series, function (c) {
                    a = a.concat(b(c.data || [], function (a) {
                        return a.selected
                    }))
                });
                return a
            },
            getSelectedSeries: function () {
                return b(this.series,
                    function (a) {
                        return a.selected
                    })
            },
            setTitle: function (a, b, f) {
                var d = this,
                    h = d.options,
                    e;
                e = h.title = C(h.title, a);
                h = h.subtitle = C(h.subtitle, b);
                c([["title", a, e], ["subtitle", b, h]], function (a, b) {
                    var c = a[0],
                        f = d[c],
                        h = a[1];
                    a = a[2];
                    f && h && (d[c] = f = f.destroy());
                    a && !f && (d[c] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + c,
                        zIndex: a.zIndex || 4
                    }).add(), d[c].update = function (a) {
                        d.setTitle(!b && a, b && a)
                    })
                });
                d.layOutTitles(f)
            },
            layOutTitles: function (a) {
                var b = 0,
                    f, d = this.renderer,
                    h = this.spacingBox;
                c(["title", "subtitle"], function (a) {
                    var c = this[a],
                        f = this.options[a];
                    a = "title" === a ? -3 : f.verticalAlign ? 0 : b + 2;
                    var e;
                    c && (e = d.fontMetrics(e, c).b, c.css({
                        width: (f.width || h.width + f.widthAdjust) + "px"
                    }).align(n({
                        y: a + e
                    }, f), !1, "spacingBox"), f.floating || f.verticalAlign || (b = Math.ceil(b + c.getBBox(f.useHTML).height)))
                }, this);
                f = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && f && (this.isDirtyBox = f, this.hasRendered && G(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function () {
                var b = this.options.chart,
                    c = b.width,
                    b = b.height,
                    f = this.renderTo;
                l(c) || (this.containerWidth = a.getStyle(f, "width"));
                l(b) || (this.containerHeight = a.getStyle(f, "height"));
                this.chartWidth = Math.max(0, c || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            },
            temporaryDisplay: function (b) {
                var c = this.renderTo;
                if (b)
                    for (; c && c.style;) c.hcOrigStyle && (a.css(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached && (q.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode;
                else
                    for (; c && c.style;) {
                        q.body.contains(c) || c.parentNode || (c.hcOrigDetached = !0, q.body.appendChild(c));
                        if ("none" === a.getStyle(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = {
                            display: c.style.display,
                            height: c.style.height,
                            overflow: c.style.overflow
                        }, b = {
                            display: "block",
                            overflow: "hidden"
                        }, c !== this.renderTo && (b.height = 0), a.css(c, b), c.offsetWidth || c.style.setProperty("display", "block", "important");
                        c = c.parentNode;
                        if (c === q.body) break
                    }
            },
            setClassName: function (a) {
                this.container.className = "highcharts-container " +
                    (a || "")
            },
            getContainer: function () {
                var b, c = this.options,
                    f = c.chart,
                    d, g;
                b = this.renderTo;
                var x = a.uniqueKey(),
                    r;
                b || (this.renderTo = b = f.renderTo);
                m(b) && (this.renderTo = b = q.getElementById(b));
                b || a.error(13, !0);
                d = v(D(b, "data-highcharts-chart"));
                h(d) && p[d] && p[d].hasRendered && p[d].destroy();
                D(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                f.skipClone || b.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                d = this.chartWidth;
                g = this.chartHeight;
                this.container = b = e("div", {
                    id: x
                }, void 0, b);
                this._cursor = b.style.cursor;
                this.renderer = new(a[f.renderer] || a.Renderer)(b, d, g, null, f.forExport, c.exporting && c.exporting.allowHTML);
                this.setClassName(f.className);
                for (r in c.defs) this.renderer.definition(c.defs[r]);
                this.renderer.chartIndex = this.index
            },
            getMargins: function (a) {
                var b = this.spacing,
                    c = this.margin,
                    f = this.titleOffset;
                this.resetMargins();
                f && !l(c[0]) && (this.plotTop = Math.max(this.plotTop, f + this.options.title.margin + b[0]));
                this.legend && this.legend.display && this.legend.adjustMargins(c, b);
                this.extraMargin && (this[this.extraMargin.type] =
                    (this[this.extraMargin.type] || 0) + this.extraMargin.value);
                this.adjustPlotArea && this.adjustPlotArea();
                a || this.getAxisMargins()
            },
            getAxisMargins: function () {
                var a = this,
                    b = a.axisOffset = [0, 0, 0, 0],
                    f = a.margin;
                a.hasCartesianSeries && c(a.axes, function (a) {
                    a.visible && a.getOffset()
                });
                c(J, function (c, d) {
                    l(f[d]) || (a[c] += b[d])
                });
                a.setChartSize()
            },
            reflow: function (b) {
                var c = this,
                    f = c.options.chart,
                    d = c.renderTo,
                    h = l(f.width) && l(f.height),
                    e = f.width || a.getStyle(d, "width"),
                    f = f.height || a.getStyle(d, "height"),
                    d = b ? b.target : N;
                if (!h &&
                    !c.isPrinting && e && f && (d === N || d === q)) {
                    if (e !== c.containerWidth || f !== c.containerHeight) clearTimeout(c.reflowTimeout), c.reflowTimeout = r(function () {
                        c.container && c.setSize(void 0, void 0, !1)
                    }, b ? 100 : 0);
                    c.containerWidth = e;
                    c.containerHeight = f
                }
            },
            initReflow: function () {
                var a = this,
                    b;
                b = z(N, "resize", function (b) {
                    a.reflow(b)
                });
                z(a, "destroy", b)
            },
            setSize: function (b, f, h) {
                var e = this,
                    v = e.renderer;
                e.isResizing += 1;
                a.setAnimation(h, e);
                e.oldChartHeight = e.chartHeight;
                e.oldChartWidth = e.chartWidth;
                void 0 !== b && (e.options.chart.width =
                    b);
                void 0 !== f && (e.options.chart.height = f);
                e.getChartSize();
                e.setChartSize(!0);
                v.setSize(e.chartWidth, e.chartHeight, h);
                c(e.axes, function (a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                e.isDirtyLegend = !0;
                e.isDirtyBox = !0;
                e.layOutTitles();
                e.getMargins();
                e.redraw(h);
                e.oldChartHeight = null;
                d(e, "resize");
                r(function () {
                    e && d(e, "endResize", null, function () {
                        --e.isResizing
                    })
                }, A(void 0).duration)
            },
            setChartSize: function (a) {
                var b = this.inverted,
                    f = this.renderer,
                    d = this.chartWidth,
                    h = this.chartHeight,
                    e = this.options.chart,
                    v = this.spacing,
                    g = this.clipOffset,
                    x, m, r, k;
                this.plotLeft = x = Math.round(this.plotLeft);
                this.plotTop = m = Math.round(this.plotTop);
                this.plotWidth = r = Math.max(0, Math.round(d - x - this.marginRight));
                this.plotHeight = k = Math.max(0, Math.round(h - m - this.marginBottom));
                this.plotSizeX = b ? k : r;
                this.plotSizeY = b ? r : k;
                this.plotBorderWidth = e.plotBorderWidth || 0;
                this.spacingBox = f.spacingBox = {
                    x: v[3],
                    y: v[0],
                    width: d - v[3] - v[1],
                    height: h - v[0] - v[2]
                };
                this.plotBox = f.plotBox = {
                    x: x,
                    y: m,
                    width: r,
                    height: k
                };
                d = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(d,
                    g[3]) / 2);
                f = Math.ceil(Math.max(d, g[0]) / 2);
                this.clipBox = {
                    x: b,
                    y: f,
                    width: Math.floor(this.plotSizeX - Math.max(d, g[1]) / 2 - b),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(d, g[2]) / 2 - f))
                };
                a || c(this.axes, function (a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                })
            },
            resetMargins: function () {
                var a = this,
                    b = a.options.chart;
                c(["margin", "spacing"], function (f) {
                    var d = b[f],
                        h = w(d) ? d : [d, d, d, d];
                    c(["Top", "Right", "Bottom", "Left"], function (c, d) {
                        a[f][d] = G(b[f + c], h[d])
                    })
                });
                c(J, function (b, c) {
                    a[b] = G(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function () {
                var a = this.options.chart,
                    b = this.renderer,
                    c = this.chartWidth,
                    f = this.chartHeight,
                    d = this.chartBackground,
                    h = this.plotBackground,
                    e = this.plotBorder,
                    v, g, x = this.plotLeft,
                    m = this.plotTop,
                    r = this.plotWidth,
                    k = this.plotHeight,
                    n = this.plotBox,
                    l = this.clipRect,
                    E = this.clipBox,
                    u = "animate";
                d || (this.chartBackground = d = b.rect().addClass("highcharts-background").add(), u = "attr");
                v = g = d.strokeWidth();
                d[u]({
                    x: g / 2,
                    y: g / 2,
                    width: c - g - v % 2,
                    height: f - g - v % 2,
                    r: a.borderRadius
                });
                u =
                    "animate";
                h || (u = "attr", this.plotBackground = h = b.rect().addClass("highcharts-plot-background").add());
                h[u](n);
                l ? l.animate({
                    width: E.width,
                    height: E.height
                }) : this.clipRect = b.clipRect(E);
                u = "animate";
                e || (u = "attr", this.plotBorder = e = b.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                e[u](e.crisp({
                    x: x,
                    y: m,
                    width: r,
                    height: k
                }, -e.strokeWidth()));
                this.isDirtyBox = !1
            },
            propFromSeries: function () {
                var a = this,
                    b = a.options.chart,
                    f, d = a.options.series,
                    h, e;
                c(["inverted", "angular", "polar"], function (c) {
                    f = x[b.type ||
                        b.defaultSeriesType];
                    e = b[c] || f && f.prototype[c];
                    for (h = d && d.length; !e && h--;)(f = x[d[h].type]) && f.prototype[c] && (e = !0);
                    a[c] = e
                })
            },
            linkSeries: function () {
                var a = this,
                    b = a.series;
                c(b, function (a) {
                    a.linkedSeries.length = 0
                });
                c(b, function (b) {
                    var c = b.options.linkedTo;
                    m(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = G(b.options.visible, c.options.visible, b.visible))
                })
            },
            renderSeries: function () {
                c(this.series, function (a) {
                    a.translate();
                    a.render()
                })
            },
            renderLabels: function () {
                var a = this,
                    b = a.options.labels;
                b.items && c(b.items, function (c) {
                    var f = n(b.style, c.style),
                        d = v(f.left) + a.plotLeft,
                        h = v(f.top) + a.plotTop + 12;
                    delete f.left;
                    delete f.top;
                    a.renderer.text(c.html, d, h).attr({
                        zIndex: 2
                    }).css(f).add()
                })
            },
            render: function () {
                var a = this.axes,
                    b = this.renderer,
                    f = this.options,
                    d, h, e;
                this.setTitle();
                this.legend = new F(this, f.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                f = this.plotWidth;
                d = this.plotHeight = Math.max(this.plotHeight - 21,
                    0);
                c(a, function (a) {
                    a.setScale()
                });
                this.getAxisMargins();
                h = 1.1 < f / this.plotWidth;
                e = 1.05 < d / this.plotHeight;
                if (h || e) c(a, function (a) {
                    (a.horiz && h || !a.horiz && e) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && c(a, function (a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            },
            addCredits: function (a) {
                var b =
                    this;
                a = C(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                    a.href && (N.location.href = a.href)
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }).add().align(a.position), this.credits.update = function (a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            },
            destroy: function () {
                var b = this,
                    f = b.axes,
                    h = b.series,
                    e = b.container,
                    v, g = e && e.parentNode;
                d(b, "destroy");
                b.renderer.forExport ? a.erase(p, b) : p[b.index] =
                    void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                E(b);
                for (v = f.length; v--;) f[v] = f[v].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (v = h.length; v--;) h[v] = h[v].destroy();
                c("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (a) {
                    var c = b[a];
                    c && c.destroy && (b[a] = c.destroy())
                });
                e && (e.innerHTML = "", E(e), g && t(e));
                H(b, function (a,
                    c) {
                    delete b[c]
                })
            },
            isReadyToRender: function () {
                var a = this;
                return f || N != N.top || "complete" === q.readyState ? !0 : (q.attachEvent("onreadystatechange", function () {
                    q.detachEvent("onreadystatechange", a.firstRender);
                    "complete" === q.readyState && a.firstRender()
                }), !1)
            },
            firstRender: function () {
                var a = this,
                    b = a.options;
                if (a.isReadyToRender()) {
                    a.getContainer();
                    d(a, "init");
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    c(b.series || [], function (b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    d(a, "beforeRender");
                    u && (a.pointer =
                        new u(a, b));
                    a.render();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.temporaryDisplay(!0)
                }
            },
            onload: function () {
                c([this.callback].concat(this.callbacks), function (a) {
                    a && void 0 !== this.index && a.apply(this, [this])
                }, this);
                d(this, "load");
                d(this, "render");
                l(this.index) && !1 !== this.options.chart.reflow && this.initReflow();
                this.onload = null
            }
        })
    })(L);
    (function (a) {
        var z, A = a.each,
            D = a.extend,
            q = a.erase,
            g = a.fireEvent,
            e = a.format,
            k = a.isArray,
            t = a.isNumber,
            p = a.pick,
            l = a.removeEvent;
        a.Point = z = function () {};
        a.Point.prototype = {
            init: function (a, e, g) {
                var c = a.chart.options.chart.colorCount;
                this.series = a;
                this.applyOptions(e, g);
                a.options.colorByPoint ? (e = a.colorCounter, a.colorCounter++, a.colorCounter === c && (a.colorCounter = 0)) : e = a.colorIndex;
                this.colorIndex = p(this.colorIndex, e);
                a.chart.pointCount++;
                return this
            },
            applyOptions: function (a, e) {
                var c = this.series,
                    d = c.options.pointValKey || c.pointValKey;
                a = z.prototype.optionsToObject.call(this, a);
                D(this, a);
                this.options = this.options ? D(this.options, a) : a;
                a.group && delete this.group;
                d && (this.y =
                    this[d]);
                this.isNull = p(this.isValid && !this.isValid(), null === this.x || !t(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === e && c.xAxis && c.xAxis.hasNames && (this.x = c.xAxis.nameToX(this));
                void 0 === this.x && c && (this.x = void 0 === e ? c.autoIncrement(this) : e);
                return this
            },
            optionsToObject: function (a) {
                var c = {},
                    e = this.series,
                    d = e.options.keys,
                    b = d || e.pointArrayMap || ["y"],
                    h = b.length,
                    g = 0,
                    m = 0;
                if (t(a) || null === a) c[b[0]] = a;
                else if (k(a))
                    for (!d && a.length > h && (e = typeof a[0], "string" === e ? c.name = a[0] : "number" ===
                            e && (c.x = a[0]), g++); m < h;) d && void 0 === a[g] || (c[b[m]] = a[g]), g++, m++;
                else "object" === typeof a && (c = a, a.dataLabels && (e._hasPointLabels = !0), a.marker && (e._hasPointMarkers = !0));
                return c
            },
            getClassName: function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ?
                    " " + this.zone.className.replace("highcharts-negative", "") : "")
            },
            getZone: function () {
                var a = this.series,
                    e = a.zones,
                    a = a.zoneAxis || "y",
                    g = 0,
                    d;
                for (d = e[g]; this[a] >= d.value;) d = e[++g];
                d && d.color && !this.options.color && (this.color = d.color);
                return d
            },
            destroy: function () {
                var a = this.series.chart,
                    e = a.hoverPoints,
                    g;
                a.pointCount--;
                e && (this.setState(), q(e, this), e.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) l(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (g in this) this[g] = null
            },
            destroyElements: function () {
                for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], e, g = 6; g--;) e = a[g], this[e] && (this[e] = this[e].destroy())
            },
            getLabelConfig: function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function (a) {
                var c = this.series,
                    g = c.tooltipOptions,
                    d = p(g.valueDecimals, ""),
                    b = g.valuePrefix || "",
                    h = g.valueSuffix || "";
                A(c.pointArrayMap || ["y"], function (c) {
                    c = "{point." + c;
                    if (b || h) a = a.replace(c + "}", b + c + "}" + h);
                    a = a.replace(c + "}", c + ":,." + d + "f}")
                });
                return e(a, {
                    point: this,
                    series: this.series
                })
            },
            firePointEvent: function (a, e, k) {
                var c = this,
                    b = this.series.options;
                (b.point.events[a] || c.options && c.options.events && c.options.events[a]) && this.importEvents();
                "click" === a && b.allowPointSelect && (k = function (a) {
                    c.select && c.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                g(this, a, e, k)
            },
            visible: !0
        }
    })(L);
    (function (a) {
        var z = a.addEvent,
            A = a.animObject,
            D = a.arrayMax,
            q = a.arrayMin,
            g = a.correctFloat,
            e = a.Date,
            k = a.defaultOptions,
            t = a.defined,
            p = a.each,
            l = a.erase,
            c = a.extend,
            n = a.fireEvent,
            y = a.grep,
            d = a.isArray,
            b = a.isNumber,
            h = a.isString,
            w = a.merge,
            m = a.objectEach,
            F = a.pick,
            J = a.removeEvent,
            C = a.splat,
            H = a.SVGElement,
            u = a.syncTimeout,
            G = a.win;
        a.Series = a.seriesType("line", null, {
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                radius: 4,
                states: {
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function () {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {
                hover: {
                    animation: {
                        duration: 50
                    },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10
                    }
                },
                select: {
                    marker: {}
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x",
"y"],
            coll: "series",
            init: function (a, b) {
                var d = this,
                    e, f = a.series,
                    h;
                d.chart = a;
                d.options = b = d.setOptions(b);
                d.linkedSeries = [];
                d.bindAxes();
                c(d, {
                    name: b.name,
                    state: "",
                    visible: !1 !== b.visible,
                    selected: !0 === b.selected
                });
                e = b.events;
                m(e, function (a, b) {
                    z(d, b, a)
                });
                if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                d.getColor();
                d.getSymbol();
                p(d.parallelArrays, function (a) {
                    d[a + "Data"] = []
                });
                d.setData(b.data, !1);
                d.isCartesian && (a.hasCartesianSeries = !0);
                f.length && (h =
                    f[f.length - 1]);
                d._i = F(h && h._i, -1) + 1;
                a.orderSeries(this.insert(f))
            },
            insert: function (a) {
                var c = this.options.index,
                    d;
                if (b(c)) {
                    for (d = a.length; d--;)
                        if (c >= F(a[d].options.index, a[d]._i)) {
                            a.splice(d + 1, 0, this);
                            break
                        } - 1 === d && a.unshift(this);
                    d += 1
                } else a.push(this);
                return F(d, a.length - 1)
            },
            bindAxes: function () {
                var b = this,
                    c = b.options,
                    d = b.chart,
                    e;
                p(b.axisTypes || [], function (f) {
                    p(d[f], function (a) {
                        e = a.options;
                        if (c[f] === e.index || void 0 !== c[f] && c[f] === e.id || void 0 === c[f] && 0 === e.index) b.insert(a.series), b[f] = a, a.isDirty = !0
                    });
                    b[f] || b.optionalAxis === f || a.error(18, !0)
                })
            },
            updateParallelArrays: function (a, c) {
                var d = a.series,
                    e = arguments,
                    f = b(c) ? function (b) {
                        var f = "y" === b && d.toYData ? d.toYData(a) : a[b];
                        d[b + "Data"][c] = f
                    } : function (a) {
                        Array.prototype[c].apply(d[a + "Data"], Array.prototype.slice.call(e, 2))
                    };
                p(d.parallelArrays, f)
            },
            autoIncrement: function () {
                var a = this.options,
                    b = this.xIncrement,
                    c, d = a.pointIntervalUnit,
                    b = F(b, a.pointStart, 0);
                this.pointInterval = c = F(this.pointInterval, a.pointInterval, 1);
                d && (a = new e(b), "day" === d ? a = +a[e.hcSetDate](a[e.hcGetDate]() +
                    c) : "month" === d ? a = +a[e.hcSetMonth](a[e.hcGetMonth]() + c) : "year" === d && (a = +a[e.hcSetFullYear](a[e.hcGetFullYear]() + c)), c = a - b);
                this.xIncrement = b + c;
                return b
            },
            setOptions: function (a) {
                var b = this.chart,
                    c = b.options,
                    d = c.plotOptions,
                    f = (b.userOptions || {}).plotOptions || {},
                    e = d[this.type];
                this.userOptions = a;
                b = w(e, d.series, a);
                this.tooltipOptions = w(k.tooltip, k.plotOptions.series && k.plotOptions.series.tooltip, k.plotOptions[this.type].tooltip, c.tooltip.userOptions, d.series && d.series.tooltip, d[this.type].tooltip, a.tooltip);
                this.stickyTracking = F(a.stickyTracking, f[this.type] && f[this.type].stickyTracking, f.series && f.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : b.stickyTracking);
                null === e.marker && delete b.marker;
                this.zoneAxis = b.zoneAxis;
                a = this.zones = (b.zones || []).slice();
                !b.negativeColor && !b.negativeFillColor || b.zones || a.push({
                    value: b[this.zoneAxis + "Threshold"] || b.threshold || 0,
                    className: "highcharts-negative"
                });
                a.length && t(a[a.length - 1].value) && a.push({});
                return b
            },
            getCyclic: function (a, b, c) {
                var d,
                    f = this.chart,
                    e = this.userOptions,
                    h = a + "Index",
                    g = a + "Counter",
                    v = c ? c.length : F(f.options.chart[a + "Count"], f[a + "Count"]);
                b || (d = F(e[h], e["_" + h]), t(d) || (f.series.length || (f[g] = 0), e["_" + h] = d = f[g] % v, f[g] += 1), c && (b = c[d]));
                void 0 !== d && (this[h] = d);
                this[a] = b
            },
            getColor: function () {
                this.getCyclic("color")
            },
            getSymbol: function () {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            setData: function (c, e, g, m) {
                var f = this,
                    v = f.points,
                    k = v && v.length ||
                    0,
                    l, x = f.options,
                    n = f.chart,
                    u = null,
                    q = f.xAxis,
                    E = x.turboThreshold,
                    w = this.xData,
                    t = this.yData,
                    C = (l = f.pointArrayMap) && l.length;
                c = c || [];
                l = c.length;
                e = F(e, !0);
                if (!1 !== m && l && k === l && !f.cropped && !f.hasGroupedData && f.visible) p(c, function (a, b) {
                    v[b].update && a !== x.data[b] && v[b].update(a, !1, null, !1)
                });
                else {
                    f.xIncrement = null;
                    f.colorCounter = 0;
                    p(this.parallelArrays, function (a) {
                        f[a + "Data"].length = 0
                    });
                    if (E && l > E) {
                        for (g = 0; null === u && g < l;) u = c[g], g++;
                        if (b(u))
                            for (g = 0; g < l; g++) w[g] = this.autoIncrement(), t[g] = c[g];
                        else if (d(u))
                            if (C)
                                for (g =
                                    0; g < l; g++) u = c[g], w[g] = u[0], t[g] = u.slice(1, C + 1);
                            else
                                for (g = 0; g < l; g++) u = c[g], w[g] = u[0], t[g] = u[1];
                        else a.error(12)
                    } else
                        for (g = 0; g < l; g++) void 0 !== c[g] && (u = {
                            series: f
                        }, f.pointClass.prototype.applyOptions.apply(u, [c[g]]), f.updateParallelArrays(u, g));
                    t && h(t[0]) && a.error(14, !0);
                    f.data = [];
                    f.options.data = f.userOptions.data = c;
                    for (g = k; g--;) v[g] && v[g].destroy && v[g].destroy();
                    q && (q.minRange = q.userMinRange);
                    f.isDirty = n.isDirtyBox = !0;
                    f.isDirtyData = !!v;
                    g = !1
                }
                "point" === x.legendType && (this.processData(), this.generatePoints());
                e && n.redraw(g)
            },
            processData: function (b) {
                var c = this.xData,
                    d = this.yData,
                    e = c.length,
                    f;
                f = 0;
                var h, g, v = this.xAxis,
                    m, k = this.options;
                m = k.cropThreshold;
                var l = this.getExtremesFromAll || k.getExtremesFromAll,
                    n = this.isCartesian,
                    k = v && v.val2lin,
                    u = v && v.isLog,
                    p = this.requireSorting,
                    q, w;
                if (n && !this.isDirty && !v.isDirty && !this.yAxis.isDirty && !b) return !1;
                v && (b = v.getExtremes(), q = b.min, w = b.max);
                if (n && this.sorted && !l && (!m || e > m || this.forceCrop))
                    if (c[e - 1] < q || c[0] > w) c = [], d = [];
                    else if (c[0] < q || c[e - 1] > w) f = this.cropData(this.xData,
                    this.yData, q, w), c = f.xData, d = f.yData, f = f.start, h = !0;
                for (m = c.length || 1; --m;) e = u ? k(c[m]) - k(c[m - 1]) : c[m] - c[m - 1], 0 < e && (void 0 === g || e < g) ? g = e : 0 > e && p && (a.error(15), p = !1);
                this.cropped = h;
                this.cropStart = f;
                this.processedXData = c;
                this.processedYData = d;
                this.closestPointRange = g
            },
            cropData: function (a, b, c, d) {
                var f = a.length,
                    e = 0,
                    h = f,
                    g = F(this.cropShoulder, 1),
                    m;
                for (m = 0; m < f; m++)
                    if (a[m] >= c) {
                        e = Math.max(0, m - g);
                        break
                    }
                for (c = m; c < f; c++)
                    if (a[c] > d) {
                        h = c + g;
                        break
                    }
                return {
                    xData: a.slice(e, h),
                    yData: b.slice(e, h),
                    start: e,
                    end: h
                }
            },
            generatePoints: function () {
                var a =
                    this.options,
                    b = a.data,
                    c = this.data,
                    d, f = this.processedXData,
                    e = this.processedYData,
                    h = this.pointClass,
                    g = f.length,
                    m = this.cropStart || 0,
                    k, l = this.hasGroupedData,
                    a = a.keys,
                    n, u = [],
                    p;
                c || l || (c = [], c.length = b.length, c = this.data = c);
                a && l && (this.options.keys = !1);
                for (p = 0; p < g; p++) k = m + p, l ? (n = (new h).init(this, [f[p]].concat(C(e[p]))), n.dataGroup = this.groupMap[p]) : (n = c[k]) || void 0 === b[k] || (c[k] = n = (new h).init(this, b[k], f[p])), n && (n.index = k, u[p] = n);
                this.options.keys = a;
                if (c && (g !== (d = c.length) || l))
                    for (p = 0; p < d; p++) p !== m || l ||
                        (p += g), c[p] && (c[p].destroyElements(), c[p].plotX = void 0);
                this.data = c;
                this.points = u
            },
            getExtremes: function (a) {
                var c = this.yAxis,
                    e = this.processedXData,
                    h, f = [],
                    g = 0;
                h = this.xAxis.getExtremes();
                var m = h.min,
                    v = h.max,
                    k, l, n, u;
                a = a || this.stackedYData || this.processedYData || [];
                h = a.length;
                for (u = 0; u < h; u++)
                    if (l = e[u], n = a[u], k = (b(n, !0) || d(n)) && (!c.positiveValuesOnly || n.length || 0 < n), l = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (e[u + 1] || l) >= m && (e[u - 1] || l) <= v, k && l)
                        if (k = n.length)
                            for (; k--;) null !==
                                n[k] && (f[g++] = n[k]);
                        else f[g++] = n;
                this.dataMin = q(f);
                this.dataMax = D(f)
            },
            translate: function () {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options,
                    c = a.stacking,
                    d = this.xAxis,
                    e = d.categories,
                    f = this.yAxis,
                    h = this.points,
                    m = h.length,
                    k = !!this.modifyValue,
                    l = a.pointPlacement,
                    n = "between" === l || b(l),
                    u = a.threshold,
                    p = a.startFromThreshold ? u : 0,
                    q, w, C, H, y = Number.MAX_VALUE;
                "between" === l && (l = .5);
                b(l) && (l *= F(a.pointRange || d.pointRange));
                for (a = 0; a < m; a++) {
                    var G = h[a],
                        A = G.x,
                        J = G.y;
                    w = G.low;
                    var z = c &&
                        f.stacks[(this.negStacks && J < (p ? 0 : u) ? "-" : "") + this.stackKey],
                        D;
                    f.positiveValuesOnly && null !== J && 0 >= J && (G.isNull = !0);
                    G.plotX = q = g(Math.min(Math.max(-1E5, d.translate(A, 0, 0, 0, 1, l, "flags" === this.type)), 1E5));
                    c && this.visible && !G.isNull && z && z[A] && (H = this.getStackIndicator(H, A, this.index), D = z[A], J = D.points[H.key], w = J[0], J = J[1], w === p && H.key === z[A].base && (w = F(u, f.min)), f.positiveValuesOnly && 0 >= w && (w = null), G.total = G.stackTotal = D.total, G.percentage = D.total && G.y / D.total * 100, G.stackY = J, D.setOffset(this.pointXOffset ||
                        0, this.barW || 0));
                    G.yBottom = t(w) ? f.translate(w, 0, 1, 0, 1) : null;
                    k && (J = this.modifyValue(J, G));
                    G.plotY = w = "number" === typeof J && Infinity !== J ? Math.min(Math.max(-1E5, f.translate(J, 0, 1, 0, 1)), 1E5) : void 0;
                    G.isInside = void 0 !== w && 0 <= w && w <= f.len && 0 <= q && q <= d.len;
                    G.clientX = n ? g(d.translate(A, 0, 0, 0, 1, l)) : q;
                    G.negative = G.y < (u || 0);
                    G.category = e && void 0 !== e[G.x] ? e[G.x] : G.x;
                    G.isNull || (void 0 !== C && (y = Math.min(y, Math.abs(q - C))), C = q);
                    G.zone = this.zones.length && G.getZone()
                }
                this.closestPointRangePx = y
            },
            getValidPoints: function (a,
                b) {
                var c = this.chart;
                return y(a || this.points || [], function (a) {
                    return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull
                })
            },
            setClip: function (a) {
                var b = this.chart,
                    c = this.options,
                    d = b.renderer,
                    f = b.inverted,
                    e = this.clipBox,
                    h = e || b.clipBox,
                    g = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, h.height, c.xAxis, c.yAxis].join(),
                    m = b[g],
                    k = b[g + "m"];
                m || (a && (h.width = 0, f && (h.x = b.plotSizeX), b[g + "m"] = k = d.clipRect(f ? b.plotSizeX + 99 : -99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)), b[g] = m = d.clipRect(h),
                    m.count = {
                        length: 0
                    });
                a && !m.count[this.index] && (m.count[this.index] = !0, m.count.length += 1);
                !1 !== c.clip && (this.group.clip(a || e ? m : b.clipRect), this.markerGroup.clip(k), this.sharedClipKey = g);
                a || (m.count[this.index] && (delete m.count[this.index], --m.count.length), 0 === m.count.length && g && b[g] && (e || (b[g] = b[g].destroy()), b[g + "m"] && (b[g + "m"] = b[g + "m"].destroy())))
            },
            animate: function (a) {
                var b = this.chart,
                    c = A(this.options.animation),
                    d;
                a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({
                        width: b.plotSizeX,
                        x: 0
                    },
                    c), b[d + "m"] && b[d + "m"].animate({
                    width: b.plotSizeX + 99,
                    x: 0
                }, c), this.animate = null)
            },
            afterAnimate: function () {
                this.setClip();
                n(this, "afterAnimate");
                this.finishedAnimating = !0
            },
            drawPoints: function () {
                var a = this.points,
                    b = this.chart,
                    c, d, f, e, h = this.options.marker,
                    g, m, k, l = this[this.specialGroup] || this.markerGroup,
                    n, u = F(h.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= 2 * h.radius);
                if (!1 !== h.enabled || this._hasPointMarkers)
                    for (c = 0; c < a.length; c++) d = a[c], e = d.graphic, g = d.marker || {}, m = !!d.marker, f = u && void 0 ===
                        g.enabled || g.enabled, k = d.isInside, f && !d.isNull ? (f = F(g.symbol, this.symbol), d.hasImage = 0 === f.indexOf("url"), n = this.markerAttribs(d, d.selected && "select"), e ? e[k ? "show" : "hide"](!0).animate(n) : k && (0 < n.width || d.hasImage) && (d.graphic = e = b.renderer.symbol(f, n.x, n.y, n.width, n.height, m ? g : h).add(l)), e && e.addClass(d.getClassName(), !0)) : e && (d.graphic = e.destroy())
            },
            markerAttribs: function (a, b) {
                var c = this.options.marker,
                    d = a.marker || {},
                    f = F(d.radius, c.radius);
                b && (c = c.states[b], b = d.states && d.states[b], f = F(b && b.radius,
                    c && c.radius, f + (c && c.radiusPlus || 0)));
                a.hasImage && (f = 0);
                a = {
                    x: Math.floor(a.plotX) - f,
                    y: a.plotY - f
                };
                f && (a.width = a.height = 2 * f);
                return a
            },
            destroy: function () {
                var a = this,
                    b = a.chart,
                    c = /AppleWebKit\/533/.test(G.navigator.userAgent),
                    d, f, e = a.data || [],
                    h, g;
                n(a, "destroy");
                J(a);
                p(a.axisTypes || [], function (b) {
                    (g = a[b]) && g.series && (l(g.series, a), g.isDirty = g.forceRedraw = !0)
                });
                a.legendItem && a.chart.legend.destroyItem(a);
                for (f = e.length; f--;)(h = e[f]) && h.destroy && h.destroy();
                a.points = null;
                clearTimeout(a.animationTimeout);
                m(a,
                    function (a, b) {
                        a instanceof H && !a.survive && (d = c && "group" === b ? "hide" : "destroy", a[d]())
                    });
                b.hoverSeries === a && (b.hoverSeries = null);
                l(b.series, a);
                b.orderSeries();
                m(a, function (b, c) {
                    delete a[c]
                })
            },
            getGraphPath: function (a, b, c) {
                var d = this,
                    f = d.options,
                    e = f.step,
                    h, g = [],
                    m = [],
                    k;
                a = a || d.points;
                (h = a.reversed) && a.reverse();
                (e = {
                    right: 1,
                    center: 2
                }[e] || e && 3) && h && (e = 4 - e);
                !f.connectNulls || b || c || (a = this.getValidPoints(a));
                p(a, function (h, l) {
                    var n = h.plotX,
                        v = h.plotY,
                        u = a[l - 1];
                    (h.leftCliff || u && u.rightCliff) && !c && (k = !0);
                    h.isNull &&
                        !t(b) && 0 < l ? k = !f.connectNulls : h.isNull && !b ? k = !0 : (0 === l || k ? l = ["M", h.plotX, h.plotY] : d.getPointSpline ? l = d.getPointSpline(a, h, l) : e ? (l = 1 === e ? ["L", u.plotX, v] : 2 === e ? ["L", (u.plotX + n) / 2, u.plotY, "L", (u.plotX + n) / 2, v] : ["L", n, u.plotY], l.push("L", n, v)) : l = ["L", n, v], m.push(h.x), e && m.push(h.x), g.push.apply(g, l), k = !1)
                });
                g.xMap = m;
                return d.graphPath = g
            },
            drawGraph: function () {
                var a = this,
                    b = (this.gappedPath || this.getGraphPath).call(this),
                    c = [["graph", "highcharts-graph"]];
                p(this.zones, function (a, b) {
                    c.push(["zone-graph-" + b, "highcharts-graph highcharts-zone-graph-" +
b + " " + (a.className || "")])
                });
                p(c, function (c, d) {
                    d = c[0];
                    var f = a[d];
                    f ? (f.endX = a.preventGraphAnimation ? null : b.xMap, f.animate({
                        d: b
                    })) : b.length && (a[d] = a.chart.renderer.path(b).addClass(c[1]).attr({
                        zIndex: 1
                    }).add(a.group));
                    f && (f.startX = b.xMap, f.isArea = b.isArea)
                })
            },
            applyZones: function () {
                var a = this,
                    b = this.chart,
                    c = b.renderer,
                    d = this.zones,
                    f, e, h = this.clips || [],
                    g, m = this.graph,
                    k = this.area,
                    l = Math.max(b.chartWidth, b.chartHeight),
                    n = this[(this.zoneAxis || "y") + "Axis"],
                    u, q, w = b.inverted,
                    t, C, H, G, y = !1;
                d.length && (m || k) && n &&
                    void 0 !== n.min && (q = n.reversed, t = n.horiz, m && m.hide(), k && k.hide(), u = n.getExtremes(), p(d, function (d, v) {
                        f = q ? t ? b.plotWidth : 0 : t ? 0 : n.toPixels(u.min);
                        f = Math.min(Math.max(F(e, f), 0), l);
                        e = Math.min(Math.max(Math.round(n.toPixels(F(d.value, u.max), !0)), 0), l);
                        y && (f = e = n.toPixels(u.max));
                        C = Math.abs(f - e);
                        H = Math.min(f, e);
                        G = Math.max(f, e);
                        n.isXAxis ? (g = {
                            x: w ? G : H,
                            y: 0,
                            width: C,
                            height: l
                        }, t || (g.x = b.plotHeight - g.x)) : (g = {
                            x: 0,
                            y: w ? G : H,
                            width: l,
                            height: C
                        }, t && (g.y = b.plotWidth - g.y));
                        h[v] ? h[v].animate(g) : (h[v] = c.clipRect(g), m && a["zone-graph-" +
                            v].clip(h[v]), k && a["zone-area-" + v].clip(h[v]));
                        y = d.value > u.max
                    }), this.clips = h)
            },
            invertGroups: function (a) {
                function b() {
                    p(["group", "markerGroup"], function (b) {
                        c[b] && (d.renderer.isVML && c[b].attr({
                            width: c.yAxis.len,
                            height: c.xAxis.len
                        }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a))
                    })
                }
                var c = this,
                    d = c.chart,
                    f;
                c.xAxis && (f = z(d, "resize", b), z(c, "destroy", f), b(a), c.invertGroups = b)
            },
            plotGroup: function (a, b, c, d, f) {
                var e = this[a],
                    h = !e;
                h && (this[a] = e = this.chart.renderer.g().attr({
                    zIndex: d || .1
                }).add(f));
                e.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (t(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (e.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                e.attr({
                    visibility: c
                })[h ? "attr" : "animate"](this.getPlotBox());
                return e
            },
            getPlotBox: function () {
                var a = this.chart,
                    b = this.xAxis,
                    c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: c ? c.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function () {
                var a = this,
                    b = a.chart,
                    c, d = a.options,
                    f = !!a.animate && b.renderer.isSVG && A(d.animation).duration,
                    e = a.visible ? "inherit" : "hidden",
                    h = d.zIndex,
                    g = a.hasRendered,
                    m = b.seriesGroup,
                    k = b.inverted;
                c = a.plotGroup("group", "series", e, h, m);
                a.markerGroup = a.plotGroup("markerGroup", "markers", e, h, m);
                f && a.animate(!0);
                c.inverted = a.isCartesian ? k : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(k);
                !1 === d.clip || a.sharedClipKey || g || c.clip(b.clipRect);
                f && a.animate();
                g || (a.animationTimeout = u(function () {
                    a.afterAnimate()
                }, f));
                a.isDirty = !1;
                a.hasRendered = !0
            },
            redraw: function () {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    c = this.group,
                    d = this.xAxis,
                    f = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), c.animate({
                    translateX: F(d && d.left, a.plotLeft),
                    translateY: F(f && f.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdAxisArray: ["clientX",
"plotY"],
            searchPoint: function (a, b) {
                var c = this.xAxis,
                    d = this.yAxis,
                    f = this.chart.inverted;
                return this.searchKDTree({
                    clientX: f ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: f ? d.len - a.chartX + d.pos : a.chartY - d.pos
                }, b)
            },
            buildKDTree: function () {
                function a(c, d, e) {
                    var f, h;
                    if (h = c && c.length) return f = b.kdAxisArray[d % e], c.sort(function (a, b) {
                        return a[f] - b[f]
                    }), h = Math.floor(h / 2), {
                        point: c[h],
                        left: a(c.slice(0, h), d + 1, e),
                        right: a(c.slice(h + 1), d + 1, e)
                    }
                }
                this.buildingKdTree = !0;
                var b = this,
                    c = -1 < b.options.findNearestPointBy.indexOf("y") ?
                    2 : 1;
                delete b.kdTree;
                u(function () {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);
                    b.buildingKdTree = !1
                }, b.options.kdNow ? 0 : 1)
            },
            searchKDTree: function (a, b) {
                function c(a, b, g, m) {
                    var k = b.point,
                        l = d.kdAxisArray[g % m],
                        n, u, v = k;
                    u = t(a[f]) && t(k[f]) ? Math.pow(a[f] - k[f], 2) : null;
                    n = t(a[e]) && t(k[e]) ? Math.pow(a[e] - k[e], 2) : null;
                    n = (u || 0) + (n || 0);
                    k.dist = t(n) ? Math.sqrt(n) : Number.MAX_VALUE;
                    k.distX = t(u) ? Math.sqrt(u) : Number.MAX_VALUE;
                    l = a[l] - k[l];
                    n = 0 > l ? "left" : "right";
                    u = 0 > l ? "right" : "left";
                    b[n] && (n = c(a, b[n], g + 1, m), v = n[h] < v[h] ?
                        n : k);
                    b[u] && Math.sqrt(l * l) < v[h] && (a = c(a, b[u], g + 1, m), v = a[h] < v[h] ? a : v);
                    return v
                }
                var d = this,
                    f = this.kdAxisArray[0],
                    e = this.kdAxisArray[1],
                    h = b ? "distX" : "dist";
                b = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree();
                if (this.kdTree) return c(a, this.kdTree, b, b)
            }
        })
    })(L);
    (function (a) {
        var z = a.Axis,
            A = a.Chart,
            D = a.correctFloat,
            q = a.defined,
            g = a.destroyObjectProperties,
            e = a.each,
            k = a.format,
            t = a.objectEach,
            p = a.pick,
            l = a.Series;
        a.StackItem = function (a, e, g, d, b) {
            var c = a.chart.inverted;
            this.axis = a;
            this.isNegative = g;
            this.options = e;
            this.x = d;
            this.total = null;
            this.points = {};
            this.stack = b;
            this.rightCliff = this.leftCliff = 0;
            this.alignOptions = {
                align: e.align || (c ? g ? "left" : "right" : "center"),
                verticalAlign: e.verticalAlign || (c ? "middle" : g ? "bottom" : "top"),
                y: p(e.y, c ? 4 : g ? 14 : -6),
                x: p(e.x, c ? g ? -6 : 6 : 0)
            };
            this.textAlign = e.textAlign || (c ? g ? "right" : "left" : "center")
        };
        a.StackItem.prototype = {
            destroy: function () {
                g(this, this.axis)
            },
            render: function (a) {
                var c = this.options,
                    e = c.format,
                    e = e ? k(e, this) : c.formatter.call(this);
                this.label ? this.label.attr({
                    text: e,
                    visibility: "hidden"
                }) : this.label = this.axis.chart.renderer.text(e, null, null, c.useHTML).css(c.style).attr({
                    align: this.textAlign,
                    rotation: c.rotation,
                    visibility: "hidden"
                }).add(a)
            },
            setOffset: function (a, e) {
                var c = this.axis,
                    d = c.chart,
                    b = c.translate(c.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                    c = c.translate(0),
                    c = Math.abs(b - c);
                a = d.xAxis[0].translate(this.x) + a;
                b = this.getStackBox(d, this, a, b, e, c);
                if (e = this.label) e.align(this.alignOptions, null, b), b = e.alignAttr, e[!1 === this.options.crop ||
                    d.isInsidePlot(b.x, b.y) ? "show" : "hide"](!0)
            },
            getStackBox: function (a, e, g, d, b, h) {
                var c = e.axis.reversed,
                    m = a.inverted;
                a = a.plotHeight;
                e = e.isNegative && !c || !e.isNegative && c;
                return {
                    x: m ? e ? d : d - h : g,
                    y: m ? a - g - b : e ? a - d - h : a - d,
                    width: m ? h : b,
                    height: m ? b : h
                }
            }
        };
        A.prototype.getStacks = function () {
            var a = this;
            e(a.yAxis, function (a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
            });
            e(a.series, function (c) {
                !c.options.stacking || !0 !== c.visible && !1 !== a.options.chart.ignoreHiddenSeries || (c.stackKey = c.type + p(c.options.stack, ""))
            })
        };
        z.prototype.buildStacks = function () {
            var a = this.series,
                e = p(this.options.reversedStacks, !0),
                g = a.length,
                d;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (d = g; d--;) a[e ? d : g - d - 1].setStackedPoints();
                for (d = 0; d < g; d++) a[d].modifyStacks()
            }
        };
        z.prototype.renderStackTotals = function () {
            var a = this.chart,
                e = a.renderer,
                g = this.stacks,
                d = this.stackTotalGroup;
            d || (this.stackTotalGroup = d = e.g("stack-labels").attr({
                visibility: "visible",
                zIndex: 6
            }).add());
            d.translate(a.plotLeft, a.plotTop);
            t(g, function (a) {
                t(a, function (a) {
                    a.render(d)
                })
            })
        };
        z.prototype.resetStacks = function () {
            var a = this,
                e = a.stacks;
            a.isXAxis || t(e, function (c) {
                t(c, function (d, b) {
                    d.touched < a.stacksTouched ? (d.destroy(), delete c[b]) : (d.total = null, d.cum = null)
                })
            })
        };
        z.prototype.cleanStacks = function () {
            var a;
            this.isXAxis || (this.oldStacks && (a = this.stacks = this.oldStacks), t(a, function (a) {
                t(a, function (a) {
                    a.cum = a.total
                })
            }))
        };
        l.prototype.setStackedPoints = function () {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var c = this.processedXData,
                    e = this.processedYData,
                    g = [],
                    d = e.length,
                    b = this.options,
                    h = b.threshold,
                    k = b.startFromThreshold ? h : 0,
                    m = b.stack,
                    b = b.stacking,
                    l = this.stackKey,
                    t = "-" + l,
                    C = this.negStacks,
                    H = this.yAxis,
                    u = H.stacks,
                    G = H.oldStacks,
                    v, E, x, A, f, r, z;
                H.stacksTouched += 1;
                for (f = 0; f < d; f++) r = c[f], z = e[f], v = this.getStackIndicator(v, r, this.index), A = v.key, x = (E = C && z < (k ? 0 : h)) ? t : l, u[x] || (u[x] = {}), u[x][r] || (G[x] && G[x][r] ? (u[x][r] = G[x][r], u[x][r].total = null) : u[x][r] = new a.StackItem(H, H.options.stackLabels, E, r, m)), x = u[x][r], null !== z && (x.points[A] = x.points[this.index] = [p(x.cum, k)], q(x.cum) || (x.base = A), x.touched = H.stacksTouched, 0 < v.index && !1 === this.singleStacks && (x.points[A][0] = x.points[this.index + "," + r + ",0"][0])), "percent" === b ? (E = E ? l : t, C && u[E] && u[E][r] ? (E = u[E][r], x.total = E.total = Math.max(E.total, x.total) + Math.abs(z) || 0) : x.total = D(x.total + (Math.abs(z) || 0))) : x.total = D(x.total + (z || 0)), x.cum = p(x.cum, k) + (z || 0), null !== z && (x.points[A].push(x.cum), g[f] = x.cum);
                "percent" === b && (H.usePercentage = !0);
                this.stackedYData = g;
                H.oldStacks = {}
            }
        };
        l.prototype.modifyStacks = function () {
            var a =
                this,
                g = a.stackKey,
                k = a.yAxis.stacks,
                d = a.processedXData,
                b, h = a.options.stacking;
            a[h + "Stacker"] && e([g, "-" + g], function (c) {
                for (var e = d.length, g, l; e--;)
                    if (g = d[e], b = a.getStackIndicator(b, g, a.index, c), l = (g = k[c] && k[c][g]) && g.points[b.key]) a[h + "Stacker"](l, g, e)
            })
        };
        l.prototype.percentStacker = function (a, e, g) {
            e = e.total ? 100 / e.total : 0;
            a[0] = D(a[0] * e);
            a[1] = D(a[1] * e);
            this.stackedYData[g] = a[1]
        };
        l.prototype.getStackIndicator = function (a, e, g, d) {
            !q(a) || a.x !== e || d && a.key !== d ? a = {
                x: e,
                index: 0,
                key: d
            } : a.index++;
            a.key = [g, e, a.index].join();
            return a
        }
    })(L);
    (function (a) {
        var z = a.addEvent,
            A = a.Axis,
            D = a.createElement,
            q = a.css,
            g = a.defined,
            e = a.each,
            k = a.erase,
            t = a.extend,
            p = a.fireEvent,
            l = a.inArray,
            c = a.isNumber,
            n = a.isObject,
            y = a.isArray,
            d = a.merge,
            b = a.objectEach,
            h = a.pick,
            w = a.Point,
            m = a.Series,
            F = a.seriesTypes,
            J = a.setAnimation,
            C = a.splat;
        t(a.Chart.prototype, {
            addSeries: function (a, b, c) {
                var d, e = this;
                a && (b = h(b, !0), p(e, "addSeries", {
                    options: a
                }, function () {
                    d = e.initSeries(a);
                    e.isDirtyLegend = !0;
                    e.linkSeries();
                    b && e.redraw(c)
                }));
                return d
            },
            addAxis: function (a, b, c, e) {
                var g =
                    b ? "xAxis" : "yAxis",
                    m = this.options;
                a = d(a, {
                    index: this[g].length,
                    isX: b
                });
                b = new A(this, a);
                m[g] = C(m[g] || {});
                m[g].push(a);
                h(c, !0) && this.redraw(e);
                return b
            },
            showLoading: function (a) {
                var b = this,
                    c = b.options,
                    d = b.loadingDiv,
                    e = function () {
                        d && q(d, {
                            left: b.plotLeft + "px",
                            top: b.plotTop + "px",
                            width: b.plotWidth + "px",
                            height: b.plotHeight + "px"
                        })
                    };
                d || (b.loadingDiv = d = D("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, b.container), b.loadingSpan = D("span", {
                    className: "highcharts-loading-inner"
                }, null, d), z(b,
                    "redraw", e));
                d.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                b.loadingShown = !0;
                e()
            },
            hideLoading: function () {
                var a = this.loadingDiv;
                a && (a.className = "highcharts-loading highcharts-loading-hidden");
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "),
            update: function (a, m, k) {
                var n = this,
                    u = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle"
                    },
                    p = a.chart,
                    q, f, r = [];
                if (p) {
                    d(!0, n.options.chart, p);
                    "className" in p && n.setClassName(p.className);
                    if ("inverted" in p || "polar" in p) n.propFromSeries(), q = !0;
                    "alignTicks" in p && (q = !0);
                    b(p, function (a, b) {
                        -1 !== l("chart." + b, n.propsRequireUpdateSeries) && (f = !0); - 1 !== l(b, n.propsRequireDirtyBox) &&
                            (n.isDirtyBox = !0)
                    })
                }
                a.plotOptions && d(!0, this.options.plotOptions, a.plotOptions);
                b(a, function (a, b) {
                    if (n[b] && "function" === typeof n[b].update) n[b].update(a, !1);
                    else if ("function" === typeof n[u[b]]) n[u[b]](a);
                    "chart" !== b && -1 !== l(b, n.propsRequireUpdateSeries) && (f = !0)
                });
                e("xAxis yAxis zAxis series colorAxis pane".split(" "), function (b) {
                    a[b] && (e(C(a[b]), function (a, c) {
                        (c = g(a.id) && n.get(a.id) || n[b][c]) && c.coll === b && (c.update(a, !1), k && (c.touched = !0));
                        if (!c && k)
                            if ("series" === b) n.addSeries(a, !1).touched = !0;
                            else if ("xAxis" ===
                            b || "yAxis" === b) n.addAxis(a, "xAxis" === b, !1).touched = !0
                    }), k && e(n[b], function (a) {
                        a.touched ? delete a.touched : r.push(a)
                    }))
                });
                e(r, function (a) {
                    a.remove(!1)
                });
                q && e(n.axes, function (a) {
                    a.update({}, !1)
                });
                f && e(n.series, function (a) {
                    a.update({}, !1)
                });
                a.loading && d(!0, n.options.loading, a.loading);
                q = p && p.width;
                p = p && p.height;
                c(q) && q !== n.chartWidth || c(p) && p !== n.chartHeight ? n.setSize(q, p) : h(m, !0) && n.redraw()
            },
            setSubtitle: function (a) {
                this.setTitle(void 0, a)
            }
        });
        t(w.prototype, {
            update: function (a, b, c, d) {
                function e() {
                    g.applyOptions(a);
                    null === g.y && f && (g.graphic = f.destroy());
                    n(a, !0) && (f && f.element && a && a.marker && void 0 !== a.marker.symbol && (g.graphic = f.destroy()), a && a.dataLabels && g.dataLabel && (g.dataLabel = g.dataLabel.destroy()), g.connector && (g.connector = g.connector.destroy()));
                    k = g.index;
                    m.updateParallelArrays(g, k);
                    u.data[k] = n(u.data[k], !0) || n(a, !0) ? g.options : a;
                    m.isDirty = m.isDirtyData = !0;
                    !m.fixedBox && m.hasCartesianSeries && (l.isDirtyBox = !0);
                    "point" === u.legendType && (l.isDirtyLegend = !0);
                    b && l.redraw(c)
                }
                var g = this,
                    m = g.series,
                    f = g.graphic,
                    k, l = m.chart,
                    u = m.options;
                b = h(b, !0);
                !1 === d ? e() : g.firePointEvent("update", {
                    options: a
                }, e)
            },
            remove: function (a, b) {
                this.series.removePoint(l(this, this.series.data), a, b)
            }
        });
        t(m.prototype, {
            addPoint: function (a, b, c, d) {
                var e = this.options,
                    g = this.data,
                    m = this.chart,
                    f = this.xAxis,
                    f = f && f.hasNames && f.names,
                    k = e.data,
                    l, n, u = this.xData,
                    p, v;
                b = h(b, !0);
                l = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(l, [a]);
                v = l.x;
                p = u.length;
                if (this.requireSorting && v < u[p - 1])
                    for (n = !0; p && u[p - 1] > v;) p--;
                this.updateParallelArrays(l,
                    "splice", p, 0, 0);
                this.updateParallelArrays(l, p);
                f && l.name && (f[v] = l.name);
                k.splice(p, 0, a);
                n && (this.data.splice(p, 0, null), this.processData());
                "point" === e.legendType && this.generatePoints();
                c && (g[0] && g[0].remove ? g[0].remove(!1) : (g.shift(), this.updateParallelArrays(l, "shift"), k.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && m.redraw(d)
            },
            removePoint: function (a, b, c) {
                var d = this,
                    e = d.data,
                    g = e[a],
                    m = d.points,
                    f = d.chart,
                    k = function () {
                        m && m.length === e.length && m.splice(a, 1);
                        e.splice(a, 1);
                        d.options.data.splice(a, 1);
                        d.updateParallelArrays(g || {
                            series: d
                        }, "splice", a, 1);
                        g && g.destroy();
                        d.isDirty = !0;
                        d.isDirtyData = !0;
                        b && f.redraw()
                    };
                J(c, f);
                b = h(b, !0);
                g ? g.firePointEvent("remove", null, k) : k()
            },
            remove: function (a, b, c) {
                function d() {
                    e.destroy();
                    g.isDirtyLegend = g.isDirtyBox = !0;
                    g.linkSeries();
                    h(a, !0) && g.redraw(b)
                }
                var e = this,
                    g = e.chart;
                !1 !== c ? p(e, "remove", null, d) : d()
            },
            update: function (a, b) {
                var c = this,
                    g = c.chart,
                    m = c.userOptions,
                    k = c.oldType || c.type,
                    l = a.type || m.type || g.options.chart.type,
                    f = F[k].prototype,
                    n, u = ["group", "markerGroup", "dataLabelsGroup"],
                    p = ["navigatorSeries",
"baseSeries"],
                    q = c.finishedAnimating && {
                        animation: !1
                    };
                if (Object.keys && "data" === Object.keys(a).toString()) return this.setData(a.data, b);
                if (l && l !== k || void 0 !== a.zIndex) u.length = 0;
                p = u.concat(p);
                e(p, function (a) {
                    p[a] = c[a];
                    delete c[a]
                });
                a = d(m, q, {
                    index: c.index,
                    pointStart: c.xData[0]
                }, {
                    data: c.options.data
                }, a);
                c.remove(!1, null, !1);
                for (n in f) c[n] = void 0;
                t(c, F[l || k].prototype);
                e(p, function (a) {
                    c[a] = p[a]
                });
                c.init(g, a);
                c.oldType = k;
                g.linkSeries();
                h(b, !0) && g.redraw(!1)
            }
        });
        t(A.prototype, {
            update: function (a, b) {
                var c =
                    this.chart;
                a = c.options[this.coll][this.options.index] = d(this.userOptions, a);
                this.destroy(!0);
                this.init(c, t(a, {
                    events: void 0
                }));
                c.isDirtyBox = !0;
                h(b, !0) && c.redraw()
            },
            remove: function (a) {
                for (var b = this.chart, c = this.coll, d = this.series, g = d.length; g--;) d[g] && d[g].remove(!1);
                k(b.axes, this);
                k(b[c], this);
                y(b.options[c]) ? b.options[c].splice(this.options.index, 1) : delete b.options[c];
                e(b[c], function (a, b) {
                    a.options.index = b
                });
                this.destroy();
                b.isDirtyBox = !0;
                h(a, !0) && b.redraw()
            },
            setTitle: function (a, b) {
                this.update({
                        title: a
                    },
                    b)
            },
            setCategories: function (a, b) {
                this.update({
                    categories: a
                }, b)
            }
        })
    })(L);
    (function (a) {
        var z = a.each,
            A = a.map,
            D = a.pick,
            q = a.Series,
            g = a.seriesType;
        g("area", "line", {
            softThreshold: !1,
            threshold: 0
        }, {
            singleStacks: !1,
            getStackPoints: function (e) {
                var g = [],
                    q = [],
                    p = this.xAxis,
                    l = this.yAxis,
                    c = l.stacks[this.stackKey],
                    n = {},
                    y = this.index,
                    d = l.series,
                    b = d.length,
                    h, w = D(l.options.reversedStacks, !0) ? 1 : -1,
                    m;
                e = e || this.points;
                if (this.options.stacking) {
                    for (m = 0; m < e.length; m++) e[m].leftNull = e[m].rightNull = null, n[e[m].x] = e[m];
                    a.objectEach(c,
                        function (a, b) {
                            null !== a.total && q.push(b)
                        });
                    q.sort(function (a, b) {
                        return a - b
                    });
                    h = A(d, function () {
                        return this.visible
                    });
                    z(q, function (a, d) {
                        var e = 0,
                            k, u;
                        if (n[a] && !n[a].isNull) g.push(n[a]), z([-1, 1], function (e) {
                            var g = 1 === e ? "rightNull" : "leftNull",
                                l = 0,
                                p = c[q[d + e]];
                            if (p)
                                for (m = y; 0 <= m && m < b;) k = p.points[m], k || (m === y ? n[a][g] = !0 : h[m] && (u = c[a].points[m]) && (l -= u[1] - u[0])), m += w;
                            n[a][1 === e ? "rightCliff" : "leftCliff"] = l
                        });
                        else {
                            for (m = y; 0 <= m && m < b;) {
                                if (k = c[a].points[m]) {
                                    e = k[1];
                                    break
                                }
                                m += w
                            }
                            e = l.translate(e, 0, 1, 0, 1);
                            g.push({
                                isNull: !0,
                                plotX: p.translate(a, 0, 0, 0, 1),
                                x: a,
                                plotY: e,
                                yBottom: e
                            })
                        }
                    })
                }
                return g
            },
            getGraphPath: function (a) {
                var e = q.prototype.getGraphPath,
                    g = this.options,
                    p = g.stacking,
                    l = this.yAxis,
                    c, n, y = [],
                    d = [],
                    b = this.index,
                    h, w = l.stacks[this.stackKey],
                    m = g.threshold,
                    F = l.getThreshold(g.threshold),
                    A, g = g.connectNulls || "percent" === p,
                    C = function (c, e, g) {
                        var k = a[c];
                        c = p && w[k.x].points[b];
                        var n = k[g + "Null"] || 0;
                        g = k[g + "Cliff"] || 0;
                        var u, q, k = !0;
                        g || n ? (u = (n ? c[0] : c[1]) + g, q = c[0] + g, k = !!n) : !p && a[e] && a[e].isNull && (u = q = m);
                        void 0 !== u && (d.push({
                            plotX: h,
                            plotY: null ===
                                u ? F : l.getThreshold(u),
                            isNull: k,
                            isCliff: !0
                        }), y.push({
                            plotX: h,
                            plotY: null === q ? F : l.getThreshold(q),
                            doCurve: !1
                        }))
                    };
                a = a || this.points;
                p && (a = this.getStackPoints(a));
                for (c = 0; c < a.length; c++)
                    if (n = a[c].isNull, h = D(a[c].rectPlotX, a[c].plotX), A = D(a[c].yBottom, F), !n || g) g || C(c, c - 1, "left"), n && !p && g || (d.push(a[c]), y.push({
                        x: c,
                        plotX: h,
                        plotY: A
                    })), g || C(c, c + 1, "right");
                c = e.call(this, d, !0, !0);
                y.reversed = !0;
                n = e.call(this, y, !0, !0);
                n.length && (n[0] = "L");
                n = c.concat(n);
                e = e.call(this, d, !1, g);
                n.xMap = c.xMap;
                this.areaPath = n;
                return e
            },
            drawGraph: function () {
                this.areaPath = [];
                q.prototype.drawGraph.apply(this);
                var a = this,
                    g = this.areaPath,
                    t = this.options,
                    p = [["area", "highcharts-area"]];
                z(this.zones, function (a, c) {
                    p.push(["zone-area-" + c, "highcharts-area highcharts-zone-area-" + c + " " + a.className])
                });
                z(p, function (e) {
                    var c = e[0],
                        k = a[c];
                    k ? (k.endX = a.preventGraphAnimation ? null : g.xMap, k.animate({
                        d: g
                    })) : (k = a[c] = a.chart.renderer.path(g).addClass(e[1]).attr({
                        zIndex: 0
                    }).add(a.group), k.isArea = !0);
                    k.startX = g.xMap;
                    k.shiftUnit = t.step ? 2 : 1
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(L);
    (function (a) {
        var z = a.pick;
        a = a.seriesType;
        a("spline", "line", {}, {
            getPointSpline: function (a, D, q) {
                var g = D.plotX,
                    e = D.plotY,
                    k = a[q - 1];
                q = a[q + 1];
                var t, p, l, c;
                if (k && !k.isNull && !1 !== k.doCurve && !D.isCliff && q && !q.isNull && !1 !== q.doCurve && !D.isCliff) {
                    a = k.plotY;
                    l = q.plotX;
                    q = q.plotY;
                    var n = 0;
                    t = (1.5 * g + k.plotX) / 2.5;
                    p = (1.5 * e + a) / 2.5;
                    l = (1.5 * g + l) / 2.5;
                    c = (1.5 * e + q) / 2.5;
                    l !== t && (n = (c - p) * (l - g) / (l - t) + e - c);
                    p += n;
                    c += n;
                    p > a && p > e ? (p = Math.max(a, e), c = 2 * e - p) : p < a && p < e && (p = Math.min(a, e), c = 2 * e - p);
                    c > q && c > e ? (c = Math.max(q, e), p = 2 * e - c) : c < q && c < e &&
                        (c = Math.min(q, e), p = 2 * e - c);
                    D.rightContX = l;
                    D.rightContY = c
                }
                D = ["C", z(k.rightContX, k.plotX), z(k.rightContY, k.plotY), z(t, g), z(p, e), g, e];
                k.rightContX = k.rightContY = null;
                return D
            }
        })
    })(L);
    (function (a) {
        var z = a.seriesTypes.area.prototype,
            A = a.seriesType;
        A("areaspline", "spline", a.defaultPlotOptions.area, {
            getStackPoints: z.getStackPoints,
            getGraphPath: z.getGraphPath,
            drawGraph: z.drawGraph,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(L);
    (function (a) {
        var z = a.animObject,
            A = a.each,
            D = a.extend,
            q = a.isNumber,
            g = a.merge,
            e = a.pick,
            k = a.Series,
            t = a.seriesType,
            p = a.svg;
        t("column", "line", {
            borderRadius: 0,
            crisp: !0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function () {
                k.prototype.init.apply(this, arguments);
                var a = this,
                    c = a.chart;
                c.hasRendered && A(c.series, function (c) {
                    c.type === a.type && (c.isDirty = !0)
                })
            },
            getColumnMetrics: function () {
                var a = this,
                    c = a.options,
                    g = a.xAxis,
                    k = a.yAxis,
                    d = g.reversed,
                    b, h = {},
                    p = 0;
                !1 === c.grouping ? p = 1 : A(a.chart.series, function (c) {
                    var d = c.options,
                        e = c.yAxis,
                        g;
                    c.type !== a.type || !c.visible && a.chart.options.chart.ignoreHiddenSeries || k.len !== e.len || k.pos !== e.pos || (d.stacking ? (b = c.stackKey, void 0 === h[b] && (h[b] = p++), g = h[b]) : !1 !== d.grouping && (g = p++), c.columnIndex = g)
                });
                var m = Math.min(Math.abs(g.transA) * (g.ordinalSlope ||
                        c.pointRange || g.closestPointRange || g.tickInterval || 1), g.len),
                    q = m * c.groupPadding,
                    t = (m - 2 * q) / (p || 1),
                    c = Math.min(c.maxPointWidth || g.len, e(c.pointWidth, t * (1 - 2 * c.pointPadding)));
                a.columnMetrics = {
                    width: c,
                    offset: (t - c) / 2 + (q + ((a.columnIndex || 0) + (d ? 1 : 0)) * t - m / 2) * (d ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function (a, c, e, g) {
                var d = this.chart,
                    b = this.borderWidth,
                    h = -(b % 2 ? .5 : 0),
                    b = b % 2 ? .5 : 1;
                d.inverted && d.renderer.isVML && (b += 1);
                this.options.crisp && (e = Math.round(a + e) + h, a = Math.round(a) + h, e -= a);
                g = Math.round(c + g) + b;
                h = .5 >= Math.abs(c) &&
                    .5 < g;
                c = Math.round(c) + b;
                g -= c;
                h && g && (--c, g += 1);
                return {
                    x: a,
                    y: c,
                    width: e,
                    height: g
                }
            },
            translate: function () {
                var a = this,
                    c = a.chart,
                    g = a.options,
                    p = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    p = a.borderWidth = e(g.borderWidth, p ? 0 : 1),
                    d = a.yAxis,
                    b = g.threshold,
                    h = a.translatedThreshold = d.getThreshold(b),
                    q = e(g.minPointLength, 5),
                    m = a.getColumnMetrics(),
                    t = m.width,
                    z = a.barW = Math.max(t, 1 + 2 * p),
                    C = a.pointXOffset = m.offset;
                c.inverted && (h -= .5);
                g.pointPadding && (z = Math.ceil(z));
                k.prototype.translate.apply(a);
                A(a.points, function (g) {
                    var m =
                        e(g.yBottom, h),
                        k = 999 + Math.abs(m),
                        k = Math.min(Math.max(-k, g.plotY), d.len + k),
                        l = g.plotX + C,
                        n = z,
                        p = Math.min(k, m),
                        w, f = Math.max(k, m) - p;
                    q && Math.abs(f) < q && (f = q, w = !d.reversed && !g.negative || d.reversed && g.negative, g.y === b && a.dataMax <= b && d.min < b && (w = !w), p = Math.abs(p - h) > q ? m - q : h - (w ? q : 0));
                    g.barX = l;
                    g.pointWidth = t;
                    g.tooltipPos = c.inverted ? [d.len + d.pos - c.plotLeft - k, a.xAxis.len - l - n / 2, f] : [l + n / 2, k + d.pos - c.plotTop, f];
                    g.shapeType = "rect";
                    g.shapeArgs = a.crispCol.apply(a, g.isNull ? [l, h, n, 0] : [l, p, n, f])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            drawPoints: function () {
                var a = this,
                    c = this.chart,
                    e = a.options,
                    k = c.renderer,
                    d = e.animationLimit || 250,
                    b;
                A(a.points, function (h) {
                    var l = h.graphic;
                    if (q(h.plotY) && null !== h.y) {
                        b = h.shapeArgs;
                        if (l) l[c.pointCount < d ? "animate" : "attr"](g(b));
                        else h.graphic = l = k[h.shapeType](b).add(h.group || a.group);
                        e.borderRadius && l.attr({
                            r: e.borderRadius
                        });
                        l.addClass(h.getClassName(), !0)
                    } else l && (h.graphic = l.destroy())
                })
            },
            animate: function (a) {
                var c =
                    this,
                    e = this.yAxis,
                    g = c.options,
                    d = this.chart.inverted,
                    b = {},
                    h = d ? "translateX" : "translateY",
                    k;
                p && (a ? (b.scaleY = .001, a = Math.min(e.pos + e.len, Math.max(e.pos, e.toPixels(g.threshold))), d ? b.translateX = a - e.len : b.translateY = a, c.group.attr(b)) : (k = c.group.attr(h), c.group.animate({
                    scaleY: 1
                }, D(z(c.options.animation), {
                    step: function (a, d) {
                        b[h] = k + d.pos * (e.pos - k);
                        c.group.attr(b)
                    }
                })), c.animate = null))
            },
            remove: function () {
                var a = this,
                    c = a.chart;
                c.hasRendered && A(c.series, function (c) {
                    c.type === a.type && (c.isDirty = !0)
                });
                k.prototype.remove.apply(a,
                    arguments)
            }
        })
    })(L);
    (function (a) {
        a = a.seriesType;
        a("bar", "column", null, {
            inverted: !0
        })
    })(L);
    (function (a) {
        var z = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0,
            findNearestPointBy: "xy",
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e \x3cspan class\x3d"highcharts-header"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            drawGraph: function () {
                this.options.lineWidth && z.prototype.drawGraph.call(this)
            }
        })
    })(L);
    (function (a) {
        var z = a.deg2rad,
            A = a.isNumber,
            D = a.pick,
            q = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function () {
                var a = this.options,
                    e = this.chart,
                    k = 2 * (a.slicedOffset || 0),
                    t = e.plotWidth - 2 * k,
                    e = e.plotHeight - 2 * k,
                    p = a.center,
                    p = [D(p[0], "50%"), D(p[1], "50%"), a.size || "100%", a.innerSize || 0],
                    l = Math.min(t, e),
                    c, n;
                for (c = 0; 4 > c; ++c) n = p[c], a = 2 > c || 2 === c && /%$/.test(n), p[c] = q(n, [t, e, l, p[2]][c]) + (a ? k : 0);
                p[3] > p[2] && (p[3] = p[2]);
                return p
            },
            getStartAndEndRadians: function (a, e) {
                a = A(a) ? a : 0;
                e = A(e) && e > a && 360 > e - a ? e : a + 360;
                return {
                    start: z * (a + -90),
                    end: z * (e + -90)
                }
            }
        }
    })(L);
    (function (a) {
        var z = a.addEvent,
            A = a.CenteredSeriesMixin,
            D = a.defined,
            q = a.each,
            g = a.extend,
            e = A.getStartAndEndRadians,
            k = a.inArray,
            t = a.noop,
            p = a.pick,
            l = a.Point,
            c = a.Series,
            n = a.seriesType,
            y = a.setAnimation;
        n("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                distance: 30,
                enabled: !0,
                formatter: function () {
                    return this.point.isNull ? void 0 : this.point.name
                },
                x: 0
            },
            ignoreHiddenPoint: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            }
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
            animate: function (a) {
                var b = this,
                    c = b.points,
                    d = b.startAngleRad;
                a || (q(c, function (a) {
                    var c = a.graphic,
                        e = a.shapeArgs;
                    c && (c.attr({
                        r: a.startR || b.center[3] / 2,
                        start: d,
                        end: d
                    }), c.animate({
                        r: e.r,
                        start: e.start,
                        end: e.end
                    }, b.options.animation))
                }), b.animate = null)
            },
            updateTotals: function () {
                var a, b = 0,
                    c = this.points,
                    e = c.length,
                    g, k = this.options.ignoreHiddenPoint;
                for (a = 0; a < e; a++) g = c[a], b += k && !g.visible ? 0 : g.isNull ? 0 : g.y;
                this.total = b;
                for (a = 0; a < e; a++) g = c[a], g.percentage = 0 < b && (g.visible || !k) ? g.y / b * 100 : 0, g.total = b
            },
            generatePoints: function () {
                c.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            translate: function (a) {
                this.generatePoints();
                var b = 0,
                    c = this.options,
                    d = c.slicedOffset,
                    g = d + (c.borderWidth || 0),
                    k, l, n, q = e(c.startAngle, c.endAngle),
                    u = this.startAngleRad = q.start,
                    q = (this.endAngleRad = q.end) - u,
                    t = this.points,
                    v, y = c.dataLabels.distance,
                    c = c.ignoreHiddenPoint,
                    x, z = t.length,
                    f;
                a || (this.center = a = this.getCenter());
                this.getX = function (b, c, d) {
                    n = Math.asin(Math.min((b - a[1]) / (a[2] / 2 + d.labelDistance), 1));
                    return a[0] + (c ? -1 : 1) * Math.cos(n) * (a[2] / 2 + d.labelDistance)
                };
                for (x = 0; x < z; x++) {
                    f = t[x];
                    f.labelDistance = p(f.options.dataLabels && f.options.dataLabels.distance,
                        y);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, f.labelDistance);
                    k = u + b * q;
                    if (!c || f.visible) b += f.percentage / 100;
                    l = u + b * q;
                    f.shapeType = "arc";
                    f.shapeArgs = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: Math.round(1E3 * k) / 1E3,
                        end: Math.round(1E3 * l) / 1E3
                    };
                    n = (l + k) / 2;
                    n > 1.5 * Math.PI ? n -= 2 * Math.PI : n < -Math.PI / 2 && (n += 2 * Math.PI);
                    f.slicedTranslation = {
                        translateX: Math.round(Math.cos(n) * d),
                        translateY: Math.round(Math.sin(n) * d)
                    };
                    l = Math.cos(n) * a[2] / 2;
                    v = Math.sin(n) * a[2] / 2;
                    f.tooltipPos = [a[0] + .7 * l, a[1] + .7 * v];
                    f.half = n < -Math.PI /
                        2 || n > Math.PI / 2 ? 1 : 0;
                    f.angle = n;
                    k = Math.min(g, f.labelDistance / 5);
                    f.labelPos = [a[0] + l + Math.cos(n) * f.labelDistance, a[1] + v + Math.sin(n) * f.labelDistance, a[0] + l + Math.cos(n) * k, a[1] + v + Math.sin(n) * k, a[0] + l, a[1] + v, 0 > f.labelDistance ? "center" : f.half ? "right" : "left", n]
                }
            },
            drawGraph: null,
            drawPoints: function () {
                var a = this,
                    b = a.chart.renderer,
                    c, e, k;
                q(a.points, function (d) {
                    e = d.graphic;
                    d.isNull ? e && (d.graphic = e.destroy()) : (k = d.shapeArgs, c = d.getTranslate(), e ? e.setRadialReference(a.center).animate(g(k, c)) : (d.graphic = e = b[d.shapeType](k).setRadialReference(a.center).attr(c).add(a.group),
                        d.visible || e.attr({
                            visibility: "hidden"
                        })), e.addClass(d.getClassName()))
                })
            },
            searchPoint: t,
            sortByAngle: function (a, b) {
                a.sort(function (a, c) {
                    return void 0 !== a.angle && (c.angle - a.angle) * b
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            getCenter: A.getCenter,
            getSymbol: t
        }, {
            init: function () {
                l.prototype.init.apply(this, arguments);
                var a = this,
                    b;
                a.name = p(a.name, "Slice");
                b = function (b) {
                    a.slice("select" === b.type)
                };
                z(a, "select", b);
                z(a, "unselect", b);
                return a
            },
            isValid: function () {
                return a.isNumber(this.y, !0) && 0 <=
                    this.y
            },
            setVisible: function (a, b) {
                var c = this,
                    d = c.series,
                    e = d.chart,
                    g = d.options.ignoreHiddenPoint;
                b = p(b, g);
                a !== c.visible && (c.visible = c.options.visible = a = void 0 === a ? !c.visible : a, d.options.data[k(c, d.data)] = c.options, q(["graphic", "dataLabel", "connector", "shadowGroup"], function (b) {
                    if (c[b]) c[b][a ? "show" : "hide"](!0)
                }), c.legendItem && e.legend.colorizeItem(c, a), a || "hover" !== c.state || c.setState(""), g && (d.isDirty = !0), b && e.redraw())
            },
            slice: function (a, b, c) {
                var d = this.series;
                y(c, d.chart);
                p(b, !0);
                this.sliced = this.options.sliced =
                    D(a) ? a : !this.sliced;
                d.options.data[k(this, d.data)] = this.options;
                this.graphic.animate(this.getTranslate())
            },
            getTranslate: function () {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            },
            haloPath: function (a) {
                var b = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(b.x, b.y, b.r + a, b.r + a, {
                    innerR: this.shapeArgs.r,
                    start: b.start,
                    end: b.end
                })
            }
        })
    })(L);
    (function (a) {
        var z = a.addEvent,
            A = a.arrayMax,
            D = a.defined,
            q = a.each,
            g = a.extend,
            e = a.format,
            k = a.map,
            t = a.merge,
            p = a.noop,
            l = a.pick,
            c = a.relativeLength,
            n = a.Series,
            y = a.seriesTypes,
            d = a.stableSort;
        a.distribute = function (a, c) {
            function b(a, b) {
                return a.target - b.target
            }
            var e, g = !0,
                h = a,
                n = [],
                p;
            p = 0;
            for (e = a.length; e--;) p += a[e].size;
            if (p > c) {
                d(a, function (a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (p = e = 0; p <= c;) p += a[e].size, e++;
                n = a.splice(e - 1, a.length)
            }
            d(a, b);
            for (a = k(a, function (a) {
                    return {
                        size: a.size,
                        targets: [a.target],
                        align: l(a.align, .5)
                    }
                }); g;) {
                for (e = a.length; e--;) g = a[e], p = (Math.min.apply(0, g.targets) + Math.max.apply(0, g.targets)) /
                    2, g.pos = Math.min(Math.max(0, p - g.size * g.align), c - g.size);
                e = a.length;
                for (g = !1; e--;) 0 < e && a[e - 1].pos + a[e - 1].size > a[e].pos && (a[e - 1].size += a[e].size, a[e - 1].targets = a[e - 1].targets.concat(a[e].targets), a[e - 1].align = .5, a[e - 1].pos + a[e - 1].size > c && (a[e - 1].pos = c - a[e - 1].size), a.splice(e, 1), g = !0)
            }
            e = 0;
            q(a, function (a) {
                var b = 0;
                q(a.targets, function () {
                    h[e].pos = a.pos + b;
                    b += h[e].size;
                    e++
                })
            });
            h.push.apply(h, n);
            d(h, b)
        };
        n.prototype.drawDataLabels = function () {
            function b(a, b) {
                var c = b.filter;
                return c ? (b = c.operator, a = a[c.property],
                    c = c.value, "\x3e" === b && a > c || "\x3c" === b && a < c || "\x3e\x3d" === b && a >= c || "\x3c\x3d" === b && a <= c || "\x3d\x3d" === b && a == c || "\x3d\x3d\x3d" === b && a === c ? !0 : !1) : !0
            }
            var c = this,
                d = c.options,
                g = d.dataLabels,
                k = c.points,
                n, p, y = c.hasRendered || 0,
                u, G, v = l(g.defer, !!d.animation),
                E = c.chart.renderer;
            if (g.enabled || c._hasPointLabels) c.dlProcessOptions && c.dlProcessOptions(g), G = c.plotGroup("dataLabelsGroup", "data-labels", v && !y ? "hidden" : "visible", g.zIndex || 6), v && (G.attr({
                opacity: +y
            }), y || z(c, "afterAnimate", function () {
                c.visible && G.show(!0);
                G[d.animation ? "animate" : "attr"]({
                    opacity: 1
                }, {
                    duration: 200
                })
            })), p = g, q(k, function (d) {
                var h, f = d.dataLabel,
                    k, m, q = d.connector,
                    v = !f,
                    w;
                n = d.dlOptions || d.options && d.options.dataLabels;
                (h = l(n && n.enabled, p.enabled) && !d.isNull) && (h = !0 === b(d, n || g));
                h && (g = t(p, n), k = d.getLabelConfig(), w = g[d.formatPrefix + "Format"] || g.format, u = D(w) ? e(w, k) : (g[d.formatPrefix + "Formatter"] || g.formatter).call(k, g), k = g.rotation, m = {
                    r: g.borderRadius || 0,
                    rotation: k,
                    padding: g.padding,
                    zIndex: 1
                }, a.objectEach(m, function (a, b) {
                    void 0 === a && delete m[b]
                }));
                !f || h && D(u) ? h && D(u) && (f ? m.text = u : (f = d.dataLabel = E[k ? "text" : "label"](u, 0, -9999, g.shape, null, null, g.useHTML, null, "data-label"), f.addClass("highcharts-data-label-color-" + d.colorIndex + " " + (g.className || "") + (g.useHTML ? "highcharts-tracker" : ""))), f.attr(m), f.added || f.add(G), c.alignDataLabel(d, f, g, null, v)) : (d.dataLabel = f = f.destroy(), q && (d.connector = q.destroy()))
            })
        };
        n.prototype.alignDataLabel = function (a, c, d, e, k) {
            var b = this.chart,
                h = b.inverted,
                m = l(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
                n = l(a.plotY, -9999),
                p =
                c.getBBox(),
                q, t = d.rotation,
                w = d.align,
                y = this.visible && (a.series.forceDL || b.isInsidePlot(m, Math.round(n), h) || e && b.isInsidePlot(m, h ? e.x + 1 : e.y + e.height - 1, h)),
                f = "justify" === l(d.overflow, "justify");
            if (y && (q = b.renderer.fontMetrics(void 0, c).b, e = g({
                    x: h ? this.yAxis.len - n : m,
                    y: Math.round(h ? this.xAxis.len - m : n),
                    width: 0,
                    height: 0
                }, e), g(d, {
                    width: p.width,
                    height: p.height
                }), t ? (f = !1, m = b.renderer.rotCorr(q, t), m = {
                        x: e.x + d.x + e.width / 2 + m.x,
                        y: e.y + d.y + {
                            top: 0,
                            middle: .5,
                            bottom: 1
                        }[d.verticalAlign] * e.height
                    }, c[k ? "attr" : "animate"](m).attr({
                        align: w
                    }),
                    n = (t + 720) % 360, n = 180 < n && 360 > n, "left" === w ? m.y -= n ? p.height : 0 : "center" === w ? (m.x -= p.width / 2, m.y -= p.height / 2) : "right" === w && (m.x -= p.width, m.y -= n ? 0 : p.height)) : (c.align(d, null, e), m = c.alignAttr), f ? a.isLabelJustified = this.justifyDataLabel(c, d, m, p, e, k) : l(d.crop, !0) && (y = b.isInsidePlot(m.x, m.y) && b.isInsidePlot(m.x + p.width, m.y + p.height)), d.shape && !t)) c[k ? "attr" : "animate"]({
                anchorX: h ? b.plotWidth - a.plotY : a.plotX,
                anchorY: h ? b.plotHeight - a.plotX : a.plotY
            });
            y || (c.attr({
                y: -9999
            }), c.placed = !1)
        };
        n.prototype.justifyDataLabel =
            function (a, c, d, e, g, k) {
                var b = this.chart,
                    h = c.align,
                    m = c.verticalAlign,
                    l, n, p = a.box ? 0 : a.padding || 0;
                l = d.x + p;
                0 > l && ("right" === h ? c.align = "left" : c.x = -l, n = !0);
                l = d.x + e.width - p;
                l > b.plotWidth && ("left" === h ? c.align = "right" : c.x = b.plotWidth - l, n = !0);
                l = d.y + p;
                0 > l && ("bottom" === m ? c.verticalAlign = "top" : c.y = -l, n = !0);
                l = d.y + e.height - p;
                l > b.plotHeight && ("top" === m ? c.verticalAlign = "bottom" : c.y = b.plotHeight - l, n = !0);
                n && (a.placed = !k, a.align(c, null, g));
                return n
            };
        y.pie && (y.pie.prototype.drawDataLabels = function () {
            var b = this,
                c = b.data,
                d, e = b.chart,
                g = b.options.dataLabels,
                k = l(g.connectorPadding, 10),
                p = l(g.connectorWidth, 1),
                t = e.plotWidth,
                u = e.plotHeight,
                y, v = b.center,
                E = v[2] / 2,
                x = v[1],
                z, f, r, N, K = [[], []],
                B, P, L, Q, O = [0, 0, 0, 0];
            b.visible && (g.enabled || b._hasPointLabels) && (q(c, function (a) {
                a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                    width: "auto"
                }).css({
                    width: "auto",
                    textOverflow: "clip"
                }), a.dataLabel.shortened = !1)
            }), n.prototype.drawDataLabels.apply(b), q(c, function (a) {
                a.dataLabel && a.visible && (K[a.half].push(a), a.dataLabel._pos =
                    null)
            }), q(K, function (c, h) {
                var m, n, p = c.length,
                    C = [],
                    w;
                if (p)
                    for (b.sortByAngle(c, h - .5), 0 < b.maxLabelDistance && (m = Math.max(0, x - E - b.maxLabelDistance), n = Math.min(x + E + b.maxLabelDistance, e.plotHeight), q(c, function (a) {
                            0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, x - E - a.labelDistance), a.bottom = Math.min(x + E + a.labelDistance, e.plotHeight), w = a.dataLabel.getBBox().height || 21, a.positionsIndex = C.push({
                                target: a.labelPos[1] - a.top + w / 2,
                                size: w,
                                rank: a.y
                            }) - 1)
                        }), a.distribute(C, n + w - m)), Q = 0; Q < p; Q++) d = c[Q], n = d.positionsIndex,
                        r = d.labelPos, z = d.dataLabel, L = !1 === d.visible ? "hidden" : "inherit", P = m = r[1], C && D(C[n]) && (void 0 === C[n].pos ? L = "hidden" : (N = C[n].size, P = d.top + C[n].pos)), delete d.positionIndex, B = g.justify ? v[0] + (h ? -1 : 1) * (E + d.labelDistance) : b.getX(P < d.top + 2 || P > d.bottom - 2 ? m : P, h, d), z._attr = {
                            visibility: L,
                            align: r[6]
                        }, z._pos = {
                            x: B + g.x + ({
                                left: k,
                                right: -k
                            }[r[6]] || 0),
                            y: P + g.y - 10
                        }, r.x = B, r.y = P, l(g.crop, !0) && (f = z.getBBox().width, m = null, B - f < k ? (m = Math.round(f - B + k), O[3] = Math.max(m, O[3])) : B + f > t - k && (m = Math.round(B + f - t + k), O[1] = Math.max(m, O[1])),
                            0 > P - N / 2 ? O[0] = Math.max(Math.round(-P + N / 2), O[0]) : P + N / 2 > u && (O[2] = Math.max(Math.round(P + N / 2 - u), O[2])), z.sideOverflow = m)
            }), 0 === A(O) || this.verifyDataLabelOverflow(O)) && (this.placeDataLabels(), p && q(this.points, function (a) {
                var c;
                y = a.connector;
                if ((z = a.dataLabel) && z._pos && a.visible && 0 < a.labelDistance) {
                    L = z._attr.visibility;
                    if (c = !y) a.connector = y = e.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex).add(b.dataLabelsGroup);
                    y[c ? "attr" : "animate"]({
                        d: b.connectorPath(a.labelPos)
                    });
                    y.attr("visibility", L)
                } else y && (a.connector = y.destroy())
            }))
        }, y.pie.prototype.connectorPath = function (a) {
            var b = a.x,
                c = a.y;
            return l(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), c, "C", b, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]]
        }, y.pie.prototype.placeDataLabels = function () {
            q(this.points, function (a) {
                var b = a.dataLabel;
                b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow, b.css({
                    width: b._attr.width +
                        "px",
                    textOverflow: "ellipsis"
                }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({
                    y: -9999
                }))
            }, this)
        }, y.pie.prototype.alignDataLabel = p, y.pie.prototype.verifyDataLabelOverflow = function (a) {
            var b = this.center,
                d = this.options,
                e = d.center,
                g = d.minSize || 80,
                k, l = null !== d.size;
            l || (null !== e[0] ? k = Math.max(b[2] - Math.max(a[1], a[3]), g) : (k = Math.max(b[2] - a[1] - a[3], g), b[0] += (a[3] - a[1]) / 2), null !== e[1] ? k = Math.max(Math.min(k, b[2] - Math.max(a[0], a[2])), g) : (k = Math.max(Math.min(k, b[2] - a[0] -
                a[2]), g), b[1] += (a[0] - a[2]) / 2), k < b[2] ? (b[2] = k, b[3] = Math.min(c(d.innerSize || 0, k), k), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : l = !0);
            return l
        });
        y.column && (y.column.prototype.alignDataLabel = function (a, c, d, e, g) {
            var b = this.chart.inverted,
                h = a.series,
                k = a.dlBox || a.shapeArgs,
                m = l(a.below, a.plotY > l(this.translatedThreshold, h.yAxis.len)),
                p = l(d.inside, !!this.options.stacking);
            k && (e = t(k), 0 > e.y && (e.height += e.y, e.y = 0), k = e.y + e.height - h.yAxis.len, 0 < k && (e.height -= k), b && (e = {
                x: h.yAxis.len - e.y - e.height,
                y: h.xAxis.len - e.x - e.width,
                width: e.height,
                height: e.width
            }), p || (b ? (e.x += m ? 0 : e.width, e.width = 0) : (e.y += m ? e.height : 0, e.height = 0)));
            d.align = l(d.align, !b || p ? "center" : m ? "right" : "left");
            d.verticalAlign = l(d.verticalAlign, b || p ? "middle" : m ? "top" : "bottom");
            n.prototype.alignDataLabel.call(this, a, c, d, e, g);
            a.isLabelJustified && a.contrastColor && a.dataLabel.css({
                color: a.contrastColor
            })
        })
    })(L);
    (function (a) {
        var z = a.Chart,
            A = a.each,
            D = a.objectEach,
            q = a.pick;
        a = a.addEvent;
        a(z.prototype, "render", function () {
            var a = [];
            A(this.labelCollectors || [], function (e) {
                a = a.concat(e())
            });
            A(this.yAxis || [], function (e) {
                e.options.stackLabels && !e.options.stackLabels.allowOverlap && D(e.stacks, function (e) {
                    D(e, function (e) {
                        a.push(e.label)
                    })
                })
            });
            A(this.series || [], function (e) {
                var g = e.options.dataLabels,
                    t = e.dataLabelCollections || ["dataLabel"];
                (g.enabled || e._hasPointLabels) && !g.allowOverlap && e.visible && A(t, function (g) {
                    A(e.points, function (e) {
                        e[g] && (e[g].labelrank = q(e.labelrank, e.shapeArgs && e.shapeArgs.height), a.push(e[g]))
                    })
                })
            });
            this.hideOverlappingLabels(a)
        });
        z.prototype.hideOverlappingLabels =
            function (a) {
                var e = a.length,
                    g, q, p, l, c, n, y, d, b, h = function (a, b, c, d, e, g, h, k) {
                        return !(e > a + c || e + h < a || g > b + d || g + k < b)
                    };
                for (q = 0; q < e; q++)
                    if (g = a[q]) g.oldOpacity = g.opacity, g.newOpacity = 1, g.width || (p = g.getBBox(), g.width = p.width, g.height = p.height);
                a.sort(function (a, b) {
                    return (b.labelrank || 0) - (a.labelrank || 0)
                });
                for (q = 0; q < e; q++)
                    for (p = a[q], g = q + 1; g < e; ++g)
                        if (l = a[g], p && l && p !== l && p.placed && l.placed && 0 !== p.newOpacity && 0 !== l.newOpacity && (c = p.alignAttr, n = l.alignAttr, y = p.parentGroup, d = l.parentGroup, b = 2 * (p.box ? 0 : p.padding ||
                                0), c = h(c.x + y.translateX, c.y + y.translateY, p.width - b, p.height - b, n.x + d.translateX, n.y + d.translateY, l.width - b, l.height - b)))(p.labelrank < l.labelrank ? p : l).newOpacity = 0;
                A(a, function (a) {
                    var b, c;
                    a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function () {
                        a.hide()
                    }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
                })
            }
    })(L);
    (function (a) {
        var z = a.addEvent,
            A = a.Chart,
            D = a.createElement,
            q = a.css,
            g = a.defaultOptions,
            e = a.defaultPlotOptions,
            k = a.each,
            t = a.extend,
            p = a.fireEvent,
            l = a.hasTouch,
            c = a.inArray,
            n = a.isObject,
            y = a.Legend,
            d = a.merge,
            b = a.pick,
            h = a.Point,
            w = a.Series,
            m = a.seriesTypes,
            F = a.svg,
            J;
        J = a.TrackerMixin = {
            drawTrackerPoint: function () {
                var a = this,
                    b = a.chart.pointer,
                    c = function (a) {
                        var c = b.getPointFromEvent(a);
                        void 0 !== c && (b.isDirectTouch = !0, c.onMouseOver(a))
                    };
                k(a.points, function (a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (k(a.trackerGroups, function (e) {
                    if (a[e] && (a[e].addClass("highcharts-tracker").on("mouseover",
                            c).on("mouseout", function (a) {
                            b.onTrackerMouseOut(a)
                        }), l)) a[e].on("touchstart", c)
                }), a._hasTracking = !0)
            },
            drawTrackerGraph: function () {
                var a = this,
                    b = a.options.trackByArea,
                    c = [].concat(b ? a.areaPath : a.graphPath),
                    e = c.length,
                    d = a.chart,
                    g = d.pointer,
                    h = d.renderer,
                    m = d.options.tooltip.snap,
                    f = a.tracker,
                    n, p = function () {
                        if (d.hoverSeries !== a) a.onMouseOver()
                    },
                    q = "rgba(192,192,192," + (F ? .0001 : .002) + ")";
                if (e && !b)
                    for (n = e + 1; n--;) "M" === c[n] && c.splice(n + 1, 0, c[n + 1] - m, c[n + 2], "L"), (n && "M" === c[n] || n === e) && c.splice(n, 0, "L", c[n - 2] +
                        m, c[n - 1]);
                f ? f.attr({
                    d: c
                }) : a.graph && (a.tracker = h.path(c).attr({
                    "stroke-linejoin": "round",
                    visibility: a.visible ? "visible" : "hidden",
                    stroke: q,
                    fill: b ? q : "none",
                    "stroke-width": a.graph.strokeWidth() + (b ? 0 : 2 * m),
                    zIndex: 2
                }).add(a.group), k([a.tracker, a.markerGroup], function (a) {
                    a.addClass("highcharts-tracker").on("mouseover", p).on("mouseout", function (a) {
                        g.onTrackerMouseOut(a)
                    });
                    if (l) a.on("touchstart", p)
                }))
            }
        };
        m.column && (m.column.prototype.drawTracker = J.drawTrackerPoint);
        m.pie && (m.pie.prototype.drawTracker = J.drawTrackerPoint);
        m.scatter && (m.scatter.prototype.drawTracker = J.drawTrackerPoint);
        t(y.prototype, {
            setItemEvents: function (a, b, c) {
                var e = this.chart.renderer.boxWrapper,
                    d = "highcharts-legend-" + (a.series ? "point" : "series") + "-active";
                (c ? b : a.legendGroup).on("mouseover", function () {
                    a.setState("hover");
                    e.addClass(d)
                }).on("mouseout", function () {
                    e.removeClass(d);
                    a.setState()
                }).on("click", function (b) {
                    var c = function () {
                        a.setVisible && a.setVisible()
                    };
                    b = {
                        browserEvent: b
                    };
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : p(a, "legendItemClick",
                        b, c)
                })
            },
            createCheckboxForItem: function (a) {
                a.checkbox = D("input", {
                    type: "checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                z(a.checkbox, "click", function (b) {
                    p(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function () {
                        a.select()
                    })
                })
            }
        });
        t(A.prototype, {
            showResetZoom: function () {
                var a = this,
                    b = g.lang,
                    c = a.options.chart.resetZoomButton,
                    e = c.theme,
                    d = e.states,
                    h = "chart" === c.relativeTo ? null : "plotBox";
                this.resetZoomButton = a.renderer.button(b.resetZoom,
                    null, null,
                    function () {
                        a.zoomOut()
                    }, e, d && d.hover).attr({
                    align: c.position.align,
                    title: b.resetZoomTitle
                }).addClass("highcharts-reset-zoom").add().align(c.position, !1, h)
            },
            zoomOut: function () {
                var a = this;
                p(a, "selection", {
                    resetSelection: !0
                }, function () {
                    a.zoom()
                })
            },
            zoom: function (a) {
                var c, e = this.pointer,
                    d = !1,
                    g;
                !a || a.resetSelection ? (k(this.axes, function (a) {
                    c = a.zoom()
                }), e.initiated = !1) : k(a.xAxis.concat(a.yAxis), function (a) {
                    var b = a.axis;
                    e[b.isXAxis ? "zoomX" : "zoomY"] && (c = b.zoom(a.min, a.max), b.displayBtn && (d = !0))
                });
                g = this.resetZoomButton;
                d && !g ? this.showResetZoom() : !d && n(g) && (this.resetZoomButton = g.destroy());
                c && this.redraw(b(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            },
            pan: function (a, b) {
                var c = this,
                    e = c.hoverPoints,
                    d;
                e && k(e, function (a) {
                    a.setState()
                });
                k("xy" === b ? [1, 0] : [1], function (b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var e = b.horiz,
                        g = a[e ? "chartX" : "chartY"],
                        e = e ? "mouseDownX" : "mouseDownY",
                        f = c[e],
                        h = (b.pointRange || 0) / 2,
                        k = b.getExtremes(),
                        l = b.toValue(f - g, !0) + h,
                        h = b.toValue(f + b.len - g, !0) - h,
                        m = h < l,
                        f = m ? h : l,
                        l =
                        m ? l : h,
                        h = Math.min(k.dataMin, b.toValue(b.toPixels(k.min) - b.minPixelPadding)),
                        m = Math.max(k.dataMax, b.toValue(b.toPixels(k.max) + b.minPixelPadding)),
                        n;
                    n = h - f;
                    0 < n && (l += n, f = h);
                    n = l - m;
                    0 < n && (l = m, f -= n);
                    b.series.length && f !== k.min && l !== k.max && (b.setExtremes(f, l, !1, !1, {
                        trigger: "pan"
                    }), d = !0);
                    c[e] = g
                });
                d && c.redraw(!1);
                q(c.container, {
                    cursor: "move"
                })
            }
        });
        t(h.prototype, {
            select: function (a, e) {
                var d = this,
                    g = d.series,
                    h = g.chart;
                a = b(a, !d.selected);
                d.firePointEvent(a ? "select" : "unselect", {
                    accumulate: e
                }, function () {
                    d.selected = d.options.selected =
                        a;
                    g.options.data[c(d, g.data)] = d.options;
                    d.setState(a && "select");
                    e || k(h.getSelectedPoints(), function (a) {
                        a.selected && a !== d && (a.selected = a.options.selected = !1, g.options.data[c(a, g.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            },
            onMouseOver: function (a) {
                var b = this.series.chart,
                    c = b.pointer;
                a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
                c.runPointActions(a, this)
            },
            onMouseOut: function () {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                k(a.hoverPoints || [], function (a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            },
            importEvents: function () {
                if (!this.hasImportedEvents) {
                    var b = this,
                        c = d(b.series.options.point, b.options).events;
                    b.events = c;
                    a.objectEach(c, function (a, c) {
                        z(b, c, a)
                    });
                    this.hasImportedEvents = !0
                }
            },
            setState: function (a, c) {
                var d = Math.floor(this.plotX),
                    g = this.plotY,
                    h = this.series,
                    k = h.options.states[a] || {},
                    l = e[h.type].marker && h.options.marker,
                    m = l && !1 === l.enabled,
                    f = l && l.states && l.states[a] || {},
                    n = !1 === f.enabled,
                    p = h.stateMarkerGraphic,
                    q = this.marker || {},
                    t = h.chart,
                    w = h.halo,
                    y, z = l && h.markerAttribs;
                a = a || "";
                if (!(a === this.state && !c || this.selected && "select" !== a || !1 === k.enabled || a && (n || m && !1 === f.enabled) || a && q.states && q.states[a] && !1 === q.states[a].enabled)) {
                    z && (y = h.markerAttribs(this, a));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), y && this.graphic.animate(y, b(t.options.chart.animation, f.animation, l.animation)), p && p.hide();
                    else {
                        if (a && f)
                            if (l = q.symbol || h.symbol, p && p.currentSymbol !== l && (p = p.destroy()), p) p[c ? "animate" :
                                "attr"]({
                                x: y.x,
                                y: y.y
                            });
                            else l && (h.stateMarkerGraphic = p = t.renderer.symbol(l, y.x, y.y, y.width, y.height).add(h.markerGroup), p.currentSymbol = l);
                        p && (p[a && t.isInsidePlot(d, g, t.inverted) ? "show" : "hide"](), p.element.point = this)
                    }(d = k.halo) && d.size ? (w || (h.halo = w = t.renderer.path().add((this.graphic || p).parentGroup)), w[c ? "animate" : "attr"]({
                        d: this.haloPath(d.size)
                    }), w.attr({
                        "class": "highcharts-halo highcharts-color-" + b(this.colorIndex, h.colorIndex)
                    }), w.point = this) : w && w.point && w.point.haloPath && w.animate({
                        d: w.point.haloPath(0)
                    });
                    this.state = a
                }
            },
            haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        t(w.prototype, {
            onMouseOver: function () {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && p(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function () {
                var a = this.options,
                    b = this.chart,
                    c = b.tooltip,
                    d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && p(this, "mouseOut");
                !c || this.stickyTracking ||
                    c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            },
            setState: function (a) {
                var b = this;
                a = a || "";
                b.state !== a && (k([b.group, b.markerGroup, b.dataLabelsGroup], function (c) {
                    c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
                }), b.state = a)
            },
            setVisible: function (a, b) {
                var c = this,
                    d = c.chart,
                    e = c.legendItem,
                    g, h = d.options.chart.ignoreHiddenSeries,
                    l = c.visible;
                g = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !l : a) ? "show" : "hide";
                k(["group", "dataLabelsGroup",
"markerGroup", "tracker", "tt"], function (a) {
                    if (c[a]) c[a][g]()
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
                e && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && k(d.series, function (a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                k(c.linkedSeries, function (b) {
                    b.setVisible(a, !1)
                });
                h && (d.isDirtyBox = !0);
                !1 !== b && d.redraw();
                p(c, g)
            },
            show: function () {
                this.setVisible(!0)
            },
            hide: function () {
                this.setVisible(!1)
            },
            select: function (a) {
                this.selected = a = void 0 === a ? !this.selected :
                    a;
                this.checkbox && (this.checkbox.checked = a);
                p(this, a ? "select" : "unselect")
            },
            drawTracker: J.drawTrackerGraph
        })
    })(L);
    (function (a) {
        var z = a.Chart,
            A = a.each,
            D = a.inArray,
            q = a.isArray,
            g = a.isObject,
            e = a.pick,
            k = a.splat;
        z.prototype.setResponsive = function (e) {
            var g = this.options.responsive,
                k = [],
                c = this.currentResponsive;
            g && g.rules && A(g.rules, function (c) {
                void 0 === c._id && (c._id = a.uniqueKey());
                this.matchResponsiveRule(c, k, e)
            }, this);
            var n = a.merge.apply(0, a.map(k, function (c) {
                    return a.find(g.rules, function (a) {
                        return a._id ===
                            c
                    }).chartOptions
                })),
                k = k.toString() || void 0;
            k !== (c && c.ruleIds) && (c && this.update(c.undoOptions, e), k ? (this.currentResponsive = {
                ruleIds: k,
                mergedOptions: n,
                undoOptions: this.currentOptions(n)
            }, this.update(n, e)) : this.currentResponsive = void 0)
        };
        z.prototype.matchResponsiveRule = function (a, g) {
            var k = a.condition;
            (k.callback || function () {
                return this.chartWidth <= e(k.maxWidth, Number.MAX_VALUE) && this.chartHeight <= e(k.maxHeight, Number.MAX_VALUE) && this.chartWidth >= e(k.minWidth, 0) && this.chartHeight >= e(k.minHeight, 0)
            }).call(this) &&
                g.push(a._id)
        };
        z.prototype.currentOptions = function (e) {
            function p(c, e, l, d) {
                var b;
                a.objectEach(c, function (a, c) {
                    if (!d && -1 < D(c, ["series", "xAxis", "yAxis"]))
                        for (a = k(a), l[c] = [], b = 0; b < a.length; b++) e[c][b] && (l[c][b] = {}, p(a[b], e[c][b], l[c][b], d + 1));
                    else g(a) ? (l[c] = q(a) ? [] : {}, p(a, e[c] || {}, l[c], d + 1)) : l[c] = e[c] || null
                })
            }
            var l = {};
            p(e, this.options, l, 0);
            return l
        }
    })(L);
    return L
});
