import { AiOutlineHome } from "react-icons/ai";
import editor from "../../editor";

export default {
  name: "home",
  title: "Home",
  type: "object",
  icon: AiOutlineHome,
  fields: [
    {
      name: "headline",
      title: "Headline",
      type: "string",
    },
    {
      name: "body",
      title: "body",
      type: "array",
      of: [editor],
    },
    {
      name: "ctaButton",
      title: "CTA Button",
      type: "ctaButton",
    },
    // {
    //   name: "hero",
    //   type: "hero",
    //   title: "Hero",
    // },
  ],
  preview: {
    select: {
      title: "headline",
      subtitle: "body",
      // media: "hero.image",
    },
  },
};
