import { GoQuote } from 'react-icons/go'
import { Rule } from 'sanity'

export default {
  name: 'quote',
  type: 'object',
  title: 'Quote',
  icon: GoQuote,
  fields: [
    {
      name: 'text',
      type: 'text',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'author',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'url',
      type: 'url',
      description: 'Source on the web. OPTIONAL',
    },
  ],
  preview: {
    select: {
      title: 'text',
      subtitle: 'author',
    },
    prepare(value: any) {
      const { title, subtitle } = value
      return {
        title: title,
        subtitle: subtitle,
        icon: GoQuote,
      }
    },
  },
}
