import { groq } from 'next-sanity'
import { withDimensions } from 'sanity-react-extra'

export const siteQuery = groq`{
    "logos": *[_id == "siteLogos"][0] {
      ...,
      "logo": ${withDimensions('logo')},
      "favicon": ${withDimensions('favicon')},
    },
    "nav": *[_id == "siteNav"][0] {
      ...,
      "footer": footer {
        ...,
        "socialButtons": socialButtons[]->
      }
    },
  }`

const BLOG_LIST_FIELDS = `
   _id,
    heading,
    slug,
    detetime,
    subHeading,
    "image": ${withDimensions('image')},
`

export const getMoreBlogListQuery = ({ limit, page }: { limit: number; page: number }) => {
  const startIndex = limit * (page - 1)
  const endIndex = limit * page - 1

  const query = groq`
        *[_type== "blog"] | order(order asc) [${startIndex}..${endIndex}] {
            ${BLOG_LIST_FIELDS}
        }
    `

  return query
}
