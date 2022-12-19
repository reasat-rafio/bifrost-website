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
}
