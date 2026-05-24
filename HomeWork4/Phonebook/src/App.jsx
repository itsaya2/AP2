import { useState, useEffect } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:3001/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // ✅ جلب البيانات من السيرفر
  useEffect(() => {
    axios.get(BASE_URL)
      .then(res => {
        setPersons(res.data)
      })
      .catch(err => console.log('Error loading data:', err))
  }, [])

  // ✅ إضافة شخص جديد إلى السيرفر
  const addPerson = (e) => {
    e.preventDefault()

    // 🔴 منع التكرار
    const exists = persons.find(
      p => p.name.toLowerCase() === newName.toLowerCase()
    )
if (exists) {
  window.alert(newName + ' موجود مسبقاً في الدليل')
  return
}

    const newPerson = {
      name: newName,
      number: newNumber
    }

    axios.post(BASE_URL, newPerson)
      .then(res => {
        // ✅ تحديث state من السيرفر مباشرة
        setPersons(prev => prev.concat(res.data))
        setNewName('')
        setNewNumber('')
      })
      .catch(err => console.log('Error adding person:', err))
  }

  // ✅ فلترة البحث
  const personsToShow = filter
    ? persons.filter(p =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    )
    : persons

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>

      <h1>📒 دليل الهاتف</h1>

      {/* 🔍 البحث */}
      <div>
        <input
          placeholder="ابحث عن اسم..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* ➕ إضافة */}
      <h2>إضافة جهة اتصال</h2>

      <form onSubmit={addPerson}>
        <div>
          الاسم:
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>

        <div>
          الرقم:
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>

        <button type="submit">إضافة</button>
      </form>

      {/*  العرض */}
      <h2>الأرقام</h2>

      <ul>
        {personsToShow.map(person => (
          <li key={person.id}>
            {person.name} — {person.number}
          </li>
        ))}
      </ul>

    </div>
  )
}

export default App