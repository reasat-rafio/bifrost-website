import { defineField, defineType, defineArrayMember } from 'sanity'

const AboutUs = defineType({
  name: 'aboutUsPage',
  title: 'About Us Page',
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
        defineArrayMember({ type: 'aboutUs.home' }),
        defineArrayMember({ type: 'aboutUs.about' }),
        defineArrayMember({ type: 'aboutUs.reason' }),
        defineArrayMember({ type: 'aboutUs.team' }),
        defineArrayMember({ type: 'aboutUs.clients' }),
        defineArrayMember({ type: 'newsletter' }),
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

export default AboutUs
