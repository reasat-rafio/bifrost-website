import { Rule } from 'sanity'
import { MdOutlineFeaturedPlayList } from 'react-icons/md'

export default {
  name: 'useCase.feature',
  title: 'Features',
  type: 'object',
  icon: MdOutlineFeaturedPlayList,
  fields: [
    {
      name: 'initials',
      type: 'initials',
    },
    {
      name: 'heading',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
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
    {
      name: 'features',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          name: 'feature',
          type: 'object',
          validation: (Rule: Rule) => Rule.required(),
          fields: [
            {
              name: 'title',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
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
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare({ title, subtitle }: any) {
      return {
        title,
        subtitle,
        icon: MdOutlineFeaturedPlayList,
      }
    },
  },
}
