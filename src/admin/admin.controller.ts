import { Controller, Post, Body, BadRequestException, Res, ValidationPipe, UsePipes } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterAdminDto } from './dto/RegisterAdmin.dto';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,private jwtService: JwtService) { }
  @Post('register')
  @ApiCreatedResponse({ description: 'Admin Registration' })
  @ApiBody({ type: RegisterAdminDto })
  @UsePipes(ValidationPipe)
  async register(@Body() body: RegisterAdminDto,) {
    const hashedPassword = await bcrypt.hash(body.password, 12);
    const admin = await this.adminService.create(
        body.email,
        hashedPassword,
    );
    delete admin.password;
    return admin;
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const admin = await this.adminService.findOne({ email });
    if (!admin) {
      throw new BadRequestException('Invalid Credentials');
    }
    if (!await bcrypt.compare(password, admin.password)) {
      throw new BadRequestException('Invalid Credentials');
    }
    const jwt = await this.jwtService.signAsync({ id: admin.id });
    return {
      jwt:jwt,
      id:admin.id,
      email:admin.email,
      message: 'Admin Logged In Successfully'
    };
  }

}