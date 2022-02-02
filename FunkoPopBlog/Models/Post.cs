using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FunkoPopBlog.Models
{
    public class Post
    {
        public int Id { get; set; }
        
        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime CreateDateTime { get; set; }

        [DisplayName("Author")]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        [DisplayName("FunkoPop!")]
        public int FunkoPopId { get; set; }
        public FunkoPop FunkoPop { get; set; }
    }
}
