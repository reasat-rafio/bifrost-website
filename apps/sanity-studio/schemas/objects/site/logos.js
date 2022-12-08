import { FaRegStar } from 'react-icons/fa'

export default {
  name: 'site.logos',
  title: 'Logos',
  type: 'document',
  icon: FaRegStar,
  fields: [
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
    },
    {
      name: 'logoDark',
      title: 'Logo Dark',
      type: 'image',
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    },
    {
      name: 'ogImage',
      title: 'Default SEO Image',
      type: 'image',
      options: {
        accept: 'image/png, image/jpeg, image/webp',
      },
    },
  ],
  preview: {
    select: {
      media: 'logo',
    },
  },
}
