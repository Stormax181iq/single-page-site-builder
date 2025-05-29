export default function ActionButton({ style = 1, children, className, ...props }) {
  return (
    <button
      className={`bg-accent-${style} font-medium p-2 rounded-3xl text-black mx-1 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
