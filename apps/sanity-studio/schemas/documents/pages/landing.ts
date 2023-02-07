const LandingPage = {
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
        { type: 'landing.partners' },
        { type: 'landing.whyUs' },
        { type: 'landing.aboutUs' },
        { type: 'landing.outputs' },
        { type: 'landing.integrate' },
        { type: 'infoBlock' },
        { type: 'landing.results' },
        { type: 'landing.prediction' },
        { type: 'landing.testimonial' },
        { type: 'landing.useCase' },
        { type: 'contact' },

        { type: 'landing.products' },
        { type: 'landing.demo' },
        { type: 'landing.services' },
        { type: 'newsletter' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'seo.title',
      subtitle: 'seo.description',
    },
  },
}

export default LandingPage
