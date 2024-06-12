import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateUserAuctionDto {
  @IsNotEmpty()
  @IsNumber()
  valueBid: number;

  @IsOptional()
  @IsDate()
  hourBid: Date;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  transactionId: string;
}
