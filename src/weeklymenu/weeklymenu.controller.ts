import { Body, Controller, Get, Post, Patch, Delete, UsePipes, ValidationPipe, Param, NotFoundException, Put, Req, UnauthorizedException } from '@nestjs/common';
import { WeeklymenuService } from './weeklymenu.service'
import { UploadWeeklymenuDto } from './dto/UploadWeeklymenu.dto';
import { UpdateWeeklymenuDto } from './dto/UpdateWeeklymenu.dto';
import { ApiForbiddenResponse, ApiResponse } from '@nestjs/swagger';

@Controller('weeklymenu') //decoraters
export class WeeklymenuController {
    constructor(private weeklymenuService: WeeklymenuService) { }

    @Get('/getAll')
    @ApiResponse({ status: 200, description: 'The weeklymenu has been successfully returned.'})
    @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
    async getAllWeeklymenus() {
        return await this.weeklymenuService.getAllWeeklymenus();
    }

    @Get('/:id')
    @ApiResponse({ status: 200, description: 'The weeklymenu has been successfully returned.'})
    @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
    async getWeeklymenu(@Param('id') id: number) {
        const weeklymenu = await this.weeklymenuService.getWeeklymenu(id);
        if (!weeklymenu) {
            throw new NotFoundException('Weekly Menu not Found')
        }
        return weeklymenu ;
    }

    @Post(`/upload/:adminId`)
    @ApiResponse({ status: 200, description: 'The weeklymenu has been successfully uploaded.'})
    @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
    @UsePipes(ValidationPipe)
    async createWeeklymenu(@Param("adminId") adminId : number, @Body() weeklymenuData: UploadWeeklymenuDto) {
            weeklymenuData.admin = adminId
            return await this.weeklymenuService.createNewWeeklymenu(weeklymenuData)
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    @ApiResponse({ status: 200, description: 'The weeklymenu has been successfully updated.'})
    @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
    async updateWeeklymenu(@Param('id') id: number, @Body() weeklymenuData: UpdateWeeklymenuDto) {
            return await this.weeklymenuService.updateWeeklymenu(id, weeklymenuData);
    }

    @Delete('/:id')
    @ApiResponse({ status: 200, description: 'The weeklymenu has been successfully deleted.'})
    @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
    async deleteWeeklymenu(@Param('id') id: number) {
            return this.weeklymenuService.deleteWeeklymenu(id);
    }
}
