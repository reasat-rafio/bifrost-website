export default {
  name: 'footer',
  title: 'Footer',
  type: 'object',
  fields: [
    {
      name: 'copyright',
      type: 'string',
    },
    {
      name: 'menu',
      title: 'Menu',
      type: 'array',
      of: [{ type: 'menuItem' }],
    },
    {
      name: 'socialButtons',
      type: 'array',
      of: [
        {
          name: 'network',
          type: 'reference',
          to: [{ type: 'social' }],
        },
      ],
    },
  ],
}
