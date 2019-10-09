const checked = (value, options) => {
  if (value !== true) {
    return options.message || 'must be checked';
  }
};

const phone = (value, options) => {
  if (!value) {
    return;
  }
  const tamanho = value.replace(/\D/g, '').length; 
  if (tamanho !== 10 && tamanho !== 11) {
    return options.message || 'tamanho inválido';
  }
};

export default {
  checked,
  phone,
};
