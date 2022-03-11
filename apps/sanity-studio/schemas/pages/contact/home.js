import { AiOutlineHome } from 'react-icons/ai'
import editor from '../../editor'

export default {
  name: 'contact.home',
  title: 'Home',
  type: 'object',
  icon: AiOutlineHome,
  fields: [
    {
      name: 'initials',
      type: 'initials',
    },
    {
      name: 'headline',
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
              type: 'array',
              of: [editor],
            },
            {
              name: 'name',
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
