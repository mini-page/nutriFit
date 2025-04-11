tsx
import React from 'react';

interface CyclePredictionsProps {
  nextCycleStart: Date;
  nextCycleEnd: Date;
}

const CyclePredictions: React.FC<CyclePredictionsProps> = ({ nextCycleStart, nextCycleEnd }) => {
  return (
    <div className="cycle-predictions">
      <h3 className="text-lg font-semibold">Next Cycle Predictions</h3>
      <p>
        Start Date: {nextCycleStart.toLocaleDateString()}
      </p>
      <p>
        End Date: {nextCycleEnd.toLocaleDateString()}
      </p>
    </div>
  );
};

export default CyclePredictions;