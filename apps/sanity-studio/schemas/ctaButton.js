export default {
  name: "ctaButton",
  title: "CTA Button",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "hide",
      title: "Hide",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "href",
      title: "href",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};
