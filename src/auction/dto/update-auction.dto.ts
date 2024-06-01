import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
// import { AuctionType } from '../../products/entities/auction.entity';

export class UpdateAuctionDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  auctioneer?: string;

  @IsNumber()
  initialBid?: number;

  @IsNumber()
  currentBid?: number;

  @IsString()
  currentBidClient?: string;

  @IsUUID()
  productId?: string;

  @IsEnum(['traditional auctions', 'direct purchase', 'judicial auctions'])
  auctionType?: string;

  @IsUUID()
  userId?: string;
}
