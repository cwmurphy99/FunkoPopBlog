using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using FunkoPopBlog.Models;
using FunkoPopBlog.Repositories;
using FunkoPopBlog.Utils;

namespace FunkoPopBlog.Repositories
{
    public class BlogPostRepository : BaseRepository, IBlogPostRepository
    {
        public BlogPostRepository(IConfiguration config) : base(config) { }
        public List<BlogPost> GetAllBlogPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT bp.*,
                                        u.FirstName, 
                                        u.LastName, u.DisplayName, 
                                        u.Email
                                        FROM BlogPost bp
                                        LEFT JOIN 
                                        UserProfile u ON bp.UserProfileId = u.id
                                        ORDER BY bp.CreateDateTime";

                    var reader = cmd.ExecuteReader();

                    var blogPosts = new List<BlogPost>();

                    while (reader.Read())
                    {
                        blogPosts.Add(NewBlogPostFromReader(reader));
                    }

                    reader.Close();

                    return blogPosts;
                }
            }
        }

        public BlogPost GetBlogPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT bp.Id, bp.Title, bp.Content,
                                        bp.CreateDateTime, bp.UserProfileId,
                                        u.FirstName, u.LastName, u.DisplayName, 
                                        u.Email
                                        FROM BlogPost bp
                                        LEFT JOIN UserProfile u ON bp.UserProfileId = u.id
                                        WHERE bp.CreateDateTime < SYSDATETIME() AND bp.id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    BlogPost blogPost = null;

                    if (reader.Read())
                    {
                        blogPost = NewBlogPostFromReader(reader);
                    }

                    reader.Close();

                    return blogPost;
                }
            }
        }

        public BlogPost GetUserBlogPostById(int id, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT bp.Id, bp.Title, bp.Content,
                                        bp.CreateDateTime, bp.CreateDateTime,
                                        bp.UserProfileId,
                                        u.FirstName, u.LastName, u.DisplayName, 
                                        u.Email, u.Image
                                        FROM BlogPost bp
                                        LEFT JOIN UserProfile u ON bp.UserProfileId = u.id
                                        WHERE bp.id = @id AND bp.UserProfileId = @userProfileId";

                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
                    var reader = cmd.ExecuteReader();

                    BlogPost blogPost = null;

                    if (reader.Read())
                    {
                        blogPost = NewBlogPostFromReader(reader);
                    }

                    reader.Close();

                    return blogPost;
                }
            }
        }

        public void AddBlogPost(BlogPost blogPost)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO BlogPost (
                                        Title, Content, CreateDateTime, UserProfileId )
                                        OUTPUT INSERTED.ID
                                        VALUES (
                                        @Title, @Content, @CreateDateTime, @UserProfileId )";
                    cmd.Parameters.AddWithValue("@Title", blogPost.Title);
                    cmd.Parameters.AddWithValue("@Content", blogPost.Content);
                    cmd.Parameters.AddWithValue("@CreateDateTime", blogPost.CreateDateTime);
                    cmd.Parameters.AddWithValue("@UserProfileId", blogPost.UserProfileId);

                    blogPost.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeleteBlogPost(int blogPostId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        DELETE FROM BlogPost
                                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", blogPostId);

                    cmd.ExecuteNonQuery();

                }
            }
        }

        public void UpdateBlogPost(BlogPost blogPost)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE BlogPost
                                        SET 
                                        Title = @title,
                                        Content = @content,
                                        ImageLocation = @imageLocation,
                                        CreateDateTime = @publishDateTime,
                                        CategoryId = @categoryId
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@title", blogPost.Title);
                    cmd.Parameters.AddWithValue("@content", blogPost.Content);
                    cmd.Parameters.AddWithValue("@id", blogPost.Id);




                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<BlogPost> GetCurrentUsersBlogPostsByFirebaseId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT bp.Id, bp.Title, bp.Content,
                                        bp.CreateDateTime, bp.UserProfileId,
                                        c.[Name] AS CategoryName,
                                        u.FirstName, u.LastName, u.DisplayName, u.FirebaseUserId, 
                                        u.Email, u.Image
                                        FROM BlogPost bp
                                        LEFT JOIN UserProfile u ON bp.UserProfileId = u.id
                                        WHERE u.FirebaseUserId = @Id AND CreateDateTime < SYSDATETIME()
                                        ORDER BY bp.CreateDateTime DESC";

                    cmd.Parameters.AddWithValue("@id", firebaseUserId);
                    var reader = cmd.ExecuteReader();

                    List<BlogPost> blogPosts = new List<BlogPost>();
                    while (reader.Read())
                    {
                        blogPosts.Add(NewBlogPostFromReader(reader));
                    }

                    reader.Close();

                    return blogPosts;
                }
            }
        }

        private BlogPost NewBlogPostFromReader(SqlDataReader reader)
        {
            return new BlogPost()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Title = reader.GetString(reader.GetOrdinal("Title")),
                Content = reader.GetString(reader.GetOrdinal("Content")),
                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                UserProfile = new UserProfile()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                }
            };
        }
    }
}

