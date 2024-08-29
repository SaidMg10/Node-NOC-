import { json } from "stream/consumers";
import { LogEntity, LogSeverityLevel } from "./log.entity"



describe('log.entity.ts', () => {

    const dataObj = new LogEntity({
        message: 'Hola mundo',
        origin: 'log.entity.test.ts',
        level: LogSeverityLevel.high
    });

    test('should create a LogEntity instance', () => {

        const log = new LogEntity(dataObj)

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.message ).toBe( dataObj.message );
        expect( log.origin ).toBe( dataObj.origin );
        expect( log.level ).toBe( dataObj.level );
        expect( log.createdAt ).toBeInstanceOf( Date );
        
    });


    test('should create a LogEntity instance from json', () => {

        const json = `{"message":"Service https://google.com working","level":"low","createdAt":"2024-08-27T14:34:10.838Z","origin":"check-services.ts"}`;

        const log = LogEntity.fromJson(json);

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.message ).toBe( "Service https://google.com working" );
        expect( log.origin ).toBe( "check-services.ts" );
        expect( log.level ).toBe( LogSeverityLevel.low );
        expect( log.createdAt ).toBeInstanceOf( Date );
    });

    test('should create a LogEntity instance from object', () => {

        const log = LogEntity.fromObject(dataObj)

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.message ).toBe( dataObj.message );
        expect( log.origin ).toBe( dataObj.origin );
        expect( log.level ).toBe( dataObj.level );
        expect( log.createdAt ).toBeInstanceOf( Date );
        

    });

})