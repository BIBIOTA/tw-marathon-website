import { SearchParamsDto } from "@/dtos/search-param-dto";
import type { EntryStatus } from "@/dtos/search-param-dto";
import dayjs from "dayjs";

export const getSearchParamsDtoFromUrlQuery = (): SearchParamsDto => {
    const urlParams = new URLSearchParams(window.location.search);
    const dto = new SearchParamsDto();
    dto.keywords = getKeywordsFromUrlQuery(urlParams);
    dto.dateRange = getDateRangeFromUrlQuery(urlParams);
    dto.distances = getDistancesFromUrlQuery(urlParams);
    dto.entryStatus = getEntryStatusFromUrlQuery(urlParams);
    return dto;
}

export const setEventToUrlQuery = (params: SearchParamsDto) => {
    const url = new URL(window.location.href);
    url.searchParams.set('keywords', params.keywords);
    url.searchParams.set('distances', arrayToQueryString(params.distances));
    url.searchParams.set('dateRange', arrayToQueryString(params.dateRange));
    url.searchParams.set('entryStatus', params.entryStatus ?? 'all');
    window.history.pushState({}, '', url.toString());
};

const getKeywordsFromUrlQuery = (params: URLSearchParams): string|null => {
    const keywords = params.get('keywords');
    if (keywords === 'null') {
        return '';
    }

    return keywords;
}

const getDateRangeFromUrlQuery = (params: URLSearchParams): string[]|null => {
    const dateRange = params.get('dateRange');

    if (isValidateDateRangeQuery(dateRange)) {
        return dateRange.split(',');
    };

    return null;
}

const getDistancesFromUrlQuery = (params: URLSearchParams): string[] => {
    const distances = params.get('distances');

    if (distances === null) {
        return [];
    }

    if (!isValidDistancesQuery(distances)) {
        return [];
    }

    return distances.split(',');
}

const VALID_ENTRY_STATUSES: EntryStatus[] = ['all', 'registering', 'notEnded'];

const getEntryStatusFromUrlQuery = (params: URLSearchParams): EntryStatus => {
    const value = params.get('entryStatus') as EntryStatus;
    return VALID_ENTRY_STATUSES.includes(value) ? value : 'all';
}

const isValidDistancesQuery = (distances: string): boolean => {
    const distancesMap = ['MARATHON', 'HALF_MARATHON', 'TEN_K'];
    const arr = distances.split(',');

    for (const distance of arr) {
        if (!distancesMap.includes(distance)) {
            return false;
        }
    }

    return true;
}

const isValidateDateRangeQuery = (dateRange: string): boolean => {
    if (dateRange === null || dateRange.split(',').length === 0) {
        return false;
    }

    if (dateRange.split(',').length !== 2) {
        return false;
    }

    const [start, end] = dateRange.split(',');

    if (!isValidDateFormat(start) || !isValidDateFormat(end)) {
        return false;
    }

    if (dayjs(start).isAfter(dayjs(end))) {
        return false;
    }

    return true;
}

const isValidDateFormat = (date: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    return regex.test(date) && dayjs(date).isValid();
}

const arrayToQueryString = (arr?: string[]): string => {
    if (arr === null || arr.length === 0) {
        return 'null';
    }

    return arr.join(',');
}
