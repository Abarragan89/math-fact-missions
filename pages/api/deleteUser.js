import connectMongo from '../../utils/connectMongo';
import User from '../../models/user';

export default async function handler(req, res) {
  try {
    const data = req.body
      await connectMongo();
      const user = await User.deleteOne(
        { name: data.username },
      );
      res.json({ user });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}