import {IsString, IsArray, IsOptional, IsNotEmpty} from 'class-validator';

export class CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  
  @IsString()
  @IsNotEmpty()
  height!: string;
  
  @IsString()
  @IsNotEmpty()
  mass!: string;
  
  @IsString()
  @IsNotEmpty()
  hair_color!: string;
  
  @IsString()
  @IsNotEmpty()
  skin_color!: string;
  
  @IsString()
  @IsNotEmpty()
  eye_color!: string;
  
  @IsString()
  @IsNotEmpty()
  birth_year!: string;
  
  @IsString()
  @IsNotEmpty()
  gender!: string;
  
  @IsString()
  @IsNotEmpty()
  homeworld!: string;
  
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  films?: string[];
  
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  species?: string[];
  
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  vehicles?: string[];
  
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  starships?: string[];
  
  @IsString()
  @IsOptional()
  url?: string;
}