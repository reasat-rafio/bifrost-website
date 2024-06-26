import Client from "components/common/client";
import Contact from "components/common/contact";
import Information from "components/common/information";
import AboutUs from "components/landing/about-us";
import Hero from "components/landing/hero";
import Integrate from "components/landing/integrate";
import Outputs from "components/landing/outputs";
import Partners from "components/landing/partners";
import Prediction from "components/landing/prediction";
import Results from "components/landing/results";
import Testimonials from "components/landing/testimonial";
import UseCase from "components/landing/use-case";
import WhyUs from "components/landing/why-us";
import type { HomeSection } from "lib/@types/landing-types";
import type { GetStaticProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { useCallback, useState } from "react";
import { renderObjectArray, withDimensions } from "sanity-react-extra";
import { siteQuery } from "src/lib/query";
import { sanityStaticProps, useSanityQuery } from "utils/sanity";

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "landingPage"][0] {
    ...,
    sections[] {
      ...,
      "image": ${withDimensions("image")},
      partners[]{
        ...,
       "logo": ${withDimensions("logo")},
      },  
      collection[]{
        ...,
        "image": ${withDimensions("image")},
      },
      assets[] {
        ...,
        asset->{
         ...,
         metadata{
          ...,
          dimensions
          },
        },
        "thumbnail": ${withDimensions("thumbnail")},
        "webm": video_webm.asset->url,
        "mp4": video_mp4.asset->url
      },
      useCases[]{
        ...,
        "image": ${withDimensions("image")},
      },
      images[]{
        ...,
        asset->{
         ...,
         metadata{
          dimensions
          },
        },
      },
      testimonials[]{
        ...,
        "image": ${withDimensions("image")},
      },
    },
    "cleint" : *[_id == "client"][0] {
      ...,
      clients[]{
        ...,
        "logo": ${withDimensions("logo")},
      },
    },
  },
}`;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

export default function Home(props: SanityProps<any>) {
  const {
    data: {
      page: { sections, cleint },
    },
  } = useSanityQuery(query, props);
  const [heroSectionHeight, setHeroSectionHeight] = useState(0);

  return (
    <div>
      {renderObjectArray(sections, {
        "landing.home": useCallback(
          (p: HomeSection) => (
            <Hero setHeroSectionHeight={setHeroSectionHeight} {...p} />
          ),
          []
        ),
      })}
      <div
        className="relative h-full bg-black"
        style={{
          marginTop: heroSectionHeight,
        }}
      >
        {renderObjectArray(sections, {
          "landing.partners": Partners,
          "landing.whyUs": WhyUs,
          "landing.aboutUs": AboutUs,
          "landing.outputs": Outputs,
          "landing.integrate": Integrate,
          "landing.results": Results,
          "landing.prediction": Prediction,
          "landing.testimonial": Testimonials,
          infoBlock: Information,
        })}
        <Client {...cleint} />
        {renderObjectArray(sections, {
          "landing.useCase": UseCase,
          contact: Contact,
        })}
      </div>
    </div>
  );
}
