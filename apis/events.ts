import axios from "axios";
import { SearchParamsDto } from "@/dtos/search-param-dto";
import { EventDto, EventsResponseDto } from "@/dtos/events-response-dto";

export const getEvents = async (params :SearchParamsDto = null): Promise<EventsResponseDto> => {
  return await axios.get('https://marathontw.bibiota.com/events', {
    params,
  }).then((response): EventsResponseDto => {
    const eventDtos :EventDto[] = response.data.data.events.map((event: EventDto, i) => {
      event.id = i + 1;
      return event;
    });
    return {
      events: eventDtos,
      totalCount: response.data.data.totalCount,
    }
  }).catch((error) => {
    throw error;
  });
}
