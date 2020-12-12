'use strict';

const Hapi = require('@hapi/hapi');
const Hoek = require('@hapi/hoek');
const Joi = require('@hapi/joi');

const Datastore = require('nedb-promises');
let datastore = Datastore.create('./hapi-blog.db');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    router: {
      stripTrailingSlash: true,
    },
  });

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        const msg = {
          message: 'Check out the other routes',
        };
        return msg;
      },
    },
    {
      method: 'GET',
      path: '/post',
      handler: (request, h) => {
        return datastore.find({}).then((docs) => docs);
      },
    },
    {
      method: 'POST',
      path: '/post',
      handler: (request, h) => {
        function addPost(newPost) {
          return datastore.insert(request.payload).then((newDoc) => newDoc);
        }

        if (request.payload._id) {
          return datastore.findOne({ _id: request.payload._id }).then((doc) => {
            if (doc) {
              const msg = {
                statusCode: 400,
                message: 'Post with this ID already exists.',
              };
              return h.response(msg).code(400);
            } else {
              return addPost(request.payload);
            }
          });
        }
        return addPost(request.payload);
      },
      options: {
        validate: {
          payload: Joi.object({
            title: Joi.string().min(1).max(200),
            content: Joi.string().min(1),
            _id: Joi.string().optional(),
          }),
        },
      },
    },
    {
      method: 'GET',
      path: '/post/{postId}',
      handler: (request, h) => {
        return datastore
          .findOne({ _id: request.params.postId })
          .then((doc) => doc);
      },
    },
    {
      method: 'PUT',
      path: '/post/{postId}',
      handler: (request, h) => {
        return datastore
          .update(
            { _id: request.params.postId },
            { $set: request.payload },
            { returnUpdatedDocs: true, multi: false }
          )
          .then((doc) => doc);
      },
    },
  ]);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
