using CarDealer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealer.ViewModels
{
    public class VMHome
    {
        public List<Blog> Blogs { get; set; }
        public List<Brand> Brands { get; set; }
        public List<Car> Cars { get; set; }
        //public List<VmCar> VmCars { get; set; }
        public List<Dealer> Dealers { get; set; }
    }
}
