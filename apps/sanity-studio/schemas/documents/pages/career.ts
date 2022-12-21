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
        defineArrayMember({ type: 'careerPage.hero' }),
        defineArrayMember({ type: 'infoBlock' }),
        defineArrayMember({ type: 'careerPage.perks' }),
        defineArrayMember({ type: 'resume' }),
        defineArrayMember({ type: 'contact' }),
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
