import { MdOutlineViewCarousel } from 'react-icons/md'

export default {
  name: 'useCase.assurance',
  title: 'Assurance',
  type: 'object',
  icon: MdOutlineViewCarousel,
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
    },
    {
      name: 'subHeadline',
      title: 'Sub-Headline',
      type: 'string',
    },
    {
      name: 'body',
      title: 'body',
      type: 'string',
    },
    {
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'ctaButton',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Assurance Image',
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
          type: 'string',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'body',
    },
  },
}
