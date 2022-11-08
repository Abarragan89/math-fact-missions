import connectMongo from '../../utils/connectMongo';
import User from '../../models/user';

export default async function handler(req, res) {
  try {
    const data = req.body
    const updateString = `games.${data.gameType}.finalHighscore`
    await connectMongo();
    const user = await User.findOneAndUpdate(
      { displayName: data.username },
      {[updateString]: data.highscore },
      { new: true }
    );

    res.json({ user });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}