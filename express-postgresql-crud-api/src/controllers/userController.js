import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from "../models/userModel.js";

/* Standard response function */
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    data,
    status,
    message,
  });
};

export const createUser = async (request, response, next) => {
  const { email, name, password } = request.body;
  console.log(request.body);

  try {
    const data = await createUserService(email, name, password);

    handleResponse(response, 201, "User created successfully", data);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (request, response) => {
  try {
    const data = await getAllUsersService();

    handleResponse(response, 200, "Users fetched successfully", data);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (request, response) => {
  const { id } = request.params;

  try {
    const data = await getUserByIdService(id);

    if (data.length === 0) {
      return handleResponse(response, 404, "User not found");
    }

    handleResponse(response, 200, "User fetched successfully", data);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (request, response) => {
  const { id } = request.params;
  const { email, name, password } = request.body;

  try {
    const data = await updateUserService(id, email, name, password);

    if (data.length === 0) {
      return handleResponse(response, 404, "User not found");
    }

    handleResponse(response, 200, "User updated successfully", data);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (request, response) => {
  const { id } = request.params;

  try {
    const data = await deleteUserService(id);

    if (data.length === 0) {
      return handleResponse(response, 404, "User not found");
    }

    handleResponse(response, 200, "User deleted successfully", data);
  } catch (error) {
    next(error);
  }
};
