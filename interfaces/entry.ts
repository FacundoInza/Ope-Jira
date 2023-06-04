export interface Entry {
  _id: string;
  description: string;
  createdAt: number;
  status: string; // A,B,C,D , pending , in-progress - finished
}

export type EntryStatus = "pending" | "in-progress" | "finished";
