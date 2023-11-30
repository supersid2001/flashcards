import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcrypt';

//First query for username 
//If username not found throw 404
// Otherwise check if passwords match 
// If not match throw 401 error
// If match set client id to client id retrieved from db 
// return 200

export default async function handler(req, res) {
  try {
    const { username, password} = req.query;
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password' });
    }
    const client = await clientPromise;
    const db = client.db();

    const collection = db.collection('users');
    const user = await collection.findOne({ username: username });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    else{
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(401).json({ message: 'Invalid password' });
      } else {
        res.status(200).json(user);
      }
    }
  } catch (error) {
    console.error('Error validating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}