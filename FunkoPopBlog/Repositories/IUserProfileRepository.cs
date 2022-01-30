using FunkoPopBlog.Models;
using System.Collections.Generic;

namespace FunkoPopBlog.Repositories
{
    public interface IUserProfileRepository

    {
        void Add(UserProfile userProfile);
        public UserProfile GetByFirebaseUserId(string firebaseUserId);
        public List<UserProfile> GetAllProfiles();
    }
}