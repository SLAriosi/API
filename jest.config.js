module.exports = {
  
  // Quando acontecer qualquer erro em qualquer teste e estourar o erro, irá dar pause nos testes. Resumo: começa o teste, deu 1 erro, para o teste.
  bail: true,
  
  coverageProvider: "v8",

  // Aqui passamos um vetor, e dentro dizemos qual o padrão dos nossos teste, por isso usamos o **/*.spec.js em qualquer pasta, podem ter qualquer nome, mas sempre vai ser .spec.js 
  // esse rootDir é meio que uma variável global do próprio Jest que vai pegar a raiz do nosso projeto.
  testMatch: [
    "<rootDir>/src/**/*.spec.js"
  ],
}