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
  id?: string;

  @IsNotEmpty()
  @IsNumber()
  initialBid: number;

  @IsNotEmpty()
  @IsDate()
  startDate: string;

  @IsNotEmpty()
  @IsDate()
  endDate: string;

  @IsNotEmpty()
  @IsEnum(['traditional auctions', 'direct purchase', 'judicial auctions'])
  auctionType: string;

  @IsNotEmpty()
  @IsUUID()
  productId: string;

  // @IsNotEmpty()
  // @IsUUID()
  // orderId: string;
}