import { FcNews } from 'react-icons/fc'
import { Rule } from 'sanity'

export default {
  name: 'footer',
  title: 'Footer',
  type: 'object',
  fields: [
    {
      name: 'copyright',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'menu',
      title: 'Menu',
      type: 'array',
      of: [{ type: 'menuItem' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'socialButtons',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          name: 'network',
          type: 'reference',
          to: [{ type: 'social' }],
        },
      ],
    },
    {
      name: 'newsletter',
      type: 'object',
      icon: FcNews,
      validation: (Rule: Rule) => Rule.required(),
      fields: [
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
          name: 'ctaButton',
          type: 'ctaButton',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },
  ],
}
