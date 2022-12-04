"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var data_source_1 = __importDefault(require("./../data-source"));
var user_entity_1 = __importDefault(require("./../entity/users/user.entity"));
var DuplicateEmailRegistrationException_1 = __importDefault(require("../exceptions/DuplicateEmailRegistrationException"));
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService() {
    }
    AuthenticationService.prototype.register = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword, user, tokenData, cookie;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.default.manager
                            .getRepository(user_entity_1.default)
                            .findOneBy({ email: userData.email })];
                    case 1:
                        if (_a.sent()) {
                            throw new DuplicateEmailRegistrationException_1.default(userData.email);
                            // throw new Error(
                            //   "Sorry there is a user with that email already. Please, try another."
                            // );
                        }
                        return [4 /*yield*/, bcrypt_1.default.hash(userData.password, 10)];
                    case 2:
                        hashedPassword = _a.sent();
                        user = data_source_1.default.manager.getRepository(user_entity_1.default).create(__assign(__assign({}, userData), { password: hashedPassword }));
                        return [4 /*yield*/, data_source_1.default.manager.getRepository(user_entity_1.default).save(user)];
                    case 3:
                        _a.sent();
                        delete user.password;
                        tokenData = this.createToken(user);
                        cookie = this.createCookie(tokenData);
                        return [2 /*return*/, { user: user, cookie: cookie }];
                }
            });
        });
    };
    AuthenticationService.prototype.createToken = function (user) {
        var expiresIn = 60 * 60; // an hour
        var secret = process.env.JWT_SECRET;
        var dataStoredInToken = { id: user.id };
        return {
            expiresIn: expiresIn,
            token: jsonwebtoken_1.default.sign(dataStoredInToken, secret, { expiresIn: expiresIn }),
        };
    };
    AuthenticationService.prototype.createCookie = function (tokenData) {
        return "Authorization=".concat(tokenData.token, "; HttpOnly; Max-Age=").concat(tokenData.expiresIn);
    };
    return AuthenticationService;
}());
exports.default = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map