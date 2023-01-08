import { AiOutlineHome } from 'react-icons/ai'
import { Rule } from 'sanity'

export default {
  name: 'whySyntheticDataPage.hero',
  title: 'Hero',
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
    },
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subHeadline',
    },
    preapre({ title, subtitle }: any) {
      return {
        title,
        subtitle,
        icon: AiOutlineHome,
      }
    },
  },
}
