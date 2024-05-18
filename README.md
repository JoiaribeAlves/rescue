<div align="center">

# Desabrigados

<img src="./.github/images/logo-blue.png" width="80px" /><br />
</div>

<div align="center">
	<img src="https://img.shields.io/badge/Status-Em%20desenvolvimento-blue" />
 	<img src="https://img.shields.io/badge/Licença-MIT-green" />
 	<img src="https://img.shields.io/badge/PRs-Bem%20vidas-red" />
 	<img src="https://img.shields.io/github/forks/JoiaribeAlves/rescue" />
 	<img src="https://img.shields.io/github/stars/JoiaribeAlves/rescue" />
</div>

---

## Índice

- [Descrição](#descrição)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Como executar o projeto (frontend)](#como-executar-o-projeto-frontend)
- [Como executar o projeto (Banco de dados)](#como-executar-o-projeto-banco-de-dados)
- [Contribuidores](#contribuidores)
- [Como contribuir](#como-contribuir)
- [Licença](#licença)

<div id="descricao">

### Descrição

O projeto [desabrigados](https://desabrigados.com.br) está sendo  desenvolvido para auxiliar as vítimas das enchentes que assolaram o estado do Rio Grande do Sul em 2024. O principal objetivo é conectar as equipes de resgate com as pessoas que precisam ser resgatadas nas áreas atingidas pelas enchentes.
</div>

<div id="tecnologias">

### Tecnologias utilizadas

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn/ui](https://img.shields.io/badge/Shadcn/ui-black.svg?style=for-the-badge&logo=shadcn/ui&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
</div>

<div id="funcionalidades">

### Funcionalidades

- [X] `Pedir resgate`: O usuário irá preencher um formulário para chamar a equipe de resgate.
- [X] `Confirmar resgate`: Após a equipe realizar o resgate, poderá confirmá-lo.
- [ ] `Editar resgate`: Permite que o usuário altere as informações de um pedido de resgate.
- [ ] `Cancelar resgate`: Permite que o usuário cancele um pedido de resgate.
- [ ] `Excluir resgate`: Permite que o usuário exclua um pedido de resgate.
- [X] `Cadastrar abrigo`: Permite que o usuário cadastre um abrigo, informando o nome, capacidade, endereço entre outras informações.
- [X] `Consultar abrigos`: Permite ao usuário consultar a lista de abrigos disponíveis em sua cidade, é possível filtrar por cidade e bairro;
- [X] `Editar abrigo`: Permite que o usuário altere as informações de um abrigo.
- [ ] `Excluir abrigo`: Permite que o usuário exclua um abrigo.
</div>

<div id="como-executar-frontend">

### Como executar o projeto (frontend)

1. Clone o repositório:

	```bash
	git clone git@github.com:https://github.com/JoiaribeAlves/rescue.git
	```
1. Entre no diretório:

	```bash
	cd rescue
	```
1. Instale as dependências:

	```bash
	npm install
	```
1. Inicie o servidor de desenvolvimento:

	```bash
	npm run dev
	```
1. Acesse pelo navegador: [localhost:3000](http://localhost:3000)
</div>

<div id="como-executar-banco-de-dados">

### Como executar o projeto (Banco de dados)

1. Crie um arquivo na raiz do projeto chamado `.env`
1. Copie e cole as variáveis contidas no arquivo `.env.example`
1. Na variável **DATABASE_URL** você deve definir a URL de conexão com o banco de dados. Por exemplo: _postgresql://usuario:senha@localhost:5432/nome-do-banco-de-dados_
1. Na variável **VERIFICATION_CODE** você deve definir um código de 6 dígitos, por exemplo: 123456. O código é utilizado nas telas de exclusão e edição para garantir que somente pessoas que saibam o código possam editar ou excluir dados.
1. Caso queira usar docker: (se não for usar, ignore esta etapa)

	```bash
	docker-compose up -d
	```
1. Execute as migrations: <br />

	```bash
	npx prisma db push && npx prisma generate
	```
Se tudo ocorreu bem, você já pode realizar operações no banco de dados.
</div>

<div id="contribuidores">

### Contribuidores

Este projeto só foi possível graças ao trabalho dos contribuidores. Muito obrigado a todos que fazem isso acontecer.
| [<img loading="lazy" src="https://avatars.githubusercontent.com/u/102931920?v=4" width=80><br><sub>Joiaribe</sub>](https://github.com/JoiaribeAlves) | [<img loading="lazy" src="https://avatars.githubusercontent.com/u/115363966?v=4" width=80><br><sub>Caio</sub>](https://github.com/CaioMMendes) | [<img loading="lazy" src="https://avatars.githubusercontent.com/u/8629694?v=4" width=80><br><sub>Guilherme</sub>](https://github.com/gbflores) |
| --- | --- | --- |
</div>

<div id="como-contribuir">

### Como contribuir

Sua contribuição é bem-vinda! Se você tem interesse em ajudar a melhorar o app, siga os passos abaixo:

1. Faça um fork do repositório;
1. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`);
1. Faça seus commits (`git commit -m 'Adiciona uma nova feature'`);
1. Faça push para a branch (`git push origin feature/MinhaFeature`);
1. Abra um Pull Request.
</div>

<div id="licenca">

### Licença

Este projeto está disponibilizado sob [licença MIT](https://github.com/JoiaribeAlves/rescue/blob/main/License)
</div>
