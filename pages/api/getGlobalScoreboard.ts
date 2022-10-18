import  clientPromise  from '../../lib/mongodb'

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db('math-fact-missions');
        const games = await db
            .collection('math-fact-missions')
            .aggregate([

                { $unwind: '$games'},

                { $match: {
                    "games.operations": "multiplication" 
                }},

                { $unwind: '$games.game1Highscore'},

                { $sort: { 'games.game1Highscore.0': - 1} },  

                { $project: {
                    "displayName": 1,
                    'games.game1Highscore':  1,
                }}
            ])
            .toArray()
        console.log(games)
        res.json(games)
    } catch(e) {
        console.log(e);
    }
}