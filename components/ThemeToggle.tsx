
const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="w-12 h-7 rounded-full bg-bg-secondary border border-border-color flex items-center p-1 transition-colors duration-300"
    >
      <div
        className={`w-5 h-5 rounded-full bg-accent flex items-center justify-center transform transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
        }`}
      >
        {theme === 'light' ? <SunIcon /> : <MoonIcon />}
      </div>
    </button>
  );
};
