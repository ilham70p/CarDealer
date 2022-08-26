using CarDealer.Data;
using CarDealer.Models;
using CarDealer.Models.DTOs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarDealer.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {

        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public BrandController(AppDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<DtoBrand> brands = _context.Brands.Select(m => new DtoBrand { Id = m.Id,Name=m.Name, Image = ConvertImage(m.ImageName, _webHostEnvironment.WebRootPath + "\\Uploads\\") }).ToList();

            return Ok(brands);
        }


        // POST api/<BlogController>
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] DtoBrandCreate model)
        {
            if (ModelState.IsValid)
            {
                if (model.Image.ContentType == "image/jpg" || model.Image.ContentType == "image/png" || model.Image.ContentType == "image/jpeg")
                {
                    string fileName = Guid.NewGuid() + "-" + model.Image.FileName;
                    string filePath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads", fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        model.Image.CopyTo(stream);
                    }

                    Brand mybrand = new Brand {  ImageName = fileName, ImageFile = model.Image, Name=model.Name };
                    _context.Brands.Add(mybrand);
                    _context.SaveChanges();
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/<BlogController>/5
        [HttpPut]
        public async Task<IActionResult> Put([FromHeader] int id, [FromForm] DtoBrandCreate model)
        {
            Brand oldModel = _context.Brands.Find(id);
            if (model.Image == null)
            {
                oldModel.Name = model.Name;
                _context.Brands.Update(oldModel);
                _context.SaveChanges();
                return Ok();
            }
            else
            {

                string oldImagePath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads", oldModel.ImageName);
                if (System.IO.File.Exists(oldImagePath))
                {
                    System.IO.File.Delete(oldImagePath);
                }

                string fileName = Guid.NewGuid() + "-" + model.Image.FileName;
                string filePath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    model.Image.CopyTo(stream);
                }


                oldModel.Name = model.Name;
                oldModel.ImageName = fileName;
                _context.Brands.Update(oldModel);
                _context.SaveChanges();
                return Ok();


            }
        }

        // DELETE api/<BlogController>/5
        [HttpDelete]
        public void Delete([FromHeader] int id)
        {
            Brand myblog = _context.Brands.Find(id);
            if (myblog.ImageName != null)
            {
                string oldImagePath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads", myblog.ImageName);
                if (System.IO.File.Exists(oldImagePath))
                {
                    System.IO.File.Delete(oldImagePath);
                }

                _context.Brands.Remove(myblog);
                _context.SaveChanges();
            }
            else
            {
                _context.Brands.Remove(myblog);
                _context.SaveChanges();
            }

        }


        public static string ConvertImage(string imgName, string path)
        {
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
