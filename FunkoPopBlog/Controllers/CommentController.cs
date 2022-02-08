using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using FunkoPopBlog.Models;
using FunkoPopBlog.Repositories;
using System;
using System.Linq;
using System.Security.Claims;

namespace FunkoPopBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public CommentController(ICommentRepository commentRepository, IUserProfileRepository userProfileRepository)
        {
            _commentRepository = commentRepository;
            _userProfileRepository = userProfileRepository; 
        }


        // GET: api/<CommentController>
        [HttpGet("{blogPostId}")]
        public IActionResult Get(int blogPostId)
        {
            var comments = _commentRepository.GetPostComments(blogPostId);
            return Ok(comments);
        }


        // POST api/<CommentController>
        [HttpPost]
        public IActionResult AddComment(Comment comment)
        {
            
            comment.CreateDateTime = DateTime.Now;
            comment.UserProfileId = GetCurrentUserProfile().Id;

            _commentRepository.AddComment(comment);

            return NoContent();

        }



        // PUT api/<CommentController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            comment.UserProfileId = GetCurrentUserProfile().Id;

            _commentRepository.UpdateComment(comment);
            return NoContent();
        }



        // DELETE api/<CommentController>/5
        [HttpDelete("{id}")]
        public NoContentResult Delete(int id)
        {
            _commentRepository.DeleteComment(id);
            return NoContent();
        }



        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }


    }
}
