/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('next-i18next').UserConfig} */
const path = require("node:path")

module.exports = {
  i18n: {
    locales: ["default", "ko", "en", "ja", "vi"],
    defaultLocale: "default",
    localeDetection: false,
  },
  defaultNS: "main",
  localePath: path.resolve("./public/locales"),
}
