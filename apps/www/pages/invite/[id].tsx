import { useState } from "react"

import type { GetServerSideProps } from "next"
import { useRouter } from "next/router"

import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { InviteProps } from "@/types/props/invite"

import Head from "next/head"
import Link from "next/link"
import Image from "next/image"

export const getServerSideProps = (async ctx => {
  if (!ctx.params?.id) return { notFound: true }

  const guild = await (
    await fetch(`http://localhost:4000/invite/${ctx.params?.id}`)
  ).json()

  if (!guild) return { notFound: true }

  return {
    props: {
      guild: guild.data,
      ...(await serverSideTranslations(ctx.locale ?? "ko", [
        "invite",
      ])),
    },
  }
}) satisfies GetServerSideProps

export default function Invite({ guild }: InviteProps) {
  const { asPath } = useRouter()
  const { t } = useTranslation("invite")

  const [currentStep, setCurrentStep] = useState<
    "info" | "captcha" | "process"
  >("info")

  return (
    <>
      <Head>
        <title>Main : NGuard Security</title>
        <meta property="og:title" content="Main : NGuard Security" />

        <link rel="canonical" href={`https://nguard.xyz${asPath}`} />
      </Head>

      <div className="absolute left-[70px] top-[50px] bg-[#131718]">
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
        <div className="relative h-screen w-screen overflow-hidden rounded-none bg-[#37393e] lg:h-[620px] lg:w-[900px] lg:rounded-[14px]">
          <div className="flex h-10 w-full items-center bg-[#1d1f22]">
            <p className="ml-5 size-[15px] rounded-[1000px] bg-[#ff5050]" />
          </div>
          <div className="h-[580px]">
            <div
              className={`flex size-full select-none flex-col items-center justify-center ${
                currentStep !== "info" ? " hidden" : ""
              }`}
            >
              <Image
                loading="lazy"
                className="mx-auto my-0 mb-4 block h-16 rounded-2xl"
                width={64}
                height={64}
                alt={`${guild.name} Icon`}
                src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`}
              />
              <div className="mb-[50px] cursor-default">
                <h2 className="mx-auto my-0 flex w-fit flex-col items-center justify-center gap-[15px] text-center text-xl font-bold text-white lg:text-2xl">
                  {guild.name}
                </h2>

                <article className="mx-0 my-[15px] flex justify-center break-keep border-0 p-0 text-center align-baseline text-base leading-5 text-[#b9bbbe]">
                  <div className="mr-4">
                    <i className="mr-1 inline-block size-2.5 rounded-full bg-[#38a85b]" />
                    <span>
                      {t("info.members.online").replace(
                        "{Count}",
                        guild.member_count.online.toString(),
                      )}
                    </span>
                  </div>

                  <div>
                    <i className="mr-1 inline-block size-2.5 rounded-full bg-[#b9bbbe]" />
                    <span>
                      {t("info.members.everyone").replace(
                        "{Count}",
                        guild.member_count.everyone.toString(),
                      )}
                    </span>
                  </div>
                </article>
              </div>

              <div className="mb-[50px] cursor-default">
                <h3 className="mx-auto my-0 flex w-fit flex-col items-center justify-center gap-[15px] text-center text-base font-bold text-white lg:text-lg">
                  {t("info.user")}
                </h3>

                <footer className="mx-auto mb-auto mt-[15px] table text-center">
                  <div
                    v-if="!user"
                    className="flex items-center gap-2.5"
                  >
                    <Image
                      src="https://cdn.nguard.dev/assets/common/images/loading_dark.png"
                      width={40}
                      height={40}
                      alt={t("common.messages.loading")}
                    />

                    <div className="min-w-0 grow select-text">
                      <h2 className="mx-auto my-0 flex w-fit flex-col items-center justify-center gap-[15px] text-center text-xl font-bold text-white lg:text-2xl">
                        {t("common.messages.loading")}
                      </h2>
                    </div>
                  </div>

                  <div
                    v-else=""
                    className="flex items-center gap-2.5"
                  >
                    {/* <Image
                      src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=40`}
                      width={40}
                      height={40}
                      alt={
                        user.username +
                        (user.discriminator == "0"
                          ? ""
                          : "#" + user.discriminator)
                      }
                    /> */}

                    <div className="mr-1 min-w-0 grow select-text">
                      <h2 className="mx-auto my-0 flex w-fit flex-col items-center justify-center gap-[15px] text-center text-xl font-bold text-white lg:text-2xl">
                        {/* {user.username +
                          (user.discriminator == "0"
                            ? ""
                            : "#" + user.discriminator)} */}
                      </h2>
                    </div>
                  </div>
                </footer>
              </div>

              <div className="flex flex-col gap-[15px]">
                <div className="flex h-10 min-w-[220px] cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[#5865f2] px-5 py-0 hover:brightness-90">
                  <span style={{ color: "#fff" }}>
                    {t("common.buttons.accept")}
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`size-full select-none flex-col items-center justify-center ${
                currentStep !== "captcha" ? " hidden" : "flex"
              }`}
            >
              <div>
                <h2 className="mx-auto my-0 flex w-fit flex-col items-center justify-center gap-[15px] text-center text-xl font-bold text-white lg:text-2xl">
                  {t("captcha.title")}
                </h2>
              </div>

              <div>
                <footer
                  id="captcha"
                  className="g-recaptcha"
                  data-sitekey="0x4AAAAAAAIvR1jGDQRhQm2E"
                />
              </div>

              <div className="flex flex-col gap-[15px]">
                <div className="flex h-10 min-w-[220px] cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[#5865f2] px-5 py-0 hover:brightness-90">
                  <span className="text-white">
                    {t("common.buttons.captcha")}
                  </span>
                </div>
              </div>
            </div>

            <div
              id="verification_area"
              className="flex hidden size-full select-none flex-col items-center justify-center"
            />

            <div
              className={`size-full select-none flex-col items-center justify-center ${
                currentStep !== "process" ? " hidden" : "flex"
              }`}
            >
              <div className="mb-[50px] cursor-default">
                <h2 className="mx-auto my-0 flex w-fit flex-row items-center justify-center gap-[15px] text-center text-xl font-bold text-white lg:text-2xl">
                  <Image
                    src="https://cdn.nguard.dev/assets/common/images/loading_dark.png"
                    width={25}
                    height={25}
                    alt={t("common.messages.loading")}
                  />
                  <span />
                </h2>
              </div>

              <div className="flex flex-col gap-[15px]">
                <div className="flex h-10 min-w-[220px] cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[#5865f2] px-5 py-0 hover:brightness-90">
                  <span className="text-white">
                    {t("common.buttons.discord")}
                  </span>
                </div>
                <div className="flex h-10 min-w-[220px] cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[#5865f2] px-5 py-0 hover:brightness-90">
                  <span className="text-white">
                    {t("common.buttons.tryagain")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
