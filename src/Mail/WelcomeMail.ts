import Mailer from "./Mailer";
class WelcomeMail extends Mailer {
    private data: any;
  
    constructor(data: any) {
      super();
      this.data = data;
    }
  
    protected getSubject(): string {
      return `Welcome to the platform, ${this.data.name}!`;
    }
  
    protected getTextContent(): string {
      return `Hello ${this.data.name}, welcome to our platform!`;
    }
  
    protected getHtmlContent(): string {
      return `<h1>Hello ${this.data.name},</h1><p>Welcome to our platform!</p>`;
    }
  }
  
  export default WelcomeMail;
  