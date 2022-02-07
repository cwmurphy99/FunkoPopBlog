using FunkoPopBlog.Models;
using System.Collections.Generic;

namespace FunkoPopBlog.Repositories
{
    public interface ICommentRepository
    {
        void AddComment(Comment comment);
        void DeleteComment(int commentId);
        List<Comment> GetPostComments(int blogPostId);
        void UpdateComment(Comment comment);
    }
}