const createErr = (title, code) => {
  const err = new Error(title, { data: {title, code} })
  return err;
}

exports.createErr = createErr;