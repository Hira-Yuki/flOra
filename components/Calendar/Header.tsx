export default function Header(props) {
  const { label } = props;
  const dayShort = label.charAt(0); // 요일의 첫 글자만 표시
  return (
    <div className="text-center font-medium text-lg text-mainText">{label}</div>
  );
}
