import { FcInspection } from 'react-icons/fc'

const landingIntegrate = {
  name: 'landing.integrate',
  title: 'Integrate',
  icon: FcInspection,
  type: 'object',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'subtitle', type: 'text' },
    { name: 'description', type: 'text' },
    {
      name: 'ctaButton',
      type: 'ctaButton',
    },
    { name: 'showWave', type: 'boolean', initialValue: false },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare: ({ title, subtitle }: { [_key: string]: string }) => ({
      title,
      subtitle,
      icon: FcInspection,
    }),
  },
}

export default landingIntegrate
