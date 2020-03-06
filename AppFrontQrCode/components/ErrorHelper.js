import React from 'react';

import { HelperText } from 'react-native-paper';

const ErrorHelper = ({ errorValue }) => (
    <HelperText type="error" visible={errorValue} >
        {errorValue}
    </HelperText>
);

export default ErrorHelper;