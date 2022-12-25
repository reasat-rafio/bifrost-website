import { IoShareSocial } from 'react-icons/io5'
import { Rule, defineType } from 'sanity'

const Social = defineType({
  name: 'social',
  type: 'document',
  icon: IoShareSocial,
  fields: [
    {
      name: 'url',
      type: 'url',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'icon',
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
      title: 'url',
      media: 'icon',
    },
    prepare({ title, media }) {
      return {
        title,
        media,
      }
    },
  },
})

export default Social
