import { defineField, defineType, defineArrayMember } from 'sanity'

const LandingPage = defineType({
  name: 'landingPage',
  title: 'Landing Page',
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
        defineArrayMember({ type: 'landing.home' }),
        defineArrayMember({ type: 'landing.products' }),
        defineArrayMember({ type: 'landing.demo' }),
        defineArrayMember({ type: 'landing.services' }),
        defineArrayMember({ type: 'newsletter' }),
        defineArrayMember({ type: 'landing.projects' }),
        defineArrayMember({ type: 'landing.reviews' }),
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

export default LandingPage
