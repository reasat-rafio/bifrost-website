import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = await axios.post(
      "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8",
      req.body
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}
