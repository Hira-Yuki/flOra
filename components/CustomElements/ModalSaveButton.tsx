export default function ModalSaveButton({ onClick }) {
  return (
    <button
      type="button"
      className="bg-floraGreen text-white px-5 py-[7px] rounded-[4px] hover:opacity-80 active:opacity-70 transform ease-in-out duration-300"
      onClick={onClick}
    >
      저장
    </button>
  );
}
