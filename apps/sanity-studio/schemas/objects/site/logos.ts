import { FaRegStar } from 'react-icons/fa'
import { Rule } from 'sanity'

export default {
  name: 'site.logos',
  title: 'Logos',
  type: 'document',
  icon: FaRegStar,
  fields: [
    {
      name: 'logo',
      type: 'image',
      validation: (Rule: Rule) => Rule.required(),
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
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'ogImage',
      title: 'Default SEO Image',
      type: 'image',
      options: {
        accept: 'image/png, image/jpeg, image/webp',
      },
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Logos',
      icon: FaRegStar,
    }),
  },
}
