import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { LinkedinShareButton, FacebookShareButton } from 'next-share'

interface ShareWithProps {}

export const ShareWith: React.FC<ShareWithProps> = ({}) => {
  const router = useRouter()
  const [pageUrl, setPageUrl] = useState<string>()

  useEffect(() => {
    const host = window.location.host
    const baseUrl = `https://${host}`
    setPageUrl(`${baseUrl}${router.asPath}`)
  }, [router.pathname])

  return (
    <div className="mt-10 border border-[#8E8E8E] rounded-[15px] xl:px-20 px-8 xl:py-16 py-8 flex justify-between">
      <h6 className="flex-1 lg:text-[20px] text-base text-[#000610]">Share this article:</h6>
      <div className="flex xl:space-x-10 space-x-5">
        <LinkedinShareButton url={pageUrl}>
          <img src="/icons/linkedin.svg" />
        </LinkedinShareButton>

        <FacebookShareButton url={pageUrl} hashtag={'#bifrost'}>
          <img src="/icons/facebook.svg" />
        </FacebookShareButton>
      </div>
    </div>
  )
}
