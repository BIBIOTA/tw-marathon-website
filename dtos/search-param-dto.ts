export type EntryStatus = 'all' | 'registering' | 'notEnded';

export class SearchParamsDto {
  keywords?: string;
  distances?: string[];
  dateRange?: string[];
  entryStatus?: EntryStatus;
}
