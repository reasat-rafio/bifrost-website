import { AiOutlineHome } from 'react-icons/ai'

export default {
  name: 'ourProjectsPage.hero',
  title: 'Hero',
  type: 'object',
  icon: AiOutlineHome,
  fields: [
    {
      name: 'headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
  },
}
