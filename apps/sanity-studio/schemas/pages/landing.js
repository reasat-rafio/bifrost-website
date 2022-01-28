export default {
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  fields: [
    {
      name: "seo",
      title: "SEO",
      type: "seo",
    },
    {
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { type: "home" },
        // { type: "pitch" },
        // { type: "cta" },
        // { type: "vco" },
        // { type: "contactSection" },
      ],
    },
  ],
  preview: {
    select: {
      title: "seo.title",
      subtitle: "seo.description",
    },
  },
};
