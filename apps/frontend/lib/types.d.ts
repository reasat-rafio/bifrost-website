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
  href: string
  title: string
  isCTA: boolean
  submenu: array
}

type SocialType = 'facebook' | 'twitter' | 'linkedin' | 'instagram'
export interface Social {
  title: string
  type: SocialType
  url: string
}

export interface SEO {
  title: string
  description: string
  ogImage: SanityImage
}
