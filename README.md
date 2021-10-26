<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Basic CRUD operation program.

## 구현한 방법과 이유에 대한 간략한 내용
Nestjs provides very good architecture for any project. 
I followed the architecture provided by Nestjs out-of-the-box.
I have two main modules: Users and Posts.
For each modules there is a controller, service, and repository (the repository is automatically created by TypeOrm).
All the HTTP requests first go to the controller, all the business logic related to the HTTP request is stored in the service and all access to the database is in the repository.


### Authentication
#### Cookie-session
I used a cookie session to implement authentication.
The password was hashed before storing in the database to prevent anyone from accessing it. 

Instead of simply hashing the password I combined it with a salt(random string). I did this because even though the password is hashed people can still guess the password by brute forcing different passwords. By hashing the password with a salt it makes it significantly more difficult to find the password.

In order to read, create, update, or delete any post, you have to be signed in. I implemented this using a Nestjs Guard. I created a "AuthGuard" which returns a session userId.

### Authorization
If authentication deals with whether a user is signed in or not, authorization deals with whether a user is authorized to execute some action. For example, there are actions only "admin" level users can do. In this project only the user that is the author of the post can update or delete it. This I also implemented using a Nestjs Guard. I created a "isAuthorGuard" the return a boolean on whether the post author id is the same as the currently logged in user's id. If false, the user is not authorized to udpate or delete the post.

## 자세한 실행 방법(endpoint 호출방법)
## API 명세(request/response 서술 필요)
### Base URL: localhost:3000
### Users
#### Signin
```POST users/signin```

Request
```
{
  "email": "test1@test.com", 
  "password":"test"
} 
```
Response

*Success*
```
{
  "id": 1,
  "email": "test1@test.com",
  "password": "ba3e5dfd2f260935.a96ea0ee22100515a41ed1dce08b744caabdf33faa9e079eb1dc197de083d5d7"
}
```
*Error*
```
{
  "statusCode": 404,
  "message": "user not found",
  "error": "Not Found"
}
```
#### Signout
```POST users/signout```
#### Signup
```POST users/signup```

Request
```
{
  "email": "test1@test.com", 
  "password":"test1"
} 
```
Response
*Success*
```
{
  "email": "test@test.com",
  "password": "cd78938da67b5e24.8949cf15391517951296849ac7a6ff601f6f53f081db6f5b41274b2bd93ef302",
  "id": 1
}
```
*Error*
```
{
  "statusCode": 400,
  "message": "Email in use",
  "error": "Bad Request"
}
```
#### whoami 
Check to see who is currently signed in
```GET users/whoami```

### Posts
#### Create Post
```POST posts```

Request
{
    "post": "test1"
}

Response

*Success*
```
{
  "post": "test3",
  "date": "2021-10-26T22:56:19.257Z",
  "user": {
    "id": 1,
    "email": "test1@test.com",
    "password": "ba3e5dfd2f260935.a96ea0ee22100515a41ed1dce08b744caabdf33faa9e079eb1dc197de083d5d7"
  },
  "author": 1,
  "id": 4
}
```
*Error*
```
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```
#### Find Post
```GET posts/{id}```

Response

*Success*
{
  "id": postId,
  "post": "postContent",
  "date": "DatePosted",
  "author": authorId
}

*Error*
```
{
  "statusCode": 404,
  "message": "Post not found",
  "error": "Not Found"
}
```
#### Find All Posts
```GET posts?limit={number}&offset={number}```
Response

*Success*
```
{
  "posts": [
    {PostEntity},
    {PostEntity}
  ],
  "count": "countNumber"
}
```
*Error*
```
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```
#### Update Post
```PATCH posts/{id}```

Request
{
    "post": "updateTest1"
}

Response

*Success*
```
{
  "id": postId,
  "post": "updatedPostContent",
  "date": "datePostFirstCreated",
  "author": authorId
}
```
*Error*
```
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```
#### Delete Post
```DELETE posts/{id}```
*Error*
```
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```
