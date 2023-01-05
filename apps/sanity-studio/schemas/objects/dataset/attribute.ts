import { MdEditAttributes } from 'react-icons/md'
import { Rule } from 'sanity'

export default {
  name: 'attribute',
  type: 'document',
  title: 'Attribute',
  icon: MdEditAttributes,
  fields: [
    {
      name: 'icon',
      type: 'image',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'text',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'text',
      media: 'icon',
    },
  },
}
