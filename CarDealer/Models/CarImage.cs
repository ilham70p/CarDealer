using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealer.Models
{
    public class CarImage
    {
        [Key]
        public int Id { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        public string ImageName { get; set; }
        [ForeignKey("Car")]
        public int CarId { get; set; }
        [Required]
        public Car Car { get; set; }



    }
}
