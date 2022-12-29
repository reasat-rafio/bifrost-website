import { SanityImage } from 'sanity-react-extra'

interface HeroDataImage {
  type: 'image'
  image?: SanityImage & ImageAlt
}

interface HeroDataVideo {
  type: 'video'
  video: any
}

interface Youtube {
  url: string
}

interface HeroDataYoutube {
  type: 'youtube'
  youtube?: Youtube
}

type HeroData = HeroDataImage | HeroDataVideo | HeroDataYoutube
export interface Footer {
  copyright: string
  socialButtons: Social[]
  menu: MenuItem[]
  newsletter: {
    title: string
    subtitle: string
    ctaButton: CTAButton
  }
}

export interface Site {
  logos: { logo: SanityImage; darkLogo: SanityImage }
  nav: {
    menu: MenuItem[]
    footer: Footer
  }
}

export interface Footer {
  copyright: string
  menu: MenuItem[]
  socialButtons: Social[]
}

export interface MenuItem {
  _key: string
  title: string
  pageUrl: string
  externalUrl: string
  highlight: boolean
  submenu: MenuItem[]
}

export interface Social {
  _key?: string
  icon: SanityImage
  url: string
}

export interface SEO {
  title: string
  description: string
  ogImage: SanityImage
}

export interface CTAButton {
  title: string
  href: string
}

export interface IToast {
  id: string
  content: string
  type: 'error' | 'success'
}

interface INotFound {
  _type: string
  description: string
  header: string
  image: Image
}
