import { TFunction } from "i18next"
import { InviteActions } from "@/utils/invite"

import Image from "next/image"

function OAuthVerify({
  t,
  actions,
}: {
  t: TFunction<"invite", undefined>
  actions: InviteActions
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* 구글 */}
      <button
        type="button"
        className="flex h-10 min-w-56 cursor-pointer items-center justify-center gap-3 rounded-xl bg-white px-5 py-0 hover:brightness-90"
        onClick={() => actions.OAUTH.requestAuth("GOOGLE")}
      >
        <Image
          src="https://nguard-cdn-v3staging.onrender.com/assets/invite/images/oauth/google.svg"
          alt={t("verify.oauth.google")}
          width={16}
          height={16}
          className="size-4"
        />
        <span className="text-black">{t("verify.oauth.google")}</span>
      </button>

      {/* 네이버 */}
      <button
        type="button"
        className="flex h-10 min-w-56 cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#03C75A] px-5 py-0 hover:brightness-90"
        onClick={() => actions.OAUTH.requestAuth("NAVER")}
      >
        <Image
          src="https://nguard-cdn-v3staging.onrender.com/assets/invite/images/oauth/naver.svg"
          alt={t("verify.oauth.naver")}
          width={12}
          height={12}
          className="size-3"
        />
        <span className="text-white">{t("verify.oauth.naver")}</span>
      </button>

      {/* 카카오 */}
      <button
        type="button"
        className="flex h-10 min-w-56 cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#FEE500] px-5 py-0 hover:brightness-90"
        onClick={() => actions.OAUTH.requestAuth("KAKAO")}
      >
        <Image
          src="https://nguard-cdn-v3staging.onrender.com/assets/invite/images/oauth/kakao.svg"
          alt={t("verify.oauth.kakao")}
          width={15}
          height={15}
          className="size-[15px]"
        />
        <span className="text-black/[.8]">
          {t("verify.oauth.kakao")}
        </span>
      </button>
    </div>
  )
}

function IdentifyVerify({
  t,
}: {
  t: TFunction<"invite", undefined>
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* 토스 */}
      <div className="flex h-10 min-w-56 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0064FF] px-5 py-0 hover:brightness-90">
        <Image
          src="https://cdn.nguard.dev/assets/invite/images/verify/toss.png"
          alt={t("verify.domestic_cert.toss")}
          width={18}
          height={18}
          className="size-[18px]"
        />
        <span className="text-white">
          {t("verify.domestic_cert.toss")}
        </span>
      </div>

      {/* 휴대폰 인증 */}
      <div className="flex h-10 min-w-56 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#8951fe] px-5 py-0 hover:brightness-90">
        <Image
          src="https://cdn.nguard.dev/assets/invite/images/verify/sms.png"
          alt={t("verify.domestic_cert.pass")}
          width={16}
          height={16}
          className="size-4"
        />
        <span className="text-white">
          {t("verify.domestic_cert.pass")}
        </span>
      </div>
    </div>
  )
}

export { OAuthVerify, IdentifyVerify }
