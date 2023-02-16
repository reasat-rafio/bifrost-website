import { PrimaryWrapper } from "components/common/primary-wapper";
// import Ellipse from 'src/components/Ellipse'
// import UseCaseEnterprise from 'components/features/UseCaseEnterprise'
import Information from "components/common/information";
import Examples from "components/features/examples";
import Feature from "components/features/feature";
import Home from "components/features/home";
import { ContactUsPage } from "lib/@types/contact-us-types";
import { Site } from "lib/@types/global-types";
import { HomeSection } from "lib/@types/use-case-types";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { useCallback, useState } from "react";
import { renderObjectArray, withDimensions } from "sanity-react-extra";
import Contact from "src/components/common/contact";
import { siteQuery } from "src/lib/query";
import { sanityStaticProps, useSanityQuery } from "utils/sanity";

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "useCasePage"][0] {
    ...,
    sections[] {
      ...,
      "image": ${withDimensions("image")},
      examples[]{
        ...,
        "image": ${withDimensions("image")},
      },
      features[]{
        ...,
        "image": ${withDimensions("image")},
      }
    }
  },
}`;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

export default function Features(
  props: SanityProps<{ site: Site; page: ContactUsPage }>
) {
  const {
    data: {
      page: { sections },
    },
  } = useSanityQuery(query, props);

  const [heroSectionHeight, setHeroSectionHeight] = useState(0);

  return (
    <div>
      <PrimaryWrapper>
        {renderObjectArray(sections, {
          "useCase.home": useCallback(
            (p: HomeSection) => (
              <Home setHeroSectionHeight={setHeroSectionHeight} {...p} />
            ),
            []
          ),
        })}
      </PrimaryWrapper>

      <div
        className="relative h-full bg-black"
        style={{
          marginTop: heroSectionHeight,
        }}
      >
        <PrimaryWrapper>
          {renderObjectArray(sections, {
            "useCase.example": Examples,
            "useCase.feature": Feature,
            infoBlock: Information,
            // 'useCase.enterprise': UseCaseEnterprise,
            contact: Contact,
          })}
        </PrimaryWrapper>
      </div>

      {/* <>
        <Ellipse className="z-10 absolute top-[40vh] left-[15vw] w-[253px] h-[391px]" />
        <Ellipse className="z-10 absolute top-[30vh] right-[5vw] w-[253px] h-[391px]" />
        <Ellipse className="z-10 absolute top-[140vh] left-[5vw] w-[253px] h-[391px]" />
        <Ellipse className="z-10 absolute top-[20vh] right-[15vw] w-[153px] h-[391px]" />
      </> */}
    </div>
  );
}
