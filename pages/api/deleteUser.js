// import clientPromise from '../../lib/mongodb'

// export default async function handler(req, res) {
//     try {
//         const name = req.body.username.toLowerCase();
//         const client = await clientPromise;
//         const db = client.db('math-fact-missions');
//         const user = await db
//             .collection('math-fact-missions')
//             .deleteOne(
//                 { name: name }
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
      const user = await User.deleteOne(
        { name: data.username },
      );
      res.json({ user });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}