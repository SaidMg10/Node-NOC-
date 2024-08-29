import { envs } from "./envs.plugin";





describe('envs.plugin.ts', () => {


    test('should return env options', ()=> {

        expect( envs ).toEqual({
            
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'ticcitoby777crepis@gmail.com',
            MAILER_SECRET_KEY: 'ekzpjwiqhvetiqed',
            PROD: false,
            MONGO_URL: 'mongodb://said:123456789@localhost:27017/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'said',
            MONGO_PASS: '123456789',
            POSTGRES_URL: 'postgresql://postgres:123456789@localhost:5432/NOC-TEST',
            POSTGRES_USER: 'postgres',
            POSTGRES_DB: 'NOC-TEST',
            POSTGRES_PASSWORD: '123456789'

        });


    });


    test('should return error if not found env', async () => {

        jest.resetModules();
        process.env.PORT = 'aBC';

        try {
            await import('./envs.plugin');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }

    });


});