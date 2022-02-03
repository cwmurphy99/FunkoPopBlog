using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FunkoPopBlog.Models;
using FunkoPopBlog.Repositories;

namespace FunkoPopBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BlogPostController : ControllerBase
    {
        private readonly IBlogPostRepository _blogPostRepo;
        private readonly IUserProfileRepository _userProfileRepository;

        public BlogPostController(IBlogPostRepository blogPostRepository, IUserProfileRepository userProfileRepository)
        {
            _blogPostRepo = blogPostRepository;
            _userProfileRepository = userProfileRepository;
        }
        // GET: api/<PostController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_blogPostRepo.GetAllBlogPosts());
        }
        [HttpGet("blogPosts")]
        public IActionResult GetUserBlogPosts()
        {
            var claim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            return Ok(_blogPostRepo.GetCurrentUsersBlogPostsByFirebaseId(claim));
        }
        // GET api/<PostController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var blogPost = _blogPostRepo.GetBlogPostById(id);
            if (blogPost == null)
            {
                return NotFound();
            }
            return Ok(blogPost);
        }

        // POST api/<PostController>
        [HttpPost]
        public IActionResult AddBlogPost(BlogPost blogPost)
        {
            var currentUserProfile = GetCurrentUserProfile();
            blogPost.UserProfileId = currentUserProfile.Id;
            blogPost.CreateDateTime = DateTime.Now;
            _blogPostRepo.AddBlogPost(blogPost);
            return CreatedAtAction("Get", new { id = blogPost.Id }, blogPost);
        }

        // PUT api/<PostController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, BlogPost blogPost)
        {
            if (id != blogPost.Id)
            {
                return BadRequest();
            }

            _blogPostRepo.UpdateBlogPost(blogPost);
            return NoContent();
        }

        // DELETE api/<PostController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _blogPostRepo.DeleteBlogPost(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
