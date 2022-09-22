import { EventDistanceTagDto } from "./event-distance-tag-dto";

export class EventTableDto {
  id: Number;
  eventDate: String
  eventTime?: String
  eventName: String
  location: String
  distances: EventDistanceTagDto[]
  agent?: String
  entryDateRage?: String
}