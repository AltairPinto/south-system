import { toast } from 'react-toastify';

export const removeSpecialChars = (specialChar: string) => {
  let newString = specialChar;
  newString = newString.replace(/[|&;$%@"<>()+,/]/g, '');
  newString = newString.replace(/_+/, '_');
  newString = newString.replace(/\s/g, '');
  newString = newString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  newString = newString.toLowerCase();
  return newString;
};

export const formatDate = (date: string) => {
  try {
    const formattedDate = date.split('-');
    // const formattedHour = formattedDate[2].substring(3).split(':');
    const dia = formattedDate[2].substring(0, 2);
    const mes = formattedDate[1];
    const ano = formattedDate[0];
    // const hora = formattedHour[0];
    // const minutos = formattedHour[1];
    return `${dia}/${mes}/${ano}`;
  } catch (e) {
    return '00/00/0000';
  }
  // return `${dia}/${mes}/${ano} às ${hora}:${minutos}`;
};

export const currencyMask = (value: string) => {
  let v = value.replace(/\D/g, '');
  v = `${(+v / 100).toFixed(2)}`;
  v = v.replace('.', ',');
  v = v.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
  v = v.replace(/(\d)(\d{3}),/g, '$1.$2,');
  return v;
};
export const currencyConvert = (value: string) => {
  if (value === '') {
    return '';
  }
  let v = value.replace(/\D/g, '');
  v = v.replace('.', ',');
  v = v.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
  v = v.replace(/(\d)(\d{3}),/g, '$1.$2,');
  v = `${(+v / 100).toFixed(3)}`;
  return v;
};
