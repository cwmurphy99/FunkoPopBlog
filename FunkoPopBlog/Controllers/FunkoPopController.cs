using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FunkoPopBlog.Models;
using FunkoPopBlog.Repositories;


namespace FunkoPopBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FunkoPopController : ControllerBase
    {
        private readonly IFunkoPopRepository _funkoRepo;

        public FunkoPopController(IFunkoPopRepository funkoPopRepository)
        {
            _funkoRepo = funkoPopRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_funkoRepo.GetAllFunko());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var funko = _funkoRepo.GetFunkoPopById(id);
            if(funko == null)
            {
                return NotFound();
            }
            return Ok(funko);
        }




    }
}
