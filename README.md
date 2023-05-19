# Blog API with Auth

A REST CRUD API for a blog app with authentication and authorization, made with Node.js, Express.js, MongoDB with Mongoose and JSON Web Tokens.

## How to install:

1. Download the files onto your computer.
2. Create a **_config.env_** file inside the root folder.
3. Inside the config.env file put the following variables:
   - DATABASE=_your database connection string_
   - PORT=_your port of choice, default is 3000_
   - JWT*SECRET=\_a secret key*
   - JWT_EXPIRES_IN=90d
   - JWT_COOKIE_EXPIRES_IN=90
4. In the terminal run _npm install_.

## How to use:

To start the app, run the command _npm run start_. If you wish to start the app in development mode to have a bit more detail when getting responses and errors, run the command _npm run start:dev_.

### Authentication

#### Sign up

POST /api/v1/users/signup
{
name,
email,
password,
passwordConfirm
role _(admin or user, user is default)_
}

#### Log In

POST /api/v1/users/login
{
email,
password,
}

#### Update password

PATCH /api/v1/users/updateMyPassword - you have to be logged in
{
email,
password,
}

#### Log Out

GET /api/v1/users/logout - you have to be logged in

### GET All Blogs

To get all blogs you hit the **/api/v1/blogs** endpoint. You can add more query fields to specify your search:

#### Query

You can sort the blogs by a certain field. You can include only certain fields by naming them in the _fields_ part. By specifying the _page_ and _limit_ parameters you can limit the number of blogs per page. You can also filter the blogs by any of it's existing parameters.

### GET One

To get one blog, specify the ID of the blog at the end of the URL.
**/api/v1/blogs/_id_**

### POST - Create new product

Send a POST request to **/api/v1/blogs** with the blog in the request body in JSON format:
{
title,
body
}

### PATCH - Update product

You can only update the current user's blogs or if you are logged in as an admin.
Send a PATCH request to **/api/v1/blogs/_id_** with the modified field in the request body in JSON format.

### DELETE One

You can only delete the current user's blogs or if you are logged in as an admin.
Send a DELETE request to **/api/v1/blogs/_id_**.

### Users

If you are logged in as admin, then you can perform all od the CRUD operations on the users using **/api/v1/users** or **/api/v1/users/_:id_**.
