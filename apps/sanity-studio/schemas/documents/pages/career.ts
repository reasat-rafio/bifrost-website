import { defineField, defineType, defineArrayMember } from 'sanity'

const Career = defineType({
  name: 'careerPage',
  title: 'Career Page',
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
      of: [
        { type: 'careerPage.hero' },
        { type: 'infoBlock' },
        { type: 'careerPage.about' },
        { type: 'careerPage.whyUs' },
        { type: 'contact' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'seo.title',
      subtitle: 'seo.description',
    },
  },
})

export default Career
