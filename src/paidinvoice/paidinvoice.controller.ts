import { Body, Controller, Get, Post, Delete, UsePipes, ValidationPipe, Param, NotFoundException, Put, Req, UnauthorizedException, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { PaidinvoiceService } from './paidinvoice.service'
import { UploadPaidinvoiceDto } from './dto/UploadPaidinvoice.dto';
import { UpdatePaidinvoiceDto } from './dto/UpdatePaidinvoice.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-uploading.utils';
import { ApiBearerAuth, ApiForbiddenResponse, ApiResponse } from '@nestjs/swagger';

@Controller('paidinvoice') 
export class PaidinvoiceController {
    constructor(private paidinvoiceService: PaidinvoiceService) { }

    @Get('/getAll')
    @ApiResponse({ status: 200, description: 'The paid invoices has been successfully returned.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getAllPaidinvoices() {
        const books = await this.paidinvoiceService.getAllPaidinvoices();
        return books;
    }

    @Get('getPaidinvoicebyClientId/:id')
    @ApiResponse({ status: 200, description: 'The paid invoice of this client has been successfully returned.'})
    @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
    async getPaidinvoicebyClientId(@Param('id') id: number) {
        const paidinvoice = await this.paidinvoiceService.getPaidinvoicebyCLientId(id);
        if (!paidinvoice) {
            throw new NotFoundException('Paid Invoice not Found')
        }
        return paidinvoice;
    }
    
    @Get('/:id')
    @ApiResponse({ status: 200, description: 'The paid invoice has been successfully returned.'})
    @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
    async getPaidinvoice(@Param('id') id: number) {
        const paidinvoice = await this.paidinvoiceService.getPaidinvoice(id);
        if (!paidinvoice) {
            throw new NotFoundException('Paid Invoice not Found')
        }
        return paidinvoice;
    }
   
    @Post('/upload/:clientId')
    @ApiResponse({ status: 200, description: 'The paid invoice has been successfully uploaded.'})
    @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
    @UseInterceptors(FileInterceptor("paidreceipts", {
        storage: diskStorage({
          destination: './files',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }))
    @UsePipes(ValidationPipe)
    async createPaidinvoice(@Param("clientId") clientId : number, @UploadedFile() file : Express.Multer.File,@Body() paidinvoiceData: UploadPaidinvoiceDto) {
            paidinvoiceData.client=clientId
            paidinvoiceData.receipt=file.filename
            return await this.paidinvoiceService.createNewPaidinvoice(paidinvoiceData);
    }
  
    @Put('/:id')
    @ApiResponse({ status: 200, description: 'The paidinvoice has been successfully updated.'})
    @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
    @UseInterceptors(FileInterceptor("paidreceipts", {
        storage: diskStorage({
          destination: './files',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }))
    @UsePipes(ValidationPipe)
    async updatePaidinvoices(@Param('id') id: number,@UploadedFile() file : Express.Multer.File,@Body() paidinvoiceData: UpdatePaidinvoiceDto) {
            paidinvoiceData.receipt=file.filename
            return await this.paidinvoiceService.updatePaidinvoice(id,paidinvoiceData);
    }

    @Delete('/:id')
    @ApiResponse({ status: 200, description: 'The paidinvoice has been successfully deleted.'})
    @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
    async deletePaidinvoice(@Param('id') id: number) {
        return this.paidinvoiceService.deletePaidinvoice(id);
    }
    
    @Get('getImg/:imgpath')
    @ApiResponse({ status: 200, description: 'The image has been successfully returned.'})
    @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
      return res.sendFile(image, { root: './files' });
    }
}