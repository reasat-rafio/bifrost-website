import { BiImages } from 'react-icons/bi'

export default {
  name: 'useCase.example',
  title: 'Example',
  type: 'object',
  icon: BiImages,
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
    },
    {
      name: 'subHeadline',
      title: 'Sub-Headline',
      type: 'string',
    },
    {
      name: 'examples',
      type: 'array',
      of: [
        {
          name: 'example',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'body',
              title: 'body',
              type: 'string',
            },
            {
              name: 'image',
              type: 'image',
              title: 'Example Image',
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
