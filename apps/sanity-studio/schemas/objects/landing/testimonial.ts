import { FcCollaboration } from 'react-icons/fc'
import { Rule } from 'sanity'

const landingTestimonial = {
  name: 'landing.testimonial',
  title: 'Testimonials',
  type: 'object',
  icon: FcCollaboration,
  fields: [
    {
      name: 'title',
      type: 'text',
      vlidation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'testimonials',
      type: 'array',
      vlidation: (Rule: Rule) => Rule.required(),
      of: [
        {
          name: 'testimonial',
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              vlidation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'role',
              type: 'string',
              vlidation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'image',
              type: 'image',
              title: 'Product Image',
              vlidation: (Rule: Rule) => Rule.required(),
              fields: [
                {
                  name: 'alt',
                  title: 'Alternative Text',
                  description: 'Important for SEO and accessibility',
                  type: 'string',
                  vlidation: (Rule: Rule) => Rule.required(),
                },
              ],
            },
            {
              name: 'quote',
              type: 'text',
              vlidation: (Rule: Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'quote',
              media: 'image',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }: any) {
      return {
        title,
        icon: FcCollaboration,
      }
    },
  },
}

export default landingTestimonial
