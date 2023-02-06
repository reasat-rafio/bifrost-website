import { FacebookShareButton, LinkedinShareButton } from "next-share";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
    <section className="relative mx-auto max-w-screen-2xl rounded-primary border-[1px] border-white">
      <div className="flex items-center space-x-2 px-8 py-5 sm:py-5 sm:px-10 lg:py-10 lg:px-20">
        <span className="flex-1 text-base lg:text-[20px]">
          Share this article:{" "}
        </span>
        <span className="flex space-x-5 xl:space-x-10">
          <LinkedinShareButton className="" url={pageUrl}>
            <img
              className="h-4 w-4 md:h-6 md:w-6"
              src="/icons/g-linkedin.svg"
            />
          </LinkedinShareButton>

          <FacebookShareButton url={pageUrl} hashtag={"#bifrost"}>
            <img
              className="h-4 w-4 md:h-6 md:w-6"
              src="/icons/g-facebook.svg"
            />
          </FacebookShareButton>
        </span>
      </div>
    </section>
  );
};
