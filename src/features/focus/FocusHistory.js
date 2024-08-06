import {View, Text, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import {fontSize} from '../../utils/fontSize';
import {spacing} from '../../utils/spacing';
import {RoundedButton} from '../../components/RoundedButton';

const HistoryItem = ({item}) => {
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({focusHistory, onClear}) => {
  const clearHistory = () => {
    onClear();
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Tasks focused on</Text>
            <FlatList
              style={styles.listSection}
              contentContainerStyle={styles.contentContainer}
              data={focusHistory}
              renderItem={({item}) => <HistoryItem item={item} />}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.clearContainer}>
              <RoundedButton size={75} title="clear" onPress={clearHistory} />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listSection: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    paddingBottom: spacing.lg,
    alignItems: 'center',
  },
  historyItem: status => {
    return {
      color: status === 1 ? 'green' : 'red',
      fontSize: fontSize.md,
      backgroundColor: colors.itemBackground,
      width: '90%',
      textAlign: 'center',
    };
  },
  title: {
    color: colors.primary,
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: spacing.sm,
    padding: spacing.sm,
    backgroundColor: colors.itemBackground,
    width: '90%',
  },
  clearContainer: {
    marginVertical: spacing.md,
  },
});
