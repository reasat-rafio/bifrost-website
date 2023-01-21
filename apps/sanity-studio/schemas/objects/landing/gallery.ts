import { Rule } from 'sanity'
import { FcGallery } from 'react-icons/fc'

const landingGallery = {
  name: 'landing.mediaGallery',
  title: 'Media Gallery',
  icon: FcGallery,
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'heading',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'assets',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          name: 'image',
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
        },
        { name: 'video', type: 'video' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'heading',
    },
    prepare: ({ title, subtitle }: { [_key: string]: string }) => ({
      title,
      subtitle,
      icon: FcGallery,
    }),
  },
}

export default landingGallery
