import  clientPromise  from '../../lib/mongodb'

export default async function handler(req, res) {
    try {
        const data = req.body
        const updateString = `games.${data.operation}.${data.game}.${data.level}`
        const client = await clientPromise;
        const db = client.db('math-fact-missions');
        const user = await db
            .collection('math-fact-missions')
            .updateOne(
                { displayName: data.username },
                { $set: {[updateString]: data.highscore }}

            )
        res.json(user)
    } catch(e) {
        console.log(e);
    }
}