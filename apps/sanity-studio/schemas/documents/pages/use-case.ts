const FeaturesPage = {
  name: 'useCasePage',
  title: 'Features Page',
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
        { type: 'useCase.home' },
        { type: 'useCase.example' },
        { type: 'useCase.feature' },
        { type: 'useCase.assurance' },
        // { type: 'useCase.enterprise' },
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

export default FeaturesPage
