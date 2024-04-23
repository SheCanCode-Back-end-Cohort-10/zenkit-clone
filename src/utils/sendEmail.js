export const sendEmail = (recipient, subject, body) => {
    const email = {
        recipient: recipient,
        subject: subject,
        body: body
    }

    console.log(email);
}