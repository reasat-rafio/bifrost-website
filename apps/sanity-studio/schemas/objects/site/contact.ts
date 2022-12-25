import { FaBook } from 'react-icons/fa'
import { Rule } from 'sanity'

export default {
  name: 'contact',
  type: 'object',
  title: 'Contact',
  icon: FaBook,
  fields: [
    {
      name: 'initials',
      type: 'initials',
    },
    {
      name: 'headline',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'ctaButton',
      type: 'ctaButton',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'headline',
    },
    prepare({ title }: any) {
      return {
        title,
        icon: FaBook,
      }
    },
  },
}
