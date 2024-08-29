import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service"



describe('check-service UseCase', () => {

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkServices = new CheckService(
        mockRepository,
        successCallback,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call successCallback when fetch returns true', async() => {

        const wasOk = await checkServices.execute('https://google.com');
        expect( wasOk ).toBeTruthy();
        expect( successCallback ).toHaveBeenCalled()
        expect( errorCallback ).not.toHaveBeenCalled()

        expect( mockRepository.saveLog ).toHaveBeenCalledWith(
            expect.any( LogEntity )
        );
    });

    test('should call errorCallback when fetch returns false', async() => {

        const wasOk = await checkServices.execute('https://guguguugugul.com');
        expect( wasOk ).toBe( false );
        expect( successCallback ).not.toHaveBeenCalled()
        expect( errorCallback ).toHaveBeenCalled()

        expect( mockRepository.saveLog ).toHaveBeenCalledWith(
            expect.any( LogEntity )
        );
    });

})