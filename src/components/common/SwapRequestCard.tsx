
import React from 'react';
import { SwapRequest, Shift, User } from '../../types';
import { Calendar, Clock, User as UserIcon, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { format, parseISO } from 'date-fns';
import { Badge } from '../ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../ui/card';
import { mockUsers, mockShifts } from '../../data/mockData';

interface SwapRequestCardProps {
  swapRequest: SwapRequest;
  primaryAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
}

const SwapRequestCard: React.FC<SwapRequestCardProps> = ({ 
  swapRequest, 
  primaryAction,
  secondaryAction
}) => {
  // In a real app, we would fetch these from an API
  const shift = mockShifts.find(s => s.id === swapRequest.shiftId) as Shift;
  const requester = mockUsers.find(u => u.id === swapRequest.requesterId) as User;
  const volunteer = swapRequest.volunteerId ? mockUsers.find(u => u.id === swapRequest.volunteerId) : null;
  
  if (!shift || !requester) return null;
  
  const formattedDate = format(new Date(shift.date), 'EEE, MMM d, yyyy');
  const formattedCreatedAt = format(parseISO(swapRequest.createdAt), 'MMM d, h:mm a');
  
  const getStatusBadge = () => {
    switch (swapRequest.status) {
      case 'open':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Open</Badge>;
      case 'pending_approval':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending Approval</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Cancelled</Badge>;
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <h3 className="font-medium">{shift.role}</h3>
        {getStatusBadge()}
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span>{shift.startTime} - {shift.endTime}</span>
          </div>
          <div className="flex items-center text-sm">
            <UserIcon className="h-4 w-4 mr-2 text-gray-500" />
            <span>Requested by: {requester.name}</span>
          </div>
          {volunteer && (
            <div className="flex items-center text-sm">
              <UserIcon className="h-4 w-4 mr-2 text-gray-500" />
              <span>Volunteer: {volunteer.name}</span>
            </div>
          )}
          <div className="flex items-start text-sm">
            <AlertCircle className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
            <span>Reason: {swapRequest.reason}</span>
          </div>
          <div className="text-xs text-gray-500 pt-2">
            Requested on {formattedCreatedAt}
          </div>
        </div>
      </CardContent>
      {(primaryAction || secondaryAction) && (
        <CardFooter className="pt-0 flex flex-col gap-2">
          {primaryAction && (
            <Button 
              className="w-full" 
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled}
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button 
              variant="outline"
              className="w-full" 
              onClick={secondaryAction.onClick}
              disabled={secondaryAction.disabled}
            >
              {secondaryAction.label}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default SwapRequestCard;
