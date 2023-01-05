import { MdOutlineCategory } from 'react-icons/md'

export default {
  name: 'tasks',
  title: 'Tasks',
  type: 'document',
  icon: MdOutlineCategory,
  fields: [
    {
      name: 'name',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare({ title }: any) {
      return {
        title,
        icon: MdOutlineCategory,
      }
    },
  },
}
