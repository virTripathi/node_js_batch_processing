import { MailConfig } from '../config/mail';

class Mailer {
    
  private mailer = process.env.MAILER;
  private transporter;

    protected getTransporter() {
      return this.transporter;
    }
    
    protected setTransporter(customMailer:string|undefined) {
      return MailConfig.getTransporter(customMailer);
    }

    constructor() {
      this.transporter = this.setTransporter(this.mailer);
    }
    
    public async send(mailTo:string) {
      const info = await this.transporter.sendMail({
        from: MailConfig.getAppMailAddress(),
        to: mailTo,
        subject: this.getSubject(),
        text: this.getTextContent(),
        html: this.getHtmlContent(),
      });
    }

    protected getSubject(): string {
      return "Default Subject";
    }

    protected getTextContent(): string {
      return "Default text content";
    }

    protected getHtmlContent(): string {
      return "<b>Default HTML content</b>";
    }
}

export default Mailer;
