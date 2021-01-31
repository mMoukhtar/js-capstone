import validate from '../src/client/js/Util/validations';

// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe('Testing the inputs validation logic', () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.
    test('Testing the function existance', () => {
        expect(validate).toBeDefined();
    });

    test('Testing the validate() funtctionality', () => {
        // Arrange
        // ACT
        const { isValid: valid } = validate('someCityName', 1, '12/01/2021');
        const { isValid: inValid1 } = validate('', 0, '');
        const { isValid: inValid2 } = validate('', -1, '');
        const { isValid: inValid3 } = validate('12313', 1, '12313');
        const { isValid: inValid4 } = validate('dfdsff', 1, 'sdfss');
        const { isValid: inValid5 } = validate('dfdsff', 1, 'sdfss10/10/2021');
        const { isValid: inValid6 } = validate('', 1, '10/10/2021');
        const { isValid: inValid7 } = validate('111111', 1, '10/10/2021');
        const { isValid: inValid8 } = validate('somesicty', 'sdd', '');
        // ASSERT
        expect(valid).toBeTruthy();
        expect(inValid1).toBeFalsy();
        expect(inValid2).toBeFalsy();
        expect(inValid3).toBeFalsy();
        expect(inValid4).toBeFalsy();
        expect(inValid5).toBeFalsy();
        expect(inValid6).toBeFalsy();
        expect(inValid7).toBeFalsy();
        expect(inValid8).toBeFalsy();
    });
});
