import { React, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as commentFormService from "components/comments/commentService";
import commentSchema from "./commentSchema";
import "../comments/comment2.css";
import PropTypes from "prop-types";
import toastr from "toastr";

function CommentForm({ handleAddComment, entityId, entityTypeId }) {
  const [commentFormLayout] = useState({
    subject: "",
    text: "",
    ParentId: 0,
    EntityId: entityId,
    EntityType: entityTypeId,
    isDeleted: false,
  });

  const onAddCommentClicked = (values, { resetForm }) => {
    commentFormService
      .addComment(values)
      .then((response) => {
        onAddCommentSuccess(response, resetForm, values);
      })
      .catch(onAddCommentError);
  };

  const onAddCommentSuccess = (response, resetForm) => {
    _logger("onAddCommentSuccess", response);
    toastr.success("New Comment Added!");
    resetForm();
    handleAddComment();
  };

  const onAddCommentError = (error) => {
    _logger("onAddCommentError", error);
    toastr.error("Please fix comment");
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={commentFormLayout}
      onSubmit={onAddCommentClicked}
      validationSchema={commentSchema}
    >
      <Form className="comment-form border-top">
        <Field
          size="sm"
          type="text"
          name="subject"
          className="form-control comment-form-subj mt-3"
          id="comment"
          placeholder="Subject:"
        ></Field>
        <ErrorMessage
          name="subject"
          component="div"
          className="subject-form-error comment-has-error"
        />
        <div className="form mb-2">
          <Field
            as="textarea"
            size="sm"
            type="text"
            name="text"
            className="form-control "
            id="text"
            placeholder="Write comment here:"
          ></Field>

          <ErrorMessage
            name="text"
            component="div"
            className="subject-form-error comment-has-error"
          />
        </div>
        <button type="submit" className=" btn btn-primary btn-sm">
          Add Comment
        </button>
      </Form>
    </Formik>
  );
}

CommentForm.propTypes = {
  handleAddComment: PropTypes.func.isRequired,
  entityId: PropTypes.number.isRequired,
  entityTypeId: PropTypes.number.isRequired,
};

export default CommentForm;
