import HttpExceptions from "./HttpExceptions";

export default class PostNotFoundException extends HttpExceptions {
  constructor(id: number) {
    super(400, `Cannot find Post with id ${id}.`);
  }
}
