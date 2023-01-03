import { AiOutlineHome } from 'react-icons/ai'
import { Rule } from 'sanity'

export default {
  name: 'blog.home',
  title: 'Home',
  type: 'object',
  icon: AiOutlineHome,
  fields: [
    {
      name: 'headline',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'subHeadline',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subHeadline',
    },
    prepare({ title, subtitle }: any) {
      return {
        title,
        subtitle,
        icon: AiOutlineHome,
      }
    },
  },
}
