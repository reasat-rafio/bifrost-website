import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const formData = new FormData();

    // Convert each key-value pair in the req.body object to a part in the FormData object
    Object.keys(req.body).forEach((key) => {
      formData.append(key, req.body[key]);
    });

    const response = await axios.post(
      "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(response.data);
    console.log({ response });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}
