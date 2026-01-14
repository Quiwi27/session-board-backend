import { Injectable } from '@nestjs/common';
import { PageMetaDto } from '../dtos/page-meta.dto';
import { PageDto } from '../dtos/page.dto';

@Injectable()
export class PaginationService {
  public getSkip(page: number, limit: number): number {
    return (page - 1) * limit;
  }

  public create<T>(entities: T[], page: number, limit: number): PageDto<T> {
    const totalItemCount = entities.length;
    const meta = this.getPageMeta(page, limit, totalItemCount);
    const paginatedEntities = entities.slice(this.getSkip(page, limit), this.getSkip(page, limit) + limit);

    return { items: paginatedEntities, meta };
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
