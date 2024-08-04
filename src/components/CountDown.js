import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {fontSize} from '../utils/fontSize';
import {colors} from '../utils/colors';
import {spacing} from '../utils/spacing';

const minutesToMillis = min => min * 1000 * 60;
const formatTime = time => (time < 10 ? `0${time}` : time);

export const CountDown = ({minutes = 20, isPaused}) => {
  const interval = useRef(null);

  const countDown = () => {
    setMillis(time => {
      if (time === 0) {
        // do something
        return time;
      }
      const timeLeft = time - 1000;
      // report the progress
      return timeLeft;
    });
  };

  useEffect(() => {
    if (isPaused) {
      return;
    }
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const [millis, setMillis] = useState(minutesToMillis(minutes));

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  return (
    <View>
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(seconds)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.xxxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94,132,226,0.3)',
  },
});
