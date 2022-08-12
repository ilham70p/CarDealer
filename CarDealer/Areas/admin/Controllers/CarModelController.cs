using CarDealer.Data;
using CarDealer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealer.Areas.admin.Controllers
{
    [Area("admin")]
    public class CarModelController : Controller
    {
        private readonly AppDbContext _context;


        public CarModelController(AppDbContext context)
        {
           _context = context;
 
        }
        
        public IActionResult Index()
        {
            return View(_context.CarModels.Include(b=>b.Brand).ToList());
        }

        public IActionResult Create()
        {
            ViewBag.Brands = _context.Brands.ToList();
            return View();
        }
        [HttpPost]
        public IActionResult Create(CarModel model)
        {
            if (ModelState.IsValid)
            {
                _context.CarModels.Add(model);
                _context.SaveChanges();
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
            return View(_context.CarModels.Find(id));
        }
        [HttpPost]
        public IActionResult Update(CarModel model)
        {
            if (ModelState.IsValid)
            {
                _context.CarModels.Update(model);
                _context.SaveChanges();
                return RedirectToAction("index");
            }
            else
            {
                return View(model);

            }
        }

        public IActionResult Delete(int id)
        {


            CarModel mymodel = _context.CarModels.Find(id);
          
             _context.CarModels.Remove(mymodel);
             _context.SaveChanges();
             return RedirectToAction("index");
        }


    }
}
