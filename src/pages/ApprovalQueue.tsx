
import React, { useState } from 'react';
import { useShift } from '../contexts/ShiftContext';
import SwapRequestCard from '../components/common/SwapRequestCard';
import { Loader2, ClipboardCheck, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import EmptyState from '../components/common/EmptyState';

const ApprovalQueue: React.FC = () => {
  const { 
    pendingApprovalRequests, 
    isLoading, 
    approveSwapRequest, 
    rejectSwapRequest,
    refreshData
  } = useShift();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleApprove = (requestId: string) => {
    approveSwapRequest(requestId);
  };
  
  const handleReject = (requestId: string) => {
    rejectSwapRequest(requestId);
  };
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
  };
  
  return (
    <div className="container max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Approval Queue</h1>
          <p className="text-gray-600">Review and approve shift swap requests</p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1"
        >
          {isRefreshing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Refresh
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <ClipboardCheck className="h-5 w-5 mr-2 text-primary" />
            Pending Swap Requests
          </CardTitle>
          <CardDescription>
            Swap requests waiting for your approval
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          ) : pendingApprovalRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingApprovalRequests.map(request => (
                <SwapRequestCard 
                  key={request.id} 
                  swapRequest={request}
                  primaryAction={{
                    label: "Approve",
                    onClick: () => handleApprove(request.id)
                  }}
                  secondaryAction={{
                    label: "Reject",
                    onClick: () => handleReject(request.id)
                  }}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No pending requests"
              description="There are no shift swap requests waiting for your approval."
              icon={<ClipboardCheck className="h-12 w-12" />}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApprovalQueue;
