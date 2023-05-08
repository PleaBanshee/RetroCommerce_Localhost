import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Your Profile"} />
          <h2 className="mt-5 ml-5 text-center">My Profile</h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure
                className="avatar avatar-profile"
                style={{ border: "5px solid #808080" }}
              >
                <img
                  className="rounded-circle img-fluid"
                  src={user.avatar.url}
                  alt={user.name}
                />
              </figure>
              <Link
                to="/me/update"
                id="edit_profile"
                className="btn btn-primary btn-block my-5"
                style={{ backgroundColor: "#fc5603" }}
              >
                Edit Profile
              </Link>
            </div>

            <div
              className="col-12 col-md-3"
              style={{
                border: "5px solid #fa9c23",
                borderRadius: "10px",
                // marginRight: "16em",
              }}
            >
              <h4 className="text-dark">Full Name</h4>
              <p>{user.name}</p>

              <h4 className="text-dark">Email Address</h4>
              <p>{user.email}</p>

              <h4 className="text-dark">Joined On</h4>
              <p>{String(user.createdAt).substring(0, 10)}</p>

              {user.role !== "admin" && (
                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                  My Orders
                </Link>
              )}

              <Link
                to="/password/update"
                className="btn btn-info btn-block mt-3"
                // style={{borderColor: "#fa9c23", backgroundColor: "#fa9c23"}}
              >
                Change Password
              </Link>
              <br></br>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
