export default {
  name: 'landing.data',
  title: 'Data',
  type: 'object',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
    },
    {
      name: 'body',
      title: 'body',
      type: 'string',
    },
    {
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'ctaButton',
    },
  ],
  preview: {
    select: {
      title: 'headline',
    },
  },
}
