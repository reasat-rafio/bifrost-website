import { GiClick } from 'react-icons/gi'
import { Rule } from 'sanity'

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
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'previews',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),

      of: [
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
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }: any) {
      return { title, icon: GiClick }
    },
  },
}
