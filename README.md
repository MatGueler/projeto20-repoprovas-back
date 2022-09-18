# <p align = "center"> RepoProvas </p>

<p align="center">
   <img src="https://bootcampra.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9ea2dd94-2b8c-4280-b272-e5e58b8f455c%2FCaptura_de_tela_de_2022-04-18_09-15-23.png?table=block&id=61984c25-e872-43aa-9b8c-36fbde5ba346&spaceId=f797e032-5eb2-4c9d-beb7-cd7181e19e47&width=2000&userId=&cache=v2" style="width:70%;"/>
   <p align="center">Merely illustrative image</p>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Mateus Gueler-4dae71?style=flat-square" />
</p>

## :clipboard: Description

The project consists of developing a tests storage facility according to the institution's professors and disciplines. This system allows students to share tests from different periods, including helping new students prepare for the dreaded assessment.

---

## :computer: Technologies and Concepts

- REST APIs
- JWTs
- Node.js (v16.17.0)
- TypeScript
- SQL
- Prisma
- Layered Architecture
- Jest

---

## :rocket: Routes

```yml
POST /signup
    - Route to register a new user
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "password": "000000",
    "confirmPassword": "000000"
    }
```

```yml
POST /signin
    - Route to login
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "password": "000000"
    }
```

```yml
POST /test (autenticada)
    - Route to add a new evidence to the database
    - headers: { "Authorization": "Bearer $token" }
    - body: {
    "name": "Test_name",
    "pdfUrl": "https://www.clickdimensions.com/links/TestPDFfile.pdf",
    "category": "Category_name",
    "discipline": "Discipline_name",
    "teacher": "Teacher_name"
    }
```

```yml
GET /test/disciplines (autenticada)
    - Route to list the tests of each discipline arranged by periods
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /test/teachers (autenticada)
    - Route to list the tests that exist for each teacher
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

---

## 🏁 Running the application

The project has some essential dependencies that require the latest stable version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/). So make sure your version running locally is compatible.

First, clone this repository on your machine:

```
git clone https://github.com/MatGueler/projeto20-repoprovas-back.git
```

Then, inside the folder, run the following command to install the dependencies.

```
npm install
```

Finished the process, just start the server

```
npm start
```

## :hammer: Testing the application

In this project, the JEST test structure was used, for that, run the command below to initialize the database for testing and start the automatic tests.

```
npm test
```

Or, if you prefer, you can perform manual testing using the project routes provided above at **Routes** section.
