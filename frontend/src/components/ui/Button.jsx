export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';
  const variants = {
    primary: 'bg-primary text-white shadow-sm hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-white text-slate-700 ring-1 ring-slate-300 hover:bg-slate-100 focus:ring-slate-300',
    danger: 'bg-rose-600 text-white shadow-sm hover:bg-rose-700 focus:ring-rose-500',
    success: 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 focus:ring-emerald-500',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
