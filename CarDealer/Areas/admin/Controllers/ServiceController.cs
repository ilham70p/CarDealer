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
    public class ServiceController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ServiceController(AppDbContext context,IWebHostEnvironment webHostEnvironment)
        {
           _context = context;
           _webHostEnvironment = webHostEnvironment;
        }
        public IActionResult Index()
        {
            return View(_context.Services.ToList());
        }

        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Create(Service model)
        {
            if (ModelState.IsValid)
            {
                if (model.ImageFile.ContentType == "image/jpg" || model.ImageFile.ContentType == "image/jpeg" || model.ImageFile.ContentType == "image/png")
                {
                    if (model.ImageFile.Length <= 5698458)
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
            else
            {
                return View(model);
            }
        }

        public IActionResult Update(int id)
        {
            Service myservice = _context.Services.Find(id);
            return View(myservice);
        }
        [HttpPost]
        public IActionResult Update(Service model)
        {

            if (ModelState.IsValid)
            {
                if (model.ImageFile != null)
                {
                    if (model.ImageFile.ContentType == "image/jpg" || model.ImageFile.ContentType == "image/png" || model.ImageFile.ContentType == "image/jpeg")
                    {
                        if (model.ImageFile.Length <= 3456456)
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
                            _context.Services.Update(model);
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

                    _context.Services.Update(model);
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
            Service myservice = _context.Services.Find(id);
            string oldImagePath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads", myservice.ImageName);
            if (System.IO.File.Exists(oldImagePath))
            {
                System.IO.File.Delete(oldImagePath);
                _context.Services.Remove(myservice);
                _context.SaveChanges();
            }
            else
            {
                _context.Services.Remove(myservice);
                _context.SaveChanges();
            }
            return RedirectToAction("index");
        }


    }
}
