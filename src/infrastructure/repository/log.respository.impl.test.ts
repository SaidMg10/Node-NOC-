import { LogRepositoryImpl } from './log.repository.impl';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';



describe('log.repository.impl.ts', () => {

    const log = new LogEntity({
        message: 'Testing',
        level: LogSeverityLevel.low,
        origin: 'log.repository.test.ts'
    })

   const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
   }

   const logRepository = new LogRepositoryImpl(mockLogDatasource);

   beforeEach(() => {
    jest.clearAllMocks();
   })

    test('saveLog should call the datasource with arguments', async() => {

        await logRepository.saveLog(log)
       expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);

    });

    test('getLog should call the datasource with arguments', async() => {


        await logRepository.getLogs( log.level );
        expect( mockLogDatasource.getLogs ).toHaveBeenCalledWith( log.level )

    });
})