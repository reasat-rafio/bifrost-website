import { FaQuestionCircle } from 'react-icons/fa'
import { Rule } from 'sanity'

export default {
  name: 'aboutUs.about',
  title: 'About',
  type: 'object',
  icon: FaQuestionCircle,
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
      subtitle: 'description',
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
