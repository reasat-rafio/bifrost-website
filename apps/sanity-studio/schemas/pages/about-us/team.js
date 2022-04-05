import { AiOutlineTeam } from 'react-icons/ai'

export default {
  name: 'aboutUs.team',
  title: 'Team',
  type: 'object',
  icon: AiOutlineTeam,
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
      name: 'members',
      type: 'array',
      of: [
        {
          name: 'member',
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
            },
            {
              name: 'position',
              type: 'string',
            },
            {
              name: 'image',
              type: 'image',
              title: 'Member Image',
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
