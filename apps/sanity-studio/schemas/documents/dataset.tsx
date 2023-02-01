import { FiDatabase } from 'react-icons/fi'
import { MdHighlight, MdOutlineCategory } from 'react-icons/md'
import { CgEditFade } from 'react-icons/cg'
import { defineType, SanityDocument, Rule } from 'sanity'

const Dataset = {
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
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    },
    {
      name: 'heading',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc: SanityDocument) => doc.heading as string,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'subHeading',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'license',
      type: 'string',
      description: 'If the field is empty it will mark as Unknown License',
    },
    {
      name: 'images',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: 'taskTypes',
      type: 'array',
      options: {
        layout: 'tags',
      },
      of: [
        {
          type: 'reference',
          to: { type: 'taskType' },
        },
      ],
    },
    {
      name: 'categories',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      options: {
        layout: 'tags',
      },
      of: [
        {
          type: 'reference',
          to: {
            type: 'category',
          },
        },
      ],
    },
    {
      name: 'tasks',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      options: {
        layout: 'tags',
      },
      of: [
        {
          type: 'reference',
          to: { type: 'tasks' },
        },
      ],
    },
    {
      name: 'labelFormats',
      type: 'array',
      options: {
        layout: 'tags',
      },
      of: [
        {
          type: 'reference',
          to: { type: 'labelFormat' },
        },
      ],
    },
    {
      name: 'body',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
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
                    <span style={{ color: '#9BB8FF' }}>{children}</span>
                  ),
                },
              },
            ],
          },
        },
        { type: 'ctaList' },
        {
          type: 'image',
          validation: (Rule: Rule) => Rule.required(),
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: 'attributes',
      type: 'array',
      of: [{ type: 'attribute' }],
      group: 'attributes',
    },
    {
      name: 'classes',
      description: 'First column is for name and second column is for value',
      type: 'table',
      group: 'classes',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subHeading',
      media: 'images[0]',
    },
  },
}

export default Dataset
