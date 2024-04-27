import { useEffect } from "react"
import { useRouter } from "next/router"

import ChannelService from "./channelio"

export default function ChannelIO() {
  const { asPath } = useRouter()

  useEffect(() => {
    ChannelService.loadScript()
    ChannelService.boot({
      pluginKey: "a567dba9-4524-4e68-b42b-db9063e4539e",
    })
  }, [])

  // https://developers.channel.io/reference/web-faq-kr#spa-환경에서-서포트봇과-마케팅-기능을-활용하고-싶어요
  useEffect(() => {
    window.ChannelIO!("setPage", asPath)
    window.ChannelIO!("track", "PageView")
  }, [asPath])

  return null
}
