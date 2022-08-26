using CarDealer.Data;
using CarDealer.Models;
using CarDealer.ViewModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealer.Areas.admin.Controllers
{
    [Area("admin")]
    public class CarController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public CarController(AppDbContext context,IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }
        public IActionResult Index()
        {
            List<Car> cars = _context.Cars.Include(d => d.Dealer).Include(c => c.CarModel).ThenInclude(b => b.Brand).Include(m => m.CarImages).ToList();
            return View(cars);
        }

        public JsonResult GetModel(int brandId)
        {
            List<CarModel> data = _context.CarModels.Where(s => s.BrandId == brandId).ToList();
            return Json(data);

        }


        public IActionResult Create()
        {
            ViewBag.Brands = _context.Brands.ToList();
            ViewBag.Dealers = _context.Dealers.ToList();
            ViewBag.CarModels = _context.CarModels.ToList();
            return View();
        }

       

        [HttpPost]
        public IActionResult Create(VmCar model)
        {
            if (ModelState.IsValid)
            {
                int CarId = addCar(model.Car);
                addImages(CarId, model.Images);
                return RedirectToAction("index");
            }
            else
            {
                return View(model);

            }
        }



        public IActionResult Update(int id)
        {
            ViewBag.Brands = _context.Brands.ToList();
            ViewBag.Dealers = _context.Dealers.ToList();
            ViewBag.CarModels = _context.CarModels.ToList();
            VmCar mydata = new VmCar { Car = _context.Cars.Find(id) };
            return View(mydata);
        }
        [HttpPost]
        public IActionResult Update(VmCar model)
        {
            List<CarImage> carimages = _context.CarImages.Where(a => a.CarId == model.Car.Id).ToList();
            if (ModelState.IsValid)
            {
                if (model.Images!=null)
                {
                    foreach (var item in carimages)
                    {
                        string oldImagePath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads", item.ImageName);
                        if (System.IO.File.Exists(oldImagePath))
                        {
                            System.IO.File.Delete(oldImagePath);
                        }
                        
                        _context.CarImages.Remove(item);
                        _context.SaveChanges();
                        
                    }
                    _context.Cars.Update(model.Car);
                    _context.SaveChanges();
                    addImages(model.Car.Id,model.Images);
                    return RedirectToAction("index");
                }
                else
                {

                    _context.Cars.Update(model.Car);
                    _context.SaveChanges();
                    return RedirectToAction("index");
                }




            }
            else
            {
                return View(model);

            }
        }


        public IActionResult Delete(int id)
        {

            Car car = _context.Cars.Find(id);

            List<CarImage> myimages = _context.CarImages.Where(i => i.CarId == id).ToList();
            foreach (var item in myimages)
            {
                string? oldImagePath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads", item.ImageName);
                if (System.IO.File.Exists(oldImagePath))
                {
                    System.IO.File.Delete(oldImagePath);
                }

            }


            _context.Cars.Remove(car);
            _context.SaveChanges();
            return RedirectToAction("index");


        }










        public int addCar(Car mycar)
        {
            _context.Cars.Add(mycar);
            _context.SaveChanges();
            int CarId = mycar.Id;
            return CarId;
        }

        public void addImages(int CarId, IFormFile[] images)
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







    }
}
