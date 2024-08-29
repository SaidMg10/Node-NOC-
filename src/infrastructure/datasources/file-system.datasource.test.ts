import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogDatasource } from '../../domain/datasources/log.datasource';


describe('FileSystemDatasource.ts', () => {

    const logPath = path.join(__dirname, '../../../logs')



    beforeEach(() => {
        fs.rmSync( logPath, { recursive: true, force: true });
    })


    test('should create log files if they do not exists', () => {

        new FileSystemDatasource();
        const files = fs.readdirSync( logPath );
        expect( files ).toEqual( [ 'logs-all.log', 'logs-high.log', 'logs-medium.log' ]);
    });

    test('should save a log in all-logs.log', () => {

        const logDatasource = new FileSystemDatasource();

        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);
        const allLogs = fs.readFileSync( `${ logPath }/logs-all.log`, 'utf-8' );
        expect( allLogs ).toContain( JSON.stringify(log) );

    })

    test('should save a log in all-logs.log and logs-medium.log', () => {

        const logDatasource = new FileSystemDatasource();

        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);
        const allLogs = fs.readFileSync( `${ logPath }/logs-all.log`, 'utf-8' );
        const mediumLogs = fs.readFileSync( `${ logPath }/logs-medium.log`, 'utf-8' );
        expect( allLogs ).toContain( JSON.stringify(log) );
        expect( mediumLogs ).toContain( JSON.stringify(log) );

    })

    test('should save a log in all-logs.log and logs-high.log', () => {

        const logDatasource = new FileSystemDatasource();

        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);
        const allLogs = fs.readFileSync( `${ logPath }/logs-all.log`, 'utf-8' );
        const highLogs = fs.readFileSync( `${ logPath }/logs-high.log`, 'utf-8' );
        expect( allLogs ).toContain( JSON.stringify(log) );
        expect( highLogs ).toContain( JSON.stringify(log) );

    })


    test('should return all logs', async() => {

        const LogDatasource = new FileSystemDatasource();
        const logLow =  new LogEntity({
            message: 'log-low',
            level:LogSeverityLevel.low,
            origin: 'low'
        });

        const logMedium =  new LogEntity({
            message: 'log-medium',
            level:LogSeverityLevel.medium,
            origin: 'medium'
        });

        const logHigh =  new LogEntity({
            message: 'log-high',
            level:LogSeverityLevel.high,
            origin: 'high'
        });

        await LogDatasource.saveLog(logLow);
        await LogDatasource.saveLog(logMedium);
        await LogDatasource.saveLog(logHigh);

        const lowLogs = await LogDatasource.getLogs(LogSeverityLevel.low)
        const mediumLogs = await LogDatasource.getLogs(LogSeverityLevel.medium)
        const highLogs = await LogDatasource.getLogs(LogSeverityLevel.high)

        expect( lowLogs ).toEqual( expect.arrayContaining([ logLow, logMedium, logHigh ]));
        expect( mediumLogs ).toEqual( expect.arrayContaining([ logMedium ]));
        expect( highLogs ).toEqual( expect.arrayContaining([ logHigh ]));


    })

})