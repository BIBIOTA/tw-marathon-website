import { EVENT_CERTIFICATE } from "@/enum/event-certificate.enum";
import { EVENT_STATUS } from "@/enum/event-status.enum";

export class EventDistanceDto {
  distance?: Number;
  complexDistance?: String;
  eventPrice?: Number;
  eventLimit?: Number;
}

export class EventDto {
  id: Number;
  eventName: String;
  eventInfo?: String;
  eventLink?: String;
  eventStatus: EVENT_STATUS;
  eventCertificate?: EVENT_CERTIFICATE;
  eventDate: String;
  eventTime?: String;
  location?: String;
  distances: EventDistanceDto[];
  agent?: String;
  entryIsEnd: Boolean;
  entryStartDate?: String;
  entryEndDate?: String;
}

export class EventsResponseDto {
  totalCount: Number;
  events: EventDto[];
}