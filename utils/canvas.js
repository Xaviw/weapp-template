/* eslint-disable */
// prettier-ignore
function t(t){return Object.prototype.toString.call(t)}
function e(e) {
  return Array.isArray ? Array.isArray(e) : '[object Array]' === t(e);
}
function o(e) {
  return ['[object Function]', '[object GeneratorFunction]', '[object AsyncFunction]'].includes(t(e));
}
function n(t) {
  return null == t;
}
function i(e) {
  return '[object Number]' === t(e);
}
function r(t) {
  const e = typeof t;
  return !!t && ('function' === e || 'object' === e);
}
function s(e) {
  return '[object String]' === t(e);
}
class c {
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
function h(t, e) {
  function n(...i) {
    const r = o(e?.key) ? e.key(...i) : JSON.stringify(i),
      s = n.cache.get(r);
    if (s && (!s.expires || s.expires > Date.now())) return s.value;
    const c = t(...i),
      h = Number.parseInt(e?.expires) || null;
    return n.cache.set(r, { value: c, expires: h ? Date.now() + h : null }), c;
  }
  return (n.cache = new c(e?.lruMax)), n;
}
const a = h(
  (t, e) =>
    new Promise((o, n) => {
      if (s((i = t)) && /^(?:\/|\.\/|\.\.\/)[\w/.-]*$/.test(i.trim())) {
        const i = e.createImage();
        (i.onload = () => {
          o({ image: i, width: i.width, height: i.height });
        }),
          (i.onerror = n),
          (i.src = t);
      } else if (
        (function (t) {
          return !!s(t) && /^(?:\w+:)?\/\/(?:[^\s.]+\.\S{2}|localhost)\S*$/.test(t);
        })(t)
      ) {
        (t.startsWith('cloud://') ? wx.cloud.downloadFile : wx.downloadFile)({
          url: t,
          fileID: t,
          success: (t) => {
            if (200 !== t.statusCode) return void n(t);
            const i = e.createImage();
            (i.onload = () => {
              o({ image: i, width: i.width, height: i.height });
            }),
              (i.onerror = n),
              (i.src = t.tempFilePath);
          },
          fail: n,
        });
      } else if (
        (function (t) {
          return (
            !!s(t) &&
            /^data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z0-9-.!#$%*+{}|~`]+=[a-z0-9-.!#$%*+{}|~`]+)*)?(?:;base64)?,[\w!$&',()*+;=\-.~:@/?%\s]*$/i.test(
              t.trim(),
            )
          );
        })(t)
      ) {
        const [, i, r] = /data:image\/(\w+);base64,(.*)/.exec(t) || [],
          s = `${wx.env.USER_DATA_PATH}/${Date.now()}.${i}`,
          c = wx.base64ToArrayBuffer(r.replace(/[\r\n]/g, ''));
        wx.getFileSystemManager().writeFile({
          filePath: s,
          data: c,
          encoding: 'binary',
          success: () => {
            const t = e.createImage();
            (t.onload = () => {
              o({ image: t, width: t.width, height: t.height });
            }),
              (t.onerror = n),
              (t.src = s);
          },
          fail: n,
        });
      } else n(t);
      var i;
    }),
  { lruMax: 20, key: (t) => t },
);
function l(t, e) {
  if (i(t)) {
    const { x: o, y: n, width: i, height: r, ctx: s } = e,
      c = o + i / 2,
      h = n + r / 2;
    s.translate(c, h), s.rotate((t * Math.PI) / 180), s.translate(-c, -h);
  }
}
const d = {
  lineWidth(t, e) {
    i(t) && (e.lineWidth = t);
  },
  lineDash(t, o) {
    e(t) && t.every(i) && o.setLineDash(t);
  },
  lineDashOffset(t, e) {
    i(t) && (e.lineDashOffset = t);
  },
  lineCap(t, e) {
    t && ['butt', 'round', 'square'].includes(t) && (e.lineCap = t);
  },
  lineJoin(t, e) {
    t && ['round', 'bevel', 'miter'].includes(t) && (e.lineJoin = t);
  },
  miterLimit(t, e) {
    i(t) && (e.miterLimit = t);
  },
  fillStyle(t, e) {
    t && (e.fillStyle = t);
  },
  strokeStyle(t, e) {
    t && (e.strokeStyle = t);
  },
  shadowColor(t, e) {
    s(t) && (e.shadowColor = t);
  },
  shadowBlur(t, e) {
    i(t) && (e.shadowBlur = t);
  },
  shadowOffsetX(t, e) {
    i(t) && (e.shadowOffsetX = t);
  },
  shadowOffsetY(t, e) {
    i(t) && (e.shadowOffsetY = t);
  },
  wordSpacing(t, e) {
    i(t) && (e.wordSpacing = `${t}px`);
  },
  letterSpacing(t, e) {
    i(t) && (e.letterSpacing = `${t}px`);
  },
  textBaseLine(t, e) {
    s(t) && (e.textBaseline = t);
  },
};
function u(t, e) {
  for (const o in t) Object.prototype.hasOwnProperty.call(t, o) && d[o]?.(t[o], e);
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
function f(t, e) {
  const { ctx: o, width: n, height: i } = e;
  o.save();
  const { x: r, y: s, width: c, height: h, points: a } = y({ type: 'line', ...t }, { width: n, height: i, x: 0, y: 0 });
  if (a.length < 2) return;
  u(t, o), t.rotate && l(t.rotate, { x: r, y: s, width: c, height: h, ctx: o });
  const [d, ...f] = a;
  o.beginPath(), o.moveTo(...d), f.forEach((t) => o.lineTo(...t)), o.stroke(), o.closePath(), o.restore();
}
function g(t, e) {
  const { ctx: o, maxWidth: n, baseProps: i } = e,
    r = [],
    c = [],
    h = [];
  let a = '',
    l = 0;
  for (let d = 0; d < t.length; d++) {
    const u = t[d];
    o.save();
    const f = p(u, { ctx: o, baseProps: i }),
      g = s(e.suffix) ? e.suffix : '',
      x = s(e.suffix) ? w({ ...f, content: e.suffix }, { ctx: o }).width : 0;
    for (let t = 0; t < u.content.length; t++) {
      a += u.content[t];
      const {
          width: e,
          fontBoundingBoxAscent: s,
          fontBoundingBoxDescent: d,
        } = w({ ...u, content: a + g }, { ctx: o, baseProps: i }),
        p = t === u.content.length - 1;
      if (e + l > n || p) {
        const t = s + d,
          i = (k(f.lineHeight, t) - t) / 2;
        r.push(s + i), c.push(d + i);
        const u = f.textBaseLine,
          w = -s;
        let m = -t / 2 + d;
        const y = d;
        if (
          (['top', 'hanging'].includes(u) ? (m = t / 2 - s) : 'middle' === u && (m = 0),
          h.push({
            ...f,
            content: p ? a : a.slice(0, -1) + g,
            overLineY: w,
            lineThroughY: m,
            underLineY: y,
            xOffset: l,
            width: p ? e - x : e,
          }),
          e + l > n)
        )
          return o.restore(), { top: Math.max(...r), bottom: Math.max(...c), content: h };
        p && ((l += e), (a = ''));
      }
    }
    o.restore();
  }
  return { top: Math.max(...r), bottom: Math.max(...c), content: h };
}
function x(t, e) {
  const { ctx: o, baseProps: i, x: r, y: s } = e;
  o.save();
  const c = ('stroke' === p(t, { ctx: o, baseProps: i }).textStyle ? o.strokeText : o.fillText).bind(o);
  n(r) || n(s) || c(t.content, r, s), o.restore();
}
function w(t, e) {
  const { ctx: o, baseProps: n } = e;
  o.save(), p(t, { ctx: o, baseProps: n });
  const i = o.measureText(t.content);
  return o.restore(), i;
}
function p(t, e) {
  const o = { ...t },
    { ctx: n, baseProps: c = {} } = e,
    h = {
      lineHeight: [(t) => i(t) || (s(t) && t.endsWith('%')), '120%'],
      fontSize: [i, 'normal'],
      fontFamily: [s, 'sans-serif'],
      fontWeight: [(t) => [100, 200, 300, 400, 500, 600, 700, 800, 900, 'normal', 'bold'].includes(t), 'normal'],
      color: [(t) => s(t) || r(t)],
      textBaseLine: [
        (t) => ['alphabetic', 'bottom', 'hanging', 'ideographic', 'middle', 'top'].includes(t),
        'alphabetic',
      ],
      letterSpacing: [i],
      wordSpacing: [i],
      fontStyle: [(t) => ['italic', 'normal'].includes(t), 'normal'],
      textDecoration: [(t) => ['underline', 'overline', 'line-through'].includes(t)],
      textDecorationProps: [r, {}],
      textStyle: [(t) => ['fill', 'stroke'].includes(t), 'fill'],
      strokeProps: [r, {}],
      backgroundColor: [(t) => s(t) || r(t)],
      shadowBlur: [i],
      shadowColor: [s],
      shadowOffsetX: [(t) => i(t) || (s(t) && t.endsWith('%'))],
      shadowOffsetY: [(t) => i(t) || (s(t) && t.endsWith('%'))],
    };
  return (
    Object.entries(h).forEach(([t, e]) => {
      e[0](o[t]) || (o[t] = c[t] || e[1]);
    }),
    u({ ...o, ...o.strokeProps, fillStyle: o.color, strokeStyle: o.color, backgroundColor: void 0 }, n),
    o
  );
}
(d.color = d.backgroundColor = d.fillStyle),
  (d.color = d.lineColor = d.strokeStyle),
  (d.borderColor = d.lineColor = d.strokeStyle),
  (d.borderDash = d.lineDash),
  (d.borderDashOffset = d.lineDashOffset);
const m = h(
    (t, e) => {
      const { width: i, height: s, x: c, y: h } = e,
        a = (function (t, e) {
          if (!r(t)) return t;
          if (!o(e)) throw new TypeError('iterator 应该是一个函数');
          const n = {};
          return (
            Object.keys(t).forEach((o) => {
              const [i, r] = e(o, t[o]);
              n[i] = r;
            }),
            n
          );
        })(t, (t, e) => {
          if (n(e) || !['top', 'right', 'bottom', 'left', 'width', 'height'].includes(t)) return [t, e];
          return [t, k(e, ['top', 'bottom', 'height'].includes(t) ? s : i) || void 0];
        }),
        { top: l, right: d, bottom: u, left: f, width: g, height: x } = a;
      let w = 0,
        p = 0,
        m = 0,
        y = 0;
      if (n(g)) {
        w = f || 0;
        m = i - w - (d || 0);
      } else (m = g), (w = n(f) ? (n(d) ? 0 : i - d - m) : f);
      if (n(x)) {
        p = l || 0;
        y = s - p - (u || 0);
      } else (y = x), (p = n(l) ? (n(u) ? 0 : s - u - y) : l);
      return { x: c + w, left: c + w, y: h + p, top: h + p, right: void 0, bottom: void 0, width: m, height: y };
    },
    {
      key(t, e) {
        const { top: o, right: n, bottom: i, left: r, width: s, height: c } = t,
          { width: h, height: a, x: l, y: d } = e;
        return JSON.stringify({
          top: o,
          right: n,
          bottom: i,
          left: r,
          width: s,
          height: c,
          containerWidth: h,
          containerHeight: a,
          containerX: l,
          containerY: d,
        });
      },
      lruMax: 20,
    },
  ),
  y = h(
    (t, o) => {
      const [n = [0, 0], ...i] = t?.points || [],
        { width: r, height: s, x: c, y: h } = o,
        [a, l] = n.map((t, e) => k(t, [r, s][e]));
      let d = a,
        u = l,
        f = a,
        g = l;
      if (!i.length) return { points: [] };
      const x = i.reduce((t, o) => {
        const [n, i] = (e(o) ? o : []).map((t, e) => k(t, [r, s][e]));
        return [n, i].some(Number.isNaN)
          ? t
          : ((d = Math.min(d, n)), (u = Math.min(u, i)), (f = Math.max(f, n)), (g = Math.max(g, i)), [...t, [n, i]]);
      }, []);
      return {
        width: f - d || 1,
        height: g - u || 1,
        x: c + d,
        y: h + u,
        points: [[a, l], ...x].map(([t, e]) => [c + t, h + e]),
      };
    },
    {
      key(t, e) {
        const { points: o } = t,
          { width: n, height: i, x: r, y: s } = e;
        return JSON.stringify({ points: o, width: n, height: i, x: r, y: s });
      },
      lruMax: 20,
    },
  ),
  b = h((t, o, r) => {
    const s = m(t, o);
    return (
      n(t.height) &&
        n(t.bottom) &&
        (s.height = (function (t, o) {
          let { lineClamp: n, content: r } = t;
          n = i(n) && n > 0 ? n : 1 / 0;
          const { ctx: s, maxWidth: c } = o;
          s.save();
          const h = p(t, { ctx: s });
          let a = e(r) ? [...r] : [{ content: r }],
            l = 0,
            d = 1;
          for (; a.length; ) {
            const { top: t, bottom: e, content: o } = g(a, { ctx: s, maxWidth: c, baseProps: h });
            if (((l += t + e), d < n)) {
              d++;
              const t = o.length,
                e = a[t - 1],
                n = o[t - 1],
                i = n.content.length === e.content.length;
              (a = a.slice(i ? t : t - 1)), i || (a[0] = { ...a[0], content: a[0].content.slice(n.content.length) });
            } else a = [];
          }
          return s.restore(), l;
        })(t, { maxWidth: s.width, ctx: r.ctx })),
      s
    );
  }),
  v = { rect: m, text: b, image: m, line: y };
function S(t, e, n) {
  const { width: i, height: r } = n,
    s = v[t.type];
  if (!t.relativeTo) return s(t, { width: i, height: r, x: 0, y: 0 }, n);
  const c = e.find((e) => !o(e) && e.id === t.relativeTo);
  if (!c) return s(t, { width: i, height: r, x: 0, y: 0 }, n);
  const { x: h, y: a, width: l, height: d } = S(c, e, n);
  return s(t, { width: l, height: d, x: h, y: a }, n);
}
function k(t, e) {
  return s(t) && t.endsWith('%') ? (e * Number.parseFloat(t)) / 100 : Number.parseFloat(t);
}
function P(t, e) {
  const { ctx: o, width: n, height: i } = e;
  o.save();
  const { x: r, y: s, width: c, height: h } = m(t, { width: n, height: i, x: 0, y: 0 });
  if (!c || !h) return;
  const { rotate: a, borderRadius: d, backgroundColor: f } = t;
  a && l(a, { x: r, y: s, width: c, height: h, ctx: o });
  const g = u(t, o);
  o.save();
  const x = C({ x: r, y: s, width: c, height: h, borderRadius: d, ctx: o, borderSize: g });
  f && o.fill(), D({ x: r, y: s, width: c, height: h, r: x, borderSize: g, ctx: o }), o.restore(), o.restore();
}
function W(t) {
  let { x: e, y: o, w: n, h: i, r: r, ctx: s } = t;
  const c = Math.min(n, i);
  r > c / 2 && (r = c / 2),
    s.beginPath(),
    s.moveTo(e + r, o),
    s.arcTo(e + n, o, e + n, o + i, r),
    s.arcTo(e + n, o + i, e, o + i, r),
    s.arcTo(e, o + i, e, o, r),
    s.arcTo(e, o, e + n, o, r),
    s.closePath();
}
function C(t) {
  const { x: e, y: o, width: n, height: i, borderRadius: r, borderSize: c, ctx: h } = t;
  let a = Number.parseFloat(r) || 0;
  return (
    s(r) && r.endsWith('%') && (a = (a * n) / 100),
    W({ x: e - c, y: o - c, w: n + 2 * c, h: i + 2 * c, r: a, ctx: h }),
    h.clip(),
    a
  );
}
function D(t) {
  const { x: e, y: o, width: n, height: i, r: r, borderSize: s, ctx: c } = t;
  s && ((c.lineWidth = 2 * s), W({ x: e - s, y: o - s, w: n + 2 * s, h: i + 2 * s, r: r, ctx: c }), c.stroke());
}
async function O(t, e) {
  const { ctx: o, canvas: n, width: i, height: r } = e;
  o.save();
  const { x: s, y: c, width: h, height: d } = m(t, { width: i, height: r, x: 0, y: 0 }),
    { rotate: f, borderRadius: g, src: x, flipX: w, flipY: p } = t;
  let y, b, v;
  try {
    const t = await a(x, n);
    (y = t.image), (b = t.width), (v = t.height);
  } catch (t) {
    return console.warn('图片加载失败：', t), void o.restore();
  }
  f && l(f, { x: s, y: c, width: h, height: d, ctx: o });
  const S = u(t, o);
  o.save();
  const P = C({ x: s, y: c, width: h, height: d, borderRadius: g, ctx: o, borderSize: S });
  o.save();
  const W = (function (t) {
    let {
      x: e,
      y: o,
      width: n,
      height: i,
      imageWidth: r,
      imageHeight: s,
      sourceX: c,
      sourceY: h,
      sourceWidth: a,
      sourceHeight: l,
      mode: d,
    } = t;
    if (((c = k(c, r) || 0), (h = k(h, s) || 0), (a = k(a, r) || r), (l = k(l, s) || s), n && i)) {
      const t = a / l,
        r = n / i;
      if ('aspectFill' === d)
        if (r > t) {
          l = a / r;
        } else {
          a = l * r;
        }
      else if ('aspectFit' === d)
        if (r > t) {
          const o = i * t;
          (e += (n - o) / 2), (n = o);
        } else {
          const e = n / t;
          (o += (i - e) / 2), (i = e);
        }
    } else n || i ? (n && (i = (l * a) / n), i && (n = (a * l) / i)) : ((n = a), (i = l));
    return [c, h, a, l, e, o, n, i];
  })({ ...t, x: s, y: c, width: h, height: d, imageWidth: b, imageHeight: v });
  if ((o.translate(w ? i : 0, p ? r : 0), o.scale(w ? -1 : 1, p ? -1 : 1), w || p)) {
    const [t, e, o, n] = W.slice(4);
    (W[4] = w ? i - t - o : t), (W[5] = p ? r - e - n : e);
  }
  o.drawImage(y, ...W),
    o.restore(),
    (o.shadowColor = '#00000000'),
    D({ x: s, y: c, width: h, height: d, r: P, borderSize: S, ctx: o }),
    o.restore(),
    o.restore();
}
function F(t, o) {
  const { width: n, height: r, ctx: c } = o,
    { x: h, y: a, width: d, height: u } = b(t, { width: n, height: r, x: 0, y: 0 }, o);
  t.rotate && l(t.rotate, { x: h, y: a, width: d, height: u, ctx: c }),
    c.save(),
    c.rect(h, a, d, u),
    c.clip(),
    (function (t, o) {
      let { content: n, textAlign: r, lineClamp: c, ellipsisContent: h } = t;
      (c = i(c) && c > 0 ? c : 1 / 0), (h = s(h) ? h : '...');
      const { ctx: a, maxWidth: l, x: d, y: u } = o;
      a.save();
      const w = p(t, { ctx: a });
      let m = e(n) ? [...n] : [{ content: n }],
        y = 0,
        b = 1;
      for (; m.length; ) {
        const { top: t, bottom: e, content: o } = g(m, { ctx: a, maxWidth: l, baseProps: w, suffix: b === c ? h : '' }),
          n = o.length,
          i = m[n - 1],
          s = o[n - 1],
          v = s.content.length === i.content.length;
        y += t;
        let S = 0;
        if (o.length === m.length && v) {
          const t = o.reduce((t, e) => t + e.width, 0);
          'center' === r && (S = (l - t) / 2), 'right' === r && (S = l - t);
        }
        o.forEach((t) => {
          const {
            backgroundColor: e,
            overLineY: o,
            xOffset: n,
            width: i,
            underLineY: r,
            textDecorationProps: s,
            textDecoration: c,
            color: h,
            lineThroughY: l,
          } = t;
          if (
            (e &&
              P(
                {
                  type: 'rect',
                  top: u + y + o,
                  left: d + n + S,
                  backgroundColor: e,
                  width: i,
                  height: Math.abs(o) + Math.abs(r),
                },
                { ctx: a, width: 100, height: 100 },
              ),
            a.save(),
            p(t, { ctx: a, baseProps: w }),
            x(t, { ctx: a, baseProps: w, x: d + n + S, y: u + y }),
            ['overline', 'line-through', 'underline'].includes(c))
          ) {
            const t = 'overline' === c ? o : 'line-through' === c ? l : r,
              e = s.lineWidth && s.lineWidth > 0 ? s.lineWidth / 2 : 0.5,
              g = 'overline' === c ? -e : 'underline' === c ? e : 0;
            f(
              {
                points: [
                  [d + n + S, u + y + t + g],
                  [d + n + S + i, u + y + t + g],
                ],
                ...s,
                lineColor: s.lineColor || h,
              },
              { ctx: a, width: 100, height: 100 },
            );
          }
          a.restore();
        }),
          b === c
            ? (m = [])
            : ((y += e),
              (m = m.slice(v ? n : n - 1)),
              v || (m[0] = { ...m[0], content: m[0].content.slice(s.content.length) })),
          b++;
      }
      a.restore();
    })(t, { maxWidth: d, ctx: c, x: h, y: a }),
    c.restore();
}
async function M(t, n) {
  let { node: s, width: c, height: h, dpr: l } = n;
  if (
    ((c = Number.parseFloat(c)),
    (h = Number.parseFloat(h)),
    (l = (function (t) {
      if (i(t) && t > 0) return t;
      {
        const { pixelRatio: t } = wx.getWindowInfo();
        return t;
      }
    })(l)),
    !(e(t) && o(s?.getContext) && c && h))
  )
    return void console.error(`请传入正确的参数，当前 elements：${t}、options：${n}`);
  const d = s.getContext('2d');
  if (!d) return void console.error('获取 Canvas 上下文失败');
  (s.width = c * l), (s.height = h * l), d.scale(l, l);
  const u = { ctx: d, canvas: s, width: c, height: h };
  t.forEach((t) => {
    !o(t) && 'image' === t.type && t.src && a(t.src, s);
  });
  for (let e = 0, n = t.length; e < n; e++) {
    const n = t[e];
    if (!r(n) || (!o(n) && !['text', 'image', 'rect', 'line'].includes(n.type))) {
      console.warn(`请检查配置：${n}`);
      continue;
    }
    if (o(n)) {
      d.save(), await n({ ctx: d, canvas: s, dpr: l }), d.restore();
      continue;
    }
    const i = S(n, t, u);
    switch (n.type) {
      case 'line':
        f({ ...n, ...i }, u);
        break;
      case 'rect':
        P({ ...n, ...i }, u);
        break;
      case 'image':
        await O({ ...n, ...i }, u);
        break;
      case 'text':
        F({ ...n, ...i }, u);
    }
  }
}
function T(t, e) {
  return new Promise((o, n) => {
    t({ ...e, success: o, fail: n });
  });
}
export { M as canvasPoster, T as wxPromisify };
