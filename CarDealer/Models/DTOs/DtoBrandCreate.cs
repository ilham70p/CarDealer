using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealer.Models.DTOs
{
    public class DtoBrandCreate
    {
        public string Name { get; set; }
        public IFormFile Image { get; set; }
    }
}
