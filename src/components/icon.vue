<template>
  <i
    ref="iconWrapper"
    v-if="!error"
    class="s-icon"
    v-bind:style="{
      width: size,
      height: size,
      fill: clr
    }"
    v-html="svg"
  ></i>
  <span class="error" v-else></span>
</template>

<script>
import _color from '@mixins/colors'
import _sizing from '@mixins/sizing'

export default {
  name: 'icon',
  //Config
  computed: {
    clr() {
      return _color.getColor(this.color, 1)
    },
    icn() {
      return this.icon != null
        ? this.icon
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .replace('.svg', '')
            .toLowerCase()
            .trim()
        : this.default
    }
  },
  created() {
    this.getIcon()
  },
  data() {
    return {
      default: 'circle',
      error: false,
      svg: null
    }
  },
  methods: {
    getIcon() {
      let path = `@icons/${this.set}/${this.icn}.svg`
      import(path)
        .then(({ default: DefaultExport }) => {
          console.log('svg', DefaultExport)
          if (DefaultExport) {
            this.error = false
            this.svg = DefaultExport

            return DefaultExport
          } else {
            this.error = true
          }
        })
        .catch(err => {
          console.log(
            'err',
            err,
            this.set,
            this.icn,
            `@icons/${this.set}/${this.icn}.svg`
          )
          this.error = true
        })
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
        return ['brands', 'duotone', 'light', 'regular', 'solid'].includes(
          value
        )
      }
    },
    size: {
      type: [Number, String],
      default: '1rem',
      validator: value => {
        return _sizing.validate(value)
      }
    }
  },
  watch: {
    icon() {
      this.getIcon()
    },
    set() {
      this.getIcon()
    }
  }
}
</script>

<style scoped>
.s-icon {
  outline: none;
  color: inherit;
  text-align: center;
  position: relative;
  display: inline-block;
  z-index: inherit;
}

.s-icon svg {
  height: inherit;
  width: inherit;
  /* vertical-align: middle; */
}

.round {
  border-radius: 50%;
}
/* Error*/
.error {
  display: block;
  background: red;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  position: relative;
  box-shadow: 0 0 0 0.067rem white, 0 0 0.16rem 0.08rem #b3b3b3,
    inset 0 0 0.1067rem 0.007rem #b3b3b3;
}

.error:before,
.error:after {
  content: '';
  position: absolute;
  width: 0.13rem;
  height: 0.567rem;
  left: 0.43rem;
  top: 0.217rem;
  box-shadow: 0 0 0.1067rem 0.007rem #b3b3b3;
  background: white;
}
.error:before {
  transform: skew(35deg);
}
.error:after {
  transform: skew(-35deg);
}
</style>
