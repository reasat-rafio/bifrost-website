const OurProjects = {
  name: 'ourProjectsPage',
  title: 'Our Projects Page',
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
        { type: 'ourProjectsPage.hero' },
        { type: 'projects' },
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

export default OurProjects
