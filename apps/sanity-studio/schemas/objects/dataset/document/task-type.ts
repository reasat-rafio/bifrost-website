import { MdOutlineCategory } from 'react-icons/md'

export default {
  name: 'taskType',
  title: 'Task Type',
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
