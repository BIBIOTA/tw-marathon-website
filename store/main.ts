import { defineStore } from 'pinia';
import dayjs from 'dayjs';
import type { EventDto } from '@/dtos/events-response-dto';
import type { EventTableDto } from '@/dtos/event-table-dto';
import { getEventDistancesTags, getEventEntryDateRange } from '@/libs/event-helper';
import type { SearchParamsDto } from '@/dtos/search-param-dto';

export const useStore = defineStore('Main', {
  state: () => ({
    isApiLoading: false,
    visibleModal: false,
    eventModal: null as EventDto | null,
    keywords: '',
    distances: [] as string[],
    onlyRegistering: false,
    dateRange: null as [Date, Date] | null,
    events: [] as EventDto[],
    totalCount: 0,
  }),
  getters: {
    getEvents: (state): EventDto[] => state.events,
    getEventsToTableData: (state): EventTableDto[] => {
      if (state.events.length === 0) return [];

      return state.events.map((event: EventDto): EventTableDto => ({
        id: event.id,
        eventDate: event.eventDate,
        eventTime: event.eventTime,
        eventName: event.eventName + (event.eventInfo ? ` (${event.eventInfo})` : ''),
        location: event.location,
        distances: getEventDistancesTags(event.distances),
        agent: event.agent,
        entryDateRange: getEventEntryDateRange(event.entryIsEnd, event.entryStartDate, event.entryEndDate),
      }));
    },
    getKeywords: (state): string | null => state.keywords !== '' ? state.keywords : null,
    getDistances: (state): string[] | null => state.distances.length > 0 ? state.distances : null,
    getOnlyRegistering: (state): boolean => state.onlyRegistering,
    getDateRange: (state): string[] | null =>
      state.dateRange
        ? state.dateRange.map((date: Date) => dayjs(date).format('YYYY-MM-DD'))
        : null,
    getVisibleModal: (state): boolean => state.visibleModal,
  },
  actions: {
    setSearchParams(dto: SearchParamsDto): void {
      this.keywords = dto.keywords;
      this.distances = dto.distances;
      this.onlyRegistering = dto.onlyRegistering ?? false;
      this.dateRange = dto.dateRange;
    },
    setIsApiLoading(status: boolean): void {
      this.isApiLoading = status;
    },
    setTotalCount(totalCount: number): void {
      this.totalCount = totalCount;
    },
    setEvents(events: EventDto[]): void {
      this.events = events;
    },
    setVisiableModal(status: boolean): void {
      this.visibleModal = status;
    },
    setEventModal(eventModal: EventDto | null): void {
      this.eventModal = eventModal;
    },
  },
});
