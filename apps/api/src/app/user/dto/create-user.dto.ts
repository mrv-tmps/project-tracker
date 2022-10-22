import { Role } from '@project-tracker/enums';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
export class CreateUserDto {
  /*
   * @IsEmail()
   * readonly email: string;
   */

  /*
   * @IsOptional() @IsString()
   * readonly firebase_id?: string;
   */

  /*
   * @IsString()
   * readonly first_name: string;
   */

  /*
   * @IsString()
   * readonly last_name: string;
   */

  /*
   * @IsOptional()
   * @IsEnum(Role)
   * readonly role?: Role;
   */
}
