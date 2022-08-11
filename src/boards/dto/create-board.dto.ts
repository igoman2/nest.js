// dto는 왜 있을까?
// 그냥 서비스-컨트롤러 데이터 통신에 필요한 값에 타입을 넣어주기 위해
// 코드 안정화, 타입, 유지보수
export class CreateBoardDto {
  title: string;
  description: string;
}
