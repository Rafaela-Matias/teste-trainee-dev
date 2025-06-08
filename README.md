

# Relatório Técnico - Rafaela Matias Lima

## 1. Visão Geral da Solução:

O sistema desenvolvido é uma aplicação de lista de tarefas com foco em organização e produtividade do usuário. Durante o desenvolvimento, foram corrigidos bugs de funcionalidade e comportamento visual, como a duplicação de tarefas ao salvar, o comportamento invertido nos botões “Exibir” e “Ocultar Tarefas Concluídas” e o botão “Editar” desalinhado em relação ao botão “Remover”, entre outros.

Além da correção de bugs, foram implementadas novas funcionalidades, como um filtro de palavras obscenas, o botão "Ordenar de A a Z" e a exportação da lista de tarefas em PDF. Para isso, foram utilizadas bibliotecas como bad-words (para filtragem de palavras impróprias), jsPDF (para gerar arquivos PDF) e SweetAlert2 (para alerts e confirms com visual moderno).

---

## 2. Como Executar a Aplicação:

### 2.1 Para clonar um repositório : abra o Git Bash dentro da pasta que desejar e digite " git clone + URL do projeto no GitHub por exemplo "git clone https://github.com/seu-usuario/nome-do-repositorio.git" e aperte enter.

### 2.2 Para a instalação: Abra a pasta onde colocou o projeto no VS Code e clicando com o botão direito na pasta procure pela opção “ Open in integrated Terminal ” selecione e digite npm install.

### 2.3 Para rodar o projeto: Basta digitar npm start ou ng serve no terminal.

---

## 3. Correção dos Erros Iniciais (npm start):

### 3.1 Erro de escrita:

No arquivo  “header.component.ts” o nome da classe estava faltando a letra “r”

Solução: Corrigir a escrita.

### 3.2 Falta de importação:

 Ao entrar no arquivo “new-task.component.ts”  o service “ TodoService” não tinha sido importado.

Solução: Adicionar a importação correta.

### 3.3 Ausência do script de start

No arquivo package-json estava faltando a opção de start normalmente presente nos scripts.

Solução:  Adicionar a linha “start”: “ng serve” no script para que fosse possível iniciar a aplicação com “npm start” ou “ ng serve”

### 3.4 Erro ao localizar a biblioteca Font Awesome

 o Angular não localizava o arquivo “node_modules/@fortawesome/fontawesome-free/css/all.min.css“
 
Solução: Instalar a biblioteca por meio do comando “ npm install @fortawesome/fontawesome-free “ no terminal.

---

## 4. Relatório de Correção de Bugs: 

### 4.1 Tarefa duplicada ao salvar:

Causa: No arquivo "new-task.component.ts" o método addTodo foi chamado duas vezes.

Solução: Apagar a linha duplicada deixando apenas o necessário.

### 4.2 Só é possível salvar uma nova tarefa uma vez ou ao recarregar a página:

Causa: No arquivo new-task.component.ts o problema era causado por um if que utilizava um contador que só adicionava tarefas quando igual a 0 e parava de adicionar quando incrementado.

Solução: Remover o if, o contador e o incremento.

### 4.3 O botão de limpar todas as tarefas não está em português:

Causa: No todo.component.html o botão estava com a linha "[innerHTML]="labelClearAll" responsável pelo nome.

Solução: Substituir o  “innerHTML” por um nome em português diretamente no html entre as tags button.

### 4.4 Comportamento invertido nos botões “Exibir” e “Ocultar Tarefas Concluídas”:

Causa: No todo.component.html o botão com uma condicional tinha as funções ocultar ou exibir tarefas, mas os nomes estavam invertidos.

Solução: Trocar os nomes para corresponderem a sua respectiva função.

### 4.5 “Limpar Tarefas Concluídas” sem confirmação do usuário:

Causa: No todo.components.ts a função “clearCompletedTasks()” não pede confirmação.

Solução: Adicionar um if com o “confirm” para dar a possibilidade de escolha ao usuário, posteriormente substituído pelo SweetAlert para melhor aparência.

### 4.6 Botão “Limpar Tarefas Concluídas” remove tarefas não concluídas:

Causa: No "todo.service.ts" a linha que filtrava as tarefas por meio do "clearCompletedTasks" estava com o boolean true provocando o comportamento inverso do que deveria.

Solução: Trocar o boolean para false indicando que o filtro deveria salvar apenas as tarefas ainda pendentes e excluir as concluídas.

### 4.7  Botão “Editar” desalinhado em relação ao botão “Remover”

Causa: No todo-item.component.html os botões estavam “soltos” sem uma div.

Solução: Envolver os dois botões em uma div com uma classe para fazer modificações dos dois ao mesmo tempo no css todo-item.component.css.

### 4.8 O botão “Remover” deve ter a cor vermelha para indicar uma ação destrutiva:

Causa: No todo-item.component.html o style presente no próprio botão “Remover” estava como color: Black.

Solução: Mudar o style color para red.

### 4.9 A lista de tarefas não apresenta uma barra de rolagem quando o número de itens ultrapassa a altura do painel, impedindo a visualização de todas as tarefas.

Causa: No todo.components.css a classe todo-list_container o overflow-y responsável pela barra estava como hidden.

Solução: Alterar o overflow-y para auto.

### 4.10 Salvar sem digitar um “Título da Tarefa” está adicionando um item em branco à lista e digitar apenas espaços no campo “Título da Tarefa” e salvar também está adicionando um item em branco.

Causa: No new-task.component.ts no addTaks não existia nenhuma condicional impedindo esse comportamento.

Solução: Adicionar uma condicional if com !this.newTaskTitle.trim() para impedir o envio de strings vazias ou compostas apenas por espaços.

---

## 5. Relatório de Implementação de Melhorias:

### 5.1 Implementar um botão “Ordenar de A a Z” que ordena a lista alfabeticamente.

Abordagem Técnica: No arquivo todo.component.ts foi criado o metodo "ordemAlfabetica()" utilizando os métodos ".sort()" e "localeCompare()"  para mudar a ordem dos itens de um array e compara strings de forma alfabética, tambem foi adicionado o botão (click)="ordemAlfabetica() no todo.component.html.

### 5.2 Permitir que o usuário adicione uma tarefa pressionando a tecla Enter, além do clique no botão “Salvar”.

Abordagem Técnica: Adicionado (keydown.enter)=”addTask( )”  no campo de input dentro do new-task.component.html

### 5.3  Permitir a adição de múltiplas tarefas de uma só vez. O usuário deverá digitar os títulos separados pelo caractere | (pipe).

Abordagem Técnica: No método addTask( ) do new-task.components.ts, utilizado slit('|') para dividir os títulos,  forEach( ) para adicioná-los individualmente e o método  trim() para remover espaços em branco.

### 5.4  Implementar um filtro de palavras obscenas:

Biblioteca: bad-words (https://github.com/web-mech/badwords)

Abordagem Técnica: No new-task.component.ts foi implementado o filtro, uma lista de palavras obscenas que passam por um for impedindo o cadastro de títulos ofensivos mesmo quando separados por | (pipe)  ou com espaços. 

### 5.5 Implementar a exportação da lista de tarefas para PDF:

Biblioteca: jsPDF (https://github.com/parallax/jsPDF)

Abordagem Técnica: No todo.components.ts foi criado o método exportarPDF( ) com definição de fonte, tamanho e posicionamento de texto e um forEach( ) que passa por cada item da lista com título e status.

### 5.6 Substituir alerts e confirms nativos pelo SweetAlert:

Biblioteca: SweetAlert2 

Abordagem Técnica: Em todo.component.ts os métodos clearAll( ) e clearCompletedTasks( ) possuíam confirms que foram substituídos por sweetalert2 com lógica condicional. Posteriormente, o mesmo foi aplicado ao botão “Remover” em todo-item.component.ts.

---

## 6. Relatório de Débito Técnico:

### 6.1 Bug = Correção do botão “Editar”

### Descrição do problema:

O botão “Editar” não está funcional. O comportamento esperado é: ao clicar, o campo “Título da Tarefa” deve ser preenchido com o texto da tarefa selecionada. Ao salvar, o item na lista deve ser atualizado e o campo de texto limpo.

### Dificuldades encontradas: 

 A principal dificuldade enfrentada não esteve relacionada a erros específicos no código, mas sim à complexidade lógica envolvida, que requeria a criação de métodos interligados em diferentes arquivos e componentes da aplicação. Apesar de procurar soluções, inclusive com o apoio de inteligência artificial, a organização do fluxo de dados gerou confusão durante o processo, o que dificultou a conclusão da funcionalidade no tempo disponível.

---

## 7. Relatório de Melhorias:

### 7.1 Adicionar a função de ordenar por data de conclusão ou criação para um maior controle.

### 7.2 Adicionar uma mudança de tema para claro ou escuro aumentaria o conforto do usuário.

### 7.3 Adicionar uma autenticação, caso planeje ter múltiplos usuários.
