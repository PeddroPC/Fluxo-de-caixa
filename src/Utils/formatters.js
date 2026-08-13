// Utilitários de formatação centralizados para eliminar duplicação entre componentes.

/**
 * Formata um número como moeda brasileira (R$).
 * @param {number} value
 * @returns {string} ex: "R$ 1.500,00"
 */
export const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value || 0));

/**
 * Formata um número como percentual com 2 casas decimais.
 * @param {number} value
 * @returns {string} ex: "12,50%"
 */
export const formatPercent = (value, decimals = 2) =>
  `${Number(value || 0).toFixed(decimals).replace(".", ",")}%`;

/**
 * Formata uma string de data ISO (YYYY-MM-DD) para o formato brasileiro (DD/MM/AAAA).
 * Usa UTC para evitar problemas de timezone que podem deslocar a data em 1 dia.
 * @param {string} dateString
 * @returns {string} ex: "15/08/2026"
 */
export const formatDate = (dateString) => {
  if (!dateString) return "—";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

/**
 * Formata uma data para formato curto com mês por extenso.
 * @param {string} dateString
 * @returns {string} ex: "15 Ago 2026"
 */
export const formatShortDate = (dateString) => {
  if (!dateString) return "—";
  const months = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  const [year, month, day] = dateString.split("-");
  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
};

/**
 * Formata a variação com sinal (+ ou -) e símbolo de moeda.
 * @param {number} amount
 * @param {boolean} isPositive
 * @returns {string} ex: "+ R$ 830,00"
 */
export const formatVariation = (amount, isPositive) => {
  const sign = isPositive ? "+" : "-";
  return `${sign} ${formatCurrency(Math.abs(amount))}`;
};

/**
 * Retorna o nome abreviado do mês em pt-BR.
 * @param {number} month 1–12
 * @returns {string}
 */
export const getMonthName = (month) => {
  const months = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  return months[month - 1] ?? "";
};
