import { FcNews } from 'react-icons/fc'

export default {
  name: 'data',
  title: 'data',
  type: 'object',
  icon: FcNews,
  fields: [
    {
      name: 'initials',
      type: 'initials',
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
    },
  },
}
