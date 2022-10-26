import connectMongo from '../../utils/connectMongo';
import User from '../../models/user';

export default async function handler(req, res) {
    try {
        const data = req.query
        const regex = new RegExp(data.name, 'i')
        await connectMongo();
        const user = await User.find(
            { name: { $regex: regex } },
        )
        .select('displayName')
        .limit(8)
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}