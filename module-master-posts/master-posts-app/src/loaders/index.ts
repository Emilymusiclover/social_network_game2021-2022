import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const feedSchema = {
    // compare with the approach followed in repos and services
    name: 'feedSchema',
    schema: '../persistence/schemas/feedSchema',
  };
  const feedController = {
    name: config.controllers.feed.name,
    path: config.controllers.feed.path
  }
  const feedRepo = {
    name: config.repos.feed.name,
    path: config.repos.feed.path
  }
  const feedService = {
    name: config.services.feed.name,
    path: config.services.feed.path
  }

  const postSchema = {
    // compare with the approach followed in repos and services
    name: 'postSchema',
    schema: '../persistence/schemas/postSchema',
  };
  const postController = {
    name: config.controllers.post.name,
    path: config.controllers.post.path
  }
  const postRepo = {
    name: config.repos.post.name,
    path: config.repos.post.path
  }
  const postService = {
    name: config.services.post.name,
    path: config.services.post.path
  }

  const commentSchema = {
    // compare with the approach followed in repos and services
    name: 'commentSchema',
    schema: '../persistence/schemas/commentSchema',
  };
  const commentController = {
    name: config.controllers.comment.name,
    path: config.controllers.comment.path
  }
  const commentRepo = {
    name: config.repos.comment.name,
    path: config.repos.comment.path
  }
  const commentService = {
    name: config.services.comment.name,
    path: config.services.comment.path
  }

  const reactionsSchema = {
    // compare with the approach followed in repos and services
    name: 'reactionsSchema',
    schema: '../persistence/schemas/reactionsSchema',
  };
  const reactionsController = {
    name: config.controllers.reactions.name,
    path: config.controllers.reactions.path
  }
  const reactionsRepo = {
    name: config.repos.reactions.name,
    path: config.repos.reactions.path
  }
  const reactionsService = {
    name: config.services.reactions.name,
    path: config.services.reactions.path
  }

  const userReactionSchema = {
    // compare with the approach followed in repos and services
    name: 'userReactionSchema',
    schema: '../persistence/schemas/userReactionSchema',
  };
  const userReactionController = {
    name: config.controllers.userReaction.name,
    path: config.controllers.userReaction.path
  }
  const userReactionRepo = {
    name: config.repos.userReaction.name,
    path: config.repos.userReaction.path
  }
  const userReactionService = {
    name: config.services.userReaction.name,
    path: config.services.userReaction.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      feedSchema,
      postSchema,
      commentSchema,
      reactionsSchema,
      userReactionSchema
    ],
    controllers: [
      feedController,
      postController,
      commentController,
      reactionsController,
      userReactionController
    ],
    repos: [
      feedRepo,
      postRepo,
      commentRepo,
      reactionsRepo,
      userReactionRepo
    ],
    services: [
      feedService,  
      postService,
      commentService,
      reactionsService,
      userReactionService
    ]
  });

  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');
  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');

};
