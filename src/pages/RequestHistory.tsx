
import React, { useState } from 'react';
import { useShift } from '../contexts/ShiftContext';
import SwapRequestCard from '../components/common/SwapRequestCard';
import { Loader2, History, RefreshCw, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import EmptyState from '../components/common/EmptyState';
import { mockUsers, mockShifts } from '../data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const RequestHistory: React.FC = () => {
  const { userRequestHistory, isLoading, cancelSwapRequest, refreshData } = useShift();
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Organize requests by status
  const requestedSwaps = userRequestHistory.filter(req => 
    req.requesterId === user?.id
  );
  
  const volunteeredSwaps = userRequestHistory.filter(req => 
    req.volunteerId === user?.id
  );
  
  const handleCancel = (requestId: string) => {
    cancelSwapRequest(requestId);
  };
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
  };
  
  const handleDownload = () => {
    // In a real app, we would generate a CSV or PDF here
    alert('This would download a history report in a real application.');
  };
  
  // Function to render swap request cards with appropriate actions
  const renderSwapRequestCards = (requests: SwapRequest[]) => {
    if (requests.length === 0) {
      return (
        <EmptyState
          title="No requests found"
          description="You don't have any swap requests in this category."
          icon={<History className="h-12 w-12" />}
        />
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requests.map(request => {
          // Only allow cancellation if the request is still open
          const canCancel = request.status === 'open' && request.requesterId === user?.id;
          
          return (
            <SwapRequestCard 
              key={request.id} 
              swapRequest={request}
              primaryAction={canCancel ? {
                label: "Cancel Request",
                onClick: () => handleCancel(request.id)
              } : undefined}
            />
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="container max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Request History</h1>
          <p className="text-gray-600">Track your shift swap requests and volunteers</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDownload}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
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
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <History className="h-5 w-5 mr-2 text-primary" />
            Swap Request History
          </CardTitle>
          <CardDescription>
            All your past and current swap requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          ) : (
            <Tabs defaultValue="requested">
              <TabsList className="mb-4">
                <TabsTrigger value="requested">Requested by Me</TabsTrigger>
                <TabsTrigger value="volunteered">Volunteered by Me</TabsTrigger>
              </TabsList>
              <TabsContent value="requested">
                {renderSwapRequestCards(requestedSwaps)}
              </TabsContent>
              <TabsContent value="volunteered">
                {renderSwapRequestCards(volunteeredSwaps)}
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestHistory;
