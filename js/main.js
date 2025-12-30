// ===== Data/hora =====
const agora = new Date();
document.getElementById("dataAtual").textContent =
  new Intl.DateTimeFormat("pt-BR", { dateStyle: "full" }).format(agora);

document.getElementById("horaAtual").textContent =
  new Intl.DateTimeFormat("pt-BR", { timeStyle: "short" }).format(agora);

document.getElementById("ano").textContent = agora.getFullYear();


// ===== ENTRADAS =====
// Base fixa (estoque inicial do período)
const baseInicial = 17669;

// Estoque pendente atual (HOJE)
const pendentesHoje = 15409;

// Estoque pendente do dia anterior (ONTEM) — ATUALIZE TODO DIA
const pendentesOntem = 15409;


// ===== CÁLCULOS =====
// Concluídas acumuladas desde o início = base - pendentes atuais
const concluidasAcumuladas = Math.max(0, baseInicial - pendentesHoje);

// % concluído em cima da base inicial (1 casa decimal)
const taxa = baseInicial === 0
  ? 0
  : Number(((concluidasAcumuladas / baseInicial) * 100).toFixed(1));

// Concluídas no dia (variação de ontem -> hoje)
const concluidasHoje = Math.max(0, pendentesOntem - pendentesHoje);

// Situação do dia (sem mostrar número)
const situacaoDia =
  pendentesHoje > pendentesOntem ? "subiu" :
    pendentesHoje === pendentesOntem ? "estagnou" :
      "caiu";


// ===== ATUALIZA CARDS =====

// CARD 1 — Solicitações (pendentes HOJE)
document.getElementById("kpiSolicitacoes").textContent =
  pendentesHoje.toLocaleString("pt-BR");

// Rodapé do card 1 (mantém sem redundância)
const elVar = document.getElementById("kpiSolicitacoesVar");
if (elVar) elVar.textContent = "valor atual";

// CARD 2 — Percentual concluído (card do meio)
document.getElementById("kpiConcluidas").textContent = `${taxa}%`;

// Rodapé do card 2 (mantém sem redundância)
const elTaxa = document.getElementById("kpiTaxa");
if (elTaxa) elTaxa.textContent = "base do período";

// CARD 3 — Concluídas acumuladas (valor absoluto)
document.getElementById("kpiPendencias").textContent =
  concluidasAcumuladas.toLocaleString("pt-BR");



// ===== RISCO =====
// Risco baseado no volume que ainda existe (pendentes hoje)
const risco =
  pendentesHoje >= 20000 ? "ALTO" :
    pendentesHoje >= 10000 ? "MÉDIO" :
      "BAIXO";

const elRisco = document.getElementById("kpiRisco");
if (elRisco) elRisco.textContent = risco;


// ===== ALERTA DO DIA + DESTAQUE (sem redundância) =====
// Requer no HTML: id="cardAlerta" e id="cardDestaque"

// ALERTA: fala do cenário (subiu/estagnou/caiu + risco), sem citar números
let alertaTexto;

if (situacaoDia === "subiu") {
  alertaTexto = "⚠️ Backlog aumentou no dia. Reavaliar priorização e capacidade operacional.";
} else if (situacaoDia === "estagnou") {
  alertaTexto = "⚠️ Backlog sem redução no dia. Ajustar fluxo para retomar avanço.";
} else {
  // caiu
  if (risco === "ALTO") {
    alertaTexto = "⚠️ Houve redução, mas o estoque segue sob alta pressão operacional.";
  } else if (risco === "MÉDIO") {
    alertaTexto = "⚠️ Redução em andamento. Manter foco para evitar perda de ritmo.";
  } else {
    alertaTexto = "✅ Redução mantida e cenário controlado no momento.";
  }
}

const elCardAlerta = document.getElementById("cardAlerta");
if (elCardAlerta) elCardAlerta.textContent = alertaTexto;


// DESTAQUE: sempre aponta qualidade/gestão (sem números e sem repetir KPI)
let destaqueTexto;

if (situacaoDia === "caiu") {
  // caiu hoje: destaque positivo com nuance
  if (concluidasHoje === 0) {
    // caso raro: caiu mas cálculo deu 0 por dados inconsistentes
    destaqueTexto = "Execução indica redução; validar consistência da atualização diária.";
  } else {
    destaqueTexto = "Execução do dia sustentou avanço do estoque. Priorizações parecem alinhadas.";
  }
} else if (situacaoDia === "estagnou") {
  destaqueTexto = "Ponto de atenção: identificar gargalo (fila, equipe, logística) e destravar execução.";
} else {
  // subiu
  destaqueTexto = "Dia com pressão de entrada: reforçar triagem e atacar itens críticos para inverter tendência.";
}

const elCardDestaque = document.getElementById("cardDestaque");
if (elCardDestaque) elCardDestaque.textContent = destaqueTexto;
