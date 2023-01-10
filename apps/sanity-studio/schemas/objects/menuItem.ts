import { MdLink } from 'react-icons/md'
import { Rule } from 'sanity'

export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  icon: MdLink,
  validation: (Rule: Rule) =>
    Rule.custom((content: any) => {
      const pageUrlAndExternalURlBothPresent = !!content?.pageUrl && !!content?.externalUrl
      return pageUrlAndExternalURlBothPresent
        ? {
            message:
              'There should be only one page url or external url set. Please remove the unwanted one',
          }
        : true
    }),
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    { name: 'pageUrl', type: 'string' },
    { name: 'externalUrl', type: 'url' },
    { name: 'highlight', type: 'boolean' },
    {
      name: 'dropdownList',
      description:
        'Optional Field | If this field is fill then the pageUrl and externalUrl will be ignore',
      type: 'array',
      of: [
        {
          name: 'listItem',
          type: 'object',
          validation: (Rule: Rule) => Rule.required(),
          fields: [
            {
              name: 'image',
              type: 'image',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'title',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
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
              subtitle: 'description',
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
      subtitle: 'href',
      highlight: 'highlight',
      dropdownList: 'dropdownList',
    },
    prepare({ title, subtitle, highlight, dropdownList }: any) {
      return {
        title: `${title} ${!!dropdownList?.length || highlight ? '|' : ''} ${
          highlight ? 'Is Highlighted' : ''
        } ${!!dropdownList?.length ? 'Has Dropdown' : ''}`,
        subtitle,
        icon: MdLink,
      }
    },
  },
}
