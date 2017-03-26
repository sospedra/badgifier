module.exports = (xml) => {
  const metrics = xml.descendantWithPath('project.metrics').attr
  return metrics.coveredstatements / metrics.statements
}
