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

export interface BlogProps {
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
  body: BlogBody[]
  datetime: string
  heading: string
  image: any
  order: number
  slug: { _type: string; current: string }
  subHeading: string
}

export interface BlogBody {
  _key: string
  _type: string
  description: any[]
  heading: string
  image?: any
  hideHeading?: boolean
}
