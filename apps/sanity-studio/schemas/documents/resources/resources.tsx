import { BsIntersect } from 'react-icons/bs'
import { GrResources } from 'react-icons/gr'
import { TiWaves } from 'react-icons/ti'
import { Rule, SanityDocument } from 'sanity'

const resource = {
  name: 'resource',
  title: 'Resource',
  type: 'document',
  icon: GrResources,
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    },
    { name: 'heading', type: 'string', validation: (Rule: Rule) => Rule.required() },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc: SanityDocument) => doc.heading as string,
      },
      validation: (Rule: Rule) => Rule.required(),
    },

    { name: 'shortDescription', type: 'text', validation: (Rule: Rule) => Rule.required() },
    {
      type: 'image',
      name: 'image',
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
    {
      name: 'tags',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      options: {
        layout: 'tags',
      },
      of: [
        {
          type: 'reference',
          to: { type: 'resourcesTag' },
        },
      ],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      initialValue: [
        {
          _type: 'overview',
          heading: 'Overview',
        },
      ],
      of: [
        {
          name: 'overview',
          type: 'object',
          icon: TiWaves,
          fields: [
            {
              name: 'heading',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'image',
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
            {
              name: 'description',
              type: 'array',
              validation: (Rule: Rule) => Rule.required(),
              of: [
                { type: 'block' },
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
          ],
        },
        {
          name: 'section',
          type: 'object',
          icon: BsIntersect,
          fields: [
            {
              name: 'heading',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'subHeading',
              type: 'text',
            },
            {
              name: 'description',
              type: 'array',
              validation: (Rule: Rule) => Rule.required(),
              of: [
                { type: 'block' },
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
                {
                  type: 'quote',
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'heading',
            },
            prepare({ title }: any) {
              return {
                title,
                icon: BsIntersect,
              }
            },
          },
        },
      ],
    },
  ],
}

export default resource
