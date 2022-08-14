using CarDealer.Data;
using CarDealer.Models;
using CarDealer.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealer.Controllers
{
    public class InventoryController : Controller
    {
        private readonly AppDbContext _context;

        public InventoryController(AppDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {

            List <Car> cars = _context.Cars.Include(m=>m.CarModel).ThenInclude(b=>b.Brand).Include(i=>i.CarImages).Include(d=>d.Dealer).ToList();
            return View(cars);

        }

        public IActionResult ProductDetail(int id)
        {
            Car cindir = _context.Cars.Include(b => b.CarModel).ThenInclude(c => c.Brand).Include(m => m.CarImages).Include(d=>d.Dealer).FirstOrDefault(b => b.Id == id);

            if (cindir!=null)
            {
                ViewBag.Images = _context.CarImages.Where(i => i.CarId == id).ToList();
               // Car cindir = _context.Cars.Include(b => b.CarModel).ThenInclude(c => c.Brand).Include(m => m.CarImages).FirstOrDefault(b => b.Id == id);

                return View(cindir);
            }
            else
            {
                return NotFound();
            }
            
        }
    }
}
