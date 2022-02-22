export default {
  name: 'landing.services',
  title: 'Services',
  type: 'object',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
    },
    {
      name: 'items',
      title: 'Item',
      type: 'array',
      of: [
        {
          name: 'service',
          type: 'object',
          title: 'Service',
          fields: [
            {
              name: 'headline',
              title: 'Headline',
              type: 'string',
            },
            {
              name: 'body',
              title: 'body',
              type: 'string',
            },
            {
              name: 'ctaButton',
              title: 'CTA Button',
              type: 'ctaButton',
            },
            {
              name: 'cardPosition',
              title: 'Card Position',
              type: 'string',
            },
            {
              name: 'image',
              type: 'image',
              title: 'Service Image',
              fields: [
                {
                  name: 'alt',
                  title: 'Alternative Text',
                  description: 'Important for SEO and accessibility',
                  type: 'string',
                },
              ],
            },
            {
              name: 'imagePosition',
              title: 'Image Position',
              type: 'string',
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
