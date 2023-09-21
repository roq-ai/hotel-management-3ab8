import { BookingInterface } from 'interfaces/booking';
import { HotelInterface } from 'interfaces/hotel';
import { GetQueryInterface } from 'interfaces';

export interface RoomInterface {
  id?: string;
  room_number: number;
  room_type: string;
  price: number;
  availability?: boolean;
  hotel_id: string;
  created_at?: any;
  updated_at?: any;
  booking?: BookingInterface[];
  hotel?: HotelInterface;
  _count?: {
    booking?: number;
  };
}

export interface RoomGetQueryInterface extends GetQueryInterface {
  id?: string;
  room_type?: string;
  hotel_id?: string;
}
