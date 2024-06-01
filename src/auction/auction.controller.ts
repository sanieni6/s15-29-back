import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auctions')
@ApiTags('auctions')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new auction' })
  @ApiBody({
    description: 'Create a new auction',
    schema: {
      example: {
        initialBid: 1000.5,
        startDate: '2024-06-01T00:00:00Z',
        endDate: '2024-06-10T00:00:00Z',
        productId: '004dd695-7b9f-4315-a65e-4595f60da51a',
        auctionType: [
          'traditional auctions',
          'direct purchase',
          'judicial auctions',
        ],
        userId: '15475d76-bf2e-43db-b537-5094ea408651',
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Return a new auction.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createAuctionDto: CreateAuctionDto) {
    return this.auctionService.create(createAuctionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all auctions' })
  @ApiResponse({ status: 200, description: 'Return all auctions.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.auctionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get auction by ID' })
  @ApiResponse({ status: 200, description: 'Return auction.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string) {
    return this.auctionService.findOne(id);
  }

  @Put(':id')
  @ApiBody({
    description: 'Update auction',
    schema: {
      example: {
        initialBid: 1000.5,
        startDate: '2024-06-01T00:00:00Z',
        endDate: '2024-06-10T00:00:00Z',
        productId: '004dd695-7b9f-4315-a65e-4595f60da51a',
        auctionType: [
          'traditional auctions',
          'direct purchase',
          'judicial auctions',
        ],
        userId: '15475d76-bf2e-43db-b537-5094ea408651',
      },
    },
  })
  @ApiOperation({ summary: 'Update an existing auction' })
  @ApiResponse({ status: 200, description: 'Returns the updated auction.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(@Param('id') id: string, @Body() updateAuctionDto: UpdateAuctionDto) {
    return this.auctionService.update(id, updateAuctionDto);
  }

  @Patch(':id')
  @ApiBody({
    description: 'Partial upgrade auction',
    schema: {
      example: {
        initialBid: 1000.5,
        startDate: '2024-06-01T00:00:00Z',
        endDate: '2024-06-10T00:00:00Z',
        productId: '004dd695-7b9f-4315-a65e-4595f60da51a',
        auctionType: [
          'traditional auctions',
          'direct purchase',
          'judicial auctions',
        ],
        userId: '15475d76-bf2e-43db-b537-5094ea408651',
      },
    },
  })
  @ApiOperation({ summary: 'Partially update an existing auction' })
  @ApiResponse({
    status: 200,
    description: 'Returns the partially updated auction.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  partialUpdate(
    @Param('id') id: string,
    @Body() updateAuctionDto: UpdateAuctionDto,
  ) {
    return this.auctionService.partialUpdate(id, updateAuctionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an auction' })
  @ApiResponse({
    status: 200,
    description: 'The auction has been successfully removed.',
  })
  @ApiResponse({ status: 404, description: 'Auction not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.auctionService.remove(id);
  }
}
