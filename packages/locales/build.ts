/* eslint-disable no-console */

import fs from "node:fs"
import path from "node:path"

import lodash from "lodash"
import PublicGoogleSheetsParser from "public-google-sheets-parser"

const parser = new PublicGoogleSheetsParser()
const targetLanguages = ["ko", "en", "ja", "vi"]

const dictionaryDist = `${__dirname}/../dictionary`
const i18nDist = [`${__dirname}/../../../apps/www/public/locales`]

// 메인 => https://docs.google.com/spreadsheets/d/1xMVuKJdOsitsqv6re6wyblnoX_w22vT5y_Gc56cvEvA/edit?usp=sharing
// 초대 => https://docs.google.com/spreadsheets/d/1qOT4QHqS5zYr5iZ-bSTzKB2QwWngDKPorQkOFBTMmz0/edit?usp=sharing
const targetPages = [
  {
    domain: "main",
    sheetId: "1xMVuKJdOsitsqv6re6wyblnoX_w22vT5y_Gc56cvEvA",
  },
  {
    domain: "invite",
    sheetId: "1qOT4QHqS5zYr5iZ-bSTzKB2QwWngDKPorQkOFBTMmz0",
  }
]

console.clear()

targetLanguages.forEach(lang => {
  fs.mkdirSync(path.join(dictionaryDist, lang), { recursive: true })
})

i18nDist.forEach(dist => {
  fs.mkdirSync(dist, { recursive: true })
})

targetPages.forEach(({ domain, sheetId }) => {
  parser
    .parse(sheetId, "dictionary")
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
        if (domain === "main") {
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
        } else {
          const langFile = path.join(
            dictionaryDist,
            lang,
            `${domain}.json`,
          )

          fs.writeFileSync(
            langFile,
            JSON.stringify(dictionary[lang]),
          )
        }

        console.log(`Created ${domain}/${lang} dictionary file.`)
      })

      i18nDist.forEach(dist => {
        fs.cpSync(dictionaryDist, dist, { recursive: true })
      })

      console.log(`${targetLanguages.length} files created for ${domain} domain.`)
    })
    .catch(error => {
      console.error(`${error}`)
    })
  })