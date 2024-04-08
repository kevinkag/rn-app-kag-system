import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const WeeklySalesChart = ({ data }) => {
  // Data debe ser un array de números representando las ventas diarias
  // por ejemplo: [100, 200, 150, 300, 250, 400, 350]
  const chartData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        data: data,
      },
    ],
  };

  return (
    <View>
      <LineChart
        data={chartData}
        width={width*0.94}
        height={height*0.26}
        yAxisSuffix="$"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(55, 18, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: 'white',
          },
        }}
        bezier
        style={{
          
        }}
      />
    </View>
  );
};

const { width, height } = Dimensions.get('window')
export default WeeklySalesChart;
