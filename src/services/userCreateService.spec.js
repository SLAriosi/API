const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")

it ("User should be created", async () => {
   
   const user = {
      name: "User test",
      email: "usertest@gmail.com",
      password: "123"
   };

   const userRepositoryInMemory = new UserRepositoryInMemory();
   const userCreateService = new UserCreateService(userRepositoryInMemory);
   const userCreated = await userCreateService.execute(user);

   expect(userCreated).toHaveProperty("id");
});