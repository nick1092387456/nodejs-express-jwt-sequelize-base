function translateGender(gender) {
  const list = { 男: 'M', 女: 'F' }
  return list[gender]
}

function translateDuty(duty) {
  const list = { 教練: 'Coach', 運動員: 'Athlete', 資料管理員: 'Analyst' }
  return list[duty]
}

function translateSport(sport) {
  const list = {
    女子曲棍球: 'women_hockey',
    男子曲棍球: 'men_hockey',
    韻律體操: 'rhythmic_gymnastics',
    角力: 'wrestling',
    橄欖球: 'rugby',
    划船: 'boating',
    自由車: 'liberty_car',
    柔道: 'judo',
  }
  return list[sport]
}

module.exports = { translateGender, translateDuty, translateSport }
