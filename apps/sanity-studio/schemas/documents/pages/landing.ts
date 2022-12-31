import { defineType } from 'sanity'

const LandingPage = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
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
      of: [
        { type: 'landing.home' },
        { type: 'landing.products' },
        { type: 'landing.demo' },
        { type: 'landing.services' },
        { type: 'newsletter' },
        { type: 'landing.projects' },
        { type: 'landing.reviews' },
        { type: 'contact' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'seo.title',
      subtitle: 'seo.description',
    },
  },
})

export default LandingPage
