import { ProfitInterface } from 'interfaces/profit';
import { RoomInterface } from 'interfaces/room';
import { ServiceInterface } from 'interfaces/service';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface HotelInterface {
  id?: string;
  description?: string;
  location?: string;
  rating?: number;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  profit?: ProfitInterface[];
  room?: RoomInterface[];
  service?: ServiceInterface[];
  user?: UserInterface;
  _count?: {
    profit?: number;
    room?: number;
    service?: number;
  };
}

export interface HotelGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  location?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
