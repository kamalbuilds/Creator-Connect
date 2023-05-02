import axios from 'axios';

import type { NextApiRequest, NextApiResponse } from 'next';

console.log(process.env.API_KEY,'d');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios.post(
      'https://iriko.testing.huddle01.com/api/v1/create-room',
      {
        title: 'Huddle01-Test',
        roomLock: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );

    res.status(200).json(data);
    console.log(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;
