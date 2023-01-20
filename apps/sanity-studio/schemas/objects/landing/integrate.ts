import { Rule } from 'sanity'
import { FcCapacitor } from 'react-icons/fc'

const landingIntegrate = {
  name: 'landing.integrate',
  title: 'Integrate',
  icon: FcCapacitor,
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'ctaButton',
      type: 'ctaButton',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare: ({ title, subtitle }: { [_key: string]: string }) => ({
      title,
      subtitle,
      icon: FcCapacitor,
    }),
  },
}

export default landingIntegrate
