import { Body, Controller, Get, Post, Patch, Delete, UsePipes, ValidationPipe, Param, NotFoundException, Put, Req, UnauthorizedException } from '@nestjs/common';
import { PaymentService } from './payment.service'
import { CreatePaymentDto } from './dto/CreatePayment.dto';
import { UpdatePaymentDto } from './dto/UpdatePayment.dto';
import { ApiForbiddenResponse, ApiResponse } from '@nestjs/swagger';


@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) { }

    @Get('/getAll')
    @ApiResponse({ status: 200, description: 'The payment has been successfully returned.'})
    @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
    async getAllPayments() {
        return await this.paymentService.getAllPayments();
    }

    @Get('/:id')
    @ApiResponse({ status: 200, description: 'The payment has been successfully returned.'})
    @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
    async getPayment(@Param('id') id: number) {
        const payment = await this.paymentService.getPayment(id);
        if (!payment) {
            throw new NotFoundException('Payment not Found')
        }
        return payment;
    }

    @Post('/create/:clientId')
    @ApiResponse({ status: 200, description: 'The payment has been successfully created.'})
    @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
    @UsePipes(ValidationPipe)
    async createPayment(@Param("clientId") clientId : number, @Body() paymentData: CreatePaymentDto) {
            paymentData.client=clientId;
            return await this.paymentService.createNewPayment(paymentData)
    }

    @Put('/:id')
    @ApiResponse({ status: 200, description: 'The payment has been successfully updated.'})
    @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
    @UsePipes(ValidationPipe)
    async updatePayment(@Param('id') id: number, @Body() paymentData: UpdatePaymentDto) {
            return await this.paymentService.updatePayment(id, paymentData);
    }

    @Delete('/:id')
    @ApiResponse({ status: 200, description: 'The payment has been successfully deleted.'})
    @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
    async deletePayment(@Param('id') id: number) {
            return this.paymentService.deletePayment(id);
    }
}