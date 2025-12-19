export type TicketStatus = "open" | "pending" | "closed";

export type TicketPriority = "low" | "medium" | "high" | "urgent";

export interface Customer {
  name: string;
  email: string;
}

export type ActivityType = "comment" | "status_change";

interface BaseActivity {
  id: string;
  type: ActivityType;
  author: string;
  createdAt: string;
}

export interface CommentActivity extends BaseActivity {
  type: "comment";
  content: string;
}

export interface StatusChangeActivity extends BaseActivity {
  type: "status_change";
  from: TicketStatus;
  to: TicketStatus;
}

export type Activity = CommentActivity | StatusChangeActivity;

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  customer: Customer;
  updatedAt: string;
  activity: Activity[];
}

export interface TicketStatusUpdate {
  status: TicketStatus;
  updatedAt: string;
}
