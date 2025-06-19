import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

const YELP_API_URL = "https://api.yelp.com/v3/businesses/search";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const apiKey = process.env.YELP_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Yelp API key is not configured." });
  }

  try {
    const response = await axios.get(YELP_API_URL, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      params: req.query,
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
      res.status(error.response?.status || 500).json({
        error: "Failed to fetch from Yelp.",
        details: error.response?.data,
      });
    } else {
      console.error("Generic error:", error);
      res.status(500).json({
        error: "An unexpected server error occurred.",
        details: error.message,
      });
    }
  }
}
