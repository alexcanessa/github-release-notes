import { assert } from 'chai';
import fs from 'fs';
import YAML from 'yamljs';
import * as utils from '../lib/src/_utils';

describe('_utils.js', () => {
    describe('sortObject', () => {
        it('Should return a sorted Object', () => {
            const unSortedObject = {
                b: 2,
                a: 1,
                d: 4,
                c: 3
            };
            const sortedObject = {
                a: 1,
                b: 2,
                c: 3,
                d: 4
            };
            assert.deepEqual(utils.sortObject(unSortedObject), sortedObject, 'Passing an Object');
        });
    });

    describe('convertStringToArray', () => {
        it('Should return an empty Array', () => {
            assert.deepEqual(utils.convertStringToArray(false), [], 'Passing false');
            assert.deepEqual(utils.convertStringToArray(undefined), [], 'Passing false');
            assert.deepEqual(utils.convertStringToArray([]), [], 'Passing empty Array');
        });

        it('Should return the same Array/Object', () => {
            const flatArray = [1, 2, 3];
            const flatWordsArray = ['one', 'two', 'three'];
            assert.deepEqual(utils.convertStringToArray(flatArray), flatArray, 'Given a flat Array');
            assert.deepEqual(utils.convertStringToArray(flatWordsArray), flatWordsArray, 'Given a flat Array');

            const deepArray = [[1, 2, 3], [4, 5, 6], 3];
            assert.deepEqual(utils.convertStringToArray(deepArray), deepArray, 'Given a deep Array');

            const flatObject = {
                a: 1,
                b: 2,
                c: 3
            };
            assert.deepEqual(utils.convertStringToArray(flatObject), Object.values(flatObject), 'Given a flat Object');

            const deepObject = {
                a: [1, 2, 3],
                b: [4, 5, 6],
                c: 3
            };
            assert.deepEqual(utils.convertStringToArray(deepObject), Object.values(deepObject), 'Given a deep Object');

            assert.deepEqual(utils.convertStringToArray('1, 2, 3'), ['1', '2', '3'], 'Given a string with spaces');
            assert.deepEqual(utils.convertStringToArray('1,2,3'), ['1', '2', '3'], 'Given a string without spaces');
        });

        it('Should replace the underscores with spaces', () => {
            assert.deepEqual(utils.convertStringToArray('one_1, two_2, three_3'), ['one 1', 'two 2', 'three 3']);
        });
    });

    describe('formatDate', () => {
        it('Should return the string of the formatted date', () => {
            assert.deepEqual(utils.formatDate(new Date(0)), '01/01/1970', 'Given a date object.');
        });
    });

    describe('dashToCamelCase', () => {
        it('Should return a camelCase string', () => {
            assert.deepEqual(utils.dashToCamelCase('this-is-a-string'), 'thisIsAString', 'Given a string with dashes.');
            assert.deepEqual(utils.dashToCamelCase('tHIs-Is-a-sTriNg'), 'thisIsAString', 'Given a string with random capital letters');
        });
    });

    describe('isInRange', () => {
        it('Should return if a number is in between a range', () => {
            assert.deepEqual(utils.isInRange(2, 1, 3), true, 'Given a number in range');
            assert.deepEqual(utils.isInRange(1, 2, 3), false, 'Given a number below range');
            assert.deepEqual(utils.isInRange(4, 1, 3), false, 'Given a number above range');
            assert.deepEqual(utils.isInRange(-1, 1, 3), false, 'Given a number above range, negative');
            assert.deepEqual(utils.isInRange(-1, -3, 0), true, 'Given a number in range, negative');
            assert.deepEqual(utils.isInRange(2, 2, 5), true, 'Given same number as first range value');
            assert.deepEqual(utils.isInRange(5, 2, 5), false, 'Given same number as last range value');
        });
    });

    describe('requireConfig', () => {
        const files = [
            '.grenrc.yml',
            '.grenrc.json',
            '.grenrc.yaml',
            '.grenrc.js',
            '.grenrc'
        ].map(file => `${process.cwd()}/test/.temp/${file}`);
        const simpleObject = {
            a: 1,
            b: 2
        };
        const ymlFileContent = YAML.stringify(simpleObject);
        const jsonFileContent = JSON.stringify(simpleObject);

        beforeEach(() => {
            files.forEach(file => {
                if (file.match(/\.yml$|yaml$/)) {
                    fs.writeFileSync(file, ymlFileContent);

                    return;
                }

                if (file.match(/\.json$/)) {
                    fs.writeFileSync(file, jsonFileContent);

                    return;
                }

                if (file.match(/\.js$/)) {
                    fs.writeFileSync(file, `module.exports = ${jsonFileContent}`);

                    return;
                }

                fs.writeFileSync(file, jsonFileContent);
            });
        });

        it('Should return false', () => {
            assert.isNotOk(utils.requireConfig('this/does/not/.exist.json'), 'Invalid path');
        });

        it('Should return the Object from any of the supported files', () => {
            files.forEach(file => {
                assert.deepEqual(utils.requireConfig(file), simpleObject, `Using ${file}`);
            });
        });

        afterEach(() => {
            files.forEach(file => fs.unlinkSync(file));
        });
    });

    describe('getConfigFromFile', () => {
        const filename = process.cwd() + '/test/.temp/.grenrc';
        const fileContent = {
            a: 1,
            b: 2
        };

        beforeEach(() => {
            fs.writeFileSync(filename, JSON.stringify(fileContent));
        });

        it('Should always return an Object', () => {
            assert.isOk(typeof utils.getConfigFromFile(process.cwd() + '/test/.temp') === 'object', 'The type is an object');
            assert.deepEqual(utils.getConfigFromFile(process.cwd() + '/test/.temp'), fileContent, 'Given the right path');
            assert.deepEqual(utils.getConfigFromFile(process.cwd() + '/test'), {}, 'Given a path with no config file');
        });

        afterEach(() => {
            fs.unlinkSync(filename);
        });
    });

    describe('noop', () => {
        it('Should be a function that returns undefined', () => {
            assert.deepEqual(utils.noop(), undefined, 'Running the function');
        });
    });
});
