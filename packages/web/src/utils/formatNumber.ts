export const formatDigits = (str: string | number | undefined) => {
  if (str == undefined) return '---'
  return Number(str).toLocaleString('pt-BR', {
    // formata o número para o padrão brasileiro
    minimumFractionDigits: 2, // define o mínimo de duas casas decimais
    maximumFractionDigits: 2, // define o máximo de duas casas decimais
  })
}
