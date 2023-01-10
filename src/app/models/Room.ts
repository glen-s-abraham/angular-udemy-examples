export enum Layout {
  'THEATER' = 'theater',
  'USHAPE' = 'u-shape',
  'BOARD' = 'Board Meeting',
}

export class LayoutCapacity {
  layout: Layout;
  capacity: number;
  constructor(layout: Layout, capacity: number) {
    (this.layout = layout), (this.capacity = capacity);
  }
}

export class Room {
  id: number;
  name: string;
  capacities: LayoutCapacity[];
  location: string;
  constructor(id: number, name: string, capacities: LayoutCapacity[],location:string) {
    this.id = id;
    this.name = name;
    this.capacities = capacities;
    this.location = location;
  }
}
