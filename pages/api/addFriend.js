import connectMongo from '../../utils/connectMongo';
import User from '../../models/user';

export default async function handler(req, res) {
  try {
    const data = req.body
    if (data.user._id === data.friendID) {
      throw Error('You can\'t befriend yourself')
    } else {
      await connectMongo();
      const user = await User.findOneAndUpdate(
        { _id: data.user._id },
        { $addToSet: {friends: {$each: [data.friendID, data.user._id]} }}
      );
      res.json({ user });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}