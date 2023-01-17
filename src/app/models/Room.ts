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
  id!: number;
  name!: string;
  capacities!: LayoutCapacity[];
  location!: string;

}
