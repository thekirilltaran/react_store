import {FacebookFilled,
        LinkedinFilled,
        InstagramFilled,
        MailFilled
        } from '@ant-design/icons';

import "./socials.scss"

export default function Socials () {
    return (
        <div className="socials">
            <a href=""><FacebookFilled/></a>
            <a href=""><LinkedinFilled /></a>
            <a href=""><InstagramFilled /></a>
            <a href=""><MailFilled /></a>
        </div>
    )
}