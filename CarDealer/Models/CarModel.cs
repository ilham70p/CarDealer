using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealer.Models
{
    public class CarModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        [ForeignKey("Brand")] 
        public int BrandId { get; set; }
        [Required]
        public Brand Brand { get; set; }
        public List<Car> Cars { get; set; }
        public List<Feature> Features { get; set; }
    }
}
