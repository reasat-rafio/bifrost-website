import { FaProductHunt } from 'react-icons/fa'

export default {
  name: 'landing.products',
  title: 'Products',
  type: 'object',
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
      name: 'body',
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
      media: 'images.0',
    },
    prepare({ title, subtitle, media }: any) {
      return {
        title,
        subtitle,
        media,
        icon: FaProductHunt,
      }
    },
  },
}
