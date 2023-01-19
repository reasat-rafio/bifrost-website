import { Rule } from 'sanity'
import { FcQuestions } from 'react-icons/fc'

const landingWhyUs = {
  name: 'landing.whyUs',
  title: 'Why Us',
  type: 'object',
  icon: FcQuestions,
  fields: [
    { name: 'title', type: 'string', validation: (Rule: Rule) => Rule.required() },
    { name: 'subtitle', type: 'text', validation: (Rule: Rule) => Rule.required() },
    { name: 'description', type: 'text', validation: (Rule: Rule) => Rule.required() },
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
            {
              name: 'title',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
    { name: 'ctaButton', type: 'ctaButton' },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare: ({ title, subtitle }: { [_key: string]: string }) => ({
      title,
      subtitle,
      icon: FcQuestions,
    }),
  },
}

export default landingWhyUs
