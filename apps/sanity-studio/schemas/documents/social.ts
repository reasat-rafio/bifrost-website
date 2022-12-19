import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoShareSocial } from 'react-icons/io5'
import { defineField, defineType } from 'sanity'

const Social = defineType({
  name: 'social',
  title: 'Social',
  type: 'document',
  icon: IoShareSocial,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: ['facebook', 'linkedin', 'instagram'],
      },
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url',
      type: 'type',
    },
    prepare({ title, subtitle, type }) {
      return {
        title,
        subtitle,
        media:
          type === 'facebook'
            ? IoLogoFacebook
            : type === 'linkedin'
            ? IoLogoLinkedin
            : type === 'instagram'
            ? IoLogoInstagram
            : IoShareSocial,
      }
    },
  },
})

export default Social
