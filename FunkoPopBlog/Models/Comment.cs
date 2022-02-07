using System;

namespace FunkoPopBlog.Models
{
    public class Comment
    {
        public int Id { get; set; } 
        public int BlogPostId { get; set; }
        public BlogPost BlogPost { get; set; }
        public UserProfile UserProfile { get; set; }
        public string Content { get; set; } 
        public DateTime CreateDateTime { get; set; }
        public int UserProfileId { get; set; }

    }
}
