import { PartialType } from '@nestjs/swagger';
import { CreatePaymentOrderDto } from './create-payment-order.dto';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class UpdatePaymentOrderDto extends PartialType(CreatePaymentOrderDto) {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsBoolean()
  isPaid?: boolean;

  @IsNotEmpty()
  @IsNumber()
  tax?: number;

  @IsNotEmpty()
  @IsNumber()
  subTotal?: number;

  @IsNotEmpty()
  @IsNumber()
  total?: number;
}
