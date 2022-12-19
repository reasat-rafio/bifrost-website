import { FiDatabase } from 'react-icons/fi'
import { MdHighlight } from 'react-icons/md'
import { CgEditFade } from 'react-icons/cg'
import React from 'react'
import { defineField, defineType, SanityDocument, defineArrayMember } from 'sanity'

const Dataset = defineType({
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
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    }),
    defineField({ name: 'heading', type: 'string' }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc: SanityDocument) => doc.heading as string,
      },
    }),
    defineField({ name: 'subHeading', type: 'string' }),
    defineField({
      name: 'license',
      type: 'string',
      description: 'If the field is empty it will mark as Unknown License',
    }),
    defineField({ name: 'images', type: 'array', of: [{ type: 'image' }] }),
    defineField({
      name: 'taskTypes',
      type: 'array',
      options: {
        layout: 'tags',
      },
      of: [
        defineArrayMember({
          type: 'reference',
          to: { type: 'taskType' },
        }),
      ],
    }),

    defineField({
      name: 'categories',
      type: 'array',
      options: {
        layout: 'tags',
      },
      of: [
        {
          type: 'reference',
          to: { type: 'category' },
        },
      ],
    }),

    defineField({
      name: 'tasks',
      type: 'array',
      options: {
        layout: 'tags',
      },
      of: [
        defineArrayMember({
          type: 'reference',
          to: { type: 'tasks' },
        }),
      ],
    }),

    defineField({
      name: 'labelFormats',
      type: 'array',
      options: {
        layout: 'tags',
      },
      of: [
        defineArrayMember({
          type: 'reference',
          to: { type: 'labelFormat' },
        }),
      ],
    }),

    defineField({
      name: 'body',
      type: 'array',
      of: [
        defineArrayMember({
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
                  render: ({ children }: { children: React.ReactNode }) => (
                    <span style={{ opacity: '0.5' }}>{children}</span>
                  ),
                },
              },
              {
                title: 'Highlight',
                value: 'highlight',
                blockEditor: {
                  icon: () => <MdHighlight />,
                  render: ({ children }: { children: React.ReactNode }) => (
                    <span style={{ color: '#C9FF71' }}>{children}</span>
                  ),
                },
              },
            ],
          },
        }),
        defineArrayMember({ type: 'ctaList' }),
        defineArrayMember({ type: 'image' }),
      ],
    }),
    defineField({
      name: 'attributes',
      type: 'array',
      of: [defineArrayMember({ type: 'attribute' })],
      group: 'attributes',
    }),
    defineField({
      name: 'classes',
      description: 'First column is for name and second column is for value',
      type: 'table',
      group: 'classes',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subHeading',
      media: 'images[0]',
    },
  },
})

export default Dataset
