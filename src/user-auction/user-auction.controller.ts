import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UserAuctionService } from './user-auction.service';
import { CreateUserAuctionDto } from './dto/create-user-auction.dto';

@Controller('user-auction')
export class UserAuctionController {
  constructor(private readonly userAuctionService: UserAuctionService) {}

  @Post()
  create(@Body() createUserAuctionDto: CreateUserAuctionDto) {
    return this.userAuctionService.create(createUserAuctionDto);
  }

  @Get()
  findAll() {
    return this.userAuctionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userAuctionService.findOne(id);
  }

  //   @Patch(':id')
  //   update(
  //     @Param('id') id: string,
  //     @Body() updateUserAuctionDto: UpdateUserAuctionDto,
  //   ) {
  //     return this.userAuctionService.update(+id, updateUserAuctionDto);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.userAuctionService.remove(+id);
  //   }
}
