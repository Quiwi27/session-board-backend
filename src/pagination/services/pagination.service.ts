import { Injectable } from '@nestjs/common';
import { PageMetaDto } from '../dtos/page-meta.dto';
import { PageDto } from '../dtos/page.dto';
import { PaginableRequestDto } from '../dtos/paginable.request.dto';

@Injectable()
export class PaginationService {
  public getSkip(paginableRequestDto: PaginableRequestDto): number {
    const { page = 1, limit = 10 } = paginableRequestDto;

    return (page - 1) * limit;
  }

  public create<T>(entities: T[], paginableRequestDto: PaginableRequestDto, totalItemCount: number): PageDto<T> {
    const { page = 1, limit = 10 } = paginableRequestDto;
    const meta = this.getPageMeta(page, limit, totalItemCount);

    return { items: entities, meta };
  }

  public getPageMeta(page: number, limit: number, totalItemCount: number): PageMetaDto {
    const totalPageCount = Math.ceil(totalItemCount / limit);
    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPageCount;

    return {
      page,
      take: limit,
      totalItemCount,
      totalPageCount,
      hasPreviousPage,
      hasNextPage,
    };
  }
}
