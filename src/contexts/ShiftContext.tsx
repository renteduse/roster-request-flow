
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Shift, SwapRequest, User } from '../types';
import { mockShifts, mockSwapRequests } from '../data/mockData';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface ShiftContextType {
  shifts: Shift[];
  swapRequests: SwapRequest[];
  userShifts: Shift[];
  openRequests: SwapRequest[];
  pendingApprovalRequests: SwapRequest[];
  userRequestHistory: SwapRequest[];
  isLoading: boolean;
  createSwapRequest: (shiftId: string, reason: string) => void;
  volunteerForSwap: (requestId: string) => void;
  approveSwapRequest: (requestId: string) => void;
  rejectSwapRequest: (requestId: string) => void;
  cancelSwapRequest: (requestId: string) => void;
  refreshData: () => Promise<void>;
}

const ShiftContext = createContext<ShiftContextType>({} as ShiftContextType);

export const useShift = () => useContext(ShiftContext);

export const ShiftProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter shifts and requests for the current user
  const userShifts = shifts.filter(shift => shift.userId === user?.id);
  
  const openRequests = swapRequests.filter(req => 
    req.status === 'open' && req.requesterId !== user?.id
  );
  
  const pendingApprovalRequests = swapRequests.filter(req => 
    req.status === 'pending_approval' && user?.role === 'manager'
  );
  
  const userRequestHistory = swapRequests.filter(req => 
    req.requesterId === user?.id || req.volunteerId === user?.id
  );

  // Fetch data from mock API (simulated)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real app, these would be API calls
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        
        setShifts(mockShifts);
        setSwapRequests(mockSwapRequests);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load shift data");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      // In a real app, we'd fetch fresh data here
      setIsLoading(false);
    } catch (error) {
      console.error("Error refreshing data:", error);
      toast.error("Failed to refresh data");
      setIsLoading(false);
    }
  };

  const createSwapRequest = (shiftId: string, reason: string) => {
    if (!user) return;
    
    const newRequest: SwapRequest = {
      id: `req-${Date.now()}`,
      requesterId: user.id,
      shiftId,
      reason,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setSwapRequests(prev => [...prev, newRequest]);
    toast.success("Swap request created successfully");
  };

  const volunteerForSwap = (requestId: string) => {
    if (!user) return;
    
    setSwapRequests(prev => prev.map(req => 
      req.id === requestId
        ? { 
            ...req, 
            volunteerId: user.id, 
            status: 'pending_approval',
            updatedAt: new Date().toISOString()
          }
        : req
    ));
    
    toast.success("You have volunteered for this swap");
  };

  const approveSwapRequest = (requestId: string) => {
    setSwapRequests(prev => prev.map(req => 
      req.id === requestId
        ? { 
            ...req, 
            status: 'approved',
            updatedAt: new Date().toISOString()
          }
        : req
    ));
    
    toast.success("Swap request approved");
  };

  const rejectSwapRequest = (requestId: string) => {
    setSwapRequests(prev => prev.map(req => 
      req.id === requestId
        ? { 
            ...req, 
            status: 'rejected',
            updatedAt: new Date().toISOString()
          }
        : req
    ));
    
    toast.info("Swap request rejected");
  };

  const cancelSwapRequest = (requestId: string) => {
    setSwapRequests(prev => prev.map(req => 
      req.id === requestId
        ? { 
            ...req, 
            status: 'cancelled',
            updatedAt: new Date().toISOString()
          }
        : req
    ));
    
    toast.info("Swap request cancelled");
  };

  return (
    <ShiftContext.Provider value={{
      shifts,
      swapRequests,
      userShifts,
      openRequests,
      pendingApprovalRequests,
      userRequestHistory,
      isLoading,
      createSwapRequest,
      volunteerForSwap,
      approveSwapRequest,
      rejectSwapRequest,
      cancelSwapRequest,
      refreshData
    }}>
      {children}
    </ShiftContext.Provider>
  );
};
