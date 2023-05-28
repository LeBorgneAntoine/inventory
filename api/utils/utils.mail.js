const nodemailer = require('nodemailer');
const validator = require('validator').default


/**
 * @returns {MailSender}
 */
function mail(){
    return new MailSender()
}

class MailSender{

    _to;
    _subject;
    _template;
    _injected;
    _transporter;

    constructor(){

        this._transporter = nodemailer.createTransport({
            port: 465,               // true for 465, false for other ports
            host: "smtp.gmail.com",
               auth: {
                    type: 'OAuth2',
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD,
                    clientId: process.env.OAUTH_CLIENTID,
                    clientSecret: process.env.OAUTH_CLIENT_SECRET,
                    refreshToken: process.env.OAUTH_REFRESH_TOKEN
                    },
            secure: true,
        });
    }

    to(mail){
        if(validator.isEmail(mail)){
            this._to = mail
        }else{
            throw new Error('Wrong mail format')
        }
        return this;

    }

    subject(text){
        this._subject = text;
        return this;
    }

    template(templatePath){
        this._template = templatePath;
        return this;

    }

    inject(inject){
        this._injected = inject;
        return this;

    }

    send(){

        return new Promise((resolve, reject) => {

            this._transporter.sendMail({
                to: this._to, 
                subject: this._subject,
                hmtl: {path: this._template}
            }, function (err, info) {
                if(err)
                    reject(err)
                else
                    resolve(info)
                });

        })

       
    }

    


}

module.exports = {
    mail
}