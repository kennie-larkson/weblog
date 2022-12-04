"use strict";
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
var express_1 = __importDefault(require("express"));
var validation_middleware_1 = require("./../../middleware/validation.middleware");
var PostNotFoundException_1 = __importDefault(require("./../../exceptions/PostNotFoundException"));
var data_source_1 = __importDefault(require("./../../data-source"));
var post_entity_1 = __importDefault(require("./post.entity"));
var PostController = /** @class */ (function () {
    function PostController() {
        this.path = "/posts";
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    PostController.prototype.initializeRoutes = function () {
        this.router.get(this.path, this.getAllPosts);
        this.router.get("".concat(this.path, "/:id"), this.getPostById);
        this.router.post("".concat(this.path), validation_middleware_1.validatePostForm, this.createPost);
        this.router.delete("".concat(this.path, "/:id"), this.removePost);
        this.router.patch("".concat(this.path, "/:id"), this.updatePost);
    };
    PostController.prototype.getAllPosts = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var posts, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, data_source_1.default.manager
                                .getRepository(post_entity_1.default)
                                .find({ relations: { author: true } })];
                    case 1:
                        posts = _a.sent();
                        return [2 /*return*/, res.json(posts)];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.json(error_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.getPostById = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, data_source_1.default.manager.findOneBy(post_entity_1.default, {
                                id: Number(id),
                            })];
                    case 1:
                        post = _a.sent();
                        if (post) {
                            return [2 /*return*/, res.status(200).json(post)];
                        }
                        next(new PostNotFoundException_1.default(Number(id)));
                        return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.createPost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var post, createdPost, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        post = req.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        createdPost = data_source_1.default.manager
                            .getRepository(post_entity_1.default)
                            .create(post);
                        return [4 /*yield*/, data_source_1.default.manager
                                .getRepository(post_entity_1.default)
                                .save(createdPost)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, res.json(result)];
                    case 3:
                        error_2 = _a.sent();
                        //return res.json(error);
                        next(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.removePost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, postToRemove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, data_source_1.default.manager.findOneBy(post_entity_1.default, {
                                id: Number(id),
                            })];
                    case 1:
                        postToRemove = _a.sent();
                        return [4 /*yield*/, data_source_1.default.manager.remove(postToRemove)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.updatePost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, update, postToUpdate, updatedPost, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        update = req.body;
                        console.log(update);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, data_source_1.default.getRepository(post_entity_1.default).findOneBy({
                                id: Number(id),
                            })];
                    case 2:
                        postToUpdate = _a.sent();
                        if (!postToUpdate) {
                            return [2 /*return*/, res.json({ message: "Unable to find post with id ".concat(id) })];
                        }
                        data_source_1.default.getRepository(post_entity_1.default).merge(postToUpdate, update);
                        return [4 /*yield*/, data_source_1.default.getRepository(post_entity_1.default).save(postToUpdate)];
                    case 3:
                        updatedPost = _a.sent();
                        return [2 /*return*/, res.json({
                                message: "Successfully updated data for post with id: ".concat(id, "."),
                                updatedPost: updatedPost,
                            })];
                    case 4:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.json(error_3)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return PostController;
}());
exports.default = PostController;
//# sourceMappingURL=post.controller.js.map