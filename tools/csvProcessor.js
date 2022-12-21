const createCsvWriter = require('csv-writer').createObjectCsvWriter
const { parse } = require('csv-parse')
const fs = require('fs')
const fsPromises = fs.promises
const path = require('path')

//測試用
// parser('測試', `./`)

//parser
async function parser(fileName, documentPath) {
  const inputFilePath = path.resolve(
    process.cwd(),
    `${documentPath}${fileName}.csv`
  )

  const inputFile = await fsPromises.readFile(inputFilePath)
  const parsedResult = await parseCSV(inputFile, {
    delimiter: ',',
    skip_empty_lines: true,
    trim: true,
    // columns: true,
  })
  // console.log('parsedResult', parsedResult)
  return parsedResult
}
function parseCSV(input, options) {
  return new Promise((resolve, reject) => {
    parse(input, options, (error, output) => {
      if (error) {
        console.error('[ERROR] parseCSV: ', error.message)
        reject('[ERROR] parseCSV: ', error.message)
      }

      resolve(output)
    })
  })
}

//writer
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

//getHeader
function getLabel(file) {
  return new Promise((resolve, reject) => {
    const options = {
      delimiter: ',',
      skip_empty_lines: true,
      trim: true,
    }
    parse(file, options, (error, output) => {
      if (error) {
        console.error('[ERROR] parseCSV: ', error.message)
        reject('[ERROR] parseCSV: ', error.message)
      }

      resolve(output)
    })
  })
}

module.exports = { parser, writer, getLabel }
