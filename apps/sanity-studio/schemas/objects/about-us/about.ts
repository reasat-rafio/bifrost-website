import { FaQuestionCircle } from 'react-icons/fa'
import { Rule } from 'sanity'

export default {
  name: 'aboutUs.about',
  title: 'About',
  type: 'object',
  icon: FaQuestionCircle,
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
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
      title: 'title',
      subtitle: 'heading',
      media: 'image',
    },
    prepare({ title, subtitle, media }: any) {
      return {
        title,
        subtitle,
        media,
        icon: FaQuestionCircle,
      }
    },
  },
}
