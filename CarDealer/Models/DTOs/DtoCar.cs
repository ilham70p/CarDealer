using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealer.Models.DTOs
{
    public class DtoCar
    {
        public int Id { get; set; }
        public string BodyType { get; set; }
        public string Transmission { get; set; }
        public int Year { get; set; }
        public string DriveType { get; set; }
        public string ExteriorColor { get; set; }
        public int Milage { get; set; }
        public float EngineSize { get; set; }
        public string FuelType { get; set; }
        public string Condition { get; set; }
        public string InteriorColor { get; set; }
        public int DealerId { get; set; }
        public string Description { get; set; }
        public int CarModelId { get; set; }
        public int Price { get; set; }
        public List<string> CarImages { get; set; }
    }
}
