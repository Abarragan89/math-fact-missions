import connectMongo from '../../utils/connectMongo';
import User from '../../models/user';

export default async function handler(req, res) {
  try {
    const data = req.body
    const updateString = `games.${data.gameType}.level`
    await connectMongo();
    const user = await User.findOneAndUpdate(
      { displayName: data.username },
      { $set: {[updateString]: data.gameLevel}},
      { new: true }
    );
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}