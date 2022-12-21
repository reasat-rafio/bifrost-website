const WhySyntheticDataPage = {
  name: 'whySyntheticDataPage',
  title: 'Why Synthetic Data Page',
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
        { type: 'whySyntheticDataPage.hero' },
        { type: 'infoBlock' },
        { type: 'headerAndcollectionOfItems' },
        { type: 'resume' },
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

export default WhySyntheticDataPage
