using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealer.Models.DTOs
{
    public class DtoDealerCreate
    {

        public string Name { get; set; }

        public string Email { get; set; }

        public string Mobile { get; set; }

        public string WhatsApp { get; set; }
        public IFormFile Image { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
    }
}
