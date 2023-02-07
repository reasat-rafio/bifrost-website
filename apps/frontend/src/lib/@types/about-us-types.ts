import { SanityImage } from "sanity-react-extra";
import { CTAButton, SEO } from "./global-types";

export type AboutUsPage = {
  sections: any[];
  seo: SEO;
};

export interface HomeProps {
  title: any[];
  description: string;
  ctaButton?: CTAButton;
}

export interface AboutSectionProps {
  title: string;
  heading?: string;
  description?: string;
  image: SanityImage;
}

export interface ClientsSection {
  title: string;
  subtitle?: string;
  clients: [
    {
      _key: string;
      name: string;
      logo: SanityImage;
      url?: string;
    }
  ];
}

export interface TeamSection {
  title: string;
  subtitle: string;
  members: [
    {
      _key: string;
      name: string;
      role: string;
      image: SanityImage;
    }
  ];
}

export interface ReasonSection {
  title: string;
  heading: string;
  agenda: AgendaProps;
}

export interface AgendaProps {
  _key: string;
  heading: string;
  description: string;
  image: SanityImage;
}
