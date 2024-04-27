/* eslint-disable no-console */

import fs from "node:fs"
import path from "node:path"

import lodash from "lodash"
import PublicGoogleSheetsParser from "public-google-sheets-parser"

const parser = new PublicGoogleSheetsParser()
const targetLanguages = ["ko", "en", "ja", "vi"]

const dictionaryDist = `${__dirname}/../dictionary`
const i18nDist = [`${__dirname}/../../../apps/www/public/locales`]

console.clear()

targetLanguages.forEach(lang => {
  fs.mkdirSync(path.join(dictionaryDist, lang), { recursive: true })
})

i18nDist.forEach(dist => {
  fs.mkdirSync(dist, { recursive: true })
})

// https://docs.google.com/spreadsheets/d/1xMVuKJdOsitsqv6re6wyblnoX_w22vT5y_Gc56cvEvA/edit?usp=sharing
parser
  .parse("1xMVuKJdOsitsqv6re6wyblnoX_w22vT5y_Gc56cvEvA", "dictionary")
  .then(rows => {
    const dictionary: {
      [key: string]: {
        [key: string]: string
      }
    } = {}

    rows.forEach(row => {
      targetLanguages.forEach(lang => {
        lodash.set(dictionary, `${lang}.${row.key}`, row[lang])
      })
    })

    targetLanguages.forEach(lang => {
      Object.keys(dictionary[lang]).forEach(key => {
        const langFile = path.join(
          dictionaryDist,
          lang,
          `${key}.json`,
        )
        fs.writeFileSync(
          langFile,
          JSON.stringify(dictionary[lang][key]),
        )
      })

      console.log(`Created ${lang} dictionary file.`)
    })

    i18nDist.forEach(dist => {
      fs.cpSync(dictionaryDist, dist, { recursive: true })
    })

    console.log(`${targetLanguages.length} files created.`)
  })
  .catch(error => {
    console.error(`${error}`)
  })
