
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Loader2, BarChart, TrendingUp, Calendar, CheckCircle, XCircle, Clock, Building } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { mockAnalyticsData, mockSwapRequests } from '../data/mockData';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics: React.FC = () => {
  const { user } = useAuth();
  
  if (user?.role !== 'manager') {
    return <Navigate to="/" replace />;
  }
  
  // Process data for chart
  const departmentData = Object.entries(mockAnalyticsData.requestsByDepartment).map(([name, value]) => ({
    name,
    value
  }));
  
  return (
    <div className="container max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-gray-600">Insights into shift swap patterns and activity</p>
        </div>
        <div>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Requests</p>
                <h3 className="text-2xl font-bold mt-2">{mockAnalyticsData.totalRequests}</h3>
              </div>
              <div className="bg-blue-100 p-2 rounded-full text-blue-700">
                <TrendingUp size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Approved</p>
                <h3 className="text-2xl font-bold mt-2">{mockAnalyticsData.approvedRequests}</h3>
              </div>
              <div className="bg-green-100 p-2 rounded-full text-green-700">
                <CheckCircle size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <h3 className="text-2xl font-bold mt-2">{mockAnalyticsData.rejectedRequests}</h3>
              </div>
              <div className="bg-red-100 p-2 rounded-full text-red-700">
                <XCircle size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Approval Time</p>
                <h3 className="text-2xl font-bold mt-2">{mockAnalyticsData.averageApprovalTime}h</h3>
              </div>
              <div className="bg-purple-100 p-2 rounded-full text-purple-700">
                <Clock size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="col-span-full lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-primary" />
              Swap Requests by Department
            </CardTitle>
            <CardDescription>
              Distribution of swap requests across different departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={departmentData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0ea5e9" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-full lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Building className="h-5 w-5 mr-2 text-primary" />
              Department Overview
            </CardTitle>
            <CardDescription>
              Key statistics for each department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(mockAnalyticsData.requestsByDepartment).map(([dept, count]) => (
                <div key={dept} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                    <span>{dept}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-700">
                      <span className="font-medium">{count}</span> requests
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(count / mockAnalyticsData.totalRequests) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            Peak Activity Times
          </CardTitle>
          <CardDescription>
            When swap requests are most frequently submitted
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="text-center mb-4">
              <p className="font-medium">Most Active Day:</p>
              <h4 className="text-xl font-bold text-primary">{mockAnalyticsData.mostActiveDay}</h4>
            </div>
            <div className="w-full max-w-md bg-gray-100 rounded-md p-4 grid grid-cols-7 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <div key={day} className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-1">{day}</div>
                  <div 
                    className={`w-full rounded-md ${
                      day === mockAnalyticsData.mostActiveDay.substring(0, 3) 
                        ? 'bg-primary' : 'bg-gray-200'
                    }`}
                    style={{ 
                      height: `${30 + Math.random() * 50}px`, 
                      opacity: day === mockAnalyticsData.mostActiveDay.substring(0, 3) ? 1 : 0.7
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
