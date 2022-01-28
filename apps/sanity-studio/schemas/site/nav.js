import { IoNavigate } from "react-icons/io5";

export default {
  name: "site.nav",
  title: "Navigation",
  type: "document",
  icon: IoNavigate,
  fields: [
    {
      name: "menu",
      title: "Menu",
      type: "array",
      of: [{ type: "menuItem" }],
    },
    {
      name: "footer",
      title: "Footer",
      type: "footer",
    },
  ],
};
