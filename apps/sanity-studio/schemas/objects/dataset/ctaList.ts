import { BsLink45Deg } from 'react-icons/bs'

export default {
  name: 'ctaList',
  title: 'Buttons',
  type: 'object',
  icon: BsLink45Deg,
  fields: [
    {
      name: 'ctaButtons',
      type: 'array',
      of: [{ type: 'ctaButton' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Buttons',
      }
    },
  },
}
