Software Modeling

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
