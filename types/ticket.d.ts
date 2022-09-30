export interface ITicket {
  id: number;
  title: string;
  comment: string;
  estimated_time_unix?: number;
  estimated_time_string?: string;
  creation_date?: number;
  update_date?: number;
  status: string;
  user_id: string;
  project_id: number;
}