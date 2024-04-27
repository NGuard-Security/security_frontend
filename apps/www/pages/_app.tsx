import "@/styles/globals.css"

import type { AppProps } from "next/app"
import { appWithTranslation } from "next-i18next"

import Head from "next/head"

import Navbar from "@packages/ui/components/Navbar"
import Footer from "@packages/ui/components/Footer"
import ChannelIO from "@packages/channelio/component"

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <meta
          name="description"
          content="NGuard Security는 디스코드 보안 서비스로, 디스코드 서버 보안에 새로운 변화를 선사합니다."
        />
        <meta
          property="og:description"
          content="NGuard Security는 디스코드 보안 서비스로, 디스코드 서버 보안에 새로운 변화를 선사합니다."
        />

        <link
          rel="preconnect"
          href="https://cdn.nguard.dev"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />

        <link
          rel="shortcut icon"
          href="https://cdn.nguard.dev/assets/common/images/favicon.png"
        />
        <link
          rel="apple-touch-icon"
          href="https://cdn.nguard.dev/assets/common/images/favicon.png"
        />
      </Head>
      <Navbar domain="www" />

      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />

      <Footer />
      <ChannelIO />
    </>
  )
}

export default appWithTranslation(App)
