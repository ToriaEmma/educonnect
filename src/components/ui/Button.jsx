export const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm active:scale-95',
    secondary: 'bg-teal-500 text-white hover:bg-teal-600 shadow-sm active:scale-95',
    outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 active:scale-95',
    ghost: 'text-gray-600 hover:bg-gray-100',
    school: 'bg-slate-800 text-white hover:bg-slate-900 active:scale-95'
  };
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
