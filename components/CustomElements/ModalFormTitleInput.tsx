export default function ModalFormTitleInput({ value, onChange }) {
  return (
    <input
      value={value}
      type="text"
      placeholder="제목 입력"
      className="pl-3 mt-6 mb-4 text-[32px] w-auto font-bold focus:outline-none"
      onChange={onChange}
    />
  );
}
