import { AiOutlineHome } from 'react-icons/ai'

export default {
  name: 'useCase.home',
  title: 'Home',
  type: 'object',
  icon: AiOutlineHome,
  fields: [
    {
      name: 'initials',
      type: 'initials',
    },
    {
      name: 'headline',
      type: 'string',
    },
    {
      name: 'subHeadline',
      title: 'Sub-Headline',
      type: 'string',
    },
    {
      name: 'body',
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
      subtitle: 'body',
    },
  },
}
