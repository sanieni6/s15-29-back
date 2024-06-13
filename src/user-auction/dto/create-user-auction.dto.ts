import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateUserAuctionDto {

    @IsOptional()
    @IsUUID()
    id?: string;

    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsUUID()
    transactionId: string;

    @IsNotEmpty()
    @IsNumber()
    valueBid: number;

    @IsOptional()
    @IsDate()
    hourBid?: string;

}
