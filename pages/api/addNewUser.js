import connectMongo from '../../utils/connectMongo';
import User from '../../models/user';

export default async function handler(req, res) {
  try {
    await connectMongo();
    const user = await User.create({
      name: req.body.name,
      displayName: req.body.name
    });

    res.json({ user });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}