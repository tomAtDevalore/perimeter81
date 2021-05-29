import { compare } from 'bcrypt';
import { IUser } from '../interfaces/IUser';
import EmailAlreadyUsedError from '../utils/emailAlreadyUsedError';
import NoUserFoundError from '../utils/noUserFoundError';
import PasswordNotMatchError from '../utils/passwordNotMactError';

export class UserRepository {
  // SHOULD be in DB
  private static usersCollection: Map<string, IUser> = new Map();

  /**
   * Stores the new user - should be inserted to a db.
   *
   * @param { IUser } user incoming new user info.
   *
   * @returns { IUser }
   */
  public StoreNewUser(user: IUser): IUser {
    if (UserRepository.usersCollection.get(user.email)) {
      throw new EmailAlreadyUsedError();
    }
    UserRepository.usersCollection.set(user.email, user);

    return user;
  }

  /**
   * Updates the user data
   *
   * @param { IUser } user incoming new user info.
   *
   * @returns { boolean } operation success/failure
   */
  public UpdateUserData(user: IUser): boolean {
    if (!UserRepository.usersCollection.get(user.email)) {
      throw new NoUserFoundError();
    }

    UserRepository.usersCollection.set(user.email, user);

    return true;
  }

  /**
   * Get user by id
   * @param userId
   * @returns
   */
  public GetUser(userId: string): IUser {
    let user;
    // In real life we should get it from DB
    UserRepository.usersCollection.forEach((element) => {
      if (element.id === userId) {
        user = element;
      }
    });

    if (!user) {
      throw new NoUserFoundError();
    }

    return user;
  }

  /**
   * Finds the user by email and password
   *
   * @param { string } email incoming new user email.
   * @param { string } password incoming new user password.
   *
   * @returns { IUser }
   */
  public FindByCredentials = async (email: string, password: string): Promise<IUser | undefined> => {
    // This Should be a DB query, Email is UNIQ
    const user = UserRepository.usersCollection.get(email);

    // No user in DB
    if (!user) {
      throw new NoUserFoundError();
    }

    const isMatch = await compare(password, user.password);

    // Password don't match
    if (!isMatch) {
      throw new PasswordNotMatchError();
    }

    return user;
  };

  /**
   * Will delete the user token
   *
   * @param id
   * @returns {boolean}
   */
  public LogoutUser = (id: string): boolean => {
    // This Should be a DB query
    UserRepository.usersCollection.forEach((val) => {
      if (val.id === id) {
        val.token = undefined;
      }
    });

    return true;
  };

  /**
   * Delete user by id
   * @param id
   * @returns { boolean }
   */
  public DeleteUser = (id: string): boolean => {
    let found = false;
    // This Should be a DB query
    UserRepository.usersCollection.forEach((val) => {
      if (val.id === id) {
        found = true;
        UserRepository.usersCollection.delete(val.email);
      }
    });

    return found;
  };
}
