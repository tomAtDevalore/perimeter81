export default class InvalidTokenError extends Error {
  public status = 401;
  public errorMessage = 'Invalid Token!';
}
