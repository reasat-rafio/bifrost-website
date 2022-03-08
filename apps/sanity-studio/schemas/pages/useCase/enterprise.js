import { MdOutlineViewCarousel } from 'react-icons/md'

export default {
  name: 'useCase.enterprise',
  title: 'Enterprise',
  type: 'object',
  icon: MdOutlineViewCarousel,
  fields: [
    {
      name: 'headline',
      title: 'Headline',
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
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'body',
              title: 'body',
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
      subtitle: 'body',
    },
  },
}
