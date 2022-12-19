import { defineField, defineType, defineArrayMember } from 'sanity'

const DatasetDetails = defineType({
  name: 'datasetDetailsPage',
  title: 'Dataset Details Page',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [defineArrayMember({ type: 'contact' })],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Blog Details',
      }
    },
  },
})

export default DatasetDetails
