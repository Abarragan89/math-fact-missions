import connectMongo from '../../utils/connectMongo';
import User from '../../models/user';

export default async function handler(req, res) {
  try {
    // run this code to order finalHighscore
    if (req.query.gameType === 'finalHighscore') {
      const data = req.query
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
      await connectMongo();
      const gameLevel = `games.${data.operation}.${data.gameType}.${data.level}`
      const user = await User.find({})
        .select(`${[gameLevel]} displayName -_id`)
        .sort({ [gameLevel]: -1 })
        .limit(10)
      res.json({ user });
    }
  } catch (error) {
    console.log('error', error.code);
    res.send({ successful: false })
  }

}