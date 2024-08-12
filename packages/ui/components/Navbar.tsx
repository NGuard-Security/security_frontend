import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import Link from "next/link"
import Image from "next/image"

export default function Navbar({
  domain,
}: {
  domain: "www" | "checkout"
}) {
  const { locale, asPath } = useRouter()
  const { t } = useTranslation("navbar")

  const headerRef = useRef<HTMLDivElement>(null)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  useEffect(() => {
    if (asPath === "/") {
      headerRef.current?.classList.remove("backdrop-blur-sm")
      headerRef.current?.classList.remove("shadow-sm")
      headerRef.current?.classList.remove("bg-[#0f1016]/50")
    }

    if (window.scrollY >= 0.1 || asPath !== "/") {
      headerRef.current?.classList.add("backdrop-blur-sm")
      headerRef.current?.classList.add("shadow-sm")
      headerRef.current?.classList.add("bg-[#0f1016]/50")
    }

    document.addEventListener("scroll", () => {
      if (window.scrollY >= 0.1) {
        headerRef.current?.classList.add("backdrop-blur-sm")
        headerRef.current?.classList.add("shadow-sm")
        headerRef.current?.classList.add("bg-[#0f1016]/50")
      } else if (asPath === "/") {
        headerRef.current?.classList.remove("backdrop-blur-sm")
        headerRef.current?.classList.remove("shadow-sm")
        headerRef.current?.classList.remove("bg-[#0f1016]/50")
      }
    })
  })

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className={`fixed z-40 size-full transition-colors duration-[0.4s] md:hidden ${
          isMobileNavOpen
            ? "pointer-events-auto bg-black/40"
            : "pointer-events-none bg-transparent"
        }`}
        onClick={() => setIsMobileNavOpen(false)}
      />

      <header className="fixed z-50 w-full">
        <div
          className={`flex h-20 select-none items-center justify-center ${
            isMobileNavOpen
              ? "bg-neutral-900"
              : "bg-[#0f1016]/50 shadow-sm backdrop-blur-sm transition-colors"
          }`}
          ref={headerRef}
        >
          {/* PC Navbar */}
          <nav className="hidden max-w-7xl grow items-center md:flex">
            {domain === "www" ? (
              <Link
                href="/"
                className="flex flex-1 gap-3"
                onClick={() => {
                  setIsMobileNavOpen(false)
                  setIsUserMenuOpen(false)
                }}
              >
                <Image
                  src="https://cdn.nguard.dev/assets/common/images/logo.png"
                  width={123}
                  height={40}
                  className="h-10 rounded-lg"
                  loading="lazy"
                  alt="NGuard Logo"
                />
              </Link>
            ) : (
              <a
                href={`https://nguard.xyz/${locale}`}
                className="flex flex-1 gap-3"
              >
                <Image
                  src="https://cdn.nguard.dev/assets/common/images/logo.png"
                  width={123}
                  height={40}
                  className="h-10 rounded-lg"
                  loading="lazy"
                  alt="NGuard Logo"
                />
              </a>
            )}

            <ul className="flex space-x-12">
              <li>
                {domain === "www" ? (
                  <Link
                    href="/"
                    className="text-center text-sm text-white hover:font-semibold"
                    onClick={() => {
                      setIsMobileNavOpen(false)
                      setIsUserMenuOpen(false)
                    }}
                  >
                    {t("home")}
                  </Link>
                ) : (
                  <a
                    href={`https://nguard.xyz/${locale}`}
                    className="text-center text-sm text-white hover:font-semibold"
                  >
                    {t("home")}
                  </a>
                )}
              </li>
              <li>
                <a
                  href={`https://console.nguard.xyz/${locale}`}
                  className="text-center text-sm text-white hover:font-semibold"
                >
                  {t("dashboard")}
                </a>
              </li>
              <li>
                <a
                  href={`/invite/nguard?lang=${locale}`}
                  className="text-center text-sm text-white hover:font-semibold"
                >
                  {t("support")}
                </a>
              </li>
              {/*
                <li>
                  {domain === "www" ? (
                    <Link
                      href="/upgrade"
                      className="text-center text-sm text-white hover:font-semibold"
                      onClick={() => {
                        setIsMobileNavOpen(false)
                        setIsUserMenuOpen(false)
                      }}
                    >
                      {t("upgrade")}
                    </Link>
                  ) : (
                    <a
                      href={`https://nguard.xyz/${locale}/upgrade`}
                      className="text-center text-sm text-white hover:font-semibold"
                    >
                      {t("upgrade")}
                    </a>
                  )}
                </li>
              */}
            </ul>

            <ul className="flex flex-1 justify-end space-x-4">
              <li>
                <div className="flex flex-1 justify-end space-x-4">
                  <div className="relative text-sm text-white">
                    <button
                      type="button"
                      className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-white/[.05] active:bg-white/[.08]"
                      onClick={() => {
                        setIsUserMenuOpen(!isUserMenuOpen)
                      }}
                    >
                      <Image
                        src="https://cdn.nguard.dev/assets/common/images/default_profile.png"
                        width={20}
                        height={20}
                        alt="User profile image"
                        className="h-5 rounded-full"
                      />

                      <svg
                        className={`w-5 fill-gray-500 transition-transform duration-[0.2s] ease-[ease]${
                          isUserMenuOpen ? " rotate-180" : ""
                        }`}
                        clipRule="evenodd"
                        fillRule="evenodd"
                        strokeLinejoin="round"
                        strokeMiterlimit={2}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z" />
                      </svg>
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute z-40 mt-5 flex w-36 cursor-pointer flex-col rounded-lg bg-neutral-900 p-1.5 backdrop-blur-sm">
                        {/*
                          {domain === "checkout" ? (
                            <Link
                              href="/mypage"
                              className="cursor-pointer rounded-lg p-2 text-xs font-semibold hover:bg-white/[.05] active:bg-white/[.08]"
                              onClick={() => {
                                setIsMobileNavOpen(false)
                                setIsUserMenuOpen(false)
                              }}
                            >
                              {t("payhistory")}
                            </Link>
                          ) : (
                            <a
                              href={`https://checkout-v2test.nguard.dev/${locale}/mypage`}
                              className="cursor-pointer rounded-lg p-2 text-xs font-semibold hover:bg-white/[.05] active:bg-white/[.08]"
                            >
                              {t("payhistory")}
                            </a>
                          )}

                          <hr className="mx-2.5 my-2 border-zinc-800" />
                        */}

                        {/* 언어 선택 */}
                        <div className="flex flex-col">
                          {locale !== "ko" && (
                            <Link
                              href="/"
                              className="cursor-pointer rounded-lg p-2 text-xs font-semibold hover:bg-white/[.05] active:bg-white/[.08]"
                              onClick={() => {
                                setIsMobileNavOpen(false)
                                setIsUserMenuOpen(false)
                              }}
                              locale="ko"
                              data-lang="ko"
                            >
                              한국어
                            </Link>
                          )}

                          {locale !== "en" && (
                            <Link
                              href="/"
                              className="cursor-pointer rounded-lg p-2 text-xs font-semibold hover:bg-white/[.05] active:bg-white/[.08]"
                              onClick={() => {
                                setIsMobileNavOpen(false)
                                setIsUserMenuOpen(false)
                              }}
                              locale="en"
                              data-lang="en"
                            >
                              English
                            </Link>
                          )}

                          {locale !== "ja" && (
                            <Link
                              href="/"
                              className="cursor-pointer rounded-lg p-2 text-xs font-semibold hover:bg-white/[.05] active:bg-white/[.08]"
                              onClick={() => {
                                setIsMobileNavOpen(false)
                                setIsUserMenuOpen(false)
                              }}
                              locale="ja"
                              data-lang="ja"
                            >
                              日本語
                            </Link>
                          )}

                          {locale !== "vi" && (
                            <Link
                              href="/"
                              className="cursor-pointer rounded-lg p-2 text-xs font-semibold hover:bg-white/[.05] active:bg-white/[.08]"
                              onClick={() => {
                                setIsMobileNavOpen(false)
                                setIsUserMenuOpen(false)
                              }}
                              locale="vi"
                              data-lang="vi"
                            >
                              Tiếng Việt
                            </Link>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            </ul>
          </nav>

          {/* Mobile Navbar */}
          <nav className="flex w-full items-center gap-2 px-6 md:hidden">
            <div className="grow">
              <Link href="/" className="flex flex-1 gap-3">
                <Image
                  src="https://cdn.nguard.dev/assets/common/images/logo.png"
                  width={123}
                  height={40}
                  className="h-10 rounded-lg"
                  loading="lazy"
                  alt="NGuard Logo"
                />
              </Link>
            </div>

            <button
              type="button"
              className="rounded-lg px-3 py-2 font-bold"
              aria-label={
                !isMobileNavOpen ? "Open menu" : "Close menu"
              }
              onClick={() => {
                setIsMobileNavOpen(!isMobileNavOpen)
              }}
            >
              {!isMobileNavOpen ? (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M64 384h384v-42.666H64V384zm0-106.666h384v-42.667H64v42.667zM64 128v42.665h384V128H64z" />
                </svg>
              ) : (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z" />
                </svg>
              )}
            </button>
          </nav>
        </div>

        {/* Mobile Navbar Menu */}
        <div
          className={`overflow-hidden bg-neutral-900 transition-[height] duration-[0.4s] ease-in-out md:hidden ${
            isMobileNavOpen ? "h-[230px]" : "h-0"
          }`}
        >
          <div className="flex flex-col gap-4 px-8 py-4 text-neutral-200">
            {domain === "www" ? (
              <Link
                href="/"
                onClick={() => {
                  setIsMobileNavOpen(false)
                  setIsUserMenuOpen(false)
                }}
              >
                {t("home")}
              </Link>
            ) : (
              <a href={`https://nguard.xyz/${locale}`}>{t("home")}</a>
            )}

            <a href={`https://console.nguard.xyz/${locale}`}>
              {t("dashboard")}
            </a>

            <a href={`/invite/nguard?lang=${locale}`}>
              {t("support")}
            </a>

            {/*
              {domain === "www" ? (
                <Link
                href="/upgrade"
                onClick={() => {
                  setIsMobileNavOpen(false)
                  setIsUserMenuOpen(false)
                }}
                >{t("upgrade")}</Link>
              ) : (
                <a href={`https://nguard.xyz/${locale}/upgrade`}>
                  {t("upgrade")}
                </a>
              )}
            */}

            <div className="mt-3 border-t border-solid border-neutral-800 pt-6">
              <div className="flex w-full items-center gap-6">
                <div className="text-sm text-white">
                  <button
                    type="button"
                    className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-white/[.05] active:bg-white/[.08]"
                    onClick={() => {
                      setIsUserMenuOpen(!isUserMenuOpen)
                    }}
                  >
                    <Image
                      src="https://cdn.nguard.dev/assets/common/images/default_profile.png"
                      width={20}
                      height={20}
                      alt="User profile image"
                      className="h-5 rounded-full"
                    />

                    <svg
                      className={`w-5 fill-gray-500 transition-transform duration-[0.2s] ease-[ease]${
                        isUserMenuOpen ? " rotate-180" : ""
                      }`}
                      clipRule="evenodd"
                      fillRule="evenodd"
                      strokeLinejoin="round"
                      strokeMiterlimit={2}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z" />
                    </svg>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute left-8 z-40 mt-5 flex w-40 cursor-pointer flex-col rounded-lg bg-[#191919] p-1.5 backdrop-blur-sm">
                      {/*
                        {domain === "checkout" ? (
                          <Link
                            href="/mypage"
                            className="cursor-pointer rounded-lg p-2 text-sm font-semibold hover:bg-white/[.05] active:bg-white/[.08]"
                            onClick={() => {
                              setIsMobileNavOpen(false)
                              setIsUserMenuOpen(false)
                            }}
                          >
                            {t("payhistory")}
                          </Link>
                        ) : (
                          <a
                            href={`https://checkout-v2test.nguard.dev/${locale}/mypage`}
                            className="cursor-pointer rounded-lg p-2 text-sm font-semibold hover:bg-white/[.05] active:bg-white/[.08]"
                          >
                            {t("payhistory")}
                          </a>
                        )}

                        <hr className="mx-2.5 my-2 border-zinc-800" />
                      */}

                      {/* 언어 선택 */}
                      <div className="flex flex-col">
                        {locale !== "ko" && (
                          <Link
                            href="/"
                            className="cursor-pointer rounded-lg p-2 text-sm font-semibold hover:bg-white/[.05] active:bg-white/[.08]"
                            onClick={() => {
                              setIsMobileNavOpen(false)
                              setIsUserMenuOpen(false)
                            }}
                            locale="ko"
                            data-lang="ko"
                          >
                            한국어
                          </Link>
                        )}

                        {locale !== "en" && (
                          <Link
                            href="/"
                            className="cursor-pointer rounded-lg p-2 text-sm font-semibold hover:bg-white/[.05] active:bg-white/[.08]"
                            onClick={() => {
                              setIsMobileNavOpen(false)
                              setIsUserMenuOpen(false)
                            }}
                            locale="en"
                            data-lang="en"
                          >
                            English
                          </Link>
                        )}

                        {locale !== "ja" && (
                          <Link
                            href="/"
                            className="cursor-pointer rounded-lg p-2 text-sm font-semibold hover:bg-white/[.05] active:bg-white/[.08]"
                            onClick={() => {
                              setIsMobileNavOpen(false)
                              setIsUserMenuOpen(false)
                            }}
                            locale="ja"
                            data-lang="ja"
                          >
                            日本語
                          </Link>
                        )}

                        {locale !== "vi" && (
                          <Link
                            href="/"
                            className="cursor-pointer rounded-lg p-2 text-sm font-semibold hover:bg-white/[.05] active:bg-white/[.08]"
                            onClick={() => {
                              setIsMobileNavOpen(false)
                              setIsUserMenuOpen(false)
                            }}
                            locale="vi"
                            data-lang="vi"
                          >
                            Tiếng Việt
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
