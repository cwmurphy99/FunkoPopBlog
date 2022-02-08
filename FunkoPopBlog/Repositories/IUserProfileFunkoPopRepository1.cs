using FunkoPopBlog.Models;
using System.Collections.Generic;

namespace FunkoPopBlog.Repositories
{
    public interface IUserProfileFunkoPopRepository1
    {
        void AddFavorite(UserProfileFunkoPop userProfileFunkoPop);
        void DeleteFavorite(int id, UserProfile userProfileId);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        List<FunkoPop> GetMyCollection(int userProfileId);
    }
}