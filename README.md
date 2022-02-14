# 18 NoSQL: Social Net API

MongoDB is a popular choice for many social networks due to its speed with large amounts of data and flexibility with unstructured data. 

This is an API for a social network using Express.js for routing, a MongoDB database, and the Mongoose ODM. In addition to using the [Express](https://www.npmjs.com/package/express) and [Mongoose](https://www.npmjs.com/package/mongoose) packages, moment.js is used to format timestamps.

walkthrough videos:        https://watch.screencastify.com/v/KWf1Mwr5AKZKM2RUCUqM                                       https://watch.screencastify.com/v/1Zzx8JedlDzEOMyENO6E                          https://watch.screencastify.com/v/pvv9LNgrhYeaUu0D3wNu


### Models

**User**

* `username`
    * String
    * Unique
    * Required
    * Trimmed

* `email`
    * String
    * Required
    * Unique
    * Must match a valid email address (look into Mongoose's matching validation)

* `thoughts`
    * Array of `_id` values referencing the `Thought` model

* `friends`
    * Array of `_id` values referencing the `User` model (self-reference)

**Schema Settings**

Created a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query

---

**Thought**

* `thoughtText`
    * String
    * Required
    * Must be between 1 and 280 characters

* `createdAt`
    * Date
    * Set default value to the current timestamp
    * Use a getter method to format the timestamp on query

* `username` - Which user created this thought
    * String
    * Required

* `reactions` (like replies)
    * Array of nested documents created with the `reactionSchema`

**Schema Settings**

Created a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query

---

**Reaction** (SCHEMA ONLY)

* `reactionId`
    * Use Mongoose's ObjectId data type
    * Default value is set to a new ObjectId

* `reactionBody`
    * String
    * Required
    * 280 character maximum

* `username`
    * String
    * Required

* `createdAt`
    * Date
    * Set default value to the current timestamp
    * Use a getter method to format the timestamp on query

**Schema Settings**

This will not be a model, but rather used as the `reaction` field's subdocument schema in the `Thought` model.


### API Routes

**`/api/users`**

* `GET` all users

* `GET` a single user by its `_id` and populated thought and friend data

* `POST` a new user:

```json
// example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
```

* `PUT` to update a user by its `_id`

* `DELETE` to remove user by its `_id`

**BONUS**: Remove a user's associated thoughts when deleted

---

**`/api/users/:userId/friends/:friendId`**

* `POST` to add a new friend to a user's friend list

* `DELETE` to remove a friend from a user's friend list

---

**`/api/thoughts`**

* `GET` to get all thoughts

* `GET` to get a single thought by its `_id`

* `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

```json
// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
```

* `PUT` to update a thought by its `_id`

* `DELETE` to remove a thought by its `_id`

---

**`/api/thoughts/:thoughtId/reactions`**

* `POST` to create a reaction stored in a single thought's `reactions` array field

* `DELETE` to pull and remove a reaction by the reaction's `reactionId` value


### Screenshots

![1](https://user-images.githubusercontent.com/91281668/153822954-43960273-4cc0-43c0-88cb-80f0d7e1c960.png)
![2](https://user-images.githubusercontent.com/91281668/153822963-a93a1246-bae4-4de6-a6c0-40785827d108.png)
![3](https://user-images.githubusercontent.com/91281668/153822971-79c393e7-579b-4cb4-a99f-dc75827d40b0.png)

