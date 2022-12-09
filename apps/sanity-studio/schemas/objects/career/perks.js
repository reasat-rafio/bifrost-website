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
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'perks',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          name: 'perk',
          type: 'object',
          icon: RiTeamLine,
          fields: [
            {
              name: 'image',
              type: 'image',
              validation: (Rule) => Rule.required(),
              fields: [
                {
                  title: 'Alternative Text',
                  name: 'alt',
                  type: 'string',
                  validation: (Rule) =>
                    Rule.required().error('Please add an alternative text for the image'),
                },
              ],
            },
            {
              name: 'title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'subtitle',
              type: 'text',
              validation: (Rule) => Rule.required(),
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
