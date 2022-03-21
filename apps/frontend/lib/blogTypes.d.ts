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
  detetime: string
  heading: string
  subHeading: string
  image: any
}
export interface BlogsSection {
  blogs: IBlog[]
  totalBlogs: number
}
