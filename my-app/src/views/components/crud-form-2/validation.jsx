const validation = (uploaddata, setFormError) => {
  const err = {};
  if (uploaddata.name === "") {
    err.name = "name required!";
  }
  if (uploaddata.profession === "") {
    err.profession = "profession required!";
  }
  if (uploaddata.gender === "") {
    err.gender = "gender required!";
  }
  if (uploaddata.dob === null) {
    err.dob = "dob required!";
  }
  if (uploaddata.phonenubmer === "") {
    err.phonenubmer = "phonenubmer required!";
  }
  if (uploaddata.resume === "") {
    err.resume = "Resume is required!";
  }
  setFormError({ ...err });

  return Object.keys(err).length < 1;
};

export default validation;
