import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';

import {spacing} from '../../utils/spacing';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {CountDown} from '../../components/CountDown';
import {RoundedButton} from '../../components/RoundedButton';

export const Timer = ({focusSubject}) => {
  const [isStarted, setIsStarted] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.CountDown}>
        <CountDown isPaused={!isStarted} />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <RoundedButton title="start" onPress={() => setIsStarted(true)} />
      <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: Colors.white,
    textAlign: 'center',
  },
  task: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sectionContainer: {
    paddingTop: spacing.xxl,
  },
  CountDown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
