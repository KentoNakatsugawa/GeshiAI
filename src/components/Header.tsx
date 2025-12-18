import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm border-b border-border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <h1 className="text-xl font-bold text-text-primary">
              Geshi AI
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-primary hover:bg-bg-light'
              }`}
            >
              商談テーブル
            </Link>
            <Link
              to="/matrix"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                location.pathname === '/matrix'
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-primary hover:bg-bg-light'
              }`}
            >
              商談マトリックス
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
