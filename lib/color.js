module.exports = color = (params, rate) => {
  if (rate < params.threshold_low) return 'red'
  if (rate < params.thershold_high) return 'yellow'
  if (rate < 100) return 'green'
}
