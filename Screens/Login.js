import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import logo from '../assets/chickennnn-removebg-preview.png'
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios';



const { width: WIDTH } = Dimensions.get('window')

function Login({navigation}) {
    const [showPass, setShowPass] = useState(true);
    const [press, setPress] = useState(false)
    const [enterUsername, setUsername] = useState()
    const [enterPassword, setPassword] = useState()
    const [token, setToken] = useState()
    const [isAuthenticated, setAuthneticated] = useState(false)

    

    const showPassHandle = () => {
        if (press == false) {
            setPress(true);
            setShowPass(false)
        }
        else {
            setPress(false);
            setShowPass(true)
        }
    }

    const loginHandle = ({}) => {
        axios('https://graded-ex.herokuapp.com/login', {
            method: 'POST',
            data: {
                username: enterUsername,
                password: enterPassword
            }
        })
            .then(res => {
                console.log(res)
                console.log(res.data.token)
                setToken(res.data.token)
                if (res.data.message === 'Login Successful') setAuthneticated(true)
                else {
                    setAuthneticated(false)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const logoutHandle = () =>{
        setAuthneticated(false)
    }
    const output = (
        <View style={styles.backgroundContainer}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.logoText}>huybo</Text>
            </View>

            <View style={styles.inputContainer}>
                <Icon name={'ios-person-outline'}
                    size={28}
                    color={'rgba(255,255,255,0.7)'}
                    style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder={'Username'}
                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                    underlineColorAndroid='transparent'
                    value={enterUsername}
                    onChangeText={text => { setUsername(text) }}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name={'ios-lock-closed-outline'}
                    size={28}
                    color={'rgba(255,255,255,0.7)'}
                    style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder={'Password'}
                    secureTextEntry={showPass}
                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                    underlineColorAndroid='transparent'
                    value={enterPassword}
                    onChangeText={text => setPassword(text)}
                />

                <TouchableOpacity style={styles.btnEye}
                    onPress={showPassHandle}>
                    <Icon name={press == false ? 'ios-eye-outline' : 'ios-eye-off-outline'}
                        size={26} color={'rgba(255,255,255,0.7)'} />

                </TouchableOpacity>

            </View>

            <TouchableOpacity style={styles.btnLogin} >
                <Text style={styles.text} onPress={loginHandle}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSignUp} >
                <Text style={styles.text} >Sign up</Text>
            </TouchableOpacity>
        </View>
    )
     if(isAuthenticated == false) {
         return output
     }
    return (
        <View style={styles.backgroundContainer}>
            <Text>
                You logged in
            </Text>
            <TouchableOpacity style={styles.btnLogin}>
                <Text style={styles.text} onPress={logoutHandle}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
        ;
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: '#E7879A',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50
    },
    logo: {
        width: 150,
        height: 150,
    },
    logoText: {
        color: 'black',
        fontSize: 37,
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.5
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,

    },
    inputIcon: {
        position: 'absolute',
        top: 8,
        left: 37
    },
    inputContainer: {
        marginTop: 10
    },
    btnEye: {
        position: 'absolute',
        top: 8,
        right: 37
    },
    btnLogin: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#1F4B79',
        justifyContent: 'center',
        marginTop: 20
    },
    text: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        textAlign: 'center'
    },
    btnSignUp: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#f49d37',
        justifyContent: 'center',
        marginTop: 20
    }

})

export default Login 