import { MdOutlineRateReview } from 'react-icons/md'
export default {
  name: 'landing.reviews',
  title: 'Reviews',
  type: 'object',
  icon: MdOutlineRateReview,
  fields: [
    {
      name: 'items',
      type: 'array',
      of: [
        {
          name: 'review',
          type: 'object',
          fields: [
            {
              name: 'body',
              title: 'body',
              type: 'string',
            },
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'description',
              type: 'string',
            },
            {
              name: 'image',
              type: 'image',
              title: 'Product Image',
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
      title: 'review.body',
    },
  },
}
