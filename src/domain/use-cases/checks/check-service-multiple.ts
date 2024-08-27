import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
    execute( url:string ):Promise<boolean>; 
}


type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;


export class CheckServiceMultiple implements CheckServiceMultipleUseCase{


    constructor(
        private readonly logRepository: LogRepository[],
        private readonly  successCallback:SuccessCallback,
        private readonly  errorCallback:ErrorCallback,
    ) {}

    private callLogs( log: LogEntity) {
        this.logRepository.forEach( logRepository => {
            logRepository.saveLog(log);
        });
    }

    public async execute( url: string ): Promise<boolean> {


        try {
            
            const req = await fetch( url );
            if ( !req.ok ) {
                throw new Error( `Error on check service ${ url }` );
            }
            const options = {
                message:  `Service ${ url } working`,
                level: LogSeverityLevel.low,
                origin: 'check-services.ts'
            }
            const log = new LogEntity( options )
            this.callLogs( log );
            this.successCallback && this.successCallback();

            return true;
        } catch (error) {
            const options = {
                message: `${ url } is not ok. ${ error }`,
                level: LogSeverityLevel.high,
                origin: 'check-services.ts'
            }
            const log = new LogEntity( options );
            this.callLogs( log );
            this.errorCallback && this.errorCallback( `${ error }` );
            
            return false
        }
        
    }
}

// `Service ${ url } working`, LogSeverityLevel.low, createdAt, origin 
// const errorMessage = `${ url } is not ok. ${ error }`;