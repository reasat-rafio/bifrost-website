import { Rule } from 'sanity'
import { TbHeartHandshake } from 'react-icons/tb'

const landingPartners = {
  name: 'landing.partners',
  title: 'Partners',
  type: 'object',
  icon: TbHeartHandshake,
  fields: [
    {
      name: 'partners',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          name: 'partner',
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              description: 'optional',
            },
            {
              name: 'url',
              type: 'url',
              description: 'optional',
            },
            {
              name: 'logo',
              type: 'image',
              title: 'Client logo',
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
          ],
        },
      ],
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Partners',
    }),
  },
}

export default landingPartners
