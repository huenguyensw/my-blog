// pages/api/favorites/toggle.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/mongoDB';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') return res.status(405).end();

  const { userId, blogId } = req.body;
  await connectDB();

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   // Toggle favorite
    const index = user.favorites.indexOf(blogId);
    if (index > -1) {
      user.favorites.splice(index, 1); // remove
    } else {
      user.favorites.push(blogId); // add
    }


    await user.save(); // Save changes

    

    res.status(200).json({ favorites:  user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Error toggling favorite', error });
  }

}
