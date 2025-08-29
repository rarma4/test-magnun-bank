/**
 * Utilitários para formatação de valores monetários no padrão brasileiro
 */

/**
 * Formata um valor numérico como string no padrão monetário brasileiro
 * @param value - Valor numérico ou string numérica
 * @returns String formatada como moeda brasileira (ex: "R$ 1.234,56")
 */
export const formatCurrency = (value: number | string): string => {
  const numericValue = typeof value === 'string' ? value.replace(/\D/g, "") : String(value);
  
  if (numericValue === "" || numericValue === "0") return "R$ 0,00";
  
  // Se for string, converte para número e divide por 100 para ter centavos
  const numberValue = typeof value === 'string' 
    ? Number(numericValue) / 100 
    : Number(value);
  
  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

/**
 * Formata um valor de input (string) para exibição monetária
 * @param value - String de entrada do usuário
 * @returns String formatada como moeda brasileira
 */
export const formatCurrencyInput = (value: string): string => {
  const numericValue = value.replace(/\D/g, "");
  
  if (numericValue === "") return "";
  
  const numberValue = Number(numericValue) / 100;
  
  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

/**
 * Extrai o valor numérico de uma string formatada como moeda
 * @param formattedValue - String formatada (ex: "R$ 1.234,56")
 * @returns String numérica (ex: "1234.56")
 */
export const extractNumericValue = (formattedValue: string): string => {
  return formattedValue
    .replace(/[R$\s]/g, "") // Remove R$, espaços
    .replace(/\./g, "") // Remove pontos de milhares
    .replace(/,/g, "."); // Substitui vírgula decimal por ponto
};

/**
 * Valida se um valor monetário é válido
 * @param value - String formatada ou numérica
 * @returns Boolean indicando se o valor é válido
 */
export const validateAmount = (value: string): boolean => {
  const numericValue = extractNumericValue(value);
  const amount = Number(numericValue);
  return !isNaN(amount) && amount > 0;
};

/**
 * Handler para mudanças em campos de input monetário
 * @param value - Valor atual do input
 * @param setValue - Função para atualizar o estado
 * @param maxDigits - Número máximo de dígitos (padrão: 10)
 */
export const handleCurrencyChange = (
  value: string, 
  setValue: (value: string) => void, 
  maxDigits: number = 10
): void => {
  // Se o campo está vazio, limpa o valor
  if (value === "") {
    setValue("");
    return;
  }
  
  // Remove formatação existente para evitar duplicação
  const cleanValue = value.replace(/[R$\s.,]/g, "");
  
  // Se não há números, não faz nada
  if (cleanValue === "") {
    setValue("");
    return;
  }
  
  // Limita a quantidade de dígitos para evitar valores muito grandes
  const limitedValue = cleanValue.slice(0, maxDigits);
  
  // Formata o valor
  const formattedValue = formatCurrencyInput(limitedValue);
  setValue(formattedValue);
};

/**
 * Converte um valor numérico para exibição simples (sem R$)
 * @param value - Valor numérico
 * @returns String formatada sem símbolo da moeda
 */
export const formatNumber = (value: number): string => {
  return value.toLocaleString("pt-BR", { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  });
};
