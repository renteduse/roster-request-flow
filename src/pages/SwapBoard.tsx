
import React from 'react';
import { useShift } from '../contexts/ShiftContext';
import { useAuth } from '../contexts/AuthContext';
import SwapRequestCard from '../components/common/SwapRequestCard';
import { Loader2, Repeat, RefreshCw, Info } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import EmptyState from '../components/common/EmptyState';
import { mockShifts } from '../data/mockData';

const SwapBoard: React.FC = () => {
  const { openRequests, isLoading, volunteerForSwap, refreshData } = useShift();
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleVolunteer = (requestId: string) => {
    volunteerForSwap(requestId);
  };
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
  };
  
  const getUserShiftCountOnSameDay = (shiftId: string) => {
    const shift = mockShifts.find(s => s.id === shiftId);
    if (!shift) return 0;
    
    // Count how many shifts the user has on the same day
    return mockShifts.filter(
      s => s.userId === user?.id && s.date === shift.date
    ).length;
  };
  
  return (
    <div className="container max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Shift Swap Board</h1>
          <p className="text-gray-600">Browse and volunteer for open shift swaps</p>
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
      
      <Alert className="mb-6 bg-blue-50 text-blue-800 border-blue-200">
        <Info className="h-4 w-4" />
        <AlertDescription className="text-sm">
          When you volunteer for a shift swap, a manager will need to approve the swap before it becomes official.
        </AlertDescription>
      </Alert>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Repeat className="h-5 w-5 mr-2 text-primary" />
            Open Swap Requests
          </CardTitle>
          <CardDescription>
            Colleagues looking for someone to swap shifts with
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          ) : openRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {openRequests.map(request => {
                const hasConflict = getUserShiftCountOnSameDay(request.shiftId) > 0;
                
                return (
                  <SwapRequestCard 
                    key={request.id} 
                    swapRequest={request} 
                    primaryAction={{
                      label: hasConflict ? "Shift Conflict" : "Volunteer for Swap",
                      onClick: () => handleVolunteer(request.id),
                      disabled: hasConflict
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="No open swap requests"
              description="There are currently no open shift swap requests from your colleagues."
              icon={<Repeat className="h-12 w-12" />}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SwapBoard;
