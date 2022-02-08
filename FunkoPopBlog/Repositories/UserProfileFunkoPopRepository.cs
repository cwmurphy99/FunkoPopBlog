using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using FunkoPopBlog.Models;
using FunkoPopBlog.Utils;
using System;


namespace FunkoPopBlog.Repositories
{
    public class UserProfileFunkoPopRepository : BaseRepository, IUserProfileFunkoPopRepository
    {
        public UserProfileFunkoPopRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT Id, FirebaseUserId, FirstName, LastName, DisplayName, Email, [Image], IsActive
                                        FROM UserProfile
                                        WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Image = DbUtils.GetString(reader, "Image"),
                            IsActive = DbUtils.GetBool(reader, "IsActive")
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }


        public void AddFavorite(UserProfileFunkoPop userProfileFunkoPop)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO UserProfileFunkoPop (UserProfileId, FunkoPopId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@UserProfileId, @FunkoPopId)";

                    cmd.Parameters.AddWithValue("@UserProfileId", userProfileFunkoPop.UserProfileId);
                    cmd.Parameters.AddWithValue("@FunkoPopId", userProfileFunkoPop.FunkoPopId);

                    int id = (int)cmd.ExecuteScalar();

                    userProfileFunkoPop.Id = id;
                }
            }

        }

       

        public void GetCollection(int id)
        {
            throw new NotImplementedException();
        }

        public void GetFunkoPopById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
