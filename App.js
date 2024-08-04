import React, {useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Focus} from './src/features/focus/Focus';
import {colors} from './src/utils/colors';
import {Timer} from './src/features/timer/Timer';
import {spacing} from './src/utils/spacing';

function App() {
  const [focusSubject, setFocusSubject] = useState('Reading');
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer focusSubject={focusSubject} />
      ) : (
        <Focus addSubject={setFocusSubject} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
  },
});

export default App;
