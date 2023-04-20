import { LOCALES } from './locales';
import _reduce from 'lodash/reduce';

import { headerConstants } from './Header/header';

export const messages = {
    [LOCALES.EN]: {
        ..._reduce(headerConstants, (res, { key, value_en }) => ({ ...res, [key]: value_en }), {}),
    },
    [LOCALES.RU]: {
        ..._reduce(headerConstants, (res, { key, value_ru }) => ({ ...res, [key]: value_ru }), {}),
    },
    [LOCALES.UA]: {
        ..._reduce(headerConstants, (res, { key, value_ua }) => ({ ...res, [key]: value_ua }), {}),
    },
    [LOCALES.DE]: {
        ..._reduce(headerConstants, (res, { key, value_de }) => ({ ...res, [key]: value_de }), {}),
    }
};