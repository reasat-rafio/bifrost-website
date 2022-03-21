import { GoQuote } from 'react-icons/go'

export default {
  name: 'quote',
  type: 'object',
  title: 'Quote',
  icon: GoQuote,
  fields: [
    {
      name: 'text',
      type: 'text',
      title: 'Text',
    },
    {
      name: 'author',
      type: 'string',
      title: 'Author',
    },
    {
      name: 'url',
      type: 'url',
      title: 'URL',
      description: 'Source on the web. OPTIONAL',
    },
  ],
  preview: {
    select: {
      title: 'text',
      subtitle: 'author',
    },
  },
}
