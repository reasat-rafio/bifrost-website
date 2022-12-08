import { RiArrowGoForwardFill } from "react-icons/ri";

export default {
  name: "site.redirects",
  title: "Redirect",
  type: "document",
  icon: RiArrowGoForwardFill,
  fields: [
    {
      title: "From",
      name: "fromPath",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          relativeOnly: true,
        }),
    },
    {
      title: "To",
      name: "toPath",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          relativeOnly: true,
        }),
    },
  ],
};
