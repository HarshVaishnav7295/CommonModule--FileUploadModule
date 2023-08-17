import { ApiProperty } from "@nestjs/swagger";

export class IFileUpload{
    @ApiProperty({example:"true"})
    success:boolean
    @ApiProperty({example:"www.google.com"})
    url:string
}