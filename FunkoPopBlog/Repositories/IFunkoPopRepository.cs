using FunkoPopBlog.Models;
using System.Collections.Generic;

namespace FunkoPopBlog.Repositories
{
    public interface IFunkoPopRepository
    {
        List<FunkoPop> GetAllFunko();
    }
}