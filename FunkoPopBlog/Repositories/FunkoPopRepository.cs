using System;
using System.Linq;
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
                                        select top 15 * 
                                        from FunkoPop
                                        TABLESAMPLE(1000 rows)";

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

        public FunkoPop GetFunkoPopById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT fp.Id, fp.Handle, fp.Image, fp.Title,                                        
                                        s.Id AS SeriesId, s.[Name]
                                        From FunkoPop AS fp
                                        LEFT JOIN FunkoPopSeries AS fps ON fp.Id = fps.FunkoPopId
                                        LEFT JOIN Series AS s ON fps.SeriesId = s.Id
                                        WHERE fp.id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    FunkoPop funko = null;

                    while (reader.Read())
                    {
                        if (funko == null)
                        {
                            funko = NewPopFromReader(reader);
                        }
                    
                        if(!reader.IsDBNull(reader.GetOrdinal("SeriesId")))
                        {
                            funko.Series.Add(NewSeriesFromReader(reader));
                        }
                    

                    }

                    reader.Close();

                    return funko;
                }
            }
        }

        public FunkoPop GetFunkoPopById(string funkoPopId)
        {
            throw new NotImplementedException();
        }

        private FunkoPop NewPopFromReader(SqlDataReader reader)
        {
            return new FunkoPop()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Title = reader.GetString(reader.GetOrdinal("Title")),
                Handle = reader.GetString(reader.GetOrdinal("Handle")),
                Image = DbUtils.GetString(reader, "Image"),

                Series = new List<Series>()

            };
        }

        private Series NewSeriesFromReader(SqlDataReader reader)
        {
            return new Series()
            {

                Id = DbUtils.GetInt(reader, "SeriesId"),
                Name = reader.GetString(reader.GetOrdinal("Name")),

            };
        }

    }
}

