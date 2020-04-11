/**
 * @file Домашка по FP ч. 2
 * 
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 * 
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 * 
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
import { pipe, __, allPass, then, tap, ifElse, modulo, length, gte, test } from 'ramda';

const api = new Api();

const less10 = (str) => gte(9, length(str));

const more2 = (str) => gte(length(str), 2);

const isPositiveNumber = (str) => test(/^[0-9]+\.?[0-9]+$/, str);

const convertStrToInt = (str) => Math.round(parseFloat(str));

const validator = (str) => allPass([less10, more2, isPositiveNumber])(str);

const getConvertedNumber = async (number) => api.get('https://api.tech/numbers/base', { from: 10, to: 2, number }).then(({ result }) => result);

const getRandomAnimal = async (id) => api.get(`https://animals.tech/${id}`, {}).then(({ result }) => result);

const getSqrNum = (number) => Math.pow(number, 2);

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    pipe(
        tap(writeLog),
        ifElse(
            validator,
            pipe(
                convertStrToInt,
                tap(writeLog),
                getConvertedNumber,
                then(
                    pipe(
                        tap(writeLog),
                        length,
                        tap(writeLog),
                        getSqrNum,
                        tap(writeLog),
                        modulo(__, 3),
                        tap(writeLog),
                        getRandomAnimal,
                    )
                ),
                then(
                    handleSuccess
                )
            ),
            () => handleError('ValidationError'),
        )

    )(value).catch((error) => { handleError(error); });
}

export default processSequence;
