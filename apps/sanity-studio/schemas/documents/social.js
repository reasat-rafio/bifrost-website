import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoShareSocial,
} from "react-icons/io5";

export default {
  name: "social",
  title: "Social",
  type: "document",
  icon: IoShareSocial,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: ["facebook", "linkedin", "instagram"],
      },
    },
    {
      name: "url",
      title: "URL",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "url",
      type: "type",
    },
    prepare({ title, subtitle, type }) {
      return {
        title,
        subtitle,
        media:
          type === "facebook"
            ? IoLogoFacebook
            : type === "linkedin"
            ? IoLogoLinkedin
            : type === "instagram"
            ? IoLogoInstagram
            : IoShareSocial,
      };
    },
  },
};
