import {
  Controller,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { validate as isUuid } from 'uuid';
import { JwtAuthGuard } from '../modules/auth/guard/jwt-auth.guard';

import {
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('uploadImage/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadImage(
    @Param('id') rawId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000, // 200kb
            message: 'La imagen debe pesar menos de 200kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/i,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const id = rawId.trim();

    if (!isUuid(id)) {
      throw new BadRequestException('El ID no es un UUID válido');
    }

    return this.filesService.uploadProductImage(id, file);
  }
}
