import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
    try {
        const data = req.body
        console.log(data.name)
        const client = await clientPromise;
        const db = client.db('math-fact-missions');
        const user = await db
            .collection('math-fact-missions')
            .deleteOne(
                { name: data.name }
            )
        console.log('user', user)
        res.json(user)
    } catch (e) {
        console.log(e);
    }
}