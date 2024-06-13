import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserAuctionService } from './user-auction.service';
import { CreateUserAuctionDto } from './dto/create-user-auction.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('user-auction')
@ApiTags('user-auctions')
export class UserAuctionController {
  constructor(private readonly userAuctionService: UserAuctionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new auction' })
  create(
    @Body() createUserAuctionDto: CreateUserAuctionDto,
    @Req() request: Request & { user: { userId: string } },
  ) {
    if (!request.user) {
      throw new UnauthorizedException();
    }
    return this.userAuctionService.create(
      createUserAuctionDto,
      request.user.userId,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all the auctions',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all the auctions.',
  })
  findAll() {
    return this.userAuctionService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get auction by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Return auction.',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userAuctionService.findOne(id);
  }
}
