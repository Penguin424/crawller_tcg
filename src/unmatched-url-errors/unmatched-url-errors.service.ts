import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UnmatchedUrlErrorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.unmatchedUrlError.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const error = await this.prisma.unmatchedUrlError.findUnique({ where: { id } });
    if (!error) {
      throw new NotFoundException(`UnmatchedUrlError with id ${id} not found`);
    }
    return error;
  }

  async findByUrl(url: string) {
    return this.prisma.unmatchedUrlError.findUnique({ where: { url } });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.unmatchedUrlError.delete({ where: { id } });
  }

  async removeByUrl(url: string) {
    return this.prisma.unmatchedUrlError.delete({ where: { url } });
  }

  async removeAll() {
    return this.prisma.unmatchedUrlError.deleteMany();
  }
}