import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { LinkedinShareButton, FacebookShareButton } from 'next-share'

interface ShareWithProps {}

export const ShareWith: React.FC<ShareWithProps> = ({}) => {
  const router = useRouter()
  const [pageUrl, setPageUrl] = useState<string>()
  console.log(pageUrl)

  useEffect(() => {
    const host = window.location.host
    const baseUrl = `https://${host}`
    setPageUrl(`${baseUrl}${router.asPath}`)
  }, [router.pathname])

  return (
    <div className="mt-10 border border-[#8E8E8E] rounded-[15px] px-20 py-16 flex justify-between">
      <h6 className="flex-1 text-[20px] text-[#000610]">Share this article:</h6>
      <div className="flex space-x-10">
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
