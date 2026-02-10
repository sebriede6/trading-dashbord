import React, { useState, useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react';
// --- Pendel-Animation für Strick ---
const STRICK_SWING_KEYFRAMES = `
@keyframes strick-swing {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(0deg) translateY(18px) scaleY(1.15); }
  18% { transform: rotate(0deg) translateY(18px) scaleY(1.15); }
  20% { transform: rotate(-18deg) translateY(0) scaleY(1); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-10deg); }
  50% { transform: rotate(7deg); }
  60% { transform: rotate(-4deg); }
  70% { transform: rotate(2deg); }
  80% { transform: rotate(-1deg); }
  90% { transform: rotate(0.5deg); }
  100% { transform: rotate(0deg); }
}
`;
import { LampDesk } from 'lucide-react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
const GitHubSuccess = lazy(() => import('./pages/GitHubSuccess'));
import PropTypes from 'prop-types';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Profile = lazy(() => import('./pages/Profile'));
const Trading = lazy(() => import('./pages/Trading'));
const Stats = lazy(() => import('./pages/Stats'));
const NotFound = lazy(() => import('./pages/NotFound'));
const TradingGuide = lazy(() => import('./pages/TradingGuide'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Imprint = lazy(() => import('./pages/Imprint'));
const Privacy = lazy(() => import('./pages/Privacy'));
const RiskDisclaimer = lazy(() => import('./pages/RiskDisclaimer'));
const AuthForm = lazy(() => import('./components/AuthForm'));

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  // Für Strick-Animation
  const [strickSwing, setStrickSwing] = useState(false);
  useEffect(() => {
    // Keyframes nur einmal einfügen
    if (!document.getElementById('strick-swing-keyframes')) {
      const style = document.createElement('style');
      style.id = 'strick-swing-keyframes';
      style.innerHTML = STRICK_SWING_KEYFRAMES;
      document.head.appendChild(style);
    }
  }, []);
  const [lightBg, setLightBg] = useState(90);
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(76);
  const [token, setToken] = useState('');
  const isAuthenticated = Boolean(token && token !== 'null' && token !== 'undefined');
  // Token aus localStorage übernehmen, falls vorhanden (z.B. nach GitHub-Login)
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken && !isAuthenticated) {
      setToken(storedToken);
    }
  }, [isAuthenticated]);
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [todoPriority, setTodoPriority] = useState(2);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editPriority, setEditPriority] = useState(2);

  const handleLogout = () => {
    setToken('');
    setTodos([]);
    setEditId(null);
    setEditText('');
    setTodoText('');
    localStorage.removeItem('authToken');
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
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useLayoutEffect(() => {
    if (!headerRef.current) {
      setHeaderHeight(76);
      return;
    }
    const updateHeight = () => setHeaderHeight(headerRef.current?.offsetHeight || 76);
    updateHeight();
    if (typeof ResizeObserver === 'undefined') {
      return;
    }
    const observer = new ResizeObserver(updateHeight);
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, [isAuthenticated]);

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

  const deleteTodoById = async (id) => {
    try {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        setTodos(t => t.filter(todo => todo.id !== id));
        if (editId === id) {
          setEditId(null);
          setEditText('');
          setEditPriority(2);
        }
      } else {
        const error = await res.json().catch(() => ({}));
        alert(error.error || 'Fehler beim Löschen des Todos');
      }
    } catch {
      alert('Serverfehler. Bitte später erneut versuchen.');
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetch(`${API_URL}/todos`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => Array.isArray(data) && setTodos(data));
  }, [token, isAuthenticated]);

  return (
    <div
      className={
        `min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-gray-900' : ''}`
      }
      style={!darkMode ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)` } : {}}
    >
          {isAuthenticated ? (
          <>
            <MobileNav darkMode={darkMode} lightBg={lightBg} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
            <div className="relative hidden md:block">
              <nav ref={headerRef} className={`shadow relative flex items-center justify-center space-x-8 py-4 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : ''}`}
                style={!darkMode ? { backgroundColor: `hsl(220, 16%, ${lightBg + 10}%)` } : {}}
              >
                {/* Lampe ganz rechts, außerhalb des Link-Containers */}
              <div className="hidden md:block">
                <div className="absolute right-4 top-3/3 -translate-y-1/2 flex flex-col items-center z-30">
                  <button
                    className="flex flex-col items-center group focus:outline-none"
                    onClick={() => {
                      setDarkMode(dm => !dm);
                      setStrickSwing(false); // Reset, damit Animation neu startet
                      setTimeout(() => setStrickSwing(true), 10);
                    }}
                    title="Licht an/aus (Dark Mode)"
                    style={{cursor:'pointer'}}
                  >
                    {/* Lampe oben, Strick/Zugkordel darunter, Strick schwingt */}
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                      <LampDesk size={40} color={darkMode ? '#222' : '#ffe066'} strokeWidth={2.2} style={{filter: !darkMode ? 'drop-shadow(0 2px 8px #ffe066)' : undefined}} />
                      <div
                        style={{
                          marginTop: '-6px',
                          display: 'block',
                          transformOrigin: 'top center',
                          animation: strickSwing ? 'strick-swing 1.2s cubic-bezier(.36,1.5,.4,1) 1' : 'none',
                        }}
                        onAnimationEnd={() => setStrickSwing(false)}
                      >
                        <svg width="6" height="54" viewBox="0 0 6 54">
                          <rect x="2" y="0" width="2" height="44" rx="1" fill="#bbb" />
                          <circle cx="3" cy="47" r="3" fill="#bbb" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-xs mt-1 text-gray-500 select-none">{darkMode ? 'Nacht' : 'Tag'}</span>
                  </button>
                </div>
              </div>
              {/* Navigation-Links mittig */}
              <div className="flex-1 flex justify-center items-center py-2 gap-4 relative">
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
                <Link to="/" className={darkMode ? "text-blue-400 font-semibold hover:underline" : "text-blue-600 font-semibold hover:underline"}>Home</Link>
                <Link to="/trading" className={darkMode ? "text-blue-400 font-semibold hover:underline" : "text-blue-600 font-semibold hover:underline"}>Trading</Link>
                <Link to="/trading-guide" className={darkMode ? "text-purple-400 font-semibold hover:underline" : "text-purple-700 font-semibold hover:underline"}>Trading-Guide</Link>
                <Link to="/stats" className={darkMode ? "text-blue-400 font-semibold hover:underline" : "text-blue-600 font-semibold hover:underline"}>Statistiken</Link>
                <Link to="/quiz" className={darkMode ? "text-green-400 font-semibold hover:underline" : "text-green-700 font-semibold hover:underline"}>Trading-Quiz</Link>
                <Link to="/todos" className={darkMode ? "text-blue-400 font-semibold hover:underline" : "text-blue-600 font-semibold hover:underline"}>Todos</Link>
                <Link to="/profile" className={darkMode ? "text-blue-400 font-semibold hover:underline" : "text-blue-600 font-semibold hover:underline"}>Profil</Link>
                <Link to="/about" className={darkMode ? "text-blue-400 font-semibold hover:underline" : "text-blue-600 font-semibold hover:underline"}>Über diese App</Link>
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
              </div>
            </nav>
          </div>
          </>
        ) : (
          <header
            className={`shadow flex items-center justify-between px-4 py-2 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : ''}`}
            style={!darkMode ? { backgroundColor: `hsl(220, 16%, ${lightBg + 10}%)` } : {}}
            ref={headerRef}
          >
            <span className={darkMode ? 'text-blue-200 font-bold text-lg' : 'text-blue-700 font-bold text-lg'}>
              Trading Journal
            </span>
            <div className="flex items-center gap-3">
              <button
                className="flex flex-col items-center group focus:outline-none"
                onClick={() => {
                  setDarkMode(dm => !dm);
                  setStrickSwing(false);
                  setTimeout(() => setStrickSwing(true), 10);
                }}
                title="Licht an/aus (Dark Mode)"
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <LampDesk size={36} color={darkMode ? '#222' : '#ffe066'} strokeWidth={2.1} style={{ filter: !darkMode ? 'drop-shadow(0 2px 8px #ffe066)' : undefined }} />
                  <div
                    style={{
                      marginTop: '-6px',
                      display: 'block',
                      transformOrigin: 'top center',
                      animation: strickSwing ? 'strick-swing 1.2s cubic-bezier(.36,1.5,.4,1) 1' : 'none',
                    }}
                    onAnimationEnd={() => setStrickSwing(false)}
                  >
                    <svg width="6" height="48" viewBox="0 0 6 48">
                      <rect x="2" y="0" width="2" height="38" rx="1" fill="#bbb" />
                      <circle cx="3" cy="41" r="3" fill="#bbb" />
                    </svg>
                  </div>
                </div>
                <span className="text-xs mt-1 text-gray-500 select-none">{darkMode ? 'Nacht' : 'Tag'}</span>
              </button>
              <Link
                to="/quiz"
                className={darkMode ? 'text-green-300 font-semibold hover:underline' : 'text-green-600 font-semibold hover:underline'}
              >
                Trading-Quiz
              </Link>
              <Link
                to="/login"
                className={darkMode ? 'text-blue-300 font-semibold hover:underline' : 'text-blue-600 font-semibold hover:underline'}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={darkMode ? 'text-blue-300 font-semibold hover:underline' : 'text-blue-600 font-semibold hover:underline'}
              >
                Registrieren
              </Link>
            </div>
          </header>
        )}
      <div className="flex-1 min-h-0 flex flex-col">
        <div
          className={darkMode ? 'flex-1 bg-gray-900 transition-colors duration-300' : 'flex-1 transition-colors duration-300'}
          style={!darkMode ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)` } : {}}
        >
          <AnimatePresence mode="wait">
            <Suspense fallback={<div className="flex items-center justify-center h-screen text-blue-400 text-xl">Lädt...</div>}>
              <Routes>
              <Route path="/" element={<div className={darkMode ? 'bg-gray-900 min-h-full transition-colors duration-300' : 'min-h-full transition-colors duration-300'} style={!darkMode ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)` } : {}}><Home compact={!isAuthenticated} headerHeight={headerHeight} /></div>} />
              <Route path="/trading" element={<Trading token={token} mode={darkMode ? 'dark' : 'light'} lightBg={lightBg} />} />
              <Route path="/stats" element={<div className={darkMode ? 'bg-gray-900 min-h-full transition-colors duration-300' : 'min-h-full transition-colors duration-300'}><Stats token={token} mode={darkMode ? 'dark' : 'light'} /></div>} />
              <Route path="/about" element={<div className={darkMode ? 'bg-gray-900 min-h-full transition-colors duration-300' : 'min-h-full transition-colors duration-300'} style={!darkMode ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)` } : {}}><About /></div>} />
              <Route path="/trading-guide" element={<div className={darkMode ? 'bg-gray-900 min-h-full transition-colors duration-300' : 'min-h-full transition-colors duration-300'} style={!darkMode ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)` } : {}}><TradingGuide /></div>} />
              <Route path="/quiz" element={<div className={darkMode ? 'bg-gray-900 min-h-full transition-colors duration-300' : 'min-h-full transition-colors duration-300'} style={!darkMode ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)` } : {}}><Quiz /></div>} />
              <Route path="/profile" element={
                <div
                  className={darkMode ? 'bg-gray-900 min-h-full transition-colors duration-300 flex flex-col items-center justify-center' : 'min-h-full transition-colors duration-300 flex flex-col items-center justify-center'}
                  style={!darkMode ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)` } : {}}
                >
                  <Profile onLogout={handleLogout} />
                </div>
              } />
              <Route path="/todos" element={
                <div className="flex flex-col items-center p-8">
                  <div className={
                    `w-full max-w-md rounded shadow p-6 transition-colors duration-300 ` +
                    (darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900')
                  }>
                    <h2 className="text-xl font-bold mb-4">Meine Todos</h2>
                    {isAuthenticated ? (
                      <form onSubmit={addTodo} className="flex flex-wrap mb-4 gap-2">
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
                            `border p-2 rounded transition-colors duration-200 max-w-22.5 w-auto min-w-0 ` +
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
                          {editId === todo.id && isAuthenticated ? (
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
                              {isAuthenticated && <>
                                <button
                                  className={darkMode ? 'text-yellow-300 mr-2' : 'text-yellow-500 mr-2'}
                                  onClick={() => startEditTodo(todo)}
                                >Bearbeiten</button>
                                <button
                                  className={darkMode ? 'text-red-300' : 'text-red-500'}
                                  onClick={() => deleteTodoById(todo.id)}
                                >Löschen</button>
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
                isAuthenticated ? <Navigate to="/profile" /> : <AuthForm onAuth={({ token }) => { setToken(token); navigate('/todos'); }} />
              } />
              <Route path="/register" element={<AuthForm onAuth={({ token }) => { setToken(token); navigate('/todos'); }} />} />
              <Route path="/github-success" element={<GitHubSuccess />} />
              <Route path="/impressum" element={<div className={darkMode ? 'bg-gray-900 min-h-full transition-colors duration-300' : 'bg-gray-100 min-h-full transition-colors duration-300'}><Imprint /></div>} />
              <Route path="/datenschutz" element={<div className={darkMode ? 'bg-gray-900 min-h-full transition-colors duration-300' : 'bg-gray-100 min-h-full transition-colors duration-300'}><Privacy /></div>} />
              <Route path="/risikohinweis" element={<div className={darkMode ? 'bg-gray-900 min-h-full transition-colors duration-300' : 'bg-gray-100 min-h-full transition-colors duration-300'}><RiskDisclaimer /></div>} />
              <Route path="*" element={<div className={darkMode ? 'bg-gray-900 min-h-full transition-colors duration-300' : 'bg-gray-100 min-h-full transition-colors duration-300'}><NotFound /></div>} />
              <Route path="/logout" element={<Navigate to="/" />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </div>
        <footer
          className={`border-t px-4 py-6 text-sm ${darkMode ? 'border-gray-700 bg-gray-900 text-gray-300' : 'border-slate-300 bg-slate-100 text-slate-700'}`}
        >
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <span>© {currentYear} Trading Journal Demo</span>
            <nav className="flex flex-wrap gap-4">
              <Link to="/impressum" className="hover:underline">Impressum</Link>
              <Link to="/datenschutz" className="hover:underline">Datenschutz</Link>
              <Link to="/risikohinweis" className="hover:underline">Risiko-Hinweis</Link>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

// Burger-Menü für mobile Navigation
function MobileNav({ darkMode, lightBg, isAuthenticated, handleLogout }) {
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
      {!isAuthenticated && (
        <div className={`fixed inset-0 bg-black bg-opacity-60 z-40`} onClick={() => setOpen(false)} />
      )}
      {isAuthenticated && (
        <nav
          className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-50 flex flex-col pt-16 px-6 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
          style={!darkMode ? { backgroundColor: `hsl(220, 16%, ${lightBg + 10}%)` } : {}}
        >
          <Link to="/" className="mb-4 font-bold text-blue-600 dark:text-blue-400" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/trading" className="mb-4 font-bold text-blue-600 dark:text-blue-400" onClick={() => setOpen(false)}>Trading</Link>
          <Link to="/trading-guide" className="mb-4 font-bold text-purple-700 dark:text-purple-400" onClick={() => setOpen(false)}>Trading-Guide</Link>
          <Link to="/quiz" className="mb-4 font-bold text-green-600 dark:text-green-400" onClick={() => setOpen(false)}>Trading-Quiz</Link>
          <Link to="/stats" className="mb-4 font-bold text-blue-600 dark:text-blue-400" onClick={() => setOpen(false)}>Statistiken</Link>
          <Link to="/todos" className="mb-4 font-bold text-blue-600 dark:text-blue-400" onClick={() => setOpen(false)}>Todos</Link>
          <Link to="/profile" className="mb-4 font-bold text-blue-600 dark:text-blue-400" onClick={() => setOpen(false)}>Profil</Link>
          <Link to="/about" className="mb-4 font-bold text-blue-600 dark:text-blue-400" onClick={() => setOpen(false)}>Über diese App</Link>
          {!isAuthenticated && (
            <Link to="/login" className="mb-4 font-bold text-blue-600 dark:text-blue-400" onClick={() => setOpen(false)}>Login</Link>
          )}
          {isAuthenticated && (
            <button
              className="mt-4 px-3 py-2 rounded bg-red-700 text-white font-bold"
              onClick={() => { handleLogout(); setOpen(false); }}
            >Logout</button>
          )}
        </nav>
      )}
    </div>
  );
}

MobileNav.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  lightBg: PropTypes.number.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired
};
