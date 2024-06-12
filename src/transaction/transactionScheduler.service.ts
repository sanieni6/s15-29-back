import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Transaction } from './entities/transaction.entity';
import { UserAuctionService } from 'src/user-auction/user-auction.service';

@Injectable()
export class TransactionSchedulerService {
  private readonly logger = new Logger(TransactionSchedulerService.name);

  constructor(
    @InjectModel(Transaction) private transactionModel: typeof Transaction,
    private readonly userAuctionService: UserAuctionService,
  ) {}

  @Cron('*/5 * * * * *') // Runs every 5 seconds for demonstration purposes
  async handleCron() {
    const now = new Date();

    try {
      // Find all active auctions that have ended
      const endedAuctions = await this.transactionModel.findAll({
        where: {
          endDate: {
            [Op.lt]: now,
          },
          active: true,
        },
      });

      for (const transaction of endedAuctions) {
        try {
          const highestBid = await this.userAuctionService.highestBid(
            transaction.id,
          );

          if (highestBid) {
            transaction.winnerId = highestBid.user?.id;
          }

          transaction.active = false;
          await transaction.save();
        } catch (error) {
          this.logger.error(
            `Failed to process transaction ${transaction.id}: ${error.message}`,
            error.stack,
          );
        }
      }
    } catch (error) {
      this.logger.error(
        `Failed to retrieve ended auctions: ${error.message}`,
        error.stack,
      );
    }
  }
}
