export class CustomError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message); // Call the constructor of the Error class with the message
    this.status = status; // Add a status property to the instance of the class
  }
}

const createError = (status: number, message: string) => {
  return new CustomError(status, message); // Create a new instance of the CustomError class
};

export default createError;

// Javascript implementation
// const createError = (status, message) => {
//   const err = new Error();
//   err.status = status;
//   err.message = message;

//   return err;
// };
