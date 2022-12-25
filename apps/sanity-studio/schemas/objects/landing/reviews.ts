import { MdOutlineRateReview } from 'react-icons/md'
import { Rule } from 'sanity'
export default {
  name: 'landing.reviews',
  title: 'Reviews',
  type: 'object',
  icon: MdOutlineRateReview,
  fields: [
    {
      name: 'initials',
      type: 'initials',
    },
    {
      name: 'reviews',
      type: 'array',
      vlidation: (Rule: Rule) => Rule.required(),
      of: [
        {
          name: 'review',
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              vlidation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'role',
              type: 'string',
              vlidation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'image',
              type: 'image',
              title: 'Product Image',
              vlidation: (Rule: Rule) => Rule.required(),
              fields: [
                {
                  name: 'alt',
                  title: 'Alternative Text',
                  description: 'Important for SEO and accessibility',
                  type: 'string',
                  vlidation: (Rule: Rule) => Rule.required(),
                },
              ],
            },
            {
              name: 'review',
              type: 'text',
              vlidation: (Rule: Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'review',
              media: 'image',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: '',
    },
    prepare() {
      return {
        title: 'Reviews',
        icon: MdOutlineRateReview,
      }
    },
  },
}
