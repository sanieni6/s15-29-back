import { Test, TestingModule } from '@nestjs/testing';
import { PaymentOrdersController } from './payment-orders.controller';
import { PaymentOrdersService } from './payment-orders.service';

describe('PaymentOrdersController', () => {
  let controller: PaymentOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentOrdersController],
      providers: [PaymentOrdersService],
    }).compile();

    controller = module.get<PaymentOrdersController>(PaymentOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
