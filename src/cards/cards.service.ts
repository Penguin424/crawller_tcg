import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCardDto, UpdateCardDto } from "./dto/create-card.dto";

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [cards, total] = await Promise.all([
      this.prisma.card.findMany({ skip, take: limit }),
      this.prisma.card.count(),
    ]);
    return {
      data: cards,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const card = await this.prisma.card.findUnique({ where: { id } });
    if (!card) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }
    return card;
  }

  async create(dto: CreateCardDto) {
    return this.prisma.card.create({ data: dto });
  }

  async update(id: string, dto: UpdateCardDto) {
    await this.findOne(id);
    return this.prisma.card.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.card.delete({ where: { id } });
  }
}
