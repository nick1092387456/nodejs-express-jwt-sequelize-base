function translateGender(gender) {
  const list = { 男: 'M', 女: 'F' }
  return list[gender]
}

function translateDuty(duty) {
  const list = { 教練: 'Coach', 運動員: 'Athlete', 資料管理員: 'Analyst' }
  return list[duty]
}

module.exports = { translateGender, translateDuty }
