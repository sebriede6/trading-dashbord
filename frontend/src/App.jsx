
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Trading from './pages/Trading';
import NotFound from './pages/NotFound';

const API_URL = import.meta.env.VITE_API_URL;


function App() {
    // Helligkeit für Lightmodus (zwischen 90 und 40, Standard 90)
    const [lightBg, setLightBg] = useState(90);
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [todoPriority, setTodoPriority] = useState(2); // 1=hoch, 2=mittel, 3=niedrig
  const [error, setError] = useState('');
  // const [showRegister, setShowRegister] = useState(false); // removed, not used anymore
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  // Logout handler
  const handleLogout = () => {
    setToken('');
    setUsername('');
    setPassword('');
    setTodos([]);
    setEditId(null);
    setEditText('');
    setTodoText('');
    navigate('/');
  };

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    // Try to load from localStorage or use prefers-color-scheme
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('darkMode');
      if (stored !== null) return stored === 'true';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);
  const register = async (e) => {
    e.preventDefault();
    setRegisterError('');
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: registerUsername, password: registerPassword })
      });
      const data = await res.json();
      if (res.ok) {
        // setShowRegister(false); // removed, handled by route now
        setUsername(registerUsername);
        setPassword('');
        setRegisterUsername('');
        setRegisterPassword('');
        setRegisterError('');
        setTodos([]);
        setEditId(null);
        setEditText('');
        setTodoText('');
      } else {
        setRegisterError(data.error || 'Registrierung fehlgeschlagen');
      }
    } catch {
      setRegisterError('Serverfehler');
    }
  };
  // Edit Todo State
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editPriority, setEditPriority] = useState(2);



  // ...existing code...
  // Die Navigation und das Routing werden weiter unten im File behandelt, kein doppeltes return hier!
  const login = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        setUsername(username); // Username aus Login-Formular setzen
        setTodos([]);
        setEditId(null);
        setEditText('');
        setTodoText('');
        fetchTodos(data.token);
        navigate('/todos');
      } else {
        setError(data.error || 'Login fehlgeschlagen');
      }
    } catch {
      setError('Serverfehler');
    }
  };

  const fetchTodos = async (jwt) => {
    try {
      const res = await fetch(`${API_URL}/todos`, {
        headers: { Authorization: `Bearer ${jwt || token}` }
      });
      const data = await res.json();
      setTodos(data);
    } catch {
      setTodos([]);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!todoText) return;
    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text: todoText, priority: todoPriority })
      });
      if (res.ok) {
        setTodoText('');
        setTodoPriority(2);
        fetchTodos();
      }
    } catch { /* ignore */ }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTodos();
    } catch { /* ignore */ }
  };

  // Edit Todo
  const startEditTodo = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
    setEditPriority(todo.priority ?? 2);
  };

  const cancelEditTodo = () => {
    setEditId(null);
    setEditText('');
    setEditPriority(2);
  };

  const saveEditTodo = async (e) => {
    e.preventDefault();
    if (!editText) return;
    try {
      await fetch(`${API_URL}/todos/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text: editText, priority: editPriority })
      });
      await fetchTodos();
      setEditId(null);
      setEditText('');
      setEditPriority(2);
    } catch { /* ignore */ }
  };

  // Home is always the landing page, login/register/profile are routes

  return (
   <div
      className={
        `min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-gray-900' : ''}`
      }
      style={!darkMode ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)` } : {}}
    >
      {/* no extra link above navigation */}
      <div className="relative">
        <button
          className={
            `absolute top-2 right-4 z-50 px-3 py-1 rounded border text-sm font-medium transition-colors duration-200 ` +
            (darkMode
              ? 'bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300')
          }
          onClick={() => setDarkMode(d => !d)}
          title="Dark/Light Mode umschalten"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
        <nav className={`shadow flex justify-center space-x-8 py-4 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : ''}`}
          style={!darkMode ? { backgroundColor: `hsl(220, 16%, ${lightBg + 10}%)` } : {}}
        >
                {/* Regler für Helligkeit nur im Lightmodus anzeigen */}
                {!darkMode && (
                  <div className="flex justify-center items-center py-2">
                    <label htmlFor="lightBgRange" className="mr-2 text-gray-700">Helligkeit:</label>
                    <input
                      id="lightBgRange"
                      type="range"
                      min="40"
                      max="90"
                      value={lightBg}
                      onChange={e => setLightBg(Number(e.target.value))}
                      className="w-48 accent-blue-500"
                    />
                    <span className="ml-2 text-gray-700">{lightBg}%</span>
                  </div>
                )}
        <Link to="/" className={darkMode ? "text-blue-400 font-semibold hover:underline" : "text-blue-600 font-semibold hover:underline"}>Home</Link>
        <Link to="/trading" className={darkMode ? "text-blue-400 font-semibold hover:underline" : "text-blue-600 font-semibold hover:underline"}>Trading</Link>
        <Link to="/todos" className={darkMode ? "text-blue-400 font-semibold hover:underline" : "text-blue-600 font-semibold hover:underline"}>Todos</Link>
        <Link to="/profile" className={darkMode ? "text-blue-400 font-semibold hover:underline" : "text-blue-600 font-semibold hover:underline"}>Profil</Link>
        <Link to="/about" className={darkMode ? "text-blue-400 font-semibold hover:underline" : "text-blue-600 font-semibold hover:underline"}>Über diese App</Link>
        {!token && (
          <Link to="/login" className={darkMode ? "text-blue-400 font-semibold hover:underline" : "text-blue-600 font-semibold hover:underline"}>Login</Link>
        )}
        {token && (
          <button
            className={
              `ml-2 px-3 py-1 rounded border text-sm font-medium transition-colors duration-200 ` +
              (darkMode
                ? 'bg-red-700 text-white border-red-600 hover:bg-red-600'
                : 'bg-red-200 text-red-800 border-red-300 hover:bg-red-300')
            }
            onClick={handleLogout}
            title="Logout"
          >Logout</button>
        )}
      </nav>
      </div>
      <div
        className={darkMode ? 'flex-1 bg-gray-900 transition-colors duration-300' : 'flex-1 transition-colors duration-300'}
        style={!darkMode ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)` } : {}}
      >
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<div className={darkMode ? 'bg-gray-900 min-h-full transition-colors duration-300' : 'min-h-full transition-colors duration-300'} style={!darkMode ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)` } : {}}><Home /></div>} />
            <Route path="/trading" element={<div className={darkMode ? 'bg-gray-900 min-h-full transition-colors duration-300' : 'min-h-full transition-colors duration-300'}><Trading token={token} /></div>} />
            <Route path="/about" element={<div className={darkMode ? 'bg-gray-900 min-h-full transition-colors duration-300' : 'min-h-full transition-colors duration-300'} style={!darkMode ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)` } : {}}><About /></div>} />
            <Route path="/profile" element={
              <div
                className={darkMode ? 'bg-gray-900 min-h-full transition-colors duration-300 flex flex-col items-center justify-center' : 'min-h-full transition-colors duration-300 flex flex-col items-center justify-center'}
                style={!darkMode ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)` } : {}}
              >
                <Profile username={username} onLogout={handleLogout} lightBg={lightBg} darkMode={darkMode} />
              </div>
            } />
            <Route path="/todos" element={
              <div className="flex flex-col items-center p-8">
                <div className={
                  `w-full max-w-md rounded shadow p-6 transition-colors duration-300 ` +
                  (darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900')
                }>
                  <h2 className="text-xl font-bold mb-4">Meine Todos</h2>
                  {token ? (
                    <form onSubmit={addTodo} className="flex mb-4 gap-2">
                      <input
                        className={
                          `flex-1 border p-2 rounded-l transition-colors duration-200 ` +
                          (darkMode ? 'bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400' : 'bg-white text-gray-900 border-gray-300')
                        }
                        placeholder="Neues Todo"
                        value={todoText}
                        onChange={e => setTodoText(e.target.value)}
                      />
                      <select
                        className={
                          `border p-2 rounded transition-colors duration-200 ` +
                          (darkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-900 border-gray-300')
                        }
                        value={todoPriority}
                        onChange={e => setTodoPriority(Number(e.target.value))}
                        title="Dringlichkeit"
                      >
                        <option value={1}>Hoch</option>
                        <option value={2}>Mittel</option>
                        <option value={3}>Niedrig</option>
                      </select>
                      <button className={
                        `px-4 rounded-r transition-colors duration-200 ` +
                        (darkMode ? 'bg-green-700 text-white' : 'bg-green-600 text-white')
                      } type="submit">+</button>
                    </form>
                  ) : (
                    <div className="mb-4 text-sm text-gray-400">Zum Hinzufügen, Bearbeiten oder Löschen bitte einloggen.</div>
                  )}
                  <ul>
                    {todos.map(todo => (
                      <li key={todo.id} className={
                        `flex justify-between items-center border-b py-2 gap-2 transition-colors duration-200 ` +
                        (darkMode ? 'border-gray-700' : 'border-gray-200')
                      }>
                        {editId === todo.id && token ? (
                          <form onSubmit={saveEditTodo} className="flex flex-1 flex-wrap gap-1 items-center">
                            <input
                              className={
                                `flex-1 min-w-0 border p-2 rounded transition-colors duration-200 ` +
                                (darkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-900 border-gray-300')
                              }
                              value={editText}
                              onChange={e => setEditText(e.target.value)}
                              autoFocus
                            />
                            <select
                              className={
                                `border p-2 rounded transition-colors duration-200 ` +
                                (darkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-900 border-gray-300')
                              }
                              value={editPriority}
                              onChange={e => setEditPriority(Number(e.target.value))}
                              title="Dringlichkeit"
                            >
                              <option value={1}>Hoch</option>
                              <option value={2}>Mittel</option>
                              <option value={3}>Niedrig</option>
                            </select>
                            <button className={
                              `px-2 py-1 rounded text-sm transition-colors duration-200 ` +
                              (darkMode ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white')
                            } type="submit">Speichern</button>
                            <button className={
                              `px-2 py-1 rounded text-sm transition-colors duration-200 ` +
                              (darkMode ? 'bg-gray-600 text-gray-100' : 'bg-gray-300')
                            } type="button" onClick={cancelEditTodo}>Abbrechen</button>
                          </form>
                        ) : (
                          <>
                            <span className="flex-1 wrap-break-word w-full" style={{wordBreak:'break-word', whiteSpace:'pre-line'}}>{todo.text}</span>
                            <span className={
                              todo.priority === 1 ? (darkMode ? 'text-red-400 font-bold' : 'text-red-600 font-bold') :
                              todo.priority === 2 ? (darkMode ? 'text-yellow-300 font-semibold' : 'text-yellow-600 font-semibold') :
                              (darkMode ? 'text-green-400' : 'text-green-700')
                            }>
                              {todo.priority === 1 ? 'Hoch' : todo.priority === 2 ? 'Mittel' : 'Niedrig'}
                            </span>
                            {token && <>
                              <button className={darkMode ? 'text-yellow-300 mr-2' : 'text-yellow-500 mr-2'} onClick={() => startEditTodo(todo)}>Bearbeiten</button>
                              <button className={darkMode ? 'text-red-400' : 'text-red-500'} onClick={() => deleteTodo(todo.id)}>Löschen</button>
                            </>}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            } />
            <Route path="/login" element={
              <div className={
                `min-h-screen flex items-center justify-center transition-colors duration-300 ` +
                (darkMode ? 'bg-gray-900' : 'bg-gray-100')
              }>
                <form onSubmit={login} className={
                  `p-8 rounded shadow-md w-80 transition-colors duration-300 ` +
                  (darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900')
                }>
                  <h2 className="text-2xl font-bold mb-4">Login</h2>
                  {error && <div className="text-red-500 mb-2">{error}</div>}
                  <input
                    className={
                      `w-full mb-2 p-2 border rounded transition-colors duration-200 ` +
                      (darkMode ? 'bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400' : 'bg-white text-gray-900 border-gray-300')
                    }
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    autoFocus
                  />
                  <input
                    className={
                      `w-full mb-4 p-2 border rounded transition-colors duration-200 ` +
                      (darkMode ? 'bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400' : 'bg-white text-gray-900 border-gray-300')
                    }
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <button className={
                    `w-full py-2 rounded transition-colors duration-200 ` +
                    (darkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white')
                  } type="submit">Login</button>
                  <button type="button" className={
                    `w-full mt-2 text-sm underline transition-colors duration-200 ` +
                    (darkMode ? 'text-gray-400' : 'text-gray-500')
                  } onClick={() => window.location.href='/register'}>Registrieren</button>
                </form>
              </div>
            } />
            <Route path="/register" element={
              <div className={
                `min-h-screen flex items-center justify-center transition-colors duration-300 ` +
                (darkMode ? 'bg-gray-900' : 'bg-gray-100')
              }>
                <form onSubmit={register} className={
                  `p-8 rounded shadow-md w-80 transition-colors duration-300 ` +
                  (darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900')
                }>
                  <h2 className="text-2xl font-bold mb-4">Registrieren</h2>
                  {registerError && <div className="text-red-500 mb-2">{registerError}</div>}
                  <input
                    className={
                      `w-full mb-2 p-2 border rounded transition-colors duration-200 ` +
                      (darkMode ? 'bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400' : 'bg-white text-gray-900 border-gray-300')
                    }
                    placeholder="Username"
                    value={registerUsername}
                    onChange={e => setRegisterUsername(e.target.value)}
                    autoFocus
                  />
                  <input
                    className={
                      `w-full mb-4 p-2 border rounded transition-colors duration-200 ` +
                      (darkMode ? 'bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400' : 'bg-white text-gray-900 border-gray-300')
                    }
                    placeholder="Password"
                    type="password"
                    value={registerPassword}
                    onChange={e => setRegisterPassword(e.target.value)}
                  />
                  <button className={
                    `w-full py-2 rounded transition-colors duration-200 ` +
                    (darkMode ? 'bg-green-700 text-white' : 'bg-green-600 text-white')
                  } type="submit">Registrieren</button>
                  <button type="button" className={
                    `w-full mt-2 text-sm underline transition-colors duration-200 ` +
                    (darkMode ? 'text-gray-400' : 'text-gray-500')
                  } onClick={() => window.location.href='/login'}>Zum Login</button>
                </form>
              </div>
            } />
            <Route path="*" element={<div className={darkMode ? 'bg-gray-900 min-h-full transition-colors duration-300' : 'bg-gray-100 min-h-full transition-colors duration-300'}><NotFound /></div>} />
            <Route path="/logout" element={<Navigate to="/" />} />

          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
