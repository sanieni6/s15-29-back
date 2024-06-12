import { PartialType } from '@nestjs/swagger';
import { CreatePaymentOrderDto } from './create-payment-order.dto';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdatePaymentOrderDto extends PartialType(CreatePaymentOrderDto) {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsBoolean()
  isPaid?: boolean;

  @IsOptional()
  @IsDate()
  paidAt?: Date;

  @IsNotEmpty()
  @IsNumber()
  tax?: number;

  @IsNotEmpty()
  @IsNumber()
  subTotal?: number;

  @IsNotEmpty()
  @IsNumber()
  total?: number;

  @IsOptional()
  @IsString()
  paymentId?: string;
}
