import { useEffect, useState } from "react"
import type { GetServerSideProps } from "next"

import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import Script from "next/script"

import { useRouter } from "next/router"
import {
  setCookie,
  getCookie,
  hasCookie,
  deleteCookie,
} from "cookies-next"

import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { nanoid } from "nanoid"
import { type APIUser } from "discord-api-types/v10"

import { useFetch } from "@packages/swr"
import { InviteProps } from "@/types/props/invite"

import {
  IdentifyVerify,
  OAuthVerify,
} from "@/components/invite/verify"

import { InviteActions } from "@/utils/invite"

export const getServerSideProps = (async ctx => {
  if (!ctx.params?.id) return { notFound: true }

  const { req, res } = ctx

  // Access Token이 있는지 확인
  if (!hasCookie("access_token", { req, res })) {
    const redirectUrl =
      req.headers.host?.startsWith("localhost") ||
      req.headers.host?.startsWith("127.")
        ? `http://${req.headers.host}`
        : `https://${req.headers.host}`

    const state = nanoid(16)

    setCookie(
      `callback:${state}`,
      Buffer.from(
        JSON.stringify({
          id: ctx.params.id,
          lang: ctx.locale ?? "ko",
        }),
      ).toString("base64"),
      { req, res },
    )

    return {
      redirect: {
        permanent: false,
        destination: `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${redirectUrl}/api/invite/callback&response_type=code&scope=identify+guilds+guilds.join+email&state=${state}`,
      },
    }
  }

  // 서버 정보 조회
  const guild = await (
    await fetch(`http://localhost:4000/invite/${ctx.params?.id}`)
  ).json()

  if (!guild) return { notFound: true }

  // Props 반환
  return {
    props: {
      guild: guild.data,
      ...(await serverSideTranslations(ctx.locale ?? "ko", [
        "invite",
      ])),
      accessToken: getCookie("access_token", { req, res }),
    },
  }
}) satisfies GetServerSideProps

export default function Invite({ guild, accessToken }: InviteProps) {
  const { asPath, locale } = useRouter()
  const { t } = useTranslation("invite")

  const [currentStep, setCurrentStep] = useState<
    "info" | "captcha" | "oauth" | "verify" | "process"
  >("info")

  const {
    data: user,
    error: userError,
    isLoading: isUserLoading,
  } = useFetch<APIUser>("https://discord.com/api/v10/users/@me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const actions = new InviteActions()

  useEffect(() => {
    actions.setWindow(window)

    if (!user && userError) {
      alert(
        `${t("common.errors.401_title")}\n${t("common.errors.401_description")}`,
      )

      deleteCookie("access_token")
      window.location.reload()
    }
  })

  return (
    <>
      <Head>
        <title>Main : NGuard Security</title>
        <meta property="og:title" content="Main : NGuard Security" />

        <link rel="canonical" href={`https://nguard.xyz${asPath}`} />
      </Head>

      <div className="absolute left-16 top-12">
        <Link href="/" aria-label="NGuard Logo">
          <Image
            src="https://cdn.nguard.dev/assets/common/images/logo.png"
            width={130}
            height={43}
            alt="NGuard Logo"
          />
        </Link>
      </div>

      <main className="flex h-screen w-screen items-center justify-center bg-[#131718]">
        <div className="relative h-screen w-screen overflow-hidden rounded-none bg-[#37393e] lg:h-[620px] lg:w-[900px] lg:rounded-2xl">
          <div className="flex h-10 w-full items-center bg-[#1d1f22]">
            <p className="ml-5 size-4 rounded-full bg-[#ff5050]" />
          </div>
          <div className="h-[580px]">
            {currentStep === "info" && (
              <div className="flex size-full select-none flex-col items-center justify-center">
                <Image
                  loading="lazy"
                  className="mx-auto my-0 mb-4 block h-16 rounded-2xl"
                  width={64}
                  height={64}
                  alt={`${guild.name} Icon`}
                  src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`}
                />
                <div className="mb-12 cursor-default">
                  <h2 className="mx-auto my-0 flex w-fit flex-col items-center justify-center gap-4 text-center text-xl font-bold text-white lg:text-2xl">
                    {guild.name}
                  </h2>

                  <article className="mx-0 my-4 flex justify-center break-keep border-0 p-0 text-center align-baseline text-base leading-5 text-[#b9bbbe]">
                    <div className="mr-4">
                      <i className="mr-2 inline-block size-2.5 rounded-full bg-[#38a85b]" />
                      <span>
                        {t("info.members.online").replace(
                          "{Count}",
                          guild.member_count.online.toString(),
                        )}
                      </span>
                    </div>

                    <div>
                      <i className="mr-2 inline-block size-2.5 rounded-full bg-[#b9bbbe]" />
                      <span>
                        {t("info.members.everyone").replace(
                          "{Count}",
                          guild.member_count.everyone.toString(),
                        )}
                      </span>
                    </div>
                  </article>
                </div>

                <div className="mb-12 cursor-default">
                  <h3 className="mx-auto my-0 flex w-fit flex-col items-center justify-center gap-4 text-center text-base font-bold text-white lg:text-lg">
                    {t("info.user")}
                  </h3>

                  <footer className="mx-auto mb-auto mt-4 table text-center">
                    {!user || isUserLoading ? (
                      <div className="flex items-center gap-2.5">
                        <Image
                          src="https://cdn.nguard.dev/assets/common/images/loading_dark.png"
                          width={40}
                          height={40}
                          className="animate-spin"
                          alt={t("common.messages.loading")}
                        />

                        <div className="min-w-0 grow select-text">
                          <h2 className="mx-auto my-0 flex w-fit flex-col items-center justify-center gap-4 text-center text-xl font-bold text-white lg:text-2xl">
                            {t("common.messages.loading")}
                          </h2>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2.5">
                        <Image
                          src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=40`}
                          width={40}
                          height={40}
                          className="rounded-full"
                          alt={
                            user.username +
                            (user.discriminator === "0"
                              ? ""
                              : `#${user.discriminator}`)
                          }
                        />

                        <div className="mr-1 min-w-0 grow select-text">
                          <h2 className="mx-auto my-0 flex w-fit flex-col items-center justify-center gap-4 text-center text-xl font-bold text-white lg:text-2xl">
                            {user.username +
                              (user.discriminator === "0"
                                ? ""
                                : `#${user.discriminator}`)}
                          </h2>
                        </div>
                      </div>
                    )}
                  </footer>
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    type="button"
                    className="flex h-10 min-w-56 cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[#5865f2] px-5 py-0 hover:brightness-90"
                    onClick={() => {
                      actions.TURNSTILE.render(locale ?? "auto")
                      setCurrentStep("captcha")
                    }}
                  >
                    <span style={{ color: "#fff" }}>
                      {t("common.buttons.accept")}
                    </span>
                  </button>
                </div>
              </div>
            )}

            <div
              className={`size-full select-none flex-col items-center justify-center ${
                currentStep === "captcha" ? "flex" : "hidden"
              }`}
            >
              <div className="mb-12 cursor-default">
                <h2 className="mx-auto my-0 flex w-fit flex-col items-center justify-center gap-4 text-center text-xl font-bold text-white lg:text-2xl">
                  {t("captcha.title")}
                </h2>
              </div>

              <div className="mb-12 cursor-default">
                <footer id="cf-turnstile" />
              </div>

              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  className="flex h-10 min-w-56 cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[#5865f2] px-5 py-0 hover:brightness-90"
                  onClick={async () => {
                    const response = await actions.COMMON.goNextStep(
                      "captcha",
                      {
                        guild: guild.id,
                      },
                    )

                    if (response?.success) {
                      setCurrentStep(
                        response.data.nextStep.toLowerCase(),
                      )
                    } else {
                      alert(
                        "Something went wrong. Please try again later.",
                      )
                    }
                  }}
                >
                  <span className="text-white">
                    {t("common.buttons.captcha")}
                  </span>
                </button>
              </div>
            </div>

            {(currentStep === "oauth" ||
              currentStep === "verify") && (
              <div
                id="verification_area"
                className="flex size-full select-none flex-col items-center justify-center"
              >
                <div className="mb-12 cursor-default">
                  <h2 className="mx-auto my-0 flex w-fit flex-col items-center justify-center gap-4 text-center text-xl font-bold text-white lg:text-2xl">
                    {t("verify.title")}
                  </h2>
                  <p className="mx-auto mb-0 mt-4 w-fit text-[#afabab]">
                    {t("verify.description")}
                  </p>
                </div>

                {guild.config.oauth && (
                  <OAuthVerify t={t} actions={actions} />
                )}
                {guild.config.verify && <IdentifyVerify t={t} />}
              </div>
            )}

            {currentStep === "process" && (
              <div className="flex size-full select-none flex-col items-center justify-center">
                <div className="mb-12 cursor-default">
                  <h2 className="mx-auto my-0 flex w-fit flex-row items-center justify-center gap-4 text-center text-xl font-bold text-white lg:text-2xl">
                    <Image
                      src="https://cdn.nguard.dev/assets/common/images/loading_dark.png"
                      width={25}
                      height={25}
                      alt={t("common.messages.loading")}
                    />
                    <span />
                  </h2>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex h-10 min-w-56 cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[#5865f2] px-5 py-0 hover:brightness-90">
                    <span className="text-white">
                      {t("common.buttons.discord")}
                    </span>
                  </div>
                  <div className="flex h-10 min-w-56 cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[#5865f2] px-5 py-0 hover:brightness-90">
                    <span className="text-white">
                      {t("common.buttons.tryagain")}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        async
        defer
      />
    </>
  )
}
