import  clientPromise  from '../../lib/mongodb'

export default async function handler(req, res) {
    try {
        const name = req.body
        const client = await clientPromise;
        const db = client.db('math-fact-missions');
        
        const addNewUser = await db
            .collection('math-fact-missions')
            .insertOne({
                displayName: name,
                name: name.toLowerCase(),
                games:
                            [{
                                operations: 'multiplication',
                                level: 1,
                                highscore: 0,
                                finalHighscore: 0,
                                game1Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                game2Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                game3Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                            },
                            {
                                operations: 'division',
                                level: 1,
                                highscore: 0,
                                finalHighscore: 0,
                                game1Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                game2Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                game3Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                            },
                            {
                                operations: 'addition',
                                level: 1,
                                highscore: 0,
                                finalHighscore: 0,
                                game1Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                game2Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                game3Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                            },
                            {
                                operations: 'subtraction',
                                level: 1,
                                highscore: 0,
                                finalHighscore: 0,
                                game1Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                game2Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                game3Highscore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                            }],
                            friends: [[]]
            })
            console.log(addNewUser)
    } catch(e) {
        console.log(e);
    }
}