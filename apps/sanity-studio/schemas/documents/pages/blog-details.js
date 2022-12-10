export default {
  name: 'blogDetailsPage',
  title: 'Blog Details Page',
  type: 'document',
  fields: [
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [{ type: 'newsletter' }, { type: 'contact' }],
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