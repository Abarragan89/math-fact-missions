// import  clientPromise  from '../../lib/mongodb'

// export default async function handler(req, res) {
//     try {
//         const data = req.query
//         const client = await clientPromise;
//         const db = client.db('math-fact-missions');
//         const user = await db
//             .collection('math-fact-missions')
//             .findOne({name: data.name})
//         res.json(user)
//     } catch(e) {
//         console.log(e);
//     }
// }

import connectMongo from '../../utils/connectMongo';
import User from '../../models/user';

export default async function handler(req, res) {
  try {
    const data = req.query
    await connectMongo();
    const user = await User.findOne(
      { name: data.name },
    )
    .populate('friends', 'name')
    ;
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}