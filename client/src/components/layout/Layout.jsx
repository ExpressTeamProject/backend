import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import './Layout.css'

const Layout = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Layout;