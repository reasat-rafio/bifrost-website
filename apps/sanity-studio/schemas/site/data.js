import { FaDatabase } from 'react-icons/fa'

export default {
  name: 'data',
  title: 'Data',
  type: 'object',
  icon: FaDatabase,
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
    },
    {
      name: 'body',
      title: 'body',
      type: 'string',
    },
    {
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'ctaButton',
    },
  ],
  preview: {
    select: {
      title: 'headline',
    },
  },
}
