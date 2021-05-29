export default class NoUserFoundError extends Error {
  public status = 400;
  public errorMessage = 'No user found!';
}
