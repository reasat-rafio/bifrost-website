import { defineField, defineType, defineArrayMember } from 'sanity'

const DatasetList = defineType({
  name: 'datasetListPage',
  title: 'Dataset Details',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [{ type: 'blog.home' }, { type: 'contact' }],
    }),
    defineField({
      name: 'notFound',
      type: 'datasetNotFound',
      description: 'The placeholder message if the intented dataset is not found after searcing',
    }),
  ],
  preview: {
    select: {
      title: 'seo.title',
      subtitle: 'seo.description',
    },
  },
})

export default DatasetList
