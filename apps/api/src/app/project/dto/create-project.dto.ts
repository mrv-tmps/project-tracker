import { IsBoolean, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  readonly name: string;

  @IsBoolean()
  readonly is_active: boolean;

  @IsString()
  readonly created_by: string;
}
