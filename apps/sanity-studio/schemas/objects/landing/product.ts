import { FaProductHunt } from 'react-icons/fa'
import { Rule } from 'sanity'

export default {
  name: 'landing.products',
  title: 'Products',
  type: 'object',
  icon: FaProductHunt,
  fields: [
    {
      name: 'initials',
      type: 'initials',
    },
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      validation: (Rule: Rule) => Rule.required(),
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
      validation: (Rule: Rule) => Rule.required(),
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
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }: any) {
      return {
        title,
        subtitle,
        icon: FaProductHunt,
      }
    },
  },
}
