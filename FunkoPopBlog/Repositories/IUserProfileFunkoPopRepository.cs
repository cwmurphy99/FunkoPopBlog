using FunkoPopBlog.Models;
using System.Collections.Generic;

namespace FunkoPopBlog.Repositories
{
    public interface IUserProfileFunkoPopRepository
    {
        void AddFavorite(UserProfileFunkoPop userProfileFunkoPop);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        void GetCollection(int id);
        void GetFunkoPopById(int id);
        List<FunkoPop> GetMyCollection(int userProfileId);
    }
}