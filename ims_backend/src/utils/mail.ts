import nodemailer from 'nodemailer';
import { ERROR_MESSAGES } from '../messages/error_messages';
import { HTTP_STATUS } from '../constants/http_constants';
import { AppError } from '../errors/AppError';


export const sendMail = async (
    to: string,
    subject: string,
    text: string,
    attachments?: any[]
) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            attachments,
        });
    } catch (err) {
        throw new AppError(
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES.EMAIL_FAILED
        );
    }
};
