module.exports = (params, rate) => {
  if (rate < params.tl) return 'red'
  if (rate < params.th) return 'yellow'
  if (rate <= 100) return 'green'
}
