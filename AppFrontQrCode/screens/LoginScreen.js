import React from 'react';

import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Button, Snackbar, Title } from 'react-native-paper';


import FormInput from '../components/FormInput'
import ErrorHelper from '../components/ErrorHelper'

import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup'



export default class LoginScreen extends React.Component {

    state = {
        visible: false,
        connection_error: false
    };

    handleSubmit = async (infos) => {
        if (infos.email.length > 0 && infos.password.length > 0) {
            axios.post('http://localhost:6507/api/users/login', {
                email: infos.email,
                password: infos.password
            })
            .then(async res => {
                console.log(res)
                try {
                    await AsyncStorage.setItem('jwt', res.data.tkn);
                    await AsyncStorage.setItem('userId', res.data.user);

                    this.props.navigation.navigate('App')

                } catch (err) {
                    this.setState({visible: true});
                    this.setState({connection_error: true});
                    if (this.state.connection_error) {
                        this.setState({connect_err_message: 'La connection est impossible.'});
                    }
                    console.log(err);
                }
            })
            .catch(err => {
                this.setState({visible: true});
                this.setState({err_message: err.response.data.err_message});
            });
        }
    };

    register = () => this.props.navigation.navigate('Signup');

    render() {
        
        const validationSchema = Yup.object().shape({
            email: Yup.string()
            .label('Email')
            .email('Veuillez entrer un email valide.')
            .required('Veuillez saisir votre email.'),
            password: Yup.string()
            .label('Password')
            .required()
            .min(5, 'Le mot de passe doit contenir au moins 5 caractères')
        });

        return (

            <SafeAreaView style={styles.container}>

                <Title>Connection</Title>

                <Snackbar visible={this.state.visible} DURATION_SHORT>
                    {this.state.err_message || this.state.connect_err_message}
                </Snackbar>

                <Formik
                    initialValues={{ email: '', password: '' }} 
                    onSubmit={values => {this.handleSubmit(values)}}
                    validationSchema={validationSchema}
                >
                    {({ handleChange, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur  }) => (
                        <View style={styles.formContainer}>
                            <View>
                                <FormInput
                                    mode="outlined"
                                    name='email'
                                    onChangeText={handleChange('email')}
                                    label='Email*'
                                    onBlur={handleBlur('email')}
                                    errorValue={touched.email && errors.email}
                                />
                                <ErrorHelper errorValue={touched.email && errors.email} />
                            </View>

                            <View>
                                <FormInput
                                    type="pasword"
                                    mode="outlined"
                                    name='password'
                                    onChangeText={handleChange('password')}
                                    label='Mot de passe*'
                                    onBlur={handleBlur('password')}
                                    errorValue={touched.password && errors.password}
                                />
                                <ErrorHelper errorValue={touched.password && errors.password} />
                            </View>

                            <View style={styles.loginButton}>
                                <Button 
                                    uppercase="false"
                                    mode="contained"
                                    onPress={handleSubmit}
                                    disabled={!isValid || isSubmitting}
                                    loading = { isSubmitting }
                                >
                                    Se connecter
                                </Button>
                            </View>


                        </View>
                    )}
                </Formik>

                <View style={styles.registerButton}>
                    <Button uppercase="false" mode="text" onPress={this.register} >
                        Créer un compte !
                    </Button>
                </View>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        width: '90%'
    },
    loginButton: {
        marginTop: '2rem'
    },
    registerButton: {
        marginTop: '1rem'
    }
})

// <View>
// <TextInput
// mode="outlined"
// label="Email"
// value={this.state.email}
// onChangeText={email => this.setState({ email })}
// />
// <HelperText
// type="error"
// visible={true}
// >
// Email address is invalid!
// </HelperText>
// </View>