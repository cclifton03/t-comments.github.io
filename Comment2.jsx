import React, { useEffect, useState } from "react";
import "../comments/comment2.css";
import * as commentFormService from "components/comments/commentService";
import debug from "sabio-debug";
import VenueCommentCard from "./CommentCard";
import PropTypes from "prop-types";
import CommentForm2 from "components/comments/CommentForm2";

const _logger = debug.extend("VenueComment");

function Comment2({ entity }) {
  const [comments, setComments] = useState({
    commentsArray: [],
    commentsComponent: [],
  });

  useEffect(() => {
    _logger("entityId to pass:", entity.entityId);
    _logger("entityTypeId to pass:", entity.entityTypeId);

    commentFormService
      .getComment(entity.entityId, entity.entityTypeId)
      .then(onGetCommentSuccess)
      .catch(onGetCommentError);
  }, []);

  const onGetCommentSuccess = (response) => {
    _logger("onGetCommentSuccess", response);

    const responseArray = response.item;
    setComments((prevState) => {
      const newState = { ...prevState };
      newState.commentsArray = responseArray;
      newState.commentsComponent = responseArray.map(mapComments);
      return newState;
    });
  };

  const onGetCommentError = (error) => {
    _logger("onGetCommentError", error);
  };

  const handleAddComment = () => {
    _logger("handleAddComment firing");

    commentFormService
      .getComment(entity.entityId, entity.entityTypeId)
      .then(onGetCommentSuccess)
      .catch(onGetCommentError);
  };

  const mapComments = (aComment) => {
    return <VenueCommentCard key={aComment.id} aComment={aComment} />;
  };
  return (
    <div className="venues-comment-container container border-top">
      {comments.commentsComponent}
      <div className="comment-form">
        <CommentForm2
          handleAddComment={handleAddComment}
          entityId={entity.entityId}
          entityTypeId={entity.entityTypeId}
        />
      </div>
    </div>
  );
}

Comment2.propTypes = {
  entity: PropTypes.shape({
    entityId: PropTypes.number.isRequired,
    entityTypeId: PropTypes.number.isRequired,
  }),
};

export default Comment2;
