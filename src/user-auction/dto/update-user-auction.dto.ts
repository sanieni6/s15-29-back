import { PartialType } from '@nestjs/swagger';
import { CreateUserAuctionDto } from './create-user-auction.dto';

export class UpdateUserAuctionDto extends PartialType(CreateUserAuctionDto) {}
