using CarDealer.Data;
using CarDealer.Models;
using CarDealer.Models.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealer.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarModelController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CarModelController(AppDbContext context)
        {
            _context = context;
        
        }


        public async Task<IActionResult> Get() {

            List<DtoCarModel> carmodels = _context.CarModels.Select(m=> new DtoCarModel{Id=m.Id,Name=m.Name,BrandId=m.BrandId }).ToList();
            
            return Ok(carmodels);
        
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromForm]DtoCarModel model)
        {

            CarModel mymodel = new CarModel {Id=model.Id,Name=model.Name,BrandId=model.BrandId };
            _context.CarModels.Add(mymodel);
            _context.SaveChanges();
            return Ok();

        }

        [HttpPut]
        public async Task<IActionResult> Put([FromHeader]int id,[FromForm] DtoCarModel model)
        {

            CarModel mymodel = _context.CarModels.Find(id);
            mymodel.Name = model.Name;
            mymodel.BrandId = model.BrandId;
            _context.CarModels.Update(mymodel);
            _context.SaveChanges();
            return Ok();

        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromHeader]int id)
        {

            CarModel mymodel = _context.CarModels.Find(id);
            _context.CarModels.Remove(mymodel);
            _context.SaveChanges();
            return Ok();

        }



    }
}
