// import  clientPromise  from '../../lib/mongodb'

// export default async function handler(req, res) {
//     try {
//         const data = req.body
//         const updateString = `games.${data.operation}.finalHighscore`
//         const client = await clientPromise;
//         const db = client.db('math-fact-missions');
//         const user = await db
//             .collection('math-fact-missions')
//             .updateOne(
//                 { displayName: data.username },
//                 { $set: {[updateString]: data.highscore }}

//             )
//         res.json(user)
//     } catch(e) {
//         console.log(e);
//     }
// }

import connectMongo from '../../utils/connectMongo';
import User from '../../models/user';

export default async function handler(req, res) {
  try {
    const data = req.body
    const updateString = `games.${data.operation}.finalHighscore`
    await connectMongo();
    const user = await User.findOneAndUpdate(
      { displayName: data.username },
      { $set: {[updateString]: data.highscore }}
    );

    res.json({ user });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}