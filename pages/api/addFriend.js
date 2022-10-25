// import clientPromise from '../../lib/mongodb'

// export default async function handler(req, res) {
//     try {
//         const data = req.body
//         if (data.username === data.friendName) {
//             throw new Error("You can't befriend yourself")
//         }
//         const client = await clientPromise;
//         const db = client.db('math-fact-missions');
//         const user = await db
//             .collection('math-fact-missions')
//             .updateOne(
//                 { name: data.username },
//                 { $addToSet: { friends : data.friendName } }
//             )
//         res.json(user)
//     } catch (e) {
//         console.log(e);
//     }
// }

import connectMongo from '../../utils/connectMongo';
import User from '../../models/user';

export default async function handler(req, res) {
  try {
    const data = req.body
    if (data.user._id === data.friendID) {
      throw Error('You can\'t befriend yourself')
    } else {
      console.log(data)
      await connectMongo();
      const user = await User.findOneAndUpdate(
        { _id: data.user._id },
        { $set: {friends: data.friendID }}
      );
      res.json({ user });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}