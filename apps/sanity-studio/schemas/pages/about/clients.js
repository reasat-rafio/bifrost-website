import { IoPeopleOutline } from 'react-icons/io5'

export default {
  name: 'aboutUs.clients',
  title: 'Clients',
  type: 'object',
  icon: IoPeopleOutline,
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
      name: 'clients',
      type: 'array',
      of: [
        {
          name: 'client',
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'logo',
              type: 'image',
              title: 'Client logo',
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
    },
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'body',
    },
  },
}
