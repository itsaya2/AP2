import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message, type }) => {
  if (!message) return null

  return (
    <div>
      {type === 'error' ? '❌' : '✅'} {message}
    </div>
  )
}

const Search = ({ value, onChange }) => (
  <div>
    <input
      placeholder="ابحث عن جهة اتصال..."
      value={value}
      onChange={onChange}
    />
  </div>
)

const ContactForm = ({
  onSubmit,
  name,
  number,
  onNameChange,
  onNumberChange
}) => (
  <form onSubmit={onSubmit}>

    <div>
      الاسم:
      <input
        value={name}
        onChange={onNameChange}
      />
    </div>

    <div>
      الرقم:
      <input
        value={number}
        onChange={onNumberChange}
      />
    </div>

    <button type="submit">
      إضافة
    </button>

  </form>
)

const Contact = ({ person, onDelete }) => (
  <li>
    {person.name} — {person.number}

    <button
      onClick={() =>
        onDelete(person.id, person.name)
      }
    >
      حذف
    </button>
  </li>
)

const App = () => {

  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] =
    useState('success')

  useEffect(() => {
    personService
      .getAll()
      .then(data => setContacts(data))
  }, [])

  const showMessage = (
    text,
    type = 'success'
  ) => {

    setMessage(text)
    setMessageType(type)

    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }

  const addContact = (event) => {

    event.preventDefault()

    if (
      !newName.trim() ||
      !newNumber.trim()
    ) {
      showMessage(
        'يرجى تعبئة جميع الحقول',
        'error'
      )
      return
    }

    const existingContact = contacts.find(
      person => person.name === newName
    )

    if (existingContact) {

     const confirmUpdate = window.confirm(`هل تريد تعديل الرقم المسجل لـ ${newName}؟`)

      if (confirmUpdate) {

        const updatedPerson = {
          ...existingContact,
          number: newNumber
        }

        personService
          .update(
            existingContact.id,
            updatedPerson
          )
          .then(returnedPerson => {

            setContacts(
              contacts.map(person =>
                person.id !== existingContact.id
                  ? person
                  : returnedPerson
              )
            )
showMessage(`تم تعديل رقم ${newName}`)
           

            setNewName('')
            setNewNumber('')
          })
      }

      return
    }

    const newContact = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newContact)
      .then(returnedPerson => {

        setContacts(
          contacts.concat(returnedPerson)
        )

       showMessage(`تم إضافة ${newName}`)

        setNewName('')
        setNewNumber('')
      })
  }

  const removeContact = (id, name) => {

   const confirmDelete = window.confirm(`هل تريد حذف ${name} ؟`)

    if (confirmDelete) {

      personService
        .remove(id)
        .then(() => {

          setContacts(
            contacts.filter(
              person => person.id !== id
            )
          )

         showMessage(`تم حذف ${name}`)
        })
    }
  }

  const searchedPersons = search
    ? contacts.filter(person =>
      person.name
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    : contacts

  return (
    <div>

      <h1>دفتر الأرقام </h1>

      <p>
        عدد جهات الاتصال:
        {contacts.length}
      </p>

      <Notification
        message={message}
        type={messageType}
      />

      <Search
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <h2>إضافة جهة اتصال</h2>
    <ContactForm
        onSubmit={addContact}
        name={newName}
        number={newNumber}
        onNameChange={(e) =>
          setNewName(e.target.value)
        }
        onNumberChange={(e) =>
          setNewNumber(e.target.value)
        }
      />

      <h2>
        قائمة جهات الاتصال
      </h2>

      {searchedPersons.length === 0 ? (
        <p>لا توجد بيانات</p>
      ) : (
        <ul>
          {searchedPersons.map(person => (
            <Contact
              key={person.id}
              person={person}
              onDelete={removeContact}
            />
          ))}
        </ul>
      )}

    </div>
  )
}

export default App  