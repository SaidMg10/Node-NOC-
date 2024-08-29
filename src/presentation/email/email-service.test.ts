
import { EmailService, SendMailOptions } from "./email-service"
import nodemailer from 'nodemailer';



describe('email-service.test.ts', () => {
    
    const mockSendMail = jest.fn();
    
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });

    const emailService = new EmailService();
    
    test('should send email', async() => {


        const options: SendMailOptions = {
            to: 'ticcitoby777crepis@gmail.com',
            subject: 'Test',
            htmlBody: '<h1>Test</h1>'
        }

        const sent = await emailService.sendEmail(options);
        expect( sent ).toBe(true);


        expect( mockSendMail ).toHaveBeenCalledWith({
            html: "<h1>Test</h1>",
            subject: "Test",
            to: "ticcitoby777crepis@gmail.com"
        })

    })


    test('should send email with attachments', async() => {

        const email = 'ticcitoby77crepis@gmail.com'
        await emailService.sendEmailWithFileSystemLogs( email );

        expect( mockSendMail ).toHaveBeenCalledWith({
            to: email,
            subject: "Logs del servidor",
            html: expect.any(String),
            attachments: expect.arrayContaining( [
                {filename: 'logs-all.log', path: './logs/logs-all.log'},
                {filename: 'logs-high.log', path: './logs/logs-high.log'},
                {filename: 'logs-medium.log', path: './logs/logs-medium.log'}    
            ])
        });

    })

})