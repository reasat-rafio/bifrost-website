import { FaProductHunt } from 'react-icons/fa'

export default {
  name: 'landing.products',
  title: 'Products',
  type: 'object',
  icon: FaProductHunt,
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
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Product Image',
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility',
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
      media: 'images[0].image',
    },
  },
}
