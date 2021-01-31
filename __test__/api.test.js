import Api from '../src/client/js/Api';
import * as DateUtil from '../src/client/js/Util/dateHelper.js';

// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe('Testing the Api logic', () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.
    test('Testing the Express Api function existance', () => {
        expect(Api).toBeDefined();
    });

    test('Testing the Express Api funtctionality', () => {
        // Arrange
        const currentDate = DateUtil.getCurrentDateAsString();
        // ACT
        return Api('London', 'GB', 'England', currentDate).then(
            ({ coordinates, countryName, countryCode, cityName, departureDate, days, weather, image }) => {
                // ASSERT
                expect(coordinates).not.toEqual(null);
                expect(countryName).not.toEqual(null);
                expect(countryCode).not.toEqual(null);
                expect(cityName).not.toEqual(null);
                expect(departureDate).not.toEqual(null);
                expect(days).not.toEqual(null);
                expect(weather).not.toEqual(null);
                expect(image).not.toEqual(null);
            }
        );
    });
});
