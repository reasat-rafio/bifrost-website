import { FcIdea } from 'react-icons/fc'
import { Rule } from 'sanity'

const landingCallout = {
  name: 'landing.callout',
  title: 'Callout',
  type: 'object',
  icon: FcIdea,
  fields: [
    {
      name: 'heading',
      type: 'array',
      validation: (Rule: Rule) => Rule.isRequired(),
      of: [{ type: 'block' }],
    },
    {
      name: 'description',
      type: 'text',
      validation: (Rule: Rule) => Rule.isRequired(),
    },
    {
      name: 'ctaButton',
      type: 'ctaButton',
      validation: (Rule: Rule) => Rule.isRequired(),
    },
  ],
}

export default landingCallout
