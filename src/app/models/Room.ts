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
  static fromHttp(lc:LayoutCapacity){
    return new LayoutCapacity(lc.layout,lc.capacity);
  }
}

export class Room {
  id!: number;
  name!: string;
  capacities!: LayoutCapacity[];
  location!: string;
  static fromHttp(room:Room){
    const newRoom = new Room();
    newRoom.id = room.id;
    newRoom.name = room.name;
    newRoom.location = room.location;
    newRoom.capacities = new Array<LayoutCapacity>();
    for(let lc of room.capacities){
      newRoom.capacities.push(LayoutCapacity.fromHttp(lc));
    }
    return newRoom;
  }
}
