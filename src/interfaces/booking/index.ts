import { UserInterface } from 'interfaces/user';
import { RoomInterface } from 'interfaces/room';
import { GetQueryInterface } from 'interfaces';

export interface BookingInterface {
  id?: string;
  start_date: any;
  end_date: any;
  user_id: string;
  room_id: string;
  total_price: number;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  room?: RoomInterface;
  _count?: {};
}

export interface BookingGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  room_id?: string;
}
