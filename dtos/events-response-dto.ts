import { EVENT_CERTIFICATE } from "@/enum/event-certificate.enum";
import { EVENT_STATUS } from "@/enum/event-status.enum";

export class EventDistanceDto {
  distance?: number;
  complexDistance?: string;
  eventPrice?: number;
  eventLimit?: number;
}

export class EventDto {
  id: number;
  eventName: string;
  eventInfo?: string;
  eventLink?: string;
  eventStatus: EVENT_STATUS;
  eventCertificate?: EVENT_CERTIFICATE;
  eventDate: string;
  eventTime?: string;
  location?: string;
  distances: EventDistanceDto[];
  agent?: string;
  entryIsEnd: boolean;
  entryStartDate?: string;
  entryEndDate?: string;
}

export class EventsResponseDto {
  totalCount: number;
  events: EventDto[];
}
