// import clientPromise from '../../lib/mongodb'

// export default async function handler(req, res) {
//     try {
//         let name = await req.body.name
//         const client = await clientPromise;
//         const db = client.db('math-fact-missions');
//         const nameTaken = db.collection('math-fact-missions').find({ name: name.toLowerCase() }).toArray()
//         const data = await nameTaken
//         // check if name if available. 
//         if (data.length > 0) {
//             res.send({ successful: false })
//         } else {
//             // if so, add it to the database
//             const newUser = await db
//                 .collection('math-fact-missions')
//                 .insertOne({
//                     displayName: name,
//                     name: name.toLowerCase(),
//                     games:
//                         [{
//                             operations: 'multiplication',
//                             level: 1,
//                             highscore: 0,
//                             finalHighscore: 0,
//                             game1Highscore: {
//                                 0: 0,
//                                 1: 0,
//                                 2: 0,
//                                 3: 0,
//                                 4: 0,
//                                 5: 0,
//                                 6: 0,
//                                 7: 0,
//                                 8: 0,
//                                 9: 0,
//                                 10: 0,
//                                 11: 0,
//                                 12: 0
//                             },
//                             game2Highscore: {
//                                 0: 0,
//                                 1: 0,
//                                 2: 0,
//                                 3: 0,
//                                 4: 0,
//                                 5: 0,
//                                 6: 0,
//                                 7: 0,
//                                 8: 0,
//                                 9: 0,
//                                 10: 0,
//                                 11: 0,
//                                 12: 0
//                             },
//                             game3Highscore: {
//                                 0: 0,
//                                 1: 0,
//                                 2: 0,
//                                 3: 0,
//                                 4: 0,
//                                 5: 0,
//                                 6: 0,
//                                 7: 0,
//                                 8: 0,
//                                 9: 0,
//                                 10: 0,
//                                 11: 0,
//                                 12: 0
//                             },

//                         },
//                         {
//                             operations: 'division',
//                             level: 1,
//                             highscore: 0,
//                             finalHighscore: 0,
//                             game1Highscore: {
//                                 0: 0,
//                                 1: 0,
//                                 2: 0,
//                                 3: 0,
//                                 4: 0,
//                                 5: 0,
//                                 6: 0,
//                                 7: 0,
//                                 8: 0,
//                                 9: 0,
//                                 10: 0,
//                                 11: 0,
//                                 12: 0
//                             },
//                             game2Highscore: {
//                                 0: 0,
//                                 1: 0,
//                                 2: 0,
//                                 3: 0,
//                                 4: 0,
//                                 5: 0,
//                                 6: 0,
//                                 7: 0,
//                                 8: 0,
//                                 9: 0,
//                                 10: 0,
//                                 11: 0,
//                                 12: 0
//                             },
//                             game3Highscore: {
//                                 0: 0,
//                                 1: 0,
//                                 2: 0,
//                                 3: 0,
//                                 4: 0,
//                                 5: 0,
//                                 6: 0,
//                                 7: 0,
//                                 8: 0,
//                                 9: 0,
//                                 10: 0,
//                                 11: 0,
//                                 12: 0
//                             },

//                         },
//                         {
//                             operations: 'addition',
//                             level: 1,
//                             highscore: 0,
//                             finalHighscore: 0,
//                             game1Highscore: {
//                                 0: 0,
//                                 1: 0,
//                                 2: 0,
//                                 3: 0,
//                                 4: 0,
//                                 5: 0,
//                                 6: 0,
//                                 7: 0,
//                                 8: 0,
//                                 9: 0,
//                                 10: 0,
//                                 11: 0,
//                                 12: 0
//                             },
//                             game2Highscore: {
//                                 0: 0,
//                                 1: 0,
//                                 2: 0,
//                                 3: 0,
//                                 4: 0,
//                                 5: 0,
//                                 6: 0,
//                                 7: 0,
//                                 8: 0,
//                                 9: 0,
//                                 10: 0,
//                                 11: 0,
//                                 12: 0
//                             },
//                             game3Highscore: {
//                                 0: 0,
//                                 1: 0,
//                                 2: 0,
//                                 3: 0,
//                                 4: 0,
//                                 5: 0,
//                                 6: 0,
//                                 7: 0,
//                                 8: 0,
//                                 9: 0,
//                                 10: 0,
//                                 11: 0,
//                                 12: 0
//                             },

//                         },
//                         {
//                             operations: 'subtraction',
//                             level: 1,
//                             highscore: 0,
//                             finalHighscore: 0,
//                             game1Highscore: {
//                                 0: 0,
//                                 1: 0,
//                                 2: 0,
//                                 3: 0,
//                                 4: 0,
//                                 5: 0,
//                                 6: 0,
//                                 7: 0,
//                                 8: 0,
//                                 9: 0,
//                                 10: 0,
//                                 11: 0,
//                                 12: 0
//                             },
//                             game2Highscore: {
//                                 0: 0,
//                                 1: 0,
//                                 2: 0,
//                                 3: 0,
//                                 4: 0,
//                                 5: 0,
//                                 6: 0,
//                                 7: 0,
//                                 8: 0,
//                                 9: 0,
//                                 10: 0,
//                                 11: 0,
//                                 12: 0
//                             },
//                             game3Highscore: {
//                                 0: 0,
//                                 1: 0,
//                                 2: 0,
//                                 3: 0,
//                                 4: 0,
//                                 5: 0,
//                                 6: 0,
//                                 7: 0,
//                                 8: 0,
//                                 9: 0,
//                                 10: 0,
//                                 11: 0,
//                                 12: 0
//                             },

//                         }],

//                     friends: []
//                 })
//             res.json(newUser)
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }

import connectMongo from '../../utils/connectMongo';
import User from '../../models/user';

export default async function addTest(req, res) {
  try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('CREATING DOCUMENT');
    const user = await User.create({
      name: req.body.name,
      displayName: req.body.name
    });
    console.log('CREATED DOCUMENT');

    res.json({ user });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}