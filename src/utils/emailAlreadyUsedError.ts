export default class EmailAlreadyUsedError extends Error {
  public status = 400;
  public errorMessage = 'Email is taken! use another address';
}
