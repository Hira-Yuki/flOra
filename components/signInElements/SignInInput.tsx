export default function SignInInput({
  value,
  onChange,
  placeholder,
  type,
  id,
}) {
  return (
    <input
      id={id}
      className="border border-gray-300 rounded-badge px-4 py-3 w-full"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}
