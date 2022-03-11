import { FaCreativeCommonsShare } from 'react-icons/fa'

export default {
  name: 'initials',
  title: 'Initials',
  type: 'object',
  icon: FaCreativeCommonsShare,
  fields: [
    {
      name: 'hide',
      type: 'boolean',
    },
    {
      name: 'hasEllipse',
      type: 'boolean',
    },
    {
      name: 'transitionDisable',
      type: 'boolean',
    },
  ],
}
