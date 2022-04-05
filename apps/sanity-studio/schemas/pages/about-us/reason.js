import editor from '../../editor'
import { FaPodcast } from 'react-icons/fa'

export default {
  name: 'aboutUs.reason',
  title: 'Reason Why',
  type: 'object',
  icon: FaPodcast,
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
      title: 'Sub Headline',
      type: 'string',
    },
    {
      name: 'reasons',
      type: 'array',
      of: [
        {
          name: 'reason',
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
            },
            {
              name: 'headline',
              type: 'string',
            },
            {
              name: 'body',
              type: 'array',
              of: [editor],
            },
            {
              name: 'image',
              type: 'image',
              title: 'Reason Why Image',
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
