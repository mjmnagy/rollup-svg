export default {
  validate(v) {
    return ['px', 'em', 'rem'].some(s => {
      let val = '' + v
      return val.indexOf(s) !== -1
    })
  },
  unit(v) {
    let val = '' + v
    return val.match(/[a-zA-Z]+/g)
  },
  numeral(v) {
    let val = '' + v
    return Number(val.replace(/[^\d.-]/g, ''))
  }
}
