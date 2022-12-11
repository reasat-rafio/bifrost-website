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
      of: [
        { type: 'careerPage.hero' },
        { type: 'infoBlock' },
        { type: 'careerPage.perks' },
        { type: 'careerPage.resume' },
        { type: 'contact' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'seo.title',
      subtitle: 'seo.description',
    },
  },
}
