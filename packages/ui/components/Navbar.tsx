import Link from "next/link"
import Image from "next/image"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

export default function Navbar({
  domain,
}: {
  domain: "www" | "checkout"
}) {
  const { locale, asPath } = useRouter()
  const { t } = useTranslation("navbar")

  const headerRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showUser, setShowUser] = useState(false)

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
    <header
      className="fixed inset-x-0 z-50 bg-[#0f1016]/50 shadow-sm backdrop-blur-sm transition-colors"
      ref={headerRef}
    >
      <div className="mx-auto max-w-screen-xl p-4">
        <div className="flex items-center justify-between space-x-4 lg:space-x-10">
          <div
            className={`flex lg:w-0 lg:flex-1 ${isMenuOpen ? "hidden" : ""}`}
          >
            {domain === "www" ? (
              <Link
                href="/"
                onClick={() => {
                  setIsMenuOpen(false)
                  setShowUser(false)
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
              <a href={`https://nguard.xyz/${locale}`}>
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
          </div>

          <nav
            className={`hidden space-x-8 text-sm font-medium md:flex ${isMenuOpen ? "md:hidden" : ""}`}
          >
            {domain === "www" ? (
              <Link
                href="/"
                className="text-gray-200"
                onClick={() => {
                  setIsMenuOpen(false)
                  setShowUser(false)
                }}
              >
                {t("home")}
              </Link>
            ) : (
              <a
                href={`https://nguard.xyz/${locale}`}
                className="text-gray-200"
              >
                {t("home")}
              </a>
            )}

            <a
              className="text-gray-200"
              href={`https://console.nguard.xyz/${locale}`}
            >
              {t("dashboard")}
            </a>

            <a
              className="text-gray-200"
              href={`/invite/nguard?lang=${locale}`}
            >
              {t("support")}
            </a>

            {/*
              {domain === "www" ? (
                <Link
                  href="/upgrade"
                  className="text-gray-200"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowUser(false);
                  }}
                >
                  {t("upgrade")}
                </Link>
              ) : (
                <a
                  href={`https://nguard.xyz/${locale}/upgrade`}
                  className="text-gray-200"
                >
                  {t("upgrade")}
                </a>
              )}
            */}
          </nav>

          <div className="hidden flex-1 items-center justify-end space-x-4 sm:flex">
            <div className="relative mr-0 text-sm text-white">
              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-base hover:bg-zinc-900/[.5]"
                onClick={() => setShowUser(!showUser)}
              >
                <Image
                  src="https://cdn.nguard.dev/assets/common/images/default_profile.png"
                  width={20}
                  height={20}
                  alt="User profile image"
                  className="h-5 rounded-full"
                />

                <svg
                  className="w-5 fill-gray-500 transition-transform duration-200"
                  clipRule="evenodd"
                  fillRule="evenodd"
                  strokeLinejoin="round"
                  strokeMiterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z" />
                </svg>
              </button>

              <div
                className={`absolute left-0 z-40 mt-5 flex w-36 flex-col rounded-lg bg-zinc-900/[.8] p-1.5 lg:left-[calc(-100%-20px)] ${showUser ? "" : "hidden"}`}
              >
                {/*
                  {domain === "checkout" ? (
                    <Link
                      href="/mypage"
                      className="rounded-lg p-2 text-lg font-semibold text-yellow-400 md:text-base"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setShowUser(false);
                      }}
                    >
                      {t("payhistory")}
                    </Link>
                  ) : (
                    <a
                      href={`https://checkout-v2test.nguard.dev/${locale}/mypage`}
                      className="rounded-lg p-2 text-lg font-semibold text-yellow-400 md:text-base"
                    >
                      {t("payhistory")}
                    </a>
                  )}

                  <hr className="mx-2.5 my-2 border-zinc-800" />
                */}

                {/* 언어 선택 */}
                <div className="flex flex-col">
                  <Link
                    href="/"
                    className="rounded-lg p-2 text-lg md:text-base"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setShowUser(false)
                    }}
                    locale="ko"
                    data-lang="ko"
                  >
                    한국어
                  </Link>

                  <Link
                    href="/"
                    className="rounded-lg p-2 text-lg md:text-base"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setShowUser(false)
                    }}
                    locale="en"
                    data-lang="en"
                  >
                    English
                  </Link>

                  <Link
                    href="/"
                    className="rounded-lg p-2 text-lg md:text-base"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setShowUser(false)
                    }}
                    locale="ja"
                    data-lang="ja"
                  >
                    日本語
                  </Link>

                  <Link
                    href="/"
                    className="rounded-lg p-2 text-lg md:text-base"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setShowUser(false)
                    }}
                    locale="vi"
                    data-lang="vi"
                  >
                    Tiếng Việt
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <button
              type="button"
              aria-label="Open Menu"
              className={`rounded-lg bg-gray-100 p-2 text-gray-600 ${isMenuOpen ? "hidden" : ""}`}
              onClick={() => setIsMenuOpen(true)}
            >
              <svg
                aria-hidden="true"
                className="size-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <div
              className={`absolute left-0 top-0 z-10 w-full ${isMenuOpen ? "" : "hidden"}`}
            >
              <div className="p-4 shadow-sm backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    {domain === "www" ? (
                      <Link
                        href="/"
                        className="inline-flex items-center"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setShowUser(false)
                        }}
                      >
                        <Image
                          src="https://cdn.nguard.dev/assets/common/images/logo.png"
                          width={123}
                          height={40}
                          className="h-10"
                          alt="NGuard Logo"
                        />
                      </Link>
                    ) : (
                      <a
                        href={`https://nguard.xyz/${locale}`}
                        className="inline-flex items-center"
                      >
                        <Image
                          src="https://cdn.nguard.dev/assets/common/images/logo.png"
                          width={123}
                          height={40}
                          className="h-10"
                          alt="NGuard Logo"
                        />
                      </a>
                    )}
                  </div>
                  <div>
                    <button
                      type="button"
                      aria-label="Close Menu"
                      className="-mt-2 rounded-lg bg-gray-100 p-2 text-gray-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav className="p-1">
                  <ul className="space-y-4">
                    <li>
                      {domain === "www" ? (
                        <Link
                          href="/"
                          className="font-medium tracking-wide text-gray-200 transition-colors duration-200"
                          onClick={() => {
                            setIsMenuOpen(false)
                            setShowUser(false)
                          }}
                        >
                          {t("home")}
                        </Link>
                      ) : (
                        <a
                          href={`https://nguard.xyz/${locale}`}
                          className="font-medium tracking-wide text-gray-200 transition-colors duration-200"
                        >
                          {t("home")}
                        </a>
                      )}
                    </li>
                    <li>
                      <a
                        href={`https://console.nguard.xyz/${locale}`}
                        className="font-medium tracking-wide text-gray-200 transition-colors duration-200"
                      >
                        {t("dashboard")}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/invite/nguard?lang=${locale}`}
                        className="font-medium tracking-wide text-gray-200 transition-colors duration-200"
                      >
                        {t("support")}
                      </a>
                    </li>
                    {/*
                      <li>
                        {domain === "www" ? (
                          <Link
                            href="/upgrade"
                            className="font-medium tracking-wide text-gray-200 transition-colors duration-200"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setShowUser(false);
                            }}
                          >
                            {t("upgrade")}
                          </Link>
                        ) : (
                          <a
                            href={`https://nguard.xyz/${locale}/upgrade`}
                            className="font-medium tracking-wide text-gray-200 transition-colors duration-200"
                          >
                            {t("upgrade")}
                          </a>
                        )}
                      </li>
                    */}

                    <div className="hidden flex-1 items-center justify-end space-x-4 sm:flex">
                      <div className="static mr-2 text-sm text-white">
                        <button
                          type="button"
                          className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-lg hover:bg-zinc-900"
                          onClick={() => setShowUser(!showUser)}
                        >
                          <Image
                            src="https://cdn.nguard.dev/assets/common/images/default_profile.png"
                            width={28}
                            height={28}
                            alt="User profile image"
                            className="h-7 rounded-full"
                          />
                          <svg
                            className="w-5 fill-gray-500 transition-transform duration-200"
                            clipRule="evenodd"
                            fillRule="evenodd"
                            strokeLinejoin="round"
                            strokeMiterlimit="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z" />
                          </svg>
                        </button>

                        <div
                          className={`absolute left-[10px] z-40 mt-5 flex w-[calc(100vw-20px)] flex-col rounded-lg bg-black/[.8] p-1.5 backdrop-blur-sm ${showUser ? "" : "hidden"}`}
                        >
                          {/*
                            {domain === "checkout" ? (
                              <Link
                                href="/mypage"
                                className="rounded-lg p-2 text-lg font-semibold text-yellow-400 md:text-base"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setShowUser(false);
                                }}
                              >
                                {t("payhistory")}
                              </Link>
                            ) : (
                              <a
                                href={`https://checkout-v2test.nguard.dev/${locale}/mypage`}
                                className="rounded-lg p-2 text-lg font-semibold text-yellow-400 md:text-base"
                              >
                                {t("payhistory")}
                              </a>
                            )}

                            <hr className="mx-2.5 my-2 border-zinc-800" />
                          */}

                          {/* 언어 선택 */}
                          <div className="flex flex-col">
                            <Link
                              href="/"
                              className="rounded-lg p-2 text-lg md:text-base"
                              onClick={() => {
                                setIsMenuOpen(false)
                                setShowUser(false)
                              }}
                              locale="ko"
                              data-lang="ko"
                            >
                              한국어
                            </Link>

                            <Link
                              href="/"
                              className="rounded-lg p-2 text-lg md:text-base"
                              onClick={() => {
                                setIsMenuOpen(false)
                                setShowUser(false)
                              }}
                              locale="en"
                              data-lang="en"
                            >
                              English
                            </Link>

                            <Link
                              href="/"
                              className="rounded-lg p-2 text-lg md:text-base"
                              onClick={() => {
                                setIsMenuOpen(false)
                                setShowUser(false)
                              }}
                              locale="ja"
                              data-lang="ja"
                            >
                              日本語
                            </Link>

                            <Link
                              href="/"
                              className="rounded-lg p-2 text-lg md:text-base"
                              onClick={() => {
                                setIsMenuOpen(false)
                                setShowUser(false)
                              }}
                              locale="vi"
                              data-lang="vi"
                            >
                              Tiếng Việt
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
