export default class PasswordNotMatchError extends Error {
  public status = 400;
  public errorMessage = "Passwords don't match!";
}
