using FunkoPopBlog.Models;
using System.Collections.Generic;

namespace FunkoPopBlog.Repositories
{
    public interface IBlogPostRepository
    {
        void AddBlogPost(BlogPost blogPost);
        void DeleteBlogPost(int blogPostId);
        List<BlogPost> GetAllBlogPosts();
        BlogPost GetBlogPostById(int id);
        List<BlogPost> GetCurrentUsersBlogPostsByFirebaseId(string firebaseUserId);
        BlogPost GetUserBlogPostById(int id, int userProfileId);
        void UpdateBlogPost(BlogPost blogPost);
    }
}