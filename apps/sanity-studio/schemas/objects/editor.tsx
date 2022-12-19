import React from 'react'
import { ImFontSize } from 'react-icons/im'

export default {
  type: 'block',
  styles: [
    { title: 'Normal', value: 'normal' },
    { title: 'H1', value: 'h1' },
    { title: 'H2', value: 'h2' },
    { title: 'H3', value: 'h3' },
    { title: 'H4', value: 'h4' },
    { title: 'H5', value: 'h5' },
    { title: 'H6', value: 'h6' },
    { title: 'Quote', value: 'blockquote' },
    {
      title: 'Caption',
      value: 'caption',
      blockEditor: {
        render: ({ children }: { children: React.ReactNode }) => (
          <span style={{ fontSize: '0.8rem' }}>{children}</span>
        ),
      },
    },
  ],
  // Annotations can be any object structure – e.g. a link or a footnote.
  marks: {
    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Emphasis', value: 'em' },
      { title: 'Underline', value: 'underline' },
    ],
    annotations: [
      {
        name: 'fontSize',
        type: 'object',
        title: 'Font Size',
        fields: [
          {
            name: 'size',
            type: 'number',
            title: 'Size',
            description: 'In px',
          },
        ],
        blockEditor: {
          icon: ImFontSize,
          render: ({ size, children }: { size: number; children: React.ReactNode }) => {
            return <span style={{ fontSize: size }}>{children}</span>
          },
        },
      },
    ],
  },
}
