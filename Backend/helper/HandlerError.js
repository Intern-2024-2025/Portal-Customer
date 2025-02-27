function handlerError(res, error) {
  if (error.errors) {
    return res.status(400).json({
      code: 400,
      message: error.errors[0].message,
    });
  } else {
    return res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
}
function handlerErrorCustom(res, error) {
  return res.status(400).json({
      code: 400,
      message: error,
    });
}
function handleCreate(res) {
  res.status(201).json({
    code: 201,
    message: "Success Create Data",
  });
}
function handleCreateCustom(res, message) {
  res.status(201).json({
    code: 201,
    message,
  });
}
function handleGet(res, data) {
  res.status(200).json({
    code: 200,
    message: "Success Get Data",
    data: data,
  });
}
function handleGetPaginator(res, result) {
  const { data, totalPages, currentPages } = result;
  res.status(200).json({
    code: 200,
    message: "Success Get Data",
    data,
    totalPages,
    currentPages,
  });
}
function handleUpdate(res, data) {
  const status = data[0];
  if (status == 1) {
    res.status(200).json({
      code: 200,
      message: "Success Update Data",
      status,
    });
  } else {
    res.status(500).json({
      code: 500,
      message: "Failed Update Data",
      status,
    });
  }
}
function handleDelete(res, status) {
  if (status == 1) {
    res.status(200).json({
      code: 200,
      message: "Success Delete Data",
      status,
    });
  } else {
    res.status(500).json({
      code: 500,
      message: "Failed Delete Data",
      status,
    });
  }
}

module.exports = {
  handlerError,
  handlerErrorCustom,
  handleCreate,
  handleGet,
  handleUpdate,
  handleDelete,
  handleGetPaginator,
  handleCreateCustom,
};
