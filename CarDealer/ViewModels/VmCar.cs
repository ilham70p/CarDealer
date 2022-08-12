using CarDealer.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealer.ViewModels
{
    public class VmCar
    {
        public IFormFile[] Images { get; set; }
        public Car Car { get; set; }
    }
}
