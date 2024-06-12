import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateUserAuctionDto {

    @IsOptional()
    @IsUUID()
    id?: string;

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    transactionId: string;

    @IsNotEmpty()
    @IsNumber()
    valueBid: number;

    @IsOptional()
    @IsString()
    hourBid?: string;

}
