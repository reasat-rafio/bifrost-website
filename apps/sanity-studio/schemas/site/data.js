import { FaDatabase } from 'react-icons/fa'
import { MdHighlight } from 'react-icons/md'
import React from 'react'

export default {
  name: 'data',
  title: 'Data',
  type: 'object',
  icon: FaDatabase,
  fields: [
    {
      name: 'initials',
      type: 'initials',
    },
    {
      name: 'headline',
      type: 'array',
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
      name: 'body',
      type: 'string',
    },
    {
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'ctaButton',
    },
  ],
  preview: {
    select: {
      title: 'headline',
    },
  },
}
