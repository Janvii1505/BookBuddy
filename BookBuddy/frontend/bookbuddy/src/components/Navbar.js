import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
    Cookies.remove('user_data');
    Cookies.remove('wishlist')  
    window.location.href = '/'; 
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light nav-color">
        <div className="container-fluid  justify-content-center">

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav me-auto navbar-dark text"> 
              <li><Link className="navbar-brand" to="/">
                <img src="logo.png" alt="Logo" style={{ width: '50px', height: '50px' }} /> 
              </Link></li>
              <li className="nav-item"><Link className="nav-link" to="/">HOME</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/books">BOOKS</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/profile">PROFILE</Link></li>
            </ul>
            <ul className="navbar-nav ms-auto text" style={{paddingBottom:8}}>
              {user ? (
                <li className="nav-item"><span className="nav-link" onClick={handleLogout}>LOGOUT ({user.username})</span></li>
              ) : (
                <>
                  <li className="nav-item" ><Link className="nav-link" to="/login">LOGIN</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/signup">SIGN UP</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>

  );
};

export default Navbar;
