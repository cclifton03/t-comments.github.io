import React from "react";
import PropTypes from "prop-types";
import "../comments/comment2.css";

function CommentCard({ aComment }) {
  return (
    <div className="container comments-bg my-3 rounded-3 p-4 ">
      <div className="row d-flex align-items-center">
        <div className="comment-card-img mb-2 col-1">
          <img
            src={aComment.createdBy.avatarUrl}
            className="rounded-circle img-fluid "
            alt="userimage"
          />
        </div>
        <div className="col-6">
          <h5 className="card-title comment-user comment-cursive-font comment-custom-font comment-letter-space">
            {aComment.createdBy.firstName} {aComment.createdBy.lastName}
          </h5>
        </div>
      </div>

      <h4 className="card-subtitle comment-white mb-2 comment-letter-space">
        {aComment.subject}
      </h4>
      <p className="card-text comment-white">{aComment.text}</p>
    </div>
  );
}

CommentCard.propTypes = {
  aComment: PropTypes.shape({
    Id: PropTypes.number.isRequired,
    subject: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    ParentId: PropTypes.number.isRequired,
    EntityTypeId: PropTypes.number.isRequired,
    EntityId: PropTypes.number.isRequired,
    createdBy: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }),
  }),
};

export default CommentCard;
