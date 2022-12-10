import { MdLink } from 'react-icons/md'

export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  icon: MdLink,
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'href', title: 'Link', type: 'string' },
    { name: 'url', title: 'URL', type: 'url' },
    { name: 'isCTA', title: 'Is CTA', type: 'boolean' },
    {
      name: 'submenu',
      title: 'Submenu',
      type: 'array',
      of: [{ type: 'menuItem' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'href',
    },
  },
}