import type { GetServerSideProps } from "next"
import { useRouter } from "next/router"

import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import Head from "next/head"
import Image from "next/image"

export const getServerSideProps = (async ctx => {
  try {
    const koreanbots = await (
      await fetch("https://api.nguard.xyz/www/status")
    ).json()

    return {
      props: {
        data: {
          servers: koreanbots.data.servers,
          votes: koreanbots.data.votes,
        },
        ...(await serverSideTranslations(ctx.locale ?? "ko", [
          "navbar",
          "footer",
          "main",
        ])),
      },
    }
  } catch {
    return {
      props: {
        data: {},
        ...(await serverSideTranslations(ctx.locale ?? "ko", [
          "navbar",
          "footer",
          "main",
        ])),
      },
    }
  }
}) satisfies GetServerSideProps

export default function Home({
  data,
}: {
  data: { servers?: number; votes?: number }
}) {
  const { locale, asPath } = useRouter()
  const { t } = useTranslation("main")

  return (
    <>
      <Head>
        <title>Main : NGuard Security</title>
        <meta property="og:title" content="Main : NGuard Security" />

        <link rel="canonical" href={`https://nguard.xyz${asPath}`} />
      </Head>

      <main>
        <section
          id="section1"
          className="flex h-screen flex-col items-center justify-center px-10 md:px-28"
        >
          {/* 봇 요약 소개 */}
          <div className="mb-8">
            <h2 className="text-center text-5xl font-bold">
              {t("section1.title")}
            </h2>
          </div>
          <p className="mb-20 text-center text-lg font-light text-slate-400 sm:text-xl">
            {t("section1.description")}
          </p>
          <div className="flex w-full max-w-[25rem] flex-col gap-4 sm:w-auto sm:flex-row">
            <a
              className="inline-block rounded-lg bg-blue-600 px-7 py-3 text-center text-lg font-medium text-white shadow-lg shadow-blue-600/40 hover:bg-blue-700 focus:bg-blue-700"
              href={`https://console.nguard.xyz/${locale}`}
            >
              {t("section1.btns.invite")}
            </a>
            <button
              type="button"
              className="inline-block rounded-lg bg-gray-800 px-7 py-3 text-center text-lg font-medium text-white shadow-lg shadow-gray-900/60 hover:bg-gray-900 focus:bg-gray-900"
              onClick={() => window.ChannelIO!("showMessenger")}
            >
              {t("section1.btns.supports")}
            </button>
          </div>
          <iframe
            src="https://nguard-security.github.io/nguard_video_player/plyr/player.html?src=https://cdn.nguard.dev/assets/common/video/background_video.mp4&autoplay=1&loop=1"
            title="Plyr video player"
            allow="autoplay; encrypted-media;"
            className="absolute z-[-1] size-full border-0 object-cover opacity-20 brightness-[120%] contrast-[120%]"
          />
        </section>

        <section
          id="section2"
          className="flex h-[50vh] items-center justify-center bg-[#10121a] px-10 md:px-28"
        >
          {/* 봇 사용자 수 표시 */}
          <div className="flex min-w-0 flex-col gap-12">
            <div className="flex items-center">
              <span className="w-52 text-lg sm:text-xl">
                {t("section2.dday")}
              </span>
              <h4 className="font-suite w-28 min-w-0 shrink-0 rounded-2xl bg-[#1b212d] py-3.5 text-center text-2xl font-black sm:w-40 sm:text-4xl">
                D+
                {Math.floor(
                  (Number(new Date()) -
                    Number(new Date(2022, 4, 12).getTime())) /
                    (1000 * 60 * 60 * 24),
                )}
              </h4>
            </div>
            <div className="flex items-center">
              <span className="w-52 text-lg sm:text-xl">
                {t("section2.invited")}
              </span>
              <h4 className="font-suite w-28 min-w-0 shrink-0 rounded-2xl bg-[#1b212d] py-3.5 text-center text-2xl font-black sm:w-40 sm:text-4xl">
                {data.servers ?? "N/A"}
              </h4>
            </div>
            <div className="flex items-center">
              <span className="w-52 text-lg sm:text-xl">
                {t("section2.votes")}
              </span>
              <h4 className="font-suite w-28 min-w-0 shrink-0 rounded-2xl bg-[#1b212d] py-3.5 text-center text-2xl font-black sm:w-40 sm:text-4xl">
                {data.votes ?? "N/A"}
              </h4>
            </div>
          </div>
        </section>

        <section
          id="section3"
          className="mx-auto flex h-[40vh] max-w-screen-lg items-center px-10 md:px-28 xl:max-w-screen-xl"
        >
          {/* 팀 소개 */}
          <div>
            <h3 className="w-fit bg-clip-text text-4xl font-bold">
              {t("section3.title")}
            </h3>
            <p className="mt-5 max-w-[720px] text-base text-slate-300 sm:text-lg">
              {t("section3.description")}
            </p>
          </div>
        </section>

        <section
          id="section4"
          className="mx-auto flex h-[40vh] max-w-screen-lg items-center px-10 md:px-28 xl:max-w-screen-xl"
        >
          {/* 서비스 소개 */}
          <div>
            <h3 className="w-fit bg-clip-text text-4xl font-bold">
              {t("section4.title")}
            </h3>
            <p className="mt-5 max-w-[720px] text-base text-slate-300 sm:text-lg">
              {t("section4.description")}
            </p>
          </div>
        </section>

        <section
          id="section5"
          className="mx-auto flex h-[65vh] max-w-screen-lg items-center justify-center px-10 md:px-28 xl:max-w-screen-xl"
        >
          {/* 도움이 필요하신가요? */}
          <div className="mb-16 flex w-full flex-col-reverse items-center justify-between gap-10 sm:flex-row">
            <div className="flex flex-col items-center sm:block">
              <h3 className="text-center text-3xl font-bold sm:text-left lg:text-4xl">
                {t("section5.title")}
              </h3>
              <p className="mt-4 text-center text-lg text-slate-300 sm:text-left sm:text-xl">
                {t("section5.description")}
              </p>
              <a
                className="mt-12 inline-block rounded-lg bg-blue-600 px-5 py-3 text-base font-medium text-white shadow-lg shadow-blue-600/40 hover:bg-blue-700 focus:bg-blue-700"
                href={`/invite/nguard?lang=${locale}`}
              >
                {t("section5.btn")}
              </a>
            </div>
            <Image
              src="https://cdn.nguard.dev/assets/main/images/Toa.png"
              alt="Loudspeaker image"
              className="w-20 sm:w-28"
              width={112}
              height={142}
            />
          </div>
        </section>
      </main>
    </>
  )
}
