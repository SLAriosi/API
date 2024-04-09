const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

// Usar o Describe ajuda a separar os testes em tipos de grupos diferentes, e na hora que aparecer o erro, estará escrito o local correto mostrando oque está errado, e no grupo que está o erro.
// O Describe é normalmente utilizado, apenas 1 por arquivo de teste.
describe("UserCreateService", () => {

   let userRepositoryInMemory = null;
   let userCreateService = null;

   // Esse before each executa antes de cada teste, permitindo que acessemos essas informações dentro de cada um dos testes, nesse caso podemos usar o userRepositoryInMemory & o userCreateService.
   beforeEach(() => {
      userRepositoryInMemory = new UserRepositoryInMemory();
      userCreateService = new UserCreateService(userRepositoryInMemory);
   })

   it("User should be created", async () => {

      const user = {
         name: "User test",
         email: "usertest@gmail.com",
         password: "123"
      };

      const userCreated = await userCreateService.execute(user);
      expect(userCreated).toHaveProperty("id");
   });

   it("User NOT should be created w/ same email than another", async () => {
      const user1 = {
         name: "User Test 1",
         email: "user@test.com",
         password: "123"
      }
      
      const user2 = {
         name: "User Test 2",
         email: "user@test.com",
         password: "456"
      }

      await userCreateService.execute(user1);
      await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso."));
   })
})
