// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { addNewForm, deleteForm } from "@/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const id = await addNewForm(req.body);
      return res.status(200).json({ id });
    case "DELETE":
      await deleteForm(req.body);
      return res.status(200).send("delete success");
    default:
      return;
  }
}
