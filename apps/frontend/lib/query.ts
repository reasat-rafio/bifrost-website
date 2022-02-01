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
