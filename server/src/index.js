'use strict';

const Hapi = require('@hapi/hapi');
const Hoek = require('@hapi/hoek');
const Joi = require('@hapi/joi');

const Datastore = require('nedb-promises');
let datastore = Datastore.create('./hapi-blog.db');

// https://stackoverflow.com/a/61222391/73067
function rot13(message) {
  var a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var b = 'nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM';
  return message.replace(/[a-z]/gi, (c) => b[a.indexOf(c)]);
}

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    router: {
      stripTrailingSlash: true,
    },
    routes: {
      cors: true,
    },
  });

  server.method({
    name: 'encrypt',
    method: rot13,
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
          if (newPost.encrypt) {
            newPost.content = server.methods.encrypt(newPost.content);
          }
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
            encrypt: Joi.boolean().optional(),
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
        if (request.payload.encrypt) {
          request.payload.content = server.methods.encrypt(
            request.payload.content
          );
        }

        return datastore
          .update(
            { _id: request.params.postId },
            { $set: request.payload },
            { returnUpdatedDocs: true, multi: false }
          )
          .then((doc) => doc);
      },
      options: {
        validate: {
          payload: Joi.object({
            title: Joi.string().min(1).max(200),
            content: Joi.string().min(1),
            _id: Joi.string().optional(),
            encrypt: Joi.boolean().optional(),
          }),
        },
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
