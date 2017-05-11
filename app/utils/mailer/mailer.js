const nodemailer = require("nodemailer");
let poolConfig = 'smtps://kliment.lambevski%40gmail.com:wocahootoshumglx@smtp.gmail.com/?pool=true';

let transporter = nodemailer.createTransport(poolConfig);

function sentActivationMail(user, host) {
    transporter.sendMail({
        from: 'kliment.lambevski@gmail.com',
        to: user.email,
        subject: 'Activate your account',
        html: `
            <div>
                <p>Hello ${user.name} ${user.lastName}</p>
                <p>Please follow this <a href="${host}/#/activation/${user.activationId}">link</a> in order to activate your account</p>
            </div>
        `
    }, (err) => {
        console.log(err);
    })
}

function sendInvitationMail(user, host) {
    transporter.sendMail({
        from: 'kliment.lambevski@gmail.com',
        to: user.email,
        subject: 'You have been invited to join our application',
        html: `
            <div>
                <p>Please follow this <a href="${host}/#/invitation/${user.email}/${user.activationId}">link</a> in order to join in our application</p>
            </div>
        `
    }, (err) => {
        console.log(err);
    })
}

module.exports = {
    transporter,
    sentActivationMail,
    sendInvitationMail
};