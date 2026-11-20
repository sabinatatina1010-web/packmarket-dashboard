export type OrderStatus = 'new' | 'in_progress' | 'paid' | 'cancelled';

export interface Order {
  id: string;
  clientName: string;
  phone: string;
  service: string;
  amount: number;
  date: string;
  status: OrderStatus;
}

export type StatusFilterValue = 'all' | OrderStatus;

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  new: 'Новый',
  in_progress: 'В работе',
  paid: 'Оплачен',
  cancelled: 'Отменен',
};
