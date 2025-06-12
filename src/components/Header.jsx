import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/auth";
import { Button } from 'react-bootstrap';
import kirbyInhale from '../assets/kirby-inhale.gif'

const Header = () => {
  const { currentUser } = useAuth();
  const location = useLocation()
  const navigate = useNavigate()

  const handleHome = () => {
    if (location.pathname === '/quiz') {
      const confirmLeave = window.confirm("Are you sure you want to return to the homepage? Your quiz progress will be lost.")
      if (!confirmLeave) return
    }
    navigate('/')
  }

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <h2
          style={{ cursor: 'pointer', display: 'inline-block' }} onClick={handleHome}
        >
          {/* <img src={kirbyInhale} alt="Kirby Inhaling" style={{ height: 50 }} /> */}
          Kirby's Brain Buffet
        </h2>

        <div className="navbar-menu">
          {currentUser ? (
            <>
              <Link to="/profile" className="navbar-item">Profile</Link>
              <Button onClick={handleLogout} className="navbar-button">Logout</Button>
            </>
          ) : (
            <>
              <Link to="/register" className="navbar-item">Register</Link>
              <Link to="/login" className="navbar-button">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header