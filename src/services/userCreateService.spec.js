const UserCreateService = require("./UserCreateService")
it ("User should be created", async () => {
   
   const user = {
      name: "User test",
      email: "usertest@gmail.com",
      password: "123"
   };

   const userCreateService = new UserCreateService();
   const userCreated = await userCreateService.execute(user);

   expect(userCreated).toHaveProperty("id");
});