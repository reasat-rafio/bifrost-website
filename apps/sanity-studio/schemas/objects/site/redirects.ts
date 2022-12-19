import { RiArrowGoForwardFill } from 'react-icons/ri'
import { Rule } from 'sanity'

export default {
  name: 'site.redirects',
  title: 'Redirect',
  type: 'document',
  icon: RiArrowGoForwardFill,
  fields: [
    {
      title: 'From',
      name: 'fromPath',
      type: 'url',
      validation: (Rule: Rule) =>
        Rule.uri({
          allowRelative: true,
          relativeOnly: true,
        }),
    },
    {
      title: 'To',
      name: 'toPath',
      type: 'url',
      validation: (Rule: Rule) =>
        Rule.uri({
          allowRelative: true,
          relativeOnly: true,
        }),
    },
  ],
}
