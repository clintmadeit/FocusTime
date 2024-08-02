/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Focus} from './src/features/focus/Focus';

function App(): React.JSX.Element {
  const [focusSubject, setFocusSubject] = useState(null);
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Text>Here is where I will build a timer</Text>
      ) : (
        <Focus />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#db9d00',
  },
});

export default App;
