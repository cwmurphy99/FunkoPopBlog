using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FunkoPopBlog.Models
{
    public class BlogPost
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
        public int? FunkoPopId { get; set; }
        public string FunkoPopImage { get; set; }
        public string FunkoPopTitle { get; set; }
        

    }
}
