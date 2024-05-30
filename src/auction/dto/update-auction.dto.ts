import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateAuctionDto } from './create-auction.dto';
import { AuctionType } from 'src/products/entities/auction.entity';

export class UpdateAuctionDto extends PartialType(CreateAuctionDto) {
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

  @IsString()
  productId?: string;

  @IsEnum(AuctionType)
  auctionType?: string;
}
