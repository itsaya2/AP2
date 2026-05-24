const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

// 📒 بيانات البداية (معدلة)
let persons = [
  { id: "101", name: "Lina", number: "0912345678" },
  { id: "102", name: "Omar", number: "0934567890" },
  { id: "103", name: "Sara", number: "0956781234" }
]

/* ================= INFO ================= */
app.get('/info', (req, res) => {
  res.send(`
    <p>دليل الهاتف يحتوي على ${persons.length} جهة اتصال</p>
    <p>${new Date()}</p>
  `)
})

/* ================= GET ALL ================= */
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

/* ================= GET BY ID ================= */
app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === req.params.id)

  if (!person) {
    return res.status(404).json({ error: 'Person not found' })
  }

  res.json(person)
})

/* ================= ADD ================= */
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({ error: 'Name and number required' })
  }

  const exists = persons.find(
    p => p.name.toLowerCase() === name.toLowerCase()
  )

  if (exists) {
    return res.status(400).json({ error: 'Name already exists' })
  }

  const newPerson = {
    id: String(Date.now()),
    name,
    number
  }

  persons = persons.concat(newPerson)

  res.status(201).json(newPerson)
})

/* ================= DELETE ================= */
app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(p => p.id !== req.params.id)
  res.status(204).end()
})

/* ================= UPDATE ================= */
app.put('/api/persons/:id', (req, res) => {
  const { name, number } = req.body
  const id = req.params.id

  const existing = persons.find(p => p.id === id)

  if (!existing) {
    return res.status(404).json({ error: 'Person not found' })
  }

  const updatedPerson = { id, name, number }

  persons = persons.map(p =>
    p.id === id ? updatedPerson : p
  )

  res.json(updatedPerson)
})

/* ================= SERVER ================= */
const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})