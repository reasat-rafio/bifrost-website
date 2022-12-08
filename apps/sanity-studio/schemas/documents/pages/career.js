export default {
  name: 'careerPage',
  title: 'Career Page',
  type: 'document',
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [{ type: 'newsletter' }, { type: 'contact' }],
    },
  ],
  preview: {
    select: {
      title: 'seo.title',
      subtitle: 'seo.description',
    },
  },
}
