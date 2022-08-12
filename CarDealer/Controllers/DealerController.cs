using CarDealer.Data;
using CarDealer.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealer.Controllers
{
    public class DealerController : Controller
    {
        private readonly AppDbContext _context;

        public DealerController(AppDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            VmDealer vmdealer = new VmDealer {Dealers =_context.Dealers.ToList(),Blogs = _context.Blogs.Take(3).Include(b=>b.BlogCategory).ToList() };
            return View(vmdealer);
        }

        public IActionResult DealerDetail()
        {
            return View();
        }
    }
}
