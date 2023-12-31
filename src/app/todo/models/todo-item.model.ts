export interface ITodoItem {
  id?: string;
  title: string;
  description: string;
  start: number;
  end: number | null;
  checked?: boolean;
  selected?: boolean;
}
