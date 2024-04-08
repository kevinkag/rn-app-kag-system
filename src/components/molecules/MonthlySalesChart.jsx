import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const MonthlySalesChart = ({ data }) => {
    // Data debe ser un array de números representando las ventas diarias del mes
    // por ejemplo: [100, 200, ..., 150, 300] para un mes de 30 días
    const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
    const chartData = {
        labels: daysInMonth.map(day => day.toString()),
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
                width={400}
                height={220}
                yAxisSuffix="$"
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#ffa726',
                    },
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </View>
    );
};

export default MonthlySalesChart;
