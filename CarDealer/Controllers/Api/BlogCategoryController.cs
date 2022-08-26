using CarDealer.Data;
using CarDealer.Models;
using CarDealer.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarDealer.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogCategoryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BlogCategoryController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/<BlogCategoryController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<DtoBlogCategory> blogcategories = _context.BlogCategories.Select(m => new DtoBlogCategory { Id = m.Id, Name = m.Name }).ToList();
            return Ok(blogcategories);
        }

        
      

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] DtoBlogCategory model)
        {
            if (ModelState.IsValid)
            {
                BlogCategory blogCategory = new BlogCategory { Name = model.Name };
                _context.BlogCategories.Add(blogCategory);
                _context.SaveChanges();
                return Ok();
            }
            else
            {
                return NotFound();
            }
            
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromHeader]int id, [FromForm] DtoBlogCategory model)
        {
            if (ModelState.IsValid)
            {
                BlogCategory oldModel = _context.BlogCategories.Find(id);
                oldModel.Name = model.Name;
                _context.BlogCategories.Update(oldModel);
                _context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
           
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromHeader]int id)
        {
            BlogCategory blogCategory = _context.BlogCategories.Find(id);
            _context.BlogCategories.Remove(blogCategory);
            _context.SaveChanges();
            return Ok();
        }
    }
}
