import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Profile = lazy(() => import('./pages/Profile'));
const Trading = lazy(() => import('./pages/Trading'));
const Stats = lazy(() => import('./pages/Stats'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AuthForm = lazy(() => import('./components/AuthForm'));

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [lightBg, setLightBg] = useState(90);
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [todoPriority, setTodoPriority] = useState(2);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editPriority, setEditPriority] = useState(2);

  const handleLogout = () => {
    setToken('');
    setUsername('');
    setTodos([]);
    setEditId(null);
    setEditText('');
    setTodoText('');
    navigate('/');
  };

  const [darkMode, setDarkMode] = useState(() => {
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
        const newTodo = await res.json();
        setTodos(t => [newTodo, ...t]);
        setTodoText('');
        setTodoPriority(2);
      } else {
        const error = await res.json();
        alert(error.error || 'Fehler beim Hinzufügen des Todos');
      }
    } catch {
      alert('Serverfehler. Bitte später erneut versuchen.');
    }
  };

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
      const res = await fetch(`${API_URL}/todos/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text: editText, priority: editPriority })
      });
      if (res.ok) {
        const updated = await res.json();
        setTodos(todos => todos.map(todo => todo.id === updated.id ? updated : todo));
      }
      setEditId(null);
      setEditText('');
      setEditPriority(2);
    } catch { /* ignore */ }
  };

  useEffect(() => {
    if (!token) return;
    fetch(`${API_URL}/todos`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => Array.isArray(data) && setTodos(data));
  }, [token]);

  return (
    <div
      className={
        `min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-gray-900' : ''}`
      }
      style={!darkMode ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)` } : {}}
    >
      <MobileNav darkMode={darkMode} lightBg={lightBg} token={token} handleLogout={handleLogout} />
      <div className="relative hidden md:block">
        <nav className={`shadow flex justify-center space-x-8 py-4 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : ''}`}
          style={!darkMode ? { backgroundColor: `hsl(220, 16%, ${lightBg + 10}%)` } : {}}
        >
          <div className="flex justify-center items-center py-2 gap-4">
            {!darkMode && (
              <>
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
              </>
            )}
            <button
              className={
                `ml-4 px-3 py-1 rounded border text-sm font-medium transition-colors duration-200 ` +
                (darkMode
                  ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-900 border-gray-300 hover:bg-gray-300')
              }
              onClick={() => setDarkMode(dm => !dm)}
              title="Dark Mode umschalten"
            >
              {darkMode ? '🌙 Dunkel' : '☀️ Hell'}
            </button>
          </div>
          <Link to="/" className={darkMode ? "text-blue-400 font-semibold hover:underline" : "text-blue-600 font-semibold hover:underline"}>Home</Link>
          <Link to="/trading" className={darkMode ? "text-blue-400 font-semibold hover:underline" : "text-blue-600 font-semibold hover:underline"}>Trading</Link>
          <Link to="/stats" className={darkMode ? "text-blue-400 font-semibold hover:underline" : "text-blue-600 font-semibold hover:underline"}>Statistiken</Link>
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
          <Suspense fallback={<div className="flex items-center justify-center h-screen text-blue-400 text-xl">Lädt...</div>}>
            <Routes>
              <Route path="/" element={<div className={darkMode ? 'bg-gray-900 min-h-full transition-colors duration-300' : 'min-h-full transition-colors duration-300'} style={!darkMode ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)` } : {}}><Home /></div>} />
              <Route path="/trading" element={<Trading token={token} mode={darkMode ? 'dark' : 'light'} lightBg={lightBg} />} />
              <Route path="/stats" element={<div className={darkMode ? 'bg-gray-900 min-h-full transition-colors duration-300' : 'min-h-full transition-colors duration-300'}><Stats token={token} /></div>} />
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
                            `flex-1 border p-2 rounded transition-colors duration-200 ` +
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
                          `px-4 rounded transition-colors duration-200 ` +
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
                              </>}
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              } />
              <Route path="/login" element={<AuthForm onAuth={({ user, token }) => { setUsername(user); setToken(token); navigate('/todos'); }} />} />
              <Route path="/register" element={<AuthForm onAuth={({ user, token }) => { setUsername(user); setToken(token); navigate('/todos'); }} />} />
              <Route path="*" element={<div className={darkMode ? 'bg-gray-900 min-h-full transition-colors duration-300' : 'bg-gray-100 min-h-full transition-colors duration-300'}><NotFound /></div>} />
              <Route path="/logout" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;

// Burger-Menü für mobile Navigation
function MobileNav({ darkMode, lightBg, token, handleLogout }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        className={`fixed top-3 left-3 z-50 p-2 rounded bg-blue-600 text-white shadow-lg focus:outline-none`}
        onClick={() => setOpen(o => !o)}
        aria-label="Menü öffnen/schließen"
      >
        <span className="text-2xl">☰</span>
      </button>
      {open && (
        <div className={`fixed inset-0 bg-black bg-opacity-60 z-40`} onClick={() => setOpen(false)} />
      )}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-50 flex flex-col pt-16 px-6 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={!darkMode ? { backgroundColor: `hsl(220, 16%, ${lightBg + 10}%)` } : {}}
      >
        <Link to="/" className="mb-4 font-bold text-blue-600 dark:text-blue-400" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/trading" className="mb-4 font-bold text-blue-600 dark:text-blue-400" onClick={() => setOpen(false)}>Trading</Link>
        <Link to="/stats" className="mb-4 font-bold text-blue-600 dark:text-blue-400" onClick={() => setOpen(false)}>Statistiken</Link>
        <Link to="/todos" className="mb-4 font-bold text-blue-600 dark:text-blue-400" onClick={() => setOpen(false)}>Todos</Link>
        <Link to="/profile" className="mb-4 font-bold text-blue-600 dark:text-blue-400" onClick={() => setOpen(false)}>Profil</Link>
        <Link to="/about" className="mb-4 font-bold text-blue-600 dark:text-blue-400" onClick={() => setOpen(false)}>Über diese App</Link>
        {!token && (
          <Link to="/login" className="mb-4 font-bold text-blue-600 dark:text-blue-400" onClick={() => setOpen(false)}>Login</Link>
        )}
        {token && (
          <button
            className="mt-4 px-3 py-2 rounded bg-red-700 text-white font-bold"
            onClick={() => { handleLogout(); setOpen(false); }}
          >Logout</button>
        )}
      </nav>
    </div>
  );
}

MobileNav.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  lightBg: PropTypes.number.isRequired,
  token: PropTypes.string,
  handleLogout: PropTypes.func.isRequired
};
