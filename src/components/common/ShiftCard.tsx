
import React from 'react';
import { Shift } from '../../types';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../ui/card';

interface ShiftCardProps {
  shift: Shift;
  actionLabel?: string;
  onAction?: () => void;
  disabled?: boolean;
}

const ShiftCard: React.FC<ShiftCardProps> = ({ 
  shift, 
  actionLabel, 
  onAction,
  disabled = false
}) => {
  const formattedDate = format(new Date(shift.date), 'EEE, MMM d, yyyy');
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{shift.role}</h3>
          <span className="text-sm text-gray-500">ID: {shift.id.substring(0, 8)}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span>{shift.startTime} - {shift.endTime}</span>
          </div>
          {shift.location && (
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
              <span>{shift.location}</span>
            </div>
          )}
        </div>
      </CardContent>
      {actionLabel && onAction && (
        <CardFooter className="pt-0">
          <Button 
            className="w-full" 
            onClick={onAction}
            disabled={disabled}
          >
            {actionLabel}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ShiftCard;
