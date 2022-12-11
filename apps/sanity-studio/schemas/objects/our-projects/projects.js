import { AiOutlineFundProjectionScreen } from 'react-icons/ai'

export default {
  name: 'ourProjectsPage.projects',
  title: 'Projects',
  type: 'object',
  icon: AiOutlineFundProjectionScreen,
  fields: [
    {
      name: 'projects',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          name: 'project',
          type: 'object',
          icon: AiOutlineFundProjectionScreen,
          fields: [
            {
              name: 'image',
              type: 'image',
              validation: (Rule) => Rule.required(),
              fields: [
                {
                  title: 'Alternative Text',
                  name: 'alt',
                  type: 'string',
                  validation: (Rule) =>
                    Rule.required().error('Please add an alternative text for the image'),
                },
              ],
            },
            {
              name: 'title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'ctaButton',
              type: 'ctaButton',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: () => ({
      title: 'Projects',
    }),
  },
}
