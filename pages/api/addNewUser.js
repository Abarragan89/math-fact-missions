import connectMongo from '../../utils/connectMongo';
import Student from '../../models/Student';

export default async function handler(req, res) {
  try {
    await connectMongo();
    const user = await Student.create({
      name: req.body.name,
      displayName: req.body.name
    });

    res.json({ user });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}