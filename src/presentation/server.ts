

import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";
import { EmailService } from "./email/email-service";



const fileSystemRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
);
const emailService = new EmailService();

export class Server {

    public static start() {

        console.log('Server started...')

        new SendEmailLogs(
            emailService,
            fileSystemRepository
        ).execute(
            ['ticcitoby777crepis@gmail.com']
        )
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com';
        //         new CheckService(
        //             fileSystemRepository,
        //             () => console.log( `${ url } is ok` ),
        //             ( error ) => console.log( error ),
        //         ).execute( url );
        //         // new CheckService().execute( 'http://localhost:3000' );

        //     }
        // );

    }

}