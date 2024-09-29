import NodeMailer from 'nodemailer';

class Mailer {
    protected transporter = NodeMailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: "maddison53@ethereal.email",
            pass: "jn7jnAPss4f63QBp6D",
        },
    });
    
    public async main() {
      
      const info = await this.transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
        to: "bar@example.com, baz@example.com",
        subject: "Hello ✔",
        text: "Hello world?",
        html: "<b>Hello world?</b>",
      });
    
      console.log("Message sent: %s", info.messageId);
    }
}

export default main().catch(console.error);
