import {
  IsString,
  IsEmail,
  MaxLength,
  IsStrongPassword,
  // IsStrongPasswordOptions,
  IsNotEmpty,
} from "class-validator";
import { Match } from "common-credit-scoring";

type IsStrongPasswordOptions = {
  minLength: number;
  minLowercase: number;
  minUppercase: number;
  minNumbers: number;
  minSymbols: number;
};

const strongPasswordOptions: IsStrongPasswordOptions = {
  minLength: 8,
  minLowercase: 0,
  minUppercase: 0,
  minNumbers: 0,
  minSymbols: 0,
};

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty({ message: "Full Name Required" })
  @MaxLength(255)
  public fullname: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty({ message: "Email Required" })
  @MaxLength(255)
  public email: string;

  @IsString()
  @IsNotEmpty({ message: "Password Required" })
  @MaxLength(25)
  @IsStrongPassword(strongPasswordOptions)
  public password: string;

  @IsString()
  @IsNotEmpty({ message: "Password Confirmation Required" })
  @Match("password")
  public password_confirmation: string;
}

export class LoginUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty({ message: "Email Required" })
  @MaxLength(255)
  public email: string;

  @IsString()
  @IsNotEmpty({ message: "Password Required" })
  @MaxLength(25)
  public password: string;
}
