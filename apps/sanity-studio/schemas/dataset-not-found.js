import { BiCommentError } from 'react-icons/bi'

export default {
  name: 'datasetNotFound',
  title: 'Not Found',
  type: 'object',
  icon: BiCommentError,
  fields: [
    {
      name: 'header',
      type: 'string',
    },
    {
      name: 'description',
      type: 'text',
    },
    { name: 'image', type: 'image' },
  ],
}
