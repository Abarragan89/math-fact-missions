import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
    try {
        const data = req.body
        const client = await clientPromise;
        const db = client.db('math-fact-missions');
        const user = await db
            .collection('math-fact-missions')
            .deleteOne(
                { name: data.name }
            )
        res.json(user)
    } catch (e) {
        console.log(e);
    }
}