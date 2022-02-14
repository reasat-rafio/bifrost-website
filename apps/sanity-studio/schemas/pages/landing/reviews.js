import editor from '../../editor'

export default {
  name: 'reviews',
  title: 'Reviews',
  type: 'object',
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
              type: 'array',
              of: [editor],
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
      title: 'headline',
    },
  },
}
