"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi"); //TypeScript Dependecy injection
const config_1 = __importDefault(require("../../config"));
let ReactionsController = class ReactionsController {
    constructor(reactionsServiceInstance //Service injection
    ) {
        this.reactionsServiceInstance = reactionsServiceInstance;
    }
    async getReactions(req, res, next) {
        try {
            const reactionsOrError = (await this.reactionsServiceInstance.getReaction(req.params.id));
            //Failure
            if (reactionsOrError.isFailure) {
                return res.status(402).send();
            }
            //Created
            const reactionsDTO = reactionsOrError.getValue();
            return res.json(reactionsDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    /**public async getAllPosts(req: Request, res: Response, next: NextFunction) {
      try {
        const postsOrError = await this.postServiceInstance.getAllPosts() as Result<IPostDTO[]>;
          //Failure
        if (postsOrError.isFailure) {
          return res.status(402).send();
        }
      //Created
        const postsDTO = postsOrError.getValue();
        return res.json( postsDTO ).status(201);
      }
      catch (e) {
        return next(e);
      }
    };
  
    public async removePost(req: Request, res: Response, next: NextFunction) {
      try {
        const postOrError = await this.postServiceInstance.removePost(req.params.id as string) as Result<IPostDTO>;
          //Failure
        if (postOrError.isFailure) {
          return res.status(402).send();
        }
      //Created
        const postDTO = postOrError.getValue();
        return res.json( postDTO ).status(201);
      }
      catch (e) {
        return next(e);
      }
    };
    public async updatePost(req: Request, res: Response, next: NextFunction) {
      try {
        const postOrError = await this.postServiceInstance.updatePost(req.body as IPostDTO) as Result<IPostDTO>;
  
        if (postOrError.isFailure) {
          return res.status(404).send();
        }
  
        const postDTO = postOrError.getValue();
        return res.status(201).json( postDTO );
      }
      catch (e) {
       return next(e);
      }
     };*/
    async createReactionsPost(req, res, next) {
        try {
            const reactionsOrError = (await this.reactionsServiceInstance.createReactionsPost(req.params.id, req.body));
            //Failure
            if (reactionsOrError.isFailure) {
                return res.status(402).send();
            }
            //Created
            const reactionsDTO = reactionsOrError.getValue();
            return res.json(reactionsDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
};
ReactionsController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.services.reactions.name)),
    __metadata("design:paramtypes", [Object])
], ReactionsController);
exports.default = ReactionsController;
//# sourceMappingURL=reactionsController.js.map