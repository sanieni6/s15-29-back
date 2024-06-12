import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
// import { AuctionType } from '../../products/entities/auction.entity';

export class UpdateTransactionDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsNumber()
  initialBid?: number;

  @IsDate()
  startDate?: string;

  @IsDate()
  endDate?: string;

  @IsEnum(['traditional auctions', 'direct purchase', 'judicial auctions'])
  transactionType?: string;

  @IsUUID()
  productId?: string;

  // @IsUUID()
  // orderId?: string;
}
