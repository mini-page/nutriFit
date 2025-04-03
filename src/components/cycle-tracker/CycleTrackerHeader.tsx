
import React from 'react';
import { Heart, Medal, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface CycleTrackerHeaderProps {
  streak: number;
  showPermissionAlert: boolean;
  setShowPermissionAlert: (show: boolean) => void;
}

const CycleTrackerHeader: React.FC<CycleTrackerHeaderProps> = ({
  streak,
  showPermissionAlert,
  setShowPermissionAlert
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Heart className="h-6 w-6 text-pink-500" />
            Menstrual Cycle Tracker
          </h1>
          {streak > 0 && (
            <p className="text-sm text-muted-foreground flex items-center mt-1">
              <Medal className="h-4 w-4 text-yellow-500 mr-1" /> 
              Current streak: {streak} {streak === 1 ? 'day' : 'days'}
            </p>
          )}
        </div>
      </div>
      
      {showPermissionAlert && (
        <Alert className="bg-blue-50 border-blue-200 text-blue-800">
          <Info className="h-4 w-4 text-blue-800" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription className="flex justify-between items-center">
            <span>This tracker is only shown to users who have set their gender preference to female or non-binary in settings.</span>
            <Button variant="outline" size="sm" onClick={() => setShowPermissionAlert(false)}>
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default CycleTrackerHeader;
