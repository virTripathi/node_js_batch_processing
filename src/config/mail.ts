import NodeMailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const mailerFromEnv = process.env.MAILER??'mailtrap';

function getTransporter(mailer:string=mailerFromEnv) {
    let transporter: NodeMailer.Transporter<SMTPTransport.SentMessageInfo>;
    switch(mailer) {
        case 'mailtrap':
            transporter = NodeMailer.createTransport({
                host: process.env.MAIL_HOST??'',
                port: parseInt(process.env.MAIL_PORT??'25'),
                secure: process.env.MAIL_SECURE==="true",
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD,
                },
            } as SMTPTransport.Options); 
            break;
        default: 
            transporter = NodeMailer.createTransport({
                host: process.env.MAIL_HOST??'',
                port: parseInt(process.env.MAIL_PORT??'25'),
                secure: process.env.MAIL_SECURE,
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD,
                },
            } as SMTPTransport.Options);
            break;

    }
    return transporter;
}

function getAppMailAddress() {
    return process.env.APP_MAIL_ADDRESS??'';
}

function getAppMailName() {
    return process.env.APP_MAIL_NAME??'';
}
export const MailConfig = {getTransporter,getAppMailAddress,getAppMailName};
