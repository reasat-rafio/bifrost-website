import { FcNews } from 'react-icons/fc'
import { MdHighlight } from 'react-icons/md'
import React from 'react'

export default {
  name: 'newsletter',
  title: 'newsletter',
  type: 'object',
  icon: FcNews,
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
                  render: ({ children }: { children: React.ReactNode }) => (
                    <span style={{ color: '#C9FF71' }}>{children}</span>
                  ),
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
