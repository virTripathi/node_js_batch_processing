import Mailer from "./Mailer";
class WelcomeMail extends Mailer {
    private data: any;

    constructor(data: any) {
      super();
      this.data = data;
    }
  
    protected getSubject(): string {
      return this.data.Subject??'Welcome to'+process.env.APP_NAME;
    }
  
    protected getTextContent(): string {
      return this.data.Body??`Hello, welcome to our platform!`;
    }
  
    protected getHtmlContent(): string {
      return '';
    }
  }
  
  export default WelcomeMail;