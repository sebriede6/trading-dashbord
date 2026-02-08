
import React, { useEffect, useState } from "react";

function GitHubLoginButton() {
  const [githubPending, setGithubPending] = useState(false);

  // Reset githubLoginPending on mount unless we're in the OAuth callback
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Only keep loader if we're on /github-success (OAuth callback)
      if (!window.location.pathname.startsWith('/github-success')) {
        localStorage.removeItem('githubLoginPending');
        setGithubPending(false);
      } else {
        setGithubPending(true);
      }
    }
  }, []);

  const handleGitHubLogin = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('githubLoginPending', 'true');
      setGithubPending(true);
    }
    window.location.href = "http://localhost:5000/api/auth/github";
  };

  // Also update state if localStorage changes (e.g. after OAuth)
  useEffect(() => {
    const onStorage = () => {
      if (typeof window !== 'undefined') {
        setGithubPending(localStorage.getItem('githubLoginPending') === 'true');
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <button
      className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center gap-2 min-w-55 justify-center"
      onClick={handleGitHubLogin}
      disabled={githubPending}
    >
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.263.82-.583 0-.288-.01-1.05-.015-2.06-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.24 1.84 1.24 1.07 1.835 2.807 1.305 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.382 1.235-3.222-.124-.303-.535-1.523.117-3.176 0 0 1.008-.323 3.3 1.23a11.5 11.5 0 0 1 3-.404c1.02.005 2.045.138 3 .404 2.29-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.234 1.912 1.234 3.222 0 4.61-2.803 5.624-5.475 5.921.43.37.823 1.096.823 2.21 0 1.595-.014 2.88-.014 3.273 0 .322.218.698.825.58C20.565 21.797 24 17.297 24 12c0-6.63-5.37-12-12-12z"/></svg>
      {githubPending ? (
        <span className="animate-pulse text-blue-300">GitHub Login läuft ...</span>
      ) : (
        'Mit GitHub anmelden'
      )}
    </button>
  );
}

export default GitHubLoginButton;
