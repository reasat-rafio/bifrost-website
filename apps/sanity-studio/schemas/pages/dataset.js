import { FiDatabase } from 'react-icons/fi'
import { MdHighlight } from 'react-icons/md'
import { CgEditFade } from 'react-icons/cg'
import React from 'react'

export default {
  name: 'dataset',
  title: 'Dataset',
  type: 'document',
  icon: FiDatabase,

  groups: [
    {
      name: 'attributes',
      title: 'Attributes',
    },
    {
      name: 'classes',
      title: 'Classes',
    },
  ],

  fields: [
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    },
    { name: 'heading', type: 'string' },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc) => doc.heading,
      },
    },
    { name: 'subHeading', type: 'string' },
    {
      name: 'license',
      type: 'string',
      description: 'If the field is empty it will mark as Unknown License',
    },
    { name: 'images', type: 'array', of: [{ type: 'image' }] },
    {
      name: 'tags',
      type: 'array',
      options: {
        layout: 'tags',
        isHighlighted: true,
      },
      of: [
        {
          type: 'reference',
          to: { type: 'tag' },
        },
      ],
    },

    {
      name: 'body',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'link',
                fields: [
                  {
                    name: 'url',
                    type: 'url',
                  },
                ],
              },
            ],
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
              {
                title: 'Low Opacity',
                value: 'lowOpacity',
                blockEditor: {
                  icon: () => <CgEditFade />,
                  render: ({ children }) => <span style={{ opacity: '0.5' }}>{children}</span>,
                },
              },
              {
                title: 'Highlight',
                value: 'highlight',
                blockEditor: {
                  icon: () => <MdHighlight />,
                  render: ({ children }) => <span style={{ color: '#C9FF71' }}>{children}</span>,
                },
              },
            ],
          },
        },
        { type: 'ctaList' },
        { type: 'image' },
      ],
    },
    { name: 'attributes', type: 'array', of: [{ type: 'attribute' }], group: 'attributes' },
    {
      name: 'classes',
      description: 'First column is for name and second column is for value',
      type: 'table',
      group: 'classes',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subHeading',
      media: 'image',
    },
  },
}
