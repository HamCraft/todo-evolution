# Data Model

## Todo Item

| Field | Type | Description | Constraints |
|---|---|---|---|
| id | integer | Unique identifier | Primary Key, Auto-incrementing |
| title | string | The content of the todo item | Required, Max length: 255 |
| completed | boolean | Whether the todo item is completed | Required, Defaults to `false` |
