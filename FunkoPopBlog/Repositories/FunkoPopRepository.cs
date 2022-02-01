using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using FunkoPopBlog.Models;
using FunkoPopBlog.Repositories;
using FunkoPopBlog.Utils;

namespace FunkoPopBlog.Repositories
{
    public class FunkoPopRepository : BaseRepository, IFunkoPopRepository
    {
        public FunkoPopRepository(IConfiguration config) : base(config) { }
        public List<FunkoPop> GetAllFunko()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        select * from FunkoPop
                                        tablesample(15 rows)";

                    var reader = cmd.ExecuteReader();

                    var pops = new List<FunkoPop>();
                    {

                        while (reader.Read())
                        {
                            //pops.Add(NewPopFromReader(reader));
                            pops.Add(new FunkoPop
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                Handle = reader.GetString(reader.GetOrdinal("Handle")),
                                Image = DbUtils.GetString(reader, "Image"),
                            });
                            
                        }

                        reader.Close();

                        return pops;
                    }
                }
            }


        }

        private FunkoPop NewPopFromReader(SqlDataReader reader)
        {
            return new FunkoPop()
            {
                Id = reader.GetInt32(reader.GetOrdinal("FunkoPopId")),
                Title = reader.GetString(reader.GetOrdinal("FunkoPopTitle")),
                Handle = reader.GetString(reader.GetOrdinal("FunkoPopHandle")),
                Image = DbUtils.GetString(reader, "FunkoPopImage"),

                Series = new List<Series>() 
                

            };
        }
    }
}
