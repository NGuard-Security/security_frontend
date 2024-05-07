import type { NextApiRequest, NextApiResponse } from "next"
import {
  setCookie,
  deleteCookie,
  getCookie,
  hasCookie,
} from "cookies-next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  deleteCookie("access_token", { req, res })

  if (req.query.error || req.query.error_description) {
    res.redirect("/")
    return
  }

  if (
    !req.query.code ||
    !req.query.state ||
    !hasCookie(`callback:${req.query.state as string}`, { req, res })
  ) {
    res.status(400).json({
      code: "BAD_REQUEST",
      status: 400,
      message: "잘못된 요청입니다.",
    })
  }

  if (
    !process.env.DISCORD_CLIENT_ID ||
    !process.env.DISCORD_CLIENT_SECRET
  ) {
    res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      status: 500,
      message: "서버 설정이 잘못되었습니다. 관리자에게 문의해주세요.",
    })
  }

  const redirectUrl =
    req.headers.host?.startsWith("localhost") ||
    req.headers.host?.startsWith("127.")
      ? `http://${req.headers.host}`
      : `https://${req.headers.host}`

  const token = await (
    await fetch("https://discord.com/api/v10/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        code: req.query.code as string,
        grant_type: "authorization_code",
        redirect_uri: `${redirectUrl}/api/invite/callback`,
      }),
    })
  ).json()

  setCookie("access_token", token.access_token, {
    req,
    res,
    maxAge: 60 * 60 * 24,
  })

  const callbackData = JSON.parse(
    Buffer.from(
      getCookie(`callback:${req.query.state as string}`, {
        req,
        res,
      })!,
      "base64",
    ).toString("utf-8"),
  )

  deleteCookie(`callback:${req.query.state as string}`, { req, res })

  res.redirect(`/${callbackData.lang}/invite/${callbackData.id}`)
}
