import { FcAbout } from 'react-icons/fc'
import { Rule } from 'sanity'

const landingAboutUs = {
  name: 'landing.aboutUs',
  title: 'About Us',
  type: 'object',
  icon: FcAbout,
  fields: [
    {
      name: 'collection',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          name: 'item',
          type: 'object',
          validation: (Rule: Rule) => Rule.required(),
          fields: [
            {
              name: 'title',
              type: 'string',
            },
            {
              name: 'heading',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'array',
              of: [{ type: 'block' }],
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'image',
              type: 'image',
              validation: (Rule: Rule) => Rule.required(),
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
          ],
          preview: {
            select: {
              title: 'title',
              heading: 'heading',
              media: 'image',
            },
            prepare: ({ title, heading, media }: { [_key: string]: string }) => ({
              title: title ? title : heading,
              media,
            }),
          },
        },
      ],
    },
  ],
  preview: {
    prepare: () => ({
      title: 'About Us',
      icon: FcAbout,
    }),
  },
}

export default landingAboutUs
