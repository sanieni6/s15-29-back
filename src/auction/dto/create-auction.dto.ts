import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AuctionType } from '../../products/entities/auction.entity';

export class CreateAuctionDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsNotEmpty()
  @IsString()
  auctioneer: string;

  @IsNotEmpty()
  @IsNumber()
  initialBid: number;

  @IsNotEmpty()
  @IsNumber()
  currentBid: number;

  @IsNotEmpty()
  @IsString()
  currentBidClient: string;

  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsEnum(['traditional auctions', 'direct purchase', 'judicial auctions'])
  auctionType: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
