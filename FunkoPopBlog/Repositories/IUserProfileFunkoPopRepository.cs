using FunkoPopBlog.Models;

namespace FunkoPopBlog.Repositories
{
    public interface IUserProfileFunkoPopRepository
    {
        void AddFavorite(UserProfileFunkoPop userProfileFunkoPop);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        void GetCollection(int id);
        void GetFunkoPopById(int id);
    }
}