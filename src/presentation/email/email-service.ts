import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

export interface Attachment {
    filename: string;
    path: string;
}


export class EmailService {

    private transporter = nodemailer.createTransport({

        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    constructor() {}


    async sendEmail( options: SendMailOptions ):Promise<boolean> {
        
        const { to, subject, htmlBody, attachments } = options

        try {
            
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments,
            });

            // console.log( sentInformation );
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email sent',
                origin: 'email.service.ts'
            });
            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email not sent',
                origin: 'email.service.ts'
            });
            return false;
        }
    }

    async sendEmailWithFileSystemLogs( to: string | string[] ){
        const subject = 'Logs del servidor';
        const htmlBody = `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
            <div style="background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                <h3 style="color: #333; font-size: 24px; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
                    Logs de sistema - NOC
                </h3>
                <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                    Estimado equipo de NOC,
                </p>
                <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                    Adjunto encontrarán los registros (logs) del sistema correspondientes a las últimas 24 horas. Estos logs incluyen información crucial sobre el rendimiento, errores, y actividades del sistema, lo que nos permitirá analizar el estado actual y diagnosticar cualquier problema potencial.
                </p>
                <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                    Es fundamental que revisen los logs para identificar cualquier irregularidad o comportamiento inesperado que pueda afectar la operación continua de nuestros servicios. De ser necesario, por favor, tomen las acciones correctivas pertinentes y actualicen al equipo de administración sobre cualquier hallazgo significativo.
                </p>
                <p style="color: #007BFF; font-size: 16px;">
                    <a href="#" style="text-decoration: none; color: #007BFF;">Ver logs adjuntos</a>
                </p>
                <p style="color: #666; font-size: 16px; line-height: 1.5; margin-top: 20px;">
                    Gracias por su atención a este asunto.
                </p>
                <p style="color: #666; font-size: 16px; line-height: 1.5; margin-top: 20px;">
                    Atentamente,<br>
                    [Tu Nombre]<br>
                    [Tu Cargo]<br>
                    [Tu Empresa]
                </p>
            </div>
        </div>
        `;
        const attachments:Attachment[] = [
            {filename: 'logs-all.log', path: './logs/logs-all.log'},
            {filename: 'logs-high.log', path: './logs/logs-high.log'},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log'}
        ];

        return this.sendEmail({
            to, subject, attachments, htmlBody
        });
    }
}