import { useTranslation } from "next-i18next"

export default function Footer() {
  const { t } = useTranslation("footer")

  const openFtc = () => {
    const popup = window.open(
      "http://www.ftc.go.kr/info/bizinfo/communicationViewPopup.jsp?wrkr_no=3612002347",
      "communicationViewPopup",
      "width=750, height=700;",
    )

    if (!popup) {
      // eslint-disable-next-line no-alert
      alert("팝업 차단을 해제해 주세요.")
    }
  }

  return (
    <footer className="relative mx-auto mt-[10vh] max-w-screen-md px-10 py-14 text-center text-sm sm:px-6 md:px-28 md:text-left md:text-base lg:py-20 xl:max-w-screen-xl">
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6 lg:right-8 lg:top-8">
        <button
          type="button"
          className="inline-block rounded-full bg-gray-700 p-2 text-white transition hover:bg-gray-600 sm:p-3 lg:p-4"
          aria-label="Back to top"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="md:flex md:items-end md:justify-between">
        <div>
          <p className="mx-auto max-w-xl text-center leading-relaxed text-gray-400 md:text-left">
            {t("company.name")}
            &nbsp;|&nbsp;
            {t("company.representative")}
          </p>

          <p className="mx-auto mt-4 max-w-xl text-center leading-relaxed text-gray-400 md:text-left">
            {t("company.license.registration")}&nbsp;
            <button type="button" onClick={() => openFtc()}>
              361-20-02347
            </button>
            &nbsp;|&nbsp;
            {t("company.phone")}&nbsp;
            <a href="tel:+827041552227">070-4155-2227</a>
          </p>

          <p className="mx-auto mt-4 max-w-xl text-center leading-relaxed text-gray-400 md:text-left">
            {t("company.license.mailorder")}&nbsp;
            <button type="button" onClick={() => openFtc()}>
              {/* 제 2024-인천남동-???? */}
            </button>
          </p>

          <p className="mx-auto mt-4 max-w-xl text-center leading-relaxed text-gray-400 md:text-left">
            {t("company.address")}
          </p>
        </div>
      </div>
      <nav
        className="mt-10 flex flex-col items-center justify-between gap-4 text-gray-300 md:mt-4 md:items-end lg:mt-20 lg:flex-row lg:items-center"
        aria-labelledby="footer-navigation"
      >
        <span>
          <a href="https://policies.nguard.dev/tos" target="_blank">
            {t("policies.tos")}
          </a>
          &nbsp;|&nbsp;
          <a
            href="https://policies.nguard.dev/privacy"
            target="_blank"
          >
            {t("policies.privacy")}
          </a>
          &nbsp;|&nbsp;
          <a href="https://policies.nguard.dev/paid" target="_blank">
            {t("policies.paid")}
          </a>
        </span>

        <span>{t("copyright")}</span>
      </nav>
    </footer>
  )
}
