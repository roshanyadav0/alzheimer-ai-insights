
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Frontal', activity: 75 },
  { name: 'Temporal', activity: 65 },
  { name: 'Parietal', activity: 80 },
  { name: 'Occipital', activity: 70 },
];

const BrainVisualization = () => {
  return (
    <div className="w-full h-full min-h-[300px] p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl">
      <h3 className="text-alzheimer-primary text-lg font-semibold mb-4">Brain Activity Visualization</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar
            dataKey="activity"
            fill="url(#gradient)"
            radius={[4, 4, 0, 0]}
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9b87f5" />
              <stop offset="100%" stopColor="#7E69AB" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BrainVisualization;
