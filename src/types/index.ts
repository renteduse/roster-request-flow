
export type UserRole = 'staff' | 'manager';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
}

export interface Shift {
  id: string;
  userId: string;
  date: string; // ISO string
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  role: string; // Position or role during this shift
  location?: string;
}

export interface SwapRequest {
  id: string;
  requesterId: string;
  shiftId: string;
  reason: string;
  status: 'open' | 'pending_approval' | 'approved' | 'rejected' | 'cancelled';
  volunteerId?: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string; // ISO string
}

export interface AnalyticsData {
  totalRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  averageApprovalTime: number; // in hours
  mostActiveDay: string;
  requestsByDepartment: Record<string, number>;
}
