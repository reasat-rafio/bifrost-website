import { CgNotes } from 'react-icons/cg'
import { MdHighlight } from 'react-icons/md'
import { Rule } from 'sanity'

const PageHeaderStyle = (props: { children: React.ReactNode }) => (
  <h1
    style={{
      fontSize: '40px',
      background: `linear-gradient(91.41deg, #70FCEB 4.55%, #9BB8FF 51.06%, #B794FF 91.28%)`,
      backgroundClip: 'text',
      color: 'transparent',
    }}
  >
    {props.children}
  </h1>
)

const SectionTitleStyle = (props: { children: React.ReactNode }) => (
  <span
    style={{
      fontSize: '18px',
      textTransform: 'uppercase',
      color: '#70FCEB',
      lineHeight: 'normal',
      padding: 0,
    }}
  >
    {props.children}
  </span>
)

const SectionSubtitleStyle = (props: { children: React.ReactNode }) => (
  <span
    style={{
      lineHeight: 'normal',
      fontSize: '25px',
    }}
  >
    {props.children}
  </span>
)

const policy = {
  name: 'privacyPolicyPage.policy',
  title: 'Policy',
  type: 'object',
  icon: CgNotes,
  fields: [
    {
      name: 'policy',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Headering', value: 'pageHeader', component: PageHeaderStyle },
            { title: 'Title', value: 'sectionTitle', component: SectionTitleStyle },
            {
              title: 'Subtitle',
              value: 'sectionSubtitle',
              component: SectionSubtitleStyle,
            },
          ],
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
                    <span
                      style={{
                        background: `linear-gradient(91.41deg, #70FCEB 4.55%, #9BB8FF 51.06%, #B794FF 91.28%)`,
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      {children}
                    </span>
                  ),
                },
              },
            ],
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'policy',
    },
    prepare: (value: any) => {
      const block = (value.title || []).find((block: any) => block._type === 'block')

      return {
        title: block
          ? block.children
              .filter((child: any) => child._type === 'span')
              .map((span: any) => span.text)
              .join('')
          : 'No title',
        icon: CgNotes,
      }
    },
  },
}

export default policy
