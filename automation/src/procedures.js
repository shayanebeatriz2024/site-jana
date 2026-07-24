// -----------------------------------------------------------------------------
// Catálogo de procedimentos + duração (em minutos).
//
// A CHAVE precisa ser exatamente igual ao texto enviado pelo formulário do site
// (campo "Procedimento de interesse" em src/routes/index.tsx). Se você renomear
// um serviço no site, atualize aqui também.
//
// `duracaoMin`  = tempo de cadeira do procedimento.
// `bufferMin`   = intervalo de higienização/preparo somado ao fim do agendamento.
// -----------------------------------------------------------------------------

export const PROCEDIMENTOS = {
  // Durações confirmadas pela cliente:
  "Microagulhamento": { duracaoMin: 60, bufferMin: 15 },
  "Micropigmentação de Sobrancelhas": { duracaoMin: 120, bufferMin: 15 },
  "Micropigmentação Labial": { duracaoMin: 120, bufferMin: 15 },
  "Limpeza de Pele": { duracaoMin: 90, bufferMin: 15 },
  // Estimativas — ajuste conforme a rotina real da Jana:
  "Depilação a Laser": { duracaoMin: 45, bufferMin: 15 },
  "Design de Sobrancelhas": { duracaoMin: 30, bufferMin: 10 },
  "Design com Henna": { duracaoMin: 45, bufferMin: 10 },
  "Radiofrequência Facial": { duracaoMin: 45, bufferMin: 10 },
  "Dermaplaning": { duracaoMin: 45, bufferMin: 10 },
  // Usado quando o cliente pede só uma avaliação/consulta.
  "Avaliação": { duracaoMin: 30, bufferMin: 0 },
};

const PADRAO = { duracaoMin: 60, bufferMin: 10 };

/** Retorna a configuração de duração de um procedimento (com fallback seguro). */
export function getProcedimento(nome) {
  if (!nome) return { nome: "Avaliação", ...PROCEDIMENTOS["Avaliação"] };
  const cfg = PROCEDIMENTOS[nome] ?? PADRAO;
  return { nome, ...cfg };
}

/** Duração total ocupada na agenda = procedimento + buffer. */
export function duracaoTotalMin(nome) {
  const { duracaoMin, bufferMin } = getProcedimento(nome);
  return duracaoMin + bufferMin;
}
