import { SanityImage } from 'sanity-react-extra'
declare global {
  interface Site {
    logos: { logo: SanityImage }
    nav: {
      menu: MenuItem[]
      footer: Footer
    }
  }

  interface Footer {
    copyright: string
    menu: MenuItem[]
    socialButtons: Social[]
  }

  interface MenuItem {
    href: string
    title: string
    isCTA: boolean
    submenu: array
  }

  type SocialType = 'facebook' | 'twitter' | 'linkedin' | 'instagram'
  interface Social {
    title: string
    type: SocialType
    url: string
  }

  export type LandingPage = {
    // sections: Section[]
    seo: SEO
  }

  interface SEO {
    title: string
    description: string
    ogImage: SanityImage
  }
}
