export type BlogPage = {
  sections: Section[]
  seo: SEO
}

export interface HomeSection {
  headline: string
  subHeadline: string
}

export interface IBlog {
  _id: string
  slug: { _type: string; current: string }
  datetime: string
  heading: string
  subHeading: string
  image: any
}
export interface BlogsSection {
  blogs: IBlog[]
  totalBlogs: number
}

export interface ITags {
  name: string
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
}

export interface BlogProps {
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
  body: BlogBody[]
  tags: ITags
  datetime: string
  heading: string
  image: any
  order: number
  slug: { _type: string; current: string }
  subHeading: string
  relatedBlogs: IBlog[]
}

export interface BlogBody {
  _key: string
  _type?: string
  description?: any[]
  heading?: string
  image?: any
  hideHeading?: boolean
}

export interface IQuote {
  text: string
  author: string
  url?: string
}
