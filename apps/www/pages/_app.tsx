import "@/styles/globals.css"

import type { AppProps } from "next/app"
import { appWithTranslation } from "next-i18next"
import { GoogleTagManager } from "@next/third-parties/google"

import Head from "next/head"
import Script from "next/script"

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

      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />

      <ChannelIO />
      <GoogleTagManager gtmId="GTM-KKQTHLK" />

      <Script id="clarity" strategy="afterInteractive">
        {`
          (function (c, l, a, r, i, t, y) {
              c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
              t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
              y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
          })(window, document, "clarity", "script", "kdwq1fta0g");
        `}
      </Script>
    </>
  )
}

export default appWithTranslation(App)
