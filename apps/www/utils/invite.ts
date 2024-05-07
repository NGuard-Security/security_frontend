import axios from "axios"

class InviteActions {
  private window: Window | undefined = undefined

  setWindow(window: Window) {
    this.window = window
  }

  TURNSTILE = new (class {
    private readonly parent: InviteActions

    constructor(parent: InviteActions) {
      this.parent = parent
    }

    render(locale: string) {
      if (!this.parent.window) {
        return false
      }

      try {
        this.parent.window.turnstile.render("#cf-turnstile", {
          sitekey: process.env.NEXT_PUBLIC_CF_TURNSTILE_SITEKEY,
          language: locale,
        })

        return true
      } catch (err) {
        alert("Something went wrong. Please try again later.")
        return false
      }
    }

    getResponse(): string | null {
      if (!this.parent.window) {
        return null
      }

      const response = this.parent.window.turnstile.getResponse() as
        | string
        | undefined

      if (!response) {
        window.alert("Please fill out the CAPTCHA and try again.")
        return null
      }

      return response
    }
  })(this)

  OAUTH = new (class {
    private readonly parent: InviteActions

    constructor(parent: InviteActions) {
      this.parent = parent
    }

    requestAuth(provider: "GOOGLE" | "NAVER" | "KAKAO") {
      if (
        !this.parent.window ||
        !["GOOGLE", "KAKAO", "NAVER"].includes(provider)
      ) {
        return null
      }

      return this.parent.window.open(
        `http://localhost:4000/invite/actions/oauth/${provider.toLowerCase()}`,
        "NGuard OAUTH Verify",
        "width=562px, height=972px, top=30px, left=675px, resizable=no",
      )
    }
  })(this)

  VERIFY = new (class {})()

  COMMON = new (class {
    private readonly parent: InviteActions

    constructor(parent: InviteActions) {
      this.parent = parent
    }

    async goNextStep(
      now: "info" | "captcha" | "oauth" | "verify",
      data: {
        [key: string]: unknown
      },
    ) {
      if (!this.parent.window) {
        return null
      }

      const controllerBody: {
        [key: string]: unknown
      } = {
        guild: data.guild,
      }

      if (now === "captcha") {
        const captcha = this.parent.TURNSTILE.getResponse()

        if (captcha) {
          controllerBody["cf-turnstile-response"] = captcha
        } else {
          return null
        }
      } else if (now === "oauth") {
        controllerBody["oauth-response"] = data
      } else if (now === "verify") {
        controllerBody["verify-response"] = data
      } else {
        window.alert("Something went wrong. Please try again later.")
        return null
      }

      try {
        const { data: response } = await axios.post(
          `http://localhost:4000/invite/actions/${now}`,
          controllerBody,
        )
        return {
          success: true,
          error: null,
          data: response.data,
        }
      } catch (err) {
        return {
          success: false,
          error: err,
          data: null,
        }
      }
    }
  })(this)
}

export { InviteActions }
export default InviteActions
