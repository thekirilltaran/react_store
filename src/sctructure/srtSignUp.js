export const signUpInputs = [
    {
        id: "username",
        label: "Full name",
        type: "text",
        placeholder: "Full name",
        name: "name",
        tag: "input"
    },
    {
        id: "birthday",
        label: "Birthday",
        type: "text",
        placeholder: "Birthday",
        name: "birthday",
        tag: "datapicker"
    },
    {
        id: "phone",
        label: "Phone",
        type: "number",
        placeholder: "Phone",
        name: "phone",
        tag: "input"
    },
    {
        id: "gender",
        label: "Gender",
        type: "text",
        placeholder: "Gender",
        name: "gender",
        tag: "select",
        options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'notsay', label: 'Not say' },
        ]
    },
    {
        id: "language",
        label: "Language",
        type: "text",
        placeholder: "language",
        name: "language",
        tag: "select",
        options: [
            { value: 'en', label: 'EN' },
            { value: 'ua', label: 'UA' },
            { value: 'ru', label: 'RU' },
            { value: 'de', label: 'DE' },
        ]
    },
    {
        id: "email",
        label: "Email",
        type: "mail",
        placeholder: "Email",
        name: "email",
        tag: "input"
    },
    {
        id: "avatar",
        label: "Avatar",
        type: "file",
        placeholder: "avatar",
        name: "avatar",
        tag: "avatar"
    },
    {
        id: "password",
        label: "Password",
        type: "password",
        placeholder: "password",
        name: "password",
        tag: "input"
    },
];

