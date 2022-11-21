import HttpExceptions from "./HttpExceptions";

export default class ThereIsAlreadyAUserWithThatEmail extends HttpExceptions {
  constructor(email: string) {
    super(400, `A user with the email ${email} already exists.`);
  }
}
