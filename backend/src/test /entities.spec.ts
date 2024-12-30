import { connectTestDB, disconnectTestDB } from "./setup";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";

interface IUser {
  email: string;
  password: string;
}

interface ICredentials {
  email: string;
  password: string;
}

const request = supertest(app);

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await disconnectTestDB();
});
beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

describe("User API Service", () => {
  it("Should register a new User", async () => {
    const user: IUser = {
      email: "cristian@outlook.com",
      password: "12345678",
    };

    const response = await request.post("/users").send(user);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("user", user.email);
  });

  it("Should not register same email address", async () => {
    const user: IUser = {
      email: "cristian@outlook.com",
      password: "12345678",
    };

    await request.post("/users").send(user);

    const response = await request.post("/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.data).toBe("Email already exists");
  });

  it("Should not allow empty inputs", async () => {
    const user: IUser = {
      email: "",
      password: "12345678",
    };

    const response = await request.post("/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Invalid value",
          path: "email",
        }),
        expect.objectContaining({
          msg: "Invalid email",
          path: "email",
        }),
      ])
    );
  });

  it("Should authenticate a User with correct credentials", async () => {
    const user: IUser = {
      email: "cristian@outlook.com",
      password: "12345678",
    };
    await request.post("/users").send(user);
    const userCredentials: ICredentials = {
      email: "cristian@outlook.com",
      password: "12345678",
    };
    const response = await request.post("/users/auth").send(userCredentials);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toMatch(/^.+\..+\..+$/);
  });

  it("Should not authenticate a User with wrong credentials", async () => {
    const user: ICredentials = {
      email: "cristian@outlook.com",
      password: "12344321",
    };
    const response = await request.post("/users/auth").send(user);
    expect(response.status).toBe(404);
  });

  it("Should not allow empty inputs for authentication", async () => {
    const user: ICredentials = {
      email: "",
      password: "12345678",
    };
    const response = await request.post("/users/auth").send(user);
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Invalid value",
          path: "email",
        }),
        expect.objectContaining({
          msg: "Invalid email",
          path: "email",
        }),
      ])
    );
  });
});

describe("Tasks API Service", () => {
  it("Should Not allow to create a Task without Log In", async () => {
    const task = {
      title: "Coding with TS and NodeJS",
      description: "Learn more TypeScript and NodeJS",
    };

    const response = await request.post(`/tasks`).send(task);
    expect(response.status).toBe(401);
  });

  it("Should Not allow to create a Task with invalid token", async () => {
    const user = await request.post("/users").send({
      email: `cristian@outlook.com`,
      password: "12345678",
    });

    const loginCredentials = {
      email: user.body.data.user,
      password: "12345678",
    };

    const authResponse = await request
      .post("/users/auth")
      .send(loginCredentials);
    const token = authResponse.body.data + "Hello!";
   
    const task = {
      title: "",
      description: "Learn more TypeScript and NodeJS",
    };

    const response = await request
      .post(`/tasks`)
      .set("Authorization", `Bearer ${token}`)
      .send(task);
    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      status: 400,
      statusMsg: "Bad Request",
      data: "Invalid token"
    });
  });

it("Should Not allow to create a Task with invalid token", async () => {
  const user = await request.post("/users").send({
    email: `carlos@outlook.com`,
    password: "12345678",
  });

  const loginCredentials = {
    email: user.body.data.user,
    password: "12345678",
  };

  const authResponse = await request
    .post("/users/auth")
    .send(loginCredentials);
  const token = authResponse.body.data.split(" ")[1] + "Hello KeyM!";

  const task = {
    title: "",
    description: "Learn more TypeScript and NodeJS",
  };

  const response = await request
    .post(`/tasks`)
    .set("Authorization", `Bearer ${token}`)
    .send(task);
    
  expect(response.status).toBe(400);

  expect(response.body).toHaveProperty("data", "Invalid token");
});

it("Should GET all the Tasks", async () => {
  const user = await request.post("/users").send({
    email: "carlos@outlook.com",
    password: "12345678",
  });

  const loginCredentials = {
    email: user.body.data.user,
    password: "12345678",
  };

  const authResponse = await request
    .post("/users/auth")
    .send(loginCredentials);
  const token = authResponse.body.data;

  await request.post("/tasks").set("Authorization", `Bearer ${token}`).send({
    title: "Test Task",
    description: "This is a test task",
  });

  const getResponse = await request
    .get("/tasks")
    .set("Authorization", `Bearer ${token}`);

  expect(getResponse.status).toBe(200);

  expect(getResponse.body.data).toBeInstanceOf(Array);
  expect(getResponse.body.data.length).toBeGreaterThan(0);

  expect(
    getResponse.body.data.some(
      (task: any) => task.user === user.body.data.name
    )
  ).toBe(true);
});

  it("Should Not allow to create a Task with invalid token", async () => {
    const user = await request.post("/users").send({
      email: `cristian@outlook.com`,
      password: "12345678",
    });

    const loginCredentials = {
      email: user.body.data.user,
      password: "12345678",
    };

    const authResponse = await request
      .post("/users/auth")
      .send(loginCredentials);
    const token = authResponse.body.data.split(" ")[1] + "Hello KeyM!";

    const task = {
      title: "",
      description: "Learn more TypeScript and NodeJS",
    };

    const response = await request
      .post(`/tasks`)
      .set("Authorization", `Bearer ${token}`)
      .send(task);

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty("data", "Invalid token");
  });

  it("Should GET all the Tasks", async () => {
    const user = await request.post("/users").send({
      email: "cristian@outlook.com",
      password: "12345678",
    });

    const loginCredentials = {
      email: user.body.data.user,
      password: "12345678",
    };

    const authResponse = await request
      .post("/users/auth")
      .send(loginCredentials);
    const token = authResponse.body.data;

    await request.post("/tasks").set("Authorization", `Bearer ${token}`).send({
      title: "Test Task",
      description: "This is a test task",
    });

    const getResponse = await request
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(getResponse.status).toBe(200);

    expect(getResponse.body.data).toBeInstanceOf(Array);
    expect(getResponse.body.data.length).toBeGreaterThan(0);

    expect(
      getResponse.body.data.some(
        (task: any) => task.user === user.body.data.name
      )
    ).toBe(true);
  });

  it("Should GET a Task by Id", async () => {
    const user = await request.post("/users").send({
      email: "cristian@outlook.com",
      password: "12345678",
    });

    const loginCredentials = {
      email: user.body.data.user,
      password: "12345678",
    };

    const authResponse = await request
      .post("/users/auth")
      .send(loginCredentials);
    const token = authResponse.body.data;

    const task = {
      title: "NodeJS Tutorial",
      description: "Challenge for NodeJS",
    };

    const createResponse = await request
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send(task);

    expect(createResponse.status).toBe(200);
    const taskId = createResponse.body.data._id;

    const getResponse = await request
      .get(`/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(getResponse.status).toBe(200);
    const taskData = getResponse.body.data;

    expect(taskData).toHaveProperty("_id", taskId);
    expect(taskData).toHaveProperty("title", task.title);
    expect(taskData).toHaveProperty("description", task.description);
    expect(taskData).toHaveProperty("status", false);
    expect(taskData).toHaveProperty("createdAt");
    expect(taskData).toHaveProperty("updatedAt");
    expect(taskData).toHaveProperty("__v", 0);

    expect(new Date(taskData.createdAt)).toBeInstanceOf(Date);
    expect(new Date(taskData.updatedAt)).toBeInstanceOf(Date);
  });

  it("Should Delete a Task by Id", async () => {
    const user = await request.post("/users").send({
      email: "cristian@outlook.com",
      password: "12345678",
    });

    const loginCredentials = {
      email: user.body.data.user,
      password: "12345678",
    };

    const authResponse = await request
      .post("/users/auth")
      .send(loginCredentials);
    const token = authResponse.body.data;

    const task = {
      title: "NodeJS Tutorial",
      description: "Challenge for NodeJS",
    };

    const createResponse = await request
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send(task);

    expect(createResponse.status).toBe(200);
    const taskId = createResponse.body.data._id;

    const getResponse = await request
      .delete(`/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(getResponse.status).toBe(200);
  });
});
