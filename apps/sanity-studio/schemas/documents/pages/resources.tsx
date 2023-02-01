import { GrResources } from 'react-icons/gr'
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

const resourcesPage = {
  name: 'resourcesPage',
  title: 'Resources',
  type: 'object',
  icon: GrResources,
  fields: [
    {
      name: 'seo',
      type: 'seo',
    },
    {
      name: 'body',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Page Header', value: 'pageHeader', component: PageHeaderStyle },
            { title: 'Section Title', value: 'sectionTitle', component: SectionTitleStyle },
            {
              title: 'Section Subtitle',
              value: 'sectionSubtitle',
              component: SectionSubtitleStyle,
            },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
          },
        },
        {
          type: 'quote',
        },
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
}

export default resourcesPage
