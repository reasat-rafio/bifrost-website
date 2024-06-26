import { FcDoughnutChart } from 'react-icons/fc'
import { MdHighlight } from 'react-icons/md'
import { Rule } from 'sanity'

const landingResults = {
  name: 'landing.results',
  title: 'Result',
  icon: FcDoughnutChart,
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'heading',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'results',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          name: 'result',
          type: 'object',
          fields: [
            {
              name: 'number',
              type: 'number',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'isPercentage',
              type: 'boolean',
              initialValue: false,
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'indicatorIcon',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
              options: {
                list: [
                  { title: 'Increase', value: 'increase' },
                  { title: 'Decrease', value: 'decrease' },
                  { title: 'None', value: 'none' },
                ],
              },
            },
            {
              name: 'description',
              type: 'array',
              of: [
                {
                  type: 'block',
                  marks: {
                    decorators: [
                      {
                        title: 'Pop',
                        value: 'pop',
                        blockEditor: {
                          icon: () => <MdHighlight />,
                          render: ({ children }: { children: React.ReactNode }) => (
                            <span style={{ color: '#70FCEB' }}>{children}</span>
                          ),
                        },
                      },
                    ],
                  },
                },
              ],
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'description',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'heading',
    },
    prepare: ({ title, subtitle }: any) => ({
      title,
      subtitle,
      icon: FcDoughnutChart,
    }),
  },
}

export default landingResults
