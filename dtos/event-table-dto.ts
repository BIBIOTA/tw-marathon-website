import { EventDistanceTagDto } from "./event-distance-tag-dto";

export class EventTableDto {
  id: number;
  eventDate: string
  eventTime?: string
  eventName: string
  location: string
  distances: EventDistanceTagDto[]
  agent?: string
  entryDateRange?: string
}
