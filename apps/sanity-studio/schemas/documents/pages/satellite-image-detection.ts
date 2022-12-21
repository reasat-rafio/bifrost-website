const SatelliteImageDetectionPage = {
  name: 'satelliteImageDetectionPage',
  title: 'Satellite Image Detection Page',
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
        { type: 'primaryHero' },
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

export default SatelliteImageDetectionPage
