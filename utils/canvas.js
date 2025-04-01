/* eslint-disable */
// prettier-ignore
function t(t,e){return new Promise(((o,n)=>{t({...e,success:o,fail:n})}))}
function e(t) {
  return Object.prototype.toString.call(t);
}
function o(t) {
  return Array.isArray ? Array.isArray(t) : '[object Array]' === e(t);
}
function n(t) {
  return ['[object Function]', '[object GeneratorFunction]', '[object AsyncFunction]'].includes(e(t));
}
function i(t) {
  return null == t;
}
function r(t) {
  return '[object Number]' === e(t);
}
function s(t) {
  const e = typeof t;
  return !!t && ('function' === e || 'object' === e);
}
function c(t) {
  return '[object String]' === e(t);
}
function h(t, e) {
  if (r(t)) {
    const { x: o, y: n, width: i, height: r, ctx: s } = e,
      c = o + i / 2,
      h = n + r / 2;
    s.translate(c, h), s.rotate((t * Math.PI) / 180), s.translate(-c, -h);
  }
}
function a(t, e) {
  let { type: o, quality: n, fileName: i } = s(e) ? e : {};
  return (
    (o = c(o) && o.startsWith('image/') ? o : void 0),
    (n = r(n) && n > 0 && n <= 1 ? n : 1),
    new Promise((e, i) => {
      wx.canvasToTempFilePath({
        canvas: t,
        fileType: 'image/jpeg' === o ? 'jpg' : 'png',
        quality: n,
        success({ tempFilePath: t }) {
          wx.saveImageToPhotosAlbum({
            filePath: t,
            success() {
              e(t);
            },
            fail(t) {
              i(t);
            },
          });
        },
        fail(t) {
          i(t);
        },
      });
    })
  );
}
class l {
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
function d(t, e) {
  function o(...i) {
    const r = n(e?.key) ? e.key(...i) : JSON.stringify(i),
      s = o.cache.get(r);
    if (s && (!s.expires || s.expires > Date.now())) return s.value;
    const c = t(...i),
      h = Number.parseInt(e?.expires) || null;
    return o.cache.set(r, { value: c, expires: h ? Date.now() + h : null }), c;
  }
  return (o.cache = new l(e?.lruMax)), o;
}
const u = d(
  (t, e) =>
    new Promise((o, n) => {
      if (c((i = t)) && /^(?:\/|\.\/|\.\.\/)[\w/.-]*$/.test(i.trim())) {
        const i = e.createImage();
        (i.onload = () => {
          o({ image: i, width: i.width, height: i.height });
        }),
          (i.onerror = n),
          (i.src = t);
      } else if (
        (function (t) {
          return !!c(t) && /^(?:\w+:)?\/\/(?:[^\s.]+\.\S{2}|localhost)\S*$/.test(t);
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
            !!c(t) &&
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
const f = {
  lineWidth(t, e) {
    r(t) && (e.lineWidth = t);
  },
  lineDash(t, e) {
    o(t) && t.every(r) && e.setLineDash(t);
  },
  lineDashOffset(t, e) {
    r(t) && (e.lineDashOffset = t);
  },
  lineCap(t, e) {
    t && ['butt', 'round', 'square'].includes(t) && (e.lineCap = t);
  },
  lineJoin(t, e) {
    t && ['round', 'bevel', 'miter'].includes(t) && (e.lineJoin = t);
  },
  miterLimit(t, e) {
    r(t) && (e.miterLimit = t);
  },
  fillStyle(t, e) {
    t && (e.fillStyle = t);
  },
  strokeStyle(t, e) {
    t && (e.strokeStyle = t);
  },
  shadowColor(t, e) {
    c(t) && (e.shadowColor = t);
  },
  shadowBlur(t, e) {
    r(t) && (e.shadowBlur = t);
  },
  shadowOffsetX(t, e) {
    r(t) && (e.shadowOffsetX = t);
  },
  shadowOffsetY(t, e) {
    r(t) && (e.shadowOffsetY = t);
  },
  wordSpacing(t, e) {
    r(t) && (e.wordSpacing = `${t}px`);
  },
  letterSpacing(t, e) {
    r(t) && (e.letterSpacing = `${t}px`);
  },
  textBaseLine(t, e) {
    c(t) && (e.textBaseline = t);
  },
};
function g(t, e) {
  for (const o in t) Object.prototype.hasOwnProperty.call(t, o) && f[o]?.(t[o], e);
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
function x(t, e) {
  const { ctx: o, width: n, height: i } = e;
  o.save();
  const { x: r, y: s, width: c, height: a, points: l } = v({ type: 'line', ...t }, { width: n, height: i, x: 0, y: 0 });
  if (l.length < 2) return;
  g(t, o), t.rotate && h(t.rotate, { x: r, y: s, width: c, height: a, ctx: o });
  const [d, ...u] = l;
  o.beginPath(), o.moveTo(...d), u.forEach((t) => o.lineTo(...t)), o.stroke(), o.closePath(), o.restore();
}
function w(t, e) {
  const { ctx: o, maxWidth: n, baseProps: i } = e,
    r = [],
    s = [],
    h = [];
  let a = '',
    l = 0;
  for (let d = 0; d < t.length; d++) {
    const u = t[d];
    o.save();
    const f = y(u, { ctx: o, baseProps: i }),
      g = c(e.suffix) ? e.suffix : '',
      x = c(e.suffix) ? m({ ...f, content: e.suffix }, { ctx: o }).width : 0;
    for (let t = 0; t < u.content.length; t++) {
      a += u.content[t];
      const {
          width: e,
          fontBoundingBoxAscent: c,
          fontBoundingBoxDescent: d,
        } = m({ ...u, content: a + g }, { ctx: o, baseProps: i }),
        w = t === u.content.length - 1;
      if (e + l > n || w) {
        const t = c + d,
          i = (W(f.lineHeight, t) - t) / 2;
        r.push(c + i), s.push(d + i);
        const u = f.textBaseLine,
          p = -c;
        let m = -t / 2 + d;
        const y = d;
        if (
          (['top', 'hanging'].includes(u) ? (m = t / 2 - c) : 'middle' === u && (m = 0),
          h.push({
            ...f,
            content: w ? a : a.slice(0, -1) + g,
            overLineY: p,
            lineThroughY: m,
            underLineY: y,
            xOffset: l,
            width: w ? e - x : e,
          }),
          e + l > n)
        )
          return o.restore(), { top: Math.max(...r), bottom: Math.max(...s), content: h };
        w && ((l += e), (a = ''));
      }
    }
    o.restore();
  }
  return { top: Math.max(...r), bottom: Math.max(...s), content: h };
}
function p(t, e) {
  const { ctx: o, baseProps: n, x: r, y: s } = e;
  o.save();
  const c = ('stroke' === y(t, { ctx: o, baseProps: n }).textStyle ? o.strokeText : o.fillText).bind(o);
  i(r) || i(s) || c(t.content, r, s), o.restore();
}
function m(t, e) {
  const { ctx: o, baseProps: n } = e;
  o.save(), y(t, { ctx: o, baseProps: n });
  const i = o.measureText(t.content);
  return o.restore(), i;
}
function y(t, e) {
  const o = { ...t },
    { ctx: n, baseProps: i = {} } = e,
    h = {
      lineHeight: [(t) => r(t) || (c(t) && t.endsWith('%')), '120%'],
      fontSize: [r, 'normal'],
      fontFamily: [c, 'sans-serif'],
      fontWeight: [(t) => [100, 200, 300, 400, 500, 600, 700, 800, 900, 'normal', 'bold'].includes(t), 'normal'],
      color: [(t) => c(t) || s(t)],
      textBaseLine: [
        (t) => ['alphabetic', 'bottom', 'hanging', 'ideographic', 'middle', 'top'].includes(t),
        'alphabetic',
      ],
      letterSpacing: [r],
      wordSpacing: [r],
      fontStyle: [(t) => ['italic', 'normal'].includes(t), 'normal'],
      textDecoration: [(t) => ['underline', 'overline', 'line-through'].includes(t)],
      textDecorationProps: [s, {}],
      textStyle: [(t) => ['fill', 'stroke'].includes(t), 'fill'],
      strokeProps: [s, {}],
      backgroundColor: [(t) => c(t) || s(t)],
      shadowBlur: [r],
      shadowColor: [c],
      shadowOffsetX: [(t) => r(t) || (c(t) && t.endsWith('%'))],
      shadowOffsetY: [(t) => r(t) || (c(t) && t.endsWith('%'))],
    };
  return (
    Object.entries(h).forEach(([t, e]) => {
      e[0](o[t]) || (o[t] = i[t] || e[1]);
    }),
    g({ ...o, ...o.strokeProps, fillStyle: o.color, strokeStyle: o.color, backgroundColor: void 0 }, n),
    o
  );
}
(f.color = f.backgroundColor = f.fillStyle),
  (f.color = f.lineColor = f.strokeStyle),
  (f.borderColor = f.lineColor = f.strokeStyle),
  (f.borderDash = f.lineDash),
  (f.borderDashOffset = f.lineDashOffset);
const b = d(
    (t, e) => {
      const { width: o, height: r, x: c, y: h } = e,
        a = (function (t, e) {
          if (!s(t)) return t;
          if (!n(e)) throw new TypeError('iterator 应该是一个函数');
          const o = {};
          return (
            Object.keys(t).forEach((n) => {
              const [i, r] = e(n, t[n]);
              o[i] = r;
            }),
            o
          );
        })(t, (t, e) => {
          if (i(e) || !['top', 'right', 'bottom', 'left', 'width', 'height'].includes(t)) return [t, e];
          return [t, W(e, ['top', 'bottom', 'height'].includes(t) ? r : o) || void 0];
        }),
        { top: l, right: d, bottom: u, left: f, width: g, height: x } = a;
      let w = 0,
        p = 0,
        m = 0,
        y = 0;
      if (i(g)) {
        w = f || 0;
        m = o - w - (d || 0);
      } else (m = g), (w = i(f) ? (i(d) ? 0 : o - d - m) : f);
      if (i(x)) {
        p = l || 0;
        y = r - p - (u || 0);
      } else (y = x), (p = i(l) ? (i(u) ? 0 : r - u - y) : l);
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
  v = d(
    (t, e) => {
      const [n = [0, 0], ...i] = t?.points || [],
        { width: r, height: s, x: c, y: h } = e,
        [a, l] = n.map((t, e) => W(t, [r, s][e]));
      let d = a,
        u = l,
        f = a,
        g = l;
      if (!i.length) return { points: [] };
      const x = i.reduce((t, e) => {
        const [n, i] = (o(e) ? e : []).map((t, e) => W(t, [r, s][e]));
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
  S = d((t, e, n) => {
    const s = b(t, e);
    return (
      i(t.height) &&
        i(t.bottom) &&
        (s.height = (function (t, e) {
          let { lineClamp: n, content: i } = t;
          n = r(n) && n > 0 ? n : 1 / 0;
          const { ctx: s, maxWidth: c } = e;
          s.save();
          const h = y(t, { ctx: s });
          let a = o(i) ? [...i] : [{ content: i }],
            l = 0,
            d = 1;
          for (; a.length; ) {
            const { top: t, bottom: e, content: o } = w(a, { ctx: s, maxWidth: c, baseProps: h });
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
        })(t, { maxWidth: s.width, ctx: n.ctx })),
      s
    );
  }),
  P = { rect: b, text: S, image: b, line: v };
function k(t, e, o) {
  const { width: i, height: r } = o,
    s = P[t.type];
  if (!t.relativeTo) return s(t, { width: i, height: r, x: 0, y: 0 }, o);
  const c = e.find((e) => !n(e) && e.id === t.relativeTo);
  if (!c) return s(t, { width: i, height: r, x: 0, y: 0 }, o);
  const { x: h, y: a, width: l, height: d } = k(c, e, o);
  return s(t, { width: l, height: d, x: h, y: a }, o);
}
function W(t, e) {
  return c(t) && t.endsWith('%') ? (e * Number.parseFloat(t)) / 100 : Number.parseFloat(t);
}
function C(t, e) {
  const { ctx: o, width: n, height: i } = e;
  o.save();
  const { x: r, y: s, width: c, height: a } = b(t, { width: n, height: i, x: 0, y: 0 });
  if (!c || !a) return;
  const { rotate: l, borderRadius: d, backgroundColor: u } = t;
  l && h(l, { x: r, y: s, width: c, height: a, ctx: o });
  const f = g(t, o);
  o.save();
  const x = T({ x: r, y: s, width: c, height: a, borderRadius: d, ctx: o, borderSize: f });
  u && o.fill(), F({ x: r, y: s, width: c, height: a, r: x, borderSize: f, ctx: o }), o.restore(), o.restore();
}
function D(t) {
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
function T(t) {
  const { x: e, y: o, width: n, height: i, borderRadius: r, borderSize: s, ctx: h } = t;
  let a = Number.parseFloat(r) || 0;
  return (
    c(r) && r.endsWith('%') && (a = (a * n) / 100),
    D({ x: e - s, y: o - s, w: n + 2 * s, h: i + 2 * s, r: a, ctx: h }),
    h.clip(),
    a
  );
}
function F(t) {
  const { x: e, y: o, width: n, height: i, r: r, borderSize: s, ctx: c } = t;
  s && ((c.lineWidth = 2 * s), D({ x: e - s, y: o - s, w: n + 2 * s, h: i + 2 * s, r: r, ctx: c }), c.stroke());
}
async function O(t, e) {
  const { ctx: o, canvas: n, width: i, height: r } = e;
  o.save();
  const { x: s, y: c, width: a, height: l } = b(t, { width: i, height: r, x: 0, y: 0 }),
    { rotate: d, borderRadius: f, src: x, flipX: w, flipY: p } = t;
  let m, y, v;
  try {
    const t = await u(x, n);
    (m = t.image), (y = t.width), (v = t.height);
  } catch (t) {
    return console.warn('图片加载失败：', t), void o.restore();
  }
  d && h(d, { x: s, y: c, width: a, height: l, ctx: o });
  const S = g(t, o);
  o.save();
  const P = T({ x: s, y: c, width: a, height: l, borderRadius: f, ctx: o, borderSize: S });
  o.save();
  const k = (function (t) {
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
    if (((c = W(c, r) || 0), (h = W(h, s) || 0), (a = W(a, r) || r), (l = W(l, s) || s), n && i)) {
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
  })({ ...t, x: s, y: c, width: a, height: l, imageWidth: y, imageHeight: v });
  if ((o.translate(w ? i : 0, p ? r : 0), o.scale(w ? -1 : 1, p ? -1 : 1), w || p)) {
    const [t, e, o, n] = k.slice(4);
    (k[4] = w ? i - t - o : t), (k[5] = p ? r - e - n : e);
  }
  o.drawImage(m, ...k),
    o.restore(),
    (o.shadowColor = '#00000000'),
    F({ x: s, y: c, width: a, height: l, r: P, borderSize: S, ctx: o }),
    o.restore(),
    o.restore();
}
function M(t, e) {
  const { width: n, height: i, ctx: s } = e,
    { x: a, y: l, width: d, height: u } = S(t, { width: n, height: i, x: 0, y: 0 }, e);
  t.rotate && h(t.rotate, { x: a, y: l, width: d, height: u, ctx: s }),
    s.save(),
    s.rect(a, l, d, u),
    s.clip(),
    (function (t, e) {
      let { content: n, textAlign: i, lineClamp: s, ellipsisContent: h } = t;
      (s = r(s) && s > 0 ? s : 1 / 0), (h = c(h) ? h : '...');
      const { ctx: a, maxWidth: l, x: d, y: u } = e;
      a.save();
      const f = y(t, { ctx: a });
      let g = o(n) ? [...n] : [{ content: n }],
        m = 0,
        b = 1;
      for (; g.length; ) {
        const { top: t, bottom: e, content: o } = w(g, { ctx: a, maxWidth: l, baseProps: f, suffix: b === s ? h : '' }),
          n = o.length,
          r = g[n - 1],
          c = o[n - 1],
          v = c.content.length === r.content.length;
        m += t;
        let S = 0;
        if (o.length === g.length && v) {
          const t = o.reduce((t, e) => t + e.width, 0);
          'center' === i && (S = (l - t) / 2), 'right' === i && (S = l - t);
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
              C(
                {
                  type: 'rect',
                  top: u + m + o,
                  left: d + n + S,
                  backgroundColor: e,
                  width: i,
                  height: Math.abs(o) + Math.abs(r),
                },
                { ctx: a, width: 100, height: 100 },
              ),
            a.save(),
            y(t, { ctx: a, baseProps: f }),
            p(t, { ctx: a, baseProps: f, x: d + n + S, y: u + m }),
            ['overline', 'line-through', 'underline'].includes(c))
          ) {
            const t = 'overline' === c ? o : 'line-through' === c ? l : r,
              e = s.lineWidth && s.lineWidth > 0 ? s.lineWidth / 2 : 0.5,
              f = 'overline' === c ? -e : 'underline' === c ? e : 0;
            x(
              {
                points: [
                  [d + n + S, u + m + t + f],
                  [d + n + S + i, u + m + t + f],
                ],
                ...s,
                lineColor: s.lineColor || h,
              },
              { ctx: a, width: 100, height: 100 },
            );
          }
          a.restore();
        }),
          b === s
            ? (g = [])
            : ((m += e),
              (g = g.slice(v ? n : n - 1)),
              v || (g[0] = { ...g[0], content: g[0].content.slice(c.content.length) })),
          b++;
      }
      a.restore();
    })(t, { maxWidth: d, ctx: s, x: a, y: l }),
    s.restore();
}
async function $(t, e) {
  let { node: i, width: c, height: h, dpr: a } = e;
  if (
    ((c = Number.parseFloat(c)),
    (h = Number.parseFloat(h)),
    (a = (function (t) {
      if (r(t) && t > 0) return t;
      {
        const { pixelRatio: t } = wx.getWindowInfo();
        return t;
      }
    })(a)),
    !(o(t) && n(i?.getContext) && c && h))
  )
    return void console.error(`请传入正确的参数，当前 elements：${t}、options：${e}`);
  const l = i.getContext('2d');
  if (!l) return void console.error('获取 Canvas 上下文失败');
  (i.width = c * a), (i.height = h * a), l.scale(a, a);
  const d = { ctx: l, canvas: i, width: c, height: h };
  t.forEach((t) => {
    !n(t) && 'image' === t.type && t.src && u(t.src, i);
  });
  for (let e = 0, o = t.length; e < o; e++) {
    const o = t[e];
    if (!s(o) || (!n(o) && !['text', 'image', 'rect', 'line'].includes(o.type))) {
      console.warn(`请检查配置：${o}`);
      continue;
    }
    if (n(o)) {
      l.save(), await o({ ctx: l, canvas: i, dpr: a }), l.restore();
      continue;
    }
    const r = k(o, t, d);
    switch (o.type) {
      case 'line':
        x({ ...o, ...r }, d);
        break;
      case 'rect':
        C({ ...o, ...r }, d);
        break;
      case 'image':
        await O({ ...o, ...r }, d);
        break;
      case 'text':
        M({ ...o, ...r }, d);
    }
  }
}
export { $ as canvasPoster, a as saveCanvasAsImage, t as wxPromisify };
