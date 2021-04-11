import axios from 'axios';

export default async (req, res) => {
  const {
    query: { proxyRoute }
  } = req;

  const result = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/${proxyRoute}`,
    req.body
  );
  res.json(result.data);
};
