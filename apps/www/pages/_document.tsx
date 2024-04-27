import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="ko">
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
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
