import Movielist from './components/Movielist'

import './App.css'

function App() {
  return (
    <>
      <div className="app-background">
        <div>
          <nav className="navbar navbar-dark bg-dark">
            <div className="container">
              <span className="navbar-brand mb-0 h1">MoviePicker</span>
            </div>
          </nav>
        </div>
        <div className="container mt-5">
          <h1 className="text-center mb-4">Your Watch List</h1>
          <p className="text-center text-muted mb-5">
            Manage your Watchlist and get ideas for your next movie
          </p>

          <Movielist />
        </div>
      </div>
    </>
  )
}

export default App
