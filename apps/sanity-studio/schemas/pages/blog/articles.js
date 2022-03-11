import { GrArticle } from 'react-icons/gr'

export default {
  name: 'blog.articles',
  title: 'Articles',
  type: 'object',
  icon: GrArticle,
  fields: [
    {
      name: 'articles',
      type: 'array',
      of: [
        {
          name: 'article',
          type: 'object',
          fields: [
            {
              name: 'headline',
              type: 'string',
            },
            {
              name: 'subHeadline',
              title: 'Sub-Headline',
              type: 'string',
            },
            {
              name: 'body',
              type: 'string',
            },
            {
              name: 'ctaButton',
              title: 'CTA Button',
              type: 'ctaButton',
            },
            {
              name: 'image',
              type: 'image',
              title: 'Article Image',
              fields: [
                {
                  name: 'alt',
                  title: 'Alternative Text',
                  description: 'Important for SEO and accessibility',
                  type: 'string',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'body',
    },
  },
}
