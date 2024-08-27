import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-datasource";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";



const fsLogReposiroty = new LogRepositoryImpl(
    new FileSystemDatasource(),
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
);

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
);

const emailService = new EmailService();

export class Server {

    public static async start() {
        //todo: Mandar email
        // console.log('Server started...')

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemRepository
        // ).execute(
        //     ['ticcitoby777crepis@gmail.com']
        // )

        // const logs = await logReposiroty.getLogs(LogSeverityLevel.low);
        // console.log(logs);

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';
                new CheckServiceMultiple(
                    [ fsLogReposiroty, mongoLogRepository, postgresLogRepository ],
                    () => console.log( `${ url } is ok` ),
                    ( error ) => console.log( error ),
                ).execute( url );

            }
        );

    }

}