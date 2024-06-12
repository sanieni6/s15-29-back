import { Test, TestingModule } from '@nestjs/testing';
import { UserAuctionController } from './user-auction.controller';

describe('UserAuctionController', () => {
  let controller: UserAuctionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAuctionController],
    }).compile();

    controller = module.get<UserAuctionController>(UserAuctionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
