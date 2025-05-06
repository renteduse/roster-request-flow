
import { User, Shift, SwapRequest } from '../types';

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Staff',
    email: 'staff@example.com',
    role: 'staff',
    department: 'Sales'
  },
  {
    id: 'user-2',
    name: 'Jane Manager',
    email: 'manager@example.com',
    role: 'manager',
    department: 'Sales'
  },
  {
    id: 'user-3',
    name: 'Bob Coworker',
    email: 'bob@example.com',
    role: 'staff',
    department: 'Customer Service'
  },
  {
    id: 'user-4',
    name: 'Alice Team Lead',
    email: 'alice@example.com',
    role: 'staff',
    department: 'Operations'
  }
];

// Helper function to get dates
const getDateString = (daysFromNow: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
};

// Mock Shifts Data
export const mockShifts: Shift[] = [
  {
    id: 'shift-1',
    userId: 'user-1',
    date: getDateString(1),
    startTime: '09:00',
    endTime: '17:00',
    role: 'Sales Associate',
    location: 'Main Floor'
  },
  {
    id: 'shift-2',
    userId: 'user-1',
    date: getDateString(2),
    startTime: '10:00',
    endTime: '18:00',
    role: 'Sales Associate',
    location: 'Electronics Department'
  },
  {
    id: 'shift-3',
    userId: 'user-1',
    date: getDateString(3),
    startTime: '12:00',
    endTime: '20:00',
    role: 'Sales Associate',
    location: 'Customer Service Desk'
  },
  {
    id: 'shift-4',
    userId: 'user-3',
    date: getDateString(1),
    startTime: '08:00',
    endTime: '16:00',
    role: 'Customer Service Rep',
    location: 'Customer Service Desk'
  },
  {
    id: 'shift-5',
    userId: 'user-3',
    date: getDateString(2),
    startTime: '12:00',
    endTime: '20:00',
    role: 'Customer Service Rep',
    location: 'Returns Department'
  },
  {
    id: 'shift-6',
    userId: 'user-4',
    date: getDateString(1),
    startTime: '07:00',
    endTime: '15:00',
    role: 'Operations Specialist',
    location: 'Back Office'
  },
  {
    id: 'shift-7',
    userId: 'user-4',
    date: getDateString(3),
    startTime: '07:00',
    endTime: '15:00',
    role: 'Operations Specialist',
    location: 'Warehouse'
  }
];

// Mock Swap Requests Data
export const mockSwapRequests: SwapRequest[] = [
  {
    id: 'req-1',
    requesterId: 'user-3',
    shiftId: 'shift-4',
    reason: 'Doctor appointment',
    status: 'open',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'req-2',
    requesterId: 'user-4',
    shiftId: 'shift-6',
    reason: 'Family event',
    status: 'pending_approval',
    volunteerId: 'user-1',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 43200000).toISOString()
  },
  {
    id: 'req-3',
    requesterId: 'user-1',
    shiftId: 'shift-2',
    reason: 'Personal appointment',
    status: 'approved',
    volunteerId: 'user-3',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'req-4',
    requesterId: 'user-3',
    shiftId: 'shift-5',
    reason: 'Transportation issues',
    status: 'rejected',
    volunteerId: 'user-4',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString()
  }
];

// Mock Analytics Data
export const mockAnalyticsData = {
  totalRequests: 47,
  approvedRequests: 32,
  rejectedRequests: 8,
  averageApprovalTime: 5.2, // hours
  mostActiveDay: 'Friday',
  requestsByDepartment: {
    'Sales': 18,
    'Customer Service': 15,
    'Operations': 9,
    'Warehouse': 5
  }
};
