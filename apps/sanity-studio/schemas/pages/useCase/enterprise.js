import { MdOutlineViewCarousel } from 'react-icons/md'

export default {
  name: 'useCase.enterprise',
  title: 'Enterprise',
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
      name: 'subHeadline',
      title: 'Sub-Headline',
      type: 'string',
    },
    {
      name: 'enterprises',
      type: 'array',
      of: [
        {
          name: 'enterprise',
          type: 'object',
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
              title: 'Example Image',
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
              name: 'imagePosition',
              title: 'Image Position',
              type: 'string',
              options: {
                list: [
                  { title: 'Full', value: 'full' },
                  { title: 'Left', value: 'left' },
                  { title: 'Right', value: 'right' },
                ],
              },
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
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'body',
    },
  },
}
