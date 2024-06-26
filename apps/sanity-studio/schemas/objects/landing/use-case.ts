import { GrProjects } from 'react-icons/gr'
import { Rule } from 'sanity'

const landingUseCase = {
  name: 'landing.useCase',
  title: 'Use Cases',
  type: 'object',
  icon: GrProjects,
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'heading',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'useCases',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          name: 'useCase',
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'url',
              type: 'string',
            },
            {
              name: 'image',
              type: 'image',
              validation: (Rule: Rule) => Rule.required(),
              fields: [
                {
                  name: 'alt',
                  title: 'Alternative Text',
                  description: 'Important for SEO and accessibility',
                  type: 'string',
                  validation: (Rule: Rule) => Rule.required(),
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'url',
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
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }: any) {
      return {
        title,
        subtitle,
        icon: GrProjects,
      }
    },
  },
}

export default landingUseCase
