import { AiOutlineHome } from 'react-icons/ai'

export default {
  name: 'blog.home',
  title: 'Home',
  type: 'object',
  icon: AiOutlineHome,
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
    },
    {
      name: 'subHeadline',
      title: 'Sub-Headline',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'body',
    },
  },
}
