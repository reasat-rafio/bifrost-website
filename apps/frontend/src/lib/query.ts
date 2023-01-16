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
      menu[]{
        ...,
        dropdownList[]{
          ...,
          "image": ${withDimensions('image')},
        },
      },
      footer {
        ...,
        socialButtons[]->{
          ...,
        "icon": ${withDimensions('icon')},
        }
      }
    },
  }`

const BLOG_LIST_FIELDS = `
    _id,
    _createdAt,
    heading,
    slug,
    datetime,
    shortDescription,
    "image": ${withDimensions('image')},
`

export const firstPageBlogsQuery = groq`*[_type== "blog"] | order(_createdAt) [0...5] {
   ${BLOG_LIST_FIELDS}
  }`

export const nextPageBlogsQuery = ({
  lastPublishedAt,
  lastBlogId,
}: {
  lastPublishedAt: string
  lastBlogId: string
}) => groq`
    *[_type == "blog"
    && (_createdAt > "${lastPublishedAt}" || 
    ((_createdAt == "${lastPublishedAt}") && (_id > "${lastBlogId}")))]
    | order(_createdAt) [0...5] {
      ${BLOG_LIST_FIELDS}
  }`
