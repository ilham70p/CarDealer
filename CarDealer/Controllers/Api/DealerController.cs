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
    public class DealerController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public DealerController(AppDbContext context,IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }



        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<DtoDealer> brands = _context.Dealers.Select(m => new DtoDealer { Id = m.Id, Name = m.Name,Email=m.Email,Mobile=m.Mobile,WhatsApp=m.WhatsApp,Location=m.Location,Description=m.Description, Image = ConvertImage(m.ImageName, _webHostEnvironment.WebRootPath + "\\Uploads\\") }).ToList();

            return Ok(brands);
        }


        // POST api/<BlogController>
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] DtoDealerCreate model)
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

                    Dealer mydealer = new Dealer { ImageName = fileName, ImageFile = model.Image, Name = model.Name,Mobile=model.Mobile,WhatsApp=model.WhatsApp,Description=model.Description,Location=model.Location,Email=model.Email };
                    _context.Dealers.Add(mydealer);
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
        public async Task<IActionResult> Put([FromHeader] int id, [FromForm] DtoDealerCreate model)
        {
            Dealer oldModel = _context.Dealers.Find(id);
            if (model.Image == null)
            {
                oldModel.Name = model.Name;
                oldModel.Description = model.Description;
                oldModel.Email = model.Email;
                oldModel.Mobile = model.Mobile;
                oldModel.Location = model.Location;
                oldModel.WhatsApp = model.WhatsApp;
                _context.Dealers.Update(oldModel);
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
                oldModel.Description = model.Description;
                oldModel.Email = model.Email;
                oldModel.Mobile = model.Mobile;
                oldModel.Location = model.Location;
                oldModel.WhatsApp = model.WhatsApp;
                oldModel.ImageName = fileName;
                _context.Dealers.Update(oldModel);
                _context.SaveChanges();
                return Ok();


            }
        }

        // DELETE api/<BlogController>/5
        [HttpDelete]
        public void Delete([FromHeader] int id)
        {
            Dealer mydealer = _context.Dealers.Find(id);
            if (mydealer.ImageName != null)
            {
                string oldImagePath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads", mydealer.ImageName);
                if (System.IO.File.Exists(oldImagePath))
                {
                    System.IO.File.Delete(oldImagePath);
                }

                _context.Dealers.Remove(mydealer);
                _context.SaveChanges();
            }
            else
            {
                _context.Dealers.Remove(mydealer);
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
