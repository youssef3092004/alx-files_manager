/**
 * Class for interacting with MongoDB for files and users data
 */
class DBClient {
  /**
   * Initializes the connection to MongoDB using provided host, port, and database details.
   * It connects to the database and sets up the collections for users and files.
   */
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true });

    // Connect to MongoDB and set up the collections
    this.client
      .connect()
      .then(() => {
        this.db = this.client.db(DB_DATABASE);
        this.userCollection = this.db.collection("user");
        this.fileCollection = this.db.collection("files");
      })
      .catch((error) => {
        console.log(`Error connecting to MongoDB: ${error.message}`);
      });
  }

  /**
   * Checks if the MongoDB connection is alive.
   * @return {boolean} true if the connection to MongoDB is successful, false otherwise
   */
  isAlive() {
    if (this.db) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Asynchronously retrieves the number of documents in the "user" collection.
   * @return {number} the number of users in the database
   */
  async nbUsers() {
    const numberOfUsers = await this.userCollection.countDocuments(); // Returns the number of documents in the user collection
    return numberOfUsers;
  }

  /**
   * Asynchronously retrieves the number of documents in the "files" collection.
   * @return {number} the number of files in the database
   */
  async nbFiles() {
    const numberOfFiles = await this.fileCollection.countDocuments(); // Returns the number of documents in the files collection
    return numberOfFiles;
  }
}
