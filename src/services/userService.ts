import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from '../data/userRepository';
import { IProductResource } from '../interfaces/IProduct';
import { IUserResource, IUser, IUserLoginResource, IUserUpdateResource } from '../interfaces/IUser';
import { GenerateAuthToken, HashPassword } from '../models/userModel';
import NoUserFoundError from '../utils/noUserFoundError';

export default class UserService {
  /**
   * Creates a new user.
   *
   * @param { IUserResource } userInfo incoming new user info.
   *
   * @returns { IUser } the created user, a copy of the db
   */
  public async CreateUser(userInfo: IUserResource): Promise<IUser> {
    // Create hashed password
    const password = await HashPassword(userInfo.password);

    const user: IUser = {
      id: uuidv4(),
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      streetAddress: userInfo.streetAddress,
      cartItems: [],
      password,
    };

    // Generate the token
    const token = GenerateAuthToken(user.id);

    // Save token on user ref
    user.token = token;

    // Store the user/ try not to use static methods/members because of performance issue of one instance
    new UserRepository().StoreNewUser(user);

    return user;
  }

  /**
   * Login user to system
   *
   * @param { userCredentials } userCredentials incoming user info for login.
   *
   * @returns { boolean }
   */
  public async LoginUser(userCredentials: IUserLoginResource) {
    // Find the desired user
    const user = await new UserRepository().FindByCredentials(userCredentials.email, userCredentials.password);

    if (!user) {
      throw new NoUserFoundError();
    }

    // Generate new token for the user
    user.token = GenerateAuthToken(user.id);

    // Update the user
    new UserRepository().UpdateUserData(user);

    return user;
  }

  /**
   * Logout user
   *
   * @param { string } id incoming user info for login.
   *
   * @returns { boolean }
   */
  public LogoutUser(id: string): boolean {
    return new UserRepository().LogoutUser(id);
  }

  /**
   * Update user data
   * @param info
   * @returns { boolean }
   */
  public UpdateUser(info: IUserUpdateResource): boolean {
    // Create new instance of repository
    const repo = new UserRepository();
    const user = repo.GetUser(info.extractedId);

    // Update pre defined properties ( Could be dynamic )
    user.firstName = info.firstName;
    user.lastName = info.lastName;
    user.streetAddress = info.streetAddress;

    return repo.UpdateUserData(user);
  }

  /**
   * Delete a user by id
   * @param id
   * @returns { boolean }
   */
  public DeleteUser(id: string): boolean {
    // Create new instance of repository
    return new UserRepository().DeleteUser(id);
  }

  /**
   * Add the incoming items to the user cart
   * @param items
   * @param id
   */
  public AddItemsToCart(items: IProductResource[], id: string): void {
    // Create new instance of the repository
    const repo = new UserRepository();

    // Get user by id
    const user = repo.GetUser(id);

    // Push new cart items to the user array, NOTE IN REAL LIFE GOES TO DB
    user.cartItems!.push(...items);

    // Update the user info
    repo.UpdateUserData(user);
  }
}
