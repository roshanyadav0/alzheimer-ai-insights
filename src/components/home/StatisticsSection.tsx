
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const StatisticsSection = () => {
  // Sample data for charts
  const ageData = [
    { name: '65-74', value: 5.3 },
    { name: '75-84', value: 13.8 },
    { name: '85+', value: 34.6 },
  ];
  
  const detectionData = [
    { name: 'Traditional Methods', value: 68 },
    { name: 'AI-Enhanced Methods', value: 92 },
  ];

  const pieData = [
    { name: 'Diagnosed', value: 6.5 },
    { name: 'Undiagnosed', value: 93.5 },
  ];

  const COLORS = ['#6366F1', '#A78BFA', '#E0E7FF', '#2563EB'];

  return (
    <div className="py-16 bg-alzheimer-light">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-alzheimer-dark">Alzheimer's by the Numbers</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Understanding the impact and detection statistics
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-alzheimer-dark mb-4">Prevalence by Age Group</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={ageData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis unit="%" />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Prevalence']}
                      contentStyle={{ borderRadius: '0.375rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 text-sm text-gray-500 text-center">
                Alzheimer's prevalence increases significantly with age
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-alzheimer-dark mb-4">Detection Accuracy</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={detectionData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis type="number" unit="%" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Accuracy']}
                      contentStyle={{ borderRadius: '0.375rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {detectionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#A78BFA' : '#6366F1'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 text-sm text-gray-500 text-center">
                AI significantly improves detection accuracy compared to traditional methods
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-alzheimer-dark mb-4">Diagnosis Status</h3>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Percentage']}
                      contentStyle={{ borderRadius: '0.375rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 text-sm text-gray-500 text-center">
                An estimated 93.5% of Alzheimer's cases remain undiagnosed in early stages
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;
