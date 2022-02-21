import { AiOutlineHome } from 'react-icons/ai'
import editor from '../../editor'

export default {
  name: 'contact.home',
  title: 'Home',
  type: 'object',
  icon: AiOutlineHome,
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
    },
    {
      name: 'items',
      type: 'array',
      of: [
        {
          name: 'contactItem',
          type: 'object',
          fields: [
            {
              name: 'body',
              title: 'body',
              type: 'array',
              of: [editor],
            },
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'body',
    },
  },
}
