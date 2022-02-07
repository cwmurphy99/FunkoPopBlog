using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using FunkoPopBlog.Models;
using FunkoPopBlog.Utils;

namespace FunkoPopBlog.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration config) : base(config) { }
        public List<Comment> GetPostComments(int blogPostId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT c.Id AS CommentId, c.BlogPostId, c.UserProfileId, c.Content, c.CreateDateTime AS CommentCreateDateTime,
                                    p.Title, p.Content AS PostContent, 
                                    p.CreateDateTime AS PostCreateDateTime, p.CreateDateTime,
                                    p.UserProfileId AS PostUserProfileId,
                                    u.FirstName, u.LastName, u.DisplayName, u.FirebaseUserId, 
                                    u.Email
                                    FROM Comment c
                                    LEFT JOIN BlogPost p ON c.BlogPostId = p.Id
                                    LEFT JOIN UserProfile u ON c.UserProfileId = u.id
                                    WHERE c.BlogPostId = @id
                                    ORDER BY c.CreateDateTime DESC";


                    cmd.Parameters.AddWithValue("@id", blogPostId);

                    var reader = cmd.ExecuteReader();

                    var comments = new List<Comment>();

                    while (reader.Read())
                    {
                        comments.Add(NewCommentFromReader(reader));
                    }

                    reader.Close();

                    return comments;

                }
            }
        }

        public void AddComment(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO Comment (
                                        Content, CreateDateTime, BlogPostId, UserProfileId )
                                        OUTPUT INSERTED.ID
                                        VALUES ( @Content, @CreateDateTime, @BlogPostId, @UserProfileId)";
                    cmd.Parameters.AddWithValue("@Content", comment.Content);
                    cmd.Parameters.AddWithValue("@CreateDateTime", comment.CreateDateTime);
                    cmd.Parameters.AddWithValue("@BlogPostId", comment.BlogPostId);
                    cmd.Parameters.AddWithValue("@UserProfileId", comment.UserProfileId);

                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeleteComment(int commentId)
        {
            throw new System.NotImplementedException();
        }

        public void UpdateComment(Comment comment)
        {
            throw new System.NotImplementedException();
        }

        private Comment NewCommentFromReader(SqlDataReader reader)
        {
            return new Comment()
            {
                Id = reader.GetInt32(reader.GetOrdinal("CommentId")),
                Content = reader.GetString(reader.GetOrdinal("Content")),
                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CommentCreateDateTime")),
                UserProfile = new UserProfile()
                {

                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),

                },
                BlogPost = new BlogPost()
                {

                    Id = reader.GetInt32(reader.GetOrdinal("BlogPostId")),
                    Title = reader.GetString(reader.GetOrdinal("Title")),
                    Content = reader.GetString(reader.GetOrdinal("PostContent")),
                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("PostCreateDateTime")),

                }
            };
        }






    }
}

 