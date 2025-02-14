<template>
  <q-input
    v-bind="$attrs"
    :value="formattedValue"
    @input="onInput"
    clearable
    outlined
    dense
    inputmode="decimal"
    label="Valor"
  />
</template>

<script>
import { watch } from 'vue';
import { useCurrencyInput } from 'vue-currency-input';

export default {
  props: {
    modelValue: {
      type: [Number, String],
      required: true,
    },
  },
  setup(props, { emit }) {
    const options = {
      locale: 'pt-BR',
      currency: 'BRL',
      currencyDisplay: 'symbol',
      precision: 2,
    };

    const { formattedValue, setValue } = useCurrencyInput(options);

    // Sincronizando o valor numérico com o modelo de entrada
    watch(
      () => props.modelValue,
      (newValue) => {
        // Limpa qualquer formatação e garante que o valor seja numérico
        setValue(newValue);
      },
      { immediate: true }
    );

    const onInput = (value) => {
      // Remove qualquer formatação e converte para número
      const cleanValue = parseFloat(value.replace(/[^\d.-]/g, '')) || 0;
      emit('update:modelValue', cleanValue);
    };

    return {
      formattedValue, // Formatação que será mostrada no input
      onInput,        // Método de captura do valor para emitir no modelo
    };
  },
};
</script>
