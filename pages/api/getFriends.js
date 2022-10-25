import connectMongo from '../../utils/connectMongo';
import User from '../../models/user';

export default async function handler(req, res) {
  try {
    const data = req.query
    console.log(data)
    await connectMongo();
    const user = await User.findOne(
      { name: data.name },
    );
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}