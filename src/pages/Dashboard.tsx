
import React, { useState } from 'react';
import { useShift } from '../contexts/ShiftContext';
import ShiftCard from '../components/common/ShiftCard';
import { Loader2, Calendar, Clock, Info, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import CreateSwapRequestModal from '../components/modals/CreateSwapRequestModal';
import { Shift } from '../types';
import EmptyState from '../components/common/EmptyState';
import { format, isAfter } from 'date-fns';

const Dashboard: React.FC = () => {
  const { userShifts, openRequests, isLoading, refreshData } = useShift();
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const today = new Date();
  const upcomingShifts = userShifts
    .filter(shift => isAfter(new Date(shift.date), today) || shift.date === format(today, 'yyyy-MM-dd'))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const handleCreateSwapRequest = (shift: Shift) => {
    setSelectedShift(shift);
    setIsModalOpen(true);
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
          <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
          <p className="text-gray-600">Manage your upcoming shifts</p>
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Upcoming Shifts
              </CardTitle>
              <CardDescription>Your scheduled shifts for the next days</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
              ) : upcomingShifts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {upcomingShifts.map(shift => (
                    <ShiftCard 
                      key={shift.id} 
                      shift={shift} 
                      actionLabel="Request Swap"
                      onAction={() => handleCreateSwapRequest(shift)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No upcoming shifts"
                  description="You don't have any shifts scheduled for the upcoming days."
                  icon={<Calendar className="h-12 w-12" />}
                />
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                Quick Stats
              </CardTitle>
              <CardDescription>Overview of your shifts and swaps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-2xl font-bold text-primary">{upcomingShifts.length}</p>
                  <p className="text-sm text-gray-600">Upcoming Shifts</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-2xl font-bold text-primary">{openRequests.length}</p>
                  <p className="text-sm text-gray-600">Open Swap Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Info className="h-5 w-5 mr-2 text-primary" />
                Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li className="flex gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5"></div>
                  <span>Request shift swaps at least 48 hours before your shift</span>
                </li>
                <li className="flex gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5"></div>
                  <span>Managers need to approve all shift swaps</span>
                </li>
                <li className="flex gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5"></div>
                  <span>Check the Swap Board regularly for open requests</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {selectedShift && (
        <CreateSwapRequestModal
          shift={selectedShift}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
