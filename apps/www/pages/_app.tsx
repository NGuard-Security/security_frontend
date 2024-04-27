import "@/styles/globals.css"

import type { AppProps } from "next/app"
import { appWithTranslation } from "next-i18next"

import Navbar from "@packages/ui/components/Navbar"
import Footer from "@packages/ui/components/Footer"
import ChannelIO from "@packages/channelio/component"

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar domain="www" />

      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />

      <Footer />
      <ChannelIO />
    </>
  )
}

export default appWithTranslation(App)
