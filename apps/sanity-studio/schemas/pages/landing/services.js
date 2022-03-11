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
            },
            {
              name: 'imagePosition',
              title: 'Image Position',
              type: 'string',
            },
          ],
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
