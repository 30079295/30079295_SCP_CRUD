import { BrowserRouter as Router, Route, Routes, Link } from "react-router";
import NavMenu from "./NavMenu";
import ItemDetail from "./ItemDetail";
import AdminPanel from "./AdminPanel";
import logo from "./assets/scp-logo.png";

function App() {
  return (
    <Router>
      <div className="main-page">

        {/* Top bar with the SCP Logo and a link to the Admin Panel */}
        <div className="top-bar">
          <div>

            {/* Links to the homepage when the logo is clicked */}
            <Link to="/">
              <img src={logo} alt="SCP Logo" className="scp-logo" />
            </Link>

          </div>

          {/* Button to open the Admin Panel */}
          <Link to="/admin" className="admin-button">
            Admin Panel
          </Link>
        </div>

        <Routes>

          {/* Home Page layout with a welcome message and instructions to select an SCP from the menu */}
          <Route
            path="/"
            element={
              <div className="content-layout">
                <NavMenu />
                <div className="content-panel">
                  <div className="welcome-screen">
                    <h1>Welcome to the SCP CRUD Application</h1>
                    <p>Select an SCP from the menu to view details.</p>
                  </div>
                </div>
              </div>
            }
          />

          {/* Page for viewing a single SCP entry with the ID in the URL to know which SCP to load from the database */}
          <Route path="/item/:id" element={<ItemDetail />} />

          {/* Admin Panel page for managing SCP records in the database */}
          <Route path="/admin" element={<AdminPanel />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
