import { FcLineChart } from 'react-icons/fc'

const landingPrediction = {
  name: 'landing.prediction',
  title: 'Prediction',
  icon: FcLineChart,
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
      icon: FcLineChart,
    }),
  },
}

export default landingPrediction
