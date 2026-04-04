🌎 [English](README.md) | 🇧🇷 [Português](README.pt-br.md)

# Inventories web Dashboard  (Smart Stock Project)
  ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
   

Frontend module built with Next.js for inventory management integrated with the SSRFID project.

## ✨ Features

The frontend provides access to the following features:

  - **Inventory Checks History**: View a detailed history of all performed inventory checks, including product readings and associated events.
  - **User Management**: Register new users in the system and manage them, assigning different roles such as Administrator or Operator.
  - **Product CRUD (Provisional\*)**: Add new products to the inventory by specifying name, code, description, and location, then view and filter the list of products already registered in the system.

\*In the final product, the expectation is to only integrate with a product management module from an existing system.

## 🛠️ Technologies Used

This project was built with the following technologies:

  - **Language**: [TypeScript 5](https://www.typescriptlang.org/)
  - **Framework**: [Next.js 16](https://nextjs.org/) (with App Router)
  - **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) and [Lucide](https://lucide.dev/).

## 💻 Installation and Usage

### Prerequisites

Before you begin, you will need to have installed:

  * [Node.js](https://nodejs.org/) (version 20.9 or higher)
  * [pnpm](https://pnpm.io/) (recommended package manager)

OR

  * [Docker](https://docs.docker.com/engine/install/)

### Installation

1.  Clone the repository:

    ```bash
    git clone {smartstock-web repository}
    cd smartstock-web
    ```

2.  Install dependencies:

    ```bash
    pnpm install
    ```

3.  Create a `.env` file based on `.env.example` and add the necessary configurations:

    ```bash
    cp .env.example .env
    ```

### Running the Development Server

To start the application in development mode, run:

```bash
pnpm dev
```

Or, to spin up the project container locally, use one of the commands below:

```bash
# Start the services defined in the compose.dev.yaml file
docker compose -f compose.dev.yaml up

# Start the services and force image rebuilds
docker compose -f compose.dev.yaml up --build
```

To tear down (stop and remove) the containers:

```bash
docker compose -f compose.dev.yaml down
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser to see the result. The page will automatically reload as you edit the files.

## 🌐 Production Deployment

As a Node.js project, the application can be easily deployed on most cloud providers. The most practical way is on [Vercel](https://vercel.com), but there are many options, such as [Netlify](https://www.netlify.com/) and [Render](https://render.com/).

For *self-hosting*, you can use the [`compose.prod.yaml`](compose.prod.yaml) file to spin up the application in production. In addition to Next.js itself, the compose file also configures an Nginx server.

## 🔮 Future of the project

Moving forward with the project, these could be the next steps:

  - Pagination for the Inventory listing
  - Improve form validation and error feedback
  - Expand/enrich Inventory reports
  - Add charts with information about the Inventories in the listing
  - Modify the backend to return the inventory date/time in the GetAll request *(in case of delays)*
  - Add test coverage
  - Complete the CRUD in the Products module\* *(keeping in mind it is a temporary module)*

## 📄 License

This project is licensed under the MIT License.
See the [LICENSE](LICENSE) file for more details.

## 👨‍💻 About

This repository contains the frontend implementation of the project, developed by **[Ruan Macedo Santos](https://github.com/msruan)**.

Developed for the **Smart Stock** project under the **EmbarcaTech Program**.