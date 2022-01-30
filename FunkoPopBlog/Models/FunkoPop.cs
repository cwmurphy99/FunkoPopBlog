using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FunkoPopBlog.Models
{
    public class FunkoPop
    {
        public int Id { get; set; }
        public string Handle { get; set; }
        public string ImageName { get; set; }
        public string Title { get; set; }
        public List<string> Series { get; }

    }
}
