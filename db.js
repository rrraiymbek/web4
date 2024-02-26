const { MongoClient } = require("mongodb");

const uri =
"mongodb+srv://mmm:LbxRXGEb1wVQnrYw@cluster09870.wg9pfdf.mongodb.net/?retryWrites=true&w=majority";
async function connectToMongoDB() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas", error);
    throw error;
  }
}

module.exports = { connectToMongoDB };
