import QueueRegister from './QueueRegister';

// All Queues Names must follow Title Case and must end with 'Queue'. e.g  => SendEmailQueue

export class Queues {
    public SendEmailQueue = new QueueRegister().createQueue('SendEmailQueue');
}
