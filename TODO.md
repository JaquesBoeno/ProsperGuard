# ProsperGuard

- ## Stack:

  - front-end: ReactJS
  - Back-end: Golang, Fiber, PGX

- ## Functional Requirements

  - CRUD transactions
  - CRUD recurring transaction
  - Filter Transactions by
    - Type
    - Value
    - Date
    - Tags
    - Text Search

- ## Business rules

  -

- ## Non-functional Requirements
  - sonic for text search
  - use docker in the entire project
  - Backend use Golang
  - Database use Postgres
  - Api RestFul
  - BackEnd documentation in Astro
  - FrontEnd documentation in storyBook

# Software Modeling

Schemas

User

- id: UUID
- name: string
- email: string
- passwordHash: string
- tagsId: []tagsId
- transactionsId: []transactionsId

Transaction

- id: UUID
- type: string
- name
- description
- value
- date

Tag

- id: UUID
- name
- color
