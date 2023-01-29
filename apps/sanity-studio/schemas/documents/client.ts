import { IoPeopleOutline } from 'react-icons/io5'
import { Rule } from 'sanity'

const Client = {
  name: 'client',
  title: 'Client',
  type: 'document',
  icon: IoPeopleOutline,
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      type: 'text',
      description: 'optional',
    },
    {
      name: 'clients',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          name: 'client',
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
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
}

export default Client
