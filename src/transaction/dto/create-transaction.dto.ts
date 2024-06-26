import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
// import { AuctionType } from '../../products/entities/auction.entity';

export class CreateTransactionDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  initialBid: number;

  @IsOptional()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsEnum(['Auction, Buy'])
  transactionType: string;

  @IsNotEmpty()
  @IsUUID()
  productId: string;

  // @IsNotEmpty()
  // @IsUUID()
  // orderId: string;
}
