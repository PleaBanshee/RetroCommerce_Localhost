import React from "react";

const ListReviews = ({ reviews }) => {
  return (
    <div
      class="reviews w-75"
      style={{
        marginLeft: "10em",
      }}
    >
      <h3 className="text-center">Other's Reviews:</h3>
      <hr style={{ border: "1px solid grey" }} />
      {reviews &&
        reviews.map((review) => (
          <div key={review._id} class="review-card my-3">
            <div class="rating-outer">
              <div
                class="rating-inner"
                style={{ width: `${(review.rating / 5) * 100}%` }}
              ></div>
            </div>
            <p class="review_user">by {review.name}</p>
            <p class="review_comment">{review.comment}</p>

            <hr style={{ border: "1px solid grey" }} />
          </div>
        ))}
    </div>
  );
};

export default ListReviews;
