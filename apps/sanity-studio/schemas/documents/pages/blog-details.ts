import { defineField, defineType, defineArrayMember } from 'sanity'

const BlogDetails = defineType({
  name: 'blogDetailsPage',
  title: 'Blog Details Page',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [defineArrayMember({ type: 'newsletter' }), defineArrayMember({ type: 'contact' })],
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

export default BlogDetails
