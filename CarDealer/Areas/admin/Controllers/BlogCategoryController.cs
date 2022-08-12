using CarDealer.Data;
using CarDealer.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealer.Areas.admin.Controllers
{
    [Area("admin")]

    public class BlogCategoryController : Controller
    {
        private readonly AppDbContext _context;

        public BlogCategoryController(AppDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View(_context.BlogCategories.ToList());
        }

        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Create(BlogCategory model)
        {
            if (ModelState.IsValid)
            {
                _context.BlogCategories.Add(model);
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
            return View(_context.BlogCategories.Find(id));
        }
        [HttpPost]
        public IActionResult Update(BlogCategory model)
        {
            if (ModelState.IsValid)
            {
                _context.BlogCategories.Update(model);
                _context.SaveChanges();
                return RedirectToAction("index");
            }
            else
            {
                return View(model);
            }

        }




        public IActionResult Delete(int Id)
        {
            _context.Remove(_context.BlogCategories.Find(Id));
            _context.SaveChanges();
            return RedirectToAction("index");
        }

    }
}
