import React from 'react'

import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Appbar, Button, Paragraph, Menu, Divider, Provider, Title, Snackbar } from 'react-native-paper';

import FormInput from '../components/FormInput'
import ErrorHelper from '../components/ErrorHelper'

import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup'


export default class HomeScreen extends React.Component {

    state = {
        visible: false,
    };

    _openMenu = () => this.ListeningStateChangedEvent({ visible: true });
    _closeMenu = () => this.ListeningStateChangedEvent({ visible: false });

    handleSubmit = async (infos) => {
        const token = await AsyncStorage.getItem('jwt');
        const headers = {
            'Authorization': 'Bearer ' + token
        };
        axios({
            method: 'POST',
            url: 'http://localhost:6507/api/promos',
            headers: headers,
            data: {
                name: infos.name,
                text: infos.text,
                reduction: infos.reduction,
                start_date: infos.sdate,
                end_date: infos.edate
            }
        })
        .then(async res => {
            this.setState({visible: true});
            this.setState({success_message: res.data.success});
            setTimeout(() =>  this.setState({visible: false}), 2000);
        })
        .catch(err => {
            console.log(err)
            this.setState({visible: true});
            this.setState({err_message: err.data.err_message});
        });
        
    };

    render() {

        const validationSchema = Yup.object().shape({
            name: Yup.string()
            .label('Name')
            .max(15, 'Veuillez saisir un nombre moins longs')
            .required('Veuillez saisir le nom de la promo.'),

            text: Yup.string()
            .label('Text')
            .required('Veuillez saisir une description.')
            .max(200, 'La description est trop longue.'),

            reduction: Yup.string()
            .label('Reduction')
            //.number()
            .required(/*'Veuillez saisir la valeur de la réduction.'*/)
            .min(1, 'La réduction ne peut être inférieur à 1%.')
            .max(2, 'La réduction ne peut être supérieur à 99%.'),

            sdate: Yup.string()
            .label('Sdate')
            // .date()
            .required('Veuillez saisir une date de début.'),

            edate: Yup.string()
            .label('Edate')
            // .date()
            .required('Veuillez saisir une date de fin.'),
        });

        return (
            <SafeAreaView style={styles.container}>
                <Title>Créer une Promotion</Title>

                <Snackbar visible={this.state.visible} DURATION_SHORT>
                    { this.state.success_message || this.state.err_message }
                </Snackbar>

                <Formik
                    initialValues={{ name: '', text: '', reduction: '', sdate: '', edate: '' }} 
                    onSubmit={
                        (values, actions) => {
                            this.handleSubmit(values);
                            actions.resetForm();
                            setTimeout(() => actions.setSubmitting(false), 1000);
                        }}
                    validationSchema={validationSchema}
                >
                    {({ handleChange, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur  }) => (
                        <View style={styles.formContainer}>
                            <View>
                                <FormInput
                                    mode="outlined"
                                    name='name'
                                    onChangeText={handleChange('name')}
                                    label='Nom de la Promo*'
                                    onBlur={handleBlur('name')}
                                    errorValue={touched.name && errors.name}
                                />
                                <ErrorHelper errorValue={touched.name && errors.name} />
                            </View>

                            <View>
                                <FormInput
                                    mode="outlined"
                                    multiline="true"
                                    name='text'
                                    onChangeText={handleChange('text')}
                                    label='Description*'
                                    onBlur={handleBlur('text')}
                                    errorValue={touched.text && errors.text}
                                />
                                <ErrorHelper errorValue={touched.text && errors.text} />
                            </View>

                            <View>
                                <FormInput
                                    mode="outlined"
                                    name='reduction'
                                    onChangeText={handleChange('reduction')}
                                    keyboardType="number-pad"
                                    label='Réduction*'
                                    onBlur={handleBlur('reduction')}
                                    errorValue={touched.reduction && errors.reduction}
                                />
                                <ErrorHelper errorValue={touched.reduction && errors.reduction} />
                            </View>

                            <View>
                                <FormInput
                                    mode="outlined"
                                    name='sdate'
                                    onChangeText={handleChange('sdate')}
                                    label='Début*'
                                    onBlur={handleBlur('sdate')}
                                    errorValue={touched.sdate && errors.sdate}
                                />
                                <ErrorHelper errorValue={touched.sdate && errors.sdate} />
                            </View>

                            <View>
                                <FormInput
                                    mode="outlined"
                                    name='edate'
                                    onChangeText={handleChange('edate')}
                                    label='Fin*'
                                    onBlur={handleBlur('edate')}
                                    errorValue={touched.edate && errors.edate}
                                />
                                <ErrorHelper errorValue={touched.edate && errors.edate} />
                            </View>

                            <View style={styles.loginButton}>
                                <Button 
                                    uppercase="false"
                                    mode="contained"
                                    onPress={handleSubmit}
                                    disabled={!isValid || isSubmitting}
                                    loading = { isSubmitting }
                                >
                                    + Créer la promo
                                </Button>
                            </View>

                        </View>
                    )}
                </Formik>

            </SafeAreaView>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    menu: { 
        paddingTop: 50, 
        flexDirection: 'row', 
        justifyContent: 'center' 
    }
});