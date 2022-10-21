import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
    try {
        const name = req.body
        const client = await clientPromise;
        const db = client.db('math-fact-missions');
        const nameTaken = db.collection('math-fact-missions').find({ name: name.toLowerCase() }).toArray()
        const data = await nameTaken
        // check if name if available. 
        if (data.length > 0) {
            console.log('name is taken')
            res.send({ successful: false })
        } else {
            // if so, add it to the database
            const newUser = await db
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
                            game1Highscore: {
                                0: 0,
                                1: 0,
                                2: 0,
                                3: 0,
                                4: 0,
                                5: 0,
                                6: 0,
                                7: 0,
                                8: 0,
                                9: 0,
                                10: 0,
                                11: 0,
                                12: 0
                            },
                            game2Highscore: {
                                0: 0,
                                1: 0,
                                2: 0,
                                3: 0,
                                4: 0,
                                5: 0,
                                6: 0,
                                7: 0,
                                8: 0,
                                9: 0,
                                10: 0,
                                11: 0,
                                12: 0
                            },
                            game3Highscore: {
                                0: 0,
                                1: 0,
                                2: 0,
                                3: 0,
                                4: 0,
                                5: 0,
                                6: 0,
                                7: 0,
                                8: 0,
                                9: 0,
                                10: 0,
                                11: 0,
                                12: 0
                            },

                        },
                        {
                            operations: 'division',
                            level: 1,
                            highscore: 0,
                            finalHighscore: 0,
                            game1Highscore: {
                                0: 0,
                                1: 0,
                                2: 0,
                                3: 0,
                                4: 0,
                                5: 0,
                                6: 0,
                                7: 0,
                                8: 0,
                                9: 0,
                                10: 0,
                                11: 0,
                                12: 0
                            },
                            game2Highscore: {
                                0: 0,
                                1: 0,
                                2: 0,
                                3: 0,
                                4: 0,
                                5: 0,
                                6: 0,
                                7: 0,
                                8: 0,
                                9: 0,
                                10: 0,
                                11: 0,
                                12: 0
                            },
                            game3Highscore: {
                                0: 0,
                                1: 0,
                                2: 0,
                                3: 0,
                                4: 0,
                                5: 0,
                                6: 0,
                                7: 0,
                                8: 0,
                                9: 0,
                                10: 0,
                                11: 0,
                                12: 0
                            },

                        },
                        {
                            operations: 'addition',
                            level: 1,
                            highscore: 0,
                            finalHighscore: 0,
                            game1Highscore: {
                                0: 0,
                                1: 0,
                                2: 0,
                                3: 0,
                                4: 0,
                                5: 0,
                                6: 0,
                                7: 0,
                                8: 0,
                                9: 0,
                                10: 0,
                                11: 0,
                                12: 0
                            },
                            game2Highscore: {
                                0: 0,
                                1: 0,
                                2: 0,
                                3: 0,
                                4: 0,
                                5: 0,
                                6: 0,
                                7: 0,
                                8: 0,
                                9: 0,
                                10: 0,
                                11: 0,
                                12: 0
                            },
                            game3Highscore: {
                                0: 0,
                                1: 0,
                                2: 0,
                                3: 0,
                                4: 0,
                                5: 0,
                                6: 0,
                                7: 0,
                                8: 0,
                                9: 0,
                                10: 0,
                                11: 0,
                                12: 0
                            },

                        },
                        {
                            operations: 'subtraction',
                            level: 1,
                            highscore: 0,
                            finalHighscore: 0,
                            game1Highscore: {
                                0: 0,
                                1: 0,
                                2: 0,
                                3: 0,
                                4: 0,
                                5: 0,
                                6: 0,
                                7: 0,
                                8: 0,
                                9: 0,
                                10: 0,
                                11: 0,
                                12: 0
                            },
                            game2Highscore: {
                                0: 0,
                                1: 0,
                                2: 0,
                                3: 0,
                                4: 0,
                                5: 0,
                                6: 0,
                                7: 0,
                                8: 0,
                                9: 0,
                                10: 0,
                                11: 0,
                                12: 0
                            },
                            game3Highscore: {
                                0: 0,
                                1: 0,
                                2: 0,
                                3: 0,
                                4: 0,
                                5: 0,
                                6: 0,
                                7: 0,
                                8: 0,
                                9: 0,
                                10: 0,
                                11: 0,
                                12: 0
                            },

                        }],

                    friends: []
                })
            // res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
            // res.header("Access-Control-Allow-Origin", "*");
            // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            // res.header("Access-Control-Allow-Credentials", true);
            res.json(newUser)
        }
    } catch (e) {
        console.log(e);
    }
}