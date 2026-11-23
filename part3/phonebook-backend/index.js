const express = require('express')
const app = express()
const morgan = require('morgan')


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

morgan.token('data', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
    const numPersons = persons.length;
    const date = new Date().toUTCString();
    const infoMessage = `<div>Phonebook has info for ${numPersons} people. <p>Request received at ${date}</p></div>`
    response.type('html')
    response.json(infoMessage)
})

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

const generateErrorResponse = (response, statusCode, message) => {
    return response.status(statusCode).json({
      error: message,
    })
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name) {
    return generateErrorResponse(response, 400, "name missing")
  }

  if (!body.number) {
    return generateErrorResponse(response, 400, "number missing")
  }

  if(persons.find((person) => person.name === body.name)) {
    return generateErrorResponse(response, 400, "This name is already in use")
  }

  if(persons.find((person) => person.number === body.number)) {
    return generateErrorResponse(response, 400, "This number is already in use")
  }

  const person = {
    name: body.name,
    number: body.number || "No number provided",
    id: getRandomInt(1000000),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

const PORT = 3001

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})