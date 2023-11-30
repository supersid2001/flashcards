import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcrypt';

//Check if username exists in DB 
// Throw error if it does 
// Otherwise call create_client and create new user with returned client id
// If any error/exception, throw error (try again lol)
// Otherwise send back 200 response 

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
    if (user) {
      res.status(401).json({ message: 'Username already exists' });
    }
    else{
      const passwordhash = await bcrypt.hash(password, 10)
      await fetch("http://localhost:18080/create_client/", {
        method: 'POST'
      }).then(async (result) => {
          await result.json().then(async (resJSON) => {
          console.log(resJSON)
          var id = resJSON.message
          const newUser = {
            username,
            password: passwordhash,
            client_id: id
          };
          const result = await collection.insertOne(newUser);
          res.status(201).json({ message: 'User registered successfully'});
        })
      })
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}