import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScrapeErrorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(cardId?: string) {
    if (cardId) {
      return this.prisma.scrapeError.findMany({
        where: { cardId },
        orderBy: { createdAt: 'desc' },
      });
    }
    return this.prisma.scrapeError.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const error = await this.prisma.scrapeError.findUnique({ where: { id } });
    if (!error) {
      throw new NotFoundException(`ScrapeError with id ${id} not found`);
    }
    return error;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.scrapeError.delete({ where: { id } });
  }

  async removeByCardId(cardId: string) {
    return this.prisma.scrapeError.deleteMany({ where: { cardId } });
  }

  async create(data: { cardId: string; url: string; error: string; details?: string }) {
    return this.prisma.scrapeError.create({ data });
  }
}