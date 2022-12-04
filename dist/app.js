"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var cors_1 = __importDefault(require("cors"));
var error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
var data_source_1 = __importDefault(require("./data-source"));
var App = /** @class */ (function () {
    function App(controllers) {
        this.app = (0, express_1.default)();
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
        this.home();
    }
    App.prototype.initializeMiddlewares = function () {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    };
    App.prototype.initializeErrorHandling = function () {
        this.app.use(error_middleware_1.default);
    };
    App.prototype.connectToTheDatabase = function () {
        data_source_1.default.initialize().then(function () {
            return console.log("\n/////////////////////////////////////////////        \nDatabase connection successfull!\n////////////////////////////////////////////\n      ");
        });
    };
    App.prototype.initializeControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.app.use("/", controller.router);
        });
    };
    App.prototype.home = function () {
        this.app.get("/", function (req, res) {
            res.status(200).send("Welcome to weblog!");
        });
    };
    App.prototype.getServer = function () {
        return this.app;
    };
    App.prototype.listen = function () {
        this.app.listen(process.env.PORT, function () {
            console.log("\n///////////////////////////////////////\nApp listening on port ".concat(process.env.PORT, "\n//////////////////////////////////////\n      "));
        });
    };
    return App;
}());
exports.default = App;
//# sourceMappingURL=app.js.map