import React from 'react'
import { AiOutlineFundProjectionScreen } from 'react-icons/ai'
import { MdHighlight } from 'react-icons/md'
import { Rule } from 'sanity'

const Projects = {
  name: 'projects',
  title: 'Projects',
  type: 'object',
  icon: AiOutlineFundProjectionScreen,
  fields: [
    {
      name: 'projects',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          name: 'project',
          type: 'object',
          icon: AiOutlineFundProjectionScreen,
          fields: [
            {
              name: 'image',
              type: 'image',
              validation: (Rule: Rule) => Rule.required(),
              fields: [
                {
                  title: 'Alternative Text',
                  name: 'alt',
                  type: 'string',
                  validation: (Rule: Rule) =>
                    Rule.required().error('Please add an alternative text for the image'),
                },
              ],
            },
            {
              name: 'title',
              type: 'array',
              validation: (Rule: Rule) => Rule.required(),
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
                            <span style={{ color: '#9BB8FF' }}>{children}</span>
                          ),
                        },
                      },
                    ],
                  },
                },
              ],
            },

            {
              name: 'subtitle',
              type: 'string',
            },
            {
              name: 'description',
              type: 'text',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'ctaButton',
              type: 'ctaButton',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              media: 'image',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: () => ({
      title: 'Projects',
    }),
  },
}

export default Projects
