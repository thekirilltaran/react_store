import { useState, useRef } from "react";
import {useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import {signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    createUserWithEmailAndPassword,
    sendEmailVerification} from "firebase/auth";
import {db, auth, storage} from 'apis/fiebase';
import {doc, setDoc} from "firebase/firestore";
import {setUser} from 'reducers/usersReducer/userReducer';
import useMessages from "hooks/useMessages";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
    Button,
    Input,
    Select,
    Space,
    Form,
    Checkbox,
    DatePicker } from "antd";
import {
    FacebookOutlined,
    GoogleOutlined } from "@ant-design/icons";


import dayjs from 'dayjs';

import { signUpInputs } from "sctructure/srtSignUp";

import {UploadPhoto} from "./UploadPhoto";


export default function FormSignUp() {
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {showMess, contextHolder} = useMessages();
    const [avatar, setAvatar] = useState([]);
    const formRef = useRef(null);

    //function change photo in form preview and save File to array
    const handleChangePhoto = ({fileList:value}) => {
        setAvatar(value);
    }

    //function upload image file to database store
    const uploadImageProfile = (image) => {
        return new Promise(function(resolve, reject) {
            const storageRef = ref(storage, image.name);
            const uploadTask = uploadBytesResumable(storageRef, image.originFileObj);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    switch (snapshot.state) {
                        case 'paused':
                            // console.log('Upload is paused');
                            break;
                        case 'running':
                            // console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        resolve(downloadURL);
                    });
                }
            );
        });
    }

    //function check value of field and add to Array
    const handleChange = (value, id)=> {
        const text = id != "birthday" ? value : dayjs(value).format('DD/MM/YYYY');
        setData({ ...data, [id]: text });
    };

    //function add data of birthday to form field
    const disabledDate = (current) => {
        let currentYear = new Date()
        return current && current > dayjs().year(currentYear.getFullYear() - 10);
    };

    //function create user profile with facebook account
    const handleRegisterFacebook = (e)=> {
        const provider = new FacebookAuthProvider();
        // signInWithPopup(auth, provider)
        //     .then((result) => {
        //         // The signed-in user info.
        //         // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        //         const credential = FacebookAuthProvider.credentialFromResult(result);
        //         const accessToken = credential.accessToken;
        //         const user = result.user;
        //         // IdP data available using getAdditionalUserInfo(result)
        //         dispatch(setUser({
        //             email: user.email,
        //             id: user.uid,
        //             token: user.accessToken,
        //         }));
        //         // sendEmailVerification(user)
        //         navigate('/profile');
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //         showMess("error", error.message)
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         // The email of the user's account used.
        //         const email = error.customData.email;
        //         // The AuthCredential type that was used.
        //         const credential = FacebookAuthProvider.credentialFromError(error);
        //     });
    }

    //function create user profile with google account
    const handleRegisterGoogle = (e)=> {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                sendEmailVerification(user)
                navigate('/profile');
            }).catch((error) => {
            console.log(error)
            showMess("error", error.message)
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    //function create user profile if all fields exist
    const onFinish =  (values) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async ({user}) => {
                sendEmailVerification(user)
                const image = avatar ? await uploadImageProfile(avatar[0]) : "No image"
                return {user, image};
            }).then(({user, image})=> {
                console.log(user.uid)
                dispatch(setUser({
                    fullName: data?.username,
                    phone: data?.phone,
                    avatar: image,
                    birthday: data?.birthday,
                    gender: data?.gender,
                    language: data?.language,
                }));
                setDoc(doc(db, "users", user.uid), {
                    avatar: image,
                    fullName: data?.username,
                    phone: data?.phone,
                    birthday: data?.birthday,
                    gender: data?.gender,
                    language: data?.language,
                });

                navigate('/profile');
            })
            .catch((error) => {
                console.log(error)
                showMess("error", error.message)
            })
    };

    //function show error if user have some issue with registration
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        showMess("error", "You have some issue")
    };

    return (<>
            {contextHolder}
            <Form
                ref={formRef}
                name="complex-form"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                scrollToFirstError
            >
                {signUpInputs.map(field=> {
                    return(<Form.Item key={field.id} noStyle>
                                {field.tag === "select" &&
                                <Form.Item
                                    name={field.id}
                                    key={field.id}
                                    label={field.id}
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Select
                                        onChange={(e)=>handleChange(e, field.id)}
                                        options={field.options}
                                        id={field.id}
                                        name={field.id}
                                    />
                                </Form.Item>}

                                {field.tag === "datapicker" &&
                                    <Form.Item
                                        name={field.id}
                                        key={field.id}
                                        label={field.id}
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                    >
                                        <DatePicker
                                            style={{width: '100%'}}
                                            format="YYYY-MM-DD"
                                            onChange={(e)=>handleChange(e, field.id)}
                                            disabledDat={disabledDate}
                                            id={field.id}
                                            name={field.id}
                                            cellRender={(current) => {
                                                const style = {};
                                                if (current.date() === 1) {
                                                    style.border = '1px solid #1890ff';
                                                    style.borderRadius = '50%';
                                                }
                                                return (
                                                    <div className="ant-picker-cell-inner"
                                                         style={style}>
                                                        {current.date()}
                                                    </div>
                                                );
                                            }}
                                        />
                                    </Form.Item>}
                                    {field.tag === "input" &&
                                        <Form.Item
                                                name={field.id}
                                                key={field.id}
                                                label={field.id}
                                                rules={[{ required: true, message: 'Please input your username!' }]}
                                            >

                                    <Input type={field.type}
                                           placeholder={field.label}
                                           onChange={(e)=>handleChange(e.target.value, field.id)}
                                           id={field.id}
                                           value={data.id}
                                           name={field.id}
                                    />
                                </Form.Item>}
                        {field.tag === "avatar" &&<Form.Item
                                        name={field.id}
                                        key={field.id}
                                        label={field.id}
                                    >

                                   <UploadPhoto id={field.id} avatar={avatar} onChangePhoto={handleChangePhoto}/>
                                    </Form.Item>}
                          </Form.Item>)
                })}

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Space>
                        <Button type="primary" htmlType="submit">Sign Up</Button>
                        <Button type="default"  htmlType="button" onClick={handleRegisterGoogle}>Sign Up google <GoogleOutlined /></Button>
                        <Button type="primary"  htmlType="button" onClick={handleRegisterFacebook}>Sign Up Facebook <FacebookOutlined /></Button>
                    </Space>
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <div className="action-form">
                        <p>Have account? <Link to="/login">Log in</Link></p>
                    </div>
                </Form.Item>
            </Form>
        </>
    )
}