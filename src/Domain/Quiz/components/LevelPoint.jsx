const LevelPoint = ({ level }) => {
  return (
    <div>
      <div>{level}</div>
      <div>100p</div>
      {/* 메모: 나중에 서버 연결할 때 난이도에 맞춰서 포인트 매핑하기 */}
    </div>
  );
};
export default LevelPoint;
