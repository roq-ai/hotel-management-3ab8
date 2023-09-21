import { HotelInterface } from 'interfaces/hotel';
import { GetQueryInterface } from 'interfaces';

export interface ProfitInterface {
  id?: string;
  month: any;
  total_profit: number;
  hotel_id: string;
  created_at?: any;
  updated_at?: any;

  hotel?: HotelInterface;
  _count?: {};
}

export interface ProfitGetQueryInterface extends GetQueryInterface {
  id?: string;
  hotel_id?: string;
}
