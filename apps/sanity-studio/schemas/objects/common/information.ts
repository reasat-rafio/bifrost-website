import { FcInfo } from 'react-icons/fc'
import { Rule } from 'sanity'

export default {
  name: 'infoBlock',
  title: 'Information',
  type: 'object',
  icon: FcInfo,
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
      description: 'Optional',
    },
    {
      name: 'heading',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      validation: (Rule: Rule) => Rule.required(),
    },
    { name: 'cta', type: 'ctaButton' },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image',
    },
  },
}
