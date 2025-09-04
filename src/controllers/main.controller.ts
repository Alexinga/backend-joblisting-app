import { Request, Response } from "express";

export const home = (req: Request, res: Response) => {
  const user = req.user;
  res.send(
    `<div>
    <h1>Hello World</h1> 
    <div><a href="http://localhost:5528/api/auth/google">Sign In with Google</a></div>
    <form>
    <input type="file" accept="image/png, image/jpeg">
    </form>
    </div>`
  );
  // res.status(200).json({ message: `Welcome Back, ${user?.id}`, user });
};
