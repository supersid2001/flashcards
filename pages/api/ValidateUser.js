import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Fetch all entries from the collection
    const collection = db.collection('translations');
    const entries = await collection.find({}).toArray();

    // Close the MongoDB connection
    client.close();

    // Return the entries as JSON
    res.status(200).json(entries);
  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}