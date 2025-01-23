import { useState, useEffect } from 'react'

export default function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [darkMode, setDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'dark text-gray-800'} transition-colors`}>
            Todo App
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-200 hover:bg-gray-300' :  'bg-gray-700  hover:bg-gray-600'} transition-colors`}
            aria-label="Toggle theme"
          >
            <span className="text-xl text-gray-800 dark:text-gray-200">
              {darkMode ? '🌞' : '🌙'}
            </span>
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className={`flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
                     ${darkMode ? 'bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-300' : 'bg-gray-100 border-gray-700 text-gray-800  placeholder-gray-400'}
                         transition-colors`}
            placeholder="Add new todo"
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 
                     focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 
                     transition-colors dark:text-gray-100"
          >
            Add
          </button>
        </div>

        <div className="space-y-2">
          {todos.map(todo => (
            <div key={todo.id} className="flex items-center justify-between p-3 
                        bg-white dark:bg-gray-800 rounded shadow-sm hover:shadow-md 
                        transition-all duration-300 text-gray-800 dark:text-gray-200">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded 
                           focus:ring-blue-500 dark:focus:ring-blue-600 
                           dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className={`${todo.completed ? 
                  'line-through text-gray-500 dark:text-gray-500' : 
                  'text-current'}`}>
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-600 hover:text-red-700 focus:outline-none 
                         dark:text-red-400 dark:hover:text-red-300 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
