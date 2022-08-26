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
           
            List < DtoService > services = _context.Services.Select(m => new DtoService {
                Id = m.Id,
                Name=m.Title,
                Image = ConvertImage(m.ImageName,_webHostEnvironment.WebRootPath+"\\Uploads\\")
            }).ToList();

            return Ok(services);
 }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] Service model)
        {

            if (model.ImageFile!=null)
            {
                string fileName = Guid.NewGuid() + "-" + model.ImageFile.FileName;
                string filepath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads", fileName);
                using (var stream = new FileStream(filepath, FileMode.Create))
                {
                    model.ImageFile.CopyTo(stream);
                }
                model.ImageName = fileName;
                _context.Services.Add(model);
                _context.SaveChanges();
                return Ok();

            }
            else
            {
                ModelState.AddModelError("sdfsdf", "sdfsdf");
                return Ok();
            }

        }

        [HttpPatch]
        public async Task<IActionResult> Put([FromHeader] int id,[FromForm] Service model)
        {
            if (id==null)
            {
                return BadRequest();
            }
            else
            {
                Service oldmodel = _context.Services.Find(id);
                string oldImagePath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads", oldmodel.ImageName);
                if (System.IO.File.Exists(oldImagePath))
                {
                    System.IO.File.Delete(oldImagePath);
                }

                string fileName = Guid.NewGuid() + "-" + model.ImageFile.FileName;
                string filepath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads", fileName);
                using (var stream = new FileStream(filepath, FileMode.Create))
                {
                    model.ImageFile.CopyTo(stream);
                }
                oldmodel.ImageName = fileName;
                oldmodel.Title = model.Title;
                oldmodel.Description = model.Description;
                _context.Services.Update(oldmodel);
                _context.SaveChanges();
                return Ok(model);
            }

           

        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromHeader] int id)
        {
            if (id == null)
            { 
                return BadRequest();
            }
            else
            {
                Service oldmodel = _context.Services.Find(id);
                string oldImagePath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads", oldmodel.ImageName);
                if (System.IO.File.Exists(oldImagePath))
                {
                    System.IO.File.Delete(oldImagePath);
                }

                _context.Services.Remove(oldmodel);
                _context.SaveChanges();
                return Ok();
            }

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
