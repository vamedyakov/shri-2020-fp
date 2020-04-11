/**
 * @file Домашка по FP ч. 1
 * 
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import { SHAPES, COLORS } from '../constants';

import {
    prop,
    equals,
    not,
    and,
    length,
    values,
    filter,
    gte,
    propEq,
    allPass,
    __
} from 'ramda';

const getCountColor = (obj, color) => length(filter(equals(color), values(obj)));


// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (figures) => allPass([
    propEq(SHAPES.TRIANGLE, COLORS.WHITE),
    propEq(SHAPES.CIRCLE, COLORS.WHITE),
    propEq(SHAPES.STAR, COLORS.RED),
    propEq(SHAPES.SQUARE, COLORS.GREEN)
])(figures);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (figures) => gte(getCountColor(figures, COLORS.GREEN), 2);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (figures) => equals(getCountColor(figures, COLORS.RED), getCountColor(figures, COLORS.BLUE));

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = (figures) => allPass([
    propEq(SHAPES.STAR, COLORS.RED),
    propEq(SHAPES.SQUARE, COLORS.ORANGE),
    propEq(SHAPES.CIRCLE, COLORS.BLUE)
])(figures);


// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (figures) => {
    const colors = {
        red: getCountColor(figures, COLORS.RED),
        blue: getCountColor(figures, COLORS.BLUE),
        orange: getCountColor(figures, COLORS.ORANGE),
        green: getCountColor(figures, COLORS.GREEN),
    };

    return gte(length(filter(gte(__, 3), values(colors))), 1);
};

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = (figures) => {
    const triangle = equals(COLORS.GREEN, prop(SHAPES.TRIANGLE, figures));
    const colors = {
        red: gte(getCountColor(figures, COLORS.RED), 1),
        green: gte(getCountColor(figures, COLORS.GREEN), 2),
    };

    return and(triangle, and(colors.red, colors.green));
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (figures) => equals(getCountColor(figures, COLORS.ORANGE), length(values(figures)));

// 8. Не красная и не белая звезда.
export const validateFieldN8 = (figures) => and(
    not(equals(COLORS.RED, prop(SHAPES.STAR, figures))),
    not(equals(COLORS.WHITE, prop(SHAPES.STAR, figures)))
);

// 9. Все фигуры зеленые.
export const validateFieldN9 = (figures) => equals(getCountColor(figures, COLORS.GREEN), length(values(figures)));

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = (figures) => and(
    not(equals(COLORS.WHITE, prop(SHAPES.TRIANGLE, figures))),
    equals(prop(SHAPES.TRIANGLE, figures), prop(SHAPES.SQUARE, figures))
);
