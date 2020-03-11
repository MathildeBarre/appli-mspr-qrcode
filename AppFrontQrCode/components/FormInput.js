import React from 'react';

import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { View } from 'react-native';

const FormInput = ({
    returnKeyType,
    keyboardType,
    mode,
    name,
    label,
    value,
    errorValue,
    securityTextEntry,
    ...rest
  }) => (
    <View style={styles.inputContainer}>
      <TextInput
        {...rest}
        securityTextEntry={securityTextEntry}
        mode={mode}
        name={name}
        label={label}
        error={errorValue}
      />
    </View>
  );

  const styles = StyleSheet.create({
    inputContainer: {
      width: '100%',
      marginTop: '1.5rem'
    }
  })
  
  export default FormInput;