export default {
  name: 'datasetDetailsPage',
  title: 'Dataset Details Page',
  type: 'document',
  fields: [
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [{ type: 'contact' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: 'Blog Details',
      }
    },
  },
}
