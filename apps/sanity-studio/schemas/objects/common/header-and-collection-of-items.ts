import { RiTeamLine } from 'react-icons/ri'
import { Rule } from 'sanity'

export default {
  name: 'headerAndcollectionOfItems',
  title: 'Collection',
  type: 'object',
  icon: RiTeamLine,
  fields: [
    {
      name: 'header',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'collection',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          name: 'item',
          type: 'object',
          icon: RiTeamLine,
          fields: [
            {
              name: 'image',
              type: 'image',
              validation: (Rule: Rule) => Rule.required(),
              fields: [
                {
                  title: 'Alternative Text',
                  name: 'alt',
                  type: 'string',
                  validation: (Rule: Rule) =>
                    Rule.required().error('Please add an alternative text for the image'),
                },
              ],
            },
            {
              name: 'title',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'subtitle',
              type: 'text',
              validation: (Rule: Rule) => Rule.required(),
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
    prepare({ title }: any) {
      return {
        title,
        icon: RiTeamLine,
      }
    },
  },
}
