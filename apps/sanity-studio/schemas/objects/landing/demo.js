import { GiClick } from 'react-icons/gi'

export default {
  name: 'landing.demo',
  title: 'Demo',
  type: 'object',
  icon: GiClick,
  fields: [
    {
      name: 'initials',
      type: 'initials',
    },
    {
      name: 'headline',
      type: 'string',
    },
    {
      name: 'previews',
      title: 'Preview Images',
      type: 'array',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Preview Image',
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
  preview: {
    select: {
      title: 'headline',
    },
  },
}
