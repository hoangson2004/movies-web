import { Controller, Get, Param, Req, Res, HttpStatus } from '@nestjs/common';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import type { Request, Response } from 'express';

@Controller('api/stream')
export class StreamController {
  @Get(':filename')
  streamVideo(
    @Param('filename') filename: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const videoPath = join(process.cwd(), 'uploads', 'videos', filename);
    const stat = statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (!range) {
      res.setHeader('Content-Length', fileSize);
      res.setHeader('Content-Type', 'video/mp4');
      const videoStream = createReadStream(videoPath);
      videoStream.pipe(res);
      return;
    }

    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, fileSize - 1);
    const contentLength = end - start + 1;

    const headers = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(HttpStatus.PARTIAL_CONTENT, headers);
    const videoStream = createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
  }
}
