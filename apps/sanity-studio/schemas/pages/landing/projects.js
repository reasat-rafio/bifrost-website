export default {
  name: 'landing.projects',
  title: 'Projects',
  type: 'object',
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
      name: 'items',
      title: 'Item',
      type: 'array',
      of: [
        {
          name: 'project',
          type: 'object',
          title: 'Project',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL',
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
