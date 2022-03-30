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
      name: 'description',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'icon',
    },
  },
}
