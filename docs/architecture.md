# architecture.md — <NOME DO SISTEMA>

## 0) Regras do documento
- Documentar apenas decisões tomadas, não hipóteses.
- Se algo não estiver aqui, não é uma decisão arquitetural registrada.
- Mudanças de arquitetura exigem atualização deste doc + sinalização no PR.
- Para conflitos com `docs/spec.md`, spec.md vence.

## 1) Visão geral do sistema (1 parágrafo)
<Descreva em alto nível o que o sistema faz e como suas partes se conectam.>

## 2) Diagrama de componentes (opcional)
```
<Diagrama ASCII ou link para imagem/Excalidraw/Mermaid>

Exemplo Mermaid:
graph TD
  Client --> API
  API --> DB
  API --> Queue
  Queue --> Worker
```

## 3) Stack e responsabilidades
| Camada       | Tecnologia      | Responsabilidade                  |
|--------------|-----------------|-----------------------------------|
| Frontend     | <...>           | <...>                             |
| API/Backend  | <...>           | <...>                             |
| Banco        | <...>           | <...>                             |
| Auth         | <...>           | <...>                             |
| Infra/Deploy | <...>           | <...>                             |

## 4) Decisões arquiteturais (ADRs resumidos)
### ADR-001: <Título da decisão>
- **Contexto:** <por que essa decisão foi necessária>
- **Decisão:** <o que foi decidido>
- **Consequências:** <trade-offs aceitos>

### ADR-002: <Título da decisão>
- **Contexto:**
- **Decisão:**
- **Consequências:**

## 5) Contratos entre serviços (se aplicável)
- <Serviço A> → <Serviço B>: <protocolo, formato, garantias>
- <ex: API → Worker via fila SQS, payload JSON, entrega at-least-once>

## 6) Fluxo de dados crítico
<Descreva o caminho dos dados nas operações mais sensíveis: autenticação, pagamento, etc.>

1. ...
2. ...
3. ...

## 7) Segurança arquitetural
- Onde está o boundary de autenticação: <...>
- Dados sensíveis em repouso: <criptografado? onde?>
- Dados sensíveis em trânsito: <TLS? onde termina?>
- Segredos: <como são gerenciados (env vars, vault, etc.)>

## 8) Escalabilidade e limites conhecidos
- Gargalo atual: <...>
- Limite aceito no MVP: <ex: "suporta até X usuários simultâneos">
- O que quebra primeiro se escalar: <...>

## 9) O que NÃO está aqui (fora de escopo arquitetural)
- <ex: "sem cache distribuído no MVP">
- <ex: "sem multi-region">
- <ex: "sem event sourcing">
