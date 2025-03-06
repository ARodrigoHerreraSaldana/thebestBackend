import Users from "../../models/Users.model";


export const updateUser= async (salesmail,mail) => {
    try {
      const updatedUser = await Users.update({ salesForcemail: salesmail },
        {
          where: {
            email:mail,
          },
        },
      );
      return updatedUser;
    } catch (err) {
      console.error(err);
    }
  };

  