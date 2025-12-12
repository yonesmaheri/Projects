import './App.css'
import UserList from './components/UserList';



const usersData = [
  { name: "Ali", age: 25, city: "Tehran" },
  { name: "Mohammad", age: 30, city: "Esfahan" },
  { name: "Sina", age: 22, city: "Mahshad" },
  { name: "Ali", age: 25, city: "Tehran" },
  { name: "Mohammad", age: 30, city: "Esfahan" },
  { name: "Sina", age: 22, city: "Mahshad" },
  { name: "Ali", age: 25, city: "Tehran" },
  { name: "Mohammad", age: 30, city: "Esfahan" },
  { name: "Sina", age: 22, city: "Mahshad" },
];



function App() {

  return (
    <div className="bg-slate-100 min-h-screen w-full py-10">
      <div className="w-3/4 max-w-2xl mx-auto">
        <UserList users={usersData} />
      </div>
    </div>

  )
}

export default App
