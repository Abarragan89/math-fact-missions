// import clientPromise from '../../lib/mongodb'

// export default async function handler(req, res) {
//     try {
//         const data = req.body
//         const client = await clientPromise;
//         const db = client.db('math-fact-missions');
//         const user = await db
//             .collection('math-fact-missions')
//             .updateOne(
//                 { name: data.username },
//                 { $pull: {friends: data.friendName}}
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
      await connectMongo();
      const user = await User.findOneAndUpdate(
        { name: data.username },
        { $pull: {friends: data.friendID }}
      );
      res.json({ user });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}