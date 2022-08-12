using CarDealer.Data;
using CarDealer.Models;
using CarDealer.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealer.Controllers
{
    public class HomeController : Controller
    {
        private readonly AppDbContext _context;

        public HomeController(AppDbContext context)
        {
           _context = context;
        }
       
        public IActionResult Index()
        {
            List<Brand> brands = _context.Brands.ToList();
            List<Blog> blogs = _context.Blogs.Include(c=>c.BlogCategory).ToList();
            List<Car> cars = _context.Cars.Include(i => i.CarImages).Include(c=>c.CarModel).ThenInclude(b=>b.Brand).Include(d=>d.Dealer).ToList();
            List<Dealer> dealers = _context.Dealers.ToList();
            

            VMHome vmHome = new VMHome
            {
                Brands = brands,
                Blogs = blogs,
                Cars = cars,
                Dealers = dealers
            };

            return View(vmHome);
        }


       


    }
}
