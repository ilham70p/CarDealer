using CarDealer.Data;
using CarDealer.Models;
using CarDealer.Models.DTOs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealer.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public CarController(AppDbContext context,IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }
        [HttpGet]
        public async Task<IActionResult> Get() {
            List<DtoCar> cars = _context.Cars.Include(a=>a.CarImages)
                .Select(m=>new DtoCar 
                {CarImages=m.CarImages.Select(o=>ConvertImage(o.ImageName, _webHostEnvironment.WebRootPath + "\\Uploads\\")).ToList(),
                 Id=m.Id,
                 CarModelId=m.CarModelId,
                 BodyType=m.BodyType,
                 Transmission=m.Transmission,
                 Year=m.Year,
                 DriveType=m.DriveType,
                 ExteriorColor=m.ExteriorColor,
                 Milage=m.Milage,
                 InteriorColor=m.InteriorColor,
                 EngineSize=m.EngineSize,
                 FuelType=m.FuelType,
                 Condition=m.Condition,
                 DealerId=m.DealerId,
                 Description=m.Description,
                 Price=m.Price
                }).ToList();
            return Ok(cars);
        
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromForm]DtoCarCreate model) {
            Car mycar = new Car{
                CarModelId = model.CarModelId,
                BodyType = model.BodyType,
                Transmission = model.Transmission,
                Year = model.Year,
                DriveType = model.DriveType,
                ExteriorColor = model.ExteriorColor,
                Milage = model.Milage,
                InteriorColor = model.InteriorColor,
                EngineSize = model.EngineSize,
                FuelType = model.FuelType,
                Condition = model.Condition,
                DealerId = model.DealerId,
                Description = model.Description,
                Price = model.Price
            };
           int carId= addCar(mycar);
            addImages(carId, model.CarImages);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromHeader] int id, [FromForm] DtoCarCreate model)
        {
            Car oldModel = _context.Cars.Find(id);
            List<CarImage> oldImages = _context.CarImages.Where(i => i.CarId == id).ToList();
            if (model.CarImages != null)
            {
                foreach (var item in oldImages)
                {
                    string oldImagePath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads", item.ImageName);
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }

                    _context.CarImages.Remove(item);
                    _context.SaveChanges();
                }

                oldModel.CarModelId = model.CarModelId;
                oldModel.BodyType = model.BodyType;
                oldModel.Transmission = model.Transmission;
                oldModel.Year = model.Year;
                oldModel.DriveType = model.DriveType;
                oldModel.ExteriorColor = model.ExteriorColor;
                oldModel.Milage = model.Milage;
                oldModel.InteriorColor = model.InteriorColor;
                oldModel.EngineSize = model.EngineSize;
                oldModel.FuelType = model.FuelType;
                oldModel.Condition = model.Condition;
                oldModel.DealerId = model.DealerId;
                oldModel.Description = model.Description;
                oldModel.Price = model.Price;
                _context.Cars.Update(oldModel);
                _context.SaveChanges();

                addImages(id, model.CarImages);
                return Ok();

            }
            else
            {
                oldModel.CarModelId = model.CarModelId;
                oldModel.BodyType = model.BodyType;
                oldModel.Transmission = model.Transmission;
                oldModel.Year = model.Year;
                oldModel.DriveType = model.DriveType;
                oldModel.ExteriorColor = model.ExteriorColor;
                oldModel.Milage = model.Milage;
                oldModel.InteriorColor = model.InteriorColor;
                oldModel.EngineSize = model.EngineSize;
                oldModel.FuelType = model.FuelType;
                oldModel.Condition = model.Condition;
                oldModel.DealerId = model.DealerId;
                oldModel.Description = model.Description;
                oldModel.Price = model.Price;
                _context.Cars.Update(oldModel);
                _context.SaveChanges();
                return Ok();
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromHeader]int id) {

            Car mycar = _context.Cars.Find(id);
            _context.Cars.Remove(mycar);
            _context.SaveChanges();

            List<CarImage> myimages = _context.CarImages.Where(a => a.CarId == id).ToList();
            foreach (var item in myimages)
            {
              string  oldImagePath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads", item.ImageName);
                if (System.IO.File.Exists(oldImagePath))
                {
                    System.IO.File.Delete(oldImagePath);
                }

                _context.CarImages.Remove(item);
                _context.SaveChanges();
            }

            return Ok();
        
        }


        public int addCar(Car mycar)
        {
            _context.Cars.Add(mycar);
            _context.SaveChanges();
            int CarId = mycar.Id;
            return CarId;
        }

        public void addImages(int CarId, List<IFormFile> images)
        {
            int i = 0;
            foreach (var item in images)
            {

                string fileName = Guid.NewGuid() + "-" + images[i].FileName;
                string filePath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads", fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    images[i].CopyTo(stream);
                }

                CarImage myimage = new CarImage
                {
                    ImageName = fileName,
                    CarId = CarId
                };

                _context.CarImages.Add(myimage);
                _context.SaveChanges();
                i++;
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
