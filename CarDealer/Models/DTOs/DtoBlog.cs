using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealer.Models.DTOs
{
    public class DtoBlog
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string  Description { get; set; }
        public string Image { get; set; }
        public int BlogCategoryId { get; set; }
    }
}
