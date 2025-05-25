export default function ActionButton({ style = 1, children, ...props }) {
  return (
    <button
      className={`bg-accent-${style} p-2 rounded-3xl text-black mx-1`}
      {...props}
    >
      {children}
    </button>
  );
}
