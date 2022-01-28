export default {
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "ogImage",
      title: "Image",
      type: "image",
      options: {
        accept: "image/png, image/jpeg, image/webp",
      },
    },
  ],
};
