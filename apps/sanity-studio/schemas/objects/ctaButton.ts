import { BsLink45Deg } from 'react-icons/bs'

export default {
  name: 'ctaButton',
  title: 'CTA Button',
  type: 'object',
  icon: BsLink45Deg,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'href',
      title: 'href',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
