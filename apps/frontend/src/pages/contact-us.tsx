import Home from "components/contact/home";
import { ContactUsPage } from "lib/@types/contact-us-types";
import { siteQuery } from "src/lib/query";
import { Site } from "lib/@types/global-types";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { renderObjectArray } from "sanity-react-extra";
import { sanityStaticProps, useSanityQuery } from "utils/sanity";
import { PrimaryWrapper } from "components/common/primary-wapper";
import Contact from "components/common/contact";
// import SmoothScroll from 'components/ui/SmoothScrolling'
// import Ellipse from 'src/components/Ellipse'

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "contactUsPage"][0]
}`;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

export default function ContactUs(
  props: SanityProps<{ site: Site; page: ContactUsPage }>
) {
  const {
    data: {
      page: { sections },
    },
  } = useSanityQuery(query, props);

  // TODO make the home section sticky for desktop
  return (
    <div>
      <PrimaryWrapper>
        {renderObjectArray(sections, {
          "contact.home": Home,
        })}
      </PrimaryWrapper>
      <div className="relative z-10 bg-black">
        <PrimaryWrapper>
          {renderObjectArray(sections, {
            contact: Contact,
          })}
        </PrimaryWrapper>
      </div>
    </div>
  );
}
