require('dotenv').config();
import 'babel-polyfill';

// Include files to test here.

let assert = require('chai').assert;

describe('Blank Test Suite', () => {
    describe('Default Test', () => {

        it('should run the default test', async () => {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});