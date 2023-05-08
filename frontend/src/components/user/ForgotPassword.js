import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { forgotPassword, clearErrors } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
      navigate("/");
    }
  }, [dispatch, alert, error, message, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("email", email);

    if (email === "") {
      alert.error("Please enter email");
      return;
    }
    dispatch(forgotPassword(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Forgot Password"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg bg-white" onSubmit={submitHandler}>
            <h1 className="mt-2 mb-5 text-center">Forgot Password</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              SEND EMAIL
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
