# Projeto Pokeapi desenvolvimento Vtex.io Módulos

Projeto dividido em:
- Módulo 1 - Store Theme
- Módulo 2 - Serviços VTEX IO
- Módulo 3 - React App

# 📘 Roadmap de Conhecimento Básico em VTEX IO para QA

## 🎯 Objetivo Geral

Capacitar os estagiários de QA com noções básicas de desenvolvimento no VTEX IO para que consigam compreender, validar e antecipar possíveis falhas em implementações, além de interagir de forma mais assertiva com o time de desenvolvimento.

---

# 🧩 Módulo 1 – Setup e Configurações Iniciais

## Objetivo

Entender o funcionamento básico do VTEX IO, seu fluxo de trabalho e como customizar componentes de front-end.

---

## 📌 Atividades

### 1. Instalar a CLI do VTEX IO
- Baixar e configurar a CLI seguindo a documentação oficial da VTEX IO.

### 2. Consumir conteúdo de onboarding
- Assistir ao conteúdo de **VTEX IO** na trilha de estágio de engenharia da **Smartleader**.

### 3. Criar uma Workspace no account `acctglobal`
- Utilizar a CLI para criar uma nova workspace de desenvolvimento.

### 4. Remover o app de tema padrão
- Desinstalar o `store-theme` presente na workspace criada.

### 5. Clonar o repositório `store-theme`
- Baixar o repositório oficial no GitHub.

### 6. Linkar o app clonado
- Utilizar `vtex link` para associar o app ao workspace.

### 7. Customizar um componente de vitrine
- Escolher um componente de vitrine (ex.: `shelf`) e aplicar estilização conforme referência fornecida pelo instrutor.
- Adicionar uma `blockClass` e aplicar estilos via `store-theme/styles/css`.

---

## 🎨 Referências para estilização de vitrine

- https://www.rihappy.com.br/  
- https://www.sauer1941.com/  
- https://beira.shop/

---

## ✅ Outputs desejados

- Entender o que é um **app** no VTEX IO.  
- Entender o que é o **manifest.json** e suas principais propriedades.  
- Saber o que é uma **workspace** e como ela se relaciona com a conta.  
- Aprender a aplicar uma **blockClass** para personalização de componentes.  
- Entender como estilizar componentes no VTEX IO.  
- Saber validar as **propriedades (props)** de um componente nativo.  

---

# 🧩 Módulo 2 – Backend VTEX IO

## Objetivo

Entender a estrutura de um app backend no VTEX IO, criação de endpoints e integração com APIs externas.

---

## 📌 Atividades

### 1. Criar um repositório backend
- Criar um repositório na organização **Quality Digital** no GitHub usando o template de VTEX IO Service (`service-example`).

---

### 2. Implementar um endpoint público (POST)

**Endpoint:**
```bash
/find-pokemon
```

**Descrição:**
- Criar um endpoint `/find-pokemon` que receba no body um campo `id` e retorne os dados correspondentes ao Pokémon utilizando a API pública PokeAPI.

**Body esperado:**
```json
{ "id": number }
```

---

### 3. Adicionar validação de regra de negócio

- O endpoint só deve responder se o Pokémon tiver altura **menor que 15**.
- Caso contrário:
  - Retornar erro com status `400`
  - Retornar mensagem adequada

---

### 4. Testar via Postman

- Validar respostas de sucesso  
- Validar respostas de erro  
- Documentar os testes realizados  

---

## ✅ Outputs desejados

- Compreender a estrutura de um **app de backend** no VTEX IO.  
- Entender como criar endpoints públicos.  
- Saber consumir APIs externas via código no VTEX IO.  
- Implementar regras de negócio e retorno de erros.  
- Validar endpoints usando Postman.  
- Conhecer os status code existentes (HTTP).  

---

# 🧩 Módulo 3 – Front-end React no VTEX IO consumindo o backend do Módulo 2

## Objetivo

Criar um componente React no VTEX IO que renderiza um formulário para receber o `id` do Pokémon, chama o endpoint criado no Módulo 2 e exibe o resultado, disparando também um evento no `dataLayer` para futuras análises.

---

## 📌 Atividades

### 1. Criar app de front-end React

- Baseado no template padrão de store ou app React simples.  
- Ajustar `manifest.json` com dados do app e builders necessários.  
- Definir um bloco renderizável no `interfaces.json` (ex.: `"pokemon-form"`).  

---

### 2. Criar o componente `PokemonForm`

- Input numérico para receber o `id` do Pokémon.  
- Botão para submit.  
- Validação no front-end:
  - id > 0  
  - valor numérico  
- Estados visuais:
  - carregando  
  - erro  
  - exibição de resultado  
- Chamada ao backend criado no Módulo 2.  

---

### 3. Integração com backend

- Enviar requisição POST com:
```json
{ "id": number }
```

**Em caso de sucesso:**
- Renderizar nome, altura e imagem do Pokémon.  

**Em caso de erro (altura ≥ 15 ou falha de rede):**
- Exibir mensagem adequada.  

---

### 4. Disparo de evento no dataLayer

- Após receber resposta bem-sucedida do backend, disparar evento conforme contrato abaixo.

---

## 📊 Contrato do Evento – `pokemonSearch`

### Objetivo do evento

Permitir rastrear buscas bem-sucedidas de Pokémon realizadas pelo componente, para uso em monitoramento, métricas e automações.

---

### Formato do evento (`dataLayer.push`)

```json
{
  "event": "pokemonSearch",
  "pokemonSearch": {
    "id": "number",
    "name": "string",
    "height": "number"
  }
}
```

---

## 📋 Descrição dos campos

| Campo | Tipo | Obrigatório | Descrição |
|------|------|------------|----------|
| event | string | Sim | Nome fixo do evento, usado como identificador no GA4, Tag Manager ou outras integrações |
| pokemonSearch.id | number | Sim | ID numérico do Pokémon consultado |
| pokemonSearch.name | string | Sim | Nome retornado pela API (em minúsculas, como na PokeAPI) |
| pokemonSearch.height | number | Sim | Altura retornada pela API |

---

## ✅ Outputs desejados do módulo

- Criar e renderizar bloco React no VTEX IO.  
- Integrar front-end com serviço backend.  
- Implementar validação de input e tratamento de erros.  
- Disparar evento `pokemonSearch` no `dataLayer` seguindo contrato definido.  
- Documentar cenários de teste e evidências.  


# 🧪 Cenários de Teste com Regras de Negócio

Feature: Consulta de Pokémon

  # 1. Layout e conteúdo inicial

  Scenario: Validar layout da tela de consulta
    Given que o usuário acessa a tela inicial de consulta
    Then a tela deve exibir corretamente o texto de introdução
    And deve exibir o campo para inserir o ID do pokémon
    And deve exibir o botão "Consultar"
    And não deve haver quebra de layout

  Scenario: Validar texto de introdução e placeholder do campo ID do pokémon
    Given que o usuário acessa a tela inicial de consulta
    Then deve ser exibido corretamente o texto:
      """
      Consulte o seu pokémon favorito pelo ID para saber sua altura, nome e ver como ele é
      """
    And o campo "ID do pokémon" deve conter o placeholder:
      """
      ID do Pokémon
      """

  # 2. Comportamento do campo de entrada

  Scenario: Validar comportamento visual do campo de ID
    Given que o usuário visualiza o campo de ID do pokémon
    When clica no campo
    Then o campo deve destacar a borda indicando estado ativo

  Scenario: Validar validação do campo ID
    Given que o usuário está na tela de consulta
    When insere caracteres não numéricos ou valores inválidos
    Then o campo deve aceitar apenas valores numéricos maiores que zero
    And deve exibir a mensagem em vermelho:
      """
      Para poder fazer a consulta insira apenas números acima de zero
      """

  Scenario: Validar tentativa de consulta com campo vazio
    Given que o usuário está na tela de consulta
    When clica em "Consultar" com o campo vazio
    Then a consulta não deve ser executada
    And deve ser exibida a seguinte mensagem de validação em vermelho:
      """
      Digite um ID válido (número maior que zero).
      """

  # 3. Regras de negócio da API

  Scenario: Validar regra de limite de altura do pokémon para consulta
    Given que o usuário tenta consultar um pokémon
    When o pokémon possui altura maior que 15
    Then a API deve retornar erro
    And deve exibir a mensagem de erro na tela em vermelho:
      """
      Este pokémon é muito alto! Tente um com altura menor que 15.
      """

  # 4. Execução da consulta

  Scenario: Validar execução da consulta
    Given que o usuário insere um ID válido
    When clica em "Consultar" ou pressiona Enter
    Then a aplicação deve realizar a chamada para a API responsável pela consulta do pokémon

  Scenario: Validar requisição enviada para API
    Given que o usuário realiza uma consulta válida
    Then deve ser enviada uma requisição para o endpoint configurado
    And a requisição deve conter o ID informado no campo

  Scenario: Validar estado de carregamento durante consulta
    Given que a aplicação está aguardando resposta da API
    Then a interface deve exibir o estado de carregamento (skeleton) no lugar do resultado

  # 5. Sucesso da consulta

  Scenario: Validar exibição dos dados retornados
    Given que a API retorna sucesso
    Then devem ser exibidos corretamente os campos Nome, Altura e Imagem do pokémon

  Scenario: Validar correspondência dos dados retornados
    Given que a API retorna sucesso
    Then os dados exibidos na interface devem corresponder exatamente às informações retornadas pela API

  Scenario: Validar estilização da tela de sucesso conforme tipo do pokémon
    Given que a API retorna sucesso
    Then a tela deve aplicar a estilização correspondente ao tipo do pokémon retornado pela API
    And exemplo de cores:
      | tipo      | cor       |
      | fogo      | vermelho  |
      | elétrico  | amarelo   |
      | água      | azul      |

  Scenario: Validar exibição do botão Nova consulta
    Given que a consulta foi bem-sucedida
    Then deve ser exibido o botão "Nova consulta"

  Scenario: Validar funcionalidade do botão Nova consulta
    Given que o usuário está na tela de sucesso
    When clica em "Nova consulta"
    Then o sistema deve limpar os dados exibidos
    And deve retornar a interface ao estado inicial de consulta

  # 6. Tratamento de erros

  Scenario: Validar tratamento de erro da API
    Given que a API retorna erro
    Then a aplicação deve exibir a mensagem:
      """
      Erro interno. Verifique o ID e tente novamente.
      """

  Scenario: Validar comportamento para ID inexistente
    Given que o ID consultado não existe na API
    Then a aplicação deve exibir a mensagem:
      """
      Erro interno. Verifique o ID e tente novamente.
      """

  Scenario: Validar comportamento em caso de timeout da API
    Given que a requisição ultrapassa o tempo limite de 5 segundos
    Then a aplicação deve interromper o carregamento
    And deve exibir mensagem de erro ao usuário

  # 7. Controle de uso

  Scenario: Validar limite de consultas em curto período
    Given que existe limite de consultas
    When o usuário realiza mais de 5 consultas em 30 segundos
    Then novas consultas devem ser bloqueadas temporariamente
    And deve ser exibida mensagem informando o limite atingido

  # 8. Acessibilidade

  Scenario: Validar navegação via teclado
    Given que o usuário utiliza teclado
    When navega com a tecla Tab
    Then deve conseguir navegar entre os elementos da tela
    And deve conseguir focar no campo de ID
    And deve conseguir acionar o botão "Consultar" com Enter ou Space

  # 9. Recuperação após erro

  Scenario: Validar comportamento após erro seguido de nova consulta válida
    Given que ocorreu um erro na consulta
    When o usuário realiza uma nova consulta válida
    Then a mensagem de erro anterior deve desaparecer
    And o resultado correto deve ser exibido na interface
```