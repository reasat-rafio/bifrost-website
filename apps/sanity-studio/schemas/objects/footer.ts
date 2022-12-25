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
  ],
}
