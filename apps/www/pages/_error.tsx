import { GetServerSideProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import Head from "next/head"
import Link from "next/link"

export const getServerSideProps = (async ctx => {
  const statusCode = ctx.res ? ctx.res.statusCode : null

  return {
    props: {
      statusCode,
      ...(await serverSideTranslations(ctx.locale ?? "ko", [
        "navbar",
        "footer",
      ])),
    },
  }
}) satisfies GetServerSideProps

export default function Error({
  statusCode,
}: {
  statusCode: number
}) {
  return (
    <>
      <Head>
        <title>Error : NGuard Security</title>
        <meta property="og:title" content="Error : NGuard Security" />
      </Head>

      <main className="relative flex h-screen flex-col items-center justify-center gap-3 break-keep px-4 text-center">
        {statusCode === 400 ? (
          <h1 className="font-semibold">400 Bad Request</h1>
        ) : statusCode === 403 ? (
          <h1 className="font-semibold">403 Forbidden</h1>
        ) : statusCode === 404 ? (
          <h1 className="font-semibold">404 Not Found</h1>
        ) : statusCode === 429 ? (
          <h1 className="font-semibold">429 Too Many Request</h1>
        ) : statusCode === 500 ? (
          <h1 className="font-semibold">500 Internal Server Error</h1>
        ) : (
          <h1 className="font-semibold">Unexpected Error</h1>
        )}

        {statusCode === 400 || statusCode === 403 ? (
          <>
            <h3 className="text-[2rem] font-bold">
              비정상적인 경로로 접속하셨습니다.
            </h3>
            <p>정상적인 경로로 다시 시도해 주시기 바랍니다.</p>
          </>
        ) : statusCode === 404 ? (
          <>
            <h3 className="text-[2rem] font-bold">
              존재하지 않는 페이지입니다.
            </h3>
            <p>올바른 링크인지 다시 한번 확인해 주시기 바랍니다.</p>
          </>
        ) : statusCode === 429 ? (
          <>
            <h3 className="text-[2rem] font-bold">
              너무 많은 요청이 들어왔습니다.
            </h3>
            <p>잠시 후 다시 시도해 주시기 바랍니다.</p>
          </>
        ) : statusCode === 500 ? (
          <>
            <h3 className="text-[2rem] font-bold">
              서버 내부에서 오류가 발생했습니다.
            </h3>
            <p>하단 채널톡으로 오류를 제보해주시면 감사하겠습니다.</p>
          </>
        ) : (
          <>
            <h3 className="text-[2rem] font-bold">
              알 수 없는 오류가 발생했습니다.
            </h3>
            <p>하단 채널톡으로 오류를 제보해주시면 감사하겠습니다.</p>
          </>
        )}

        <Link
          className="mt-10 inline-flex items-center rounded-lg bg-blue-600 px-7 py-3 text-center text-base font-medium text-white shadow-lg shadow-blue-600/40 hover:bg-blue-700 focus:bg-blue-700"
          href="/"
        >
          메인으로 돌아가기
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-3 size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </main>
    </>
  )
}
