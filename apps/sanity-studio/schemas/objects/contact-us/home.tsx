import { AiOutlineHome } from 'react-icons/ai'

import { Rule } from 'sanity'
import { MdHighlight } from 'react-icons/md'
import { FcInfo } from 'react-icons/fc'

export default {
  name: 'contact.home',
  title: 'Home',
  type: 'object',
  icon: AiOutlineHome,
  fields: [
    {
      name: 'initials',
      type: 'initials',
    },
    {
      name: 'headline',
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
      name: 'contactInfos',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          name: 'info',
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'array',
              of: [{ type: 'block' }],
              validation: (Rule: Rule) => Rule.required(),
            },
          ],

          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
            prepare(value: any) {
              const block = (value.subtitle || []).find((block: any) => block._type === 'block')

              return {
                title: value.title,
                subtitle: block
                  ? block.children
                      .filter((child: any) => child._type === 'span')
                      .map((span: any) => span.text)
                      .join('')
                  : 'No title',
                icon: FcInfo,
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'headline',
    },
    prepare(value: any) {
      const block = (value.title || []).find((block: any) => block._type === 'block')

      return {
        title: block
          ? block.children
              .filter((child: any) => child._type === 'span')
              .map((span: any) => span.text)
              .join('')
          : 'No title',
        icon: AiOutlineHome,
      }
    },
  },
}
