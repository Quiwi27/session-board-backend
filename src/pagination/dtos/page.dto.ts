import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
  readonly items: T[];
  readonly meta: PageMetaDto;
}
