# Blog app

## requirement

- user can post and publish blog content
- user can see post
- authentication system
- user can see their own profile

## Table

- post

  - id
  - title
  - content
  - authorId
  - createdAt
  - updatedAt
  - publishedStatus

- user

  - id
  - email
  - password
  - createdAt
  - updatedAt
  - profile

- profile

  - id
  - bio
  - createdAt
  - updatedAt
  - userId

## Technology Stack:

- graphql
- typescript
- postgresql
- prisma (ORM)
