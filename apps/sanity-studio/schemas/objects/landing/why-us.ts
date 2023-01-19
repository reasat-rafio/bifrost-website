import { Rule } from 'sanity'
import { MdOutlineViewCarousel } from 'react-icons/md'

const LandingWhyUs = {
  name: 'landing.whyUs',
  title: 'Services',
  type: 'object',
  icon: MdOutlineViewCarousel,
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
          fields: [
            {
              name: 'image',
              type: 'image',
              validation: (Rule: Rule) => Rule.required(),
              fileds: [
                {
                  name: 'alt',
                },
              ],
            },
            {
              name: 'title',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
}

export default LandingWhyUs
