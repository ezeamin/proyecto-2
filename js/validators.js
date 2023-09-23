'use strict';

import { getCategoriesFromLS } from './utilities.js';

export const validateEmail = (value, field) => {
  // Cantidad de digitos menor a 4
  if (value.trim().length < 4) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    return false;
  }

  // Cantidad de digitos mayor a 100
  if (value.trim().length > 100) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    return false;
  }

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!regex.test(value)) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    return false;
  }

  field.classList.remove('is-invalid');
  field.classList.add('is-valid');
  return true;
};

export const validatePassword = (value, field) => {
  // Cantidad de digitos menor a 4
  if (value.trim().length < 4) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    return false;
  }

  // Cantidad de digitos mayor a 60
  if (value.trim().length > 60) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    return false;
  }

  // TODO: Agregar validacion de patrón de contraseña

  field.classList.remove('is-invalid');
  return true;
};

export const validateName = (value, field) => {
  // Minima long del nombre
  if (value.trim().length <= 2) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');

    return false;
  }

  // Maxima long del nombre
  if (value.trim().length >= 100) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    return false;
  }

  field.classList.remove('is-invalid');
  field.classList.add('is-valid');
  return true;
};

export const validateNumber = (value, field) => {
  // Cantidad de digitos distinta a 10 caracteres
  // 381 123 4567
  if (value.trim().length !== 10) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    return false;
  }

  // No tenga caracteres no numericos
  if (isNaN(Number(value))) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    return false;
  }

  field.classList.remove('is-invalid');
  field.classList.add('is-valid');
  return true;
};

export const validateURL = (value, field) => {
  // Cantidad de digitos menor a 4
  if (value.trim().length < 4) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    return false;
  }

  // Cantidad de digitos mayor a 300
  if (value.trim().length > 300) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    return false;
  }

  const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

  if (!regex.test(value)) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    return false;
  }

  field.classList.remove('is-invalid');
  field.classList.add('is-valid');
  return true;
};

export const validateType = (value, field) => {
  const validTypes = ['serie', 'film'];

  if (!validTypes.includes(value)) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');

    return false;
  }

  field.classList.remove('is-invalid');
  field.classList.add('is-valid');
  return true;
};

export const validateCategory = (value, field) => {
  const categoriesList = getCategoriesFromLS();
  const categoriesIds = categoriesList.map((category) => category.id);

  if (!categoriesIds.includes(value)) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');

    return false;
  }

  field.classList.remove('is-invalid');
  field.classList.add('is-valid');
  return true;
};

export const validateDescription = (value, field) => {
  // Minima long del nombre
  if (value.trim().length <= 2) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');

    return false;
  }

  // Maxima long del nombre
  if (value.trim().length >= 600) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    return false;
  }

  field.classList.remove('is-invalid');
  field.classList.add('is-valid');
  return true;
};
