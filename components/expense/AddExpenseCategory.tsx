import React, {useState} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import AppHeader from '../common/AppHeader';
import {colors, commonStyles, utils} from '../styles/theme';

const AddExpenseCategory = ({navigation}) => {
  const [text, setText] = useState('');

  return (
    <View style={[commonStyles.container, styles.expenseWrapper]}>
      <AppHeader
        title="Expense Category"
        navigation={navigation}
        homeScreen={false}
        backTo="Home"
      />
      <View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Income title</Text>
          <TextInput
            placeholder="Eg, Spetember salary"
            style={styles.input}
            onChangeText={setText}
            value={text}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={[styles.inputWrapper, styles.halfWidth]}>
          <Text style={styles.inputLabel}>Amount</Text>
          <TextInput
            numberOfLines={1}
            placeholder="Eg, 20,000"
            style={styles.input}
            onChangeText={setText}
            value={text}
          />
        </View>
        <View style={styles.inputDivider} />
        <View style={[styles.inputWrapper, styles.halfWidth]}>
          <Text style={styles.inputLabel}>Pay type</Text>
          <TextInput
            numberOfLines={1}
            placeholder="Eg, UPI"
            style={styles.input}
            onChangeText={setText}
            value={text}
          />
        </View>
      </View>
      <View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Note</Text>
          <TextInput
            numberOfLines={6}
            placeholder="Eg, Spetember salary"
            style={styles.input}
            onChangeText={setText}
            value={text}
          />
        </View>
      </View>
      <Button
        title="asasa"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  expenseWrapper: {
    backgroundColor: colors.brand.brandLight,
    display: 'flex',
    overflow: 'scroll',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    // flexWrap: 'nowrap',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 10,
  },
  inputLabel: {
    marginBottom: 10,
    fontSize: utils.fontSize.large,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: utils.inputRadius,
    // height: 60,
    fontSize: utils.fontSize.large,
    paddingHorizontal: 20,
    paddingVertical: 20,
    // color: colors.brand.brandDark,
  },
  inputDivider: {
    width: '4%',
  },
  halfWidth: {
    width: '48%',
  },
});

export default AddExpenseCategory;
