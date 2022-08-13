import { IsNotEmpty } from 'class-validator';
// dto는 왜 있을까?
// 그냥 서비스-컨트롤러 데이터 통신에 필요한 값에 타입을 넣어주기 위해
// 코드 안정화, 타입, 유지보수
// dto는 대부분 인터페이스보단 클래스로 작성되는데, 클래스는 ts->js 컴파일 돼도 원형 코드가 남아있지만
// 인터페이스는 컴파일 하면 원형 코드가 사라지기 때문에 Nest가 런타임에 참조할 수 없게됨
export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
