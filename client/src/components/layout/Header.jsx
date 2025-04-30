import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Header.css'

const Header = () => {
  const { currentUser, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // 로그아웃 처리
  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  // 검색 처리
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/posts?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  // 모바일 메뉴 토글
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <div className="header-container">
        {/* 로고 */}
        <div className="logo">
          <Link to="/">커뮤니티</Link>
        </div>

        {/* 모바일 메뉴 버튼 */}
        <button className="mobile-menu-button" onClick={toggleMenu}>
          <span className="menu-icon"></span>
        </button>

        {/* 검색 폼 */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">검색</button>
        </form>

        {/* 네비게이션 */}
        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/posts">게시판</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/posts/create">글쓰기</Link>
                </li>
                <li className="dropdown">
                  <button className="dropdown-toggle">
                    {currentUser.nickname}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/profile">프로필</Link>
                    </li>
                    <li>
                      <Link to={`/posts/user/${currentUser.id}`}>내 게시글</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout}>로그아웃</button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">로그인</Link>
                </li>
                <li>
                  <Link to="/register">회원가입</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;