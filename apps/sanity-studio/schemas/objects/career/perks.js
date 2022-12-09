import { RiTeamLine } from 'react-icons/ri'

export default {
  name: 'careerPage.perks',
  title: 'Perks',
  type: 'object',
  icon: RiTeamLine,
  fields: [
    {
      name: 'header',
      type: 'string',
    },
    {
      name: 'perks',
      type: 'array',
      of: [
        {
          name: 'perk',
          type: 'object',
          icon: RiTeamLine,
          fields: [
            {
              name: 'image',
              type: 'image',
            },
            {
              name: 'title',
              type: 'string',
            },
            {
              name: 'subtitle',
              type: 'text',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              media: 'image',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'header',
    },
  },
}
