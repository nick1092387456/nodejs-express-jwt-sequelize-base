const createCsvWriter = require('csv-writer').createObjectCsvWriter
const path = require('path')

async function writer(fileName, label, documentPath) {
  try {
    const writeFilePath = path.resolve(
      process.cwd(),
      `${documentPath}${fileName}.csv`
    )

    const csvWriter = createCsvWriter({
      path: writeFilePath,
      header: label,
    })
    const data = []
    await csvWriter.writeRecords(data)
    return { success: true }
  } catch (err) {
    console.log(err)
  }
}

module.exports = writer
