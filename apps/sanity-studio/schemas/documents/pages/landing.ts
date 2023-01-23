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
        { type: 'landing.results' },
        { type: 'landing.testimonial' },
        { type: 'landing.useCase' },
        { type: 'landing.callout' },

        { type: 'landing.products' },
        { type: 'landing.demo' },
        { type: 'landing.services' },
        { type: 'newsletter' },
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
}

export default LandingPage
