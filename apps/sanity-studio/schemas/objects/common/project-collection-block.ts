import { AiOutlineFundProjectionScreen } from 'react-icons/ai'
import { Rule } from 'sanity'

const Projects = {
  name: 'projects',
  title: 'Projects',
  type: 'object',
  icon: AiOutlineFundProjectionScreen,
  fields: [
    {
      name: 'projects',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          name: 'project',
          type: 'object',
          icon: AiOutlineFundProjectionScreen,
          fields: [
            {
              name: 'variant',
              type: 'string',
              initialValue: 'full-image-text-right',
              description: 'UI can be controlled based on the variant value',
              validation: (Rule: Rule) => Rule.required(),
              options: {
                list: [
                  {
                    title: 'Variant 1 (Full Image and Text at Right Side)',
                    value: 'full-image-text-right',
                  },
                  {
                    title: 'Variant 2 (Full Image and Text at Left Side)',
                    value: 'full-image-text-left',
                  },
                  {
                    title: 'Variant 3 (Half Image and Text at Right Side)',
                    value: 'half-image-text-right',
                  },
                  {
                    title: 'Variant 4 (Half Image and Text at Left Side)',
                    value: 'half-image-text-left',
                  },
                ],
              },
            },
            {
              name: 'image',
              type: 'image',
              validation: (Rule: Rule) => Rule.required(),
              fields: [
                {
                  title: 'Alternative Text',
                  name: 'alt',
                  type: 'string',
                  validation: (Rule: Rule) =>
                    Rule.required().error('Please add an alternative text for the image'),
                },
              ],
            },
            {
              name: 'title',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'subtitle',
              type: 'string',
            },
            {
              name: 'description',
              type: 'text',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'ctaButton',
              type: 'ctaButton',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
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

export default Projects
