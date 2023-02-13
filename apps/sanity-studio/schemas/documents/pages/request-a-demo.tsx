import { MdHighlight } from 'react-icons/md'
import { Rule } from 'sanity'

const RequestDemo = {
  name: 'requestDemoPage',
  title: 'Request Demo Page',
  type: 'document',
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          name: 'requestDemoPage.home',
          type: 'object',
          fields: [
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
              type: 'array',
              of: [{ type: 'block' }],
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'seo.title',
      subtitle: 'seo.description',
    },
  },
}

export default RequestDemo
