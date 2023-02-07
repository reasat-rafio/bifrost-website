import { FcIdea } from 'react-icons/fc'
import { MdHighlight } from 'react-icons/md'
import { Rule } from 'sanity'

const contact = {
  name: 'contact',
  title: 'Contact',
  type: 'object',
  icon: FcIdea,
  fields: [
    {
      name: 'heading',
      type: 'array',
      validation: (Rule: Rule) => Rule.isRequired(),
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
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
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'ctaButton',
      type: 'ctaButton',
      validation: (Rule: Rule) => Rule.isRequired(),
    },
  ],
  preview: {
    select: {
      // TODO fix this so the heading work with prepare
      title: 'heading',
      subtitle: 'description',
    },
    prepare: ({ title, subtitle }: any) => {
      const block = (title || []).find((block: any) => block._type === 'block')

      return {
        title: block
          ? block.children
              .filter((child: any) => child._type === 'span')
              .map((span: any) => span.text)
              .join('')
          : 'No title',
        subtitle,
        icon: FcIdea,
      }
    },
  },
}

export default contact
