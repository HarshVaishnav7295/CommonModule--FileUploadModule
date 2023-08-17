import { ApiProperty } from "@nestjs/swagger";

export class IMultipleFileUpload{
    @ApiProperty({example:"true"})
    success:boolean
    @ApiProperty({example:[
        {
            name:"zys.img",
            url:"http://127.0.0.1:8000/zys.img"
        },
        {
            name:"abc.img",
            url:"http://127.0.0.1:8000/abc.img"
        }
    ]})
    urls:{
        name:string,
        url:string
    }[]
}