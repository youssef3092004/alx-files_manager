import redis from 'redis';
import { promisify } from 'util';

/**
 * Class for performing operations with Redis service
 */
class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.setex).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);

    // Handle connection errors
    this.client.on('error', (error) => {
      console.error(`Redis client not connected to the server: ${error.message}`);
    });

    // Handle successful connection
    this.client.on('connect', () => {
      // console.log('Redis client connected to the server');
    });
  }

  /**
   * Checks if connection to Redis is alive
   * @return {boolean} true if connection is alive, false otherwise
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * Gets value corresponding to a key in Redis
   * @param {string} key - Key to search for in Redis
   * @return {Promise<string|null>} Value of the key, or null if not found
   */
  async get(key) {
    try {
      return await this.getAsync(key);
    } catch (error) {
      console.error(`Error getting key "${key}": ${error.message}`);
      return null;
    }
  }

  /**
   * Creates a new key in Redis with a specific TTL
   * @param {string} key - Key to be saved in Redis
   * @param {string} value - Value to be assigned to the key
   * @param {number} duration - TTL (Time to Live) in seconds
   * @return {Promise<void>}
   */
  async set(key, value, duration) {
    try {
      await this.setAsync(key, duration, value);
    } catch (error) {
      console.error(`Error setting key "${key}": ${error.message}`);
    }
  }

  /**
   * Deletes a key in Redis
   * @param {string} key - Key to be deleted
   * @return {Promise<void>}
   */
  async del(key) {
    try {
      await this.delAsync(key);
    } catch (error) {
      console.error(`Error deleting key "${key}": ${error.message}`);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
