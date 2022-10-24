import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const game = await req.query.gameType
        const db = client.db('math-fact-missions');
        if (game === 'finalHighscore') {
            const gameLevel = `games.${req.query.gameType}`

            const games = await db
                .collection('math-fact-missions')
                .aggregate([
                    { $unwind: '$games' },
                    {
                        $match: {
                            "games.operations": req.query.operation
                        }
                    },
                    { $unwind: `$games.${game}` },
                    { $sort: { [gameLevel]: - 1 } },
                    {
                        $project: {
                            "displayName": 1,
                            [gameLevel]: 1,
                        }
                    }
                ])
                .toArray()
            res.json(games)
        } else {
            const gameLevel = `games.${req.query.gameType}.${req.query.level}`
            const games = await db
                .collection('math-fact-missions')
                .aggregate([
                    { $unwind: '$games' },
                    {
                        $match: {
                            "games.operations": req.query.operation
                        }
                    },
                    { $unwind: `$games.${game}` },
                    { $sort: { [gameLevel]: - 1 } },
                    {
                        $project: {
                            "displayName": 1,
                            [gameLevel]: 1,
                        }
                    }
                ])
                .toArray()
            res.json(games)
        }
    } catch (e) {
        console.log(e);
    }
}