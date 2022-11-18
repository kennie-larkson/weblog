import AuthenticationService from "./../authentication/authentication.service";
import { Router } from "express";

interface IController {
  path?: string;
  router?: Router;
  middleware?: Function;
  //authService?: AuthenticationService;
}

export default IController;
