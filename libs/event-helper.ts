import { EventDistanceDto, EventDto } from "@/dtos/events-response-dto";
import { EventDistanceTagDto } from "@/dtos/event-distance-tag-dto";

export const getEventEntryDateRange = (entryIsEnd: Boolean, entryStart?: String, entryEnd?: String): String => {
  if (entryIsEnd) {
    return '已截止';
  }

  if (!entryStart && !entryEnd) {
    return null;
  }

  if (entryStart && entryEnd) {
    return `${entryStart} ~ ${entryEnd}`;
  }

  if (entryStart) {
    return `${entryStart} ~`;
  }

  if (entryEnd) {
    return `~ ${entryEnd}`;
  }

  return null;
}

const getDistanceColor = (distance: Number): String => {
  if (distance < 21) {
    return 'green';
  }

  if (distance < 42) {
    return 'orange';
  }

  if (distance < 45) {
    return 'purple';
  }

  return 'magenta';
}

export const getEventDistancesTags = (distances: EventDistanceDto[]): EventDistanceTagDto[] => {
  if (distances.length === 0) {
    return [];
  }
  return distances.map((distance: EventDistanceDto): EventDistanceTagDto => {
    if (distance.distance) {
      const color = getDistanceColor(distance.distance);
      return {
        color,
        distance: `${distance.distance}K`,
      };
    }

    if (distance.complexDistance) {
      const color = 'gold';
      return {
        color,
        distance: `${distance.complexDistance}`,
      };
    }

    return null;
  });
}

export const getEventCertificate = (event: EventDto) => {
  if (event) {
      switch (event.eventCertificate) {
          case 1:
              return 'IAAF認證賽事';
          case 2:
              return 'AIMS認證賽事';
          case 3:
              return '賽事路線經IAAF/AIMS測量員丈量';
          default:
              return '-';
      }
  }
  return '-';
};