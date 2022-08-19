using CarDealer.Data;
using CarDealer.Models;
using CarDealer.Models.DTOs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealer.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ServiceController(AppDbContext context,IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }



        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<Service> services = new List<Service>();
            Service service = new Service { Id = 1, Title = "asdasdasd", Description = "dfcsdfcsdfsd" };
            services.Add(service);
            List < DtoService > servicess = _context.Services.Select(m => new DtoService {
                Id = m.Id,
                Name=m.Title,
                Image = ConvertImage(m.ImageName,_webHostEnvironment.WebRootPath+"\\Uploads\\")
            }).ToList();

            return Ok(servicess);
 }

        public static string ConvertImage(string imgName,string path) {
            var filePath = path + imgName;
            if (System.IO.File.Exists(filePath))
            {
                byte[] b = System.IO.File.ReadAllBytes(filePath);
                return Convert.ToBase64String(b);
            }
            return null;
        }

        

      


    }
}
