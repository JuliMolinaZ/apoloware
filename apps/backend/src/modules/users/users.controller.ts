// src/users/users.controller.ts
import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from '../../auth/dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: diskStorage({
        destination: './uploads', // Asegúrate de que la carpeta exista
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async updateUser(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (file) {
      updateUserDto.profileImage = file.filename;
    }
    const updatedUser = await this.usersService.updateUser(id, updateUserDto);
    return updatedUser;
  }
}
