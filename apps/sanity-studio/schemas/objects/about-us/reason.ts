import { Rule } from 'sanity'
import { FaPodcast } from 'react-icons/fa'

export default {
  name: 'aboutUs.reason',
  title: 'Reasons',
  type: 'object',
  icon: FaPodcast,
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
      name: 'subtitle',
      type: 'text',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'agendas',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          name: 'agenda',
          type: 'object',
          fields: [
            {
              name: 'name',
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
              type: 'array',
              of: [{ type: 'block' }],
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
          preview: {
            select: {
              title: 'name',
              subtitle: 'title',
              media: 'image',
            },
            prepare({ title, subtitle, media }: any) {
              return {
                title,
                subtitle,
                media,
                icon: FaPodcast,
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subTitle',
    },
    prepare({ title, subtitle }: any) {
      return {
        title,
        subtitle,
        icon: FaPodcast,
      }
    },
  },
}
