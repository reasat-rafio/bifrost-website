import { MdEditAttributes } from 'react-icons/md'

export default {
  name: 'attribute',
  type: 'document',
  icon: MdEditAttributes,
  fields: [
    {
      name: 'icon',
      type: 'image',
    },
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'text',
      type: 'string',
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
