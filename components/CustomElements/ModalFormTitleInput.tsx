export default function ModalFormTitleInput({
  value,
  onChange,
  fullWidth = false,
}) {
  return (
    <input
      value={value}
      type="text"
      placeholder="제목 입력"
      className={`pl-3 mt-6 mb-4 text-[32px] ${fullWidth ? 'w-full' : 'w-80'} font-bold focus:outline-none`}
      onChange={onChange}
    />
  );
}
