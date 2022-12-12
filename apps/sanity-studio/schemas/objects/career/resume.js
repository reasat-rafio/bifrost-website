import { FcNews } from 'react-icons/fc'
import { MdHighlight } from 'react-icons/md'
import React from 'react'

export default {
  name: 'careerPage.resume',
  title: 'Resume',
  type: 'object',
  icon: FcNews,
  fields: [
    {
      name: 'headline',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
              {
                title: 'Pop',
                value: 'pop',
                blockEditor: {
                  icon: () => <MdHighlight />,
                  render: ({ children }) => <span style={{ color: '#C9FF71' }}>{children}</span>,
                },
              },
            ],
          },
        },
      ],
    },

    {
      name: 'ctaButton',
      type: 'ctaButton',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'headline',
    },
  },
}