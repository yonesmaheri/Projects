import { useEffect, useState } from 'react'
import './App.css'
import UserList from './components/UserList'
import AddUser from './components/AddUser'

function App() {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
  }, [])


  const addUser = (user) => {
    setUsers((prev) => [user, ...prev]);
  };
  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };


  return (
    <div className="bg-slate-100 min-h-screen w-full py-10">
      <div className="w-3/4 max-w-2xl mx-auto">
        {loading ? <div></div> :
          <>
            <AddUser ddUser={addUser} />
            <UserList users={users} onDelete={deleteUser} />
          </>
        }
      </div>
    </div>

  )
}

export default App
