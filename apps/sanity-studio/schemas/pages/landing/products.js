import { AiOutlineHome } from 'react-icons/ai'
import editor from '../../editor'

export default {
  name: 'products',
  title: 'Products',
  type: 'object',
  icon: AiOutlineHome,
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
      type: 'array',
      of: [editor],
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
