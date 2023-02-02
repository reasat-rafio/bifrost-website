import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { LinkedinShareButton, FacebookShareButton } from "next-share";

interface ShareWithProps {}

export const ShareWith: React.FC<ShareWithProps> = ({}) => {
  const router = useRouter();
  const [pageUrl, setPageUrl] = useState<string>();

  useEffect(() => {
    const host = window.location.host;
    const baseUrl = `https://${host}`;
    setPageUrl(`${baseUrl}${router.asPath}`);
  }, [router.pathname]);

  return (
    <div className="mt-10 flex justify-between rounded-primary border border-[#8E8E8E] px-8 py-8 xl:px-20 xl:py-16">
      <h6 className="flex-1 text-base text-[#000610] lg:text-[20px]">
        Share this article:
      </h6>
      <div className="flex space-x-5 xl:space-x-10">
        <LinkedinShareButton url={pageUrl}>
          <img src="/icons/linkedin.svg" />
        </LinkedinShareButton>

        <FacebookShareButton url={pageUrl} hashtag={"#bifrost"}>
          <img src="/icons/facebook.svg" />
        </FacebookShareButton>
      </div>
    </div>
  );
};
