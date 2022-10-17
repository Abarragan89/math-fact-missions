import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
    try {
        const data = req.body
        console.log(data)
        const client = await clientPromise;
        const db = client.db('math-fact-missions');
        const user = await db
            .collection('math-fact-missions')
            .updateOne(
                { name: data.username },
                { $addToSet: { friends : data.friendName } }
            )
        res.json(user)
    } catch (e) {
        console.log(e);
    }
}