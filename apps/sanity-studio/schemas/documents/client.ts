import { IoPeopleOutline } from 'react-icons/io5'
import { Rule } from 'sanity'

const Client = {
  name: 'client',
  title: 'Client',
  type: 'document',
  icon: IoPeopleOutline,
  fields: [
    {
      name: 'headline',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'subHeadline',
      title: 'Sub-Headline',
      type: 'text',
      validation: (Rule: Rule) => Rule.required(),
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
      title: 'headline',
      subtitle: 'subHeadline',
    },
    
  },
}

export default Client
