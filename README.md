  # SmartStock RFID - Web
  ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

  Módulo frontend feito em Next.js para gestão de inventário integrado ao projeto SSRFID.

  ## ✨ Funcionalidades

  O front oferece acesso às seguintes funcionalidades:

  - **Histórico de Conferências**: Visualize um histórico detalhado de todas as conferências de inventário realizadas, incluindo leituras de produtos e eventos associados.
  - **Gestão de Usuários**: Registre novos usuários no sistema e os gerencie, atribuindo diferentes funções como Administrador ou Operador.
  - **CRUD de Produtos (Provisória\*)**: Adicione novos produtos ao inventário, especificando nome, código, descrição e localização, e depois consulte e filtre a lista de produtos já cadastrados no sistema.

  *No produto final, a expectativa é de somente realizar integração com um módulo de gestão de produtos de outro sistema já existente.

  ## 🚀 Tecnologias Utilizadas

  Este projeto foi construído com as seguintes tecnologias:

  - **Linguagem**: [TypeScript 5](https://www.typescriptlang.org/)
  - **Framework**: [Next.js 16](https://nextjs.org/) (com App Router)
  - **Estilização**: [Tailwind CSS 4](https://tailwindcss.com/),  [shadcn/ui](https://ui.shadcn.com/) e [Lucide](https://lucide.dev/).

  ## ⚙️ Instalação e uso

  ### Pré-requisitos

  Antes de começar, você precisará ter instalado:


  * [Node.js](https://nodejs.org/) (versão 20.9 ou superior)
  * [pnpm](https://pnpm.io/) (gerenciador de pacotes recomendado)

  OU

  * [Docker](https://docs.docker.com/engine/install/)


  ### Instalação

  1.  Clone o repositório:
      ```bash
      git clone {repositório do smarstock-web}
      cd smartstock-web
      ```

  2.  Instale as dependências:
      ```bash
      pnpm install
      ```

  3.  Crie um arquivo .env com base no .env.example e adicione as configurações necessárias:
      ```bash
      cp .env.example .env
      ```

  ### Executando o Servidor de Desenvolvimento

  Para iniciar a aplicação em modo de desenvolvimento, execute:

  ```bash
  pnpm dev
  ```


  Ou, para subir o container do projeto localmente, utilize um dos comandos abaixo:

  ```bash
  # Subir os serviços definidos no arquivo local.yml
  docker compose -f compose.dev.yaml up

  # Subir os serviços e forçar a reconstrução das imagens
  docker compose -f compose.dev.yaml up --build
  ```

  Para derrubar (parar e remover) os containers:

  ```bash
  docker compose -f compose.dev.yaml down
  ```



  Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado. A página será atualizada automaticamente conforme você edita os arquivos.

  ## 🌐 Deploy em produção

  Enquanto projeto Node.js, a aplicação pode ser deployada de maneira simples na maioria dos provedores de nuvem. O jeito mais prático é na [Vercel](https://vercel.com), mas há muitas opções, como [Netlify](https://www.netlify.com/) e [Render](https://render.com/).

  Para _self-hosting_, você pode usar o arquivo [`compose.prod.yaml`]() para subir a aplicação em produção. Além do próprio Next.js, o compose também configura um servidor Nginx.

  ## 🔮 Futuro do projeto

  Na continuidade do projeto, esses poderiam ser os próximos passos:

  - Paginação na listagem de Inventários
  - Melhorar validação e feedback de erro dos formuláŕios
  - Expandir/enriquecer relatórios dos Inventários
  - Adicionar gráficos com informações sobre os Inventários em sua listagem
  - Alterar o back pra retornar a data/hora do inventario no GetAll _(em caso de demora)_
  - Adicionar cobertura de testes
  - Completar CRUD no módulo de Produtos* _(lembrando que é um módulo temporário)_
