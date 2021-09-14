/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback, useMemo} from 'react';
import {SafeAreaView, View} from 'react-native';
import {VictoryPie} from 'victory-native';

const App = () => {
  const [selectedSegmentId, setSelectSegment] = useState<number>(0);

  const data = useMemo(
    () => [
      {id: 1, x: 'Cats', y: 15, color: 'red'},
      {id: 2, x: 'Dogs', y: 30, color: 'green'},
      {id: 3, x: 'Birds', y: 15, color: 'yellow'},
      {id: 4, x: 'Squirrels', y: 10, color: 'purple'},
      {id: 5, x: 'Foxes', y: 20, color: 'cyan'},
      {id: 6, x: 'Dinosaurs', y: 10, color: 'pink'},
    ],
    [],
  );

  /**
   * Select a segment
   * @param id
   */
  const onSelectSegment = useCallback(
    clickedSegmentId => {
      let nextSelectedSegmentId = clickedSegmentId;

      if (data === null || data?.length === 0) {
        nextSelectedSegmentId = 0;
      }

      setSelectSegment(nextSelectedSegmentId);
    },
    [data],
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#1a1a1a'}}>
        <VictoryPie
          labels={() => ''}
          innerRadius={50}
          height={350}
          width={350}
          externalEventMutations={data}
          animate={{
            duration: 800,
            onLoad: {duration: 800},
          }}
          style={{
            data: {
              opacity: ({datum}) => (datum.id === selectedSegmentId ? 1 : 0.2),
              fill: ({datum}) => datum.color || '#000000',
              stroke: ({datum}) =>
                datum.id === selectedSegmentId ? '#CCCCCC' : '#FFFFFF',
              strokeWidth: 0,
            },
          }}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPress: () => [
                  {
                    target: 'data',
                    mutation: chartData => {
                      onSelectSegment(chartData.datum.id);
                    },
                  },
                ],
              },
            },
          ]}
          data={data}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
