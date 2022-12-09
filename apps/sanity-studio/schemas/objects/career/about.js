import { FcInfo } from 'react-icons/fc'

export default {
  name: 'careerPage.about',
  title: 'About',
  type: 'object',
  icon: FcInfo,
  fields: [
    {
      name: 'image',
      type: 'image',
    },
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    { name: 'cta', type: 'ctaButton' },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image',
    },
  },
}
