module.exports = (xml) => {
  const metrics = xml.descendantWithPath('project.metrics').attr
  return Math.round(metrics.coveredstatements / metrics.statements * 100)
}
