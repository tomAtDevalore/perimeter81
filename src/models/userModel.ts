import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

/**
 * This Function will hash the incoming password
 *
 * @param password Password to be hashed
 *
 * @returns {string} The hashed password
 */
const HashPassword = async (password: string): Promise<string> => await hash(password, 8);

/**
 * This Function will generate a new user token
 *
 * @param {string} userId Password to be hashed
 *
 * @returns {string} The hashed password
 */
const GenerateAuthToken = (userId: string): string => {
  // The uniq should be _id if we had a DB
  const token = sign({ _id: userId.toString() }, process.env.jWT_SECRET ?? '', { expiresIn: 50000 });

  return token;
};

export { HashPassword, GenerateAuthToken };
