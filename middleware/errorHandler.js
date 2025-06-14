export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "ValidationError") {
    const errors = err.errors.map((error) => ({
      field: error.path,
      message: error.message,
    }));
    return res
      .status(400)
      .json({ message: "Validation failed", details: errors, sucess: false });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    return res
      .status(400)
      .json({ message: "Resource already exists", sucess: false });
  }

  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res
      .status(400)
      .json({ message: "Invalid reference", success: false });
  }

  res.status(500).json({ message: "Internal server error" });
};
