import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  Vibration,
  Platform,
} from 'react-native';
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {ProgressBar} from 'react-native-paper';

import {spacing} from '../../utils/spacing';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {CountDown} from '../../components/CountDown';
import {RoundedButton} from '../../components/RoundedButton';
import {Timing} from './Timing';
import {
  activateKeepAwake,
  deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';

export const Timer = ({focusSubject}) => {
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [customMinutes, setCustomMinutes] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity value of 1

  const onProgress = useCallback(progress => {
    setProgress(progress);
  }, []);

  const DEFAULT_TIME = 1;
  const onEnd = useCallback(() => {
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    vibrate();
    setIsStarted(false);
  }, []);

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate([500, 500, 500, 500, 500, 500, 500, 500, 500, 500]);
    }
  };

  const changeTime = min => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const handleCustomMinutesChange = () => {
    const min = parseFloat(customMinutes);
    if (!isNaN(min) && min > 0) {
      changeTime(min);
      setCustomMinutes('');
      fadeOutInput();
    }
  };

  const fadeOutInput = () => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Fade out to 0 opacity
      duration: 500, // Duration of the fade-out animation
      useNativeDriver: true,
    }).start(() => setShowCustomInput(false));
  };

  useEffect(() => {
    if (isStarted) {
      activateKeepAwake();
    } else {
      deactivateKeepAwake();
    }
    return () => {
      deactivateKeepAwake();
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.CountDown}>
        <CountDown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.progressBarSection}>
        <ProgressBar
          progress={progress}
          color="#BFA100"
          style={styles.ProgressBar}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      {showCustomInput && (
        <Animated.View
          style={[styles.customMinutesWrapper, {opacity: fadeAnim}]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={customMinutes}
            onChangeText={setCustomMinutes}
            placeholder="Enter custom minutes"
            placeholderTextColor={Colors.gray}
          />
          <RoundedButton
            title="Set"
            onPress={handleCustomMinutesChange}
            size={50}
          />
        </Animated.View>
      )}
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>
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
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarSection: {
    padding: spacing.sm,
  },
  ProgressBar: {
    height: 10,
  },
  customMinutesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  input: {
    height: 40,
    borderColor: Colors.white,
    borderWidth: 1,
    color: Colors.white,
    marginRight: spacing.md,
    paddingHorizontal: spacing.md,
    width: '40%',
  },
});
