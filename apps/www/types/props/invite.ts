export type InviteProps = {
  guild: {
    id: string
    name: string
    icon: string
    member_count: {
      everyone: number
      online: number
    }
    config: {
      captcha: boolean
      oauth: boolean
      verify: boolean
    }
  }
  accessToken: string
}
