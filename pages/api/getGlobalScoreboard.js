// import clientPromise from '../../lib/mongodb'

// export default async function handler(req, res) {
//     try {
//         const client = await clientPromise;
//         const game = await req.query.gameType
//         const db = client.db('math-fact-missions');
//         if (game === 'finalHighscore') {
//             const gameLevel = `games.${req.query.gameType}`

//             const games = await db
//                 .collection('users')
//                 .aggregate([
//                     { $unwind: '$games' },
//                     {
//                         $match: {
//                             "games.operations": req.query.operation
//                         }
//                     },
//                     { $unwind: `$games.${game}` },
//                     { $sort: { [gameLevel]: - 1 } },
//                     {
//                         $project: {
//                             "displayName": 1,
//                             [gameLevel]: 1,
//                         }
//                     }
//                 ])
//                 .toArray()
//             res.json(games)
//         } else {
//             const gameLevel = `games.${req.query.gameType}.${req.query.level}`
//             const games = await db
//                 .collection('users')
//                 .aggregate([
//                     { $unwind: '$games' },
//                     {
//                         $match: {
//                             "games.operations": req.query.operation
//                         }
//                     },
//                     { $unwind: `$games.${game}` },
//                     { $sort: { [gameLevel]: - 1 } },
//                     {
//                         $project: {
//                             "displayName": 1,
//                             [gameLevel]: 1,
//                         }
//                     }
//                 ])
//                 .limit(10)
//                 .toArray()
//             console.log(games)
//             res.json(games)
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }


import connectMongo from '../../utils/connectMongo';
import User from '../../models/user';

export default async function handler(req, res) {
  try {
    // run this code to order finalHighscore
    if (req.query.gameType === 'finalHighscore') {
      const data = req.query
      console.log(data)
      await connectMongo();
      const gameLevel = `games.${data.operation}.${data.gameType}`
      const user = await User.find({})
        .select(`${[gameLevel]} displayName -_id`)
        .sort({ [gameLevel]: -1 })
        .limit(10)
      console.log('user', user)
      res.json({ user });

    // run this to order any of the game highscores
    } else {
      const data = req.query
      console.log(data)
      await connectMongo();
      const gameLevel = `games.${req.query.operation}.${req.query.gameType}.${req.query.level}`
      const user = await User.find({})
        .select(`${[gameLevel]} displayName -_id`)
        .sort({ [gameLevel]: -1 })
        .limit(10)
      console.log('user', user)
      res.json({ user });
    }
  } catch (error) {
    console.log('error', error.code);
    res.send({ successful: false })
  }

}