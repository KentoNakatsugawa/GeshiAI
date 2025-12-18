import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm border-b border-border-accent">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-base sm:text-lg">G</span>
            </div>
            <h1 className="text-base sm:text-xl font-bold text-text-primary hidden xs:block">
              Geshi AI
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1 sm:gap-4">
            <Link
              to="/"
              className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-primary hover:bg-bg-light'
              }`}
            >
              商談テーブル
            </Link>
            <Link
              to="/matrix"
              className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                location.pathname === '/matrix'
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-primary hover:bg-bg-light'
              }`}
            >
              マトリックス
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
