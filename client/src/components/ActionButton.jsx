export default function ActionButton({
  style = 1,
  children,
  className,
  ...props
}) {
  return (
    <button
      style={{ backgroundColor: `var(--accent-${style})` }}
      className={`font-medium p-2 shadow-md/50 rounded-3xl text-black mx-1 cursor-pointer outline-none focus:ring-4 focus:ring-secondary ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
