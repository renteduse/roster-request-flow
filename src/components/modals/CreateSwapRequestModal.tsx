
import React, { useState } from 'react';
import { Shift } from '../../types';
import { useShift } from '../../contexts/ShiftContext';
import { format } from 'date-fns';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface CreateSwapRequestModalProps {
  shift: Shift;
  isOpen: boolean;
  onClose: () => void;
}

const CreateSwapRequestModal: React.FC<CreateSwapRequestModalProps> = ({ 
  shift, 
  isOpen, 
  onClose 
}) => {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createSwapRequest } = useShift();
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Create the swap request
    createSwapRequest(shift.id, reason);
    
    // Close the modal
    setIsSubmitting(false);
    setReason('');
    onClose();
  };
  
  const formattedDate = format(new Date(shift.date), 'EEEE, MMMM d, yyyy');
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Shift Swap</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700">
              Shift Details
            </p>
            <p className="text-sm text-gray-500">
              {formattedDate} • {shift.startTime}-{shift.endTime} • {shift.role}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for swap request</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide a reason for your swap request..."
              className="min-h-[100px]"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!reason.trim() || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSwapRequestModal;
