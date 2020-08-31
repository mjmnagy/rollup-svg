var _color = {
  adjust(p, c0, c1, l) {
    let r,
        g,
        b,
        P,
        f,
        t,
        h,
        i = parseInt,
        m = Math.round,
        a = typeof c1 == 'string';
    if (typeof p != 'number' || p < -1 || p > 1 || typeof c0 != 'string' || c0[0] != 'r' && c0[0] != '#' || c1 && !a) return null;
    if (!this.pSBCr) this.pSBCr = d => {
      let n = d.length,
          x = {};

      if (n > 9) {
        [r, g, b, a] = d = d.split(','), n = d.length;
        if (n < 3 || n > 4) return null;
        x.r = i(r[3] == 'a' ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1;
      } else {
        if (n == 8 || n == 6 || n < 4) return null;
        if (n < 6) d = '#' + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : '');
        d = i(d.slice(1), 16);
        if (n == 9 || n == 5) x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000;else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1;
      }

      return x;
    };
    h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == 'c' ? !h : false : h, f = this.pSBCr(c0), P = p < 0, t = c1 && c1 != 'c' ? this.pSBCr(c1) : P ? {
      r: 0,
      g: 0,
      b: 0,
      a: -1
    } : {
      r: 255,
      g: 255,
      b: 255,
      a: -1
    }, p = P ? p * -1 : p, P = 1 - p;
    if (!f || !t) return null;
    if (l) r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b);else r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5);
    a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0;
    if (h) return 'rgb' + (f ? 'a(' : '(') + r + ',' + g + ',' + b + (f ? ',' + m(a * 1000) / 1000 : '') + ')';else return '#' + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2);
  },

  darken(color, percent) {
    let f = color.split(','),
        t = percent < 0 ? 0 : 255,
        p = percent < 0 ? percent * -1 : percent,
        R = parseInt(f[0].slice(4)),
        G = parseInt(f[1]),
        B = parseInt(f[2]);
    return 'rgb(' + (Math.round((t - R) * p) + R) + ',' + (Math.round((t - G) * p) + G) + ',' + (Math.round((t - B) * p) + B) + ')';
  },

  getColor(colorx, alphax = 1, defaultx = true) {
    // change color hex to RGB
    if (/^[#]/.test(colorx)) {
      let c = this.hexToRgb(colorx);

      if (alphax == 1) {
        colorx = `rgb(${c.r},${c.g},${c.b})`;
      } else {
        colorx = `rgba(${c.r},${c.g},${c.b},${alphax})`;
      }
    } else if (/^rgba/.test(colorx)) {
      if (colorx.search(/.([0-9]\))$/) == -1 && !defaultx) {
        colorx = colorx.replace(/.?([0-9]\))$/, `${alphax})`);
      }
    } else if (/^(rgb)/.test(colorx)) {
      // change rgb and rgba
      if (alphax != 1) {
        colorx = colorx.replace(/^(rgb)/, `rgba`);
        colorx = colorx.replace(/\)$/, `,${alphax})`);
      }
    }

    return colorx;
  },

  rColor(colorx, opacity = 1) {
    if (/^[#]/.test(colorx)) {
      let c = this.hexToRgb(colorx);
      colorx = `rgba(${c.r},${c.g},${c.b},${opacity})`;
    } else if (/^[rgb]/.test(colorx)) {
      let colorSplit = colorx.split(')')[0];

      if (!/^[rgba]/.test(colorx)) {
        colorSplit.replace('rgb', 'rgba');
        colorSplit += `,${opacity})`;
      } else {
        // colorSplit.replace('rgb','rgba')
        colorSplit += `)`;
      }

      colorx = colorSplit;
    }

    return colorx;
  },

  hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

  getVariable(styles, propertyName) {
    return String(styles.getPropertyValue(propertyName)).trim();
  },

  changeColor(colorInicial) {
    let colorx;

    if (/[rgb()]/g.test(colorInicial)) {
      colorx = colorInicial.replace(/[rgb()]/g, '');
    } else if (/[#]/g.test(colorInicial)) {
      let rgbx = this.hexToRgb(colorInicial);
      colorx = `${rgbx.r},${rgbx.g},${rgbx.b}`;
    } else {
      colorx = '--' + colorInicial;
    }

    return colorx;
  }

};

var _sizing = {
  validate(v) {
    return ['px', 'em', 'rem'].some(s => {
      let val = '' + v;
      return val.indexOf(s) !== -1;
    });
  },

  unit(v) {
    let val = '' + v;
    return val.match(/[a-zA-Z]+/g);
  },

  numeral(v) {
    let val = '' + v;
    return Number(val.replace(/[^\d.-]/g, ''));
  }

};

//
var script = {
  name: 'icon',
  //Config
  computed: {
    clr() {
      return _color.getColor(this.color, 1);
    },

    icn() {
      return this.icon != null ? this.icon.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace('.svg', '').toLowerCase().trim() : this.default;
    }

  },

  created() {
    this.getIcon();
  },

  data() {
    return {
      default: 'circle',
      error: false,
      svg: null
    };
  },

  methods: {
    getIcon() {
      let path = `@icons/${this.set}/${this.icn}.svg`;
      import(path).then(({
        default: DefaultExport
      }) => {
        console.log('svg', DefaultExport);

        if (DefaultExport) {
          this.error = false;
          this.svg = DefaultExport;
          return DefaultExport;
        } else {
          this.error = true;
        }
      }).catch(err => {
        console.log('err', err, this.set, this.icn, `@icons/${this.set}/${this.icn}.svg`);
        this.error = true;
      });
    }

  },
  props: {
    icon: {
      default: 'circle',
      type: String
    },
    color: {
      default: null,
      type: String
    },
    set: {
      default: 'light',
      type: String,
      validator: value => {
        return ['brands', 'duotone', 'light', 'regular', 'solid'].includes(value);
      }
    },
    size: {
      type: [Number, String],
      default: '1rem',
      validator: value => {
        return _sizing.validate(value);
      }
    }
  },
  watch: {
    icon() {
      this.getIcon();
    },

    set() {
      this.getIcon();
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return !_vm.error ? _c('i', {
    ref: "iconWrapper",
    staticClass: "s-icon",
    style: {
      width: _vm.size,
      height: _vm.size,
      fill: _vm.clr
    },
    domProps: {
      "innerHTML": _vm._s(_vm.svg)
    }
  }) : _c('span', {
    staticClass: "error"
  });
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-6ece852c_0", {
    source: ".s-icon[data-v-6ece852c]{outline:0;color:inherit;text-align:center;position:relative;display:inline-block;z-index:inherit}.s-icon svg[data-v-6ece852c]{height:inherit;width:inherit}.round[data-v-6ece852c]{border-radius:50%}.error[data-v-6ece852c]{display:block;background:red;width:1rem;height:1rem;border-radius:50%;position:relative;box-shadow:0 0 0 .067rem #fff,0 0 .16rem .08rem #b3b3b3,inset 0 0 .1067rem .007rem #b3b3b3}.error[data-v-6ece852c]:after,.error[data-v-6ece852c]:before{content:'';position:absolute;width:.13rem;height:.567rem;left:.43rem;top:.217rem;box-shadow:0 0 .1067rem .007rem #b3b3b3;background:#fff}.error[data-v-6ece852c]:before{transform:skew(35deg)}.error[data-v-6ece852c]:after{transform:skew(-35deg)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-6ece852c";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

//Icon

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  icon: __vue_component__
});

const install = function installIcons(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component('s-' + componentName, component);
  });
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install on non-es builds, when vue is found

export default plugin;
export { __vue_component__ as icon };
