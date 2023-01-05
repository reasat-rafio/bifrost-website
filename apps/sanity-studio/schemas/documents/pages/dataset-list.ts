import { FiDatabase } from 'react-icons/fi'

const DatasetList = {
  name: 'datasetListPage',
  title: 'Dataset Details',
  type: 'document',
  icon: FiDatabase,
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
      of: [{ type: 'primaryHero' }, { type: 'contact' }],
    },
    {
      name: 'notFound',
      type: 'datasetNotFound',
      description: 'The placeholder message if the intented dataset is not found after searcing',
    },
  ],
  preview: {
    select: {
      title: 'seo.title',
      subtitle: 'seo.description',
    },
  },
}

export default DatasetList
