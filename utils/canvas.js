/* eslint-disable */
// prettier-ignore
function t(t){return Object.prototype.toString.call(t)}
function e(e) {
  return Array.isArray ? Array.isArray(e) : '[object Array]' === t(e);
}
function o(e) {
  return ['[object Function]', '[object GeneratorFunction]', '[object AsyncFunction]'].includes(t(e));
}
function i(t) {
  return null == t;
}
function n(e) {
  return '[object Number]' === t(e);
}
function s(t) {
  const e = typeof t;
  return !!t && ('function' === e || 'object' === e);
}
function r(e) {
  return '[object String]' === t(e);
}
function a(t) {
  return !!r(t) && /^(?:\/|\.\/|\.\.\/)[\w/.-]*$/.test(t.trim());
}
function h(t) {
  return !!r(t) && /^(?:\w+:)?\/\/(?:[^\s.]+\.\S{2}|localhost)\S*$/.test(t);
}
function c(t, e) {
  if (n(t)) {
    const { x: o, y: i, width: n, height: s, ctx: r } = e,
      a = o + n / 2,
      h = i + s / 2;
    r.translate(a, h), r.rotate((t * Math.PI) / 180), r.translate(-a, -h);
  }
}
function l(t) {
  let { x: e, y: o, w: i, h: n, r: s, ctx: r } = t;
  const a = Math.min(i, n);
  s > a / 2 && (s = a / 2),
    r.beginPath(),
    r.moveTo(e + s, o),
    r.arcTo(e + i, o, e + i, o + n, s),
    r.arcTo(e + i, o + n, e, o + n, s),
    r.arcTo(e, o + n, e, o, s),
    r.arcTo(e, o, e + i, o, s),
    r.closePath();
}
function d(t, e) {
  if (!s(t)) return t;
  if (!o(e)) throw new TypeError('iterator 应该是一个函数');
  const i = {};
  return (
    Object.keys(t).forEach((o) => {
      const [n, s] = e(o, t[o]);
      i[n] = s;
    }),
    i
  );
}
function f(t, o) {
  return s(t)
    ? e(o) && o.length
      ? o.reduce((e, o) => (Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]), e), {})
      : {}
    : t;
}
class u {
  max;
  cache = new Map();
  constructor(t) {
    this.max = Number.parseInt(t) || 1 / 0;
  }
  has(t) {
    return this.cache.has(t);
  }
  remove(t) {
    this.has(t) && this.cache.delete(t);
  }
  get(t) {
    if (!this.has(t)) return null;
    const e = this.cache.get(t);
    return this.cache.delete(t), this.cache.set(t, e), e;
  }
  set(t, e) {
    if (this.has(t)) this.cache.delete(t);
    else if (this.cache.size >= this.max) {
      const t = this.cache.keys().next().value;
      t && this.cache.delete(t);
    }
    this.cache.set(t, e);
  }
  clear() {
    this.cache.clear();
  }
}
const g = (function (t, e) {
    function i(...n) {
      const s = o(e?.key) ? e.key(...n) : JSON.stringify(n),
        r = i.cache.get(s);
      if (r && (!r.expires || r.expires > Date.now())) return r.value;
      const a = t(...n),
        h = Number.parseInt(e?.expires) || null;
      return i.cache.set(s, { value: a, expires: h ? Date.now() + h : null }), a;
    }
    return (i.cache = new u(e?.lruMax)), i;
  })(
    (t, e) =>
      new Promise((o, i) => {
        if (a(t)) {
          const n = e.createImage();
          (n.onload = () => {
            o({ image: n, width: n.width, height: n.height });
          }),
            (n.onerror = i),
            (n.src = t);
        } else if (h(t)) {
          (t.startsWith('cloud://') ? wx.cloud.downloadFile : wx.downloadFile)({
            url: t,
            fileID: t,
            success: (t) => {
              if (200 !== t.statusCode) return void i(t);
              const n = e.createImage();
              (n.onload = () => {
                o({ image: n, width: n.width, height: n.height });
              }),
                (n.onerror = i),
                (n.src = t.tempFilePath);
            },
            fail: i,
          });
        } else if (
          r((n = t)) &&
          /^data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z0-9-.!#$%*+{}|~`]+=[a-z0-9-.!#$%*+{}|~`]+)*)?(?:;base64)?,[\w!$&',()*+;=\-.~:@/?%\s]*$/i.test(
            n.trim(),
          )
        ) {
          const [, n, s] = /data:image\/(\w+);base64,(.*)/.exec(t) || [],
            r = `${wx.env.USER_DATA_PATH}/${Date.now()}.${n}`,
            a = wx.base64ToArrayBuffer(s.replace(/[\r\n]/g, ''));
          wx.getFileSystemManager().writeFile({
            filePath: r,
            data: a,
            encoding: 'binary',
            success: () => {
              const t = e.createImage();
              (t.onload = () => {
                o({ image: t, width: t.width, height: t.height });
              }),
                (t.onerror = i),
                (t.src = r);
            },
            fail: i,
          });
        } else i(t);
        var n;
      }),
    { lruMax: 20, key: (t) => t },
  ),
  p = {
    lineWidth(t, e) {
      n(t) && t >= 0 && (e.lineWidth = t);
    },
    lineDash(t, o) {
      e(t) && t.every(n) && o.setLineDash(t);
    },
    lineDashOffset(t, e) {
      n(t) && (e.lineDashOffset = t);
    },
    lineCap(t, e) {
      t && ['butt', 'round', 'square'].includes(t) && (e.lineCap = t);
    },
    lineJoin(t, e) {
      t && ['round', 'bevel', 'miter'].includes(t) && (e.lineJoin = t);
    },
    miterLimit(t, e) {
      n(t) && t >= 0 && (e.miterLimit = t);
    },
    fillStyle(t, e) {
      (r(t) || s(t)) && (e.fillStyle = t);
    },
    strokeStyle(t, e) {
      (r(t) || s(t)) && (e.strokeStyle = t);
    },
    shadowColor(t, e) {
      r(t) && (e.shadowColor = t);
    },
    shadowBlur(t, e) {
      n(t) && t >= 0 && (e.shadowBlur = t);
    },
    shadowOffsetX(t, e) {
      n(t) && (e.shadowOffsetX = t);
    },
    shadowOffsetY(t, e) {
      n(t) && (e.shadowOffsetY = t);
    },
    wordSpacing(t, e) {
      n(t) && (e.wordSpacing = `${t}px`);
    },
    letterSpacing(t, e) {
      n(t) && (e.letterSpacing = `${t}px`);
    },
    textBaseLine(t, e) {
      t && ['alphabetic', 'bottom', 'hanging', 'ideographic', 'middle', 'top'].includes(t) && (e.textBaseline = t);
    },
    filter(t, e) {
      r(t) && (e.filter = t);
    },
  };
function w(t, e) {
  for (const o in t) Object.prototype.hasOwnProperty.call(t, o) && p[o] && p[o](t[o], e);
  const o = Math.max(Number.parseFloat(t.borderSize) || 0, 0);
  return (
    o &&
      ('dashed' !== t.borderStyle || t.borderDash
        ? 'solid' === t.borderStyle && t.borderDash && e.setLineDash([])
        : e.setLineDash([2 * o, o])),
    t.fontStyle &&
      t.fontWeight &&
      t.fontSize &&
      t.fontFamily &&
      (e.font = `${t.fontStyle} ${t.fontWeight} ${t.fontSize}px '${t.fontFamily}'`),
    o
  );
}
const x = {
    async prepare(t, { canvas: e }) {
      const { src: o } = t;
      r(o) || console.error(`图片链接错误，当前为：${o}`);
      const { image: i, width: s, height: a } = await g(o, e);
      return {
        ...t,
        image: i,
        imageWidth: s,
        imageHeight: a,
        shadowBlur: n(t.shadowBlur) ? t.shadowBlur : 0,
        shadowColor: r(t.shadowColor) ? t.shadowColor : '#00000000',
        shadowOffsetX: n(t.shadowOffsetX) ? t.shadowOffsetX : 0,
        shadowOffsetY: n(t.shadowOffsetY) ? t.shadowOffsetY : 0,
      };
    },
    calculate(t, e) {
      const { width: s, height: r } = e;
      let { imageWidth: a, imageHeight: h, borderRadius: c, mode: l } = t;
      const {
        top: u,
        right: g,
        bottom: p,
        left: w,
        width: x,
        height: m,
      } = d(f(t, ['width', 'height', 'top', 'right', 'bottom', 'left']), (t, e) => [
        t,
        n(e) ? e : o(e) ? e({ containerWidth: s, containerHeight: r, selfWidth: a, selfHeight: h }) : void 0,
      ]);
      let {
          sourceHeight: y,
          sourceWidth: b,
          sourceX: v,
          sourceY: W,
        } = d(
          { sourceHeight: t.sourceHeight, sourceWidth: t.sourceWidth, sourceX: t.sourceX, sourceY: t.sourceY },
          (t, e) => [
            t,
            n(e)
              ? e
              : o(e)
              ? e({ containerWidth: s, containerHeight: r, selfWidth: a, selfHeight: h })
              : 'sourceHeight' === t
              ? h
              : 'sourceWidth' === t
              ? a
              : 0,
          ],
        ),
        O = 0,
        S = 0,
        P = 0,
        C = 0;
      const F = b / y;
      if (x) {
        P = x;
        m || (C = y * (P / b));
      }
      if (m) {
        C = m;
        x || (P = b * (C / y));
      }
      x || m || ((P = b), (C = y)), i(w) ? i(g) || (O = s - g - P) : (O = w), i(u) ? i(p) || (S = r - p - C) : (S = u);
      let Y = 0,
        H = 0;
      if (x && m)
        if ('aspectFill' === l) {
          const t = P / C;
          F < 1 ? (y = b / t) : (b = y * t);
        } else if ('aspectFit' === l)
          if (F < 1) {
            const t = C * F;
            (Y = (P - t) / 2), (O += Y), (P = t);
          } else {
            const t = P / F;
            (H = (C - t) / 2), (S += H), (C = t);
          }
      return (
        (c =
          n(c) && c >= 0
            ? c
            : o(c)
            ? c({ containerHeight: e.height, containerWidth: e.width, selfHeight: h, selfWidth: a })
            : 0),
        {
          ...t,
          sourceHeight: y,
          sourceWidth: b,
          sourceX: v,
          sourceY: W,
          x: O,
          y: S,
          width: P,
          height: C,
          borderRadius: c,
          borderOffsetX: Y,
          borderOffsetY: H,
        }
      );
    },
    render(t, { ctx: e, width: o, height: i }) {
      let {
        x: s,
        y: r,
        width: a,
        height: h,
        border: c,
        borderRadius: d,
        shadowBlur: f,
        shadowColor: u,
        shadowOffsetX: g,
        shadowOffsetY: p,
        image: x,
        sourceHeight: m,
        sourceWidth: y,
        sourceX: b,
        sourceY: v,
        flipX: W,
        flipY: O,
        borderOffsetX: S,
        borderOffsetY: P,
      } = t;
      e.translate(W ? o : 0, O ? i : 0), e.scale(W ? -1 : 1, O ? -1 : 1), W && (s = o - s - a), O && (r = i - r - h);
      let { lineWidth: C } = c || {};
      (C = n(C) ? C : 0),
        d || (c && C)
          ? (e.save(),
            l({ x: s - C / 2 - S + g, y: r - C / 2 - P + p, w: a + C + 2 * S, h: h + C + 2 * P, r: d, ctx: e }),
            w({ filter: `blur(${f}px)`, fillStyle: u }, e),
            e.fill(),
            e.restore(),
            l({ x: s - C / 2 - S, y: r - C / 2 - P, w: a + C + 2 * S, h: h + C + 2 * P, r: d, ctx: e }),
            e.clip())
          : w({ shadowBlur: f, shadowColor: u, shadowOffsetX: g, shadowOffsetY: p }, e),
        e.drawImage(x, b, v, y, m, s, r, a, h),
        c && C && (w({ ...c, strokeStyle: c.lineColor, shadowColor: '#00000000' }, e), e.stroke());
    },
  },
  m = {
    prepare: (t) => t,
    calculate(t, { width: e, height: i }) {
      let { lineWidth: s } = t;
      s = n(s) ? s : 1;
      let r = 1 / 0,
        a = 1 / 0,
        h = -1 / 0,
        c = -1 / 0;
      const l = t.points.reduce((t, n) => {
        let [s, l] = n;
        return (
          (s = o(s) ? s({ containerWidth: e, containerHeight: i }) : Number.parseFloat(s)),
          (l = o(l) ? l({ containerWidth: e, containerHeight: i }) : Number.parseFloat(l)),
          Number.isNaN(s) ||
            Number.isNaN(l) ||
            (t.push([s, l]), (r = Math.min(r, s)), (a = Math.min(a, l)), (h = Math.max(h, s)), (c = Math.max(c, l))),
          t
        );
      }, []);
      return { ...t, points: l, width: h - r + s, height: c - a + s, x: r - s / 2, y: a - s / 2 };
    },
    render(t, { ctx: e }) {
      const {
        points: o,
        lineCap: i,
        lineColor: n,
        lineDash: s,
        lineDashOffset: r,
        lineJoin: a,
        lineWidth: h,
        miterLimit: c,
        shadowBlur: l,
        shadowColor: d,
        shadowOffsetX: f,
        shadowOffsetY: u,
      } = t;
      if (o.length < 2) return void console.error(`line points 参数错误，当前 points 计算后为：${o}`);
      w(
        {
          lineCap: i,
          strokeStyle: n,
          lineDash: s,
          lineDashOffset: r,
          lineJoin: a,
          lineWidth: h,
          miterLimit: c,
          shadowBlur: l,
          shadowColor: d,
          shadowOffsetX: f,
          shadowOffsetY: u,
        },
        e,
      );
      const [g, ...p] = o;
      e.beginPath(), e.moveTo(...g), p.forEach((t) => e.lineTo(...t)), e.stroke(), e.closePath();
    },
  },
  y = {
    prepare: (t) => t,
    calculate(t, e) {
      const { width: s, height: r } = e,
        {
          top: a,
          right: h,
          bottom: c,
          left: l,
          width: u,
          height: g,
        } = d(f(t, ['top', 'right', 'bottom', 'left', 'width', 'height']), (t, e) => [
          t,
          n(e) ? e : o(e) ? e({ containerWidth: s, containerHeight: r }) : void 0,
        ]);
      let p = 0,
        w = 0,
        x = 0,
        m = 0;
      if (u) (x = u), i(l) ? i(h) || (p = s - h - x) : (p = l);
      else {
        p = l || 0;
        x = s - p - (h || 0);
      }
      if (i(g)) {
        w = a || 0;
        m = r - w - (c || 0);
      } else (m = g), i(a) ? i(c) || (w = r - c - m) : (w = a);
      let { borderRadius: y } = t;
      return (
        (y =
          n(y) && y >= 0
            ? y
            : o(y)
            ? y({ containerHeight: e.height, containerWidth: e.width, selfHeight: m, selfWidth: x })
            : 0),
        { ...t, x: p, y: w, width: x, height: m, borderRadius: y }
      );
    },
    render(t, { ctx: e }) {
      const {
        x: o,
        y: i,
        width: a,
        height: h,
        backgroundColor: c,
        border: d,
        borderRadius: f,
        shadowBlur: u,
        shadowColor: g,
        shadowOffsetX: p,
        shadowOffsetY: x,
      } = t;
      let { lineWidth: m } = d || {};
      (m = n(m) ? m : 0),
        e.save(),
        w({ shadowBlur: u, shadowColor: g, shadowOffsetX: p, shadowOffsetY: x, fillStyle: c }, e),
        l({ x: o - m / 2, y: i - m / 2, w: a + m, h: h + m, r: f, ctx: e }),
        (r(c) || s(c)) && e.fill(),
        e.restore(),
        d && m && (e.clip(), w({ ...d, strokeStyle: d.lineColor }, e), e.stroke());
    },
  },
  b = {
    async prepare(t) {
      const { fontFamily: o, fontFamilySrc: i, content: n } = t,
        s = [];
      o && i && s.push([o, i]),
        e(n) &&
          n.forEach((t) => {
            t.fontFamily && t.fontFamilySrc && s.push([t.fontFamily, t.fontFamilySrc]);
          });
      const c = [];
      return (
        s.forEach(([t, e]) => {
          c.push(
            (function (t, e) {
              return r(t) && (h(e) || a(e))
                ? new Promise((o, i) => {
                    wx.loadFontFace({
                      family: t,
                      source: `url("${e}")`,
                      global: !0,
                      scopes: ['webview', 'native', 'skyline'],
                      success() {
                        o(!0);
                      },
                      fail(t) {
                        i(t);
                      },
                    });
                  })
                : Promise.reject(new Error('字体文件链接错误！'));
            })(t, e),
          );
        }),
        await Promise.allSettled(c),
        t
      );
    },
    calculate(t, e, { ctx: s, maxWidth: r }) {
      const { width: a, height: h } = e,
        {
          top: c,
          right: l,
          bottom: u,
          left: g,
          width: p,
          height: w,
        } = d(f(t, ['top', 'right', 'bottom', 'left', 'width', 'height']), (t, e) => [
          t,
          n(e) ? e : o(e) ? e({ containerWidth: a, containerHeight: h }) : void 0,
        ]);
      let x = 0,
        m = 0,
        y = 0,
        b = 0;
      p
        ? ((y = p), i(g) ? i(l) || (x = a - l - y) : (x = g))
        : i(g) || i(l)
        ? (x = i(g) ? 0 : g)
        : ((x = g), (y = a - g - l)),
        i(w)
          ? i(c) || i(u)
            ? (m = i(c) ? 0 : c)
            : ((m = c), (b = h - c - u))
          : ((b = w), i(c) ? i(u) || (m = h - u - b) : (m = c));
      const { height: W } = v(t, { maxWidth: y || r, ctx: s });
      return y || (y = r), b || (b = W), { ...t, x: x, y: m, width: y, height: b };
    },
    render(t, { ctx: o }) {
      const { x: i, y: s, width: a, height: h } = t;
      o.rect(i, s, a, h),
        o.clip(),
        (function (t, o) {
          let { content: i, textAlign: s, lineClamp: a, ellipsisContent: h } = t;
          (a = n(a) && a > 0 ? a : 1 / 0), (h = r(h) ? h : '...');
          const { ctx: c, maxWidth: l, x: d, y: f } = o;
          c.save();
          const u = P(t, { ctx: c });
          let g = e(i) ? [...i] : [{ content: i }],
            p = 0,
            w = 1;
          for (; g.length; ) {
            const {
                top: t,
                bottom: e,
                content: o,
              } = W(g, { ctx: c, maxWidth: l, baseProps: u, suffix: w === a ? h : '' }),
              i = o.length,
              n = g[i - 1],
              r = o[i - 1],
              x = r.content.length === n.content.length;
            p += t;
            let y = 0;
            if (o.length === g.length && x) {
              const t = o.reduce((t, e) => t + e.width, 0);
              'center' === s && (y = (l - t) / 2), 'right' === s && (y = l - t);
            }
            o.forEach((t) => {
              const {
                backgroundColor: e,
                overLineY: o,
                xOffset: i,
                width: n,
                underLineY: s,
                textDecorationProps: r,
                textDecoration: a,
                color: h,
                lineThroughY: l,
              } = t;
              if (
                (e &&
                  (c.save(),
                  (c.fillStyle = e),
                  c.fillRect(d + i + y, f + p + o, n, Math.abs(o) + Math.abs(s)),
                  c.restore()),
                c.save(),
                P(t, { ctx: c, baseProps: u }),
                O(t, { ctx: c, baseProps: u, x: d + i + y, y: f + p }),
                ['overline', 'line-through', 'underline'].includes(a))
              ) {
                const t = 'overline' === a ? o : 'line-through' === a ? l : s,
                  e = r.lineWidth && r.lineWidth > 0 ? r.lineWidth / 2 : 0.5,
                  u = 'overline' === a ? -e : 'underline' === a ? e : 0;
                m.render(
                  {
                    ...r,
                    points: [
                      [d + i + y, f + p + t + u],
                      [d + i + y + n, f + p + t + u],
                    ],
                    lineColor: r.lineColor || h,
                  },
                  { ctx: c },
                );
              }
              c.restore();
            }),
              w === a
                ? (g = [])
                : ((p += e),
                  (g = g.slice(x ? i : i - 1)),
                  x || (g[0] = { ...g[0], content: g[0].content.slice(r.content.length) })),
              w++;
          }
          c.restore();
        })(t, { maxWidth: a, ctx: o, x: i, y: s });
    },
  };
function v(t, o) {
  let { lineClamp: i, content: s } = t;
  i = n(i) && i > 0 ? i : 1 / 0;
  const { ctx: r, maxWidth: a } = o;
  r.save();
  const h = P(t, { ctx: r });
  let c = e(s) ? [...s] : [{ content: s }],
    l = 0,
    d = 0,
    f = 1;
  for (; c.length; ) {
    const { top: t, bottom: e, content: o } = W(c, { ctx: r, maxWidth: a, baseProps: h });
    if (((l += t + e), (d += o.reduce((t, e) => t + e.width, 0)), f < i)) {
      f++;
      const t = o.length,
        e = c[t - 1],
        i = o[t - 1],
        n = i.content.length === e.content.length;
      (c = c.slice(n ? t : t - 1)), n || (c[0] = { ...c[0], content: c[0].content.slice(i.content.length) });
    } else c = [];
  }
  return r.restore(), { width: d, height: l };
}
function W(t, e) {
  const { ctx: i, maxWidth: s, baseProps: a } = e,
    h = [],
    c = [],
    l = [];
  let d = '',
    f = 0;
  for (let u = 0; u < t.length; u++) {
    const g = t[u];
    i.save();
    const p = P(g, { ctx: i, baseProps: a }),
      w = r(e.suffix) ? e.suffix : '',
      x = r(e.suffix) ? S({ ...p, content: e.suffix }, { ctx: i }).width : 0;
    let m;
    for (let t = 0; t < g.content.length; t++) {
      d += g.content[t];
      const {
        width: e,
        fontBoundingBoxAscent: r,
        fontBoundingBoxDescent: u,
      } = S({ ...g, content: d + w }, { ctx: i, baseProps: a });
      m = e;
      const y = t === g.content.length - 1;
      if (e + f > s || y) {
        const t = r + u;
        let { lineHeight: a } = p;
        a = n(a) ? a : o(a) ? a(t) : 1.2 * t;
        const g = Math.max((a - t) / 2, 0);
        h.push(r + g), c.push(u + g);
        const b = p.textBaseLine,
          v = -r;
        let W = -t / 2 + u;
        const O = u;
        if (
          (['top', 'hanging'].includes(b) ? (W = t / 2 - r) : 'middle' === b && (W = 0),
          l.push({
            ...p,
            content: y ? d : d.slice(0, -1) + w,
            overLineY: v,
            lineThroughY: W,
            underLineY: O,
            xOffset: f,
            width: y ? e - x : m,
          }),
          e + f > s)
        )
          return i.restore(), { top: Math.max(...h), bottom: Math.max(...c), content: l };
        y && ((f += e), (d = ''));
      }
    }
    i.restore();
  }
  return { top: Math.max(...h), bottom: Math.max(...c), content: l };
}
function O(t, e) {
  const { ctx: o, baseProps: n, x: s, y: r } = e;
  o.save();
  const a = ('stroke' === P(t, { ctx: o, baseProps: n }).textStyle ? o.strokeText : o.fillText).bind(o);
  i(s) || i(r) || a(t.content, s, r), o.restore();
}
function S(t, e) {
  const { ctx: o, baseProps: i } = e;
  o.save(), P(t, { ctx: o, baseProps: i });
  const n = o.measureText(t.content);
  return o.restore(), n;
}
function P(t, e) {
  const i = { ...t },
    { ctx: a, baseProps: h = {} } = e,
    c = {
      lineHeight: [(t) => n(t) || o(t), '120%'],
      fontSize: [n, 'normal'],
      fontFamily: [r, 'sans-serif'],
      fontWeight: [(t) => [100, 200, 300, 400, 500, 600, 700, 800, 900, 'normal', 'bold'].includes(t), 'normal'],
      color: [(t) => r(t) || s(t)],
      textBaseLine: [
        (t) => ['alphabetic', 'bottom', 'hanging', 'ideographic', 'middle', 'top'].includes(t),
        'alphabetic',
      ],
      letterSpacing: [n],
      wordSpacing: [n],
      fontStyle: [(t) => ['italic', 'normal'].includes(t), 'normal'],
      textDecoration: [(t) => ['underline', 'overline', 'line-through'].includes(t)],
      textDecorationProps: [s, {}],
      textStyle: [(t) => ['fill', 'stroke'].includes(t), 'fill'],
      strokeProps: [s, {}],
      backgroundColor: [(t) => r(t) || s(t)],
      shadowBlur: [n],
      shadowColor: [r],
      shadowOffsetX: [(t) => n(t) || (r(t) && t.endsWith('%'))],
      shadowOffsetY: [(t) => n(t) || (r(t) && t.endsWith('%'))],
    };
  return (
    Object.entries(c).forEach(([t, e]) => {
      e[0](i[t]) || (i[t] = h[t] || e[1]);
    }),
    w({ ...i, ...i.strokeProps, fillStyle: i.color, strokeStyle: i.color }, a),
    i
  );
}
class C {
  options;
  configs = [];
  cache = [];
  ctx = null;
  dpr = 1;
  plugins = { line: m, rect: y, image: x, text: b };
  constructor(t) {
    this.options = t;
    let { node: e, width: i, height: s, dpr: r } = t;
    if (((i = Number.parseFloat(i)), (s = Number.parseFloat(s)), !o(e?.getContext) || !i || !s))
      return void console.error(`canvasPoster 参数错误，当前为：${t}`);
    const a = e.getContext('2d');
    a
      ? ((r = (function (t) {
          if (n(t) && t > 0) return t;
          {
            const { pixelRatio: t } = wx.getWindowInfo();
            return t;
          }
        })(r)),
        (e.width = i * r),
        (e.height = s * r),
        a.scale(r, r),
        (this.dpr = r),
        (this.ctx = a))
      : console.error('获取 Canvas 上下文失败');
  }
  async draw(t) {
    if (e(t)) {
      this.configs = t;
      for (let e = 0; e < t.length; e++) {
        const i = t[e];
        if (o(i)) {
          const t = { ctx: this.ctx, canvas: this.options.node, dpr: this.dpr };
          await i(t);
        } else if (s(i) && i.type in this.plugins) {
          const t = this.plugins[i.type],
            o = await this.travelContainer(e),
            n = o[o.length - 1],
            { x: s, y: r } = o.slice(0, -1).reduce((t, e) => ((t.x += e.x), (t.y += e.y), t), { x: 0, y: 0 });
          this.ctx.save(), this.ctx.translate(s, r);
          const a = Number.parseFloat(n.rotate);
          a && c(a, { x: n.x, y: n.y, width: n.width, height: n.height, ctx: this.ctx }),
            t.render(n, { ...this.options, ctx: this.ctx }),
            this.ctx.restore();
        }
      }
    } else console.error(`draw 参数错误，当前为：${t}`);
  }
  async travelContainer(t, e = [{ x: 0, y: 0, width: this.options.width, height: this.options.height }]) {
    const i = this.configs[t],
      s = i.relativeTo && this.configs.findIndex((t) => !o(t) && t.id === i.relativeTo);
    n(s) && s > -1 && (e = await this.travelContainer(s, e));
    const r = await this.normalize(t, e);
    return [...e, r];
  }
  async normalize(t, e) {
    const o = this.configs[t];
    this.cache[t] || (this.cache[t] = {});
    const i = this.cache[t],
      n = this.plugins[o.type],
      s = e[e.length - 1],
      r = this.options.width - e.reduce((t, e) => t + e.x, 0);
    let a = i.prepare;
    a || ((a = await n.prepare(o, { canvas: this.options.node })), (i.prepare = a));
    let h = i.calculate;
    return h || ((h = n.calculate(a, s, { ctx: this.ctx, maxWidth: r })), (i.calculate = h)), h;
  }
  measure(t) {
    return S(t, { ctx: this.ctx });
  }
  async measureHeight(t, e) {
    return await b.prepare(t), v(t, { ctx: this.ctx, maxWidth: e || this.options.width });
  }
}
function F(t, e) {
  let { type: o, quality: i, fileName: a } = s(e) ? e : {};
  return (
    (o = r(o) && o.startsWith('image/') ? o : void 0),
    (i = n(i) && i > 0 && i <= 1 ? i : 1),
    new Promise((e, n) => {
      wx.canvasToTempFilePath({
        canvas: t,
        fileType: 'image/jpeg' === o ? 'jpg' : 'png',
        quality: i,
        success({ tempFilePath: t }) {
          wx.saveImageToPhotosAlbum({
            filePath: t,
            success() {
              e(t);
            },
            fail(t) {
              n(t);
            },
          });
        },
        fail(t) {
          n(t);
        },
      });
    })
  );
}
export { C as CanvasPoster, F as saveCanvasAsImage };
