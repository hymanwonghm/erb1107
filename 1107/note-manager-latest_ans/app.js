const express = require('express')
const app = express()
const port = 3000

// Enable express app to parse JSON body
app.use(express.json())

// Import the db config from knexfile.js
const dbConfigs = require("./knexfile")
const knex = require("knex")(dbConfigs)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// GET /notes
app.get('/notes', (req, res)=>{
  // Get the search query from the url query params
  const titleQuery = req.query.title
  const contentQuery = req.query.content
  let baseKnexQuery = knex('notes')
  .leftJoin('authors', 'authors.id', 'notes.author_id')
  .select(
    "notes.id as id",
    "notes.created_at as created_at",
    "notes.updated_at as updated_at",
    "notes.title as title",
    "notes.content as content",
    "authors.id as author_id",
    "authors.name as author_name",
    "authors.created_at as author_created_at",
    "authors.updated_at as author_updated_at",
  )

  if(titleQuery){
    // search by title
    return baseKnexQuery.whereILike('title', '%'+titleQuery+'%')  
    .then((value)=>{
      return res.json(value)
    })
  }

  if(contentQuery){
    // search by content
    return baseKnexQuery.whereILike('content', '%'+contentQuery+'%')
    .then((value)=>{
      return res.json(value)
    })
  }

  // When both queries are none, we return all notes
  return baseKnexQuery.select()
  .then((value)=>{
    return res.json(value)
  })
})

// POST /notes
app.post('/notes', (req, res)=>{
  const note = req.body

  // Get the current time
  const now = new Date()
  // Set to the note created_at and updated_at
  note.created_at = now
  note.updated_at = now

  return knex("notes").insert(note).then(value=>{
    res.json(value.rowCount)
  })
})

// PUT /notes/:noteId
app.put('/notes/:noteId', (req, res)=>{
  const noteId = req.params.noteId
  return knex("notes").where({
    id: noteId
  }).update({
    title: req.body.title,
    content: req.body.content,
    author_id: req.body.author_id,
    updated_at: new Date()
  }).then((value)=>{
    return res.json(value)
  })
})

// Delete /notes/:noteId
app.delete('/notes/:noteId', (req, res)=>{
  const noteId = req.params.noteId
  return knex("notes").where({
    id: noteId
  }).del().then((value)=>{
    return res.json(value)
  })
})

// Get /notes/:noteId
app.get('/notes/:noteId', (req, res)=>{
  // Get a Note item
  const noteId = req.params.noteId
  return knex("notes")
  .leftJoin('authors', 'authors.id', 'notes.author_id')
  .select(
    "notes.id as id",
    "notes.created_at as created_at",
    "notes.updated_at as updated_at",
    "notes.title as title",
    "notes.content as content",
    "authors.id as author_id",
    "authors.name as author_name",
    "authors.created_at as author_created_at",
    "authors.updated_at as author_updated_at",
  )
  .where({
    "notes.id": noteId
  }).first().then((value)=>{
    // Return not found if the noteId cannot be
    // found
    if(!value){
      return res.status(404).json({
        "message": "note not found"
      })
    }
    return res.json(value)
  })
})


// GET /authors
app.get('/authors', (req, res)=>{
  // Get the search query from the url query params
  const nameQuery = req.query.name

  if(nameQuery){
    // search by title
    return knex('authors').whereILike('name', '%'+nameQuery+'%')  
    .then((value)=>{
      return res.json(value)
    })
  }

  // When both queries are none, we return all authors
  return knex("authors").select()
  .then((value)=>{
    return res.json(value)
  })
})

// POST /authors
app.post('/authors', (req, res)=>{
  const author = req.body

  // Get the current time
  const now = new Date()
  // Set to the author created_at and updated_at
  author.created_at = now
  author.updated_at = now

  return knex("authors").insert(author).then(value=>{
    res.json(value.rowCount)
  })
})

// PUT /authors/:authorId
app.put('/authors/:authorId', (req, res)=>{
  const authorId = req.params.authorId
  return knex("authors").where({
    id: authorId
  }).update({
    name: req.body.name,
    updated_at: new Date()
  }).then((value)=>{
    return res.json(value)
  })
})

// Delete /authors/:authorId
app.delete('/authors/:authorId', (req, res)=>{
  const authorId = req.params.authorId
  return knex("authors").where({
    id: authorId
  }).del().then((value)=>{
    return res.json(value)
  })
})

// Get /authors/:authorId
app.get('/authors/:authorId', (req, res)=>{
  // Get a author item
  const authorId = req.params.authorId
  return knex("authors").where({
    id: authorId
  }).first().then((value)=>{
    // Return not found if the authorId cannot be
    // found
    if(!value){
      return res.status(404).json({
        "message": "author not found"
      })
    }
    return res.json(value)
  })
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})