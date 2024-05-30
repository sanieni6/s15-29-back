import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AuctionType } from 'src/products/entities/auction.entity';

export class CreateAuctionDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  auctioneer: string;

  @IsNumber()
  initialBid: number;

  @IsNumber()
  currentBid: number;

  @IsString()
  currentBidClient: string;

  @IsString()
  productId: string;

  @IsEnum(AuctionType)
  auctionType: string;
}
