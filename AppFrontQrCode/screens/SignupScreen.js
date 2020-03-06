import React from 'react';

import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { Button, Snackbar, Title } from 'react-native-paper';


import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorHelper from '../components/ErrorHelper'

import axios from 'axios';
import renderIf from '../components/ConditionalRender';
import { AsyncStorage } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup'


export default class SignupScreen extends React.Component {

    state = {
        visible: false,
        connection_error: false
    };

    handleSubmit = async (infos) => {
        if (infos.email.length > 0 && infos.password.length > 0) {
            axios.post('http://localhost:6507/api/users/register', {
                lname: infos.lname,
                fname: infos.fname,
                email: infos.email,
                password: infos.password
            })
            .then(async res => {
                console.log(res)
                try {
                    // this.setState({visible: true});
                    // this.setState({connection_error: true});
                    // await AsyncStorage.setItem('jwt', res.data.tkn);
                    // await AsyncStorage.setItem('userId', res.data.user);

                    this.props.navigation.navigate('Login')

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
                this.setState({err_message: err.response.data.error});
            });
        }
    };

    login = () => this.props.navigation.navigate('Login')

    render() {

        const validationSchema = Yup.object().shape({
            email: Yup.string()
            .label('Email')
            .email('Veuillez entrer un email valide.')
            .required('Veuillez saisir votre email.'),

            password: Yup.string()
            .label('Password')
            .required()
            .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),

            lname: Yup.string()
            .label('Lname')
            .required('Veuillez saisir votre nom.')
            .max(15, 'Veuillez saisir un nom plus court.'),

            fname: Yup.string()
            .label('Fname')
            .max(15, 'Veuillez saisir un prénom plus court.'),
        });

        return (

            <SafeAreaView style={styles.container}>

                <Title>S'enregistrer</Title>

                <Snackbar visible={this.state.visible} DURATION_SHORT>
                    {this.state.err_message || this.state.connect_err_message}
                </Snackbar>

                <Formik
                    initialValues={{ email: '', password: '', lname: '', fname: '' }} 
                    onSubmit={values => {this.handleSubmit(values)}}
                    validationSchema={validationSchema}
                >
                    {({ handleChange, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur  }) => (
                        <View style={styles.formContainer}>
                            <View>
                                <FormInput
                                mode="outlined"
                                    name='lname'
                                    onChangeText={handleChange('lname')}
                                    label='Nom*'
                                    onBlur={handleBlur('lname')}
                                    errorValue={touched.lname && errors.lname}
                                />
                                <ErrorHelper errorValue={touched.lname && errors.lname} />
                            </View>

                            <View>
                                <FormInput
                                    mode="outlined"
                                    name='fname'
                                    onChangeText={handleChange('fname')}
                                    label='Prénom'
                                    onBlur={handleBlur('fname')}
                                    errorValue={touched.fname && errors.fname}
                                />
                                <ErrorHelper errorValue={touched.fname && errors.fname} />
                            </View>

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

                            <View style={styles.registerButton}>
                                <Button 
                                    uppercase="false"
                                    mode="contained"
                                    onPress={handleSubmit}
                                    disabled={!isValid || isSubmitting}
                                    loading = { isSubmitting }
                                >
                                    Créer mon compte.
                                </Button>
                            </View>


                        </View>
                    )}
                </Formik>

                <View style={styles.loginButton}>
                    <Button uppercase="false" mode="text" onPress={this.login} >
                        Déjà un compte ? Connectez vous.
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
    registerButton: {
        marginTop: '2rem'
    },
    loginButton: {
        marginTop: '1rem'
    }
})