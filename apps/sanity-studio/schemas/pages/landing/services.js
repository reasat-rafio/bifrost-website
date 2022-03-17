import { MdOutlineViewCarousel } from 'react-icons/md'

export default {
  name: 'landing.services',
  title: 'Services',
  type: 'object',
  icon: MdOutlineViewCarousel,
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
      name: 'items',
      title: 'Item',
      type: 'array',
      of: [
        {
          name: 'service',
          type: 'object',
          title: 'Service',
          fields: [
            {
              name: 'headline',
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
            {
              name: 'image',
              type: 'image',
              title: 'Service Image',
              fields: [
                {
                  name: 'alt',
                  title: 'Alternative Text',
                  description: 'Important for SEO and accessibility',
                  type: 'string',
                },
              ],
            },

            {
              name: 'cardPosition',
              title: 'Card Position',
              type: 'string',
              options: {
                list: [
                  { title: 'Right', value: 'right' },
                  { title: 'Left', value: 'left' },
                  { title: 'Bottom Right', value: 'bottom-right' },
                  { title: 'Bottom Left', value: 'bottom-left' },
                ],
              },
            },

            {
              name: 'imagePosition',
              title: 'Card Position',
              type: 'string',
              options: {
                list: [
                  { title: 'Right', value: 'right' },
                  { title: 'Left', value: 'left' },
                  { title: 'Center', value: 'center' },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'headline',
              subtitle: 'body',
              media: 'image',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'headline',
    },
  },
}
