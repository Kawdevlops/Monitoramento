// ===== Data/hora =====
const agora = new Date();
document.getElementById("dataAtual").textContent =
  new Intl.DateTimeFormat("pt-BR", { dateStyle: "full" }).format(agora);
document.getElementById("horaAtual").textContent =
  new Intl.DateTimeFormat("pt-BR", { timeStyle: "short" }).format(agora);
document.getElementById("ano").textContent = agora.getFullYear();

// ===== ENTRADAS DO DIA (preencha com os valores reais) =====
// IMPORTANTÍSSIMO: em JS, 16.676 = 16 vírgula. Se é 16 mil, use 16676.
const solicitacoesHoje  = 16676;  // total de solicitações do dia atual
const solicitacoesOntem = 16639;  // total de solicitações de ontem
const pendentesHoje     = 16639;    // quantas estão pendentes HOJE (do dia)

// ===== Garantias =====
const pendentes = Math.max(0, Math.min(pendentesHoje, solicitacoesHoje));

// concluídas = hoje - pendentes
const concluidas = Math.max(0, solicitacoesHoje - pendentes);

// “vs ontem” (diferença)
const variacao = solicitacoesHoje - solicitacoesOntem;
const variacaoTxt = (variacao >= 0 ? `+${variacao}` : `${variacao}`);

const taxa = solicitacoesHoje === 0
  ? 0
  : Math.round((concluidas / solicitacoesHoje) * 100);


// ===== Atualiza KPIs na tela =====
document.getElementById("kpiSolicitacoes").textContent = solicitacoesHoje.toLocaleString("pt-BR");
document.getElementById("kpiSolicitacoesVar").textContent = variacaoTxt;

document.getElementById("kpiConcluidas").textContent = concluidas.toLocaleString("pt-BR");
// document.getElementById("kpiTaxa").textContent = `${taxa}%`;

document.getElementById("kpiPendencias").textContent = pendentes.toLocaleString("pt-BR");

// Risco (ajuste os limites como você quiser)
const risco = pendentes >= 30 ? "ALTO" : pendentes >= 15 ? "MÉDIO" : "BAIXO";
document.getElementById("kpiRisco").textContent = risco;

// ===== Cards (exemplo) =====
document.getElementById("cardAlerta").textContent =
  `Hoje: ${solicitacoesHoje.toLocaleString("pt-BR")} solicitações.`;

// document.getElementById("cardDestaque").textContent =
//   `Concluídas: ${concluidas.toLocaleString("pt-BR")} (${taxa}%).`;

document.getElementById("cardAcoes").innerHTML = `
  <li>Pendentes hoje: ${pendentes.toLocaleString("pt-BR")}.</li>
  <li>Atacar pendências por prioridade/região.</li>
  <li>Atualizar boletim após a próxima carga.</li>
`;
