using FunkoPopBlog.Models;
using FunkoPopBlog.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.ObjectModel;
using System.Security.Claims;

namespace FunkoPopBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserProfileFunkoPopController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IUserProfileFunkoPopRepository _userProfileFunkoPopRepository;
        private readonly IFunkoPopRepository _funkoPopRepository;

        public UserProfileFunkoPopController(IUserProfileRepository userProfileRepo, IUserProfileFunkoPopRepository userProfileFunkoPopRepo, IFunkoPopRepository funkoPopRepo)
        {
            _userProfileRepository = userProfileRepo;
            _userProfileFunkoPopRepository = userProfileFunkoPopRepo;
            _funkoPopRepository = funkoPopRepo;
        }


        [HttpPost("{id}")]
        public IActionResult Add(int id)
        {
            var userProfileFunkoPop = new UserProfileFunkoPop();

            userProfileFunkoPop.UserProfileId = GetCurrentUserProfile().Id;
            userProfileFunkoPop.FunkoPopId = id;

            _userProfileFunkoPopRepository.AddFavorite(userProfileFunkoPop);

            return NoContent();

        }
       



        private object GetCurrentFunkoPop()
        {
            var funkoPopId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _funkoPopRepository.GetFunkoPopById(funkoPopId);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }




    }
}
