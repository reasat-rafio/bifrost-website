export default {
  name: 'aboutUsPage',
  title: 'About Us Page',
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
        { type: 'aboutUs.home' },
        { type: 'aboutUs.about' },
        { type: 'aboutUs.reason' },
        { type: 'aboutUs.team' },
        { type: 'aboutUs.clients' },
        { type: 'newsletter' },
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
