using CarDealer.Data;
using CarDealer.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealer.Areas.admin.Controllers
{
    [Area("admin")]
    public class BrandController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public BrandController(AppDbContext context,IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }
        public IActionResult Index()
        {
            List<Brand> brands = _context.Brands.ToList();
            return View(brands);
        }

        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Create(Brand model)
        {
            if (ModelState.IsValid)
            {
                if (model.ImageFile.ContentType == "image/jpg" || model.ImageFile.ContentType == "image/png" || model.ImageFile.ContentType == "image/jpeg")
                {
                    if (model.ImageFile.Length <= 3556924)
                    {
                        string filename = Guid.NewGuid() + "-" + model.ImageFile.FileName;
                        string imagePath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads", filename);
                        using (var stream = new FileStream(imagePath, FileMode.Create))
                        {
                            model.ImageFile.CopyTo(stream);
                        }

                        model.ImageName = filename;
                        _context.Add(model);
                        _context.SaveChanges();
                        return RedirectToAction("index");
                    }
                    else
                    {
                        return View(model);
                    }
                }
                else
                {
                    return View(model);
                }
            }
            else {

                return View(model);
            }
            
        }

        public IActionResult Delete(int Id)
        {
            Brand mybrand = _context.Brands.Find(Id);
            string oldImagePath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads", mybrand.ImageName);
            if (System.IO.File.Exists(oldImagePath))
            {
                System.IO.File.Delete(oldImagePath);
                _context.Brands.Remove(mybrand);
                _context.SaveChanges();
            }
            else
            {
                _context.Brands.Remove(mybrand);
                _context.SaveChanges(); 
            }
            return RedirectToAction("index");
        }

        public IActionResult Update(int Id)
        {
            Brand mybrand = _context.Brands.Find(Id);
            return View(mybrand);
        }
        [HttpPost]
        public IActionResult Update(Brand model)
        {
            if (ModelState.IsValid)
            {
                if (model.ImageFile != null)
                {
                    if (model.ImageFile.ContentType == "image/jpg" || model.ImageFile.ContentType == "image/png" || model.ImageFile.ContentType == "image/jpeg")
                    {
                        if (model.ImageFile.Length <= 345645)
                        {
                            string oldImagePath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads", model.ImageName);
                            if (System.IO.File.Exists(oldImagePath))
                            {
                                System.IO.File.Delete(oldImagePath);
                            }


                            string fileName = Guid.NewGuid() + "-" + model.ImageFile.FileName;
                            string filePath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads", fileName);
                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                model.ImageFile.CopyTo(stream);

                            }
                            model.ImageName = fileName;
                            _context.Brands.Update(model);
                            _context.SaveChanges();
                            return RedirectToAction("index");
                        }
                        else
                        {
                            ModelState.AddModelError("", "File is too big to save");
                            return View(model);
                        }
                    }
                    else
                    {
                        ModelState.AddModelError("", "File type is not supported");
                        return View(model);
                    }
                }
                else
                {

                    _context.Brands.Update(model);
                    _context.SaveChanges();
                    return RedirectToAction("index");
                }

            }
            else
            {
                return View(model);
            }
        }






    }
}
