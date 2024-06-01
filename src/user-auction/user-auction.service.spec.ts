import { Test, TestingModule } from '@nestjs/testing';
import { UserAuctionService } from './user-auction.service';

describe('UserAuctionService', () => {
  let service: UserAuctionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAuctionService],
    }).compile();

    service = module.get<UserAuctionService>(UserAuctionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
