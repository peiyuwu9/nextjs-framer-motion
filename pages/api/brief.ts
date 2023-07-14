// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { addNewBrief } from "@/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const id = await addNewBrief(req.body);
      return res.status(200).json({ id });
    case "DELETE":
    default:
      return;
  }
}
