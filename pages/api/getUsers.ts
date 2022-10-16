import  clientPromise  from '../../lib/mongodb'

export default async function handler(req, res) {
    try {

        const client = await clientPromise;
        const db = client.db('math-fact-missions');
        
        const usersList = await db
            .collection('math-fact-missions')
            .find({})
            .toArray()
        res.json(usersList)
    } catch(e) {
        console.log(e);
    }
}